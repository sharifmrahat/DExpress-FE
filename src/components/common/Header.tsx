/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect } from "react";
import { Oswald } from "next/font/google";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { isLoggedIn, removeUserInfo } from "@/services/auth.service";
import { authKey } from "@/constants/storageKey";
import { useRouter } from "next/navigation";
import { useUserProfileQuery } from "@/redux/api/userApi";
import { useAppSelector } from "@/redux/hooks";
import { useDispatch } from "react-redux";
import { setProfile, handleLogout } from "@/redux/slice/profileSlice";
import { useAllServicesQuery } from "@/redux/api/serviceAPI";
import { services } from "@prisma/client";
import { Avatar, Button, Group, Menu, Skeleton } from "@mantine/core";
import { IconChevronUp, IconChevronDown } from "@tabler/icons-react";
import { useHover } from "@mantine/hooks";
import { USER_ROLE } from "@/constants/role";
import Spinner from "./Spinner";

const poppins = Poppins({ style: "normal", weight: "400", subsets: ["latin"] });
const oswald = Oswald({ style: "normal", weight: "600", subsets: ["latin"] });

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const { profile } = useAppSelector((state) => state.profile);

  const { data, isLoading, refetch } = useUserProfileQuery({});

  const {
    data: services,
    isSuccess,
    isLoading: serviceLoading,
  } = useAllServicesQuery({ limit: 6 });

  const dispatch = useDispatch();

  const userLoggedIn = isLoggedIn();

  const router = useRouter();

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
        className="mx-auto flex w-full lg:max-w-7xl items-center justify-between py-4"
        aria-label="Global"
      >
        {/* Heading */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span
              className={`text-xl lg:text-3xl text-primary pl-5 lg:pl-0 ${oswald.className}`}
            >
              DExpress
            </span>
            {/* <img
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt=""
          /> */}
          </Link>
        </div>
        {/* Routes  */}
        <div className="flex gap-x-12 justify-center items-center">
          <Link
            href="/"
            className="text-sm font-semibold leading-6 text-secondary hover:text-primary"
          >
            Home
          </Link>
          <Link
            href="/packages"
            className="text-sm font-semibold leading-6 text-secondary hover:text-primary"
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
                className="flex gap-2 text-sm font-semibold leading-6 text-secondary hover:text-primary"
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
            className="text-sm font-semibold leading-6 text-secondary hover:text-primary"
          >
            Feedback
          </Link>
          <Link
            href="/articles"
            className="text-sm font-semibold leading-6 text-secondary hover:text-primary"
          >
            Article
          </Link>
        </div>

        <div className="flex flex-1 justify-end items-center gap-8">
          {userLoggedIn && data?.success ? (
            <div>
              <Menu shadow="md" width={200} openDelay={100} closeDelay={200}>
                <Menu.Target>
                  <Avatar
                    src={profile?.imageUrl}
                    className="border-2 border-primary"
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
    </header>
  );
}
