import { getMatches, getTeams } from '@/lib/storage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

export async function RecentMatches() {
  const matches = (await getMatches()).slice(0, 5);
  const teams = await getTeams();
  const teamMap = new Map(teams.map((team) => [team.id, team.name]));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Results</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Competition</TableHead>
              <TableHead>Home Team</TableHead>
              <TableHead>Away Team</TableHead>
              <TableHead className="text-right">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {matches.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center">No matches recorded yet.</TableCell>
              </TableRow>
            )}
            {matches.map((match) => (
              <TableRow key={match.id}>
                <TableCell>{format(new Date(match.date), 'MMM d, yyyy')}</TableCell>
                <TableCell>{match.competition}</TableCell>
                <TableCell>{teamMap.get(match.team1Id) || 'Unknown Team'}</TableCell>
                <TableCell>{teamMap.get(match.team2Id) || 'Unknown Team'}</TableCell>
                <TableCell className="text-right">
                  <Badge variant="secondary" className="text-lg">
                    {match.team1Score} - {match.team2Score}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
