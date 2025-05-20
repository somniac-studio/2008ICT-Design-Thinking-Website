
"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Sun, Moon, Play, Pause, Home, CalendarDays, Lightbulb, Users, CloudSun } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useLocalStorage from '@/hooks/use-local-storage';
import { cn } from '@/lib/utils';
import { SidebarTrigger } from '@/components/ui/sidebar';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/events', label: 'Events', icon: CalendarDays },
  { href: '/initiatives', label: 'Initiatives', icon: Lightbulb },
  { href: '/contacts', label: 'Contacts', icon: Users },
  { href: '/weather', label: 'Weather', icon: CloudSun }, // Added Weather Link
];

interface HeaderProps {
  onLogoClick?: () => void; 
}

export default function Header({ onLogoClick }: HeaderProps) {
  const [isDarkMode, setIsDarkMode] = useLocalStorage('darkMode', false);
  const [animationsEnabled, setAnimationsEnabled] = useLocalStorage('animationsEnabled', true);
  const pathname = usePathname();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (!animationsEnabled) {
      document.documentElement.classList.add('no-transitions');
    } else {
      document.documentElement.classList.remove('no-transitions');
    }
  }, [animationsEnabled]);

  //remember dark mode and animation toggles, so user doesn't have to suffer constantly switching.
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggleAnimations = () => setAnimationsEnabled(!animationsEnabled);

  //When logo is clicked, navigate home
  const handleNavHomeClick = () => {
    if (onLogoClick) {
      onLogoClick();
    }
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between h-16 px-4 py-2 border-b shadow-sm bg-card text-card-foreground md:px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="md:hidden" />
        <Link href="/" className="flex items-center gap-2" onClick={handleNavHomeClick}>
          <Image
            src="media/logo/BCC_Logo.svg"
            alt="BCC Logo"
            width={32} 
            height={32} 
          />
          <h1 className="text-2xl font-bold font-quicksand text-primary hidden sm:block">BCC</h1>
        </Link>
      </div>

      <nav className="items-center hidden gap-1 md:flex lg:gap-2">
        {navItems.map((item) => (
          <Link key={item.label} href={item.href} passHref legacyBehavior>
            <Button
              variant={pathname === item.href ? "secondary" : "ghost"}
              size="sm"
              className={cn(
                "rounded-full px-3 py-1.5 text-sm",
                pathname === item.href && "font-semibold"
              )}
              onClick={item.href === '/' ? handleNavHomeClick : undefined}
            >
              <item.icon className="w-4 h-4 mr-0 lg:mr-2" />
              <span className="hidden lg:block">{item.label}</span>
            </Button>
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-2 md:gap-3">
        <div className="relative hidden sm:block">
          <Search className="absolute w-4 h-4 left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input type="search" placeholder="Search..." className="w-full pl-10 rounded-full h-9 md:w-48 lg:w-64 bg-background" />
        </div>
        <Button variant="ghost" size="icon" onClick={toggleDarkMode} aria-label="Toggle dark mode" className="rounded-full w-9 h-9">
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>
        <Button variant="ghost" size="icon" onClick={toggleAnimations} aria-label="Toggle animations" className="rounded-full w-9 h-9">
          {animationsEnabled ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </Button>
      </div>
    </header>
  );
}
