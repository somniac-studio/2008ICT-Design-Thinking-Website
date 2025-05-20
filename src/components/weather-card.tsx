
"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Thermometer, Umbrella, Droplets, Sun, Wind, Compass, Info, RefreshCw, ExternalLink } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Skeleton } from './ui/skeleton';
import Link from 'next/link';
import type { WeatherData } from '@/types';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface WeatherCardProps {
  initialData?: WeatherData;
  location?: string; // If provided, card will fetch its own data
  className?: string;
  showFullDetailsLink?: boolean;
}

export default function WeatherCard({ initialData, location, className, showFullDetailsLink = false }: WeatherCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(initialData || null);
  const [isLoading, setIsLoading] = useState<boolean>(!initialData && !!location);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (loc: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/weather?location=${encodeURIComponent(loc)}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch weather: ${response.statusText}`);
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error("Error fetching weather:", err);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (location && !initialData) {
      fetchWeather(location);
    }
  }, [location, initialData]);

  useEffect(() => {
    // Simple delay for the single card to fade in after mount
    const timer = setTimeout(() => setIsVisible(true), 100); 
    return () => clearTimeout(timer);}, []);

  const handleRefresh = () => {
    if (weatherData?.location || location) {
      fetchWeather(weatherData?.location || location!);
    }
  };

  const DynamicIcon = weatherData?.iconName && LucideIcons[weatherData.iconName] ? LucideIcons[weatherData.iconName] : Sun;

  if (isLoading) {
    return (
      <Card className={cn("shadow-lg rounded-2xl", className)}>
        <CardHeader>
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4" />
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground">
          <Skeleton className="h-4 w-1/3" />
        </CardFooter>
      </Card>
    );
  }

  if (error && !weatherData) {
    return (
      <Card className={cn("shadow-lg rounded-2xl", className)}>
        <CardHeader>
          <CardTitle className="text-destructive">Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive-foreground">Could not load weather data: {error}</p>
          {location && <Button onClick={() => fetchWeather(location)} variant="outline" size="sm" className="mt-4">Try Again</Button>}
        </CardContent>
      </Card>
    );
  }
  
  if (!weatherData) {
     return (
      <Card className={cn("shadow-lg rounded-2xl", className)}>
        <CardHeader>
          <CardTitle>No Weather Data</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Weather data is currently unavailable.</p>
           {location && <Button onClick={() => fetchWeather(location)} variant="outline" size="sm" className="mt-4">Fetch Data</Button>}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("shadow-lg rounded-2xl overflow-hidden", className, isVisible ? 'fade-in-card' : '')} style={{ opacity: isVisible ? 1 : 0 }}>
      <CardHeader className="bg-primary/10 p-4">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl font-bold font-quicksand text-primary">{weatherData.location} Weather</CardTitle>
            <p className="text-xs text-muted-foreground">
              Last updated: {new Date(weatherData.lastUpdated).toLocaleTimeString()}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={handleRefresh} className="text-primary hover:text-primary/80 rounded-full">
            <RefreshCw size={18} />
            <span className="sr-only">Refresh weather</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center justify-center text-center">
          <DynamicIcon size={64} className="text-accent mr-4 flex-shrink-0" />
          <div>
            <p className="text-5xl font-bold">{weatherData.temperature}°C</p>
            {weatherData.apparentTemperature && <p className="text-sm text-muted-foreground">Feels like {weatherData.apparentTemperature}°C</p>}
            {weatherData.description && <p className="text-sm mt-1">{weatherData.description}</p>}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
          {/* Weather Details Section */}
          <div className="w-full md:w-1/2 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center p-2 bg-muted/50 rounded-lg">
                <Umbrella size={20} className="mr-2 text-primary flex-shrink-0" />
                <div>
                  <span className="font-medium">Rain Chance:</span> {weatherData.chanceOfRain}%
                </div>
              </div>
              <div className="flex items-center p-2 bg-muted/50 rounded-lg">
                <Droplets size={20} className="mr-2 text-primary flex-shrink-0" />
                <div>
                  <span className="font-medium">Humidity:</span> {weatherData.humidity}%
                </div>
              </div>
              <div className="flex items-center p-2 bg-muted/50 rounded-lg col-span-1 sm:col-span-2">
                <Sun size={20} className="mr-2 text-primary flex-shrink-0" />
                <div>
                  <span className="font-medium">UV Index:</span> {weatherData.uvIndex}
                  {weatherData.uvAlert && <span className="text-xs block text-muted-foreground">{weatherData.uvAlert}</span>}
                </div>
              </div>
              {weatherData.windSpeed && (
                <div className="flex items-center p-2 bg-muted/50 rounded-lg">
                  <Wind size={20} className="mr-2 text-primary flex-shrink-0" />
                  <div>
                    <span className="font-medium">Wind:</span> {weatherData.windSpeed} km/h
                    {weatherData.windDirection && <span className="ml-1">({weatherData.windDirection})</span>}
                  </div>
                </div>
              )}
              {!weatherData.windSpeed && weatherData.windDirection && (
                 <div className="flex items-center p-2 bg-muted/50 rounded-lg">
                  <Compass size={20} className="mr-2 text-primary flex-shrink-0" />
                  <div>
                    <span className="font-medium">Direction:</span> {weatherData.windDirection}
                  </div>
                </div>
              )}
            </div>
            {weatherData.precis && <p className="text-sm text-center md:text-left mt-3 pt-3 border-t">{weatherData.precis}</p>}
          </div>

          {/* Weather Map Section */}
          <div className="w-full md:w-1/2">
            <div className="w-full aspect-[4/3] relative">
              <Image
                src="https://placehold.co/400x300.png" 
                alt={`Weather map of ${weatherData.location}`}
                layout="fill"
                objectFit="cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                className="rounded-lg shadow-md"
                data-ai-hint="weather map"
              />
            </div>
          </div>
        </div>

        {showFullDetailsLink && (
          <div className="mt-4 text-center">
            <Button asChild variant="link" size="sm" className="text-primary">
              <Link href="/weather">
                View Full Weather Details <ExternalLink size={14} className="ml-1" />
              </Link>
            </Button>
          </div>
        )}

      </CardContent>
      <CardFooter className="p-3 bg-primary/10 text-xs text-muted-foreground justify-between items-center">
        <div className="flex items-center">
          <Info size={14} className="mr-1" /> 
          {weatherData.attribution || `Data from ${weatherData.source}`}
        </div>
        {weatherData.sourceUrl && (
          <Button variant="link" size="xs" asChild className="p-0 h-auto text-muted-foreground hover:text-primary">
            <a href={weatherData.sourceUrl} target="_blank" rel="noopener noreferrer">
              Visit BOM <ExternalLink size={12} className="ml-1" />
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
    
