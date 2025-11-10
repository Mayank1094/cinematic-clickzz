import { MessageSquare, Scissors, Rocket } from 'lucide-react';
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
    <section id="process" className="py-32 bg-gradient-to-b from-background to-muted/20 relative">
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

        {/* Timeline */}
        <div className="max-w-6xl mx-auto relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-30" />

          {/* Steps */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  ref={(el) => (stepRefs.current[index] = el)}
                  className={`relative group transition-all duration-700 ${
                    visibleSteps.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  {/* Card */}
                  <div className="relative bg-card border-2 border-border rounded-xl p-8 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2">
                    {/* Number Badge */}
                    <div className="absolute -top-6 left-8 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-heading font-black shadow-lg">
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div className="mt-8 mb-6">
                      <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-muted to-background flex items-center justify-center border-2 border-border group-hover:border-primary/50 transition-all duration-500 group-hover:scale-110">
                        <Icon className={`w-8 h-8 ${step.color}`} />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-heading font-black mb-4 group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>

                    {/* Bottom Accent */}
                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-700 rounded-b-xl" />
                  </div>

                  {/* Arrow Connector - Desktop Only */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-24 -right-4 w-8 h-8 transform rotate-45 border-t-2 border-r-2 border-primary opacity-30" />
                  )}
                </div>
              );
            })}
          </div>
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
