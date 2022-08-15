enum GenericPath {
  Matches = "api/matches",
  Players = "api/players",
  Ranks = "/api/ranks",
}

enum RanksPath {
  Kills = GenericPath.Ranks + "/kills",
}

export enum APIPath {
  Matches = GenericPath.Matches,
  Players = GenericPath.Players,
  Ranks = GenericPath.Ranks,
  RanksKills = RanksPath.Kills,
}
