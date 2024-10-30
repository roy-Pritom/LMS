import { Button } from "antd";

const CourseLoading = () => {
    return (
        <div className="w-full bg-gray-300 h-[343px ] p-2 animate-pulse rounded-md">
            <h1 className="w-full  h-[200px] bg-gray-400 animate-pulse rounded-md"></h1>
            <h1 className="w-14 h-2 bg-gray-400 animate-pulse my-4 rounded-md"></h1>
            <h1 className="w-20 h-3 bg-gray-400 animate-pulse  rounded-md"></h1>
            <div className="flex justify-between items-center my-3">
            <h1 className="w-16 h-3 bg-gray-400 animate-pulse rounded-md"></h1>
            <h1 className="w-16 h-3 bg-gray-400 animate-pulse rounded-md"></h1>
            <h1 className="w-16 h-3 bg-gray-400 animate-pulse rounded-md"></h1>
            </div>
            <div className="mt-4 flex justify-between ">
                <Button shape="circle" className="  bg-gray-400 animate-pulse rounded-md"></Button>
                <div className="flex items-center gap-2">
                <h1  className="w-20 h-6  bg-gray-400 animate-pulse rounded-md"></h1>
                <h1 className="w-8  h-2 bg-gray-400 animate-pulse rounded-md mt-1"></h1>
                </div>
            </div>
        </div>
    );
};

export default CourseLoading;