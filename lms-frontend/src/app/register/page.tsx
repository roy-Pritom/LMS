"use client";
import {
  useCreateStudentMutation,
  useLoginStudentMutation,
} from "@/redux/api/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import setAccessToken from "@/services/action/setAccessToken";
import { decodeToken } from "@/utils/decodeToken";
import { Button, Form, Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
};

const RegisterPage: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>();

  const [createStudent] = useCreateStudentMutation();
  const [login] = useLoginStudentMutation();
  const dispatch = useAppDispatch();

  const router = useRouter();

  const onSubmit = async (data: RegisterFormValues) => {
    const toastId = toast.loading("processing");
    console.log("Login Data:", data);
    const loginData = {
      email: data.email,
      password: data.password,
    };
    try {
      const res = await createStudent(data);
      // console.log(res)
      if (res?.data?.success === true) {
        const loginRes = await login(loginData);
        const token = loginRes?.data?.data?.accessToken;
        if (token) {
          const user = decodeToken(token);
          // set token in redux state
          setAccessToken(token);
          dispatch(setUser({ user, token }));
        }
        toast.success("User register Successfully", {
          id: toastId,
          duration: 1000,
        });
        router.push("/");
      } else {
        toast.error("Something went wrong", { id: toastId, duration: 1000 });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", { id: toastId, duration: 1000 });
    }
  };

  return (
    <div className="container mx-auto flex justify-center items-center  w-full min-h-screen">
      <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg w-full">
        <h2 className="text-2xl font-bold text-center mb-4">SignUp</h2>
        <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
          {/* name Field */}
          <Form.Item
            label="Name"
            validateStatus={errors.name ? "error" : ""}
            help={errors.name?.message}
          >
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{
                required: "name is required",
              }}
              render={({ field }) => (
                <Input {...field} placeholder="Enter your name" />
              )}
            />
          </Form.Item>
          {/* Email Field */}
          <Form.Item
            label="Email"
            validateStatus={errors.email ? "error" : ""}
            help={errors.email?.message}
          >
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Invalid email format",
                },
              }}
              render={({ field }) => (
                <Input {...field} placeholder="Enter your email" />
              )}
            />
          </Form.Item>

          {/* Password Field */}
          <Form.Item
            label="Password"
            validateStatus={errors.password ? "error" : ""}
            help={errors.password?.message}
          >
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <Input.Password {...field} placeholder="Enter your password" />
              )}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              SignUp
            </Button>
          </Form.Item>
        </Form>
        <p className="text-center text-sm">
          Already have an account ?{" "}
          <Link href="/login" className="text-blue-500">
            Plase login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
