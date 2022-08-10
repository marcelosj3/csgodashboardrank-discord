import { Client, Interaction } from "discord.js";

import { getCommand, Logger, LoggerLevel, LoggerName } from "../utils";

export const interactionCreate = (client: Client) => {
  client.on("interactionCreate", async (interaction: Interaction) => {
    if (!interaction.isChatInputCommand()) return;

    Logger(
      LoggerName.DISCORD,
      LoggerLevel.INFO,
      "Starting slash command...",
      interaction
    );

    const command = getCommand(interaction.commandName);

    if (command) {
      Logger(
        LoggerName.DISCORD,
        LoggerLevel.INFO,
        `Starting slash command: ${interaction.commandName}`,
        interaction
      );

      return await command.interaction(interaction);
    }
  });
};
1;
