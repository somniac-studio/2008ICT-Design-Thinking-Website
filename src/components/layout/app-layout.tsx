
"use client";

import React, { useState, createContext } from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
} from "@/components/ui/sidebar";
import Header from "./header";
import AppSidebar from "./news-sidebar"; // Corrected import path
import ArticleDisplay from '@/components/article-display';
import type { Article } from '@/types';

interface AppLayoutProps {
  children: React.ReactNode;
}

// Context to provide onSelectArticle to children like HomePageContent
export const ArticleSelectionContext = createContext<{
  onSelectArticle: (article: Article) => void;
} | undefined>(undefined);

export default function AppLayout({ children }: AppLayoutProps) {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const handleSelectArticle = (article: Article) => {
    setSelectedArticle(article);
  };
  
  const handleDeselectArticle = () => {
    setSelectedArticle(null);
  }

  return (
    <ArticleSelectionContext.Provider value={{ onSelectArticle: handleSelectArticle }}>
      <SidebarProvider defaultOpen={true} className="flex-col bg-background">
        <Header onLogoClick={handleDeselectArticle} /> 
        
        <div className="flex flex-1"> 
          <Sidebar collapsible="icon" className="border-r border-sidebar-border">
            <AppSidebar 
              onSelectArticle={handleSelectArticle} 
              selectedArticleId={selectedArticle?.id} 
            />
          </Sidebar>
          
          <SidebarInset>
            <main className="flex-1 p-4 pt-20 overflow-y-auto md:p-6 md:pt-20"> 
              {selectedArticle ? (
                <ArticleDisplay selectedArticle={selectedArticle} onCloseArticle={handleDeselectArticle} />
              ) : (
                children 
              )}
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </ArticleSelectionContext.Provider>
  );
}
