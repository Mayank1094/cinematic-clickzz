import { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Import video files from assets folder
// Make sure to add post1.mp4 to post10.mp4 in src/assets folder
const defaultVideos: string[] = [
  '/src/assets/post1.mp4',
  '/src/assets/post2.mp4',
  '/src/assets/post3.mp4',
  '/src/assets/post4.mp4',
  '/src/assets/post5.mp4',
  '/src/assets/post6.mp4',
  '/src/assets/post7.mp4',
  '/src/assets/post8.mp4',
  '/src/assets/post9.mp4',
  '/src/assets/post10.mp4',
];

const Gallery = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [visibleVideos, setVisibleVideos] = useState<number[]>([]);
  const [uploadedVideos, setUploadedVideos] = useState<string[]>([]);
  const videoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Combine default videos with uploaded ones
  const allVideos = [...defaultVideos, ...uploadedVideos];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newVideos = Array.from(files).map(file => URL.createObjectURL(file));
    setUploadedVideos(prev => [...prev, ...newVideos]);
  };

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
  }, [isExpanded, allVideos.length]);

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

        {/* Upload Section */}
        {isExpanded && (
          <div className="mb-8 animate-fade-in">
            <div className="flex justify-center">
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                size="lg"
                className="gap-2"
              >
                <Upload className="w-5 h-5" />
                Upload Videos
              </Button>
              <Input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                multiple
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </div>
        )}

        {/* Expandable Video Grid */}
        {isExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto animate-fade-in">
            {allVideos.map((videoUrl, index) => (
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
