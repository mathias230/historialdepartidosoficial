'use client';

import { useState } from 'react';
import { getMatchInsightsAction } from '@/lib/actions';
import type { Team, Match } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Loader2, Lightbulb } from 'lucide-react';
import { format } from 'date-fns';

interface MatchInsightsGeneratorProps {
  teams: Team[];
  matches: Match[];
}

export function MatchInsightsGenerator({ teams, matches }: MatchInsightsGeneratorProps) {
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [insights, setInsights] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const teamMap = new Map(teams.map((team) => [team.id, team.name]));

  const handleGenerate = async () => {
    if (!selectedMatchId) {
        setError('Please select a match.');
        return;
    }
    const match = matches.find(m => m.id === selectedMatchId);
    if (!match) {
        setError('Selected match not found.');
        return;
    }

    setIsLoading(true);
    setError(null);
    setInsights(null);

    const team1Name = teamMap.get(match.team1Id) ?? 'Unknown Team';
    const team2Name = teamMap.get(match.team2Id) ?? 'Unknown Team';

    const result = await getMatchInsightsAction(
      team1Name,
      team2Name,
      match.team1Score,
      match.team2Score,
      match.highlights,
      match.competition
    );

    if (result.success) {
      setInsights(result.summary);
    } else {
      setError(result.summary);
    }
    setIsLoading(false);
  };
  
  const getMatchLabel = (match: Match) => {
    const team1Name = teamMap.get(match.team1Id) ?? 'Team 1';
    const team2Name = teamMap.get(match.team2Id) ?? 'Team 2';
    const date = format(new Date(match.date), 'MMM d, yyyy');
    return `${date} (${match.competition}): ${team1Name} ${match.team1Score} - ${match.team2Score} ${team2Name}`;
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>AI-Powered Match Insights</CardTitle>
        <CardDescription>Select a recent match to generate an analytical summary.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
            <Select onValueChange={setSelectedMatchId}>
                <SelectTrigger>
                    <SelectValue placeholder="Select a past match" />
                </SelectTrigger>
                <SelectContent>
                    {matches.map(match => (
                        <SelectItem key={match.id} value={match.id}>
                           {getMatchLabel(match)}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        <div>
            <Button onClick={handleGenerate} disabled={isLoading || !selectedMatchId} className="w-full">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lightbulb className="mr-2 h-4 w-4" />}
                Generate Insights
            </Button>
        </div>

        {insights && (
            <Card className="bg-muted">
                <CardHeader>
                    <CardTitle className="text-lg">Analysis Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm whitespace-pre-wrap">{insights}</p>
                </CardContent>
            </Card>
        )}
      </CardContent>
    </Card>
  );
}
