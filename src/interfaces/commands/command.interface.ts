import {
  APIApplicationCommandOption,
  ChatInputCommandInteraction,
} from "discord.js";

export interface ICommand {
  name: string;
  description: string;
  interaction: (interaction: ChatInputCommandInteraction) => Promise<void>;
  options: APIApplicationCommandOption[];
}
