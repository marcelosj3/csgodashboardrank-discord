import { commands } from "../../commands";

export const getCommand = (commandName: string) => {
  return commands.find(({ name }) => name === commandName);
};
