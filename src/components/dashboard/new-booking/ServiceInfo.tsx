"use client";

import { useAllPackagesQuery } from "@/redux/api/packageApi";
import { useAllServicesQuery } from "@/redux/api/serviceAPI";
import { Button, Group, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { BookingType, packages, services } from "@prisma/client";
import { useMemo, useState } from "react";

const ServiceInfo = ({
  active,
  prevStep,
  nextStep,
}: {
  active: number;
  prevStep: () => void;
  nextStep: () => void;
}) => {
  const [showPackage, setShowPackage] = useState<boolean>(false);
  const [serviceId, setServiceId] = useState<string | undefined>(undefined);
  const { data: services, isLoading: isServiceLoading } = useAllServicesQuery({
    limit: 6,
    sortBy: "title",
    sortOrder: "asc",
  });

  const { data: packages, isLoading: isPackageLoading } = useAllPackagesQuery({
    serviceId: serviceId,
  });

  const allServices = useMemo(
    () => services?.data?.result as services[],
    [services]
  );

  const allPackages = useMemo(
    () => packages?.data?.result as packages[],
    [packages]
  );

  const serviceInfoForm = useForm({
    mode: "uncontrolled",
    initialValues: {
      bookingType: BookingType.Package,
      serviceId: undefined,
      packageId: undefined,
    },
    onValuesChange: (values) => {
      if (values.serviceId) {
        setServiceId(values.serviceId);
      }

      if (values.bookingType === BookingType.Package && values.serviceId) {
        setShowPackage(true);
      } else {
        setShowPackage(false);
      }
    },

    transformValues: (values) => {
      const { packageId, ...rest } = values;
      return {
        packageId:
          values.bookingType === BookingType.Package && packageId
            ? packageId
            : null,
        ...rest,
      };
    },

    validate: {
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

  const handleSubmitForms = (values: any) => {
    console.log(values);
    //save data and next state
    nextStep();
  };

  serviceInfoForm.watch(
    "serviceId",
    ({ previousValue, value, touched, dirty }) => {
      if (value !== previousValue) {
        serviceInfoForm.setFieldValue("packageId", undefined);
      }
    }
  );

  return (
    <div>
      <form
        onSubmit={serviceInfoForm.onSubmit((values) =>
          handleSubmitForms(values)
        )}
        className="my-5"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full lg:w-1/2">
          <Select
            withAsterisk
            label="Booking Type"
            data={[BookingType.Package, BookingType.Custom]}
            defaultValue={BookingType.Package}
            checkIconPosition="right"
            size="sm"
            key={serviceInfoForm.key("bookingType")}
            {...serviceInfoForm.getInputProps("bookingType")}
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
            key={serviceInfoForm.key("serviceId")}
            {...serviceInfoForm.getInputProps("serviceId")}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 w-full lg:w-1/2 mt-4">
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
              nothingFoundMessage={
                isPackageLoading ? "Loading..." : "No data found!"
              }
              key={serviceInfoForm.key("packageId")}
              {...serviceInfoForm.getInputProps("packageId")}
            />
          )}
        </div>
        <Group
          justify="center"
          mt="xl"
          className="w-full lg:w-1/2 flex justify-end"
        >
          <Button color="#ff3f39" size="sm" radius="sm" type="submit">
            Next
          </Button>
        </Group>
      </form>
    </div>
  );
};

export default ServiceInfo;
