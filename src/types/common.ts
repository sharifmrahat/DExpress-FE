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

export type IUser = {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
  contactNo: string;
  address: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
};
