/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import { Oswald } from "next/font/google";
import SignupForm from "@/components/signup/SignupForm";
import signupImage from "@/assets/images/Sign-up.gif";

const oswald = Oswald({ style: "normal", weight: "600", subsets: ["latin"] });

const SignupPage = () => {
  return (
    <div className="flex flex-row justify-center items-center gap-20 shadow-md rounded p-5 w-fit mx-auto my-20 border-2 border-primary">
      <div>
        <img src={signupImage.src} className="w-[400px]" />
      </div>

      <div className="w-1/3">
        <SignupForm />
      </div>
    </div>
  );
};

export default SignupPage;
