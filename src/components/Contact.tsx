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

    const { fullName, phoneNumber, email, eventDate, eventType, homeAddress } = validation.data;
    const whatsappNumber = '919900893382';
    const whatsappMessage = `*New Booking Request*\n\n*Full Name:* ${fullName}\n*Phone:* ${phoneNumber}\n*Email:* ${email}\n*Event Date:* ${eventDate}\n*Event Type:* ${eventType}\n*Home Address:* ${homeAddress}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    localStorage.setItem('lastContactSubmit', now.toString());
    
    window.open(whatsappUrl, '_blank');

    setFormData({ fullName: '', phoneNumber: '', email: '', eventDate: '', eventType: 'Wedding', homeAddress: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-semibold text-foreground mb-4">
              <span className="text-gradient-apple">Book your date.</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Fill the form below. We will contact you to confirm details.
            </p>
          </div>

          {/* Booking Form */}
          <div className="bg-background border border-border rounded-3xl p-8 md:p-10 shadow-apple">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Row 1: Full Name & Phone Number */}
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="fullName" className="text-sm font-medium text-foreground">
                    Full Name
                  </label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Your Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="bg-muted/50 border-border rounded-xl h-12 focus:ring-primary"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phoneNumber" className="text-sm font-medium text-foreground">
                    Phone Number
                  </label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    placeholder="+91 1234567899"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="bg-muted/50 border-border rounded-xl h-12 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Row 2: Email Address */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="abc@gmail.com.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-muted/50 border-border rounded-xl h-12 focus:ring-primary"
                />
              </div>

              {/* Row 3: Event Date & Event Type */}
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="eventDate" className="text-sm font-medium text-foreground">
                    Event Date
                  </label>
                  <Input
                    id="eventDate"
                    name="eventDate"
                    type="date"
                    value={formData.eventDate}
                    onChange={handleChange}
                    className="bg-muted/50 border-border rounded-xl h-12 focus:ring-primary"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="eventType" className="text-sm font-medium text-foreground">
                    Event Type
                  </label>
                  <select
                    id="eventType"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    className="w-full h-12 px-4 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
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
                <label htmlFor="homeAddress" className="text-sm font-medium text-foreground">
                  Home Address
                </label>
                <Textarea
                  id="homeAddress"
                  name="homeAddress"
                  placeholder="Enter your full address..."
                  value={formData.homeAddress}
                  onChange={handleChange}
                  rows={3}
                  className="bg-muted/50 border-border rounded-xl focus:ring-primary resize-none"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="apple"
                size="lg"
                className="w-full h-12 text-base mt-4"
              >
                Book Now
              </Button>
            </form>
          </div>

          {/* Contact Info Below Form */}
          <div className="mt-10 grid md:grid-cols-2 gap-4">
            {/* Email */}
            <a
              href="mailto:clickzz.in1@gmail.com"
              className="flex items-center gap-4 p-5 bg-background border border-border rounded-2xl hover:shadow-apple transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <Mail className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <span className="font-medium text-foreground">clickzz.in1@gmail.com</span>
              </div>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/clickzz.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 bg-background border border-border rounded-2xl hover:shadow-apple transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <Instagram className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Instagram</p>
                <span className="font-medium text-foreground">@clickzz.in</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
