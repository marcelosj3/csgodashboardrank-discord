import { ICommand } from "../interfaces";

import { matchCommands } from "./matches";
import { playerCommands } from "./players";
import { rankCommands } from "./ranks";

export const commands: ICommand[] = [
  ...matchCommands,
  ...playerCommands,
  ...rankCommands,
];
