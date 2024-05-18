"use client";
import Spinner from "@/components/common/Spinner";
import {
  useCreateBookingMutation,
  useCreateQuotationMutation,
} from "@/redux/api/bookingApi";
import { useUserProfileQuery } from "@/redux/api/userApi";
import { getUserInfo } from "@/services/auth.service";
import { ICreateBookingType } from "@/types";
import formatCurrency from "@/utils/formatCurrency";
import { showNotification } from "@/utils/showNotification";
import {
  Badge,
  Box,
  Button,
  Divider,
  Group,
  LoadingOverlay,
  Select,
  Table,
  Textarea,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  BookingStatus,
  BookingType,
  PaymentMethod,
  Role,
  users,
} from "@prisma/client";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

const CompleteBooking = ({
  bookingData,
  prevStep,
}: {
  bookingData: Partial<ICreateBookingType>;
  prevStep: () => void;
}) => {
  const [visible, { toggle }] = useDisclosure(false);

  const { role } = getUserInfo() as any;

  const { data, isLoading, isSuccess } = useUserProfileQuery({});

  const profile = useMemo(() => data?.data as users, [data]);

  const [createQuotation, { isLoading: isQuotationLoading }] =
    useCreateQuotationMutation();

  const [createBooking, { isLoading: isBookingLoading }] =
    useCreateBookingMutation();

  const router = useRouter();

  const submitBooking = async (
    status: BookingStatus = BookingStatus.Created
  ) => {
    const { userId, totalCost, ...rest } = bookingData;
    try {
      const res =
        role !== Role.customer
          ? await createQuotation({ ...bookingData, status }).unwrap()
          : await createBooking({ ...rest, status }).unwrap();

      console.log(res);
      if (res?.success) {
        toggle();
        showNotification({
          type: "success",
          title: "Success",
          message: res.message,
        });
        router.push(
          role !== Role.customer
            ? `/manage-bookings/${res?.data?.id}`
            : `/my-bookings/${res?.data?.id}`
        );
      }
    } catch (err: any) {
      toggle();
    }
  };
  return (
    <>
      <Box pos="relative" className="w-full">
        <LoadingOverlay
          visible={(isBookingLoading || isQuotationLoading) ?? visible}
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
        <div className="border rounded mt-5">
          <Table highlightOnHover withColumnBorders>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td>
                  <p className="font-semibold">Booking Type</p>
                </Table.Td>
                <Table.Td>
                  <Badge
                    size="sm"
                    color={
                      bookingData?.bookingType === BookingType.Package
                        ? "teal"
                        : "orange"
                    }
                  >
                    {bookingData?.bookingType}
                  </Badge>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>
                  <p className="font-semibold">Customer Info</p>
                </Table.Td>
                <Table.Td>
                  <div className="text-slate-700 flex flex-col gap-1">
                    <p>Name: {profile?.name}</p>
                    <p>Email: {profile?.email}</p>
                    <p>
                      Contact No:{" "}
                      {profile?.contactNo ? profile?.contactNo : "N/A"}
                    </p>
                  </div>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>
                  <p className="font-semibold">Service</p>
                </Table.Td>
                <Table.Td>
                  <p className=" text-slate-700">Service Title with link</p>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>
                  <p className="font-semibold">Package</p>
                </Table.Td>
                <Table.Td>
                  <p className=" text-slate-700">Package Title with link</p>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>
                  <p className="font-semibold">Shipping Address</p>
                </Table.Td>
                <Table.Td>
                  <p className="text-slate-700">
                    {bookingData?.shippingAddress}
                  </p>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>
                  <p className="font-semibold">Billing Address</p>
                </Table.Td>
                <Table.Td>
                  <p className="text-slate-700">
                    {bookingData?.billingAddress}
                  </p>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>
                  <p className="font-semibold">Remarks</p>
                </Table.Td>
                <Table.Td>
                  <p className=" text-slate-700 max-w-sm">
                    {bookingData?.remarks}
                  </p>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>
                  <p className="font-semibold">Delivery Date</p>
                </Table.Td>
                <Table.Td>
                  <p className="text-slate-700">
                    {format(
                      new Date(bookingData?.deliveryDate!),
                      "dd MMMM, yyyy"
                    )}
                  </p>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>
                  <p className="font-semibold">Payment Method</p>
                </Table.Td>
                <Table.Td>
                  <p className="text-slate-700">
                    {bookingData?.paymentMethod === PaymentMethod.COD
                      ? "Cash On Delivery"
                      : bookingData?.paymentMethod}
                  </p>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td></Table.Td>
                <Table highlightOnHover withColumnBorders>
                  <Table.Tbody>
                    <Table.Tr>
                      <Table.Td>
                        <div className=" text-slate-700">
                          Total:{" "}
                          <span className="font-semibold">
                            {formatCurrency(bookingData?.totalCost ?? 0.0)}
                          </span>
                        </div>
                      </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td>
                        <div className=" text-slate-700">
                          Paid:{" "}
                          <span className="font-semibold text-green-700">
                            {formatCurrency(0.0)}
                          </span>
                        </div>
                      </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td>
                        <div className=" text-slate-700">
                          Due:{" "}
                          <span className="font-semibold text-primary">
                            {formatCurrency(bookingData?.totalCost ?? 0.0)}
                          </span>
                        </div>
                      </Table.Td>
                    </Table.Tr>
                  </Table.Tbody>
                </Table>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </div>
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
            onClick={() => submitBooking(BookingStatus.Drafted)}
          >
            Save as Draft
          </Button>
          <Button
            color="#ff3f39"
            size="sm"
            radius="sm"
            onClick={() => submitBooking()}
          >
            Confirm Booking
          </Button>
        </Group>
      </Box>
    </>
  );
};

export default CompleteBooking;
