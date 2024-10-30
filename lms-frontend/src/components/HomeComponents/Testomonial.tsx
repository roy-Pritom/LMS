"use client";
import { useState } from "react";
import Image from "next/image"; // Use next/image for optimized images
// import image1 from "../../../public/image1.png";
const Testimonial = () => {
  const professors = [
    {
      id: 1,
      name: "Jessica Moniqua1",
      role: "Art professor1",
      message:
        "I had1 the opportunity to meet with the dynamic & distinguished faculties, who are highly qualified & friendly patients. With their assist & guidance I…",
      imageUrl: "/image1.png",
    },
    {
      id: 2,
      name: "Marcella Moniq2",
      role: "Art professor2",
      message:
        "I had2 the opportunity to meet with the dynamic & distinguished faculties, who are highly qualified & friendly patients. With their assist & guidance I…",
      imageUrl: "/image2.jpg",
    },
    {
      id: 3,
      name: "William Smith3",
      role: "Art professor3",
      message:
        "I had3 the opportunity to meet with the dynamic & distinguished faculties, who are highly qualified & friendly patients. With their assist & guidance I…",
      imageUrl: "/image2.jpg",
    },
    {
      id: 4,
      name: "William Smith4",
      role: "Art professor4",
      message:
        "I had4 the opportunity to meet with the dynamic & distinguished faculties, who are highly qualified & friendly patients. With their assist & guidance I…",
      imageUrl: "/image1.png",
    },
  ];

  const [displayedProfessors, setDisplayedProfessors] = useState(
    professors.slice(0, 3)
  );
  const [selectedProfessor, setSelectedProfessor] = useState(professors[1]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleProfessorClick = (professor: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const prevIndex = professors.findIndex(
      (prof) => prof.id === selectedProfessor.id
    );
    setSelectedProfessor(professor);
    const selectedIndex = professors.findIndex(
      (prof) => prof.id === professor.id
    );

    let startIndex, endIndex;

    if (selectedIndex === 0) {
      startIndex = professors.length - 1;
      endIndex = selectedIndex + 1;
    } else if (selectedIndex === professors.length - 1) {
      startIndex = selectedIndex - 1;
      endIndex = 0;
    } else {
      startIndex = selectedIndex - 1;
      endIndex = selectedIndex + 1;
    }

    const displayedProfessors =
      startIndex < endIndex
        ? professors.slice(startIndex, endIndex + 1)
        : [
            ...professors.slice(startIndex),
            ...professors.slice(0, endIndex + 1),
          ];

    setDisplayedProfessors(displayedProfessors);
  };

  return (
    <div className="flex-col sm:flex-row flex justify-between  mb-24 mt-24 px-2 md:px-0">
      {/* Left Side */}
      <div className="md:w-2/5 w-full  mb-6 sm:mb-0 ">
        <div className="mb-12">
          <p className="text-[16px] font-normal mb-3">WHAT PEOPLE SAY</p>
          <p className="text-3xl sm:text-5xl font-bold mb-2">
            Hear Our
            <span className="block mt-4">Students Words</span>
          </p>
        </div>
        <div>
          {displayedProfessors.map((professor, index) => (
            <div
              key={index}
              className={`flex hover:bg-blue-600 hover:text-white p-5 rounded-2xl border border-red-400  ${
                index !== displayedProfessors.length - 1 ? "mb-3" : ""
              } ${
                index === 1 ? "bg-blue-500 text-white" : "bg-gray-100"
              } transition-transform duration-300 ease-in-out delay-50`}
              onClick={() => handleProfessorClick(professor)}
            >
              <Image
                src={professor?.imageUrl}
                alt={professor.name}
                width={50}
                height={50}
                className="mr-2 h-[50px] w-[50px] rounded-full"
              />
              <div>
                <p className="text-lg font-medium">{professor.name}</p>
                <p className="text-[12px]">{professor.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side */}
      <div className="sm:w-[42%] h-42vw sm:h-auto py-5 px-10 flex items-center justify-center flex-col border border-blue-300 rounded-full mr-4 ml-4 sm:ml-0 shadow-2xl">
        <Image
          src={selectedProfessor?.imageUrl}
          alt="quote"
          width={80}
          height={80}
          className="mb-3"
        />
        <p className="mb-3 mt-4 text-xl">{selectedProfessor.message}</p>
        {selectedProfessor && (
          <>
            <p className="text-xl font-medium mb-3">{selectedProfessor.name}</p>
            <p className="text-[14px] text-gray-800 mb-4">
              {selectedProfessor.role}
            </p>
          </>
        )}
        {/* Dots for navigation */}
        <div className="flex justify-center space-x-2">
          {professors.map((professor, index) => (
            <div
              key={index}
              className={`relative h-3 w-3 rounded-full ${
                index ===
                professors.findIndex((prof) => prof.id === selectedProfessor.id)
                  ? "bg-yellow-600 border-[4px] border-blue-600"
                  : "bg-gray-100 border-[3px] border-gray-400"
              }`}
              onClick={() => handleProfessorClick(professor)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
