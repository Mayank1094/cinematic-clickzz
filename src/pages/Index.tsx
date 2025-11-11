import { useState } from 'react';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Portfolio from '@/components/Portfolio';
import Gallery from '@/components/Gallery';
import Services from '@/components/Services';
import Process from '@/components/Process';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <Hero onGalleryToggle={() => setIsGalleryOpen(!isGalleryOpen)} />
      <Portfolio />
      <Gallery isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} />
      <Services />
      <Process />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
