'use server';

import { generateMatchInsights } from '@/ai/flows/match-insights';

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
