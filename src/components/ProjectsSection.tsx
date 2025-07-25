import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Github, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: 1,
      title: "Glitch Traffic Dashboard",
      description:
        "Real-time traffic monitoring system with predictive analytics and smart routing algorithms.",
      image: "project-1.png",
      tech: ["Python", "Streamlit", "GeminiAPI", "Reinforcement Learning"],
      github: "https://github.com/CUSTEDLOL/glitch-traffic-dashboard.git",
      gradient: "from-cyan-400 to-blue-500",
      status: "ACTIVE",
    },
    {
      id: 2,
      title: "DengueShield SG",
      description:
        "AI-powered dengue outbreak prediction and prevention system for Singapore.",
      image: "/project-2.png",
      tech: ["Javascript", "Firebase", "AI Chatbot", "Maps API"],
      github: "https://github.com/CUSTEDLOL/DengueShield-SG",
      gradient: "from-emerald-400 to-cyan-500",
      status: "DEPLOYED",
    },
    {
      id: 3,
      title: "Hospital Management+",
      description:
        "Comprehensive hospital management system with patient tracking and resource optimization.",
      image: "/project-3.png",
      tech: ["Java", "MySQL", "SWE Practices", "OOP"],
      github: "https://github.com/CUSTEDLOL/SC2002_Assignment.git",
      gradient: "from-violet-400 to-purple-500",
      status: "COMPLETE",
    },
    {
      id: 4,
      title: "SciFun Learning Platform",
      description:
        "Interactive science learning platform with gamification and progress tracking.",
      image: "/project-4.png",
      tech: ["Javascript", "CSS", "HTML", "Android Studio"],
      github: "https://github.com/CUSTEDLOL/Sci-Fun",
      gradient: "from-orange-400 to-red-500",
      status: "BETA",
    },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });

    // Title animation
    tl.fromTo(
      titleRef.current,
      {
        opacity: 0,
        y: 50,
        filter: "blur(10px)",
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power2.out",
      }
    );

    // Cards staggered animation
    tl.fromTo(
      ".project-card",
      {
        opacity: 0,
        y: 60,
        scale: 0.9,
        filter: "blur(5px)",
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.2,
      },
      "-=0.5"
    );

    // Hover animations for cards
    // Make sure cleanup is handled to prevent leaks
    const cards = document.querySelectorAll<HTMLElement>(".project-card");

    const handleMouseEnter = (card: HTMLElement) => {
      gsap.to(card, {
        y: -10,
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = (card: HTMLElement) => {
      gsap.to(card, {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => handleMouseEnter(card));
      card.addEventListener("mouseleave", () => handleMouseLeave(card));
    });

    return () => {
      cards.forEach((card) => {
        card.removeEventListener("mouseenter", () => handleMouseEnter(card));
        card.removeEventListener("mouseleave", () => handleMouseLeave(card));
      });
    };
  }, []);

  return (
    <section id = "projects"
      ref={sectionRef}
      className="section py-16 bg-gradient-to-b from-slate-800/60 via-slate-900/80 to-background relative overflow-hidden"
      aria-label="Projects Section"
    >
      {/* Tech Background Elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="tech-grid w-full h-full"></div>
      </div>

      {/* Floating Tech Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-10 left-10 w-16 h-16 border border-cyan-400/20 rotate-45 animate-spin"
          style={{ animationDuration: "20s" }}
        />
        <div className="absolute top-1/3 right-20 w-12 h-12 border border-blue-400/20 rotate-12 animate-pulse" />
        <div
          className="absolute bottom-20 left-1/4 w-20 h-20 border border-purple-400/20 animate-bounce"
          style={{ animationDuration: "3s" }}
        />
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-3xl md:text-4xl font-mono font-bold text-white mb-3 tracking-tight"
          >
            <span className="text-cyan-400 text-glow">&gt;</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 text-glow-blue">
              Projects
            </span>{" "}
            <span className="text-white">Repository</span>
          </h2>

          <p className="text-lg text-gray-400 font-mono max-w-2xl mx-auto">
            <span className="text-cyan-400">//</span> Exploring diverse technologies to build practical tools 
          </p>

          {/* Tech Accent Lines */}
          <div className="flex justify-center mt-4">
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
          </div>
        </div>

        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto"
        >
          {projects.map((project) => (
            <Card
              key={project.id}
              className="project-card group relative overflow-hidden glassmorphic border border-cyan-400/30 hover:border-cyan-400/60 transition-all duration-300 neon-border"
            >
              {/* Status Badge */}
              <div className="absolute top-3 right-3 z-20">
                <span
                  className={`px-2 py-1 text-xs font-mono font-bold rounded-full ${
                    project.status === "ACTIVE"
                      ? "bg-green-500/20 text-green-400 border border-green-400/50"
                      : project.status === "DEPLOYED"
                      ? "bg-blue-500/20 text-blue-400 border border-blue-400/50"
                      : project.status === "COMPLETE"
                      ? "bg-purple-500/20 text-purple-400 border border-purple-400/50"
                      : "bg-orange-500/20 text-orange-400 border border-orange-400/50"
                  }`}
                >
                  {project.status}
                </span>
              </div>

              <div className="relative h-48 overflow-hidden bg-slate-900/50">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
                ></div>

                {/* Scanning Line Effect */}
                <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-60 transition-opacity duration-300">
                  <div className="w-full h-px bg-cyan-400 absolute top-1/2 animate-data-flow shadow-lg shadow-cyan-400/50"></div>
                </div>
              </div>

              <CardContent className="p-5 space-y-3 bg-slate-900/30 backdrop-blur-sm">
                <h3 className="text-xl font-mono font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300 text-glow">
                  {project.title}
                </h3>

                <p className="text-gray-300 leading-relaxed text-sm font-mono">
                  <span className="text-cyan-400">//</span> {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs font-mono bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 rounded border border-cyan-400/30 neon-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 text-cyan-400 border border-cyan-400/50 hover:border-cyan-400/80 rounded-lg transition-all duration-300 font-mono neon-border"
                >
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2"
                    tabIndex={-1}
                    aria-label={`View GitHub repository for ${project.title}`}
                  >
                    <Github className="w-4 h-4" />
                    <span>View Repository</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </CardContent>

              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-400/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
