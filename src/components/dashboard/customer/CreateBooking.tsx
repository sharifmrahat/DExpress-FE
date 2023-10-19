/* eslint-disable @next/next/no-img-element */
"use client";
import CustomDatePicker from "@/components/ui/DatePicker";
import Form from "@/components/ui/Form";
import Modal from "@/components/ui/Modal";
import { useCreateBookingMutation } from "@/redux/api/bookingApi";
import { ILorry } from "@/types";
import { Dialog } from "@headlessui/react";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";

const CreateBooking = ({
  isOpen,
  setIsOpen,
  lorry,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  lorry: ILorry;
}) => {
  const [createBooking] = useCreateBookingMutation();

  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(
    new Date()
  );

  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(
    new Date()
  );

  const handleStartDateChange = (date: Date | null) => {
    setSelectedStartDate(date);
  };

  const handleEndDateChange = (date: Date | null) => {
    setSelectedEndDate(date);
  };

  function closeModal() {
    setIsOpen(false);
  }

  const defaultValues = {
    lorryId: lorry?.id,
    startTime: selectedStartDate,
    endTime: selectedEndDate,
  };

  const onSubmit = async (values: any) => {
    setIsOpen(false);
    try {
      const res = await createBooking(values).unwrap();

      if (res?.success) {
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
          Book Lorry
        </Dialog.Title>
        <div className="my-4">
          <Form submitHandler={onSubmit} defaultValues={defaultValues}>
            <div className="mb-4">
              <p className="font-semibold">{lorry?.model}</p>
              <div className="flex flex-col gap-2 text-sm">
                <p>Category: {lorry?.category?.title}</p>
                <p>Size: {lorry?.type}</p>
                <p>Rent Price: ${lorry?.price} /day</p>
              </div>
            </div>
            <div className="flex flex-row gap-2 pb-10">
              <CustomDatePicker
                label="Start Date"
                selectedDate={selectedStartDate}
                handleDateChange={handleStartDateChange}
              />
              <CustomDatePicker
                label="End Date"
                selectedDate={selectedEndDate}
                handleDateChange={handleEndDateChange}
              />
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
                Confirm
              </button>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default CreateBooking;
