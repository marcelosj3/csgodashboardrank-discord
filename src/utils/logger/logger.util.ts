import { Interaction } from "discord.js";

import { ILogger, LoggerLevel, LoggerName } from "./types";

const LoggerInfo = (
  name: LoggerName,
  level: LoggerLevel,
  message: string | unknown,
  detail?: string,
  interaction?: Interaction
): ILogger => {
  return {
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
};

export const Logger = (
  name: LoggerName,
  level: LoggerLevel,
  message: string | unknown,
  detail?: string,
  interaction?: Interaction
): void => {
  if (level === LoggerLevel.ERROR) {
    console.error(LoggerInfo(name, level, message, detail, interaction));
  } else {
    console.log(LoggerInfo(name, level, message, detail, interaction));
  }
};
