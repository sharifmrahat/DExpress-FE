/* eslint-disable @next/next/no-img-element */
"use client";
import { useMemo, useState } from "react";
import { Oswald, Poppins } from "next/font/google";
import Link from "next/link";
import { isLoggedIn, removeUserInfo } from "@/services/auth.service";
import { authKey } from "@/constants/storageKey";
import { useRouter, usePathname } from "next/navigation";
import { useUserProfileQuery } from "@/redux/api/userApi";
import { useAllServicesQuery } from "@/redux/api/serviceAPI";
import { Role, services, users } from "@prisma/client";
import {
  Avatar,
  Badge,
  Burger,
  Button,
  Drawer,
  Group,
  Menu,
  Modal,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Spinner from "./Spinner";
import dexpressLogo from "@/assets/images/dexpress.png";
import {
  IconLayoutDashboard,
  IconLogout,
  IconSquareRoundedPlus,
  IconUserSquareRounded,
} from "@tabler/icons-react";

const poppins = Poppins({ style: "normal", weight: "400", subsets: ["latin"] });
const oswald = Oswald({ style: "normal", weight: "600", subsets: ["latin"] });

export default function Header() {
  const [opened, { toggle, close }] = useDisclosure();

  const [openModal, setOpenModal] = useState<boolean>(false);

  const { data, isLoading } = useUserProfileQuery({});

  const profile = useMemo(() => data?.data as users, [data]);

  const { data: services, isSuccess } = useAllServicesQuery({
    limit: 6,
    sortBy: "totalBooking",
  });

  const userLoggedIn = isLoggedIn();

  const router = useRouter();
  const pathName = usePathname();

  const signOut = () => {
    removeUserInfo(authKey);
    setOpenModal(false);
    router.push("/");
  };

  return (
    <header
      className={`${poppins.className} bg-white sticky top-0 z-50 shadow`}
    >
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
              className={`text-3xl text-secondary pl-5 lg:pl-0 ${oswald.className}`}
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
                  <div className="my-2 text-center">
                    <p className="font-semibold text-secondary">
                      {profile?.name}
                    </p>
                    <Badge variant="light" color="#ff3f39">
                      {profile?.role}
                    </Badge>
                  </div>

                  <Link href="/new-booking">
                    <Menu.Item className="hover:text-primary text-secondary hover:font-semibold">
                      <div className="flex flex-row justify-start items-center gap-2">
                        <IconSquareRoundedPlus size={20} />
                        <p>
                          {profile.role === Role.customer
                            ? "New Booking"
                            : "Create Quotation"}
                        </p>
                      </div>
                    </Menu.Item>
                  </Link>

                  <Link href="/overview">
                    <Menu.Item className="hover:text-primary text-secondary hover:font-semibold">
                      <div className="flex flex-row justify-start items-center gap-2">
                        <IconLayoutDashboard size={20} />
                        <p>Dashboard</p>
                      </div>
                    </Menu.Item>
                  </Link>
                  <Link href="/profile">
                    <Menu.Item className="hover:text-primary text-secondary hover:font-semibold">
                      <div className="flex flex-row justify-start items-center gap-2">
                        <IconUserSquareRounded size={20} />
                        <p>Profile</p>
                      </div>
                    </Menu.Item>
                  </Link>

                  <div onClick={() => setOpenModal(true)}>
                    <Menu.Item className="hover:bg-primary text-secondary hover:text-white hover:font-semibold">
                      <div className="flex flex-row justify-start items-center gap-2">
                        <IconLogout size={20} />
                        <p>Logout</p>
                      </div>
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
            <img className="h-5 w-auto" src={dexpressLogo.src} alt="DExpress" />
            <span className={`text-2xl text-secondary ${oswald.className}`}>
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
                    size="md"
                  >
                    {profile?.name?.charAt(0)?.toUpperCase()}
                  </Avatar>
                </Menu.Target>
                <Menu.Dropdown>
                  <div className="my-2 text-center text-base">
                    <p className="font-semibold text-secondary">
                      {profile?.name}
                    </p>
                    <Badge variant="light" color="#ff3f39" size="sm">
                      {profile?.role}
                    </Badge>
                  </div>

                  <Link href="/new-booking">
                    <Menu.Item className="hover:text-primary text-secondary hover:font-semibold">
                      <div className="flex flex-row justify-start items-center gap-2 text-sm">
                        <IconSquareRoundedPlus size={18} />
                        <p>
                          {profile.role === Role.customer
                            ? "New Booking"
                            : "Create Quotation"}
                        </p>
                      </div>
                    </Menu.Item>
                  </Link>

                  <Link href="/overview">
                    <Menu.Item className="hover:text-primary text-secondary hover:font-semibold">
                      <div className="flex flex-row justify-start items-center gap-2 text-sm">
                        <IconLayoutDashboard size={18} />
                        <p>Dashboard</p>
                      </div>
                    </Menu.Item>
                  </Link>

                  <Link href="/profile">
                    <Menu.Item className="hover:text-primary text-secondary hover:font-semibold">
                      <div className="flex flex-row justify-start items-center gap-2 text-sm">
                        <IconUserSquareRounded size={18} />
                        <p>Profile</p>
                      </div>
                    </Menu.Item>
                  </Link>

                  <div onClick={() => setOpenModal(true)}>
                    <Menu.Item className="hover:bg-primary text-secondary hover:text-white hover:font-semibold">
                      <div className="flex flex-row justify-start items-center gap-2 text-sm">
                        <IconLogout size={18} />
                        <p>Logout</p>
                      </div>
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
                <Button variant="light" color="#ff3f39" size="sm">
                  Sign Up
                </Button>
              </Link> */}
              <Link href="/login">
                <Button color="#ff3f39" size="sm" variant="light">
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

      <Modal
        opened={openModal}
        onClose={() => setOpenModal(false)}
        centered
        title="Confirm Logout"
        withCloseButton={false}
      >
        <Text size="sm">
          Hi, {profile?.name}! Are you sure to logout from DExpess?
        </Text>
        <div className="flex flex-row justify-end items-end gap-2 mt-5">
          <Button
            color="gray"
            variant="outline"
            size="sm"
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </Button>
          <Button color="red" onClick={() => signOut()} size="sm">
            Logout Now
          </Button>
        </div>
      </Modal>
    </header>
  );
}
