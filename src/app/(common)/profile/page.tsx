/* eslint-disable @next/next/no-img-element */
"use client";
import UnderDevelopment from "@/components/common/UnderDevelopment";
import { useUserProfileQuery } from "@/redux/api/userApi";
import { users } from "@prisma/client";
import { useMemo } from "react";

const ProfilePage = () => {
  const { data, isLoading } = useUserProfileQuery({});

  const profile = useMemo(() => data?.data as users, [data]);

  return (
    <div>
      <UnderDevelopment />
    </div>
  );
};

export default ProfilePage;
