'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { addScheduleAction } from '@/lib/actions';
import type { Team } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SubmitButton } from '@/components/SubmitButton';

const initialState = { message: '', success: false };

export function AddScheduleForm({ teams }: { teams: Team[] }) {
  const [state, formAction] = useActionState(addScheduleAction, initialState);
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
        <CardTitle>Schedule a Match</CardTitle>
        <CardDescription>Set up an upcoming match between two teams.</CardDescription>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date & Time</Label>
            <Input id="date" name="date" type="datetime-local" required />
            {state.errors?.date && <p className="text-sm text-destructive">{state.errors.date}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="team1Id">Team 1</Label>
              <Select name="team1Id" required>
                <SelectTrigger><SelectValue placeholder="Select Team 1" /></SelectTrigger>
                <SelectContent>
                  {teams.map(team => <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>)}
                </SelectContent>
              </Select>
              {state.errors?.team1Id && <p className="text-sm text-destructive">{state.errors.team1Id}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="team2Id">Team 2</Label>
              <Select name="team2Id" required>
                <SelectTrigger><SelectValue placeholder="Select Team 2" /></SelectTrigger>
                <SelectContent>
                  {teams.map(team => <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>)}
                </SelectContent>
              </Select>
              {state.errors?.team2Id && <p className="text-sm text-destructive">{state.errors.team2Id}</p>}
            </div>
          </div>
          
          <SubmitButton>Schedule Match</SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
}
