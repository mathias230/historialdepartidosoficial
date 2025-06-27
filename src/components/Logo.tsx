import { Futbol } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2 text-primary">
      <Futbol className="h-8 w-8" />
      <h1 className="text-xl font-bold text-foreground">
        FC25 Pro Clubs Ledger
      </h1>
    </div>
  );
}
