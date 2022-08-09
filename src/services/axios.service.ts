import axios, { AxiosResponse } from "axios";
import dotenv from "dotenv";
import { APIPath } from "src/utils";

dotenv.config();

const API = axios.create({
  baseURL: process.env.API_URL,
});

export const APIGet = async (
  path: APIPath
): Promise<AxiosResponse<any, any>> => {
  return await API.get(String(path));
};
