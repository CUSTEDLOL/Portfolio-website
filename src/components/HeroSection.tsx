import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Button } from "./ui/button";

const HeroSection = () => {
  const headlineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!headlineRef.current || !ctaRef.current || !splineRef.current) return;

    const tl = gsap.timeline({ delay: 3.5 }); // Start after loading

    // Spline background fade in
    tl.fromTo(
      splineRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 2, ease: "power2.out" }
    );

    // Headline animation
    tl.fromTo(
      headlineRef.current,
      { opacity: 0, y: 50, filter: "blur(10px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, ease: "power2.out" },
      "-=1.5"
    );

    // CTA animation
    tl.fromTo(
      ctaRef.current,
      { opacity: 0, y: 30, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
      "-=0.6"
    );

    // Continuous floating animation for Spline background
    gsap.to(".spline-bg", {
      y: -10,  // reduced from -20 to lessen edge exposure
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    // Cleanup function
    return () => {
      tl.kill();
      gsap.killTweensOf(".spline-bg");
    };
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="section relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
      style={{ margin: 0, padding: 0 }}
    >
      {/* Spline 3D Model - Front and Center */}
      <div
        ref={splineRef}
        className="spline-bg absolute inset-0 z-30"
        style={{
          opacity: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
          display: "block",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <iframe
          src="https://my.spline.design/particlenebula-Y7e8nNo2F0tSzQAIbwWFrCZe/"
          frameBorder="0"
          className="w-full h-full pointer-events-auto"
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            display: "block",
            overflow: "hidden",
            userSelect: "none",
            pointerEvents: "auto",
          }}
          loading="lazy"  // Added for better mobile performance
          allow="camera; fullscreen; accelerometer; gyroscope; magnetometer"
          title="3D Spline Model"
        />
      </div>

      {/* Tech Grid Background */}
      <div className="absolute inset-0 z-10 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-transparent to-blue-500/20"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(34, 211, 238, 0.2) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(34, 211, 238, 0.2) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Content - Responsive Positioning: Bottom-left on desktop, centered on mobile */}
      <div className="absolute z-40 pointer-events-none md:bottom-8 md:left-8 bottom-0 left-0 right-0 p-4 md:p-0 flex justify-center md:justify-start">
        <div className="max-w-md pointer-events-auto text-center md:text-left">
          <div ref={headlineRef} className="mb-4">
            <h1 className="text-xl md:text-3xl font-light text-white mb-3 font-inter tracking-tight leading-tight">
              Hi. I'm{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-bold">
                Vishesh
              </span>{" "}
              —
            </h1>
            <p className="text-sm md:text-lg font-light text-gray-300 leading-relaxed">
              Building the next big thing. Or the next medium-sized thing.{" "}
              <span className="text-cyan-400">TBD.</span>
            </p>
          </div>

          <div ref={ctaRef}>
            <Button
              className="group relative px-4 py-2 text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white border-0 rounded-lg shadow-lg shadow-cyan-400/25 hover:shadow-cyan-400/40 hover:scale-105 transition-all duration-300"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <span className="relative z-10">
                Slide into my DMs — professionally, please.
              </span>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
