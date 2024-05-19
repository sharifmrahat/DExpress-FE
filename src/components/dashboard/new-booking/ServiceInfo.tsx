"use client";

import Spinner from "@/components/common/Spinner";
import { useAllPackagesQuery } from "@/redux/api/packageApi";
import { useAllServicesQuery } from "@/redux/api/serviceAPI";
import { useLazyAllUsersQuery } from "@/redux/api/userApi";
import { getUserInfo } from "@/services/auth.service";
import { ICreateBookingType } from "@/types";
import { Box, Button, Group, LoadingOverlay, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { BookingType, Role, packages, services, users } from "@prisma/client";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";

const ServiceInfo = ({
  bookingData,
  setBookingData,
  nextStep,
}: {
  bookingData: Partial<ICreateBookingType>;
  setBookingData: Dispatch<SetStateAction<ICreateBookingType>>;
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

  const [trigger, { data: users, isLoading: isUserLoading, isSuccess }] =
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
      userId: bookingData?.userId,
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
      userId: (val) => {
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
      setBookingData((prevState) => ({
        ...prevState,
        totalCost: 0,
      }));
    }
  });

  useEffect(() => {
    if (role !== Role.customer) {
      trigger({ role: Role.customer });
    }
  }, [role, trigger]);

  return (
    <>
      <Box pos="relative" className="w-full lg:w-1/3">
        <LoadingOverlay
          visible={isUserLoading || isServiceLoading || isPackageLoading}
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
            {role !== Role.customer && isSuccess && (
              <Select
                withAsterisk
                label="Select Customer"
                data={allUsers?.map((e) => ({
                  label: `${e.name} - ${e.email}`,
                  value: e.id,
                }))}
                placeholder={isUserLoading ? "Loading..." : "Select Customer"}
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
                key={form.key("userId")}
                {...form.getInputProps("userId")}
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
          <div className="grid grid-cols-1 gap-4 w-full mt-4">
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
          <Group justify="center" mt="xl" className="flex justify-end">
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

export default ServiceInfo;
