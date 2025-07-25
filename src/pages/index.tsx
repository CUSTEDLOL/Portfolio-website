
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import LoadingScreen from '../components/LoadingScreen';
import QRCodeGenerator from '../components/QRCodeGenerator';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize smooth scroll behavior
    const initScrollTriggers = () => {
      const sections = gsap.utils.toArray('.section');
      sections.forEach((section: any) => {
        gsap.fromTo(section, 
          { 
            opacity: 0, 
            y: 50,
            filter: 'blur(10px)'
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    };

    // Delay initialization to allow loading screen to complete
    const timer = setTimeout(() => {
      initScrollTriggers();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen />
      <div ref={mainRef} className="main-content opacity-0">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
        <Footer />
      </div>
      <QRCodeGenerator />
    </>
  );
};

export default Index;
