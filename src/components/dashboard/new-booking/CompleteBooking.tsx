"use client";
import { ICreateBookingType } from "@/types";
import { Button, Group, Select, Textarea, rem } from "@mantine/core";

const CompleteBooking = ({
  bookingData,
  prevStep,
}: {
  bookingData: Partial<ICreateBookingType>;
  prevStep: () => void;
}) => {
  const submitDraft = () => {
    console.log(bookingData);
  };
  return (
    <div>
      OverView Booking
      <Group justify="center" mt="xl">
        <Button
          variant="light"
          onClick={prevStep}
          color="#0f1b24"
          size="sm"
          radius="sm"
        >
          Back
        </Button>
        <Button
          variant="light"
          color="#ff3f39"
          size="sm"
          radius="sm"
          onClick={submitDraft}
        >
          Save as Draft
        </Button>
        <Button color="#ff3f39" size="sm" radius="sm">
          Confirm Booking
        </Button>
      </Group>
    </div>
  );
};

export default CompleteBooking;
