/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import { Oswald } from "next/font/google";
import loginImage from "@/assets/images/login.png";
import Link from "next/link";
import LoginForm from "@/components/login/LoginForm";

const oswald = Oswald({ style: "normal", weight: "600", subsets: ["latin"] });

const LoginPagePage = () => {
  return (
    <div className="px-4 lg:px-0">
      <div className="flex flex-row justify-center items-center gap-20 shadow-lg rounded p-5 mx-auto my-10 bg-white border-2 border-secondary max-w-4xl">
        <div className="w-full hidden lg:block">
          <img src={loginImage.src} className="w-[400px]" />
        </div>

        <div className="w-full">
          <div className="mb-4">
            <Link
              href="/"
              className={`text-center text-3xl font-semibold cursor-pointer text-primary ${oswald.className}`}
            >
              DExpress
            </Link>
            <p className="text-secondary">
              The incredible tale of reliable logistics
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPagePage;
