import { Client, Interaction } from "discord.js";

import { getCommand } from "../utils";

export const interactionCreate = (client: Client) => {
  client.on("interactionCreate", async (interaction: Interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = getCommand(interaction.commandName);

    if (command) {
      return command.interaction(interaction);
    }
  });
};
