"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const setAccessToken = (token: string, option?: any) => {
  cookies().set("token", token);
  if (option && option?.redirect) {
    redirect(option.redirect);
  }
};

export default setAccessToken;
