/* eslint-disable @next/next/no-img-element */
"use client";
import Form from "@/components/ui/Form";
import FormInput from "@/components/ui/FormInput";
import Modal from "@/components/ui/Modal";
import {
  useSingleCategoryQuery,
  useUpdateCategoryMutation,
} from "@/redux/api/categoryApi";
import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";

const UpdateCategory = ({
  isOpen,
  setIsOpen,
  categoryId,
  refetchAll,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  categoryId: string;
  refetchAll: any;
}) => {
  const {
    data: category,
    isLoading,
    refetch,
  } = useSingleCategoryQuery(categoryId);
  const [updateCategory] = useUpdateCategoryMutation();

  function closeModal() {
    setIsOpen(false);
  }

  const defaultValues = {
    title: category?.data?.title || "",
  };

  const onSubmit = async (values: any) => {
    setIsOpen(false);
    try {
      const res = await updateCategory({
        id: category?.data?.id,
        body: values,
      }).unwrap();

      if (res?.success) {
        refetchAll();
        toast.success(res?.message);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (categoryId) {
      refetch();
    }
  }, [refetch, categoryId, category?.data?.role]);

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
          Update Category
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
                Update
              </button>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default UpdateCategory;
