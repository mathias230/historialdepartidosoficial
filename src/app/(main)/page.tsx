import { Suspense } from 'react';
import { getSchedules, getTeams } from '@/lib/storage';
import { Countdown } from '@/components/schedule/Countdown';
import { RecentMatches } from '@/components/matches/RecentMatches';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

async function UpcomingMatch() {
  const schedules = await getSchedules();
  const teams = await getTeams();
  const nextMatch = schedules.find(s => new Date(s.date) > new Date());

  if (!nextMatch) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl">Next Match</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">No upcoming matches scheduled.</p>
        </CardContent>
      </Card>
    );
  }

  return <Countdown schedule={nextMatch} teams={teams} />;
}

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your Pro Clubs Ledger.</p>
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
