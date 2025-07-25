import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from '@/hooks/use-toast';
import { Github, Linkedin, Twitter, Send } from 'lucide-react';

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast(); // Hook for toast notifications
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    message: ''
  });

  const [isSending, setIsSending] = useState(false);

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/CUSTEDLOL',
      icon: <Github className="w-6 h-6" />
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/visheshvjain/',
      icon: <Linkedin className="w-6 h-6" />
    },
    {
      name: 'X (Twitter)',
      url: 'https://x.com/reallyvishesh',
      icon: <Twitter className="w-6 h-6" />
    }
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.fromTo('.contact-input',
      { opacity: 0, x: -50, filter: 'blur(5px)' },
      { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power2.out', stagger: 0.2 }
    );

    tl.fromTo('.social-icon',
      { opacity: 0, y: 30, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)', stagger: 0.1 }, "-=0.4"
    );

    document.querySelectorAll('.social-icon').forEach((icon) => {
      icon.addEventListener('mouseenter', () =>
        gsap.to(icon, { scale: 1.1, duration: 0.2, ease: 'power2.out' })
      );
      icon.addEventListener('mouseleave', () =>
        gsap.to(icon, { scale: 1, duration: 0.2, ease: 'power2.out' })
      );
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setIsSending(true);

    emailjs.sendForm(
      'service_5g6g7ug',
      'template_mv8utcd',
      formRef.current,
      '89Lvo8GpKh-1m6hdD'
    )
      .then(() => {
        toast({
          title: "Message sent!",
          description: "Your message has been successfully delivered.",
        });
        setFormData({
          from_name: '',
          from_email: '',
          message: ''
        });
      })
      .catch((err) => {
        console.error('EmailJS error:', err);
        toast({
          title: "Error",
          description: "Failed to send message. Please try again later.",
          variant: "destructive",
        });
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section py-24 bg-gradient-to-b from-background via-slate-900/90 to-slate-800 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="tech-grid w-full h-full"></div>
      </div>
      <div className="absolute inset-0 opacity-10">
        <div className="circuit-pattern w-full h-full"></div>
      </div>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-32 h-32 border border-cyan-400/20 rotate-45 animate-pulse" />
        <div className="absolute bottom-32 left-10 w-24 h-24 border border-blue-400/20 rotate-12 animate-spin" style={{ animationDuration: '15s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-mono font-bold text-white mb-4 tracking-tight">
            <span className="text-cyan-400 text-glow">&gt;</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 text-glow-blue">Say</span>{' '}
            <span className="text-white">Hi</span>
          </h2>
          <p className="text-l text-gray-400 max-w-2xl mx-auto font-mono">
            <span className="text-cyan-400">//</span> Have a project in mind or just want to chat? I'm always excited to connect with fellow developers, entrepreneurs, and anyone with cool ideas. Feel free to reach out and drop your thoughts on the website too!
          </p>
          <div className="flex justify-center mt-6">
            <div className="w-48 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="glassmorphic border border-cyan-400/30 neon-border">
            <CardContent className="p-8 relative">
              {/* Tech Corners */}
              <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-cyan-400/50" />
              <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-cyan-400/50" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-cyan-400/50" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-cyan-400/50" />

              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="contact-input">
                  <label className="block text-cyan-400 mb-2 font-mono font-semibold text-glow">
                    <span className="text-white">&gt;</span> Name
                  </label>
                  <Input
                    type="text"
                    name="from_name"
                    value={formData.from_name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your name..."
                    className="bg-slate-900/50 border-cyan-400/30 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20 transition-all duration-300 font-mono neon-border"
                  />
                </div>

                <div className="contact-input">
                  <label className="block text-cyan-400 mb-2 font-mono font-semibold text-glow">
                    <span className="text-white">&gt;</span> Email
                  </label>
                  <Input
                    type="email"
                    name="from_email"
                    value={formData.from_email}
                    onChange={handleInputChange}
                    required
                    placeholder="your.email@domain.com"
                    className="bg-slate-900/50 border-cyan-400/30 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20 transition-all duration-300 font-mono neon-border"
                  />
                </div>

                <div className="contact-input">
                  <label className="block text-cyan-400 mb-2 font-mono font-semibold text-glow">
                    <span className="text-white">&gt;</span> Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    placeholder="Type your message here"
                    className="w-full px-3 py-2 bg-slate-900/50 border border-cyan-400/30 rounded-md text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20 focus:outline-none transition-all duration-300 resize-none font-mono neon-border"
                  />
                </div>

                <Button
                  type="submit"
                  className="submit-btn w-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 text-cyan-400 border border-cyan-400/50 hover:border-cyan-400/80 font-mono font-bold py-3 rounded-lg transition-all duration-300 neon-border text-glow"
                  disabled={isSending}
                >
                  <Send className="w-4 h-4 mr-2" />
                  {isSending ? 'Sending...' : 'Send'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Social Links */}
          <div ref={socialRef} className="flex justify-center space-x-6 mt-12">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon group relative p-4 glassmorphic border border-cyan-400/30 rounded-lg hover:border-cyan-400/60 transition-all duration-300 neon-border"
              >
                <div className="text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300 text-glow">
                  {social.icon}
                </div>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-400/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-slate-900 border border-cyan-400/50 text-cyan-400 px-2 py-1 rounded text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {social.name}
                </div>
              </a>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-400 font-mono">
              <span className="text-cyan-400">//</span> Or reach me directly at{' '}
              <a
                href="mailto:visheshjain1705@gmail.com"
                className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300 text-glow"
              >
                visheshjain1705@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
