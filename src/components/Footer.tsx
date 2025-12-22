import { Instagram, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-foreground">
              CLICKZZ.IN
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Precision visuals in 30 minutes. Your partner in cinematic content creation.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {['Work', 'Services', 'Process', 'Contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">
              Services
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>30-Minute Reels</li>
              <li>Cinematic Editing</li>
              <li>Content Strategy</li>
              <li>iPhone Cinematography</li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">
              Connect
            </h4>
            <div className="space-y-2">
              <a
                href="https://www.instagram.com/clickzz.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Instagram className="w-4 h-4" />
                <span>clickzz.in</span>
              </a>
              <a
                href="mailto:clickzz.in1@gmail.com"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>clickzz.in1@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} CLICKZZ.IN. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <button className="hover:text-foreground transition-colors">
                Privacy Policy
              </button>
              <button className="hover:text-foreground transition-colors">
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;