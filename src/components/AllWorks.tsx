import { useState, useRef } from 'react';
import { Play, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import reel1 from '@/assets/reel-1.jpg';
import reel2 from '@/assets/reel-2.jpg';
import reel3 from '@/assets/reel-3.jpg';
import reel4 from '@/assets/reel-4.jpg';
import reel5 from '@/assets/reel-5.jpg';
import reel6 from '@/assets/reel-6.jpg';

// Local Video Imports
import post1 from '@/assets/post1.mp4';
import post2 from '@/assets/post2.mp4';
import post3 from '@/assets/post3.mp4';
import post4 from '@/assets/post4.mp4';
import post5 from '@/assets/post5.mp4';
import post6 from '@/assets/post6.mp4';

const works = [
  { 
    id: 1, 
    image: reel4, 
    title: 'Premium Edit', 
    subtitle: 'Full Production',
    category: 'Cinematic',
    localVideo: post1 // post1 is now first
  },
  { 
    id: 2, 
    image: reel1, 
    title: 'Cinematic Reel', 
    subtitle: 'Speed & Motion',
    category: 'Automotive',
    localVideo: post2 
  },
  { 
    id: 3, 
    image: reel2, 
    title: 'Action Sports', 
    subtitle: 'Extreme Edition',
    category: 'Sports',
    localVideo: post3 
  },
  { 
    id: 4, 
    image: reel3, 
    title: 'Urban Stories', 
    subtitle: 'City Vibes',
    category: 'Lifestyle',
    localVideo: post4
  },
  { 
    id: 5, 
    image: reel5, 
    title: 'Brand Story', 
    subtitle: 'Visual Identity',
    category: 'Commercial',
    localVideo: post5
  },
  { 
    id: 6, 
    image: reel6, 
    title: 'Event Highlight', 
    subtitle: 'Moments Captured',
    category: 'Events',
    localVideo: post6
  },
];

const AllWorks = () => {
  const [selectedVideo, setSelectedVideo] = useState<{ url?: string; local?: string } | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 420;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleCardClick = (work: typeof works[0]) => {
    if (work.localVideo) {
      setSelectedVideo({ local: work.localVideo });
    }
  };

  return (
    <section id="work" className="py-20 bg-background">
      <div className="max-w-full">
        {/* Section Header */}
        <div className="container mx-auto px-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-4xl md:text-5xl font-semibold text-foreground mb-2">
                <span className="text-gradient-apple">All Works.</span>{' '}
                <span className="text-muted-foreground">Our best creations.</span>
              </h2>
            </div>
            
            <div 
              className="hidden md:flex items-center gap-2 px-6 py-3 bg-muted rounded-full cursor-default"
            >
              <span className="text-sm font-medium text-muted-foreground">All Works</span>
            </div>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-background/80 backdrop-blur-sm border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors shadow-apple"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-background/80 backdrop-blur-sm border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors shadow-apple"
          >
            <ChevronRight className="w-6 h-6 text-foreground" />
          </button>

          {/* Scrollable Cards Container */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-6 pb-4"
            style={{ scrollPaddingLeft: '24px' }}
          >
            {works.map((work) => (
              <div
                key={work.id}
                onClick={() => handleCardClick(work)}
                onMouseEnter={() => setHoveredId(work.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="flex-shrink-0 w-[380px] snap-start cursor-pointer group"
              >
                {/* Apple-style Card */}
                <div className="bg-card rounded-3xl overflow-hidden shadow-apple hover:shadow-apple-hover transition-all duration-500 h-[520px] flex flex-col">
                  {/* Card Header - Text Content */}
                  <div className="p-8 pb-4">
                    <h3 className="text-2xl font-semibold text-foreground mb-1">
                      {work.title}
                    </h3>
                    <p className="text-lg text-gradient-apple font-medium">
                      {work.subtitle}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {work.category}
                    </p>
                  </div>

                  {/* Card Image */}
                  <div className="flex-1 relative overflow-hidden">
                    <img
                      src={work.image}
                      alt={work.title}
                      className={`w-full h-full object-cover transition-transform duration-700 ${
                        hoveredId === work.id ? 'scale-110' : 'scale-100'
                      }`}
                    />
                    
                    {/* Play Overlay */}
                    <div 
                      className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity duration-300 ${
                        hoveredId === work.id ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                        <Play className="w-7 h-7 text-foreground fill-current ml-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* HD Button */}
        <div className="container mx-auto px-6 mt-8 text-center">
          <Button
            asChild
            variant="apple-outline"
            size="lg"
            className="text-base"
          >
            <a 
              href="https://drive.google.com/drive/folders/1cDPDdl3IZE_egO0jO8f2sgycEDu9xuxI" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              View All in HD
            </a>
          </Button>
        </div>
      </div>

      {/* Video Modal */}
      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-sm w-full p-0 bg-background border border-border overflow-hidden rounded-2xl">
          <DialogClose className="absolute top-4 right-4 z-50 rounded-full bg-background/80 p-2 hover:bg-muted transition-colors">
            <X className="h-5 w-5 text-foreground" />
          </DialogClose>
          
          {selectedVideo && (
            <div className="relative w-full pt-[130%]">
              {selectedVideo.local && (
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  src={selectedVideo.local}
                  controls
                  autoPlay
                  playsInline
                />
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default AllWorks;
