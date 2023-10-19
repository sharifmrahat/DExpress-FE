/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import Spinner from "@/components/common/Spinner";
import { useUserProfileQuery } from "@/redux/api/userApi";
import profileAvatar from "@/assets/images/profileAvatar.png";
import UpdateProfile from "@/components/dashboard/profile/UpdateProfile";
import Modal from "@/components/ui/Modal";

const ProfilePage = () => {
  const { data: userProfile, isLoading } = useUserProfileQuery({
    refetchOnMountOrArgChange: true,
  });
  let [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      {isLoading ? (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 backdrop-blur-md">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="w-full lg:w-2/5 mx-auto px-4">
            <div className="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow dark:bg-gray-800 relative">
              <div className="w-fit m-1 absolute top-0 right-0">
                <p className="px-2 py-0.5 text-sm rounded-full bg-tertiary text-white">
                  {userProfile?.data?.role}
                </p>
              </div>
              <img
                className="object-cover object-center w-full h-56"
                src={
                  userProfile?.data?.imageUrl
                    ? userProfile?.data?.imageUrl
                    : profileAvatar.src
                }
                alt="avatar"
              />
              <div className="px-6 py-4">
                <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {userProfile?.data?.name}
                </h1>

                <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                  <svg
                    aria-label="email icon"
                    className="w-6 h-6 fill-current"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M3.00977 5.83789C3.00977 5.28561 3.45748 4.83789 4.00977 4.83789H20C20.5523 4.83789 21 5.28561 21 5.83789V17.1621C21 18.2667 20.1046 19.1621 19 19.1621H5C3.89543 19.1621 3 18.2667 3 17.1621V6.16211C3 6.11449 3.00333 6.06765 3.00977 6.0218V5.83789ZM5 8.06165V17.1621H19V8.06199L14.1215 12.9405C12.9499 14.1121 11.0504 14.1121 9.87885 12.9405L5 8.06165ZM6.57232 6.80554H17.428L12.7073 11.5263C12.3168 11.9168 11.6836 11.9168 11.2931 11.5263L6.57232 6.80554Z"
                    />
                  </svg>

                  <h1 className="px-2 text-sm">{userProfile?.data?.email}</h1>
                </div>

                <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                  <svg
                    aria-label="phone icon"
                    className="w-6 h-6 fill-current"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M6.176 1.322l2.844-1.322 4.041 7.89-2.724 1.341c-.538 1.259 2.159 6.289 3.297 6.372.09-.058 2.671-1.328 2.671-1.328l4.11 7.932s-2.764 1.354-2.854 1.396c-7.862 3.591-19.103-18.258-11.385-22.281zm1.929 1.274l-1.023.504c-5.294 2.762 4.177 21.185 9.648 18.686l.971-.474-2.271-4.383-1.026.5c-3.163 1.547-8.262-8.219-5.055-9.938l1.007-.497-2.251-4.398z"
                    />
                  </svg>

                  <h1 className="px-2 text-sm">
                    {userProfile?.data?.contactNo ?? "N/A"}
                  </h1>
                </div>

                <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                  <svg
                    aria-label="location pin icon"
                    className="w-6 h-6 fill-current"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M16.2721 10.2721C16.2721 12.4813 14.4813 14.2721 12.2721 14.2721C10.063 14.2721 8.27214 12.4813 8.27214 10.2721C8.27214 8.063 10.063 6.27214 12.2721 6.27214C14.4813 6.27214 16.2721 8.063 16.2721 10.2721ZM14.2721 10.2721C14.2721 11.3767 13.3767 12.2721 12.2721 12.2721C11.1676 12.2721 10.2721 11.3767 10.2721 10.2721C10.2721 9.16757 11.1676 8.27214 12.2721 8.27214C13.3767 8.27214 14.2721 9.16757 14.2721 10.2721Z"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5.79417 16.5183C2.19424 13.0909 2.05438 7.3941 5.48178 3.79418C8.90918 0.194258 14.6059 0.0543983 18.2059 3.48179C21.8058 6.90919 21.9457 12.606 18.5183 16.2059L12.3124 22.7241L5.79417 16.5183ZM17.0698 14.8268L12.243 19.8965L7.17324 15.0698C4.3733 12.404 4.26452 7.9732 6.93028 5.17326C9.59603 2.37332 14.0268 2.26454 16.8268 4.93029C19.6267 7.59604 19.7355 12.0269 17.0698 14.8268Z"
                    />
                  </svg>

                  <h1 className="px-2 text-sm">
                    {userProfile?.data?.address ?? "N/A"}
                  </h1>
                </div>
              </div>
              <div className="mt-4">
                <button
                  onClick={openModal}
                  className="inline-block w-full py-2 px-4 bg-primary text-white"
                >
                  Update
                </button>
              </div>
            </div>
          </div>

          <UpdateProfile
            isOpen={isOpen}
            openModal={openModal}
            setIsOpen={setIsOpen}
          />
        </>
      )}
    </>
  );
};

export default ProfilePage;
