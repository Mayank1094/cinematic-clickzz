import { Zap, Film, Users } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useState, useEffect, useRef } from 'react';

const services = [
  {
    icon: Zap,
    title: '20-MINUTE REELS',
    description: 'Ultra-efficient turnaround using a refined, mobile-first workflow. From raw footage to polished reel in record time.',
    color: 'text-primary',
    gradient: 'from-primary/20 to-primary/5',
  },
  {
    icon: Film,
    title: 'PREMIUM VISUALS',
    description: 'High-quality, cinematic grading and editing, even from iPhone footage. Hollywood-level post-production for every frame.',
    color: 'text-secondary',
    gradient: 'from-secondary/20 to-secondary/5',
  },
  {
    icon: Users,
    title: 'CONTENT PARTNER',
    description: 'Beyond the edit—consultation on story structure and platform optimization. Your strategic partner in content creation.',
    color: 'text-primary',
    gradient: 'from-primary/20 to-primary/5',
  },
];

const Services = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = cardRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleCards((prev) => [...prev, index]);
            }
          });
        },
        { threshold: 0.3 }
      );
      
      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  return (
    <section id="services" className="py-32 bg-gradient-to-b from-muted/20 to-background relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-5xl md:text-6xl font-heading font-black text-gradient">
            WHAT WE DO
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Three pillars of precision: Speed, Quality, and Partnership.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                ref={(el) => (cardRefs.current[index] = el)}
                className={`group relative overflow-hidden border-2 border-border hover:border-primary/50 transition-all duration-700 hover:shadow-2xl hover:shadow-primary/20 bg-gradient-to-b ${service.gradient} ${
                  visibleCards.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ 
                  transitionDelay: `${index * 200}ms`
                }}
              >
                <CardHeader className="space-y-6 p-8">
                  {/* Icon */}
                  <div className="relative">
                    <div className="w-16 h-16 rounded-lg bg-card flex items-center justify-center border-2 border-border group-hover:border-primary/50 transition-all duration-500 group-hover:scale-110">
                      <Icon className={`w-8 h-8 ${service.color} group-hover:drop-shadow-glow transition-all`} />
                    </div>
                    
                    {/* Number Badge */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>

                  {/* Title */}
                  <CardTitle className="text-2xl font-heading font-black tracking-tight group-hover:text-primary transition-colors">
                    {service.title}
                  </CardTitle>

                  {/* Description */}
                  <CardDescription className="text-base text-muted-foreground leading-relaxed">
                    {service.description}
                  </CardDescription>

                  {/* Animated Border */}
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-700" />
                </CardHeader>
              </Card>
            );
          })}
        </div>

        {/* Bottom Accent Line */}
        <div className="mt-20 max-w-7xl mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default Services;
