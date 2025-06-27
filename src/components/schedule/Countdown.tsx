'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import type { Schedule, Team } from '@/lib/types';

interface CountdownProps {
  schedule: Schedule;
  teams: Team[];
}

const calculateTimeLeft = (targetDate: string) => {
  const difference = +new Date(targetDate) - +new Date();
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

export function Countdown({ schedule, teams }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(schedule.date));
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(schedule.date));
    }, 1000);

    return () => clearTimeout(timer);
  });

  const team1 = teams.find(t => t.id === schedule.team1Id);
  const team2 = teams.find(t => t.id === schedule.team2Id);

  if (!isClient || !team1 || !team2) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Match</CardTitle>
          <CardDescription>Loading match details...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-16 w-full animate-pulse rounded-md bg-muted"></div>
        </CardContent>
      </Card>
    );
  }

  const timerComponents = Object.entries(timeLeft).map(([interval, value]) => (
    <div key={interval} className="flex flex-col items-center">
      <span className="text-4xl font-bold text-primary">{String(value).padStart(2, '0')}</span>
      <span className="text-xs uppercase text-muted-foreground">{interval}</span>
    </div>
  ));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Next Match</CardTitle>
        <CardDescription className="text-center">
          {team1.name} vs {team2.name}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-around">
          {timerComponents.length > 0 ? timerComponents : <p className="text-xl">Match has started!</p>}
        </div>
      </CardContent>
    </Card>
  );
}
