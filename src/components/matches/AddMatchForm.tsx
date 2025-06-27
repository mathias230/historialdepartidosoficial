'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { addMatchAction } from '@/lib/actions';
import type { Team } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { SubmitButton } from '@/components/SubmitButton';

const initialState = { message: '', success: false };

export function AddMatchForm({ teams }: { teams: Team[] }) {
  const [state, formAction] = useActionState(addMatchAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({ title: 'Success', description: state.message });
        formRef.current?.reset();
      } else {
        toast({ title: 'Error', description: state.message, variant: 'destructive' });
      }
    }
  }, [state, toast]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Record Match Result</CardTitle>
        <CardDescription>Enter the details of a completed match.</CardDescription>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input id="date" name="date" type="date" required />
            {state.errors?.date && <p className="text-sm text-destructive">{state.errors.date}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="team1Id">Team 1 (Home)</Label>
                <input name="team1Id" type="hidden" />
                <Select name="team1Id" required>
                  <SelectTrigger><SelectValue placeholder="Select Team 1" /></SelectTrigger>
                  <SelectContent>
                    {teams.map(team => <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              {state.errors?.team1Id && <p className="text-sm text-destructive">{state.errors.team1Id}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="team2Id">Team 2 (Away)</Label>
                <Select name="team2Id" required>
                  <SelectTrigger><SelectValue placeholder="Select Team 2" /></SelectTrigger>
                  <SelectContent>
                    {teams.map(team => <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              {state.errors?.team2Id && <p className="text-sm text-destructive">{state.errors.team2Id}</p>}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="team1Score">Team 1 Score</Label>
                <Input id="team1Score" name="team1Score" type="number" min="0" defaultValue="0" required />
                {state.errors?.team1Score && <p className="text-sm text-destructive">{state.errors.team1Score}</p>}
            </div>
             <div className="space-y-2">
                <Label htmlFor="team2Score">Team 2 Score</Label>
                <Input id="team2Score" name="team2Score" type="number" min="0" defaultValue="0" required />
                {state.errors?.team2Score && <p className="text-sm text-destructive">{state.errors.team2Score}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="highlights">Highlights</Label>
            <Textarea id="highlights" name="highlights" placeholder="Any notable moments, goals, or plays..." />
          </div>

          <SubmitButton>Record Match</SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
}
