"use client";
import React, { useState } from "react";
import { RiArrowDropRightLine } from "react-icons/ri";
import { MdOutlineDoNotDisturbAlt } from "react-icons/md";
import { BiWorld } from "react-icons/bi";
import { LiaFileVideo, LiaArrowsAltHSolid } from "react-icons/lia";
import { AiOutlineDownload, AiOutlineMobile } from "react-icons/ai";
import { GiTargetPrize } from "react-icons/gi";
import { GrArticle } from "react-icons/gr";
import {
  useEnrolledCourseMutation,
  useGetIsEnrolledCourseQuery,
  useGetSingleCourseByIdQuery,
} from "@/redux/api/course/courseApi";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { Rate, Spin } from "antd";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import moment from "moment";

type TProps = {
  params: {
    courseId: string;
  };
};

const CourseDetailsPage = ({ params }: TProps) => {
  const [enrolledCourse] = useEnrolledCourseMutation();
  const { data: isEnrolled, isLoading: isEnrolledLoading } =
    useGetIsEnrolledCourseQuery(params.courseId);
  const { data, isLoading } = useGetSingleCourseByIdQuery(params.courseId);
  const course = data?.data;
  // console.log(course)
  const { token } = useAppSelector((state: RootState) => state.auth);
  const router = useRouter();

  const formattedDate = moment(course?.updatedAt).format("DD MMM YYYY");

  const handleSubscription = async () => {
    if (token) {
      // Display loading alert
      Swal.fire({
        title: "Processing...",
        text: "Enrolling in the course, please wait.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      try {
        const res = await enrolledCourse(params.courseId);
        Swal.close(); // Close the loading alert

        // Check if enrollment was successful
        if (res?.data?.success === true) {
          router.push(`/join/${params.courseId}`);
          Swal.fire({
            title: "Success!",
            text: "You have successfully enrolled in the course!",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            title: "Error",
            text: "Something went wrong. Please try again.",
            icon: "error",
            timer: 2000,
            showConfirmButton: false,
          });
        }
      } catch (error) {
        console.log(error);
        Swal.close();
        Swal.fire({
          title: "Error",
          text: "Something went wrong. Please try again.",
          icon: "error",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } else {
      Swal.close();
      Swal.fire({
        title: "Unauthorized",
        text: "Please Login!",
        icon: "warning",
        timer: 2000,
        showConfirmButton: false,
      });
      router.push("/login");
    }
  };

  const [activeTab, setActiveTab] = useState(0);
  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const tabs = [
    {
      title: "Personal",
      content: (
        <div>
          <h1 className="text-xl font-bold">
            Subscribe to Eduvalt top courses
          </h1>
          <p className="text-sm text-gray-600 py-2">
            Get this course, plus 10,500+ of our top-rated courses, with
            Personal Plan.
          </p>

          {isEnrolledLoading ? (
            <div className="flex justify-center items-center h-full">
              <Spin size="large" tip="Loading..." />
            </div>
          ) : isEnrolled?.data ? (
            <Link href={`/join/${params.courseId}`}>
              <button className="text-xl py-2 bg-purple-700 hover:bg-purple-600 w-full p-2 rounded-sm text-white font-bold">
                Join Session
              </button>
            </Link>
          ) : (
            <button
              onClick={handleSubscription}
              className="text-xl py-2 bg-purple-700 hover:bg-purple-600 w-full p-2 rounded-sm text-white font-bold"
            >
              Start Subscription
            </button>
          )}

          <div className=" text-center py-2">
            <p className="text-sm text-gray-600">
              Starting at ${course?.price} for this course
            </p>
            <p className="text-sm text-gray-600">Cancel anytime</p>
          </div>

          <div className="text-sm text-center text-gray-600  flex items-center justify-center">
            <hr className=" w-full mr-2" />
            <span className="text-sm text-gray-600">or</span>
            <hr className=" w-full  ml-2" />
          </div>

          <div className=" flex items-center  gap-2 py-2">
            <p className="text-2xl font-extrabold">${course?.price}</p>
            <p className="text-xl text-gray-500 line-through">
              {`$${course?.discountPrice}`}
            </p>
          </div>

          {isEnrolledLoading ? (
            <button className="w-full h-10 rounded-md bg-gray-300 animate-pulse"></button>
          ) : (
            <button
              className={`text-xl py-2 bg-transparent border-2 hover:bg-gray-400 w-full p-2 rounded-sm font-bold ${
                isEnrolled?.data ? "text-green-500" : "text-black"
              } hover:text-black pointer-events-none `}
            >
              {isEnrolled?.data
                ? "You Allready Enrolled This Course"
                : " Buy This Course"}
            </button>
          )}

          <div className=" text-center py-2">
            <p className="text-sm text-gray-600">30-Day Money-Back Guarantee</p>
            <p className="text-sm text-gray-600">Full Lifetime Access</p>
          </div>
        </div>
      ),
    },
    {
      title: "Team",
      content: (
        <div>
          <p className="text-sm text-gray-600 py-2">
            Subscribe to this course and 22,000+ top‑rated Udemy courses for
            your organization.
          </p>

          <button className="text-xl py-2 bg-purple-700 hover:bg-purple-600 w-full p-2 rounded-sm text-white font-bold">
            Try Eduvalt Bussiness
          </button>
        </div>
      ),
    },
  ];

  const requirements = [
    "No programming experience needed - I'll teach you everything you need to know",
    "A computer with access to the internet",
    "No paid software required",
    "I'll walk you through, step-by-step how to get all the software installed and set up",
  ];

  const courseIncludes = [
    {
      text: `${course?.timeDuration} hours on-demand video`,
      icon: <LiaFileVideo />,
    },
    {
      text: `${course?.resources} downloadable resources`,
      icon: <AiOutlineDownload />,
    },
    {
      text: "7 coding exercises",
      icon: <LiaArrowsAltHSolid />,
    },
    {
      text: "Access on mobile and TV",
      icon: <AiOutlineMobile />,
    },
    { text: `${course?.article} articles`, icon: <GrArticle /> },
    {
      text: "Certificate of completion",
      icon: <GiTargetPrize />,
    },
  ];

  if (isLoading) {
    return <Spin size="large" fullscreen />;
  }

  return (
    <div>
      {/* Course Head  */}
      <div className="bg-black bg-opacity-90 py-5">
        <div className="  xl:relative px-3 container mx-auto ">
          <div className=" space-y-5 xl:w-[70%] ">
            {/* Path  */}
            <div className=" flex sm:gap-1 items-center pb-5">
              <p className="hidden text-sm text-purple-500 sm:flex items-center">
                Development
                <span className="text-2xl text-white">
                  <RiArrowDropRightLine />
                </span>
              </p>
              <p className="text-sm text-purple-500 flex items-center">
                Web Development
                <span className="text-2xl text-white">
                  <RiArrowDropRightLine />
                </span>
              </p>
              <p className="text-sm text-purple-500 flex items-center">
                Web Development{" "}
                <span className="text-2xl text-white">
                  <RiArrowDropRightLine />
                </span>
              </p>
            </div>

            {/* Course Intor Vdio  */}
            <div className="xl:hidden border-8 border-purple-400">
              <video
                className="h-full w-full"
                src="https://videocdn.cdnpk.net/videos/d77b7c53-880f-4c56-80fa-60b94ad6255f/horizontal/previews/clear/large.mp4?token=exp=1730310247~hmac=d4268c190fdf21790e7a4e257f99a1ff0a66fed3606e1dbe108c797192e17029"
                controls
                controlsList="nodownload nofullscreen noremoteplayback"
                disablePictureInPicture
                disableRemotePlayback
              >
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Description */}
            <div className=" space-y-4">
              <h1 className="text-2xl sm:text-4xl text-white font-bold">
                {course?.name}
              </h1>

              <p className="sm:text-xl text-white">{course?.description}</p>

              <div className="text-sm sm:text-md flex items-center gap-1 sm:gap-2">
                <div className=" bg-yellow-300 px-2 w-min rounded">
                  <p className=" text-sm font-semibold">BestSeller</p>
                </div>

                <p className="font-bold text-orange-400 text-sm">
                  {course?.rating}
                </p>

                <div>
                  <Rate
                    className="custom-rating"
                    disabled
                    allowHalf
                    defaultValue={course?.rating}
                    count={5}
                  />
                </div>

                <p className="text-white ">
                  {course?.students?.length} students
                </p>
              </div>

              <p className=" text-white">
                Created By:
                <span className=" text-purple-500 ml-3">
                  {course?.teacher?.name}
                </span>
              </p>

              <div className=" flex gap-3">
                <p className=" text-sm text-white flex items-center gap-1">
                  <MdOutlineDoNotDisturbAlt />
                  Last Update {formattedDate}
                </p>
                <p className=" text-sm text-white flex items-center gap-1">
                  <BiWorld />
                  {course?.language}
                </p>
              </div>
            </div>
          </div>

          {/* Course Review  */}
          <div className="my-5 xl:bg-white sticky xl:absolute xl:w-[29%] pb-5 top-0 right-0 shadow-xl">
            <div className="hidden xl:block border-4  border-purple-400">
              <video
                className="w-full h-full"
                src="https://videocdn.cdnpk.net/videos/d48bfa8f-1ad1-4dd8-9f48-c3658782115a/horizontal/previews/clear/large.mp4?token=exp=1730202368~hmac=eb4730cfc6de60e52427efe080d1da58afb5f065188058d9fb7f12913e9ce919"
                controls
                controlsList="nodownload nofullscreen noremoteplayback"
                disablePictureInPicture
                disableRemotePlayback
              ></video>
            </div>

            <div className="flex flex-col  ">
              <div className="flex mb-4 border-b-2 justify-between">
                {tabs.map((tab, index) => (
                  <button
                    key={index}
                    className={`w-full py-3 mr-6  font-bold  focus:outline-none ${
                      activeTab === index
                        ? " text-black border-b-2 border-black"
                        : " text-gray-500"
                    }    `}
                    onClick={() => handleTabClick(index)}
                  >
                    {tab.title}
                  </button>
                ))}
              </div>
              <div className="px-4 relative">{tabs[activeTab].content}</div>
            </div>
          </div>
        </div>
      </div>

      {/* What you'll learn  */}

      {/* Course Includes Item  */}
      <div className=" py-[1rem] lg:w-[80%] xl:w-[75%] m-auto px-3  ">
        <div className="xl:w-[70%]">
          <h2 className="text-2xl py-2 font-bold">What you will Learn</h2>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-3 py-2">
            {courseIncludes.map((item, index) => (
              <div key={index} className="flex  gap-3 ">
                <p>{item.icon}</p>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Course Content  */}
      <div className="py-[1rem] lg:w-[80%] xl:w-[75%] m-auto px-3 ">
        <h2 className="text-2xl  font-bold">Course Content</h2>
        <p className="py-2 text-gray-600">{`${course?.topics?.length} secions . ${course?.lectures} lectures . ${course?.timeDuration} hours`}</p>
      </div>

      {/* Requirements */}
      <div className=" py-[1rem] lg:w-[80%] xl:w-[75%] m-auto px-3  ">
        <div className="xl:w-[70%]">
          <h2 className="text-2xl py-2 font-bold">Requirements</h2>

          <div className="py-2">
            {requirements?.map((item, index) => (
              <li className="" key={index}>
                {item}
              </li>
            ))}
          </div>
        </div>
      </div>

      {/* Discription Full */}
      <div className="  py-[1rem] lg:w-[80%] xl:w-[75%] m-auto px-3  ">
        <div className="xl:w-[70%]">
          <h2 className="text-2xl py-2 font-bold">Description</h2>

          <div className="pb-4">
            <p>{course?.description}</p>
          </div>

          <div>
            <p className="">
              Throughout this comprehensive course, we cover a massive amount of
              topics thats including:
            </p>
          </div>

          <div className="py-2">
            {course?.topics?.map((item: string, index: number) => (
              <li className="" key={index}>
                {item}
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
