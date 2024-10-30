"use client";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const socket = io("https://lms-server-nine-phi.vercel.app");

export default function JoinSession() {
  const [isConnected, setIsConnected] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const sessionId = "e3d105d5-1b00-4660-852c-1d8cdbfd321b";
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const localStream = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (!sessionId) return;

    socket.emit("join-session", { sessionId });

    const configuration = {
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    };
    peerConnection.current = new RTCPeerConnection(configuration);

    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", { sessionId, candidate: event.candidate });
      }
    };

    peerConnection.current.ontrack = (event) => {
      if (remoteVideoRef.current && event.streams.length > 0) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    const startLocalVideoStream = async () => {
      try {
        const constraints = { video: true, audio: true };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        localStream.current = stream;
        if (localVideoRef.current) localVideoRef.current.srcObject = stream;
        stream
          .getTracks()
          .forEach((track) => peerConnection.current?.addTrack(track, stream));
        setIsConnected(true);
      } catch (error) {
        console.error("Error accessing media devices.", error);
      }
    };

    startLocalVideoStream();

    socket.on("offer", async (offer) => {
      await peerConnection.current?.setRemoteDescription(offer);
      const answer = await peerConnection.current?.createAnswer();
      await peerConnection.current?.setLocalDescription(answer);
      socket.emit("answer", { sessionId, answer });
    });

    socket.on("answer", (answer) => {
      peerConnection.current?.setRemoteDescription(answer);
    });

    socket.on("ice-candidate", (candidate) => {
      peerConnection.current?.addIceCandidate(candidate);
    });

    return () => {
      endCall();
    };
  }, [sessionId]);

  const endCall = () => {
    if (peerConnection.current) {
      peerConnection.current.close();
      peerConnection.current = null;
    }
    socket.disconnect();
    if (localStream.current) {
      localStream.current.getTracks().forEach((track) => track.stop());
      localStream.current = null;
    }
    setIsConnected(false);
  };

  const toggleVideo = () => {
    if (localStream.current) {
      const videoTrack = localStream.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOn(videoTrack.enabled);
      }
    }
  };

  return (
    <div className="p-4 flex flex-col items-center">
      <h1>Session ID: {sessionId}</h1>
      <video
        ref={localVideoRef}
        autoPlay
        playsInline
        muted
        className="w-1/2 h-1/2 bg-gray-100"
      ></video>
      <video
        ref={remoteVideoRef}
        autoPlay
        playsInline
        className="w-1/2 h-1/2 bg-gray-100"
      ></video>
      <div className="flex space-x-4 mt-4">
        <button
          onClick={endCall}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Cut Call
        </button>
        <button
          onClick={toggleVideo}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {isVideoOn ? "Stop Video" : "Start Video"}
        </button>
      </div>
      {!isConnected && <p>Connecting to video and audio...</p>}
    </div>
  );
}
