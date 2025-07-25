import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    // Floating particles animation - note: only runs if '.particle' elements exist
    gsap.to('.particle', {
      y: -30,
      x: 'random(-20, 20)',
      duration: 'random(3, 6)',
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1,
      stagger: {
        amount: 2,
        from: 'random',
      },
    });

    // Footer fade in animation with ScrollTrigger
    gsap.fromTo(
      footerRef.current,
      {
        opacity: 0,
        y: 60,
        filter: 'blur(10px)',
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer
      ref={footerRef}
      className="relative py-16 bg-gradient-to-t from-slate-900 to-background overflow-hidden"
    >
      {/* Floating particles background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-2 h-2 bg-cyan-400/30 rounded-full blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="text-center space-y-8">
          {/* Logo */}
          <div className="text-3xl font-light text-white font-inter tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Vishesh
            </span>
          </div>

          {/* Quick Links */}
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap justify-center gap-8 text-gray-400"
          >
            {/* Using button with accessible role and semantic navigation */}
            <button
              type="button"
              onClick={() =>
                document
                  .getElementById('hero')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              className="hover:text-cyan-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() =>
                document
                  .getElementById('about')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              className="hover:text-cyan-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded"
            >
              About
            </button>
            <button
              type="button"
              onClick={() =>
                document
                  .getElementById('projects')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              className="hover:text-cyan-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded"
            >
              Projects
            </button>
            <button
              type="button"
              onClick={() =>
                document
                  .getElementById('contact')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              className="hover:text-cyan-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded"
            >
              Contact
            </button>
          </nav>

          {/* Divider */}
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent mx-auto" />

          {/* Copyright */}
          <div className="text-gray-500 text-sm select-none">
            <p>© {currentYear} Vishesh Jain. Built with React, GSAP, and too much FOMO.</p>
            <p className="mt-2">Designed to impress, coded to last (hopefully).</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
