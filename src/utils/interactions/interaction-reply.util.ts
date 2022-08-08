import { ChatInputCommandInteraction, codeBlock } from "discord.js";

export const interactionReply = async (
  interaction: ChatInputCommandInteraction,
  data: string
) =>
  await interaction.reply({
    content: codeBlock("elixir", data),
  });
