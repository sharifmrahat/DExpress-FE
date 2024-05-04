"use client";
import { Fragment, useState } from "react";
import Link from "next/link";
import { SidebarItems } from "@/constants/sidebarItems";
import { getUserInfo } from "@/services/auth.service";
import { usePathname } from "next/navigation";
import { Divider, ScrollArea } from "@mantine/core";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const DashboardContents = ({ children }: { children: React.ReactNode }) => {
  const { role } = getUserInfo() as any;
  const pathName = usePathname();
  return (
    <>
      <div>
        <div className="bg-white shadow w-1/5 h-[100vh] hidden lg:block fixed left-0 p-5 overflow-auto mb-10">
          <nav className="mt-5 space-y-1 px-2">
            {SidebarItems(role).map((item, idx) => (
              <>
                <Link
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.href === pathName
                      ? "bg-primary text-white"
                      : "text-secondary hover:text-primary",
                    "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                  )}
                >
                  <item.icon
                    className="mr-4 h-6 w-6 flex-shrink-0"
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
                {SidebarItems(role).length - 1 !== idx && <Divider my="sm" />}
              </>
            ))}
          </nav>
        </div>
        <div className="mb-2 block lg:hidden">Drawer</div>

        <div className="w-full lg:w-4/5 h-screen p-5 ml-auto h-[100vh]">
          {children}
        </div>
      </div>
    </>
  );
};

export default DashboardContents;
