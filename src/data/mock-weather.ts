
import type { WeatherData } from '@/types';

export const mockBrisbaneWeather: WeatherData = {
  location: 'Brisbane',
  temperature: 25,
  apparentTemperature: 26,
  chanceOfRain: 10, // 10%
  humidity: 65, // 65%
  uvIndex: "8 (High)", 
  windSpeed: 15, // km/h
  windDirection: 'NE',
  iconName: 'CloudSun', 
  description: 'Partly cloudy with a slight chance of showers.',
  lastUpdated: new Date().toISOString(),
  source: 'Bureau of Meteorology',
  sourceUrl: 'http://www.bom.gov.au/qld/forecasts/brisbane.shtml',
  attribution: "Mock Data from InfoCurrent Weather Service",
  precis: "Sunny day with some clouds. UV index is high, so wear sunscreen!",
  uvAlert: "Sun protection recommended from 9:00 am to 5:00 pm."
};
