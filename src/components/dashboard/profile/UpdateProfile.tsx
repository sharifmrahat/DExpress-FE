"use client";
import Modal from "@/components/ui/Modal";
import { useUserProfileQuery } from "@/redux/api/userApi";
import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction, useState } from "react";

const UpdateProfile = ({
  isOpen,
  setIsOpen,
  openModal,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  openModal: () => void;
}) => {
  const { data: userProfile, isLoading } = useUserProfileQuery({
    refetchOnMountOrArgChange: true,
  });

  function closeModal() {
    setIsOpen(false);
  }

  function submitModal() {
    setIsOpen(false);
  }
  return (
    <>
      <Modal
        buttonLabel="Confirm"
        closeModal={closeModal}
        isOpen={isOpen}
        submitModal={submitModal}
      >
        <Dialog.Title
          as="h3"
          className="text-lg font-medium leading-6 text-gray-900"
        >
          Update Profile
        </Dialog.Title>
        <div className="my-4">Inputs Here</div>
      </Modal>
    </>
  );
};

export default UpdateProfile;
