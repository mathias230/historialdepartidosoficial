'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { generateMatchInsights } from '@/ai/flows/match-insights';
import { addTeamSchema, addMatchSchema, addScheduleSchema } from './schemas';
import { addTeam, addMatch, addSchedule } from './storage';

export type FormState = {
  message: string;
  errors?: Record<string, string[] | undefined>;
  success: boolean;
};

export async function addTeamAction(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = addTeamSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      message: 'Failed to create team.',
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  try {
    await addTeam(validatedFields.data);
    revalidatePath('/teams');
    return { message: 'Team added successfully.', success: true };
  } catch (e) {
    return { message: 'An error occurred while adding the team.', success: false };
  }
}

export async function addMatchAction(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = addMatchSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      message: 'Failed to record match.',
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }
  
  try {
    await addMatch({ ...validatedFields.data, highlights: validatedFields.data.highlights || '' });
    revalidatePath('/matches');
    revalidatePath('/');
    return { message: 'Match recorded successfully.', success: true };
  } catch (e) {
    return { message: 'An error occurred while recording the match.', success: false };
  }
}

export async function addScheduleAction(prevState: FormState, formData: FormData): Promise<FormState> {
    const validatedFields = addScheduleSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return {
            message: 'Failed to schedule match.',
            errors: validatedFields.error.flatten().fieldErrors,
            success: false,
        }
    }

    try {
        await addSchedule(validatedFields.data);
        revalidatePath('/schedule');
        revalidatePath('/');
        return { message: 'Match scheduled successfully.', success: true };
    } catch (e) {
        return { message: 'An error occurred while scheduling the match.', success: false };
    }
}

export async function getMatchInsightsAction(
    team1Name: string,
    team2Name: string,
    team1Score: number,
    team2Score: number,
    matchHighlights: string
) {
    try {
        const insights = await generateMatchInsights({
            team1Name,
            team2Name,
            team1Score,
            team2Score,
            matchHighlights
        });
        return { success: true, summary: insights.summary };
    } catch (error) {
        return { success: false, summary: "Failed to generate insights." };
    }
}
