/* eslint-disable @next/next/no-img-element */
"use client";
import Form from "@/components/ui/Form";
import FormInput from "@/components/ui/FormInput";
import Modal from "@/components/ui/Modal";
import { useCreateCategoryMutation } from "@/redux/api/categoryApi";
import { Dialog } from "@headlessui/react";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";

const CreateCategory = ({
  isOpen,
  setIsOpen,
  refetchAll,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  refetchAll: any;
}) => {
  const [CreateCategory] = useCreateCategoryMutation();

  function closeModal() {
    setIsOpen(false);
  }

  const defaultValues = {
    title: "",
  };

  const onSubmit = async (values: any) => {
    setIsOpen(false);
    try {
      const res = await CreateCategory(values).unwrap();

      if (res?.success) {
        refetchAll();
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
          Create Category
        </Dialog.Title>
        <div className="my-4">
          <Form submitHandler={onSubmit} defaultValues={defaultValues}>
            <div className="flex flex-col gap-2">
              <FormInput label="Category Title" name="title" />
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
                Create
              </button>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default CreateCategory;
