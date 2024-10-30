import FeaturedCourses from "@/components/HomeComponents/FeatureCourse/FeatureCourse";
import Hero from "@/components/HomeComponents/Hero";
import Testimonial from "@/components/HomeComponents/Testomonial";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <div className="container mx-auto">
        <FeaturedCourses />
        <Testimonial />
      </div>
    </div>
  );
}
