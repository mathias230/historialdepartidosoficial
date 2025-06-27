'use client';

import { useState, useMemo } from 'react';
import type { Team, Match } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface MatchHistoryProps {
  teams: Team[];
  matches: Match[];
}

export function MatchHistory({ teams, matches }: MatchHistoryProps) {
  const [team1Id, setTeam1Id] = useState<string | null>(null);
  const [team2Id, setTeam2Id] = useState<string | null>(null);

  const filteredMatches = useMemo(() => {
    if (!team1Id || !team2Id) return [];
    return matches.filter(
      (match) =>
        (match.team1Id === team1Id && match.team2Id === team2Id) ||
        (match.team1Id === team2Id && match.team2Id === team1Id)
    ).sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [team1Id, team2Id, matches]);

  const stats = useMemo(() => {
    if (!team1Id || !team2Id) return { team1Wins: 0, team2Wins: 0, draws: 0 };
    return filteredMatches.reduce(
      (acc, match) => {
        if (match.team1Score === match.team2Score) {
          acc.draws++;
        } else if (
          (match.team1Id === team1Id && match.team1Score > match.team2Score) ||
          (match.team2Id === team1Id && match.team2Score > match.team1Score)
        ) {
          acc.team1Wins++;
        } else {
          acc.team2Wins++;
        }
        return acc;
      },
      { team1Wins: 0, team2Wins: 0, draws: 0 }
    );
  }, [team1Id, team2Id, filteredMatches]);
  
  const team1Name = teams.find(t => t.id === team1Id)?.name;
  const team2Name = teams.find(t => t.id === team2Id)?.name;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Head-to-Head History</CardTitle>
        <CardDescription>Select two teams to see their match history.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select onValueChange={setTeam1Id}>
            <SelectTrigger><SelectValue placeholder="Select Team 1" /></SelectTrigger>
            <SelectContent>
              {teams.filter(t => t.id !== team2Id).map((team) => (
                <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={setTeam2Id}>
            <SelectTrigger><SelectValue placeholder="Select Team 2" /></SelectTrigger>
            <SelectContent>
              {teams.filter(t => t.id !== team1Id).map((team) => (
                <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {team1Id && team2Id && (
          <div className="space-y-4 pt-4">
            <div className="flex justify-around text-center p-4 rounded-lg bg-muted">
                <div>
                    <p className="font-bold text-2xl text-primary">{stats.team1Wins}</p>
                    <p className="text-sm text-muted-foreground">{team1Name} Wins</p>
                </div>
                <div>
                    <p className="font-bold text-2xl">{stats.draws}</p>
                    <p className="text-sm text-muted-foreground">Draws</p>
                </div>
                <div>
                    <p className="font-bold text-2xl text-primary">{stats.team2Wins}</p>
                    <p className="text-sm text-muted-foreground">{team2Name} Wins</p>
                </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Competition</TableHead>
                  <TableHead>Home</TableHead>
                  <TableHead>Away</TableHead>
                  <TableHead className="text-right">Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMatches.length === 0 && (
                    <TableRow><TableCell colSpan={5} className="text-center">No matches found between these teams.</TableCell></TableRow>
                )}
                {filteredMatches.map((match) => {
                    const homeTeam = teams.find(t => t.id === match.team1Id);
                    const awayTeam = teams.find(t => t.id === match.team2Id);
                    return (
                        <TableRow key={match.id}>
                            <TableCell>{format(new Date(match.date), 'MMM d, yyyy')}</TableCell>
                            <TableCell>{match.competition}</TableCell>
                            <TableCell>{homeTeam?.name}</TableCell>
                            <TableCell>{awayTeam?.name}</TableCell>
                            <TableCell className="text-right">
                                <Badge variant="secondary" className="text-lg">{match.team1Score} - {match.team2Score}</Badge>
                            </TableCell>
                        </TableRow>
                    );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
