import { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Add your video files to src/assets and import them here
// Example: import video1 from '@/assets/video1.mp4';
const videos: string[] = [
  // Add your video paths here
  // video1,
  // video2,
];

const Gallery = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [visibleVideos, setVisibleVideos] = useState<number[]>([]);
  const [uploadedVideos, setUploadedVideos] = useState<string[]>(videos);
  const videoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
  }, [isExpanded, uploadedVideos.length]);

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
            {uploadedVideos.length === 0 ? (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                <Upload className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">No videos yet. Upload your first video to get started!</p>
              </div>
            ) : (
              uploadedVideos.map((videoUrl, index) => (
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
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
