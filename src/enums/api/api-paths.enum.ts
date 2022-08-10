enum GenericPath {
  Matches = "api/matches",
  Ranks = "/api/ranks",
}

enum RanksPath {
  Kills = GenericPath.Ranks + "/kills",
}

export enum APIPath {
  Matches = GenericPath.Matches,
  Ranks = GenericPath.Ranks,
  RanksKills = RanksPath.Kills,
}
