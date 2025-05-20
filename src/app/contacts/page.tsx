
"use client";

import AppLayout from '@/components/layout/app-layout';
import ContactCard from '@/components/contact-card';
import { mockContacts } from '@/data/mock-contacts';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useState } from 'react';
import type { Contact } from '@/types';

function ContactsPageContent() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = mockContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-4xl font-bold font-quicksand text-primary">Council Contacts</h1>
        <div className="relative w-full md:w-auto">
          <Search className="absolute w-4 h-4 left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search contacts..." 
            className="w-full md:w-72 pl-10 rounded-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {filteredContacts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredContacts.map((contact, index) => (
            <ContactCard key={contact.id} contact={contact} index={index} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-10 text-lg">
          No contacts found matching your search criteria.
        </p>
      )}
    </div>
  );
}

export default function ContactsPage() {
  return (
    <AppLayout>
      <ContactsPageContent />
    </AppLayout>
  );
}
