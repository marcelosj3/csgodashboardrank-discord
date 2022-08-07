import { ChatInputCommandInteraction, codeBlock } from "discord.js";

import { API } from "../../services";

export const kills = async (interaction: ChatInputCommandInteraction) => {
  const kills = await API.get("ranks/kills");

  const killsList = `${kills.data
    .slice(0, 10)
    .map((kill: any, index: number) => {
      return `${index < 9 ? "0" : ""}${index + 1} | name: ${
        kill.name
      } - kills: ${kill.kills}`;
    })
    .join("\n")}`;

  await interaction.reply({
    content: codeBlock(killsList),
  });
};
