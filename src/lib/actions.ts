'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { generateMatchInsights } from '@/ai/flows/match-insights';
import { addTeamSchema, addMatchSchema, addScheduleSchema } from './schemas';
import { addTeam, addMatch, addSchedule } from './storage';

export type FormState = {
  messageKey: string;
  errors?: Record<string, string[] | undefined>;
  success: boolean;
};

export async function addTeamAction(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = addTeamSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      messageKey: 'Failed to create team.', // This is not a key, but a fallback. Zod errors are handled separately.
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  try {
    await addTeam(validatedFields.data);
    revalidatePath('/teams');
    return { messageKey: 'teamAddedSuccess', success: true };
  } catch (e) {
    return { messageKey: 'teamAddedError', success: false };
  }
}

export async function addMatchAction(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = addMatchSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      messageKey: 'Failed to record match.',
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }
  
  try {
    await addMatch({ ...validatedFields.data, highlights: validatedFields.data.highlights || '' });
    revalidatePath('/matches');
    revalidatePath('/');
    return { messageKey: 'matchRecordedSuccess', success: true };
  } catch (e) {
    return { messageKey: 'matchRecordedError', success: false };
  }
}

export async function addScheduleAction(prevState: FormState, formData: FormData): Promise<FormState> {
    const validatedFields = addScheduleSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return {
            messageKey: 'Failed to schedule match.',
            errors: validatedFields.error.flatten().fieldErrors,
            success: false,
        }
    }

    try {
        await addSchedule(validatedFields.data);
        revalidatePath('/schedule');
        revalidatePath('/');
        return { messageKey: 'matchScheduledSuccess', success: true };
    } catch (e) {
        return { messageKey: 'matchScheduledError', success: false };
    }
}

export async function getMatchInsightsAction(
    team1Name: string,
    team2Name: string,
    team1Score: number,
    team2Score: number,
    matchHighlights: string,
    competition: string
) {
    try {
        const insights = await generateMatchInsights({
            competition,
            team1Name,
            team2Name,
            team1Score,
            team2Score,
            matchHighlights,
        });
        return { success: true, summary: insights.summary, errorKey: null };
    } catch (error) {
        return { success: false, summary: null, errorKey: 'failedToGenerateInsights' };
    }
}
