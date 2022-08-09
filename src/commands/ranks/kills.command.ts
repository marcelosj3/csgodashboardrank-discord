import { ChatInputCommandInteraction } from "discord.js";

import { IKillsRank } from "../../lib/interfaces";

import { TAdditionalInfo } from "../../types";
import { ICommand } from "../../interfaces";
import { API } from "../../services";
import { interactionReply, rankFormatter } from "../../utils";

const interaction = async (interaction: ChatInputCommandInteraction) => {
  const kills = await API.get("ranks/kills");

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
