export type LeagueList = League[]

export interface League {
  _id: string
  season: number
  seasonType: number
  slateId: number
  week: number
  _lastUpdatedDate: string
  dfsSlateGames: DfsSlateGame[]
  dfsSlatePlayers: DfsSlatePlayer[]
  isMultiDaySlate: boolean
  numberOfGames: number
  operator: string
  operatorDay: string
  operatorGameType: string
  operatorName: string
  operatorSlateId: number
  operatorStartTime: string
  removedByOperator: boolean
  salaryCap?: number
  slateRosterSlots: string[]
  id: string
}

export interface DfsSlateGame {
  slateGameId: number
  slateId: number
  gameId: number
  operatorGameId: number
  removedByOperator: boolean
  scoreId: number
  game: Game
}

export interface Game {
  gameKey: string
  seasonType: number
  season: number
  week: number
  date: string
  awayTeam: string
  homeTeam: string
  channel: string
  pointSpread: number
  overUnder: number
  stadiumId: number
  canceled: boolean
  geoLat: any
  geoLong: any
  forecastTempLow: number
  forecastTempHigh: number
  forecastDescription: string
  forecastWindChill: number
  forecastWindSpeed: number
  awayTeamMoneyLine: number
  homeTeamMoneyLine: number
  day: string
  dateTime: string
  globalGameId: number
  globalAwayTeamId: number
  globalHomeTeamId: number
  scoreId: number
  status: string
  stadiumDetails: StadiumDetails
}

export interface StadiumDetails {
  stadiumId: number
  name: string
  city: string
  state: string
  country: string
  capacity: number
  playingSurface: string
  geoLat: number
  geoLong: number
  type: string
}

export interface DfsSlatePlayer {
  slatePlayerId: number
  slateId: number
  slateGameId?: number
  playerId: number
  playerGameProjectionStatId?: number
  fantasyDefenseProjectionStatId?: number
  operatorPlayerId: string
  operatorSlatePlayerId: string
  operatorPlayerName: string
  operatorPosition: string
  operatorSalary: number
  team?: string
  teamId?: number
  removedByOperator: boolean
  operatorRosterSlots: string[]
  fantasyPoints?: number
  fantasyPointsPerDollar?: number
  projectedOwnership?: number
}
