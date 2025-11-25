import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Instagram, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const contactSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required").max(100, "Name must be less than 100 characters"),
  phoneNumber: z.string().trim().min(10, "Valid phone number is required").max(15, "Phone number must be less than 15 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  eventDate: z.string().trim().min(1, "Event date is required"),
  eventType: z.string().trim().min(1, "Event type is required"),
  homeAddress: z.string().trim().min(1, "Home address is required").max(500, "Address must be less than 500 characters"),
});

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    eventDate: '',
    eventType: 'Wedding',
    homeAddress: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check rate limiting (5 minutes cooldown)
    const lastSubmitTime = localStorage.getItem('lastContactSubmit');
    const now = Date.now();
    const fiveMinutes = 5 * 60 * 1000;
    
    if (lastSubmitTime && (now - parseInt(lastSubmitTime)) < fiveMinutes) {
      const remainingTime = Math.ceil((fiveMinutes - (now - parseInt(lastSubmitTime))) / 60000);
      toast({
        title: 'Please Wait',
        description: `You can submit another message in ${remainingTime} minute(s).`,
        variant: 'destructive',
      });
      return;
    }
    
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
    const { fullName, phoneNumber, email, eventDate, eventType, homeAddress } = validation.data;
    const whatsappNumber = '919900893382';
    const whatsappMessage = `*New Booking Request*\n\n*Full Name:* ${fullName}\n*Phone:* ${phoneNumber}\n*Email:* ${email}\n*Event Date:* ${eventDate}\n*Event Type:* ${eventType}\n*Home Address:* ${homeAddress}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Store submission time
    localStorage.setItem('lastContactSubmit', now.toString());
    
    window.open(whatsappUrl, '_blank');

    // Reset form
    setFormData({ fullName: '', phoneNumber: '', email: '', eventDate: '', eventType: 'Wedding', homeAddress: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 space-y-3">
            <h2 className="text-5xl md:text-6xl font-heading font-black text-foreground">
              Book Your Date
            </h2>
            <p className="text-lg text-muted-foreground">
              Fill the form below. We will contact you to confirm details.
            </p>
          </div>

          {/* Booking Form */}
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 md:p-12 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Full Name & Phone Number */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="fullName" className="text-sm font-semibold text-primary uppercase tracking-wide">
                    Full Name
                  </label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="bg-background/50 border border-border rounded-lg focus:border-primary transition-colors h-12"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phoneNumber" className="text-sm font-semibold text-primary uppercase tracking-wide">
                    Phone Number
                  </label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="bg-background/50 border border-border rounded-lg focus:border-primary transition-colors h-12"
                  />
                </div>
              </div>

              {/* Row 2: Email Address */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold text-primary uppercase tracking-wide">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-background/50 border border-border rounded-lg focus:border-primary transition-colors h-12"
                />
              </div>

              {/* Row 3: Event Date & Event Type */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="eventDate" className="text-sm font-semibold text-primary uppercase tracking-wide">
                    Event Date
                  </label>
                  <Input
                    id="eventDate"
                    name="eventDate"
                    type="date"
                    value={formData.eventDate}
                    onChange={handleChange}
                    className="bg-background/50 border border-border rounded-lg focus:border-primary transition-colors h-12"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="eventType" className="text-sm font-semibold text-primary uppercase tracking-wide">
                    Event Type
                  </label>
                  <select
                    id="eventType"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    className="w-full h-12 px-3 bg-background/50 border border-border rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors text-foreground"
                  >
                    <option value="Wedding">Wedding</option>
                    <option value="Pre-Wedding">Pre-Wedding</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Corporate Event">Corporate Event</option>
                    <option value="Music Video">Music Video</option>
                    <option value="Product Launch">Product Launch</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Home Address */}
              <div className="space-y-2">
                <label htmlFor="homeAddress" className="text-sm font-semibold text-primary uppercase tracking-wide">
                  Home Address
                </label>
                <Textarea
                  id="homeAddress"
                  name="homeAddress"
                  placeholder="Enter your full address..."
                  value={formData.homeAddress}
                  onChange={handleChange}
                  rows={3}
                  className="bg-background/50 border border-border rounded-lg focus:border-primary transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-lg shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:scale-[1.02] h-12 mt-8"
              >
                Book Now
              </Button>
            </form>
          </div>

          {/* Contact Info Below Form */}
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            {/* Email */}
            <a
              href="mailto:clickzz.in1@gmail.com"
              className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg text-foreground hover:text-primary hover:border-primary transition-all group"
            >
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Email</p>
                <span className="font-semibold">clickzz.in1@gmail.com</span>
              </div>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/clickzz.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg text-foreground hover:text-secondary hover:border-secondary transition-all group"
            >
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                <Instagram className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Instagram</p>
                <span className="font-semibold">@clickzz.in</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
