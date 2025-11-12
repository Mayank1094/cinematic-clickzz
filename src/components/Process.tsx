import { MessageSquare, Scissors, Rocket } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useState, useEffect, useRef } from 'react';

const steps = [
  {
    number: '01',
    icon: MessageSquare,
    title: 'CONNECT',
    description: 'Share your vision and raw footage. Tell us your story, and send us the raw material.',
    color: 'text-primary',
  },
  {
    number: '02',
    icon: Scissors,
    title: 'CLICKZZ',
    description: 'We execute the precise 20-minute edit. Our team transforms your footage into cinematic gold.',
    color: 'text-secondary',
  },
  {
    number: '03',
    icon: Rocket,
    title: 'LAUNCH',
    description: 'Receive the final, high-definition reel. Ready to post, ready to impress, ready to go viral.',
    color: 'text-primary',
  },
];

const Process = () => {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = stepRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleSteps((prev) => [...prev, index]);
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
    <section id="process" className="py-32 bg-gradient-to-b from-muted/20 to-background relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-5xl md:text-6xl font-heading font-black text-gradient">
            OUR PROCESS
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Three simple steps from raw footage to viral content.
          </p>
        </div>

        {/* Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card
                key={index}
                ref={(el) => (stepRefs.current[index] = el)}
                className={`group relative overflow-hidden border-2 border-border hover:border-primary/50 transition-all duration-700 hover:shadow-2xl hover:shadow-primary/20 bg-gradient-to-b from-primary/5 to-background ${
                  visibleSteps.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ 
                  transitionDelay: `${index * 200}ms`
                }}
              >
                <CardHeader className="space-y-6 p-8">
                  {/* Icon */}
                  <div className="relative">
                    <div className="w-16 h-16 rounded-lg bg-card flex items-center justify-center border-2 border-border group-hover:border-primary/50 transition-all duration-500 group-hover:scale-110">
                      <Icon className={`w-8 h-8 ${step.color} group-hover:drop-shadow-glow transition-all`} />
                    </div>
                    
                    {/* Number Badge */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                      {step.number}
                    </div>
                  </div>

                  {/* Title */}
                  <CardTitle className="text-2xl font-heading font-black tracking-tight group-hover:text-primary transition-colors">
                    {step.title}
                  </CardTitle>

                  {/* Description */}
                  <CardDescription className="text-base text-muted-foreground leading-relaxed">
                    {step.description}
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

        {/* CTA */}
        <div className="text-center mt-20">
          <p className="text-2xl font-heading font-bold text-foreground mb-6">
            Ready to start your project?
          </p>
          <button
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-bold text-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-primary/50"
          >
            Get in Touch
            <Rocket className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Process;
