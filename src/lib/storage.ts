'use client';

import type { Team, Match, Schedule } from './types';

const TEAMS_KEY = 'teams';
const MATCHES_KEY = 'matches';
const SCHEDULES_KEY = 'schedules';

// Helper to dispatch a storage event to trigger UI updates
function dispatchStorageEvent() {
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('storage'));
    }
}

function readFromLocalStorage<T>(key: string): T[] {
  if (typeof window === 'undefined') {
    return [];
  }
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : [];
  } catch (error) {
    console.error(`Error reading from localStorage key "${key}":`, error);
    return [];
  }
}

function writeToLocalStorage<T>(key: string, data: T[]): void {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    window.localStorage.setItem(key, JSON.stringify(data));
    dispatchStorageEvent();
  } catch (error) {
    console.error(`Error writing to localStorage key "${key}":`, error);
  }
}

// Teams
export const getTeams = (): Team[] => {
    const teams = readFromLocalStorage<Team>(TEAMS_KEY);
    return teams.sort((a, b) => a.name.localeCompare(b.name));
};
export const addTeam = (team: Omit<Team, 'id'>): Team => {
  const teams = getTeams();
  const newTeam: Team = { ...team, id: new Date().toISOString() };
  writeToLocalStorage(TEAMS_KEY, [...teams, newTeam]);
  return newTeam;
};

// Matches
export const getMatches = (): Match[] => {
    const matches = readFromLocalStorage<Match>(MATCHES_KEY);
    return matches.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};
export const addMatch = (match: Omit<Match, 'id'>): Match => {
  const matches = getMatches();
  const newMatch: Match = { ...match, id: new Date().toISOString() };
  const updatedMatches = [newMatch, ...matches];
  updatedMatches.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  writeToLocalStorage(MATCHES_KEY, updatedMatches);
  return newMatch;
};

// Schedules
export const getSchedules = (): Schedule[] => {
    const schedules = readFromLocalStorage<Schedule>(SCHEDULES_KEY);
    return schedules.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};
export const addSchedule = (schedule: Omit<Schedule, 'id'>): Schedule => {
  const schedules = getSchedules();
  const newSchedule: Schedule = { ...schedule, id: new Date().toISOString() };
  const updatedSchedules = [...schedules, newSchedule];
  updatedSchedules.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  writeToLocalStorage(SCHEDULES_KEY, updatedSchedules);
  return newSchedule;
};
