import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Award, BarChart3, Home, Upload, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Submit Project', href: '/submit', icon: Upload },
    { name: 'Judge Projects', href: '/judge', icon: Award },
    { name: 'Reports', href: '/reports', icon: BarChart3 },
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">Judgehack</h1>
        <button
          className="lg:hidden block text-white"
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
        <nav className="hidden lg:flex space-x-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'flex items-center space-x-2 px-3 py-2 rounded-md text-sm',
                location.pathname === item.href ? 'bg-gray-700' : 'hover:bg-gray-700'
              )}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </header>

      {isMobileMenuOpen && (
        <nav className="lg:hidden bg-gray-800 text-white p-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'block px-3 py-2 rounded-md text-sm mb-2',
                location.pathname === item.href ? 'bg-gray-700' : 'hover:bg-gray-700'
              )}
              onClick={toggleMobileMenu}
            >
              <item.icon className="w-4 h-4 inline-block mr-2" />
              {item.name}
            </Link>
          ))}
        </nav>
      )}

      <main className="flex-1 p-4">
        {children}
      </main>
    </div>
  );
}
