import { ChatInputCommandInteraction } from "discord.js";
import { interactionReply } from "../utils";

export const errorHandler = async (
  interaction: ChatInputCommandInteraction,
  error: any
) => {
  return await interactionReply(interaction, `error: ${error.message}`);
};
