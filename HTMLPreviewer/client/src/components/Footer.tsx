import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 to-slate-800 text-white mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 gradient-bg-blue-teal rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-xl">K</span>
              </div>
              <span className="font-bold text-lg">kkfinancial2016</span>
            </div>
            <p className="text-sm text-gray-300">
              Unlock Your Financial Future
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/">
                  <a className="text-gray-300 hover:text-white transition-colors" data-testid="link-footer-home">
                    Home
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="text-gray-300 hover:text-white transition-colors" data-testid="link-footer-about">
                    About Us
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <a className="text-gray-300 hover:text-white transition-colors" data-testid="link-footer-services">
                    Services
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/calculator">
                  <a className="text-gray-300 hover:text-white transition-colors" data-testid="link-footer-calculator">
                    EMI Calculator
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-gray-300 hover:text-white transition-colors" data-testid="link-footer-contact">
                    Contact
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-300">Housing Loans</li>
              <li className="text-gray-300">Loan Against Property</li>
              <li className="text-gray-300">Personal Loans</li>
              <li className="text-gray-300">Business Loans</li>
              <li className="text-gray-300">Vehicle Loans</li>
              <li className="text-gray-300">Education Loans</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <i className="fas fa-phone text-orange mt-1"></i>
                <a href="tel:+919372267693" className="text-gray-300 hover:text-white transition-colors" data-testid="link-footer-phone">
                  +91 93722 67693
                </a>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-envelope text-orange mt-1"></i>
                <div className="space-y-1">
                  <a href="mailto:kkfinancial2016@gmail.com" className="block text-gray-300 hover:text-white transition-colors" data-testid="link-footer-email-gmail">
                    kkfinancial2016@gmail.com
                  </a>
                  <a href="mailto:kkfinancial2016@yahoo.com" className="block text-gray-300 hover:text-white transition-colors" data-testid="link-footer-email-yahoo">
                    kkfinancial2016@yahoo.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-map-marker-alt text-orange mt-1"></i>
                <span className="text-gray-300">
                  Office No 27, Ground Floor, Dimple Arcade, Thakur Complex, Kandivali East, Mumbai 400101
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>© {new Date().getFullYear()} KK Financial 2016. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
