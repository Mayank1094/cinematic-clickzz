import { useState, useEffect, useRef } from 'react';

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
  const [visibleReels, setVisibleReels] = useState<number[]>([]);
  const reelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
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
  }, []);

  return (
    <section id="gallery" className="py-32 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl md:text-6xl font-heading font-black text-gradient">
            ALL WORK
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Every reel we've crafted—precision, speed, and cinematic storytelling in action.
          </p>
        </div>

        {/* Instagram Reels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
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
      </div>
    </section>
  );
};

export default Gallery;
