import axios from "axios";

export const httpClient = axios.create();

export const isRequestCanceled = (error) => axios.isCancel(error);
