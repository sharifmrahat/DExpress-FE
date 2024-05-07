/* eslint-disable @next/next/no-img-element */
"use client";
import UnderDevelopment from "@/components/common/UnderDevelopment";
import { useUserProfileQuery } from "@/redux/api/userApi";
import { Avatar, Badge, Breadcrumbs, Tabs, Text } from "@mantine/core";
import { users } from "@prisma/client";
import Link from "next/link";
import { useMemo, useState } from "react";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<string | null>("personal");
  const { data, isLoading } = useUserProfileQuery({});

  const profile = useMemo(() => data?.data as users, [data]);

  const routes = [
    { title: "Home", href: "/" },
    { title: "Dashboard", href: "/overview" },
    {
      title: isLoading ? "Loading..." : "Profile",
      isCurrent: true,
    },
  ].map((item, index) => (
    <div key={index} className="font-semibold text-sm">
      {item.isCurrent ? (
        <Text className="font-semibold text-sm text-primary">{item.title}</Text>
      ) : (
        <Link
          href={item.href as string}
          key={index}
          className="hover:text-primary"
        >
          {item.title}
        </Link>
      )}
    </div>
  ));
  return (
    <div className="p-4 lg:p-8">
      <Breadcrumbs className="hidden lg:flex">{routes}</Breadcrumbs>
      <div className="mt-0 lg:mt-10 mx-0">
        <div className="flex flex-col lg:flex-row gap-5 justify-center lg:justify-start items-center lg:items-start">
          <Avatar
            src={profile?.imageUrl}
            className="border-2 border-primary cursor-pointer"
            alt={profile?.name}
            color="#ff3f39"
            size="xl"
          >
            {profile?.name?.charAt(0)?.toUpperCase()}
          </Avatar>
          <div className="flex flex-col gap-4 justify-center items-center lg:justify-start lg:items-start">
            <Text className="text-2xl lg:text-3xl font-semibold">
              {profile?.name}
            </Text>
            <Badge variant="light" color="#ff3f39" size="md">
              {profile?.role}
            </Badge>
            {/* <Badge color={profile?.isVerified ? "teal" : "dark"}>
              {profile?.isVerified ? "Verified" : "Not Verified"}
            </Badge> */}
          </div>
        </div>
      </div>

      <div className="mt-10">
        <Tabs
          color="#ff3f39"
          defaultValue="personal"
          value={activeTab}
          onChange={(val) => setActiveTab(val)}
        >
          <Tabs.List>
            <Tabs.Tab
              value="personal"
              className={`hover:text-primary font-semibold hover:bg-transparent ${
                activeTab === "personal" && "text-primary"
              }`}
            >
              Personal Info
            </Tabs.Tab>
            <Tabs.Tab
              value="settings"
              className={`hover:text-primary font-semibold hover:bg-transparent ${
                activeTab === "settings" && "text-primary"
              }`}
            >
              Account Settings
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="personal">
            <div className="p-4">Personal Info</div>
          </Tabs.Panel>

          <Tabs.Panel value="settings">
            <div className="p-4">Account Settings</div>
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
