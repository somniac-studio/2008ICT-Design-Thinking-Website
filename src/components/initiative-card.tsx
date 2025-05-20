
"use client";

import Image from 'next/image';
import Link from 'next/link';
import type { Initiative } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Target } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface InitiativeCardProps {
  initiative: Initiative;
  index: number;
}

export default function InitiativeCard({ initiative, index }: InitiativeCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50 * index);
    return () => clearTimeout(timer);
  }, [index]);
  return (
    <Card className={cn("overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl h-full flex flex-col", isVisible ? 'fade-in-card' : 'opacity-0')} style={{ opacity: isVisible ? 1 : 0 }}>
      {initiative.imageUrl && (
        <div className="relative w-full h-48">
          <Image
            src={initiative.imageUrl}
            alt={initiative.title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      <CardHeader className="p-4">
        <div className="flex justify-between items-start mb-1">
          <CardTitle className="text-xl font-semibold leading-tight font-quicksand">{initiative.title}</CardTitle>
          <Badge variant={initiative.status === 'Completed' ? 'default' : initiative.status === 'Ongoing' ? 'secondary' : 'outline'} className="rounded-full whitespace-nowrap">
            {initiative.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow flex flex-col">
        <CardDescription className="text-sm text-foreground/80 line-clamp-3 mb-3 flex-grow">
          {initiative.summary}
        </CardDescription>
        <div className="mt-auto">
          <Link href={`/initiatives/${initiative.slug}`} passHref legacyBehavior>
            <Button variant="outline" size="sm" className="w-full rounded-lg">
              <Target size={16} className="mr-2" />
              Learn More & Goals
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
