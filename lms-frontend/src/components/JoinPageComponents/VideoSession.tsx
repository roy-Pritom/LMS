"use client";
import React, { useEffect, useState } from "react";
import AgoraRTC, {
  IAgoraRTCRemoteUser,
  ICameraVideoTrack,
  ILocalAudioTrack,
  ILocalVideoTrack,
  IMicrophoneAudioTrack,
  IAgoraRTCClient,
} from "agora-rtc-sdk-ng";
import { VideoPlayer } from "./VideoPlayer";
const APP_ID = process.env.NEXT_PUBLIC_AGORA_APP_ID;
const TOKEN = process.env.NEXT_PUBLIC_TOKEN;
const CHANNEL = process.env.NEXT_PUBLIC_CHANNEL;

AgoraRTC.setLogLevel(4);

let agoraCommandQueue = Promise.resolve();

interface UserTrack {
  uid: string | number;
  audioTrack?: ILocalAudioTrack | IMicrophoneAudioTrack;
  videoTrack?: ILocalVideoTrack | ICameraVideoTrack;
}

interface CreateAgoraClientProps {
  onVideoTrack: (user: IAgoraRTCRemoteUser) => void;
  onUserDisconnected: (user: IAgoraRTCRemoteUser) => void;
}

const createAgoraClient = ({
  onVideoTrack,
  onUserDisconnected,
}: CreateAgoraClientProps) => {
  const client: IAgoraRTCClient = AgoraRTC.createClient({
    mode: "rtc",
    codec: "vp8",
  });

  let tracks: [IMicrophoneAudioTrack, ICameraVideoTrack];

  const connect = async () => {
    const uid = await client.join(
      APP_ID as string,
      CHANNEL as string,
      TOKEN as string,
      null
    );

    client.on("user-published", async (user, mediaType) => {
      await client.subscribe(user, mediaType);
      if (mediaType === "video" || mediaType === "audio") {
        onVideoTrack(user);
      }
    });

    client.on("user-left", (user) => {
      onUserDisconnected(user);
    });

    tracks = await AgoraRTC.createMicrophoneAndCameraTracks();
    await client.publish(tracks);

    return { tracks, uid };
  };

  const disconnect = async () => {
    client.removeAllListeners();
    for (const track of tracks) {
      track.stop();
      track.close();
    }
    await client.unpublish(tracks);
    await client.leave();
  };

  return { connect, disconnect };
};

export const VideoSession: React.FC = () => {
  const [users, setUsers] = useState<UserTrack[]>([]);
  const [uid, setUid] = useState<string | number | null>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onVideoTrack = (user: any) => {
      const existingUser = users.find((u) => u.uid === user.uid);
      if (!existingUser) {
        const newUser: UserTrack = {
          uid: user.uid,
          audioTrack: user.audioTrack as unknown as ILocalAudioTrack,
          videoTrack: user.videoTrack as unknown as ILocalVideoTrack,
        };

        setUsers((prevUsers) => [...prevUsers, newUser]);

        // Check if audioTrack exists and is ready before playing
        if (user?.audioTrack) {
          try {
            user.audioTrack?.play();
          } catch (error) {
            console.warn("Playback error:", error);
          }
        }

        // Check if videoTrack exists and is ready before playing (if needed)
        if (user?.videoTrack) {
          try {
            user.videoTrack.play();
          } catch (error) {
            console.warn("Video playback error:", error);
          }
        }
      }
    };

    const onUserDisconnected = (user: IAgoraRTCRemoteUser) => {
      setUsers((prevUsers) => prevUsers.filter((u) => u.uid !== user.uid));
    };

    const { connect, disconnect } = createAgoraClient({
      onVideoTrack,
      onUserDisconnected,
    });

    const setup = async () => {
      const { tracks, uid } = await connect();
      setUid(uid);
      setUsers([
        {
          uid,
          audioTrack: tracks[0],
          videoTrack: tracks[1],
        },
      ]);
    };

    const cleanup = async () => {
      await disconnect();
      setUid(null);
      setUsers([]);
    };

    agoraCommandQueue = agoraCommandQueue.then(setup);

    return () => {
      agoraCommandQueue = agoraCommandQueue.then(cleanup);
    };
  }, []); // Removed `uid` from dependencies to avoid re-running

  return (
    <>
      {uid}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(2, 200px)" }}
        >
          {users.map((user) => (
            <VideoPlayer key={user.uid} user={user} />
          ))}
        </div>
      </div>
    </>
  );
};
