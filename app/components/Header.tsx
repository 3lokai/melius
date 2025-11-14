"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { ContactModal } from "./ContactModal";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { animate } from "motion";
import { motionConfig } from "@/lib/motion";
import { MenuIcon } from "lucide-react";

export function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
          <div className="logo-section shrink-0 min-w-0">
            <Link href="/" className="flex items-center gap-1.5 sm:gap-2 md:gap-3 transition-transform duration-300 hover:scale-105">
              <div className="p-1 sm:p-1.5 md:p-2">
                <Image
                  src="/melius-lion.svg"
                  alt="Melius Logo"
                  width={40}
                  height={40}
                  className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-10 lg:w-10 transition-transform duration-300"
                  priority
                />
              </div>
              <div className="h-6 sm:h-7 md:h-8 lg:h-10 w-px bg-brand-gold" />
              <span
                id="company-name"
                className="font-serif font-bold text-brand-gold transition-colors duration-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-none"
                aria-label="MELIUS"
              >
                MELIUS
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-4">
            <NavigationMenu>
              <NavigationMenuList className="gap-2">
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="#services"
                    className={cn(
                      "text-white hover:text-black",
                      "px-4 py-2 rounded-md text-base",
                      "transition-all duration-300 ease-out hover:scale-105"
                    )}
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
                          "px-4 py-2 rounded-md cursor-pointer text-base",
                          "transition-all duration-300 ease-out hover:scale-105"
                        )}
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

          {/* Mobile Menu Button */}
          <Dialog open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white hover:text-brand-gold hover:bg-transparent"
                aria-label="Toggle mobile menu"
              >
                <MenuIcon className="h-6 w-6" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-brand-dark-blue border-brand-gold text-white">
              <DialogTitle className="sr-only">Navigation Menu</DialogTitle>
              <DialogDescription className="sr-only">
                Main navigation menu with links to services and contact information
              </DialogDescription>
              <nav className="flex flex-col gap-4 py-4">
                <Link
                  href="#services"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium text-white hover:text-brand-gold transition-colors duration-300 py-2 px-4 rounded-md hover:bg-brand-light-blue/10"
                  aria-label="Navigate to Services section"
                >
                  Services
                </Link>
                <div className="px-4">
                  <ContactModal
                    trigger={
                      <button
                        className="text-lg font-medium text-white hover:text-brand-gold transition-colors duration-300 py-2 w-full text-left rounded-md hover:bg-brand-light-blue/10"
                        aria-label="Open contact modal"
                      >
                        Contact
                      </button>
                    }
                  />
                </div>
              </nav>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}

