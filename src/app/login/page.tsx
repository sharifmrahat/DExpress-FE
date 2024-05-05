/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import { Oswald } from "next/font/google";
import loginImage from "@/assets/images/login.png";
import Link from "next/link";
import LoginForm from "@/components/authpage/LoginForm";
import dexpressLogo from "@/assets/images/dexpress.png";
import { isLoggedIn } from "@/services/auth.service";
import { notFound } from "next/navigation";
import { Image } from "@mantine/core";

const oswald = Oswald({ style: "normal", weight: "600", subsets: ["latin"] });

const LoginPagePage = () => {
  const userLoggedIn = isLoggedIn();
  if (userLoggedIn) {
    return notFound();
  }
  return (
    <div className="px-4 lg:px-0">
      <div className="flex flex-row justify-center items-center gap-20 shadow border rounded p-5 mx-auto my-10 bg-white max-w-4xl">
        <div className="w-full hidden lg:block">
          <Image src={loginImage.src} alt="login" className="w-[400px]" />
        </div>

        <div className="w-full">
          <div className="mb-8 lg:mb-16">
            <Link
              href="/"
              className={`text-2xl lg:text-3xl font-semibold cursor-pointer text-secondary ${oswald.className} flex flex-row justify-start items-center gap-2`}
            >
              <Image
                className="h-5 lg:h-7 w-auto"
                src={dexpressLogo.src}
                alt="DExpress"
              />
              <p> DExpress</p>
            </Link>
            <p className="text-secondary max-w-sm text-sm lg:text-base mt-1">
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
