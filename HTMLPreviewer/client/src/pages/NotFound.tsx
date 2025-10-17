import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="text-center px-4">
        <div className="mb-8">
          <div className="w-32 h-32 gradient-bg-blue-teal rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-exclamation-triangle text-white text-5xl"></i>
          </div>
          <h1 className="text-6xl font-bold gradient-text mb-4">404</h1>
          <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved to a different location.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/"
              className="gradient-bg-blue-teal text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all inline-block" 
              data-testid="button-home-404"
            >
              Go to Home
            </Link>
            <Link 
              href="/contact"
              className="bg-white border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white hover:-translate-y-0.5 transition-all inline-block" 
              data-testid="button-contact-404"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
