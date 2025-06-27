'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { addTeamAction } from '@/lib/actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { SubmitButton } from '@/components/SubmitButton';

const initialState = { message: '', success: false };

export function AddTeamForm() {
  const [state, formAction] = useActionState(addTeamAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: 'Success',
          description: state.message,
        });
        formRef.current?.reset();
      } else {
        toast({
          title: 'Error',
          description: state.message,
          variant: 'destructive',
        });
      }
    }
  }, [state, toast]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Team</CardTitle>
        <CardDescription>Enter the details for the new team.</CardDescription>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Team Name</Label>
            <Input id="name" name="name" placeholder="e.g. The All-Stars" required />
            {state.errors?.name && <p className="text-sm text-destructive">{state.errors.name}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="captain">Captain</Label>
            <Input id="captain" name="captain" placeholder="e.g. John Doe" required />
            {state.errors?.captain && <p className="text-sm text-destructive">{state.errors.captain}</p>}
          </div>
          <SubmitButton>Add Team</SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
}
