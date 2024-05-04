/* eslint-disable @next/next/no-img-element */
"use client";
import { useUserProfileQuery } from "@/redux/api/userApi";
import { users } from "@prisma/client";
import { useMemo } from "react";

const ProfilePage = () => {
  const { data, isLoading } = useUserProfileQuery({});

  const profile = useMemo(() => data?.data as users, [data]);

  return (
    <div>
      Profile Page: {profile?.name}, {profile?.email}
    </div>
  );
};

export default ProfilePage;
