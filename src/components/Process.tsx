import { MessageSquare, Scissors, Rocket } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

const steps = [
  {
    number: '01',
    icon: MessageSquare,
    title: 'Connect',
    description: 'Share your vision and raw footage. Tell us your story, and send us the raw material.',
  },
  {
    number: '02',
    icon: Scissors,
    title: 'Clickzz',
    description: 'We execute the precise 30-minute edit. Our team transforms your footage into cinematic gold.',
  },
  {
    number: '03',
    icon: Rocket,
    title: 'Launch',
    description: 'Receive the final, high-definition reel. Ready to post, ready to impress, ready to go viral.',
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
    <section id="process" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold text-foreground mb-4">
            <span className="text-gradient-apple">Our process.</span>{' '}
            <span className="text-muted-foreground">Simple and effective.</span>
          </h2>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                ref={(el) => (stepRefs.current[index] = el)}
                className={`group relative p-8 bg-background rounded-3xl shadow-apple hover:shadow-apple-hover transition-all duration-500 ${
                  visibleSteps.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ 
                  transitionDelay: `${index * 150}ms`
                }}
              >
                {/* Step Number */}
                <span className="absolute top-6 right-6 text-5xl font-bold text-muted/50">
                  {step.number}
                </span>

                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-7 h-7 text-primary" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-xl text-foreground mb-6">
            Ready to start your project?
          </p>
          <Button
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            variant="apple"
            size="lg"
            className="text-lg px-8"
          >
            Get in Touch
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Process;