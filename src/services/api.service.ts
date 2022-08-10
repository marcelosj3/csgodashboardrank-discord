import axios, { AxiosResponse } from "axios";
import { ChatInputCommandInteraction } from "discord.js";
import dotenv from "dotenv";

import { APIPath, APIVerbs } from "../enums";
import { APIErrorHandler, APILoggerMessage, getFullPath } from "../utils";

dotenv.config();

class API {
  API = axios.create({
    baseURL: process.env.API_URL,
  });

  get = async (
    path: APIPath,
    interaction: ChatInputCommandInteraction,
    queryParams?: string[]
  ): Promise<AxiosResponse<any, any> | undefined> => {
    const fullPath = getFullPath(path, queryParams);
    try {
      APILoggerMessage(APIVerbs.GET, fullPath, undefined, interaction);
      return await this.API.get(fullPath);
    } catch (error) {
      APIErrorHandler(error, APIVerbs.GET, fullPath, interaction);
    }
  };

  post = async <T>(
    path: APIPath,
    interaction: ChatInputCommandInteraction,
    data: T,
    queryParams?: string[]
  ): Promise<AxiosResponse<any, any> | undefined> => {
    const fullPath = getFullPath(path, queryParams);
    try {
      APILoggerMessage(APIVerbs.POST, fullPath, data, interaction);
      return await this.API.post(fullPath, data);
    } catch (error: unknown) {
      APIErrorHandler(error, APIVerbs.POST, fullPath, interaction, data);
    }
  };
}

export default new API();
