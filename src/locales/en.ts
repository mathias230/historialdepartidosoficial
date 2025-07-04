export const en = {
  // Sidebar
  dashboard: 'Dashboard',
  teams: 'Teams',
  matches: 'Matches',
  schedule: 'Schedule',
  insights: 'Insights',

  // Language & Theme
  selectLanguage: 'Select language',
  english: 'English',
  spanish: 'Español',

  // Dashboard Page
  dashboardTitle: 'Dashboard',
  dashboardDescription: 'Welcome to your Pro Clubs Ledger.',
  nextMatch: 'Next Match',
  noUpcomingMatches: 'No upcoming matches scheduled.',
  recentResults: 'Recent Results',
  loadingMatchDetails: 'Loading match details...',
  matchHasStarted: 'Match has started!',
  days: 'days',
  hours: 'hours',
  minutes: 'minutes',
  seconds: 'seconds',
  upcomingMatch: 'Upcoming Match',

  // Teams Page
  teamManagement: 'Team Management',
  teamManagementDescription: 'Add new teams and view existing ones.',
  addNewTeam: 'Add New Team',
  addNewTeamDescription: 'Enter the details for the new team.',
  teamName: 'Team Name',
  teamNamePlaceholder: 'e.g. The All-Stars',
  captain: 'Captain',
  captainPlaceholder: 'e.g. John Doe',
  addTeam: 'Add Team',
  registeredTeams: 'Registered Teams',
  registeredTeamsDescription: 'A list of all teams in the ledger.',
  noTeamsAdded: 'No teams added yet.',
  
  // Matches Page
  matchCenter: 'Match Center',
  matchCenterDescription: 'Record results and view head-to-head stats.',
  recordMatch: 'Record Match',
  matchHistory: 'Match History',
  recordMatchResult: 'Record Match Result',
  recordMatchResultDescription: 'Enter the details of a completed match.',
  date: 'Date',
  competition: 'Competition',
  competitionPlaceholder: 'e.g. Friendly, Super League',
  team1Home: 'Team 1 (Home)',
  selectTeam1: 'Select Team 1',
  team2Away: 'Team 2 (Away)',
  selectTeam2: 'Select Team 2',
  team1Score: 'Team 1 Score',
  team2Score: 'Team 2 Score',
  highlights: 'Highlights',
  highlightsPlaceholder: 'Any notable moments, goals, or plays...',
  h2hHistory: 'Head-to-Head History',
  h2hHistoryDescription: 'Select two teams to see their match history.',
  wins: 'Wins',
  draws: 'Draws',
  home: 'Home',
  away: 'Away',
  score: 'Score',
  noMatchesFound: 'No matches found between these teams.',
  noMatchesRecorded: 'No matches recorded yet.',
  homeTeam: 'Home Team',
  awayTeam: 'Away Team',

  // Schedule Page
  matchScheduler: 'Match Scheduler',
  matchSchedulerDescription: "Plan future matches and see what's next.",
  scheduleAMatch: 'Schedule a Match',
  scheduleAMatchDescription: 'Set up an upcoming match between two teams.',
  dateTime: 'Date & Time',
  team1: 'Team 1',
  team2: 'Team 2',
  scheduleMatch: 'Schedule Match',
  upcomingMatches: 'Upcoming Matches',
  upcomingMatchesDescription: 'All scheduled future matches.',
  matchup: 'Matchup',
  noUpcomingMatchesScheduled: 'No upcoming matches scheduled.',

  // Insights Page
  matchInsights: 'Match Insights',
  matchInsightsDescription: 'Use AI to get a deeper understanding of match results.',
  aiPoweredMatchInsights: 'AI-Powered Match Insights',
  aiPoweredMatchInsightsDescription: 'Select a recent match to generate an analytical summary.',
  selectPastMatch: 'Select a past match',
  generateInsights: 'Generate Insights',
  analysisSummary: 'Analysis Summary',
  
  // Toasts & Errors
  success: 'Success',
  error: 'Error',
  teamAddedSuccess: 'Team added successfully.',
  teamAddedError: 'An error occurred while adding the team.',
  matchRecordedSuccess: 'Match recorded successfully.',
  matchRecordedError: 'An error occurred while recording the match.',
  matchScheduledSuccess: 'Match scheduled successfully.',
  matchScheduledError: 'An error occurred while scheduling the match.',
  pleaseSelectMatch: 'Please select a match.',
  selectedMatchNotFound: 'Selected match not found.',
  failedToGenerateInsights: 'Failed to generate insights.',
};

export type TranslationKeys = keyof typeof en;
