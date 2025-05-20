"use client";
//This is where we import all of our assets into one place to form the page, each apptly named to describe it's purpose.
import React, { useContext, useState, useEffect } from 'react';
import AppLayout, { ArticleSelectionContext } from '@/components/layout/app-layout';
import HeroArticleCard from '@/components/hero-article-card';
import ArticleCard from '@/components/article-card';
import WeatherCard from '@/components/weather-card'; // Import WeatherCard
import { Button } from '@/components/ui/button';
import { mockArticles } from '@/data/mock-articles'; //uses explicit mock data, can be easily switched to real data, if the client was happy with the pitch very little work is needed to ship to production.
import type { Article, WeatherData } from '@/types'; //placeholder until we can get realtime weather data.

// We can't call server actions directly like this from a "use client" component's top level.
// To fetch data on the client, we'd typically use useEffect and fetch, or a client-side data fetching library.
// For this prototype, as WeatherCard will manage its own client-side fetch via API route, 
// we'll pass the location to it.
// import { getCurrentWeather } from '@/services/weather-service'; // Cannot be used directly in client component like this for initial load

function HomePageContent() {
  const articleSelection = useContext(ArticleSelectionContext);
  // const [weatherData, setWeatherData] = useState<WeatherData | null>(null); // WeatherCard will handle its own data

  const heroArticle = mockArticles.find(a => a.id === '1');
  const otherArticles = mockArticles.filter(a => a.id !== '1').slice(0, 3);
  const categories = Array.from(new Set(mockArticles.map(a => a.category)));

  const handleArticleSelect = (article: Article) => {
    if (articleSelection?.onSelectArticle) {
      articleSelection.onSelectArticle(article);
    }
  };

  // WeatherCard will fetch its own data if a location prop is provided.
  // No need for explicit fetch here if WeatherCard handles it.

  return (
    //Our 'Hero' Article, the most recent and prevelent option, will sit front and center on the homepage. Flexible enough that we can lock it, so it is always the same.
    <div className="space-y-12">
      {heroArticle && <HeroArticleCard article={heroArticle} onSelectArticle={handleArticleSelect} />}
      
      <div>
        <h2 className="text-3xl font-bold mb-6 font-quicksand text-primary border-b pb-2">Articles</h2> {/*heading for articles section*/}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> {/*articles are loaded into a 3 column grid, will only load the latest 3 articles.*/}
          {otherArticles.map((article, index) => (
            <ArticleCard 
              key={article.id} 
              article={article} 
              onSelectArticle={handleArticleSelect}
              index={index}
              isSelected={false}
            />
          ))}
        </div>
      </div>

      <div>
        {/* This section creates a bubbled text selector for category tags, categories are defined in the types/index.ts file as with all other variables for our card system. */}
        <h2 className="text-3xl font-bold mb-6 font-quicksand text-primary border-b pb-2">Categories</h2>
        <div className="flex flex-wrap gap-3">
          {categories.map(category => (
            // Ensure category is a string before using it in the key
            typeof category === 'string' && (
              <Button 
                key={category} 
                variant="outline" 
                size="lg" className="rounded-xl text-base">
                {category}
              </Button>
            )
          ))}
        </div>
      </div>

      <div className="mt-12"> 
        {/*This section is proof of concept placeholder, it has all the makings of a working weather system but needs to call an API to get weather data and put it into a readable file. Everything is in place in services/weather-service*/}
        <h2 className="text-3xl font-bold mb-6 font-quicksand text-primary border-b pb-2">Local Weather</h2>
        {/* Pass location to WeatherCard; it will fetch data via API route. */}
        <WeatherCard location="Brisbane" showFullDetailsLink={true} />
      </div>
    </div>
  );
}
// for those not in the know, this is how the page is output, as a javascript function, this allows us to be flexible and when a user comes to the page, it's bespoke to them, from settings, to time, to location.
export default function Page() {
  return (
    <AppLayout>
      <HomePageContent />
    </AppLayout>
  );
}
