"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Spotlight } from "@/components/ui/spotlight";
import { cn } from "@/lib/utils";
import { fadeInOnScroll } from "@/lib/motion";

export function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // Animate elements on mount with staggered delay
    if (titleRef.current) {
      fadeInOnScroll(titleRef.current, { delay: 0.1, y: 30 });
    }
    if (textRef.current) {
      fadeInOnScroll(textRef.current, { delay: 0.3, y: 20 });
    }
    if (buttonRef.current) {
      fadeInOnScroll(buttonRef.current, { delay: 0.5, y: 20 });
    }
  }, []);

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 md:pt-24 pb-16 md:pb-24 overflow-hidden"
      style={{
        backgroundColor: '#0C192D',
        backgroundImage: 'radial-gradient(circle at center, rgba(24, 44, 70, 1) 0%, rgba(34, 47, 61, 1) 50%, rgba(12, 25, 45, 1) 100%)'
      }}
    >
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="var(--brand-gold)" />
      <div className="container mx-auto max-w-4xl text-center relative z-10">
        <h1 
          ref={titleRef}
          className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-brand-gold mb-6 md:mb-8 leading-tight opacity-0"
        >
          Strategic Excellence in Business Advisory
        </h1>
        <p 
          ref={textRef}
          className="text-base md:text-lg lg:text-xl text-white/90 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed opacity-0"
        >
          Empowering businesses with expert financial guidance and strategic
          solutions tailored to drive sustainable growth and success.
        </p>
        <Button
          size="lg"
          className={cn(
            "bg-brand-gold text-black hover:bg-brand-gold/90",
            "rounded-md px-8 py-6 text-lg font-medium",
            "transition-all duration-300 ease-out hover:scale-105"
          )}
          asChild
        >
          <a ref={buttonRef} href="#contact" className="opacity-0">Get Started</a>
        </Button>
      </div>
    </section>
  );
}

