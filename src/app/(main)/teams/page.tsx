'use client';

import { Suspense } from 'react';
import { AddTeamForm } from '@/components/teams/AddTeamForm';
import { TeamList } from '@/components/teams/TeamList';
import { Skeleton } from '@/components/ui/skeleton';
import { useTranslation } from '@/context/LanguageContext';

export default function TeamsPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{t.teamManagement}</h1>
        <p className="text-muted-foreground">{t.teamManagementDescription}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
            <AddTeamForm />
        </div>
        <div className="lg:col-span-2">
          <Suspense fallback={<Skeleton className="h-[300px]" />}>
            <TeamList />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
