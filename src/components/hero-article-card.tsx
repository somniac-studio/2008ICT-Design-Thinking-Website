
"use client";

import Image from 'next/image';
import type { Article } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Tag } from 'lucide-react';
import { useState, useEffect } from 'react';
interface HeroArticleCardProps {
  article: Article;
  onSelectArticle?: (article: Article) => void;
}

export default function HeroArticleCard({ article, onSelectArticle }: HeroArticleCardProps) {
  const handleReadMore = () => {
    if (onSelectArticle) {
      onSelectArticle(article);
    }
    // Alternatively, navigate to a dedicated article page:
    // router.push(`/articles/${article.id}`);
  };

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set a small delay for the fade-in animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100); // 100ms delay
    return () => clearTimeout(timer); // Clean up the timer
  }, []);

  return (
    <Card
      style={{ opacity: isVisible ? 1 : 0 }}
      className={`w-full shadow-2xl rounded-3xl overflow-hidden cursor-pointer hover:shadow-primary/20 transition-all duration-300 ${isVisible ? 'fade-in-card' : ''}`}
      onClick={handleReadMore}
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleReadMore()}}
      aria-label={`Read more about ${article.title}`}
    >
      <div className="md:flex">
        {article.imageUrl && (
          <div className="md:w-1/2 relative min-h-[250px] md:min-h-full">
            <Image
              src={article.imageUrl}
              alt={article.title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}
        <div className={`p-6 md:p-8 flex flex-col justify-between ${article.imageUrl ? 'md:w-1/2' : 'w-full'}`}>
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="secondary" className="rounded-full text-sm py-1 px-3">{article.category}</Badge>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <CalendarDays size={14} />
                {new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>
            <CardTitle className="text-3xl lg:text-4xl font-bold leading-tight mb-3 font-quicksand text-primary">
              {article.title}
            </CardTitle>
            <CardDescription className="text-base lg:text-lg text-foreground/80 mb-6 line-clamp-4">
              {article.summary}
            </CardDescription>
          </div>
          <Button 
            size="lg" 
            className="w-full md:w-auto self-start rounded-xl text-base"
            onClick={(e) => { e.stopPropagation(); handleReadMore();}}
          >
            Read Full Story
          </Button>
        </div>
      </div>
    </Card>
  );
}
