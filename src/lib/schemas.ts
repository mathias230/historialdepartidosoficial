import { z } from 'zod';

export const addTeamSchema = z.object({
  name: z.string().min(2, { message: 'Team name must be at least 2 characters.' }),
  captain: z.string().min(2, { message: 'Captain name must be at least 2 characters.' }),
});

export const addMatchSchema = z.object({
  date: z.string().min(1, { message: 'Please select a date.' }),
  team1Id: z.string().min(1, { message: 'Please select team 1.' }),
  team2Id: z.string().min(1, { message: 'Please select team 2.' }),
  team1Score: z.coerce.number().min(0, { message: 'Score must be 0 or greater.' }),
  team2Score: z.coerce.number().min(0, { message: 'Score must be 0 or greater.' }),
  highlights: z.string().optional(),
}).refine(data => data.team1Id !== data.team2Id, {
  message: "Teams cannot play against themselves.",
  path: ["team2Id"],
});


export const addScheduleSchema = z.object({
  date: z.string({ required_error: 'Please select a date and time.' }),
  team1Id: z.string().min(1, { message: 'Please select team 1.' }),
  team2Id: z.string().min(1, { message: 'Please select team 2.' }),
}).refine(data => data.team1Id !== data.team2Id, {
    message: "A team cannot be scheduled against itself.",
    path: ["team2Id"],
});
