import { Star, Quote } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const testimonials = [
  {
    name: 'Dream High Badminton Academy',
    role: 'Badminton Academy',
    content: 'Clickzz transformed our raw Academy coaching footage into cinematic masterpieces. The 30-minute turnaround is unbelievable! Our clients are absolutely thrilled with the quality.',
    rating: 5,
  },
  {
    name: 'Ashapura Electricals',
    role: 'Electronic stores',
    content: 'We needed a way to showcase our new product line and our storefront. Clickzz delivered a reel that was sharp, fast-paced, and incredibly high-quality. Our customers loved it, and we saw a direct increase in foot traffic from social media.',
    rating: 5,
  },
  {
    name: 'Shreyas Kenikar',
    role: 'Rider',
    content: 'Clickzz turned my raw riding clips into pure cinematic gold. The speed, the quality, the editing—its all next-level. They delivered the final reel in just 30 minutes, faster than I could even pack up my gear.',
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
    <section id="testimonials" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold text-foreground mb-4">
            <span className="text-gradient-apple">Client stories.</span>{' '}
            <span className="text-muted-foreground">Real results.</span>
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              className={`group p-8 bg-card rounded-3xl shadow-apple hover:shadow-apple-hover transition-all duration-500 ${
                visibleCards.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ 
                transitionDelay: `${index * 150}ms`
              }}
            >
              {/* Quote Icon */}
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-6">
                <Quote className="w-6 h-6 text-primary" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-muted-foreground leading-relaxed mb-6 italic">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="pt-4 border-t border-border">
                <h4 className="font-semibold text-foreground">
                  {testimonial.name}
                </h4>
                <p className="text-sm text-muted-foreground mt-1">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;