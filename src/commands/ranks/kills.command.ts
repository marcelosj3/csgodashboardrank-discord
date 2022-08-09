import { ChatInputCommandInteraction } from "discord.js";

import { IKillsRank } from "../../lib/interfaces";

import { TAdditionalInfo } from "../../types";
import { ICommand } from "../../interfaces";
import { APIPath, interactionReply, rankFormatter } from "../../utils";
import { APIGet } from "src/services";

const interaction = async (interaction: ChatInputCommandInteraction) => {
  const kills = await APIGet(APIPath.RanksKills);

  const additionalInfo: TAdditionalInfo<IKillsRank> = (rankInfo) => {
    return `kills: ${rankInfo.kills}`;
  };

  const killsList = rankFormatter<IKillsRank>(kills.data, additionalInfo);

  await interactionReply(interaction, killsList);
};

export const kill: ICommand = {
  name: "kills",
  description: "Replies with a rank of kills",
  interaction,
};
