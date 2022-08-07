import { ChatInputCommandInteraction } from "discord.js";
import { TAdditionalInfo } from "src/types";

import { ICommand } from "../../interfaces";
import { API } from "../../services";
import { interactionReply, rankFormatter } from "../../utils";

// TODO figure out a way to fetch the types from the other project
interface IKills {
  name: string;
  kills: number;
  matchUrl?: string;
}

const interaction = async (interaction: ChatInputCommandInteraction) => {
  const kills = await API.get("ranks/kills");

  const additionalInfo: TAdditionalInfo<IKills> = (rankInfo) => {
    return `kills: ${rankInfo.kills}`;
  };

  const killsList = rankFormatter<IKills>(kills.data, additionalInfo);

  await interactionReply(interaction, killsList);
};

export const kill: ICommand = {
  name: "kills",
  description: "Replies with a rank of kills",
  interaction,
};
