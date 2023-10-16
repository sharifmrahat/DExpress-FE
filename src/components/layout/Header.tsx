/* eslint-disable @next/next/no-img-element */
"use client";
import { Fragment, useState } from "react";
import {
  Dialog,
  Disclosure,
  Popover,
  Menu,
  Transition,
} from "@headlessui/react";
import {
  Bars3Icon,
  SquaresPlusIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Oswald } from "next/font/google";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";
import { authKey } from "@/constants/storageKey";
import { useRouter } from "next/navigation";

const poppins = Poppins({ style: "normal", weight: "400", subsets: ["latin"] });
const oswald = Oswald({ style: "normal", weight: "600", subsets: ["latin"] });

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { userId, name, email, role, imageUrl } = getUserInfo() as any;

  const router = useRouter();

  const signOut = () => {
    removeUserInfo(authKey);
    router.push("/login");
  };

  return (
    <header className={`${poppins.className} bg-primary sticky top-0 z-30`}>
      <nav
        className="mx-auto flex lg:max-w-7xl items-center justify-between py-4"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span
              className={`text-xl lg:text-3xl text-accent pl-5 lg:pl-0 ${oswald.className}`}
            >
              Lorry Lagbe
            </span>
            {/* <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            /> */}
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-end rounded-md p-2.5 text-accent"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Link
            href="/"
            className="text-sm font-semibold leading-6 text-accent hover:text-secondary"
          >
            Home
          </Link>
          <Link
            href="/service"
            className="text-sm font-semibold leading-6 text-accent hover:text-secondary"
          >
            Service
          </Link>
          <Link
            href="/blogs"
            className="text-sm font-semibold leading-6 text-accent hover:text-secondary"
          >
            Blogs
          </Link>
          <Link
            href="/feedbacks"
            className="text-sm font-semibold leading-6 text-accent hover:text-secondary"
          >
            Feedbacks
          </Link>
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center gap-8">
          <Link
            href="/pc-builder"
            className="text-sm font-semibold leading-6 text-accent border-2 py-1 px-3 rounded border-secondary hover:text-secondary"
          >
            <SquaresPlusIcon className="w-4 h-4 mr-3 inline-block" />
            Book Now
          </Link>
          {userId ? (
            <Menu as="div" className="relative ml-3">
              <div>
                <Menu.Button className="relative flex rounded-full bg-white text-sm border-2 border-secondary">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  {imageUrl ? (
                    <img
                      className="h-10 w-10 rounded-full"
                      src={imageUrl}
                      alt=""
                    />
                  ) : (
                    <UserCircleIcon className="h-10 w-10 text-slate-500" />
                  )}
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    <p className="px-4 py-1 text-primary font-semibold text-center">
                      {userId}
                    </p>
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/profile"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        Profile
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/bookings"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        bookings
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        onClick={() => signOut()}
                        className={classNames(
                          active ? "bg-red-200 text-primary" : "text-primary",
                          "block px-4 py-2 text-sm text-red-600 cursor-pointer"
                        )}
                      >
                        Logout
                      </div>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          ) : (
            <Link
              href="/login"
              className="text-sm font-semibold leading-6 text-primary bg-accent py-1 px-3 rounded hover:bg-secondary hover:border-secondary border-2"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-primary px-6 py-6 sm:max-w-sm">
          <div className="flex items-center justify-between">
            {/* <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a> */}
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-accent/50">
              <div className="py-6 flex flex-row justify-center items-center gap-5">
                <Link
                  onClick={() => setMobileMenuOpen(false)}
                  href="/pc-builder"
                  className="text-sm font-semibold leading-6 text-accent border-2 py-1 px-3 rounded border-secondary hover:text-secondary w-fit text-center"
                >
                  <SquaresPlusIcon className="w-4 h-4 mr-3 inline-block" />
                  Book Now
                </Link>
                {userId ? (
                  <Menu as="div" className="relative ml-3 w-fit">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-white text-sm border-2 border-secondary w-fit">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        {imageUrl ? (
                          <img
                            className="h-10 w-10 rounded-full"
                            src={imageUrl}
                            alt=""
                          />
                        ) : (
                          <UserCircleIcon className="h-10 w-10 text-slate-500" />
                        )}
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          <p className="px-4 py-1 text-primary font-semibold text-center">
                            {userId}
                          </p>
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              onClick={() => setMobileMenuOpen(false)}
                              href="/profile"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              onClick={() => setMobileMenuOpen(false)}
                              href="/orders"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Orders
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <div
                              onClick={() => signOut()}
                              className={classNames(
                                active
                                  ? "bg-red-200 text-primary"
                                  : "text-primary",
                                "block px-4 py-2 text-sm text-red-600 cursor-pointer"
                              )}
                            >
                              Logout
                            </div>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <Link
                    onClick={() => setMobileMenuOpen(false)}
                    href="/login"
                    className="text-sm font-semibold leading-6 text-primary bg-accent py-1 px-3 rounded hover:bg-secondary hover:border-secondary border-2 w-fit"
                  >
                    Login
                  </Link>
                )}
              </div>
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Link
                        onClick={() => setMobileMenuOpen(false)}
                        href="/"
                        className="rounded py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-accent hover:bg-accent hover:text-primary block"
                      >
                        Home
                      </Link>
                      <Link
                        onClick={() => setMobileMenuOpen(false)}
                        href="/products"
                        className="rounded py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-accent hover:bg-accent hover:text-primary block"
                      >
                        Products
                      </Link>
                      <Link
                        onClick={() => setMobileMenuOpen(false)}
                        href="/promotion"
                        className="rounded py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-accent hover:bg-accent hover:text-primary block"
                      >
                        Promotion
                      </Link>
                      <Link
                        onClick={() => setMobileMenuOpen(false)}
                        href="/service"
                        className="rounded py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-accent hover:bg-accent hover:text-primary block"
                      >
                        Service
                      </Link>
                    </>
                  )}
                </Disclosure>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
