export interface IMeta {
  limit: number;
  page: number;
  total: number;
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
