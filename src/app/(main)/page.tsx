'use client';

import { Suspense, useState, useEffect, useCallback } from 'react';
import { getSchedules, getTeams } from '@/lib/storage';
import { Countdown } from '@/components/schedule/Countdown';
import { RecentMatches } from '@/components/matches/RecentMatches';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useTranslation } from '@/context/LanguageContext';
import type { Schedule, Team } from '@/lib/types';

function UpcomingMatch() {
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
    return () => window.removeEventListener('storage', fetchData);
  }, [fetchData]);


  if (loading) {
    return <Skeleton className="h-[200px]" />;
  }

  const nextMatch = schedules.find(s => new Date(s.date) > new Date());

  if (!nextMatch) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl">{t.nextMatch}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">{t.noUpcomingMatches}</p>
        </CardContent>
      </Card>
    );
  }

  return <Countdown schedule={nextMatch} teams={teams} />;
}

export default function DashboardPage() {
  const { t } = useTranslation();
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{t.dashboardTitle}</h1>
        <p className="text-muted-foreground">{t.dashboardDescription}</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Suspense fallback={<Skeleton className="h-[200px]" />}>
          <UpcomingMatch />
        </Suspense>
        <div className="md:col-span-2">
          <Suspense fallback={<Skeleton className="h-[300px]" />}>
            <RecentMatches />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
