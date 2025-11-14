"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { ContactModal } from "./ContactModal";
import { cn } from "@/lib/utils";
import { animate } from "motion";
import { motionConfig } from "@/lib/motion";

export function Header() {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      // Set initial state
      headerRef.current.style.opacity = "0";
      headerRef.current.style.transform = "translateY(-20px)";
      
      // Fade in header on mount
      animate(
        headerRef.current,
        {
          opacity: 1,
          y: 0,
        } as Record<string, unknown>,
        {
          duration: motionConfig.duration.normal,
          delay: 0.1,
        }
      );
    }
  }, []);

  return (
    <header 
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 bg-brand-dark-blue border-b-2 border-brand-gold opacity-0"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="logo-section">
            <Link href="/" className="flex items-center gap-3 transition-transform duration-300 hover:scale-105">
              <div className="p-2">
                <Image
                  src="/melius-lion.svg"
                  alt="Melius Logo"
                  width={40}
                  height={40}
                  className="h-8 md:h-10 w-auto transition-transform duration-300"
                  priority
                />
              </div>
              <div className="h-8 md:h-10 w-px bg-brand-gold" />
              <span
                id="company-name"
                className="font-serif font-bold text-brand-gold transition-colors duration-300"
                style={{ fontSize: "48px" }}
                aria-label="MELIUS"
              >
                MELIUS
              </span>
            </Link>
          </div>
          <nav aria-label="Main navigation" className="flex items-center gap-4">
            <NavigationMenu>
              <NavigationMenuList className="gap-2">
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="#services"
                    className={cn(
                      "text-white hover:text-black",
                      "px-4 py-2 rounded-md",
                      "transition-all duration-300 ease-out hover:scale-105"
                    )}
                    style={{ fontSize: "16px" }}
                    aria-label="Navigate to Services section"
                  >
                    Services
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <ContactModal
                    trigger={
                      <NavigationMenuLink
                        asChild
                        className={cn(
                          "text-white hover:text-black",
                          "px-4 py-2 rounded-md cursor-pointer",
                          "transition-all duration-300 ease-out hover:scale-105"
                        )}
                        style={{ fontSize: "16px" }}
                        aria-label="Open contact modal"
                      >
                        <span>Contact</span>
                      </NavigationMenuLink>
                    }
                  />
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        </div>
      </div>
    </header>
  );
}

