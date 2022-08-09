enum GenericPath {
  Ranks = "/api/ranks",
}

enum RanksPath {
  Kills = GenericPath.Ranks + "/kills",
}

export enum APIPath {
  Ranks = GenericPath.Ranks,
  RanksKills = RanksPath.Kills,
}
