import { authKey } from "@/constants/storageKey";
import { IGenericErrorResponse, ResponseSuccessType } from "@/types";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/local-storage";
import { showNotification } from "@/utils/showNotification";
import axios from "axios";

const instance = axios.create();
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const accessToken = getFromLocalStorage(authKey);
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  //@ts-ignore
  function (response) {
    const responseObject: ResponseSuccessType = {
      data: response?.data.meta ? response?.data.result : response?.data,
      meta: response?.data.meta,
    };
    return responseObject;
  },
  async function (error) {
    // const accessToken = getFromLocalStorage(authKey);
    // if (error?.response?.status === 403) {
    // } else {
    //   const responseObject: IGenericErrorResponse = {
    //     statusCode: error?.response?.data?.statusCode || 500,
    //     message: error?.response?.data?.message || "Something went wrong",
    //     errorMessages: error?.response?.data?.message,
    //   };
    //   accessToken && toast.error(responseObject.message);
    //   return responseObject;
    // }

    const responseObject: IGenericErrorResponse = {
      statusCode: error?.response?.status || 500,
      message: error?.response?.data?.message || "Something went wrong!",
      errorMessages: error?.response?.data?.errorMessages,
    };

    responseObject.statusCode !== 403 &&
      showNotification({
        type: "error",
        title:
          responseObject?.errorMessages[0]?.message === responseObject?.message
            ? "Error"
            : responseObject?.message,
        message: responseObject?.errorMessages[0]?.message,
      });
    // return responseObject;
    return Promise.reject(error);
  }
);

export { instance };
