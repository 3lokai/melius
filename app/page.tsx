import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-dark-blue text-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-100 focus:px-4 focus:py-2 focus:bg-brand-gold focus:text-black focus:rounded-md focus:font-medium focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-brand-dark-blue"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" role="main">
        <Hero />
        <Services />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
