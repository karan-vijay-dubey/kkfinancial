import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const services = [
    {
      icon: "fa-home",
      title: "Housing Loans",
      description: "Make your dream home a reality with our competitive housing loan options and expert guidance.",
      link: "/services#housing",
    },
    {
      icon: "fa-building",
      title: "Loan Against Property",
      description: "Unlock the value of your property with our flexible LAP solutions for all your financial needs.",
      link: "/services#lap",
    },
    {
      icon: "fa-user",
      title: "Personal Loans",
      description: "Quick and hassle-free personal loans for all your immediate financial requirements.",
      link: "/services#personal",
    },
    {
      icon: "fa-briefcase",
      title: "Business Loans",
      description: "Fuel your business growth with our tailored business loan solutions and expert support.",
      link: "/services#business",
    },
    {
      icon: "fa-car",
      title: "Vehicle Loans",
      description: "Drive your dream vehicle today with our competitive auto loan rates and quick approval.",
      link: "/services#vehicle",
    },
    {
      icon: "fa-graduation-cap",
      title: "Education Loans",
      description: "Invest in your future with our comprehensive education loan solutions for all courses.",
      link: "/services#education",
    },
  ];

  const features = [
    {
      icon: "fa-university",
      title: "Direct Bank Relationships",
      description: "We work directly with leading banks to ensure you get the best rates and fastest approvals.",
    },
    {
      icon: "fa-comments",
      title: "Free Financial Counseling",
      description: "Expert guidance at no cost to help you make informed financial decisions.",
    },
    {
      icon: "fa-clock",
      title: "Quick Processing",
      description: "Streamlined processes to ensure quick loan approvals and disbursements.",
    },
    {
      icon: "fa-heart",
      title: "Personalized Solutions",
      description: "Customized financial solutions tailored to your specific needs and circumstances.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 via-gray-100 to-blue-50 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-8 animate-fade-in">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Secure Your Financial{" "}
                <span className="gradient-text">Future</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground font-medium">
                with our range of <strong>Financial Solutions</strong>
              </p>
              <p className="text-base sm:text-lg text-muted-foreground">
                Professional loan consulting services in Mumbai. We provide personalized financial solutions with direct bank relationships and expert guidance.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/contact"
                  className="gradient-bg-blue-teal text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all inline-block text-center" 
                  data-testid="button-consultation-hero"
                >
                  Get Free Consultation
                </Link>
                <a
                  href="tel:+919372267693"
                  className="bg-white border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-primary hover:text-white hover:-translate-y-0.5 hover:shadow-lg transition-all inline-flex items-center justify-center gap-2"
                  data-testid="button-call-hero"
                >
                  <i className="fas fa-phone"></i>
                  +91 93722 67693
                </a>
              </div>

              {/* Feature Badges */}
              <div className="flex flex-col gap-3 pt-4">
                <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                  <i className="fas fa-shield-alt text-teal text-xl"></i>
                  <span className="font-medium text-sm">Secure & Trusted</span>
                </div>
                <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                  <i className="fas fa-handshake text-teal text-xl"></i>
                  <span className="font-medium text-sm">Direct Bank Tie-ups</span>
                </div>
                <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                  <i className="fas fa-comments text-teal text-xl"></i>
                  <span className="font-medium text-sm">Free Financial Counseling</span>
                </div>
              </div>
            </div>

            {/* Visual Stats */}
            <div className="grid grid-cols-2 gap-6 animate-fade-in">
              <Card className="hover-elevate bg-white border shadow-md hover:shadow-xl transition-all">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 gradient-bg-blue-teal rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-university text-white text-2xl"></i>
                  </div>
                  <div className="text-3xl font-bold gradient-text">15+</div>
                  <div className="text-sm text-muted-foreground mt-1">Bank Partners</div>
                </CardContent>
              </Card>

              <Card className="hover-elevate bg-white border shadow-md hover:shadow-xl transition-all">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 gradient-bg-blue-teal rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-star text-white text-2xl"></i>
                  </div>
                  <div className="text-3xl font-bold gradient-text">9+</div>
                  <div className="text-sm text-muted-foreground mt-1">Years Experience</div>
                </CardContent>
              </Card>

              <Card className="hover-elevate bg-white border shadow-md hover:shadow-xl transition-all col-span-2">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 gradient-bg-blue-teal rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-chart-line text-white text-2xl"></i>
                  </div>
                  <div className="text-3xl font-bold gradient-text">₹100Cr+</div>
                  <div className="text-sm text-muted-foreground mt-1">Loans Facilitated</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Discover the Art of <span className="gradient-text">Financial Success</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              with our personalized consultations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group hover-elevate border hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl relative overflow-hidden"
              >
                {/* Gradient Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 gradient-bg-blue-teal transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>

                <CardContent className="p-6 space-y-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-teal-50 rounded-lg flex items-center justify-center">
                    <i className={`fas ${service.icon} text-3xl text-primary`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <Link 
                    href={service.link}
                    className="inline-flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all" 
                    data-testid={`link-service-${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    Learn More
                    <i className="fas fa-arrow-right"></i>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Turn Financial <span className="gradient-text">Challenges into Opportunities</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              with our innovative solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover-elevate bg-white border hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 gradient-bg-blue-teal rounded-lg flex items-center justify-center">
                        <i className={`fas ${feature.icon} text-white text-xl`}></i>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">{feature.title}</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-teal text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Secure Your Financial Future?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Contact us today for a free consultation and discover the best loan solutions for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="bg-white text-primary px-8 py-3 rounded-lg font-semibold shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all inline-block" 
              data-testid="button-consultation-cta"
            >
              Get Free Consultation
            </Link>
            <Link 
              href="/calculator"
              className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary hover:-translate-y-0.5 transition-all inline-block" 
              data-testid="button-calculator-cta"
            >
              Try Loan Calculator
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
