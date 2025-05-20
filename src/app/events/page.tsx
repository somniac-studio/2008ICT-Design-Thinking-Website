
"use client";

import React, { useState, useMemo, useEffect } from 'react';
import AppLayout from '@/components/layout/app-layout';
import EventCard from '@/components/event-card';
import { mockEvents } from '@/data/mock-events';
import { Input } from '@/components/ui/input';
import { Search, CalendarDays as CalendarIconLucide } from 'lucide-react'; // Renamed to avoid conflict
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from '@/components/ui/separator';

function EventsPageContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const upcomingEvents = useMemo(() => 
    mockEvents.filter(event => new Date(event.date) >= today), 
  [today]);
  
  const pastEvents = useMemo(() => 
    mockEvents.filter(event => new Date(event.date) < today), 
  [today]);

  const upcomingEventDays = useMemo(() => {
    return upcomingEvents.map(event => {
      const eventDate = new Date(event.date);
      return new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
    });
  }, [upcomingEvents]);

  const pastEventDays = useMemo(() => {
    return pastEvents.map(event => {
      const eventDate = new Date(event.date);
      return new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
    });
  }, [pastEvents]);

  const modifiers = {
    eventDay: upcomingEventDays,
    pastEventDay: pastEventDays,
  };

  const modifiersClassNames = {
    eventDay: 'font-bold text-accent [&>button]:font-bold',
    pastEventDay: '[&>button]:text-[#d0a82e] [&>button]:font-bold',
  };
  
  const filterEventsBySearchAndDate = (events: typeof mockEvents) => {
    return events.filter(event => {
      const searchTermLower = searchTerm.toLowerCase();
      const searchMatch =
        event.title.toLowerCase().includes(searchTermLower) ||
        event.summary.toLowerCase().includes(searchTermLower) ||
        event.location.toLowerCase().includes(searchTermLower);

      if (selectedDate) {
        const eventDate = new Date(event.date);
        const isSelectedDateMatch =
          eventDate.getFullYear() === selectedDate.getFullYear() &&
          eventDate.getMonth() === selectedDate.getMonth() &&
          eventDate.getDate() === selectedDate.getDate();
        return searchMatch && isSelectedDateMatch;
      }
      return searchMatch;
    });
  };

  const eventsOnSelectedDate = useMemo(() => {
    if (!selectedDate) return [];
    return filterEventsBySearchAndDate(mockEvents);
  }, [selectedDate, searchTerm, mockEvents]);

  const displayUpcomingEvents = useMemo(() => {
    if (selectedDate) return []; // Handled by eventsOnSelectedDate
    return filterEventsBySearchAndDate(upcomingEvents);
  }, [selectedDate, searchTerm, upcomingEvents]);

  const displayPastEvents = useMemo(() => {
    if (selectedDate) return []; // Handled by eventsOnSelectedDate
    return filterEventsBySearchAndDate(pastEvents);
  }, [selectedDate, searchTerm, pastEvents]);


  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Calendar and Search Section (Left Column) */}
        <div className="w-full lg:w-auto lg:max-w-sm xl:max-w-md space-y-4 sticky top-20 self-start">
          <Card className="shadow-lg rounded-2xl">
            <CardContent className="p-0">
              {isMounted ? (
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  modifiers={modifiers}
                  modifiersClassNames={modifiersClassNames}
                  className="p-3 w-full"
                  classNames={{
                    day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                    day_today: "text-accent-foreground bg-accent/80",
                  }}
                />
              ) : (
                <div className="p-3">
                  <Skeleton className="w-full h-[320px] rounded-md" />
                </div>
              )}
            </CardContent>
          </Card>
          {selectedDate && isMounted && (
            <Button variant="outline" onClick={() => setSelectedDate(undefined)} className="w-full rounded-lg">
              Show All Events
            </Button>
          )}
          <div className="relative w-full">
            <Search className="absolute w-4 h-4 left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search events..." 
              className="w-full pl-10 rounded-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Events List Section (Right Column) */}
        <div className="w-full lg:flex-1 space-y-8">
          {selectedDate ? (
            <>
              <h1 className="text-3xl md:text-4xl font-bold font-quicksand text-primary flex items-center">
                <CalendarIconLucide className="mr-3 h-8 w-8" />
                Events on {selectedDate.toLocaleDateString()}
              </h1>
              {eventsOnSelectedDate.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {eventsOnSelectedDate.map((event) => (
                    <EventCard key={event.id} event={event} index={eventsOnSelectedDate.indexOf(event)} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-10 text-lg">
                  No events found for this date {searchTerm && "matching your search criteria"}.
                </p>
              )}
            </>
          ) : (
            <>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold font-quicksand text-primary mb-6">Upcoming Events</h1>
                {displayUpcomingEvents.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {displayUpcomingEvents.map((event) => (
                    <EventCard key={event.id} event={event} index={displayUpcomingEvents.indexOf(event)} />
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-10 text-lg">
                    {searchTerm ? "No upcoming events found matching your search." : "No upcoming events."}
                  </p>
                )}
              </div>

              <Separator className="my-10" />

              <div>
                <h1 className="text-3xl md:text-4xl font-bold font-quicksand text-primary mb-6">Past Events</h1>
                {displayPastEvents.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {displayPastEvents.map((event) => (
                    <EventCard key={event.id} event={event} index={displayPastEvents.indexOf(event)} />
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-10 text-lg">
                     {searchTerm ? "No past events found matching your search." : "No past events to show."}
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function EventsPage() {
  return (
    <AppLayout>
      <EventsPageContent />
    </AppLayout>
  );
}
