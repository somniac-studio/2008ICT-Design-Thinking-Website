
"use client";

import Image from 'next/image';
import type { Article } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CalendarDays, Tag } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ArticleCardProps {
 article: Article;
 onSelectArticle: (article: Article) => void;
 isSelected?: boolean;
  index: number; // Added index prop
}

export default function ArticleCard({ article, onSelectArticle, isSelected, index }: ArticleCardProps) {
  const [isVisible, setIsVisible] = useState(false); // Added isVisible state

 useEffect(() => {
    const delay = index * 50; // Calculate delay based on index
 const timer = setTimeout(() => {
 setIsVisible(true);
    }, delay);
 return () => clearTimeout(timer); // Clean up timer on unmount
  }, [index]);

  // Initialize with a server-friendly, consistent format for initial render
  const [displayDate, setDisplayDate] = useState(() =>
 new Date(article.date).toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
    })
  );

  useEffect(() => {
    // Update to client's locale-specific format after hydration
    setDisplayDate(new Date(article.date).toLocaleDateString());
  }, [article.date]);

  return (
    <Card
      className={`mb-4 cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl ${isSelected ? 'ring-2 ring-primary' : 'ring-1 ring-border'} ${isVisible ? 'fade-in-card' : ''}`} // Apply fade-in-card class
 style={{ opacity: isVisible ? 1 : 0 }} // Initially set opacity to 0
      onClick={() => onSelectArticle(article)}
      aria-pressed={isSelected}
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelectArticle(article)}}
    >
      <CardHeader className="p-4">
        {article.imageUrl && (
          <div className="relative w-full h-40 mb-3 overflow-hidden rounded-xl">
            <Image
              src={article.imageUrl}
              alt={article.title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}
        <CardTitle className="text-lg font-semibold leading-tight font-quicksand">{article.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="mb-3 text-sm text-muted-foreground line-clamp-3">{article.summary}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Tag size={14} />
 <Link href={`/tags/${article.category}`} passHref>
 <span>{article.category}</span>
 </Link>
          </div>
          <div className="flex items-center gap-1">
            <CalendarDays size={14} />
            <span>{displayDate}</span>
          </div>
        </div>
        <Button variant="link" size="sm" className="p-0 mt-2 h-auto text-primary" onClick={(e) => { e.stopPropagation(); onSelectArticle(article); }}>
          Read More
        </Button>
      </CardContent>
    </Card>
  );
}
