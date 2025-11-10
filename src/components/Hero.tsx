import { Button } from '@/components/ui/button';
import { ArrowRight, Zap } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';

const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-32 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 backdrop-blur-sm border border-primary/20 animate-pulse-glow">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">20-MINUTE TURNAROUND</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black leading-none tracking-tighter">
            PRECISION VISUALS.
            <br />
            <span className="text-gradient">UNLOCKED.</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Media Agency specializing in <span className="text-primary font-semibold">cinematic reel edits</span>, 
            delivered in just <span className="text-secondary font-semibold">20 minutes</span>.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button
              onClick={scrollToContact}
              size="lg"
              className="group bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-bold shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:scale-105"
            >
              START YOUR REEL
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <a 
              href="https://www.instagram.com/clickzz.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group"
            >
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-6 text-lg font-bold border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground transition-all duration-300"
              >
                VIEW PORTFOLIO
              </Button>
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-3 gap-8 pt-16 max-w-3xl mx-auto">
            <div className="text-center space-y-2">
              <div className="text-4xl font-heading font-black text-gradient">20</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">Minutes</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-heading font-black text-gradient">4K</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">Quality</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-heading font-black text-gradient">100%</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">Cinematic</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-primary rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
