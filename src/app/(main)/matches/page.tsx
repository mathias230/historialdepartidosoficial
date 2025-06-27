import { getTeams, getMatches } from '@/lib/storage';
import { AddMatchForm } from '@/components/matches/AddMatchForm';
import { MatchHistory } from '@/components/matches/MatchHistory';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default async function MatchesPage() {
  const teams = await getTeams();
  const matches = await getMatches();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Match Center</h1>
        <p className="text-muted-foreground">Record results and view head-to-head stats.</p>
      </div>
      <Tabs defaultValue="record">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="record">Record Match</TabsTrigger>
          <TabsTrigger value="history">Match History</TabsTrigger>
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
