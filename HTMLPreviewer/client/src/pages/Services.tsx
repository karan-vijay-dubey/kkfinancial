import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import type { ServiceInfo } from "@shared/schema";

export default function Services() {
  const services: ServiceInfo[] = [
    {
      id: "housing",
      name: "Housing Loans",
      icon: "fa-home",
      tagline: "Make your dream home a reality",
      description: "Turn your dream of owning a home into reality with our competitive housing loan solutions. We offer flexible terms, attractive interest rates, and quick approval processes to help you secure your ideal home.",
      features: [
        "Loan amounts up to ₹5 Crores",
        "Interest rates starting from 8.5% p.a.",
        "Tenure up to 30 years",
        "Minimal documentation required",
        "Quick approval and disbursement",
        "Balance transfer facilities available",
      ],
      benefits: [
        "Tax Benefits under Section 80C & 24B",
        "Zero prepayment charges",
        "Free credit shield insurance",
      ],
      interestRate: "8.5% - 10.5%",
      maxAmount: "Up to ₹5 Crores",
      maxTenure: "Up to 30 years",
    },
    {
      id: "lap",
      name: "Loan Against Property",
      icon: "fa-building",
      tagline: "Unlock the value of your property",
      description: "Leverage your residential or commercial property to meet your financial needs. Our LAP solutions offer higher loan amounts at attractive interest rates for business expansion, education, medical emergencies, or any other purpose.",
      features: [
        "Loan amounts up to ₹10 Crores",
        "Interest rates starting from 9.5% p.a.",
        "Tenure up to 20 years",
        "LTV ratio up to 70%",
        "Flexible repayment options",
        "Multi-purpose usage allowed",
      ],
      benefits: [
        "Lower interest rates than personal loans",
        "Continue living in your property",
        "Tax benefits available",
      ],
      interestRate: "9.5% - 12%",
      maxAmount: "Up to ₹10 Crores",
      maxTenure: "Up to 20 years",
    },
    {
      id: "personal",
      name: "Personal Loans",
      icon: "fa-user",
      tagline: "Quick funds for immediate needs",
      description: "Get instant access to funds for weddings, medical emergencies, travel, debt consolidation, or any personal requirement. Our personal loans offer quick processing with minimal documentation.",
      features: [
        "Loan amounts up to ₹40 Lakhs",
        "Interest rates starting from 10.99% p.a.",
        "Tenure up to 7 years",
        "No collateral required",
        "Quick approval within 24 hours",
        "Digital application process",
      ],
      benefits: [
        "Instant approval and disbursement",
        "Minimal documentation",
        "No usage restrictions",
      ],
      interestRate: "10.99% - 24%",
      maxAmount: "Up to ₹40 Lakhs",
      maxTenure: "Up to 7 years",
    },
    {
      id: "business",
      name: "Business Loans",
      icon: "fa-briefcase",
      tagline: "Fuel your business growth",
      description: "Expand your business operations with our flexible business loan solutions. Whether you need working capital, equipment financing, or expansion funding, we have the right solution for you.",
      features: [
        "Loan amounts up to ₹5 Crores",
        "Interest rates starting from 11% p.a.",
        "Tenure up to 10 years",
        "Minimal documentation",
        "Quick processing and disbursement",
        "Flexible repayment options",
      ],
      benefits: [
        "Grow your business without equity dilution",
        "Tax deductible interest payments",
        "Improve cash flow management",
      ],
      interestRate: "11% - 18%",
      maxAmount: "Up to ₹5 Crores",
      maxTenure: "Up to 10 years",
    },
    {
      id: "vehicle",
      name: "Vehicle Loans",
      icon: "fa-car",
      tagline: "Drive your dream vehicle today",
      description: "Own your dream car or bike with our competitive vehicle loan rates. We offer financing for new and used vehicles with flexible repayment options and minimal documentation.",
      features: [
        "Loan amounts up to ₹50 Lakhs",
        "Interest rates starting from 8.5% p.a.",
        "Tenure up to 7 years",
        "Up to 90% financing available",
        "Quick approval process",
        "Insurance options included",
      ],
      benefits: [
        "Competitive interest rates",
        "Flexible EMI options",
        "Quick loan processing",
      ],
      interestRate: "8.5% - 12%",
      maxAmount: "Up to ₹50 Lakhs",
      maxTenure: "Up to 7 years",
    },
    {
      id: "education",
      name: "Education Loans",
      icon: "fa-graduation-cap",
      tagline: "Invest in your future",
      description: "Fulfill your educational dreams with our comprehensive education loan solutions. We finance studies in India and abroad across all streams and institutions.",
      features: [
        "Loan amounts up to ₹1.5 Crores",
        "Interest rates starting from 9.5% p.a.",
        "Tenure up to 15 years",
        "Covers tuition, living, and other expenses",
        "Moratorium period available",
        "Tax benefits under Section 80E",
      ],
      benefits: [
        "100% finance for eligible courses",
        "No collateral for loans up to ₹7.5 Lakhs",
        "Flexible repayment options",
      ],
      interestRate: "9.5% - 14%",
      maxAmount: "Up to ₹1.5 Crores",
      maxTenure: "Up to 15 years",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Our <span className="gradient-text">Financial Services</span>
          </h1>
          <p className="text-xl text-muted-foreground font-semibold mb-4">
            Comprehensive loan solutions for every need
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            From housing loans to business funding, we offer a complete range of financial services with competitive rates and expert guidance.
          </p>
        </div>
      </section>

      {/* Services Navigation */}
      <div className="sticky top-16 z-40 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-4 no-scrollbar">
            {services.map((service) => (
              <a
                key={service.id}
                href={`#${service.id}`}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-primary hover:text-white transition-colors whitespace-nowrap text-sm font-medium"
                data-testid={`link-service-nav-${service.id}`}
              >
                <i className={`fas ${service.icon}`}></i>
                <span>{service.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Service Details */}
      {services.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={`py-20 ${index % 2 === 0 ? "bg-white" : "bg-gradient-to-br from-gray-50 to-blue-50"}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Service Info */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 flex-shrink-0 bg-gradient-to-br from-blue-100 to-teal-100 rounded-lg flex items-center justify-center">
                    <i className={`fas ${service.icon} text-3xl text-primary`}></i>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{service.name}</h2>
                    <p className="text-lg text-primary font-semibold">{service.tagline}</p>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>

                <div>
                  <h3 className="text-xl font-bold mb-4">Key Features:</h3>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <i className="fas fa-check text-teal mt-1"></i>
                        <span className="text-muted-foreground text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">Benefits:</h3>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {service.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <i className="fas fa-star text-orange"></i>
                        <span className="text-sm text-muted-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA Card */}
              <div>
                <Card className="sticky top-32 bg-white border-2 border-primary/20 hover-elevate shadow-lg">
                  <CardContent className="p-6 space-y-6">
                    <h3 className="text-xl font-bold">Ready to Apply?</h3>
                    <div className="space-y-4 text-sm">
                      <div>
                        <div className="text-muted-foreground mb-1">Interest Rate</div>
                        <div className="font-semibold gradient-text text-lg">{service.interestRate}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground mb-1">Max Amount</div>
                        <div className="font-semibold">{service.maxAmount}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground mb-1">Max Tenure</div>
                        <div className="font-semibold">{service.maxTenure}</div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Link 
                        href="/contact"
                        className="block gradient-bg-blue-teal text-white px-4 py-3 rounded-lg font-semibold text-center shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all" 
                        data-testid={`button-apply-${service.id}`}
                      >
                        Apply Now
                      </Link>
                      <Link 
                        href="/calculator"
                        className="block bg-white border-2 border-primary text-primary px-4 py-3 rounded-lg font-semibold text-center hover:bg-primary hover:text-white transition-all" 
                        data-testid={`button-calculate-${service.id}`}
                      >
                        Calculate EMI
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
