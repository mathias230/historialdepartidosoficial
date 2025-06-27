'use client';

import { useState, useEffect, useCallback } from 'react';
import { getTeams, getMatches } from '@/lib/storage';
import { MatchInsightsGenerator } from '@/components/insights/MatchInsightsGenerator';
import { useTranslation } from '@/context/LanguageContext';
import type { Team, Match } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function InsightsPage() {
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


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{t.matchInsights}</h1>
        <p className="text-muted-foreground">{t.matchInsightsDescription}</p>
      </div>

      {loading ? (
        <Skeleton className="max-w-2xl mx-auto h-96" />
      ) : (
        <MatchInsightsGenerator teams={teams} matches={matches} />
      )}
    </div>
  );
}
