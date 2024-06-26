"use client";
import { Oswald } from "next/font/google";
import Link from "next/link";
import { SidebarItems } from "@/constants/sidebarItems";
import { getUserInfo } from "@/services/auth.service";
import { usePathname } from "next/navigation";
import { Divider, Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconLayoutDashboardFilled } from "@tabler/icons-react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const oswald = Oswald({ style: "normal", weight: "500", subsets: ["latin"] });

const DashboardContents = ({ children }: { children: React.ReactNode }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { role } = getUserInfo() as any;
  const pathName = usePathname();
  return (
    <>
      <div>
        <div className="bg-white shadow w-[15%] h-[100vh] hidden lg:block fixed left-0 overflow-auto z-50">
          <Divider />
          <div
            className={`${oswald.className} p-2 text-primary text-lg w-full flex flex-row justify-center items-center gap-1`}
          >
            <IconLayoutDashboardFilled size={22} /> <p>Dashboard</p>
          </div>
          <Divider />
          <nav className="flex flex-col gap-2">
            {SidebarItems(role).map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={classNames(
                  item.href === pathName
                    ? "bg-primaryLight text-primary border-r-4 border-primary font-semibold"
                    : "text-secondary hover:text-primary hover:bg-primaryLight",
                  "flex flex-row justify-start items-center gap-2 text-sm py-2 px-4 font-medium"
                )}
              >
                <item.icon size={20} />
                <p> {item.name}</p>
              </Link>
            ))}
          </nav>
        </div>
        <div className="mb-2 block lg:hidden z-50 sticky top-16">
          <Menu shadow="md" opened={opened} radius={0}>
            <Menu.Target>
              <div
                className={`${oswald.className} p-2 text-white bg-primary text-lg w-full flex flex-row justify-center items-center gap-1 `}
                onClick={opened ? close : open}
              >
                <IconLayoutDashboardFilled size={22} />
                <p>Dashboard</p>
              </div>
            </Menu.Target>

            <Menu.Dropdown p={0}>
              <nav className="flex flex-col gap-2">
                {SidebarItems(role).map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={close}
                    className={classNames(
                      item.href === pathName
                        ? "bg-primaryLight text-primary border-r-4 border-primary font-semibold"
                        : "text-secondary hover:text-primary hover:bg-primaryLight",
                      "flex flex-row justify-start items-center gap-2 text-sm p-2 px-4 font-medium"
                    )}
                  >
                    <item.icon size={15} />
                    <p> {item.name}</p>
                  </Link>
                ))}
              </nav>
            </Menu.Dropdown>
          </Menu>
        </div>

        <div className="w-full lg:w-[85%] ml-auto">{children}</div>
      </div>
    </>
  );
};

export default DashboardContents;
