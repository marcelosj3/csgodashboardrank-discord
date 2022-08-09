import { Interaction } from "discord.js";

import { ILogger, LoggerLevel, LoggerName } from "./types";

const LoggerInfo = (
  name: LoggerName,
  level: LoggerLevel,
  message: string | unknown,
  detail?: string,
  interaction?: Interaction
): ILogger => {
  const response = {
    level: level,
    name: name,
    detail: detail,
    user: interaction
      ? {
          id: interaction.user.id,
          username: interaction.user.username,
        }
      : undefined,
    message: message,
    timestamp: new Date().toDateString(),
  };

  return response;
};

export const Logger = (
  name: LoggerName,
  level: LoggerLevel,
  message: string | unknown,
  detail?: string,
  interaction?: Interaction
): void => {
  console.log("-".repeat(25));
  console.log();
  if (level === LoggerLevel.ERROR) {
    console.error(LoggerInfo(name, level, message, detail, interaction));
  } else {
    console.log(LoggerInfo(name, level, message, detail, interaction));
  }
  console.log();
  console.log("-".repeat(25));
};
