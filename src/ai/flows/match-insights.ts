'use server';

/**
 * @fileOverview Generates insights from match data.
 *
 * - generateMatchInsights - A function that generates match insights.
 * - MatchInsightsInput - The input type for the generateMatchInsights function.
 * - MatchInsightsOutput - The return type for the generateMatchInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MatchInsightsInputSchema = z.object({
  team1Name: z.string().describe('The name of the first team.'),
  team2Name: z.string().describe('The name of the second team.'),
  team1Score: z.number().describe('The score of the first team.'),
  team2Score: z.number().describe('The score of the second team.'),
  matchHighlights: z.string().describe('Key highlights from the match.'),
});
export type MatchInsightsInput = z.infer<typeof MatchInsightsInputSchema>;

const MatchInsightsOutputSchema = z.object({
  summary: z.string().describe('A summary of the match insights.'),
});
export type MatchInsightsOutput = z.infer<typeof MatchInsightsOutputSchema>;

export async function generateMatchInsights(
  input: MatchInsightsInput
): Promise<MatchInsightsOutput> {
  return matchInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'matchInsightsPrompt',
  input: {schema: MatchInsightsInputSchema},
  output: {schema: MatchInsightsOutputSchema},
  prompt: `You are an expert FC25 Pro Clubs match analyst. Analyze the match data and provide key insights.\n
Team 1: {{team1Name}}\nTeam 2: {{team2Name}}\nTeam 1 Score: {{team1Score}}\nTeam 2 Score: {{team2Score}}\nMatch Highlights: {{matchHighlights}}\n
Provide a concise summary of the match, focusing on the most important aspects and potential areas for improvement.`,
});

const matchInsightsFlow = ai.defineFlow(
  {
    name: 'matchInsightsFlow',
    inputSchema: MatchInsightsInputSchema,
    outputSchema: MatchInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
