'use client';

import { Suspense, useState, useEffect } from 'react';
import { getTeams } from '@/lib/storage';
import { AddScheduleForm } from '@/components/schedule/AddScheduleForm';
import { UpcomingMatches } from '@/components/schedule/UpcomingMatches';
import { Skeleton } from '@/components/ui/skeleton';
import { useTranslation } from '@/context/LanguageContext';
import type { Team } from '@/lib/types';

export default function SchedulePage() {
  const { t } = useTranslation();
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTeams() {
      const teamsData = await getTeams();
      setTeams(teamsData);
      setLoading(false);
    }
    fetchTeams();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{t.matchScheduler}</h1>
        <p className="text-muted-foreground">{t.matchSchedulerDescription}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          {loading ? <Skeleton className="h-96" /> : <AddScheduleForm teams={teams} />}
        </div>
        <div className="lg:col-span-2">
          <Suspense fallback={<Skeleton className="h-[400px]" />}>
            <UpcomingMatches />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
