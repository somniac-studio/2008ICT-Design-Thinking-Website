
"use server"; 

import { mockBrisbaneWeather } from '@/data/mock-weather';
import type { WeatherData } from '@/types';

/**
 * Fetches the current weather data for a given location.
 * 
 * @param location - The location to get weather for (default: 'Brisbane').
 * @returns A Promise that resolves to WeatherData.
 */
export async function getCurrentWeather(location: string = 'Brisbane'): Promise<WeatherData> {
  // In a real app, this would fetch from the BOM API.
  // For now, we return mock data. We'll update the lastUpdated timestamp.
  if (location.toLowerCase() === 'brisbane') {
    return { 
      ...mockBrisbaneWeather, 
      lastUpdated: new Date().toISOString() 
    };
  }
  // Fallback for other locations if not mocked, or throw an error.
  // For this prototype, we'll return Brisbane data for any query.
  console.warn(`Mock weather service returning Brisbane data for requested location: ${location}`);
  return { 
    ...mockBrisbaneWeather, 
    location: location, // Update location to what was requested
    lastUpdated: new Date().toISOString() 
  };
}
