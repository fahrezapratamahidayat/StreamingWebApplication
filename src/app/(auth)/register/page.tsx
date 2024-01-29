"use client";

import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as Yup from "yup";
import AuthLayouts from "@/components/layouts/AuthLayouts";
import Input from "@/components/input/Input";
import Checkbox from "@/components/input/Checkbox";
import Button from "@/components/button/Button";

export default function RegisterPage() {
  const { push } = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const RegisterUser = async (event: any) => {
    const { fullname, email, password, confirm_password, agree } =
      formik.values;
    setIsloading(true);
    setError("");
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullname: fullname,
        email: email,
        password: password,
      }),
    });
    if (res.status === 200) {
      formik.resetForm();
      push("/login");
      setIsloading(false);
    } else {
      setIsloading(false);
      setError("email already exist");
    }
  };

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      confirm_password: "",
      agree: false,
    },
    onSubmit: RegisterUser,
    validationSchema: Yup.object({
      fullname: Yup.string().required("Fullname is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required")
        .email(),
      password: Yup.string()
        .required("Password is required")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Passwords must include uppercase, lowercase, numbers, and special characters."
        ),
      confirm_password: Yup.string().oneOf(
        [Yup.ref("password")],
        "Passwords must match"
      ),
    }),
  });
  const handleForm = (event: any) => {
    const { target } = event;
    formik.setFieldValue(target.name, target.value);
  };
  return (
    <>
      <AuthLayouts title="Create Your account">
        <form
          action="#"
          className="mt-8 space-y-6 transition-all"
          method="POST"
          onSubmit={formik.handleSubmit}
        >
          <div className="flex flex-col w-full">
            <div className="">
              <Input
                id="fullname"
                name="fullname"
                onChange={handleForm}
                title="Full name"
                placeholder=""
                className=""
                type="text"
              />
              <div className="w-full text-sm transition-transform duration-75 ease-in-out">
                <p className="text-red-500">{formik.errors.fullname}</p>
              </div>
            </div>
            <div className="">
              <Input
                id="email"
                name="email"
                onChange={handleForm}
                title="Email"
                placeholder=""
                className=""
                type="email"
              />
              <div className="w-full pl-3 text-sm">
                <p className="text-red-500">{formik.errors.email}</p>
              </div>
            </div>
            <div className="">
              <Input
                id="password"
                name="password"
                onChange={handleForm}
                title="Password"
                placeholder=""
                className={`${
                  formik.errors.password
                    ? `invalid:border-red-500 invalid:text-red-500
                    focus:invalid:border-red-500 focus:invalid:ring-red-500 `
                    : "focus:border-blue-800 focus:outline-none focus:ring-0"
                }`}
                type="password"
              />
              <div className="w-full pl-3 text-sm">
                <p className="text-red-500 ">{formik.errors.password}</p>
              </div>
            </div>
            <div className="">
              <Input
                id="confirm_password"
                name="confirm_password"
                onChange={handleForm}
                title="Confirm Password"
                placeholder=""
                className=""
                type="password"
              />
              <div className="w-full pl-3 text-sm">
                <p className="text-red-500 ">
                  {formik.errors.confirm_password}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Checkbox
                id="agree"
                name="agree"
                title="I agree to the terms and conditions"
                onChange={handleForm}
              />
            </div>
          </div>
          {isLoading ? (
            <Button name="Loading..." type="submit" />
          ) : (
            <Button name="Sign up" type="submit" />
          )}
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              className="font-medium text-indigo-600 hover:text-indigo-500"
              href="/login"
            >
              Sign in
            </Link>
          </p>
        </div>
      </AuthLayouts>
    </>
  );
}
