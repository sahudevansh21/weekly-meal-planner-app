"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Meal Plan', href: '/meal-plan-editor' },
    { name: 'Shopping List', href: '/shopping-list-generator' },
    { name: 'Saved Plans', href: '/saved-plans' },
  ];

  return (
    <nav className="navbar">
      <Link href="/" className="navbar-brand">
        Meal Planner
      </Link>
      <div className="nav-links">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`nav-link ${pathname === link.href ? 'active' : ''}`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
