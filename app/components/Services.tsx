"use client";

import { useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart, Target, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { fadeInOnScroll, motionConfig } from "@/lib/motion";
import { animate, stagger, inView } from "motion";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://melius-ajnahal.com";

const servicesData = [
  {
    icon: BarChart,
    title: "Financial Advisory",
    slug: "financial-advisory",
    description:
      "Comprehensive financial planning and analysis to optimize your business performance and maximize profitability.",
  },
  {
    icon: Target,
    title: "Strategic Planning",
    slug: "strategic-planning",
    description:
      "Develop robust strategies that align with your vision and position your business for long-term success.",
  },
  {
    icon: Briefcase,
    title: "Business Consulting",
    slug: "business-consulting",
    description:
      "Expert guidance on operations, growth strategies, and organizational development to elevate your business.",
  },
];

export function Services() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate title
    if (titleRef.current) {
      fadeInOnScroll(titleRef.current, { delay: 0.1, y: 30 });
    }

    // Animate cards with stagger
    if (cardsRef.current) {
      const cards = Array.from(cardsRef.current.children) as HTMLElement[];
      
      // Use inView to trigger when cards container enters viewport
      inView(
        cardsRef.current,
        () => {
          // Set initial state for cards
          cards.forEach((card) => {
            card.style.opacity = "0";
            card.style.transform = "translateY(30px)";
          });
          
          // Stagger animation for cards
          animate(
            cards,
            {
              opacity: 1,
              y: 0,
            } as Record<string, unknown>,
            {
              duration: motionConfig.duration.normal,
              delay: stagger(0.1),
            }
          );
        },
        { margin: "-100px" }
      );
    }
  }, []);

  return (
    <section
      id="services"
      className="py-20 md:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 scroll-mt-20"
      aria-label="Our Services"
    >
      <div className="container mx-auto max-w-6xl">
        <h2 
          ref={titleRef}
          className="font-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-brand-gold text-center mb-12 md:mb-16 lg:mb-20 opacity-0"
        >
          Our Services
        </h2>
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12"
        >
          {servicesData.map((service) => {
            const Icon = service.icon;
            return (
              <Card
                key={service.title}
                className={cn(
                  "bg-brand-light-blue border-(--brand-gold)/20",
                  "hover:border-(--brand-gold)/40",
                  "transition-all duration-300 ease-out",
                  "hover:scale-105 hover:shadow-lg hover:shadow-brand-gold/20",
                  "opacity-0"
                )}
              >
                <CardHeader>
                  <div className="mb-4 transition-transform duration-300 group-hover:scale-110">
                    <Icon 
                      className="size-12 text-brand-gold transition-transform duration-300" 
                      aria-hidden="true"
                    />
                  </div>
                  <CardTitle className="font-serif text-xl md:text-2xl lg:text-3xl text-brand-gold">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-white/90 text-sm md:text-base leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: "Business Advisory Services",
            provider: {
              "@type": "Organization",
              name: "MELIUS",
            },
            areaServed: "Worldwide",
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Business Advisory Services",
              itemListElement: servicesData.map((service, index) => ({
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: service.title,
                  description: service.description,
                  url: `${siteUrl}/services#${service.slug}`,
                },
                position: index + 1,
              })),
            },
          }),
        }}
      />
    </section>
  );
}

