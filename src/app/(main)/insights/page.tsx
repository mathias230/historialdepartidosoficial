import { getTeams, getMatches } from '@/lib/storage';
import { MatchInsightsGenerator } from '@/components/insights/MatchInsightsGenerator';

export default async function InsightsPage() {
  const teams = await getTeams();
  const matches = await getMatches();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Match Insights</h1>
        <p className="text-muted-foreground">
          Use AI to get a deeper understanding of match results.
        </p>
      </div>

      <MatchInsightsGenerator teams={teams} matches={matches} />
    </div>
  );
}
