"use client";
import Spinner from "@/components/common/Spinner";
import { useUserProfileQuery } from "@/redux/api/userApi";

const FeedbacksPage = () => {
  const { data: userProfile, isLoading } = useUserProfileQuery({
    refetchOnMountOrArgChange: true,
  });
  return (
    <>
      {isLoading ? (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 backdrop-blur-md">
          <Spinner />
        </div>
      ) : (
        <div>
          <h1>Feedbacks Page</h1>
        </div>
      )}
    </>
  );
};

export default FeedbacksPage;