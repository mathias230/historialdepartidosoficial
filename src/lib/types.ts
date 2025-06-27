export interface Team {
  id: string;
  name: string;
  captain: string;
}

export interface Match {
  id: string;
  date: string;
  team1Id: string;
  team2Id: string;
  team1Score: number;
  team2Score: number;
  highlights: string;
  competition: string;
}

export interface Schedule {
  id: string;
  date: string;
  team1Id: string;
  team2Id: string;
}
