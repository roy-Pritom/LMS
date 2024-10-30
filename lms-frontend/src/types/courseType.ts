import { TUser } from "@/redux/features/auth/authSlice";

export type TCourse = {
    id:string;
    name: string;
    description?: string;
    price: number;
    rating: number;
    lectures: number;
    timeDuration: number; 
    discountPrice: number;
    language: string;
    article: number; 
    resources: number;
    topics:string[];
  };

  

  export type TEnrolledCourse={
    id:string;
    course:TCourse;
    user:TUser;
  }