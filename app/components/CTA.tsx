"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ContactModal } from "./ContactModal";
import { cn } from "@/lib/utils";
import { fadeInOnScroll } from "@/lib/motion";

export function CTA() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Animate elements on scroll with staggered delay
    if (titleRef.current) {
      fadeInOnScroll(titleRef.current, { delay: 0.1, y: 30 });
    }
    if (textRef.current) {
      fadeInOnScroll(textRef.current, { delay: 0.2, y: 20 });
    }
    if (buttonRef.current) {
      fadeInOnScroll(buttonRef.current, { delay: 0.3, y: 20 });
    }
    if (emailRef.current) {
      fadeInOnScroll(emailRef.current, { delay: 0.4, y: 20 });
    }
  }, []);

  return (
    <section
      id="contact"
      className="py-20 md:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 scroll-mt-20"
      aria-label="Contact Us"
    >
      <div className="container mx-auto max-w-4xl text-center">
        <h2 
          ref={titleRef}
          className="font-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[var(--brand-gold)] mb-6 md:mb-8 opacity-0"
        >
          Ready to Transform Your Business?
        </h2>
        <p 
          ref={textRef}
          className="text-base md:text-lg lg:text-xl text-white/90 mb-8 md:mb-10 max-w-2xl mx-auto opacity-0"
        >
          Let&apos;s discuss how we can help you achieve your strategic and
          financial goals.
        </p>
        <div ref={buttonRef} className="opacity-0">
          <ContactModal
            trigger={
              <Button
                size="lg"
                className={cn(
                  "bg-[var(--brand-gold)] text-black hover:bg-[var(--brand-gold)]/90",
                  "rounded-md px-8 py-6 text-lg font-medium",
                  "transition-all duration-300 ease-out hover:scale-105 mb-6"
                )}
              >
                Contact Us
              </Button>
            }
          />
        </div>
        <p 
          ref={emailRef}
          className="text-sm md:text-base text-white/70 opacity-0"
        >
          Unable to connect? please mail us at{" "}
          <a
            href="mailto:melius.ajnahal@gmail.com"
            className="text-[var(--brand-gold)] hover:underline transition-colors duration-300"
            aria-label="Send email to melius.ajnahal@gmail.com"
          >
            melius.ajnahal@gmail.com
          </a>
        </p>
      </div>
    </section>
  );
}

