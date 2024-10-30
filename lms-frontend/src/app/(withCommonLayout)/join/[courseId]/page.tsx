"use client";

import { VideoSession } from "@/components/JoinPageComponents/VideoSession";
import { Button } from "antd";
import { useState } from "react";
import { MdVideoCall } from "react-icons/md";
import { PiVideoConferenceFill } from "react-icons/pi";
type TProps = {
  params: {
    courseId: string;
  };
};
const JoinCoursePage = ({ params }: TProps) => {
  console.log(params);
  const [joined, setJoined] = useState(false);

  return (
    <div className="container mx-auto py-20">
      <p className="md:text-3xl text-xl font-bold text-slate-900 my-5">
        Congraution
      </p>
      <div className="flex justify-center items-center mb-14">
        <div className="">
          {!joined && (
            <Button
              type="primary"
              size="large"
              className="font-semibold"
              onClick={() => setJoined(true)}
              icon={<MdVideoCall size={25} />}
            >
              Join Live Session
            </Button>
          )}

          {joined && (
            <div className="w-full">
              <Button
                size="large"
                type="primary"
                className="font-semibold"
                icon={<PiVideoConferenceFill size={25} />}
                danger
                onClick={() => setJoined(false)}
              >
                Return Lobby
              </Button>
              <VideoSession />
            </div>
          )}
        </div>
      </div>
      <div className="grid md:grid-cols-4 grid-cols-1 gap-y-2 md:gap-y-0 md:p-0 p-2 ">
        <div className="col-span-1 flex flex-col gap-2 order-2 md:order-1">
          <iframe
            src="https://www.youtube.com/embed/2NU5SkQWZak"
            title="YouTube video player"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="md:w-[300px] w-full h-full rounded-md"
          />
          <iframe
            src="hhttps://youtu.be/2NU5SkQWZak?si=uHBO4dew78geVQE_"
            title="YouTube video player"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="md:w-[300px] w-full h-full rounded-md"
          />
        </div>

        <div className="col-span-3 order-1 md:order-2">
          {/* add video */}
          <iframe
            src="https://youtu.be/uiLJDFIxtHY?si=01DC9zDqVhfNt1yY"
            title="YouTube video player"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="w-full md:h-[430px] h-full rounded-md "
          />
        </div>
      </div>
    </div>
  );
};

export default JoinCoursePage;
