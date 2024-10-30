"use client";
import { useEffect, useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const VideoPlayer = ({ user }: { user: any }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    user.videoTrack?.play(ref.current);
  }, []);

  return (
    <div>
      Uid: {user.uid}
      <div ref={ref} style={{ width: "200px", height: "200px" }}></div>
    </div>
  );
};
