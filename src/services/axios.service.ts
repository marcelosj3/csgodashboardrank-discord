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
  interaction: ChatInputCommandInteraction
): Promise<AxiosResponse<any, any> | undefined> => {
  try {
    return await API.get(String(path));
  } catch (error) {
    console.error(`GET ${path}`, error);
    errorHandler(interaction, error);
  }
};
