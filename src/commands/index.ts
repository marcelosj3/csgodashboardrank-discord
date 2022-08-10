import { ICommand } from "../interfaces";

import { matchCommands } from "./matches";
import { rankCommands } from "./ranks";

export const commands: ICommand[] = [...matchCommands, ...rankCommands];
