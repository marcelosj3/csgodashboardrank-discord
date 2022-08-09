import axios, { AxiosResponse } from "axios";
import { ChatInputCommandInteraction } from "discord.js";
import dotenv from "dotenv";

import { errorHandler } from "../errors";
import { APIPath } from "../utils";

dotenv.config();

const API = axios.create({
  baseURL: process.env.API_URL,
});

export const APIGet = async (
  path: APIPath,
  interaction: ChatInputCommandInteraction,
  queryParams?: string[]
): Promise<AxiosResponse<any, any> | undefined> => {
  try {
    const params = queryParams ? `?${queryParams.join("&")}` : "";

    return await API.get(String(path) + params);
  } catch (error) {
    console.error(`GET ${path}`, error);
    errorHandler(interaction, error);
  }
};
