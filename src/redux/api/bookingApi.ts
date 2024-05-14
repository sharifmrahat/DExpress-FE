import { IBookingQueryType } from "@/types";
import { baseApi } from "./baseApi";
const BOOKING_URL = "/bookings";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBooking: build.mutation({
      query: (data) => ({
        url: `${BOOKING_URL}`,
        method: "POST",
        data: data,
      }),
    }),
    createQuotation: build.mutation({
      query: (data) => ({
        url: `${BOOKING_URL}/create-quotation`,
        method: "POST",
        data: data,
      }),
    }),
    allBookings: build.query({
      query: (query?: IBookingQueryType) => {
        let url = `${BOOKING_URL}`;

        const queryArr = [];
        for (const key in query) {
          if (query[key as keyof IBookingQueryType]) {
            const tempQuery = query[key as keyof IBookingQueryType];
            if (tempQuery) queryArr.push(`${key}=${tempQuery}`);
          }
        }
        if (queryArr.length) {
          url = `${url}?${queryArr.join("&")}`;
        }

        return {
          url: url,
          method: "GET",
        };
      },
    }),
    myBookings: build.query({
      query: (query?: IBookingQueryType) => {
        let url = `${BOOKING_URL}/my-bookings`;

        const queryArr = [];
        for (const key in query) {
          if (query[key as keyof IBookingQueryType]) {
            const tempQuery = query[key as keyof IBookingQueryType];
            if (tempQuery) queryArr.push(`${key}=${tempQuery}`);
          }
        }
        if (queryArr.length) {
          url = `${url}?${queryArr.join("&")}`;
        }

        return {
          url: url,
          method: "GET",
        };
      },
    }),
    singleBooking: build.query({
      query: (id) => ({
        url: `${BOOKING_URL}/${id}`,
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
    updateBookingStatus: build.mutation({
      query: (data) => ({
        url: `${BOOKING_URL}/update-status/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
    }),
    deleteBooking: build.mutation({
      query: (id) => ({
        url: `${BOOKING_URL}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useCreateQuotationMutation,
  useAllBookingsQuery,
  useMyBookingsQuery,
  useSingleBookingQuery,
  useUpdateBookingMutation,
  useUpdateBookingStatusMutation,
  useDeleteBookingMutation,
} = bookingApi;
