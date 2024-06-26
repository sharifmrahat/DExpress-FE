import {
  BookingStatus,
  BookingType,
  PaymentMethod,
  PaymentStatus,
} from "@prisma/client";

export interface IMeta {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
}

export type ResponseSuccessType = {
  data: any;
  meta?: IMeta;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export interface QueryType {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
export interface IUserQueryType extends QueryType {
  search?: string;
  role?: string;
  id?: string;
}
export interface IServiceQueryType extends QueryType {
  search?: string;
}

export interface IPackageQueryType extends QueryType {
  search?: string;
  serviceId?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface IReviewQueryType extends QueryType {
  search?: string;
  userId?: string;
  bookingId?: string;
  serviceId?: string;
  packageId?: string;
  minRating?: number;
  maxRating?: number;
}

export interface IBookingQueryType extends QueryType {
  search?: string;
  status?: BookingStatus;
  bookingType?: BookingType;
  userId?: string;
  serviceId?: string;
  packageId?: string;
  paymentMethod?: PaymentMethod;
  paymentStatus?: PaymentStatus;
  deliveryDate?: Date;
  minTotal?: number;
  maxTotal?: number;
  createdDateRange?: Date[];
}

export interface ICreateBookingType {
  bookingType?: BookingType;
  userId?: string;
  serviceId?: string;
  packageId?: string;
  deliveryDate?: Date;
  shippingAddress?: string;
  billingAddress?: string;
  paymentMethod?: PaymentMethod;
  remarks?: string;
  totalCost?: number;
}
