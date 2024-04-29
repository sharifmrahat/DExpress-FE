/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect } from "react";
import { Oswald, Poppins } from "next/font/google";
import Link from "next/link";
import { isLoggedIn, removeUserInfo } from "@/services/auth.service";
import { authKey } from "@/constants/storageKey";
import { useRouter, usePathname } from "next/navigation";
import { useUserProfileQuery } from "@/redux/api/userApi";
import { useAppSelector } from "@/redux/hooks";
import { useDispatch } from "react-redux";
import { setProfile, handleLogout } from "@/redux/slice/profileSlice";
import { useAllServicesQuery } from "@/redux/api/serviceAPI";
import { services } from "@prisma/client";
import { Avatar, Burger, Button, Drawer, Group, Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { USER_ROLE } from "@/constants/role";
import Spinner from "./Spinner";
import dexpressLogo from "@/assets/images/dexpress.png";

const poppins = Poppins({ style: "normal", weight: "400", subsets: ["latin"] });
const oswald = Oswald({ style: "normal", weight: "600", subsets: ["latin"] });

export default function Header() {
  const [opened, { toggle, close }] = useDisclosure();
  const { profile } = useAppSelector((state) => state.profile);

  const { data, isLoading, refetch } = useUserProfileQuery({});

  const { data: services, isSuccess } = useAllServicesQuery({ limit: 6 });

  const dispatch = useDispatch();

  const userLoggedIn = isLoggedIn();

  const router = useRouter();
  const pathName = usePathname();

  const signOut = () => {
    removeUserInfo(authKey);
    dispatch(handleLogout());
    router.push("/login");
    window?.location?.reload();
  };

  useEffect(() => {
    if (userLoggedIn) {
      refetch();
      if (data?.success) {
        dispatch(setProfile(data?.data));
      }
    } else {
      dispatch(setProfile({}));
    }
  }, [userLoggedIn, data, dispatch, refetch]);

  return (
    <header className={`${poppins.className} bg-white sticky top-0 z-50`}>
      <nav
        className="hidden lg:flex mx-auto w-full max-w-7xl items-center justify-between py-4"
        aria-label="Global"
      >
        {/* Heading */}
        <div className="flex flex-1">
          <Link
            href="/"
            className="-m-1.5 p-1.5 flex flex-row justify-center items-center gap-2"
          >
            <img className="h-7 w-auto" src={dexpressLogo.src} alt="DExpress" />
            <span
              className={`text-xl lg:text-3xl text-secondary pl-5 lg:pl-0 ${oswald.className}`}
            >
              DExpress
            </span>
          </Link>
        </div>
        {/* Routes  */}
        <div className="flex gap-x-12 justify-center items-center">
          <Link
            href="/"
            className={`text-sm font-semibold leading-6  hover:text-primary ${
              pathName === "/" ? "text-primary" : "text-secondary"
            }`}
          >
            Home
          </Link>
          <Link
            href="/packages"
            className={`text-sm font-semibold leading-6  hover:text-primary ${
              pathName === "/packages" ? "text-primary" : "text-secondary"
            }`}
          >
            Package
          </Link>
          <Menu
            shadow="md"
            width={300}
            trigger="hover"
            openDelay={100}
            closeDelay={300}
          >
            <Menu.Target>
              <Link
                href="/services"
                className={`text-sm font-semibold leading-6  hover:text-primary ${
                  pathName === "/services" ? "text-primary" : "text-secondary"
                }`}
              >
                <span>Service</span>
              </Link>
            </Menu.Target>
            {isSuccess && (
              <Menu.Dropdown>
                {services.data.result &&
                  services.data.result.map((service: services) => (
                    <Link key={service.id} href={`/services/${service.id}`}>
                      <Menu.Item className="hover:bg-primary text-secondary hover:text-white">
                        {service.title}
                      </Menu.Item>
                    </Link>
                  ))}
              </Menu.Dropdown>
            )}
          </Menu>

          <Link
            href="/feedbacks"
            className={`text-sm font-semibold leading-6  hover:text-primary ${
              pathName === "/feedbacks" ? "text-primary" : "text-secondary"
            }`}
          >
            Feedback
          </Link>
          <Link
            href="/articles"
            className={`text-sm font-semibold leading-6  hover:text-primary ${
              pathName === "/articles" ? "text-primary" : "text-secondary"
            }`}
          >
            Article
          </Link>
        </div>

        {/* Login vs Avatar */}
        <div className="flex flex-1 justify-end items-center gap-8">
          {userLoggedIn && data?.success ? (
            <div>
              <Menu shadow="md" width={200} openDelay={100} closeDelay={200}>
                <Menu.Target>
                  <Avatar
                    src={profile?.imageUrl}
                    className="border-2 border-primary cursor-pointer"
                    alt={profile?.name}
                    color="#ff3f39"
                    size="md"
                  >
                    {profile?.name?.charAt(0)?.toUpperCase()}
                  </Avatar>
                </Menu.Target>
                <Menu.Dropdown>
                  <p className="text-center font-semibold text-secondary my-2">
                    {profile?.name}
                  </p>
                  <Link href="/profile">
                    <Menu.Item className="hover:text-primary text-secondary">
                      Profile
                    </Menu.Item>
                  </Link>
                  <Link
                    href={
                      profile?.role === USER_ROLE.CUSTOMER
                        ? "/my-bookings"
                        : "/manage-bookings"
                    }
                  >
                    <Menu.Item className="hover:text-primary text-secondary">
                      Bookings
                    </Menu.Item>
                  </Link>

                  <div onClick={() => signOut()}>
                    <Menu.Item className="hover:bg-primary text-secondary hover:text-white">
                      Logout
                    </Menu.Item>
                  </div>
                </Menu.Dropdown>
              </Menu>
            </div>
          ) : isLoading ? (
            <>
              <div>
                <Spinner size={40} />
              </div>
            </>
          ) : (
            <Group>
              <Link href="/signup">
                <Button variant="light" color="#ff3f39">
                  Sign Up
                </Button>
              </Link>
              <Link href="/login">
                <Button color="#ff3f39">Login</Button>
              </Link>
            </Group>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      <nav
        className="flex lg:hidden items-center justify-between p-4"
        aria-label="Global"
      >
        {/* Heading */}
        <div className="flex">
          <Link
            href="/"
            className="flex flex-row justify-center items-center gap-2"
          >
            <img className="h-4 w-auto" src={dexpressLogo.src} alt="DExpress" />
            <span className={`text-xl text-secondary ${oswald.className}`}>
              DExpress
            </span>
          </Link>
        </div>

        {/* Avatar & Burger */}
        <div className="flex flex-1 justify-end items-center gap-4">
          {userLoggedIn && data?.success ? (
            <div>
              <Menu shadow="md" width={200} openDelay={100} closeDelay={200}>
                <Menu.Target>
                  <Avatar
                    src={profile?.imageUrl}
                    className="border-2 border-primary cursor-pointer"
                    alt={profile?.name}
                    color="#ff3f39"
                    size="sm"
                  >
                    {profile?.name?.charAt(0)?.toUpperCase()}
                  </Avatar>
                </Menu.Target>
                <Menu.Dropdown>
                  <p className="text-center font-semibold text-secondary my-2">
                    {profile?.name}
                  </p>
                  <Link href="/profile">
                    <Menu.Item className="hover:text-primary text-secondary">
                      Profile
                    </Menu.Item>
                  </Link>
                  <Link
                    href={
                      profile?.role === USER_ROLE.CUSTOMER
                        ? "/my-bookings"
                        : "/manage-bookings"
                    }
                  >
                    <Menu.Item className="hover:text-primary text-secondary">
                      Bookings
                    </Menu.Item>
                  </Link>

                  <div onClick={() => signOut()}>
                    <Menu.Item className="hover:bg-primary text-secondary hover:text-white">
                      Logout
                    </Menu.Item>
                  </div>
                </Menu.Dropdown>
              </Menu>
            </div>
          ) : isLoading ? (
            <>
              <div>
                <Spinner size={30} />
              </div>
            </>
          ) : (
            <Group>
              {/* <Link href="/signup">
                <Button variant="light" color="#ff3f39" size="xs">
                  Sign Up
                </Button>
              </Link> */}
              <Link href="/login">
                <Button color="#ff3f39" size="xs" variant="light">
                  Login
                </Button>
              </Link>
            </Group>
          )}
          {/* Burger */}
          <div>
            <Burger
              opened={opened}
              onClick={toggle}
              color="#ff3f39"
              aria-label="Toggle navigation"
            />
          </div>
        </div>
      </nav>
      <Drawer position="right" size="xs" opened={opened} onClose={close}>
        {/* Drawer content */}

        <div className="flex flex-col gap-y-2 justify-start items-start text-sm">
          <Link
            href="/"
            className={`font-semibold leading-6 text-secondary hover:text-white hover:bg-primary p-2 rounded block w-full ${
              pathName === "/" ? "bg-primary text-white" : ""
            }`}
          >
            Home
          </Link>
          <Link
            href="/packages"
            className={`font-semibold leading-6 text-secondary hover:text-white hover:bg-primary p-2 rounded block w-full ${
              pathName === "/packages" ? "bg-primary text-white" : ""
            }`}
          >
            Package
          </Link>
          <Link
            href="/services"
            className={`font-semibold leading-6 text-secondary hover:text-white hover:bg-primary p-2 rounded block w-full ${
              pathName === "/services" ? "bg-primary text-white" : ""
            }`}
          >
            Services
          </Link>
          <Link
            href="/feedbacks"
            className={`font-semibold leading-6 text-secondary hover:text-white hover:bg-primary p-2 rounded block w-full ${
              pathName === "/feedbacks" ? "bg-primary text-white" : ""
            }`}
          >
            Feedback
          </Link>
          <Link
            href="/articles"
            className={`font-semibold leading-6 text-secondary hover:text-white hover:bg-primary p-2 rounded block w-full ${
              pathName === "/articles" ? "bg-primary text-white" : ""
            }`}
          >
            Article
          </Link>
        </div>
      </Drawer>
    </header>
  );
}
