import { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Replace these URLs with your actual Instagram reel embed URLs
// Format: https://www.instagram.com/reel/REEL_ID/embed/
const instagramReels = [
  'https://www.instagram.com/reel/DQokYWPEtvD/embed/',
  'https://www.instagram.com/reel/DPvZLdJEq35/embed/',
  'https://www.instagram.com/reel/REEL_ID_3/embed/',
  'https://www.instagram.com/reel/REEL_ID_4/embed/',
  'https://www.instagram.com/reel/REEL_ID_5/embed/',
  'https://www.instagram.com/reel/REEL_ID_6/embed/',
  'https://www.instagram.com/reel/REEL_ID_7/embed/',
  'https://www.instagram.com/reel/REEL_ID_8/embed/',
  'https://www.instagram.com/reel/REEL_ID_9/embed/',
];

const Gallery = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [visibleReels, setVisibleReels] = useState<number[]>([]);
  const reelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!isExpanded) return;
    
    const observers = reelRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleReels((prev) => [...prev, index]);
            }
          });
        },
        { threshold: 0.1 }
      );
      
      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, [isExpanded]);

  return (
    <section id="gallery" className="py-16 bg-gradient-to-b from-muted/20 to-background border-t-2 border-primary/20">
      <div className="container mx-auto px-6">
        {/* Toggle Button */}
        <div className="text-center mb-8">
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            size="lg"
            className="group bg-primary text-primary-foreground hover:bg-primary/90 px-12 py-6 text-xl font-bold shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:scale-105"
          >
            ALL WORKS
            {isExpanded ? (
              <ChevronUp className="ml-2 w-6 h-6 group-hover:-translate-y-1 transition-transform" />
            ) : (
              <ChevronDown className="ml-2 w-6 h-6 group-hover:translate-y-1 transition-transform" />
            )}
          </Button>
        </div>

        {/* Expandable Instagram Reels Grid */}
        {isExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto animate-fade-in">
            {instagramReels.map((reelUrl, index) => (
              <div
                key={index}
                ref={(el) => (reelRefs.current[index] = el)}
                className={`relative overflow-hidden rounded-lg bg-card shadow-lg transition-all duration-700 ${
                  visibleReels.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ 
                  transitionDelay: `${(index % 3) * 150}ms`,
                }}
              >
                {/* Portrait aspect ratio for Instagram Reels */}
                <div className="relative w-full pt-[177.78%]">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={reelUrl}
                    title={`Instagram Reel ${index + 1}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
