// pages/schedule-session.tsx
"use client";
import { useCrateSessionMutation } from "@/redux/api/session/sessionApi";
import { useState } from "react";

export default function ScheduleSession() {
  const [session, setSession] = useState(null);
  const [createSession] = useCrateSessionMutation();

  const scheduleSession = async () => {
    const data = {
      courseId: "07ca0fe7-b863-4e98-b868-d8399c85c5b8",
      session: {
        startTime: "2024-11-01T10:00:00.000Z",
        endTime: "2024-11-01T11:00:00.000Z",
        channelName: "js topper",
      },
    };

    const res = await createSession(data);
    setSession(res?.data?.data);
    console.log(res);
  };

  console.log(session);
  return (
    <div className="p-6">
      <h1 className="text-xl">Schedule Session</h1>
      <button onClick={scheduleSession} className="btn">
        Schedule
      </button>
      {/* {session && (
        <div>
          <p>Session Scheduled:</p>
          <p>Join Link: {session?.joinLink}</p>
        </div>
      )} */}
    </div>
  );
}
