import { CiStopwatch } from "react-icons/ci";
import { BsBarChart } from "react-icons/bs";
import { AiOutlineFileText } from "react-icons/ai";
import Image from "next/image";
import { Button, Rate } from "antd";
import Link from "next/link";
import { TCourse } from "@/types/courseType";
type TProps = {
  content: TCourse;
};
const Card = ({ content }: TProps) => {
  return (
    <div className="border  w-full border-gray-300/50 p-2 rounded-lg hover:border-gray-300 hover:shadow-2xl transition duration-300 cursor-pointer">
      {/* Course Image */}
      <div className="w-full h-[200px] overflow-hidden rounded-lg mb-3 ">
        <Image
          width={300}
          height={300}
          src="/course2image.jpg"
          alt=""
          className="w-full rounded-lg hover:scale-110 transition duration-500"
        />
      </div>
      {/* Rating */}
      <Rate className="custom-rating" disabled allowHalf  defaultValue={content?.rating} count={5} />

      {/* Course Title */}
      <p
        className="font-medium mb-2 px-2"
        style={{ fontFamily: "CustomRegular", fontSize: "16px" }}
      >
        {content?.name}
      </p>

      {/* Lesson Count, Duration, and Level */}
      <div className="flex text-gray-500 justify-between items-center px-2 text-sm">
        <div className="flex justify-between items-center gap-1">
          <AiOutlineFileText className="" />
          <p className="mr-1">{content?.lectures} Lectures</p>
        </div>
        <div className="flex justify-between items-center gap-1">
          <CiStopwatch className="" />
          <p className="mr-1"> {content?.timeDuration} hours</p>
        </div>
        <div className="flex justify-between items-center gap-1">
          <BsBarChart className="mr-1" />
          <p>{content?.topics?.length} Topics</p>
        </div>
      </div>

      {/* Separator */}
      <hr className="border-b border-gray-300/30 my-2 w-full mb-4" />

      {/* Instructor and Price */}
      <div className="flex justify-between px-2">
        <div className="flex items-center">
          <Image
            width={30}
            height={30}
            src="/person1.jpeg"
            alt=""
            className="h-[30px] w-[30px] rounded-full mr-3"
          />
          {/* <p className="text-[14px] text-gray-500">{content.instructor}</p> */}
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/course-details/${content?.id}`}>
            <Button size="middle" type="primary">
              {/* <Eye /> */}
              View Details
            </Button>
          </Link>
          <p className="text-md font-semibold">${content?.price}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
