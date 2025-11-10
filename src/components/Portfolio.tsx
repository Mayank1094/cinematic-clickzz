import { useState, useEffect, useRef } from 'react';
import { Play, X } from 'lucide-react';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import reel1 from '@/assets/reel-1.jpg';
import reel2 from '@/assets/reel-2.jpg';
import reel3 from '@/assets/reel-3.jpg';
import reel4 from '@/assets/reel-4.jpg';
import reel5 from '@/assets/reel-5.jpg';
import reel6 from '@/assets/reel-6.jpg';

const reels = [
  { id: 1, image: reel1, title: 'Speed & Motion', category: 'Automotive', videoUrl: 'https://www.instagram.com/reel/DQokYWPEtvD/?igsh=MWdqeHI5NWQ4NHJrOA==' },
  { id: 2, image: reel2, title: 'Action Sports', category: 'Extreme', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 3, image: reel3, title: 'Urban Stories', category: 'Lifestyle', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 4, image: reel4, title: 'Racing Dynamics', category: 'Automotive', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 5, image: reel5, title: 'Fitness Power', category: 'Sports', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 6, image: reel6, title: 'Adventure', category: 'Travel', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
];

const Portfolio = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = itemRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleItems((prev) => [...prev, index]);
            }
          });
        },
        { threshold: 0.2 }
      );
      
      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  return (
    <section id="work" className="py-32 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl md:text-6xl font-heading font-black text-gradient">
            OUR WORK
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Cinematic reels that capture speed, precision, and storytelling—shot on iPhone, edited to perfection.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {reels.map((reel, index) => (
            <div
              key={reel.id}
              ref={(el) => (itemRefs.current[index] = el)}
              className={`group relative aspect-square overflow-hidden rounded-lg bg-card shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer ${
                visibleItems.includes(index) ? 'animate-fade-in opacity-100' : 'opacity-0'
              }`}
              style={{ 
                animationDelay: `${(index % 3) * 150}ms`,
                transitionDelay: `${(index % 3) * 150}ms`
              }}
              onMouseEnter={() => setHoveredId(reel.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => setSelectedVideo(reel.videoUrl)}
            >
              {/* Image */}
              <img
                src={reel.image}
                alt={reel.title}
                className={`w-full h-full object-cover transition-all duration-700 ${
                  hoveredId === reel.id ? 'scale-110 brightness-75' : 'scale-100'
                }`}
              />

              {/* Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent transition-opacity duration-500 ${
                  hoveredId === reel.id ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 p-6">
                  {/* Play Icon */}
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 glow-yellow">
                    <Play className="w-8 h-8 text-primary-foreground fill-current" />
                  </div>

                  {/* Title & Category */}
                  <div className="text-center space-y-2">
                    <h3 className="text-2xl font-heading font-bold text-foreground">
                      {reel.title}
                    </h3>
                    <p className="text-sm text-primary uppercase tracking-wide font-semibold">
                      {reel.category}
                    </p>
                  </div>
                </div>
              </div>

              {/* Accent Border on Hover */}
              <div
                className={`absolute inset-0 border-4 border-primary rounded-lg transition-opacity duration-500 pointer-events-none ${
                  hoveredId === reel.id ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </div>
          ))}
        </div>

        {/* Video Modal */}
        <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
          <DialogContent className="max-w-5xl w-full p-0 bg-background border-2 border-primary overflow-hidden">
            <DialogClose className="absolute top-4 right-4 z-50 rounded-full bg-background/80 p-2 hover:bg-background transition-colors">
              <X className="h-6 w-6 text-foreground" />
            </DialogClose>
            
            {selectedVideo && (
              <div className="relative w-full pt-[56.25%]">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={selectedVideo}
                  title="Video Player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Portfolio;
