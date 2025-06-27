function FutbolIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2a10 10 0 1 1-5.24 18.29" />
      <path d="m3.44 14.22 4.34-1.24" />
      <path d="m10.63 3.52 2.34 4.04" />
      <path d="m16.5 18.51 3.8-2.22" />
      <path d="M11.23 11.23 9.04 8.5" />
      <path d="M16.5 5.51 14 8.24" />
      <path d="m6.56 18.22 2.5-4.32" />
      <path d="M3.44 9.78 7.5 10.5" />
      <path d="m17.5 12.55 2.5-4.33" />
      <path d="M10.63 20.48 12 16.24" />
      <path d="M9.5 14s-1.5 0-2-1" />
      <path d="M14.5 14s1.5 0 2-1" />
      <path d="M8 10s-1-1.5-1-2" />
      <path d="M17 10s1-1.5 1-2" />
    </svg>
  );
}

export function Logo() {
  return (
    <div className="flex items-center gap-2 text-primary">
      <FutbolIcon className="h-8 w-8" />
      <h1 className="text-xl font-bold text-foreground">
        FC25 Pro Clubs Ledger
      </h1>
    </div>
  );
}
