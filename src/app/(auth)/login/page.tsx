"use client";
import Button from "@/components/button/Button";
import Checkbox from "@/components/input/Checkbox";
import Input from "@/components/input/Input";
import AuthLayouts from "@/components/layouts/AuthLayouts";
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
      const res = await signIn("credentials", {
        redirect: false,
        email: event.target.email.value,
        password: event.target.password.value,
        callbackUrl,
      });
      if (!res?.error) {
        push(callbackUrl);
        event.target.reset();
        setIsloading(false);
      } else {
        setIsloading(false);
        if (res.status === 401) {
          setError("Invalid email or password");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {/* <div className="flex min-h-screen items-center justify-center ">
        <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form className="space-y-6" onSubmit={(e) => handleLogin(e)}>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Sign in to our platform
            </h3>
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
              >
                Your password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {isLoading ? "loading..." : "Login"}
            </button>
            {error !== "" && (
              <p className="text-red-500 font-normal text-center">{error}</p>
            )}
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Not registered?{" "}
              <Link
                href="/register"
                className="text-blue-700 hover:underline dark:text-blue-500"
              >
                Create account
              </Link>
            </div>
          </form>
        </div>
      </div> */}
      <AuthLayouts title="Sign in to your account">
        <form
          className="mt-8 space-y-6"
          onSubmit={handleLogin}
        >
          <input name="remember" type="hidden" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
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
          <div className="flex items-center justify-between">
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
          <Button name="Sign in" type="submit" />
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
