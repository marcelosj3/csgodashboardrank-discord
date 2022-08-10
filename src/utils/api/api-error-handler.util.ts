import { ChatInputCommandInteraction } from "discord.js";
import { APIVerbs } from "src/enums";

import { errorHandler } from "../../errors";

import { Logger, LoggerLevel, LoggerName } from "../logger";

import { APILoggerMessage } from "./api-logger-message.util";

export const APIErrorHandler = (
  error: any,
  verb: APIVerbs,
  path: string,
  interaction: ChatInputCommandInteraction,
  data?: any
) => {
  const verbAndPath = APILoggerMessage(
    verb,
    path,
    "FAIL",
    data,
    interaction,
    false
  );

  let errorResponse = error.response.data.message;

  if (errorResponse instanceof Object) {
    errorResponse = error.response.data.message.error;
  }

  const errorMessage = `error: ${errorResponse}`;
  const message = `${verbAndPath} - ${errorMessage}`;

  Logger(LoggerName.API, LoggerLevel.ERROR, message, interaction);

  errorHandler(interaction, errorResponse);
};
