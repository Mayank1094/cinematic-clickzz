import { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

// JioCloud video URLs - Add your JioCloud direct public links here
const defaultVideos: string[] = [
  'https://www.jiocloud.com/l/?u=G-64Js0SUl_dWmRGQWfCPf9AlDJVRvsq7iqzwzV3FlWHB105_d6Jfu7KiL5GKrXlMZA',
  // Add more JioCloud video links below
  // 'https://www.jiocloud.com/l/?u=YOUR_VIDEO_LINK_2',
  // 'https://www.jiocloud.com/l/?u=YOUR_VIDEO_LINK_3',
  // 'https://www.jiocloud.com/l/?u=YOUR_VIDEO_LINK_4',
  // 'https://www.jiocloud.com/l/?u=YOUR_VIDEO_LINK_5',
  // 'https://www.jiocloud.com/l/?u=YOUR_VIDEO_LINK_6',
  // 'https://www.jiocloud.com/l/?u=YOUR_VIDEO_LINK_7',
  // 'https://www.jiocloud.com/l/?u=YOUR_VIDEO_LINK_8',
  // 'https://www.jiocloud.com/l/?u=YOUR_VIDEO_LINK_9',
  // 'https://www.jiocloud.com/l/?u=YOUR_VIDEO_LINK_10',
];

const Gallery = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [visibleVideos, setVisibleVideos] = useState<number[]>([]);
  const videoRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!isExpanded) return;
    
    const observers = videoRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleVideos((prev) => [...prev, index]);
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

        {/* Expandable Video Grid */}
        {isExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto animate-fade-in">
            {defaultVideos.map((videoUrl, index) => (
                <div
                  key={index}
                  ref={(el) => (videoRefs.current[index] = el)}
                  className={`relative overflow-hidden rounded-lg bg-card shadow-lg transition-all duration-700 ${
                    visibleVideos.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ 
                    transitionDelay: `${(index % 3) * 150}ms`,
                  }}
                >
                  {/* Portrait aspect ratio for vertical videos */}
                  <div className="relative w-full pt-[177.78%]">
                    <video
                      className="absolute inset-0 w-full h-full object-cover"
                      src={videoUrl}
                      controls
                      playsInline
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
