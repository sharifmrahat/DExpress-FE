"use client";
import { ICreateBookingType } from "@/types";
import { Button, Group, Select, Textarea, rem } from "@mantine/core";
import { useForm } from "@mantine/form";
import { PaymentMethod } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

const PaymentInfo = ({
  bookingData,
  setBookingData,
  nextStep,
  prevStep,
}: {
  bookingData: Partial<ICreateBookingType>;
  setBookingData: Dispatch<SetStateAction<ICreateBookingType>>;
  nextStep: () => void;
  prevStep: () => void;
}) => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      paymentMethod: bookingData?.paymentMethod,
      remarks: bookingData?.remarks,
    },
    onValuesChange: (values) => {
      setBookingData((prevState) => ({
        ...prevState,
        ...values,
      }));
    },

    validate: {
      paymentMethod: (val) => {
        return !val ? "Select Payment Method" : null;
      },
    },
  });

  return (
    <div>
      <form onSubmit={form.onSubmit(() => nextStep())} className="mt-5">
        <div className="grid grid-cols-1 gap-4 w-full lg:w-1/3">
          <Select
            withAsterisk
            label="Payment Method"
            data={[
              { label: "Cash On Delivery", value: PaymentMethod.COD },
              {
                label: "Bank / Mobile Banking",
                value: PaymentMethod.SSLCommerze,
                disabled: true,
              },
              { label: "Card", value: PaymentMethod.Stripe, disabled: true },
            ]}
            placeholder="Select Payment Method"
            checkIconPosition="right"
            size="sm"
            searchable
            clearable
            key={form.key("paymentMethod")}
            {...form.getInputProps("paymentMethod")}
          />
          <Textarea
            label="Remarks"
            placeholder="Add your comments regarding the payment and booking"
            key={form.key("remarks")}
            {...form.getInputProps("remarks")}
            resize="vertical"
          />
        </div>
        <Group
          justify="center"
          mt="xl"
          className="w-full lg:w-1/3 flex justify-end"
        >
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
            color="#ff3f39"
            size="sm"
            radius="sm"
            type="submit"
            disabled={!form.isValid()}
          >
            Next
          </Button>
        </Group>
      </form>
    </div>
  );
};

export default PaymentInfo;
