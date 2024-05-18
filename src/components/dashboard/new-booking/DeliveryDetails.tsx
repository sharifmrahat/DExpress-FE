"use client";
import {
  useLazySingleUserQuery,
  useUserProfileQuery,
} from "@/redux/api/userApi";
import { getUserInfo } from "@/services/auth.service";
import { ICreateBookingType } from "@/types";
import { Box, Button, Group, LoadingOverlay, Select, rem } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCalendar } from "@tabler/icons-react";
import { DatePickerInput } from "@mantine/dates";
import { Role, users } from "@prisma/client";
import { Dispatch, SetStateAction, useEffect, useMemo } from "react";
import { addDays, isBefore } from "date-fns";
import Spinner from "@/components/common/Spinner";

const DeliveryDetails = ({
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

  const { data, isLoading, isSuccess } = useUserProfileQuery({});

  const [
    trigger,
    {
      data: customer,
      isLoading: isCustomerLoading,
      isSuccess: isSuccessCustomer,
    },
  ] = useLazySingleUserQuery();

  const profile = useMemo(() => data?.data as users, [data]);

  const customerProfile = useMemo(() => customer?.data as users, [customer]);

  const addresses = useMemo(() => profile?.addresses, [profile]);

  const customerAddresses = useMemo(
    () => customerProfile?.addresses,
    [customerProfile]
  );

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      deliveryDate: bookingData?.deliveryDate,
      shippingAddress: bookingData?.shippingAddress,
      billingAddress: bookingData?.billingAddress,
    },
    onValuesChange: (values) => {
      const { deliveryDate, ...rest } = values;

      setBookingData((prevState) => ({
        ...prevState,
        deliveryDate: deliveryDate ? addDays(deliveryDate, 1) : deliveryDate,
        ...rest,
      }));
    },

    validate: {
      deliveryDate: (val) => {
        return !val
          ? "Select Estimate Delivery Date"
          : isBefore(val, addDays(new Date(), 1))
          ? "Delivery date must be onwards from tomorrow!"
          : null;
      },
      shippingAddress: (val) => {
        return !val ? "Select Shipping Address" : null;
      },
      billingAddress: (val) => {
        return !val ? "Select Billing Address" : null;
      },
    },
  });

  useEffect(() => {
    if (role !== Role.customer && bookingData?.userId) {
      trigger(bookingData?.userId);
    }
  }, [bookingData.userId, role, trigger]);

  return (
    <>
      <Box pos="relative" className="w-full lg:w-1/3">
        <LoadingOverlay
          visible={isLoading || isCustomerLoading}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 0 }}
          loaderProps={{
            children: (
              <div className="w-fit mb-20">
                <Spinner />
              </div>
            ),
          }}
        />
        <form onSubmit={form.onSubmit(() => nextStep())} className="mt-5">
          <div className="grid grid-cols-1 gap-4">
            <DatePickerInput
              withAsterisk
              leftSection={
                <IconCalendar
                  style={{ width: rem(18), height: rem(18) }}
                  stroke={1.5}
                />
              }
              leftSectionPointerEvents="none"
              label="Delivery Date (Estimated)"
              placeholder="Delivery Date (Estimated)"
              minDate={addDays(new Date(), 1)}
              clearable
              key={form.key("deliveryDate")}
              {...form.getInputProps("deliveryDate")}
            />

            {(role !== Role.customer ? isSuccessCustomer : isSuccess) && (
              <>
                <Select
                  withAsterisk
                  label="Shipping Address"
                  data={
                    role !== Role.customer
                      ? customerAddresses?.map((e) => ({
                          label: e,
                          value: e,
                        }))
                      : addresses?.map((e) => ({
                          label: e,
                          value: e,
                        }))
                  }
                  placeholder={
                    isLoading || isCustomerLoading
                      ? "Loading..."
                      : "Select Shipping Address"
                  }
                  checkIconPosition="right"
                  size="sm"
                  searchable
                  clearable
                  nothingFoundMessage={
                    isLoading || isCustomerLoading
                      ? "Loading..."
                      : "No address found!"
                  }
                  key={form.key("shippingAddress")}
                  {...form.getInputProps("shippingAddress")}
                />

                <Select
                  withAsterisk
                  label="Billing Address"
                  data={
                    role !== Role.customer
                      ? customerAddresses?.map((e) => ({
                          label: e,
                          value: e,
                        }))
                      : addresses?.map((e) => ({
                          label: e,
                          value: e,
                        }))
                  }
                  placeholder={
                    isLoading || isCustomerLoading
                      ? "Loading..."
                      : "Select Billing Address"
                  }
                  checkIconPosition="right"
                  size="sm"
                  searchable
                  clearable
                  nothingFoundMessage={
                    isLoading || isCustomerLoading
                      ? "Loading..."
                      : "No address found!"
                  }
                  key={form.key("billingAddress")}
                  {...form.getInputProps("billingAddress")}
                />
              </>
            )}
          </div>
          <Group justify="center" mt="xl" className="flex justify-end">
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
      </Box>
    </>
  );
};

export default DeliveryDetails;
