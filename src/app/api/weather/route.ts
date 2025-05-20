
// src/app/api/weather/route.ts
import { NextResponse } from 'next/server';
import { getCurrentWeather } from '@/services/weather-service'; // Ensure this path is correct

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get('location') || 'Brisbane';

  try {
    const weatherData = await getCurrentWeather(location);
    return NextResponse.json(weatherData);
  } catch (error) {
    console.error('API Error fetching weather:', error);
    return NextResponse.json(
      { message: 'Failed to fetch weather data', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
