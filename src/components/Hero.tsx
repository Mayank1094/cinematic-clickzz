import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const Hero = ({ onGalleryClick }: { onGalleryClick: () => void }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#f5f5f7]"
    >
      {/* Clean gradient background - no image */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#f5f5f7] via-background to-background" />

      {/* Content */}
      <div className="container mx-auto px-6 py-32 relative z-10">
        <div className={`max-w-4xl mx-auto text-center space-y-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <span className="text-sm font-medium text-muted-foreground">30-MINUTE TURNAROUND</span>
          </div>

          {/* Main Headline */}
          <h1 className={`text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight tracking-tight transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Turning moments
            <br />
            <span className="text-gradient-apple">into masterpieces.</span>
          </h1>

          {/* Sub-headline */}
          <p className={`text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Media Agency specializing in cinematic reel edits, 
            delivered in just 30 minutes.
          </p>

          {/* CTA Buttons - Apple style */}
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Button
              onClick={scrollToContact}
              variant="apple"
              size="lg"
              className="px-8 py-3 text-lg"
            >
              Start Your Reel
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              onClick={onGalleryClick}
              variant="apple-outline"
              size="lg"
              className="text-lg"
            >
              View Gallery
              <ArrowRight className="ml-1 w-4 h-4" />
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className={`grid grid-cols-3 gap-8 pt-16 max-w-2xl mx-auto transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="text-center space-y-1">
              <div className="text-4xl font-semibold text-foreground">30</div>
              <div className="text-sm text-muted-foreground">Minutes</div>
            </div>
            <div className="text-center space-y-1">
              <div className="text-4xl font-semibold text-foreground">4K</div>
              <div className="text-sm text-muted-foreground">Quality</div>
            </div>
            <div className="text-center space-y-1">
              <div className="text-4xl font-semibold text-foreground">100%</div>
              <div className="text-sm text-muted-foreground">Cinematic</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-muted-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;