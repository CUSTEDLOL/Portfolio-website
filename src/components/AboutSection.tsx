import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from './ui/button';
import { Download, ExternalLink } from 'lucide-react';
import WordleGame from './WordleGame';

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLHeadingElement>(null);

  const skills = [
    { name: 'Python', icon: '🐍', level: 90 },
    { name: 'GenAI', icon: '🤖', level: 85 },
    { name: 'JavaScript', icon: '⚡', level: 88 },
    { name: 'AWS', icon: '☁️', level: 80 },
    { name: 'React', icon: '⚛️', level: 92 },
    { name: 'Node.js', icon: '💚', level: 85 },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current || !imageRef.current || !contentRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 50%',
        toggleActions: 'play none none reverse',
      },
    });

    // Animate Profile Image
    tl.fromTo(
      imageRef.current,
      { opacity: 0, x: -50, rotation: -5, y: 50, filter: 'blur(5px)' },
      { opacity: 1, x: 0, rotation: 0, filter: 'blur(0px)', duration: 1, ease: 'power2.out' }
    );

    // Animate Content
    tl.fromTo(
      contentRef.current,
      { opacity: 0, x: 50, y: 50, filter: 'blur(5px)' },
      { opacity: 1, x: 0, filter: 'blur(0px)', duration: 1, ease: 'power2.out' },
      '-=0.8'
    );

    // Animate Skills with stagger
    tl.fromTo(
      '.skill-item',
      { opacity: 0, y: 30, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.1, ease: 'back.out(1.7)', stagger: 0.1 },
      '-=0.5'
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section py-6 xs:py-8 md:py-16 bg-gradient-to-b from-background via-slate-900/80 to-slate-800/60 relative overflow-hidden"
    >
      {/* Tech Background Elements - Hidden below xs breakpoint */}
      <div className="absolute inset-0 opacity-10 hidden xs:block">
        <div className="absolute inset-0 tech-grid"></div>
        <div className="absolute top-20 left-10 w-32 h-32 border border-cyan-400/30 rotate-45 animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-24 h-24 border border-blue-400/30 rotate-12 animate-pulse"
          style={{ animationDelay: '1s' }}
        ></div>
      </div>

      {/* Circuit Pattern - Reduced opacity on small screens */}
      <div className="absolute inset-0 opacity-1 xs:opacity-2 md:opacity-5">
        <div className="circuit-pattern w-full h-full"></div>
      </div>

      <div className="container mx-auto px-3 xs:px-4 md:px-6 max-w-6xl relative z-10">
        {/* Stack layout below xs (475px), Grid layout above xs */}
        <div className="flex flex-col xs:grid xs:grid-cols-2 gap-6 xs:gap-8 md:gap-12 items-center">
          {/* Profile Image */}
          <div ref={imageRef} className="relative cursor-pointer w-full flex justify-center xs:justify-start">
            <div className="relative w-48 h-48 xs:w-64 xs:h-64 md:w-80 md:h-80">
              {/* Holographic Frame */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/30 to-blue-500/30 blur-xl animate-glow-pulse"></div>
              <div className="absolute inset-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 p-1 neon-border">
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 border-2 border-cyan-400/50">
                  <img
                    src="/potrait.jpeg"
                    alt="Vishesh Portrait"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Scanning Line */}
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div className="w-full h-1 bg-cyan-400/80 absolute top-2/3 animate-data-flow shadow-lg shadow-cyan-400/50"></div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-3 xs:space-y-4 md:space-y-6 w-full">
            <div className="relative text-center xs:text-left">
              <h2 className="text-xl xs:text-2xl md:text-3xl lg:text-4xl font-mono font-bold text-white mb-3 xs:mb-4 md:mb-6 tracking-tight">
                <span className="text-cyan-400 text-glow">&gt;</span> About{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 text-glow-blue">
                  Me
                </span>
              </h2>
              {/* Tech Accent - Hidden below xs */}
              <div className="absolute -top-2 -right-2 w-6 h-6 border-2 border-cyan-400/50 rotate-45 animate-pulse hidden xs:block"></div>
            </div>

            <div className="space-y-2 xs:space-y-3 md:space-y-4 text-gray-300 text-xs xs:text-sm md:text-base leading-relaxed font-mono">
              <p className="glassmorphic-card p-2 xs:p-3 md:p-4 rounded-lg border-l-4 border-cyan-400/50">
                I'm building{' '}
                <span className="text-cyan-400 font-bold text-glow">Nudge</span>. It is an AI-powered productivity app that makes collaboration engaging and effective by combining expressive avatars, motivating leaderboards, interactive group challenges, personalized learning techniques, and a supportive community to help teams work smarter together.
              </p>

              <p className="glassmorphic-card p-2 xs:p-3 md:p-4 rounded-lg border-l-4 border-blue-400/50">
                As a Computer Science major at NTU, I'm interning at Hyundai Motor Group Innovation Centre in Singapore, where I've gained hands-on experience managing a developer's workload and learning the ins-and-outs of managing a fairly fresh company off a large established corporation.
              </p>

              <p className="glassmorphic-card p-2 xs:p-3 md:p-4 rounded-lg border-l-4 border-purple-400/50">
                Beyond coursework, I participate in ideathons to pitch ideas, attend fireside chats with VCs, and mentor students and young adults who are one step behind me, drawing from my fresh experiences to share insights on university admissions, adapting to independent living away from home, or launching their own ventures.
              </p>
            </div>

            {/* Resume Button */}
            <div className="mt-3 xs:mt-4 md:mt-6 flex justify-center xs:justify-start">
              <Button
                asChild
                className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 text-cyan-400 border border-cyan-400/50 hover:border-cyan-400/80 rounded-lg transition-all duration-300 font-mono neon-border text-xs xs:text-sm md:text-base"
              >
                <a
                  href="https://heyzine.com/flip-book/b02e1dd3bf.html#page/1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-3 xs:px-4 py-2"
                >
                  <Download className="w-3 h-3 xs:w-4 xs:h-4" />
                  <span>View my Resume</span>
                  <ExternalLink className="w-3 h-3 xs:w-4 xs:h-4" />
                </a>
              </Button>
            </div>

            {/* Skills and Wordle Section - Mobile: Stacked, Desktop: Side by side */}
            <div className="mt-4 xs:mt-6 md:mt-8">
              <div className="flex flex-col lg:flex-row lg:gap-8 space-y-6 lg:space-y-0">
                {/* Skills Section */}
                <div className="lg:flex-1">
                  <h3 className="text-base xs:text-lg md:text-xl font-mono font-bold text-cyan-400 mb-2 xs:mb-3 md:mb-4 text-glow text-center xs:text-left">
                    <span className="text-white">&gt;</span> Tech Stack
                  </h3>
                  {/* Single column below xs, Two columns above xs */}
                  <div className="flex flex-col space-y-2 xs:grid xs:grid-cols-2 xs:gap-3 xs:space-y-0 lg:grid-cols-1 lg:space-y-2">
                    {skills.map((skill, index) => (
                      <div
                        key={skill.name}
                        className="skill-item group relative p-2 xs:p-3 rounded-lg glassmorphic border border-cyan-400/30 hover:border-cyan-400/60 transition-all duration-300 neon-border"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex items-center justify-between mb-1 xs:mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm xs:text-base md:text-lg">{skill.icon}</span>
                            <span className="text-cyan-400 font-mono font-semibold text-xs xs:text-sm">{skill.name}</span>
                          </div>
                          <span className="text-cyan-300 font-mono text-xs">{skill.level}%</span>
                        </div>
                        {/* Skill Level Bar */}
                        <div className="w-full bg-slate-800 rounded-full h-1 xs:h-1.5 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${skill.level}%` }}
                          >
                            <div className="h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                          </div>
                        </div>
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-400/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Wordle Game Section */}
                <div className="lg:flex-1">
                  <WordleGame className="h-fit" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;