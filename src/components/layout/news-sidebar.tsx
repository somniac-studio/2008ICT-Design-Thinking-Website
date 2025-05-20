
"use client";

import React from 'react';
import Link from 'next/link';
import { mockArticles } from '@/data/mock-articles';
import type { Article } from '@/types';
import ArticleCard from '@/components/article-card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  SidebarHeader, 
  SidebarContent, 
  SidebarFooter, 
  SidebarMenuButton, // Still used for collapsed article list
  SidebarTrigger 
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Rss, NewspaperIcon } from 'lucide-react';


interface AppSidebarProps {
  onSelectArticle: (article: Article) => void;
  selectedArticleId?: string | null;
}

export default function AppSidebar({ onSelectArticle, selectedArticleId }: AppSidebarProps) {

  return (
    <div className="flex flex-col h-full bg-sidebar text-sidebar-foreground">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 overflow-hidden">
            <NewspaperIcon className="w-7 h-7 text-sidebar-primary flex-shrink-0" />
            <h1 className="text-2xl font-bold font-quicksand text-sidebar-primary group-data-[collapsible=icon]:hidden whitespace-nowrap">BCC</h1>
          </Link>
          <SidebarTrigger className="hidden md:flex ml-2" />
        </div>
      </SidebarHeader>
      
      <SidebarContent className="p-0 flex-grow">
        <ScrollArea className="h-full">
          <div className="p-4">
            <h2 className="text-lg font-semibold font-quicksand text-sidebar-primary mb-3 px-2 group-data-[collapsible=icon]:hidden">
              Latest News
            </h2>
            <div className="group-data-[collapsible=icon]:hidden">
              {mockArticles.map((article, index) => (
                <ArticleCard 
                  key={article.id} 
                  article={article} 
                  index={index}
                  onSelectArticle={onSelectArticle}
                  isSelected={selectedArticleId === article.id}
                />
              ))}
            </div>
            {/* Show mini article indicators or icon buttons when collapsed */}
            <div className="hidden group-data-[collapsible=icon]:flex flex-col items-center gap-2">
              {mockArticles.slice(0,5).map((article) => ( 
                 <SidebarMenuButton
                    key={article.id}
                    onClick={() => onSelectArticle(article)}
                    isActive={selectedArticleId === article.id}
                    className="w-full justify-center !h-10" 
                    variant="ghost"
                    size="default" 
                    tooltip={article.title}
                  >
                    <NewspaperIcon className="w-5 h-5" /> 
                    <span className="sr-only">{article.title}</span>
                  </SidebarMenuButton>
              ))}
            </div>
          </div>
        </ScrollArea>
      </SidebarContent>
      
      <Separator className="bg-sidebar-border"/>
      <SidebarFooter className="p-4 border-t border-sidebar-border group-data-[collapsible=icon]:hidden">
        <Button variant="outline" className="w-full rounded-xl bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/90 border-sidebar-border">
          <Rss className="w-4 h-4 mr-2" />
          Subscribe
        </Button>
        <p className="mt-3 text-xs text-center text-muted-foreground">
          © {new Date().getFullYear()} BCC
        </p>
      </SidebarFooter>
      {/* Footer for collapsed state */}
      <SidebarFooter className="p-2 py-3 border-t border-sidebar-border hidden group-data-[collapsible=icon]:flex flex-col items-center justify-center">
          <Button variant="outline" size="icon" className="rounded-full bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/90 border-sidebar-border !h-10 !w-10" tooltip="Subscribe">
            <Rss className="w-5 h-5" />
            <span className="sr-only">Subscribe</span> {/* for RSS Readers and that sort of thing that almost no-one uses but is nice to have */}
          </Button>
      </SidebarFooter>
    </div>
  );
}

