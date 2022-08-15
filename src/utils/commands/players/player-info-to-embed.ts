import { EmbedBuilder } from "discord.js";

import { IPlayerSerializer } from "src/lib/interfaces/serializers";

export const playerInfoToEmbed = (
  playerInfo: IPlayerSerializer
): EmbedBuilder => {
  const response = new EmbedBuilder();
  response
    .setColor("#BC9265")
    .setTitle(playerInfo.player)
    // .setURL(playerInfo)
    .setThumbnail(playerInfo.imageUrl)
    .addFields({ name: "\u200B", value: "\u200B" })
    .addFields({ name: "\u200B", value: "\u200B" })
    .addFields(
      ...playerInfo.platformCredentials!.map((platformCredential) => ({
        name: platformCredential.platform,
        value: `id: ${platformCredential.platformPlayerId}`,
        inline: true,
      }))
    )
    .setTimestamp();

  return response;
};
