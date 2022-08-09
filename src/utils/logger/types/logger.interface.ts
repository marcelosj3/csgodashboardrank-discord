import { LoggerLevel } from "./logger-level.enum";
import { LoggerName } from "./logger-name.enum";

export interface ILogger {
  level: LoggerLevel;
  name: LoggerName;
  user?: {
    id: string;
    username: string;
  };
  detail?: string;
  message: string | unknown;
  timestamp: string;
}
