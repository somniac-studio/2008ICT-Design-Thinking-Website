
import type { Event } from '@/types';

export const mockEvents: Event[] = [
  {
    //
    id: 'event-1',
    title: 'Community Town Hall: Future of Parks',
    date: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString(), // Upcoming
    time: '6:00 PM - 8:00 PM',
    location: 'Brisbane City Hall',
    summary: 'Join us for a discussion on upcoming park developments and community feedback.',
    imageUrl: 'https://placehold.co/600x400.png',
  },
  {
    //
    id: 'event-2',
    title: 'Tech Brisbane: Innovation Showcase',
    date: new Date(new Date().setDate(new Date().getDate() + 14)).toISOString(), // Upcoming
    time: '9:00 AM - 5:00 PM',
    location: 'Convention & Exhibition Centre',
    summary: 'Discover the latest tech innovations from local Brisbane startups and businesses.',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'technology conference',
  },
  {
    //
    id: 'event-3',
    title: 'River Clean-up Day',
    date: new Date(new Date().setDate(new Date().getDate() + 21)).toISOString(), // Upcoming
    time: '10:00 AM - 1:00 PM',
    location: 'Kangaroo Point Cliffs Park',
    summary: 'Volunteer to help keep our river clean. Equipment provided.',
    imageUrl: 'https://placehold.co/600x400.png',
  },
  {
    //an event that will always be a week ago
    id: 'event-past-1',
    title: 'Historical Society Talk: Old Brisbane',
    date: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString(), 
    time: '7:00 PM - 8:30 PM',
    location: 'Museum of Brisbane',
    summary: 'A fascinating look into the early days of Brisbane, with guest historian Dr. Jane Doe.',
    imageUrl: 'https://placehold.co/600x400.png',
  },
  {
    //an event that will always be 30 days in the past
    id: 'event-past-2',
    title: 'Annual Charity Gala 2023',
    date: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString(), 
    time: '6:30 PM onwards',
    location: 'The Grand Ballroom',
    summary: 'A night of elegance and fundraising for local community projects. Last year\'s highlight!',
    imageUrl: 'https://placehold.co/600x400.png',
  },
  {
    // An event for today, to test current day logic!
    id: 'event-today-1', 
    title: 'Lunchtime Yoga in the Park',
    date: new Date().toISOString(),
    time: '12:30 PM - 1:30 PM',
    location: 'City Botanic Gardens',
    summary: 'Relax and rejuvenate with a free yoga session. All levels welcome.',
    imageUrl: 'https://placehold.co/600x400.png',
  }
];
