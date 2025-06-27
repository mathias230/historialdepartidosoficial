'use client';

import { useState, useEffect, useCallback } from 'react';
import { getTeams, getMatches } from '@/lib/storage';
import { AddMatchForm } from '@/components/matches/AddMatchForm';
import { MatchHistory } from '@/components/matches/MatchHistory';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslation } from '@/context/LanguageContext';
import type { Team, Match } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function MatchesPage() {
  const { t } = useTranslation();
  const [teams, setTeams] = useState<Team[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(() => {
    setTeams(getTeams());
    setMatches(getMatches());
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
    return (
      <div className="space-y-8">
        <Skeleton className="h-12 w-1/2" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{t.matchCenter}</h1>
        <p className="text-muted-foreground">{t.matchCenterDescription}</p>
      </div>
      <Tabs defaultValue="record">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="record">{t.recordMatch}</TabsTrigger>
          <TabsTrigger value="history">{t.matchHistory}</TabsTrigger>
        </TabsList>
        <TabsContent value="record" className="mt-4">
          <AddMatchForm teams={teams} />
        </TabsContent>
        <TabsContent value="history" className="mt-4">
          <MatchHistory teams={teams} matches={matches} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
