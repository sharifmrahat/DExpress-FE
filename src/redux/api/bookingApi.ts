import { baseApi } from "./baseApi";
const BOOKING_URL = "/bookings";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBooking: build.mutation({
      query: (data) => ({
        url: `${BOOKING_URL}/create-booking`,
        method: "POST",
        data: data,
      }),
    }),
    allBookings: build.query({
      query: () => ({
        url: `${BOOKING_URL}`,
        method: "GET",
      }),
    }),
    updateBooking: build.mutation({
      query: (data) => ({
        url: `${BOOKING_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
    }),
    singleBooking: build.query({
      query: (id) => ({
        url: `${BOOKING_URL}/${id}`,
        method: "GET",
      }),
    }),
    customerBookings: build.query({
      query: () => ({
        url: `${BOOKING_URL}/my-bookings`,
        method: "GET",
      }),
    }),
    bookingByLorryId: build.query({
      query: (id) => ({
        url: `${BOOKING_URL}/${id}/lorry`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useAllBookingsQuery,
  useSingleBookingQuery,
  useBookingByLorryIdQuery,
  useUpdateBookingMutation,
  useCustomerBookingsQuery,
} = bookingApi;
