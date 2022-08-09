import {
  APIApplicationCommandOption,
  ChatInputCommandInteraction,
} from "discord.js";

// interface ICommandOptions extends APIApplicationCommandOption {
//   name: string;
//   description: string;
//   required: boolean;
//   type: ApplicationCommandOptionType;
// }

export interface ICommand {
  name: string;
  description: string;
  interaction: (interaction: ChatInputCommandInteraction) => Promise<void>;
  options: APIApplicationCommandOption[];
}
