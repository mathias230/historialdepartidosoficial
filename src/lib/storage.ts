'use server';

import { promises as fs } from 'fs';
import path from 'path';
import type { Team, Match, Schedule } from './types';

const dataDir = path.join(process.cwd(), 'data');

async function readFile<T>(filename: string): Promise<T[]> {
  try {
    const filePath = path.join(dataDir, filename);
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data) as T[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return []; // File doesn't exist, return empty array
    }
    throw error;
  }
}

async function writeFile<T>(filename: string, data: T[]): Promise<void> {
  const filePath = path.join(dataDir, filename);
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// Teams
export const getTeams = async (): Promise<Team[]> => readFile<Team>('teams.json');
export const addTeam = async (team: Omit<Team, 'id'>): Promise<Team> => {
  const teams = await getTeams();
  const newTeam: Team = { ...team, id: new Date().toISOString() };
  await writeFile('teams.json', [...teams, newTeam]);
  return newTeam;
};

// Matches
export const getMatches = async (): Promise<Match[]> => readFile<Match>('matches.json');
export const addMatch = async (match: Omit<Match, 'id'>): Promise<Match> => {
  const matches = await getMatches();
  const newMatch: Match = { ...match, id: new Date().toISOString() };
  await writeFile('matches.json', [newMatch, ...matches]);
  return newMatch;
};

// Schedules
export const getSchedules = async (): Promise<Schedule[]> => readFile<Schedule>('schedules.json');
export const addSchedule = async (schedule: Omit<Schedule, 'id'>): Promise<Schedule> => {
  const schedules = await getSchedules();
  const newSchedule: Schedule = { ...schedule, id: new Date().toISOString() };
  schedules.push(newSchedule);
  schedules.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  await writeFile('schedules.json', schedules);
  return newSchedule;
};
