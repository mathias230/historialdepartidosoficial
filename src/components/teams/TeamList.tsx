'use client';

import { useState, useEffect } from 'react';
import { getTeams } from '@/lib/storage';
import type { Team } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { useTranslation } from '@/context/LanguageContext';

export function TeamList() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    getTeams().then(data => {
      setTeams(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Skeleton className="h-[300px]" />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.registeredTeams}</CardTitle>
        <CardDescription>{t.registeredTeamsDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t.teamName}</TableHead>
              <TableHead>{t.captain}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teams.length === 0 && (
                <TableRow>
                    <TableCell colSpan={2} className="text-center">{t.noTeamsAdded}</TableCell>
                </TableRow>
            )}
            {teams.map((team) => (
              <TableRow key={team.id}>
                <TableCell className="font-medium flex items-center gap-3">
                  <Avatar>
                      <AvatarFallback>{team.name.substring(0,2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  {team.name}
                </TableCell>
                <TableCell>{team.captain}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
