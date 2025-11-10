import { useState } from 'react';
import { Play } from 'lucide-react';
import reel1 from '@/assets/reel-1.jpg';
import reel2 from '@/assets/reel-2.jpg';
import reel3 from '@/assets/reel-3.jpg';
import reel4 from '@/assets/reel-4.jpg';
import reel5 from '@/assets/reel-5.jpg';
import reel6 from '@/assets/reel-6.jpg';

const reels = [
  { id: 1, image: reel1, title: 'Speed & Motion', category: 'Automotive' },
  { id: 2, image: reel2, title: 'Action Sports', category: 'Extreme' },
  { id: 3, image: reel3, title: 'Urban Stories', category: 'Lifestyle' },
  { id: 4, image: reel4, title: 'Racing Dynamics', category: 'Automotive' },
  { id: 5, image: reel5, title: 'Fitness Power', category: 'Sports' },
  { id: 6, image: reel6, title: 'Adventure', category: 'Travel' },
];

const Portfolio = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

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
          {reels.map((reel) => (
            <div
              key={reel.id}
              className="group relative aspect-square overflow-hidden rounded-lg bg-card shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
              onMouseEnter={() => setHoveredId(reel.id)}
              onMouseLeave={() => setHoveredId(null)}
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

        {/* View More CTA */}
        <div className="text-center mt-16">
          <a 
            href="https://www.instagram.com/clickzz.in" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-lg font-semibold text-primary hover:text-secondary transition-colors group"
          >
            View Full Portfolio on Instagram
            <Play className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
