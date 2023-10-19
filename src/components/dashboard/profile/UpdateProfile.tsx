/* eslint-disable @next/next/no-img-element */
"use client";
import Form from "@/components/ui/Form";
import FormInput from "@/components/ui/FormInput";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import {
  useUpdateProfileMutation,
  useUserProfileQuery,
} from "@/redux/api/userApi";
import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { toast } from "react-toastify";

const UpdateProfile = ({
  isOpen,
  setIsOpen,
  openModal,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  openModal: () => void;
}) => {
  const {
    data: userProfile,
    isLoading,
    refetch,
  } = useUserProfileQuery({
    refetchOnMountOrArgChange: true,
  });
  const [UpdateProfile] = useUpdateProfileMutation();

  function closeModal() {
    setIsOpen(false);
  }

  const defaultValues = {
    name: userProfile?.data?.name || "",
    imageUrl: userProfile?.data?.imageUrl || "",
    email: userProfile?.data?.email || "",
    contactNo: userProfile?.data?.contactNo || "",
    address: userProfile?.data?.address || "",
  };

  const onSubmit = async (values: any) => {
    setIsOpen(false);
    try {
      const res = await UpdateProfile({
        id: userProfile?.data?.id,
        body: values,
      }).unwrap();

      if (res?.success) {
        refetch();
        toast.success(res?.message);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <>
      <Modal
        buttonLabel="Confirm"
        closeModal={closeModal}
        isOpen={isOpen}
        submitModal={onSubmit}
        buttonType="submit"
      >
        <Dialog.Title as="h3" className="font-medium leading-6 text-gray-900">
          Update Profile | <span>{defaultValues.name}</span>
        </Dialog.Title>
        <div className="my-4">
          <Form submitHandler={onSubmit} defaultValues={defaultValues}>
            <div className="my-2 w-fit mx-auto">
              <img
                className="w-[100px] h-[100px] rounded-full mx-auto object-cover border-2 border-primary"
                src={defaultValues.imageUrl}
                alt={defaultValues.name}
              />
            </div>
            <div className="flex flex-col gap-2">
              <FormInput label="Profile Image" name="imageUrl" />
              <FormInput label="Name" name="name" />
              <FormInput label="Email" name="email" />
              <FormInput label="Contact No." name="contactNo" />
              <FormInput label="Address" name="address" />
            </div>

            <div className="mt-4 flex flex-row justify-end items-center gap-4">
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-1 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-1 text-sm font-medium text-white hover:bg-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Update
              </button>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default UpdateProfile;
