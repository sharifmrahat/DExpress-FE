"use client";
import { useUserProfileQuery } from "@/redux/api/userApi";

const ProfilePage = () => {
  const { data: userProfile, isLoading } = useUserProfileQuery({
    refetchOnMountOrArgChange: true,
  });
  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>Welcome back to your profile</h1>
          <p>User: {userProfile?.data?.name}</p>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
