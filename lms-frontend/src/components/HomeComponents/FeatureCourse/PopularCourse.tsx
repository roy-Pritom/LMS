"use client"
import CourseLoading from "@/components/LazyLoadingComponents/CourseLoading";
import Card from "@/components/ui/Card";
import { useGetAllCourseQuery } from "@/redux/api/course/courseApi";
import { TCourse } from "@/types/courseType";
import { Spin } from "antd";

const PopularCourse = () => {
  const { data: courseData, isLoading } = useGetAllCourseQuery({});
  //  console.log(courseData)
  if (isLoading) {
    return <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-2">
      {
        Array(10).fill(1)?.map((_,index:number) => (
          <CourseLoading key={index} />
        ))
      }
    </div>
  }
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-2">
        {
          isLoading ?
            (
              <Spin />
            )
            :
            (
              courseData?.data?.map((item: TCourse) => (
                <Card key={item?.id} content={item} />
              ))
            )
        }
      </div>
    </div>
  );
};

export default PopularCourse;
