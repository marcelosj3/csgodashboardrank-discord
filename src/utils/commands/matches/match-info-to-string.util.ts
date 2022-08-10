import { IMatchDetails, IScoreboard } from "src/lib/interfaces/matches";
import { IPlayerMatchSerializer } from "src/lib/interfaces/serializers";

import { dateFormatter } from "../../../utils";

const handleScoreboard = (value: IScoreboard) => {
  const scoreboardValue = [
    "scoreboard: {",
    `  team1Rounds: ${value.team1Rounds}`,
    `  team2Rounds: ${value.team2Rounds}`,
    "}",
  ];

  return scoreboardValue.join("\n");
};

const handlePlayers = (value: IPlayerMatchSerializer[]) => {
  const registeredPlayers = value.map((player) => player.player);

  return `registeredPlayers: ${registeredPlayers.join(", ")}.`;
};

export const matchInfoToString = (matchInfo: IMatchDetails): string => {
  const responseArray = Object.entries(matchInfo).map((match) => {
    const [key, value] = match;

    if (key === "matchUrl") return `${key}: "${value}"`;
    if (key === "date") return `${key}: "${dateFormatter(new Date(value))}"`;
    if (key === "scoreboard") return handleScoreboard(value);
    if (key === "players") return handlePlayers(value);

    return `${key}: ${value}`;
  });
  const response = responseArray.join("\n");

  return response;
};
