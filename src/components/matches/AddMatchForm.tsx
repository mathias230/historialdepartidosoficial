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
import { useTranslation } from '@/context/LanguageContext';
import type { TranslationKeys } from '@/locales/en';

const initialState = { messageKey: '', success: false };

export function AddMatchForm({ teams }: { teams: Team[] }) {
  const [state, formAction] = useActionState(addMatchAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (state.messageKey) {
      const key = state.messageKey as TranslationKeys;
      if (state.success) {
        toast({ title: t.success, description: t[key] });
        formRef.current?.reset();
      } else {
        toast({ title: t.error, description: t[key], variant: 'destructive' });
      }
    }
  }, [state, toast, t]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.recordMatchResult}</CardTitle>
        <CardDescription>{t.recordMatchResultDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={formAction} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">{t.date}</Label>
              <Input id="date" name="date" type="date" required />
              {state.errors?.date && <p className="text-sm text-destructive">{state.errors.date}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="competition">{t.competition}</Label>
              <Input id="competition" name="competition" placeholder={t.competitionPlaceholder} required />
              {state.errors?.competition && <p className="text-sm text-destructive">{state.errors.competition}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="team1Id">{t.team1Home}</Label>
                <Select name="team1Id" required>
                  <SelectTrigger><SelectValue placeholder={t.selectTeam1} /></SelectTrigger>
                  <SelectContent>
                    {teams.map(team => <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              {state.errors?.team1Id && <p className="text-sm text-destructive">{state.errors.team1Id}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="team2Id">{t.team2Away}</Label>
                <Select name="team2Id" required>
                  <SelectTrigger><SelectValue placeholder={t.selectTeam2} /></SelectTrigger>
                  <SelectContent>
                    {teams.map(team => <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              {state.errors?.team2Id && <p className="text-sm text-destructive">{state.errors.team2Id}</p>}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="team1Score">{t.team1Score}</Label>
                <Input id="team1Score" name="team1Score" type="number" min="0" defaultValue="0" required />
                {state.errors?.team1Score && <p className="text-sm text-destructive">{state.errors.team1Score}</p>}
            </div>
             <div className="space-y-2">
                <Label htmlFor="team2Score">{t.team2Score}</Label>
                <Input id="team2Score" name="team2Score" type="number" min="0" defaultValue="0" required />
                {state.errors?.team2Score && <p className="text-sm text-destructive">{state.errors.team2Score}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="highlights">{t.highlights}</Label>
            <Textarea id="highlights" name="highlights" placeholder={t.highlightsPlaceholder} />
          </div>

          <SubmitButton>{t.recordMatch}</SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
}
