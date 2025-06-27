import { Suspense } from 'react';
import { getTeams } from '@/lib/storage';
import { AddScheduleForm } from '@/components/schedule/AddScheduleForm';
import { UpcomingMatches } from '@/components/schedule/UpcomingMatches';
import { Skeleton } from '@/components/ui/skeleton';

export default async function SchedulePage() {
  const teams = await getTeams();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Match Scheduler</h1>
        <p className="text-muted-foreground">Plan future matches and see what's next.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <AddScheduleForm teams={teams} />
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
