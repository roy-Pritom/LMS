import { useLoginStudentMutation } from "@/redux/api/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import setAccessToken from "@/services/action/setAccessToken";
import { decodeToken } from "@/utils/decodeToken";
import { Button, Form, Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";

type LoginFormValues = {
  email: string;
  password: string;
  profession?: string;
};

const LoginForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const [login] = useLoginStudentMutation();
  const dispatch = useAppDispatch();

  const router = useRouter();

  const onSubmit = async (data: LoginFormValues) => {
    const toastId = toast.loading("processing");
    console.log("Login Data:", data);
    try {
      const res = await login(data);
      // console.log(res)
      if (res?.data?.success === true) {
        const token = res?.data?.data?.accessToken;
        if (token) {
          const user = decodeToken(token);
          // set cookie
          setAccessToken(token);
          // set token in redux state
          dispatch(setUser({ user, token }));
        }
        toast.success("User Login Successfully", {
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
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg w-full">
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
      <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
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
            Login
          </Button>
        </Form.Item>
      </Form>
      <p className="text-center text-sm">
        New to here ?{" "}
        <Link href="/register" className="text-blue-500">
          Plase SignUp
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
