'use client';

import { useState, useEffect, useCallback } from 'react';
import { getMatches, getTeams } from '@/lib/storage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { useTranslation } from '@/context/LanguageContext';
import type { Match, Team } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export function RecentMatches() {
  const { t } = useTranslation();
  const [matches, setMatches] = useState<Match[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(() => {
    setMatches(getMatches().slice(0, 5));
    setTeams(getTeams());
  }, []);

  useEffect(() => {
    fetchData();
    setLoading(false);
    window.addEventListener('storage', fetchData);
    return () => {
      window.removeEventListener('storage', fetchData);
    };
  }, [fetchData]);

  if (loading) {
    return <Skeleton className="h-[300px]" />;
  }

  const teamMap = new Map(teams.map((team) => [team.id, team.name]));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.recentResults}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t.date}</TableHead>
              <TableHead>{t.competition}</TableHead>
              <TableHead>{t.homeTeam}</TableHead>
              <TableHead>{t.awayTeam}</TableHead>
              <TableHead className="text-right">{t.score}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {matches.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center">{t.noMatchesRecorded}</TableCell>
              </TableRow>
            )}
            {matches.map((match) => (
              <TableRow key={match.id}>
                <TableCell>{format(new Date(match.date), 'MMM d, yyyy')}</TableCell>
                <TableCell>{match.competition}</TableCell>
                <TableCell>{teamMap.get(match.team1Id) || 'Unknown Team'}</TableCell>
                <TableCell>{teamMap.get(match.team2Id) || 'Unknown Team'}</TableCell>
                <TableCell className="text-right">
                  <Badge variant="secondary" className="text-lg">
                    {match.team1Score} - {match.team2Score}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
