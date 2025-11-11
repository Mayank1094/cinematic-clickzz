import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Instagram, Mail, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
});

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    const validation = contactSchema.safeParse(formData);
    
    if (!validation.success) {
      const firstError = validation.error.errors[0];
      toast({
        title: 'Invalid Input',
        description: firstError.message,
        variant: 'destructive',
      });
      return;
    }

    // Send to WhatsApp
    const { name, email, message } = validation.data;
    const whatsappNumber = '916361536052';
    const whatsappMessage = `*New Contact Form Submission*\n\n*Name:* ${name}\n*Email:* ${email}\n*Message:* ${message}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    window.open(whatsappUrl, '_blank');

    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-32 bg-gradient-to-b from-muted/20 to-background relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-5xl md:text-6xl font-heading font-black text-gradient">
              LET'S CONNECT
            </h2>
            <p className="text-xl text-muted-foreground">
              Ready to create something extraordinary? Reach out and let's make it happen.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-semibold text-foreground uppercase tracking-wide">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-card border-2 border-border focus:border-primary transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold text-foreground uppercase tracking-wide">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-card border-2 border-border focus:border-primary transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-semibold text-foreground uppercase tracking-wide">
                    Project Details
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your project..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="bg-card border-2 border-border focus:border-primary transition-colors resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-lg shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:scale-105"
                >
                  Send Message
                  <Send className="ml-2 w-5 h-5" />
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              {/* Info Card */}
              <div className="bg-card border-2 border-border rounded-xl p-8 space-y-6">
                <div>
                  <h3 className="text-2xl font-heading font-black mb-4">Get in Touch</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Whether you need a quick turnaround or a long-term content partnership, we're here to help bring your vision to life.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Email */}
                  <a
                    href="mailto:hello@clickzz.in"
                    className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <span className="font-medium">hello@clickzz.in</span>
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/clickzz.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-foreground hover:text-secondary transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <span className="font-medium">@clickzz.in</span>
                  </a>
                </div>
              </div>

              {/* Stats Card */}
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20 rounded-xl p-8">
                <h4 className="text-xl font-heading font-black mb-4">Why Choose Us?</h4>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">⚡</span>
                    <span>Lightning-fast 20-minute turnaround</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">🎬</span>
                    <span>Cinematic quality from iPhone footage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">🤝</span>
                    <span>Strategic content partnership</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">📱</span>
                    <span>Optimized for all social platforms</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
