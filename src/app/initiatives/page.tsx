
"use client";

import AppLayout from '@/components/layout/app-layout';
import InitiativeCard from '@/components/initiative-card';
import { mockInitiatives } from '@/data/mock-initiatives';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useState } from 'react';
import type { Initiative } from '@/types';

function InitiativesPageContent() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredInitiatives = mockInitiatives.filter(initiative => 
    initiative.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    initiative.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-4xl font-bold font-quicksand text-primary">Our Initiatives</h1>
        <div className="relative w-full md:w-auto">
          <Search className="absolute w-4 h-4 left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search initiatives..." 
            className="w-full md:w-72 pl-10 rounded-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {filteredInitiatives.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredInitiatives.map((initiative, index) => (
            <InitiativeCard key={initiative.id} initiative={initiative} index={index} />
          ))}
        </div>
      ) : (
         <p className="text-center text-muted-foreground py-10 text-lg">
          No initiatives found matching your search criteria.
        </p>
      )}
    </div>
  );
}

export default function InitiativesPage() {
  return (
    <AppLayout>
      <InitiativesPageContent />
    </AppLayout>
  );
}
