
export interface Article {
  id: string;
  title: string;
  summary: string;
  imageUrl?: string;
  category: string;
  date: string; // ISO date string
  content?: string; // Full content for lazy loading
}

export interface Event {
  id: string;
  title: string;
  date: string; // ISO date string
  time?: string;
  location: string;
  summary: string;
  imageUrl?: string;
}

export interface Initiative {
  id: string;
  slug: string;
  title: string;
  summary: string;
  imageUrl?: string;
  goals: string[];
  status: 'Ongoing' | 'Planned' | 'Completed';
  content?: string;
}

export interface Contact {
  id: string;
  name: string;
  role: string;
  department: string;
  phone?: string;
  email?: string;
  imageUrl?: string;
  ward?: string;
}

export interface WeatherData {
  location: string;
  temperature: number; // Celsius
  apparentTemperature?: number; // "Feels like"
  chanceOfRain: number; // Percentage
  humidity: number; // Percentage
  uvIndex: number | string; // Can be a number or a category like "Extreme"
  windSpeed?: number; // km/h
  windDirection?: string;
  iconName?: keyof typeof import('lucide-react'); // Icon descriptor for Lucide icons
  description?: string; // Short text forecast like "Partly cloudy"
  lastUpdated: string; // ISO date string
  source: string; // e.g., "Bureau of Meteorology"
  sourceUrl?: string;
  attribution?: string; // e.g. "Data from BOM"
  precis?: string; // Short summary description
  uvAlert?: string; // e.g. "Sun protection recommended from 9:10 am to 5:20 pm"
}
