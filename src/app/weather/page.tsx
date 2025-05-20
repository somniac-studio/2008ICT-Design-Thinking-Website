
// This page can be a Server Component as it fetches data once on load.
import AppLayout from '@/components/layout/app-layout';
import WeatherCard from '@/components/weather-card';
import { getCurrentWeather } from '@/services/weather-service'; // Server action
import type { WeatherData } from '@/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

async function WeatherPageContent() {
  let weatherData: WeatherData | null = null;
  let error: string | null = null;

  try {
    weatherData = await getCurrentWeather('Brisbane');
  } catch (e) {
    console.error("Failed to fetch weather data for page:", e);
    error = e instanceof Error ? e.message : "An unknown error occurred while fetching weather data.";
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold font-quicksand text-primary">Brisbane Weather Details</h1>
      
      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error Fetching Weather</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {weatherData ? (
        <WeatherCard initialData={weatherData} className="max-w-lg mx-auto" />
      ) : (
        !error && <p>Loading weather data or data is unavailable...</p> 
      )}
      
      <div className="prose dark:prose-invert max-w-none mt-8 p-6 bg-card rounded-xl shadow">
        <h2 className="font-quicksand text-primary">Understanding Weather Data</h2>
        <p>
          The weather information presented is sourced from the Bureau of Meteorology (BOM). 
          Here's a quick guide to the terms:
        </p>
        <ul>
          <li><strong>Temperature:</strong> The current air temperature in Celsius.</li>
          <li><strong>Feels Like:</strong> Apparent temperature, what it feels like due to humidity and wind.</li>
          <li><strong>Chance of Rain:</strong> The likelihood of precipitation occurring.</li>
          <li><strong>Humidity:</strong> The amount of water vapor in the air, as a percentage.</li>
          <li><strong>UV Index:</strong> A measure of ultraviolet radiation. Higher values mean greater risk of harm from unprotected sun exposure.</li>
          <li><strong>Wind:</strong> Speed and direction of the wind.</li>
        </ul>
        <p>
          Always check the official BOM website for the most current and comprehensive weather forecasts and warnings, especially during severe weather events.
        </p>
      </div>
    </div>
  );
}

export default function WeatherPage() {
  return (
    <AppLayout>
      {/* 
        Next.js 13+ allows Server Components to be async directly.
        If WeatherPageContent were client, we'd use Suspense.
        Since it's a server component, we can await directly or pass the promise.
        For simplicity in this step, we're making WeatherPageContent handle its data fetching.
      */}
      <WeatherPageContent />
    </AppLayout>
  );
}
