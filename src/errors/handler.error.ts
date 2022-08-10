import { ChatInputCommandInteraction } from "discord.js";
import { interactionReply } from "../utils";

export const errorHandler = async (
  interaction: ChatInputCommandInteraction,
  error: string
) => {
  return await interactionReply(interaction, `error: "${error}"`);
};
