"use client";

import { useAllPackagesQuery } from "@/redux/api/packageApi";
import { useAllServicesQuery } from "@/redux/api/serviceAPI";
import { useAllUsersQuery, useLazyAllUsersQuery } from "@/redux/api/userApi";
import { getUserInfo } from "@/services/auth.service";
import { ICreateBookingType } from "@/types";
import { Button, Group, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { BookingType, Role, packages, services, users } from "@prisma/client";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";

const ServiceInfo = ({
  bookingData,
  setBookingData,
  nextStep,
}: {
  bookingData: Partial<ICreateBookingType>;
  setBookingData: Dispatch<SetStateAction<ICreateBookingType | undefined>>;
  nextStep: () => void;
}) => {
  const [showPackage, setShowPackage] = useState<boolean>(
    !!bookingData?.packageId
  );

  const { role } = getUserInfo() as any;

  const { data: services, isLoading: isServiceLoading } = useAllServicesQuery({
    limit: 6,
    sortBy: "title",
    sortOrder: "asc",
  });

  const { data: packages, isLoading: isPackageLoading } = useAllPackagesQuery({
    serviceId: bookingData?.serviceId,
  });

  const [trigger, { data: users, isLoading: isUserLoading }] =
    useLazyAllUsersQuery();

  const allServices = useMemo(
    () => services?.data?.result as services[],
    [services]
  );

  const allPackages = useMemo(
    () => packages?.data?.result as packages[],
    [packages]
  );

  const allUsers = useMemo(() => users?.data?.result as users[], [users]);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      customerId: bookingData?.customerId,
      bookingType: bookingData?.bookingType,
      serviceId: bookingData?.serviceId,
      packageId: bookingData?.packageId,
    },
    onValuesChange: (values) => {
      setBookingData((prevState) => ({
        ...prevState,
        ...values,
      }));

      if (values.bookingType === BookingType.Package && values.serviceId) {
        setShowPackage(true);
      } else {
        setShowPackage(false);
        setBookingData((prevState) => ({
          ...prevState,
          packageId: undefined,
        }));
      }
    },

    transformValues: (values) => {
      const { packageId, ...rest } = values;
      return {
        packageId:
          values.bookingType === BookingType.Package && packageId
            ? packageId
            : undefined,
        ...rest,
      };
    },

    validate: {
      customerId: (val) => {
        return role !== Role.customer && !val ? "Select customer" : null;
      },
      bookingType: (val) => {
        return !val ? "Select Booking Type" : null;
      },
      serviceId: (val) => {
        return !val ? "You must select a service" : null;
      },
      packageId: (val, values) => {
        return values.bookingType === BookingType.Package &&
          values.serviceId &&
          !val
          ? `Select a package from current Service`
          : null;
      },
    },
  });

  form.watch("serviceId", ({ previousValue, value, touched, dirty }) => {
    if (value !== previousValue) {
      form.setFieldValue("packageId", undefined);
    }
  });

  useEffect(() => {
    if (role !== Role.customer) {
      trigger({ role: Role.customer });
    }
  }, [role, trigger]);

  // useEffect(() => {
  //   if (bookingData?.customerId) {
  //     trigger({ id: bookingData.customerId });
  //   }
  // }, [bookingData, trigger]);

  return (
    <div>
      <form onSubmit={form.onSubmit(() => nextStep())} className="mt-5">
        <div className="grid grid-cols-1 gap-4 w-full lg:w-1/3">
          {role !== Role.customer && (
            <Select
              withAsterisk
              label="Select User"
              data={allUsers?.map((e) => ({
                label: `${e.name} - ${e.email}`,
                value: e.id,
              }))}
              placeholder={isUserLoading ? "Loading..." : "Select User"}
              checkIconPosition="right"
              size="sm"
              searchable
              clearable
              onSearchChange={(value) =>
                trigger({ role: Role.customer, search: value })
              }
              nothingFoundMessage={
                isUserLoading ? "Loading..." : "No data found!"
              }
              key={form.key("customerId")}
              {...form.getInputProps("customerId")}
            />
          )}

          <Select
            withAsterisk
            label="Booking Type"
            data={[BookingType.Package, BookingType.Custom]}
            defaultValue={BookingType.Package}
            checkIconPosition="right"
            size="sm"
            key={form.key("bookingType")}
            {...form.getInputProps("bookingType")}
          />

          <Select
            withAsterisk
            label="Select Service"
            data={allServices?.map((e) => ({
              label: e.title,
              value: e.id,
            }))}
            placeholder={isServiceLoading ? "Loading..." : "Select Service"}
            checkIconPosition="right"
            size="sm"
            searchable
            clearable
            nothingFoundMessage={
              isServiceLoading ? "Loading..." : "No data found!"
            }
            key={form.key("serviceId")}
            {...form.getInputProps("serviceId")}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 w-full lg:w-1/3 mt-4">
          {showPackage && (
            <Select
              withAsterisk
              label="Select Package"
              data={allPackages?.map((e) => ({
                label: `${e.title} ($${e.price})`,
                value: e.id,
              }))}
              placeholder={isPackageLoading ? "Loading..." : "Select Package"}
              checkIconPosition="right"
              size="sm"
              searchable
              clearable
              nothingFoundMessage={
                isPackageLoading ? "Loading..." : "No data found!"
              }
              key={form.key("packageId")}
              {...form.getInputProps("packageId")}
            />
          )}
        </div>
        <Group
          justify="center"
          mt="xl"
          className="w-full lg:w-1/3 flex justify-end"
        >
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

export default ServiceInfo;
