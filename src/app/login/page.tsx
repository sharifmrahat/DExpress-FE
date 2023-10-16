/* eslint-disable @next/next/no-img-element */
"use client";
// import loginImage from "@/assets/images/login-image.jpg";
import LoginForm from "@/components/login/LoginForm";
import Link from "next/link";
import { Oswald } from "next/font/google";
import { useUserLoginMutation } from "@/redux/api/authApi";
import { useRouter } from "next/navigation";
import { storeUserInfo } from "@/services/auth.service";

const oswald = Oswald({ style: "normal", weight: "600", subsets: ["latin"] });

const LoginPage = () => {
  const [userLogin] = useUserLoginMutation();
  const router = useRouter();

  // console.log(isLoggedIn());

  const handleLoginSubmit = async (data: any) => {
    try {
      const res = await userLogin({ ...data }).unwrap();
      // console.log(res);
      if (res?.accessToken) {
        router.push("/profile");
        // message.success("User logged in successfully!");
      }
      storeUserInfo({ accessToken: res?.accessToken });
      // console.log(res);
    } catch (err: any) {
      console.error(err.message);
    }
  };
  return (
    <div className="flex flex-col lg:flex-row justify-center items-center h-screen gap-10 overflow-hidden">
      <div className="lg:w-1/2 hidden lg:block">
        <img src="" className="h-screen w-full object-cover" alt="" />
      </div>
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center lg:h-full px-5 lg:px-0">
        <section className="pb-10 text-center">
          {/* <div>Logo</div> */}
          <Link
            href="/"
            className={`text-center text-3xl font-semibold cursor-pointer text-primary ${oswald.className}`}
          >
            Lorry Lagbe
          </Link>
        </section>
        <section className="mb-10">
          <div className="bg-white p-6 rounded shadow">
            <LoginForm onSubmit={handleLoginSubmit} isLoading={false} />
            <p className="text-center mt-5 text-sm text-slate-700">
              {"Don't"} have an account?{" "}
              <Link
                href="/signup"
                className="text-primary underline focus:outline-none ml-2"
              >
                Signup
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LoginPage;
