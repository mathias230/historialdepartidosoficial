'use client';

import { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { addTeam } from '@/lib/storage';
import { addTeamSchema } from '@/lib/schemas';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { SubmitButton } from '@/components/SubmitButton';
import { useTranslation } from '@/context/LanguageContext';
import type { ZodError } from 'zod';

export function AddTeamForm() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const { t } = useTranslation();
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[] | undefined> | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    setErrors(null);

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const validatedFields = addTeamSchema.safeParse(data);

    if (!validatedFields.success) {
      const zodError = validatedFields.error as ZodError;
      setErrors(zodError.flatten().fieldErrors);
      setPending(false);
      return;
    }

    try {
      addTeam(validatedFields.data);
      toast({ title: t.success, description: t.teamAddedSuccess });
      formRef.current?.reset();
    } catch (e) {
      toast({ title: t.error, description: t.teamAddedError, variant: 'destructive' });
    } finally {
      setPending(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.addNewTeam}</CardTitle>
        <CardDescription>{t.addNewTeamDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t.teamName}</Label>
            <Input id="name" name="name" placeholder={t.teamNamePlaceholder} required />
            {errors?.name && <p className="text-sm text-destructive">{errors.name[0]}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="captain">{t.captain}</Label>
            <Input id="captain" name="captain" placeholder={t.captainPlaceholder} required />
            {errors?.captain && <p className="text-sm text-destructive">{errors.captain[0]}</p>}
          </div>
          <SubmitButton pending={pending}>{t.addTeam}</SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
}
