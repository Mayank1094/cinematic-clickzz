import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import AllWorks from '@/components/AllWorks';
import Services from '@/components/Services';
import Process from '@/components/Process';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  const scrollToWork = () => {
    const element = document.getElementById('work');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <Hero onGalleryClick={scrollToWork} />
      <AllWorks />
      <Services />
      <Process />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;