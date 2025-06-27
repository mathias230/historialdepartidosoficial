'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { addTeamAction } from '@/lib/actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { SubmitButton } from '@/components/SubmitButton';
import { useTranslation } from '@/context/LanguageContext';
import type { TranslationKeys } from '@/locales/en';

const initialState = { messageKey: '', success: false };

export function AddTeamForm() {
  const [state, formAction] = useActionState(addTeamAction, initialState);
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
        <CardTitle>{t.addNewTeam}</CardTitle>
        <CardDescription>{t.addNewTeamDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t.teamName}</Label>
            <Input id="name" name="name" placeholder={t.teamNamePlaceholder} required />
            {state.errors?.name && <p className="text-sm text-destructive">{state.errors.name}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="captain">{t.captain}</Label>
            <Input id="captain" name="captain" placeholder={t.captainPlaceholder} required />
            {state.errors?.captain && <p className="text-sm text-destructive">{state.errors.captain}</p>}
          </div>
          <SubmitButton>{t.addTeam}</SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
}
