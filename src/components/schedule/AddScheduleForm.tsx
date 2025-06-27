'use client';

import { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { addSchedule } from '@/lib/storage';
import { addScheduleSchema } from '@/lib/schemas';
import type { Team } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SubmitButton } from '@/components/SubmitButton';
import { useTranslation } from '@/context/LanguageContext';
import type { ZodError } from 'zod';

export function AddScheduleForm({ teams }: { teams: Team[] }) {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const { t } = useTranslation();
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[] | undefined> | null>(null);
  const [team1Key, setTeam1Key] = useState(Date.now());
  const [team2Key, setTeam2Key] = useState(Date.now() + 1);


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    setErrors(null);

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const validatedFields = addScheduleSchema.safeParse(data);

    if (!validatedFields.success) {
      setErrors((validatedFields.error as ZodError).flatten().fieldErrors);
      setPending(false);
      return;
    }
    
    try {
        addSchedule(validatedFields.data);
        toast({ title: t.success, description: t.matchScheduledSuccess });
        formRef.current?.reset();
        setTeam1Key(Date.now());
        setTeam2Key(Date.now() + 1);
    } catch (e) {
        toast({ title: t.error, description: t.matchScheduledError, variant: 'destructive' });
    } finally {
      setPending(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.scheduleAMatch}</CardTitle>
        <CardDescription>{t.scheduleAMatchDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date">{t.dateTime}</Label>
            <Input id="date" name="date" type="datetime-local" required />
            {errors?.date && <p className="text-sm text-destructive">{errors.date[0]}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="team1Id">{t.team1}</Label>
              <Select key={team1Key} name="team1Id" required>
                <SelectTrigger><SelectValue placeholder={t.selectTeam1} /></SelectTrigger>
                <SelectContent>
                  {teams.map(team => <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>)}
                </SelectContent>
              </Select>
              {errors?.team1Id && <p className="text-sm text-destructive">{errors.team1Id[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="team2Id">{t.team2}</Label>
              <Select key={team2Key} name="team2Id" required>
                <SelectTrigger><SelectValue placeholder={t.selectTeam2} /></SelectTrigger>
                <SelectContent>
                  {teams.map(team => <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>)}
                </SelectContent>
              </Select>
              {errors?.team2Id && <p className="text-sm text-destructive">{errors.team2Id[0]}</p>}
            </div>
          </div>
          
          <SubmitButton pending={pending}>{t.scheduleMatch}</SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
}
