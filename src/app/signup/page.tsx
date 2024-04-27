/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import { Oswald } from "next/font/google";
import SignupForm from "@/components/signup/SignupForm";
import signupImage from "@/assets/images/sign-up.png";
import Link from "next/link";

const oswald = Oswald({ style: "normal", weight: "600", subsets: ["latin"] });

const SignupPage = () => {
  return (
    <div className="px-4 lg:px-0">
      <div className="flex flex-row justify-center items-center gap-20 shadow-lg rounded p-5 mx-auto my-10 bg-white border-2 border-secondary max-w-4xl">
        <div className="w-full hidden lg:block">
          <img src={signupImage.src} className="w-[400px]" />
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
          <SignupForm />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
