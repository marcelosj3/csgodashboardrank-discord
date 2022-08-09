import {
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
} from "discord.js";

import { IKillsRank } from "src/lib/interfaces/ranks";

import { TAdditionalInfo } from "../../types";
import { ICommand } from "../../interfaces";
import { APIPath, interactionReply, rankFormatter } from "../../utils";
import { APIGet } from "../../services";
import { errorHandler } from "../../errors";
import { KillsQueryParams } from "../../utils/api/query-params/kills.query-params";

const interaction = async (interaction: ChatInputCommandInteraction) => {
  try {
    const matchUrlOption = interaction.options.get(KillsQueryParams.MATCH_URL);

    const options = [matchUrlOption]
      .filter((option) => option?.value)
      .map((option) => option!.name);

    const kills = await APIGet(APIPath.RanksKills, interaction, options);

    const additionalInfo: TAdditionalInfo<IKillsRank> = (rankInfo) => {
      const kills = `kills: ${rankInfo.kills}`;

      const optionsInfo: { [key: string]: string } = {
        match_url: `matchUrl: "${rankInfo.matchUrl}"`,
      };

      const additional = [kills];

      options.forEach((option: string) => {
        if (optionsInfo[option]) {
          additional.push(optionsInfo[option]);
        }
      });

      return additional.join(" - ");
    };

    const killsList = rankFormatter<IKillsRank>(kills!.data, additionalInfo);

    await interactionReply(interaction, killsList);
  } catch (error: any) {
    errorHandler(interaction, error);
  }
};

export const kill: ICommand = {
  name: "kills",
  description: "Replies with a rank of kills",
  interaction,
  options: [
    {
      name: KillsQueryParams.MATCH_URL,
      description: "Displays the match url",
      required: false,
      type: ApplicationCommandOptionType.Boolean,
    },
  ],
};
