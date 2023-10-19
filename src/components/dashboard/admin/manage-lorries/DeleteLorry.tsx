/* eslint-disable @next/next/no-img-element */
"use client";
import Modal from "@/components/ui/Modal";
import {
  useDeleteLorryMutation,
  useSingleLorryQuery,
} from "@/redux/api/lorryApi";
import { Dialog } from "@headlessui/react";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";

const DeleteLorry = ({
  isOpen,
  setIsOpen,
  lorryId,
  refetchAll,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  lorryId: string;
  refetchAll: any;
}) => {
  const { data: lorry, isLoading, refetch } = useSingleLorryQuery(lorryId);
  const [deleteLorry] = useDeleteLorryMutation();

  function closeModal() {
    setIsOpen(false);
  }

  const onSubmit = async () => {
    setIsOpen(false);
    try {
      const res = await deleteLorry(lorryId).unwrap();

      if (res?.success) {
        refetchAll();
        toast.success(res?.message);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (lorryId) {
      refetch();
    }
  }, [refetch, lorryId]);

  return (
    <>
      <Modal
        buttonLabel="Confirm"
        closeModal={closeModal}
        isOpen={isOpen}
        buttonType="submit"
      >
        <Dialog.Title as="h3" className="font-semibold leading-6 text-gray-900">
          Delete Lorry
        </Dialog.Title>
        <div className="my-4">
          <h1>
            Are you sure to remove{" "}
            <span className="font-semibold">{lorry?.data?.model}</span> ?
          </h1>
          <div className="mt-4 flex flex-row justify-end items-center gap-4">
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-1 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-1 text-sm font-medium text-white hover:bg-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteLorry;
