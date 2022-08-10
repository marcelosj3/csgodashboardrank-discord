import { Interaction } from "discord.js";

import { ILogger, LoggerLevel, LoggerName } from "./types";

const LoggerInfo = (
  name: LoggerName,
  level: LoggerLevel,
  message: string,
  interaction?: Interaction
) => {
  const date = new Date();
  const timestamp = `${[
    date.getDay().toString().padStart(2, "0"),
    (date.getMonth() + 1).toString().padStart(2, "0"),
    String(date.getFullYear()).slice(2, 4),
  ].join("/")} ${date.toLocaleTimeString()}`;

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
