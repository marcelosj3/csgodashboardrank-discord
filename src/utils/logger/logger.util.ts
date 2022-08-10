import { Interaction } from "discord.js";
import { dateFormatter } from "../generic";

import { ILogger, LoggerLevel, LoggerName } from "./types";

const LoggerInfo = (
  name: LoggerName,
  level: LoggerLevel,
  message: string,
  interaction?: Interaction
) => {
  const date = new Date();
  const timestamp = dateFormatter(date);

  const response: ILogger = {
    level: level,
    name: name,
    user: interaction
      ? {
          id: interaction.user.id,
          username: interaction.user.username,
        }
      : undefined,
    message: message,
    timestamp: timestamp,
  };

  const userInfo = response.user ? ` | user: ${response.user?.username} |` : "";

  return `${timestamp} - {${level}} [${name}]${userInfo} - ${message}`;
};

export const Logger = (
  name: LoggerName,
  level: LoggerLevel,
  message: string,
  interaction?: Interaction
): void => {
  if (level === LoggerLevel.ERROR) {
    console.log("~".repeat(50));
    console.error(LoggerInfo(name, level, message, interaction));
  } else {
    console.log(LoggerInfo(name, level, message, interaction));
  }
};
