
"use client";

import Image from 'next/image';
import type { Event } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, Clock, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react'; // Ensured useState and useEffect are imported

interface EventCardProps {
  event: Event;
  onSelectEvent?: (event: Event) => void;
  index: number; // Add index prop
}

export default function EventCard({ event, onSelectEvent, index }: EventCardProps) {
  const handleSelect = () => {

    if (onSelectEvent) {
      onSelectEvent(event);
    }
    // Could navigate to an event detail page if one exists:
    // router.push(`/events/${event.id}`);
  };

  // Initialize with a server-friendly, consistent format for initial render
  // Using UTC for the date part ensures consistency between server and client initial render
  const [displayDate, setDisplayDate] = useState(() =>
    new Date(event.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC', // Key change for initial consistency
    })
  );

  useEffect(() => {
    // Update to client's locale-specific format (and timezone) after hydration
    setDisplayDate(
      new Date(event.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        // No timeZone here, so it uses client's default timezone settings
      })
    );
  }, [event.date]); // Rerun if event.date changes

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const delay = index * 50; // 50ms delay per card
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer); // Clean up the timer
  }, [index]); // Re-run effect if index changes

  return (
    <Card 
      className={`overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl cursor-pointer ${isVisible ? 'fade-in-card' : ''}`}
      style={{ opacity: isVisible ? 1 : 0 }} // Initially set opacity to 0
      onClick={handleSelect}
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelect()}}
      aria-label={`View details for ${event.title}`}
    >
      {event.imageUrl && (
        <div className="relative w-full h-48">
          <Image
            src={event.imageUrl}
            alt={event.title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      <CardHeader className="p-4">
        <CardTitle className="text-xl font-semibold leading-tight font-quicksand">{event.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-2">
        <div className="flex items-center text-sm text-muted-foreground gap-2">
          <CalendarDays size={16} />
          {/* Use the state variable for displayDate */}
          <span>{displayDate}</span> 
        </div>
        {event.time && (
          <div className="flex items-center text-sm text-muted-foreground gap-2">
            <Clock size={16} />
            <span>{event.time}</span>
          </div>
        )}
        <div className="flex items-center text-sm text-muted-foreground gap-2">
          <MapPin size={16} />
          <span>{event.location}</span>
        </div>
        <CardDescription className="mt-2 text-sm text-foreground/80 line-clamp-3">{event.summary}</CardDescription>
        <Button variant="link" size="sm" className="p-0 mt-3 h-auto text-primary" onClick={(e) => {e.stopPropagation(); handleSelect();}}>
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}

