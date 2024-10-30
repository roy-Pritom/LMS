// "use client";
import React from "react";
import { Tabs, type TabsProps } from "antd";
import PopularCourse from "./PopularCourse";
import EnrolledCourses from "./EnrolledCourses";
const FeaturedCourses = () => {

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Recent",
      children: <PopularCourse />,
    },
    {
      key: "2",
      label: "Popular",
      children: <PopularCourse />,
    },
    {
      key: "3",
      label: "Enrolled Courses",
      children: <EnrolledCourses />,
    
    },
  ];
  return (
    <div className="px-3 md:px-0">
      {/* heading part  */}
      <div className="mb-2">
        <h1 className="text-3xl font-bold mt-20  mb-5 text-center lg:text-left">
          Explore Featured Courses
        </h1>

        <div className=" w-full">
          <Tabs defaultActiveKey="1" items={items} />
        </div>
      </div>
    </div>
  );
};

export default FeaturedCourses;
