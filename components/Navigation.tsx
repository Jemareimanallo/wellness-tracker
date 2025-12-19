"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Activity,
  PhilippinePeso,
  BookHeart,
  Sparkles,
} from "lucide-react";

export function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home", icon: Home },
    { href: "/habits", label: "Habits", icon: Activity },
    { href: "/expenses", label: "Expenses", icon: PhilippinePeso },
    { href: "/journal", label: "Journal", icon: BookHeart },
  ];

  return (
    <nav className="border-b border-stone-200/60 bg-white/90 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <div className="flex items-center gap-4 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
              <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400 flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-stone-800 via-amber-800 to-orange-800 bg-clip-text text-transparent">
              Wellness Tracker
            </h1>
          </div>

          {/* Navigation Links */}
          <div className="flex gap-2">
            {links.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`group flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-amber-50 to-orange-50 text-amber-900 shadow-md border border-amber-200/80"
                      : "text-stone-600 hover:text-stone-900 hover:bg-stone-50 border border-transparent"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-all duration-300 ${
                      isActive
                        ? "text-amber-600"
                        : "text-stone-500 group-hover:text-stone-700 group-hover:scale-110"
                    }`}
                  />
                  <span className="hidden sm:inline text-sm">{label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
