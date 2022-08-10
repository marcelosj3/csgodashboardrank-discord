import { ChatInputCommandInteraction, codeBlock } from "discord.js";
import { Logger, LoggerLevel, LoggerName } from "../logger";

export const interactionReply = async (
  interaction: ChatInputCommandInteraction,
  data: string
) => {
  try {
    return await interaction.reply({
      content: codeBlock("elixir", data),
    });
  } catch (error: any) {
    Logger(
      LoggerName.DISCORD,
      LoggerLevel.ERROR,
      JSON.stringify(error.rawError),
      interaction
    );
  }
};
