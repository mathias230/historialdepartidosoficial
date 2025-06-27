'use client';

import { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { addMatch } from '@/lib/storage';
import type { Team } from '@/lib/types';
import { addMatchSchema } from '@/lib/schemas';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { SubmitButton } from '@/components/SubmitButton';
import { useTranslation } from '@/context/LanguageContext';
import type { ZodError } from 'zod';

export function AddMatchForm({ teams }: { teams: Team[] }) {
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
    const validatedFields = addMatchSchema.safeParse(data);

    if (!validatedFields.success) {
      setErrors((validatedFields.error as ZodError).flatten().fieldErrors);
      setPending(false);
      return;
    }
    
    try {
      addMatch({ ...validatedFields.data, highlights: validatedFields.data.highlights || '' });
      toast({ title: t.success, description: t.matchRecordedSuccess });
      formRef.current?.reset();
      setTeam1Key(Date.now());
      setTeam2Key(Date.now() + 1);
    } catch (e) {
      toast({ title: t.error, description: t.matchRecordedError, variant: 'destructive' });
    } finally {
      setPending(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.recordMatchResult}</CardTitle>
        <CardDescription>{t.recordMatchResultDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">{t.date}</Label>
              <Input id="date" name="date" type="date" required />
              {errors?.date && <p className="text-sm text-destructive">{errors.date[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="competition">{t.competition}</Label>
              <Input id="competition" name="competition" placeholder={t.competitionPlaceholder} required />
              {errors?.competition && <p className="text-sm text-destructive">{errors.competition[0]}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="team1Id">{t.team1Home}</Label>
                <Select key={team1Key} name="team1Id" required>
                  <SelectTrigger><SelectValue placeholder={t.selectTeam1} /></SelectTrigger>
                  <SelectContent>
                    {teams.map(team => <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              {errors?.team1Id && <p className="text-sm text-destructive">{errors.team1Id[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="team2Id">{t.team2Away}</Label>
                <Select key={team2Key} name="team2Id" required>
                  <SelectTrigger><SelectValue placeholder={t.selectTeam2} /></SelectTrigger>
                  <SelectContent>
                    {teams.map(team => <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              {errors?.team2Id && <p className="text-sm text-destructive">{errors.team2Id[0]}</p>}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="team1Score">{t.team1Score}</Label>
                <Input id="team1Score" name="team1Score" type="number" min="0" defaultValue="0" required />
                {errors?.team1Score && <p className="text-sm text-destructive">{errors.team1Score[0]}</p>}
            </div>
             <div className="space-y-2">
                <Label htmlFor="team2Score">{t.team2Score}</Label>
                <Input id="team2Score" name="team2Score" type="number" min="0" defaultValue="0" required />
                {errors?.team2Score && <p className="text-sm text-destructive">{errors.team2Score[0]}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="highlights">{t.highlights}</Label>
            <Textarea id="highlights" name="highlights" placeholder={t.highlightsPlaceholder} />
          </div>

          <SubmitButton pending={pending}>{t.recordMatch}</SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
}
