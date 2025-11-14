"use client";

import { useEffect, useRef } from "react";
import { fadeInOnScroll } from "@/lib/motion";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (footerRef.current) {
      fadeInOnScroll(footerRef.current, { delay: 0.1, y: 20 });
    }
  }, []);

  return (
    <footer 
      ref={footerRef}
      aria-label="Site footer"
      className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 border-t border-border opacity-0"
    >
      <div className="container mx-auto text-center">
        <p className="text-sm text-white/70">
          © {currentYear} MELIUS. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

