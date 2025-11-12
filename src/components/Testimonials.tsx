import { Star, Quote } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useState, useEffect, useRef } from 'react';

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Wedding Photographer',
    content: 'Clickzz transformed our raw wedding footage into cinematic masterpieces. The 20-minute turnaround is unbelievable! Our clients are absolutely thrilled with the quality.',
    rating: 5,
  },
  {
    name: 'Rahul Mehta',
    role: 'Content Creator',
    content: 'Working with Clickzz has been game-changing for my content strategy. Their attention to detail and understanding of platform optimization is exceptional. Highly recommend!',
    rating: 5,
  },
  {
    name: 'Ananya Desai',
    role: 'Event Manager',
    content: 'The team at Clickzz delivers premium visuals every single time. Their partnership approach goes beyond just editing—they truly understand storytelling. Worth every penny!',
    rating: 5,
  },
];

const Testimonials = () => {
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
    <section id="testimonials" className="py-32 bg-gradient-to-b from-background to-muted/20 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-5xl md:text-6xl font-heading font-black text-gradient">
            CLIENT STORIES
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hear from creators who've transformed their content with Clickzz.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              className={`group relative overflow-hidden border-2 border-border hover:border-primary/50 transition-all duration-700 hover:shadow-2xl hover:shadow-primary/20 bg-gradient-to-b from-secondary/5 to-background ${
                visibleCards.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ 
                transitionDelay: `${index * 200}ms`
              }}
            >
              <CardHeader className="space-y-6 p-8">
                {/* Quote Icon */}
                <div className="relative">
                  <div className="w-16 h-16 rounded-lg bg-card flex items-center justify-center border-2 border-border group-hover:border-primary/50 transition-all duration-500 group-hover:scale-110">
                    <Quote className="w-8 h-8 text-primary group-hover:drop-shadow-glow transition-all" />
                  </div>
                </div>

                {/* Rating */}
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>

                {/* Content */}
                <CardDescription className="text-base text-muted-foreground leading-relaxed italic">
                  "{testimonial.content}"
                </CardDescription>

                {/* Author */}
                <div className="pt-4 border-t border-border">
                  <CardTitle className="text-lg font-heading font-black tracking-tight group-hover:text-primary transition-colors">
                    {testimonial.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{testimonial.role}</p>
                </div>

                {/* Animated Border */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-700" />
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Bottom Accent Line */}
        <div className="mt-20 max-w-7xl mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
