/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
  useLazySinglePackageQuery,
  useSinglePackageQuery,
} from "@/redux/api/packageApi";
import { getUserInfo } from "@/services/auth.service";
import { ICreateBookingType } from "@/types";
import {
  Button,
  Group,
  NumberInput,
  Select,
  TextInput,
  Textarea,
  rem,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { BookingType, PaymentMethod, Role, packages } from "@prisma/client";
import { Dispatch, SetStateAction, useEffect, useMemo } from "react";

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
  const { role } = getUserInfo() as any;

  const [
    triggerPackage,
    { data: currentPackage, isLoading: isUserLoading, isSuccess },
  ] = useLazySinglePackageQuery();

  const selectedPackage = useMemo(
    () => currentPackage?.data as packages,
    [currentPackage]
  );

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      totalCost:
        bookingData?.bookingType === BookingType.Package
          ? selectedPackage?.price
          : bookingData?.totalCost,
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
      totalCost: (val) => {
        return role !== Role.customer && val! <= 0
          ? "Estimate total cost"
          : null;
      },
      paymentMethod: (val) => {
        return !val ? "Select Payment Method" : null;
      },
    },
  });

  useEffect(() => {
    if (
      bookingData?.bookingType === BookingType.Package &&
      bookingData?.packageId
    ) {
      triggerPackage(bookingData?.packageId);
      form.setFieldValue("totalCost", selectedPackage?.price);
    }
  }, [triggerPackage, bookingData?.packageId, bookingData?.bookingType]);

  return (
    <div>
      <form onSubmit={form.onSubmit(() => nextStep())} className="mt-5">
        <div className="grid grid-cols-1 gap-4 w-full lg:w-1/3">
          {((bookingData?.bookingType === BookingType?.Package && isSuccess) ||
            bookingData?.bookingType === BookingType?.Custom) && (
            <NumberInput
              withAsterisk
              label="Total Cost"
              size="sm"
              placeholder="Total Costing"
              value={
                bookingData?.bookingType === BookingType?.Package
                  ? selectedPackage?.price
                  : bookingData?.totalCost
              }
              disabled={
                bookingData?.bookingType === BookingType?.Package ||
                role === Role.customer
              }
              prefix="$"
              allowNegative={false}
              decimalScale={2}
              thousandSeparator=","
              key={form.key("totalCost")}
              {...form.getInputProps("totalCost")}
            />
          )}
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
