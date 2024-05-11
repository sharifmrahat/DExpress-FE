"use client";
import SectionHeading from "@/components/common/SectionHeading";
import CompleteBooking from "@/components/dashboard/new-booking/CompleteBooking";
import DeliveryDetails from "@/components/dashboard/new-booking/DeliveryDetails";
import PaymentMethod from "@/components/dashboard/new-booking/PaymentMethod";
import ServiceInfo from "@/components/dashboard/new-booking/ServiceInfo";
import { getUserInfo } from "@/services/auth.service";
import { Breadcrumbs, Button, Group, Stepper, Text } from "@mantine/core";
import { Role } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";

const NewBookingPage = () => {
  const { role } = getUserInfo() as any;

  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  const routes = [
    { title: "Home", href: "/" },
    { title: "Dashboard", href: "/overview" },
    {
      title: role === Role.customer ? "New Booking" : "Create Quotation",
      isCurrent: true,
    },
  ].map((item, index) => (
    <div key={index} className="font-semibold text-sm">
      {item.isCurrent ? (
        <Text className="font-semibold text-sm text-primary">{item.title}</Text>
      ) : (
        <Link
          href={item.href as string}
          key={index}
          className="hover:text-primary"
        >
          {item.title}
        </Link>
      )}
    </div>
  ));
  return (
    <div className="p-4 lg:p-8">
      <Breadcrumbs className="hidden lg:flex">{routes}</Breadcrumbs>
      <div className="mt-0 lg:mt-10">
        <SectionHeading
          line1={role === Role.customer ? "New Booking" : "Create Quotation"}
        />

        <div className="my-5 bg-white shadow border rounded p-5">
          <Stepper
            iconSize={32}
            color="#ff3f39"
            active={active}
            onStepClick={setActive}
            allowNextStepsSelect={false}
          >
            <Stepper.Step
              label="Service Info"
              description="Booking type & service"
            >
              <ServiceInfo />
            </Stepper.Step>
            <Stepper.Step
              label="Delivery Details"
              description="Delivery address & date"
            >
              <DeliveryDetails />
            </Stepper.Step>
            <Stepper.Step
              label="Payment Method"
              description="Payment method & costing"
            >
              <PaymentMethod />
            </Stepper.Step>
            <Stepper.Completed>
              <CompleteBooking />
            </Stepper.Completed>
          </Stepper>

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
            {active !== 3 && (
              <Button onClick={nextStep} color="#ff3f39" size="sm" radius="sm">
                Next
              </Button>
            )}
            {active === 3 && (
              <>
                <Button variant="light" color="#ff3f39" size="sm" radius="sm">
                  Save as Draft
                </Button>
                <Button color="#ff3f39" size="sm" radius="sm">
                  Confirm Booking
                </Button>
              </>
            )}
          </Group>
        </div>
      </div>
    </div>
  );
};

export default NewBookingPage;
