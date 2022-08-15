import {
  ChatInputCommandInteraction,
  codeBlock,
  EmbedBuilder,
} from "discord.js";
import { TInteractionMode } from "src/types";
import { Logger, LoggerLevel, LoggerName } from "../logger";

export const interactionReply = async (
  interaction: ChatInputCommandInteraction,
  data: string | EmbedBuilder,
  interactionMode: TInteractionMode = "content"
) => {
  try {
    Logger(
      LoggerName.DISCORD,
      LoggerLevel.INFO,
      `Replying command ${interaction.commandName}`,
      interaction
    );
    if (interactionMode === "content") {
      return await interaction.editReply({
        content: codeBlock("elixir", data as string),
      });
    } else if (interactionMode === "embed") {
      return await interaction.editReply({
        embeds: [data as EmbedBuilder],
      });
    }
  } catch (error: any) {
    Logger(
      LoggerName.DISCORD,
      LoggerLevel.ERROR,
      JSON.stringify(error.rawError),
      interaction
    );
  }
};
