
"use client";

import Image from 'next/image';
import type { Contact } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mail, Phone, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

interface ContactCardProps {
  contact: Contact;
  index: number;
}

export default function ContactCard({ contact, index }: ContactCardProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const delay = index * 50; // 50ms delay per card
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <Card className={`shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl ${isVisible ? 'fade-in-card' : ''}`} style={{ opacity: isVisible ? 1 : 0 }}>
      <CardContent className="p-6 flex flex-col items-center text-center sm:flex-row sm:text-left sm:items-start gap-6">
        <Avatar className="w-24 h-24 text-3xl border-2 border-primary/50">
          {contact.imageUrl ? (
            <AvatarImage src={contact.imageUrl} alt={contact.name}/>
          ) : (
            <AvatarFallback>{contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          )}
        </Avatar>
        <div className="flex-1">
          <CardTitle className="text-xl font-semibold font-quicksand mb-1">{contact.name}</CardTitle>
          <p className="text-primary text-sm font-medium">{contact.role}</p>
          <div className="flex items-center justify-center sm:justify-start text-muted-foreground text-xs mt-1 mb-3 gap-1">
            <Building size={14} />
            <span>{contact.department}</span>
          </div>
          
          <div className="space-y-2">
            {contact.email && (
              <a href={`mailto:${contact.email}`} className="flex items-center justify-center sm:justify-start text-sm text-muted-foreground hover:text-primary gap-2 transition-colors">
                <Mail size={16} />
                <span>{contact.email}</span>
              </a>
            )}
            {contact.phone && (
              <a href={`tel:${contact.phone}`} className="flex items-center justify-center sm:justify-start text-sm text-muted-foreground hover:text-primary gap-2 transition-colors">
                <Phone size={16} />
                <span>{contact.phone}</span>
              </a>
            )}
          </div>
          {(!contact.email && !contact.phone) && <p className="text-xs text-muted-foreground italic">No contact details provided.</p>}
        </div>
      </CardContent>
    </Card>
  );
}
