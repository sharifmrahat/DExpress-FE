/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import { Oswald } from "next/font/google";
import SignupForm from "@/components/authpage/SignupForm";
import signupImage from "@/assets/images/sign-up.png";
import dexpressLogo from "@/assets/images/dexpress.png";
import Link from "next/link";
import { isLoggedIn } from "@/services/auth.service";
import { notFound } from "next/navigation";

const oswald = Oswald({ style: "normal", weight: "600", subsets: ["latin"] });

const SignupPage = () => {
  const userLoggedIn = isLoggedIn();
  if (userLoggedIn) {
    return notFound();
  }
  return (
    <div className="px-4 lg:px-0">
      <div className="flex flex-row justify-center items-center gap-20 shadow-lg rounded p-5 mx-auto my-10 bg-white border-2 border-secondary max-w-4xl">
        <div className="w-full hidden lg:block">
          <img src={signupImage.src} className="w-[400px]" />
        </div>

        <div className="w-full">
          <div className="mb-8 lg:mb-16">
            <Link
              href="/"
              className={`text-xl lg:text-3xl font-semibold cursor-pointer text-secondary ${oswald.className} flex flex-row justify-start items-center gap-2`}
            >
              <img
                className="h-4 lg:h-6 w-auto"
                src={dexpressLogo.src}
                alt="DExpress"
              />
              <p> DExpress</p>
            </Link>
            <p className="text-secondary max-w-sm text-xs lg:text-base mt-1">
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
