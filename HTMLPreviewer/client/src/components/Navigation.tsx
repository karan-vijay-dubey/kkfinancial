import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/services", label: "Services" },
    { path: "/calculator", label: "Calculator" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b transition-all duration-300 ${
        isScrolled ? "shadow-md" : "shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 cursor-pointer group" data-testid="link-logo">
            <div className="w-10 h-10 gradient-bg-blue-teal rounded-lg flex items-center justify-center shadow-md group-hover:-translate-y-0.5 transition-transform">
              <span className="text-white font-bold text-xl">K</span>
            </div>
            <span className="font-bold text-lg text-foreground tracking-tight">
              kkfinancial2016
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                href={link.path}
                className={`relative px-3 py-2 font-medium text-sm transition-colors hover:text-primary ${
                  location === link.path ? "text-primary" : "text-muted-foreground"
                }`}
                data-testid={`link-nav-${link.label.toLowerCase()}`}
              >
                {link.label}
                {location === link.path && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 gradient-bg-blue-teal rounded-full" />
                )}
              </Link>
            ))}
            <a
              href="tel:+919372267693"
              className="gradient-bg-blue-teal text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all flex items-center gap-2"
              data-testid="button-call-nav"
            >
              <i className="fas fa-phone text-xs"></i>
              Call Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Toggle menu"
            data-testid="button-menu-toggle"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`block h-0.5 w-full bg-foreground transition-all ${
                  isMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-foreground transition-all ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-foreground transition-all ${
                  isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white shadow-lg">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                href={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-2 rounded-lg font-medium transition-colors ${
                  location === link.path
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted"
                }`}
                data-testid={`link-mobile-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="tel:+919372267693"
              className="block gradient-bg-blue-teal text-white px-4 py-2 rounded-lg font-semibold text-center shadow-md"
              data-testid="button-call-mobile"
            >
              <i className="fas fa-phone mr-2"></i>
              Call Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
