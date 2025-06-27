'use client';

import { useState, useEffect, useCallback } from 'react';
import { getSchedules, getTeams } from '@/lib/storage';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';
import { Calendar, Clock } from 'lucide-react';
import { useTranslation } from '@/context/LanguageContext';
import type { Schedule, Team } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export function UpcomingMatches() {
  const { t } = useTranslation();
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(() => {
    setSchedules(getSchedules());
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
    return <Skeleton className="h-[400px]" />;
  }

  const teamMap = new Map(teams.map((team) => [team.id, team.name]));

  const upcoming = schedules.filter(s => new Date(s.date) > new Date());

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.upcomingMatches}</CardTitle>
        <CardDescription>{t.upcomingMatchesDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t.matchup}</TableHead>
              <TableHead>{t.dateTime}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
             {upcoming.length === 0 && (
                <TableRow>
                    <TableCell colSpan={2} className="text-center">{t.noUpcomingMatchesScheduled}</TableCell>
                </TableRow>
            )}
            {upcoming.map((schedule) => (
              <TableRow key={schedule.id}>
                <TableCell className="font-medium">
                  {teamMap.get(schedule.team1Id) || 'Unknown'} vs {teamMap.get(schedule.team2Id) || 'Unknown'}
                </TableCell>
                <TableCell>
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                           <Calendar className="h-4 w-4 text-muted-foreground" />
                           <span>{format(new Date(schedule.date), 'EEEE, MMMM d, yyyy')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <Clock className="h-4 w-4 text-muted-foreground" />
                           <span>{format(new Date(schedule.date), 'h:mm a')}</span>
                        </div>
                    </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
