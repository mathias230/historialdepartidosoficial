import { getTeams } from '@/lib/storage';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export async function TeamList() {
  const teams = await getTeams();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registered Teams</CardTitle>
        <CardDescription>A list of all teams in the ledger.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Team Name</TableHead>
              <TableHead>Captain</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teams.length === 0 && (
                <TableRow>
                    <TableCell colSpan={2} className="text-center">No teams added yet.</TableCell>
                </TableRow>
            )}
            {teams.map((team) => (
              <TableRow key={team.id}>
                <TableCell className="font-medium flex items-center gap-3">
                  <Avatar>
                      <AvatarFallback>{team.name.substring(0,2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  {team.name}
                </TableCell>
                <TableCell>{team.captain}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
