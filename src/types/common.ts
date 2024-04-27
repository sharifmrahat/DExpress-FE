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

export interface IServiceQueryType extends QueryType {
  search?: string;
}

// export type IUser = {
//   id: string;
//   name: string;
//   email: string;
//   imageUrl: string;
//   contactNo: string;
//   address: string;
//   role: string;
//   createdAt: Date;
//   updateAt: Date;
// };

// export enum Type {
//   Large,
//   Medium,
//   Small,
// }

// export enum LorryStatus {
//   Available,
//   Booked,
//   Not_Available,
// }

// export enum BookingStatus {
//   Pending,
//   Booked,
//   Cancelled,
//   Rejected,
//   Completed,
// }

// export interface ICategory {
//   id: string;
//   title: string;

//   lorries?: ILorry[];
//   createdAt: Date;
//   updateAt: Date;
// }

// export interface ILorry {
//   id: string;
//   model: string;
//   type: string;
//   plateNumber: string;
//   price: number;
//   status?: string;
//   imageUrl?: string;
//   categoryId: string;
//   category?: ICategory;
//   createdAt: Date;
//   updateAt: Date;
// }
// export interface IFeedback {
//   id: string;
//   topic: string;
//   message: string;
//   createdAt: Date;
//   updateAt: Date;
// }
// export interface IArticle {
//   id: string;
//   title: string;
//   description: string;
//   createdAt: Date;
//   updateAt: Date;
// }
// export interface IReview {
//   id: string;
//   review: string;
//   rating: number;
//   bookingId: string;
//   createdAt: Date;
//   updateAt: Date;
// }

// export interface IService {}

// export interface IBooking {
//   id: string;
//   startTime: Date;
//   endTime: Date;
//   total: number;
//   status: BookingStatus;
//   reviews: IReview;
//   lorryId: string;
//   lorry: ILorry;
//   userId: string;
//   user: IUser;
//   createdAt: Date;
//   updateAt: Date;
// }
