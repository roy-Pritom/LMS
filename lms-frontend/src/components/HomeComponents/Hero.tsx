"use client";
import { FiSearch } from "react-icons/fi";
import { Zoom, Slide } from "react-awesome-reveal";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Hero = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const router = useRouter()

  const handleSearch = () => {
    if(searchTerm){
      router.push(`/courses?searchTerm=${searchTerm}`)
    }
    setSearchTerm('');
  }
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if(searchTerm)  handleSearch();
    }
  };
  return (
    <section className="bg-[#1A3178] bg-cover text-white py-10">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2">
          {/* ------------------- left side ------------------- */}
          <div className="p-10 flex flex-col items-start justify-center">
            <div className="text-2xl md:text-5xl lg:text-4xl xl:text-5xl font-bold">
              <Slide>
                <h1>
                  Explore Your <span className="text-blue-600">Skills</span>{" "}
                  With
                </h1>
                <div className="flex items-center relative">
                  <h1 className="py-2 ">Varieties of Courses</h1>
                  <img
                    className="absolute right-2 -bottom-3 mt-5 -mr-5 w-1h-10 h-10"
                    src='/banner_shape02.png";'
                    alt=""
                  />
                </div>
              </Slide>
            </div>

            <div className="rounded-md my-5 bg-white grid grid-cols-12 items-center w-full ">
              <input
                className=" p-4 col-span-11 rounded-md outline-none bg-white text-slate-900"
                onChange={(e)=>setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                type="text"
                name=""
                id=""
                placeholder="Search For Cources..."
              />
              <button onClick={handleSearch}>
              <FiSearch className=" text-slate-500 text-3xl cursor-pointer" />
              </button>
            </div>

            <h2 className="underline cursor-pointer text-xl">
              You can access 7,900+ different courses
            </h2>
          </div>
          {/* ------------------- right side ------------------- */}
          <div className="p-10 grid grid-cols-2 gap-5">
            <div className="relative ">
              <img
                className="animate-bounce absolute -m-10 w-[100px]"
                src="/banner_shape03.png"
                alt=""
              />

              <Zoom delay={300}>
                <img className="relative" src="/banner_img01.png" alt="" />{" "}
              </Zoom>
            </div>
            <div className="grid gap-5">
              <div className="relative">
                <Zoom delay={300}>
                  <img className="" src="/banner_img02.png" alt="" />{" "}
                </Zoom>
                <img
                  className="w-[60px] absolute -right-3 -bottom-5"
                  src="/banner_shape04.png"
                  alt=""
                />
              </div>
              <Zoom delay={300}>
                {" "}
                <img src="/banner_img03.png" alt="" />
              </Zoom>
            </div>
          </div>
        </div>
        <img
          className="animate-bounce mt-12 max-w-[110px]"
          src="/banner_shape01.png"
          alt=""
        />
      </div>
    </section>
  );
};

export default Hero;
