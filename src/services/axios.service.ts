import axios, { AxiosResponse } from "axios";
import { ChatInputCommandInteraction } from "discord.js";
import dotenv from "dotenv";

import { errorHandler } from "../errors";
import { APIPath, Logger, LoggerLevel, LoggerName } from "../utils";

dotenv.config();

type TAPIVerb = "GET" | "POST";

const API = axios.create({
  baseURL: process.env.API_URL,
});

const getFullPath = (path: APIPath, queryParams?: string[]) =>
  String(path) + (queryParams ? `?${queryParams.join("&")}` : "");

const getAPILoggerMessage = (
  verb: TAPIVerb,
  path: string,
  data?: any,
  interaction?: ChatInputCommandInteraction,
  log: boolean = true
) => {
  const dataInfo = data ? `payload: ${JSON.stringify(data)}` : "";
  const message = `${verb} ${path} - ${dataInfo}`;
  if (log) {
    Logger(LoggerName.API, LoggerLevel.INFO, message, interaction);
  }
  return message;
};

const APIErrorHandler = (
  error: any,
  verb: TAPIVerb,
  path: string,
  interaction: ChatInputCommandInteraction,
  data?: any
) => {
  const verbAndPath = getAPILoggerMessage(verb, path, data, interaction, false);

  const errorResponse = error.response.data.message.error;
  const errorMessage = `error: ${errorResponse}`;

  const message = `${verbAndPath} - ${errorMessage}`;

  Logger(LoggerName.API, LoggerLevel.ERROR, message, interaction);

  errorHandler(interaction, errorResponse);
};

export const APIGet = async (
  path: APIPath,
  interaction: ChatInputCommandInteraction,
  queryParams?: string[]
): Promise<AxiosResponse<any, any> | undefined> => {
  const fullPath = getFullPath(path, queryParams);
  try {
    getAPILoggerMessage("GET", fullPath, undefined, interaction);
    return await API.get(fullPath);
  } catch (error) {
    APIErrorHandler(error, "GET", fullPath, interaction);
  }
};

export const APIPost = async (
  path: APIPath,
  interaction: ChatInputCommandInteraction,
  // TODO change data type
  data: { url: string },
  queryParams?: string[]
): Promise<AxiosResponse<any, any> | undefined> => {
  const fullPath = getFullPath(path, queryParams);
  try {
    getAPILoggerMessage("POST", fullPath, data, interaction);
    return await API.post(fullPath, data);
  } catch (error: unknown) {
    APIErrorHandler(error, "POST", fullPath, interaction, data);
  }
};
