"use client";
import Button from "@/components/button/Button";
import Checkbox from "@/components/input/Checkbox";
import Input from "@/components/input/Input";
import AuthLayouts from "@/components/layouts/AuthLayouts";
import axios from "axios";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage(searchParams: any) {
  const { push } = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const callbackUrl = searchParams.searchParams.callbackUrl || "/";
  const handleLogin = async (event: any) => {
    event.preventDefault();
    setIsloading(true);
    setError("");
    try {
      const session = await signIn("credentials", {
        redirect: false,
        email: event.target.email.value,
        password: event.target.password.value,
        callbackUrl,
      });
      const respone = await axios.post("/api/auth/login", {
        email: event.target.email.value,
        password: event.target.password.value,
      });
      const data = await respone.data;
      if (!session?.error) {
        push(callbackUrl);
        event.target.reset();
        setIsloading(false);
      } else {
        setIsloading(false);
        setError(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <AuthLayouts title="Sign in to your account">
        <form className="mt-8" onSubmit={handleLogin}>
          <input name="remember" type="hidden" value="true" />
          <div className="rounded-md shadow-sm ">
            <div className="">
              <Input
                id="email"
                name="email"
                title="Email"
                placeholder=""
                className=""
                type="email"
              />
            </div>
            <div className="">
              <Input
                id="password"
                name="password"
                title="Password"
                placeholder=""
                className=""
                type="password"
              />
            </div>
          </div>
          <div className="">
            <p className="text-red-500 font-normal text-sm text-left">{error}</p>
          </div>
          <div className="flex items-center justify-between my-5">
            <div className="flex items-center">
              <Checkbox
                id="remember_me"
                name="remember_me"
                title="Remember me"
              />
            </div>
            <div className="text-sm">
              <Link
                className="font-medium text-indigo-600 hover:text-indigo-500"
                href="#"
              >
                Forgot your password?
              </Link>
            </div>
          </div>
          <Button name={isLoading ? "loading..." : "Sign in"} type="submit" />
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don&apos;t have an account?{" "}
            <Link
              className="font-medium text-indigo-600 hover:text-indigo-500"
              href="/register"
            >
              Sign up
            </Link>
          </p>
        </div>
      </AuthLayouts>
    </>
  );
}
