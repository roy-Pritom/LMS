import { FieldValues } from "react-hook-form";

import setAccessToken from "./setAccessToken";

export const loginUser = async (data: FieldValues) => {
  const res = await fetch(
    "https://lms-server-nine-phi.vercel.app/api/v1/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    }
  );
  const userData = await res.json();
  if (userData?.data?.accessToken) {
    setAccessToken(userData?.data?.accessToken);
  }
  return userData;
};
