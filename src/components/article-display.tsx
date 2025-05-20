
"use client";

import type { Article } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Share2, Bookmark, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ArticleDisplayProps {
  selectedArticle: Article | null;
  onCloseArticle: () => void;
}

export default function ArticleDisplay({ selectedArticle, onCloseArticle }: ArticleDisplayProps) {
  if (!selectedArticle) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-10rem)] text-center">
        <Image src="https://placehold.co/300x200.png" alt="Placeholder news" width={300} height={200} className="mb-8 rounded-2xl opacity-70" />
        <h2 className="text-2xl font-semibold font-quicksand text-muted-foreground">Welcome to BCC</h2>
        <p className="mt-2 text-lg text-muted-foreground">
          Select an article from the sidebar to start reading.
        </p>
      </div>
    );
  }

  return (
    <Card className="relative w-full max-w-4xl mx-auto shadow-xl rounded-2xl overflow-hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={onCloseArticle}
        className="absolute top-3 right-3 z-10 rounded-full bg-card/70 hover:bg-card text-card-foreground"
        aria-label="Close article"
      >
        <X className="h-5 w-5" />
      </Button>
      {selectedArticle.imageUrl && (
        <div className="relative w-full h-64 md:h-96">
          <Image
            src={selectedArticle.imageUrl}
            alt={selectedArticle.title}
            layout="fill"
            objectFit="cover"
          />
        </div>
      )}
      <CardHeader className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary" className="rounded-full">{selectedArticle.category}</Badge>
          <span className="text-sm text-muted-foreground">
            {new Date(selectedArticle.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>
        <CardTitle className="text-3xl md:text-4xl font-bold leading-tight font-quicksand">
          {selectedArticle.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 prose max-w-none dark:prose-invert prose-p:text-base md:prose-p:text-lg prose-headings:font-quicksand">
        <p className="text-lg md:text-xl leading-relaxed text-foreground/90">{selectedArticle.summary}</p>
        <hr className="my-6" />
        <div dangerouslySetInnerHTML={{ __html: selectedArticle.content || "" }} />
      </CardContent>
      <CardFooter className="flex justify-between p-6 border-t">
         <div className="flex gap-2">
          <Button variant="outline" size="sm" className="rounded-full">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            <Bookmark className="w-4 h-4 mr-2" />
            Save
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">Content provided by Brisbane City Council.</p>
      </CardFooter>
    </Card>
  );
}
