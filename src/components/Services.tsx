import { Zap, Film, Users } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const services = [
  {
    icon: Zap,
    title: '30-Minute Reels',
    description: 'Ultra-efficient turnaround using a refined, mobile-first workflow. From raw footage to polished reel in record time.',
  },
  {
    icon: Film,
    title: 'Premium Visuals',
    description: 'High-quality, cinematic grading and editing, even from iPhone footage. Hollywood-level post-production for every frame.',
  },
  {
    icon: Users,
    title: 'Content Partner',
    description: 'Beyond the edit—consultation on story structure and platform optimization. Your strategic partner in content creation.',
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
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold text-foreground mb-4">
            <span className="text-gradient-apple">What we do.</span>{' '}
            <span className="text-muted-foreground">Three pillars of precision.</span>
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                ref={(el) => (cardRefs.current[index] = el)}
                className={`group p-8 bg-card rounded-3xl shadow-apple hover:shadow-xl hover:-translate-y-2 transition-all duration-500 ${
                  visibleCards.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ 
                  transitionDelay: `${index * 150}ms`
                }}
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300">
                  <Icon className="w-7 h-7 text-primary" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;