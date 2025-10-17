import { Card, CardContent } from "@/components/ui/card";
import type { TeamMember } from "@shared/schema";

export default function About() {
  const teamMembers: TeamMember[] = [
    {
      name: "Mrs. Kumkum Dubey",
      title: "Proprietor",
      description: "As the proprietor of KK Financial 2016, Mrs. Dubey has over 9 years of experience in financial consulting. She has been instrumental in building the company into a trusted name in the industry. Her expertise in loan structuring and client relations has helped numerous clients achieve their financial goals.",
      expertise: ["Financial Planning", "Loan Consulting", "Client Relations", "Risk Assessment"],
    },
    {
      name: "Mr. Vijay Kumar Dubey",
      title: "Main Person of the Company",
      description: "As the main person of the company, Mr. Dubey brings extensive experience in financial operations and strategic planning. His deep understanding of banking processes and regulatory compliance ensures smooth loan processing and maintains the highest standards of service delivery for our clients.",
      expertise: ["Operations Management", "Strategic Planning", "Regulatory Compliance", "Process Optimization"],
    },
  ];

  const values = [
    {
      icon: "fa-shield-alt",
      title: "Trust & Integrity",
      description: "We build lasting relationships through transparent communication and honest advice, ensuring our clients always know where they stand.",
    },
    {
      icon: "fa-users",
      title: "Client-Centric Approach",
      description: "Every solution we provide is tailored to our client's unique needs, ensuring they get the best possible outcome for their situation.",
    },
    {
      icon: "fa-lightbulb",
      title: "Innovation",
      description: "We continuously evolve our services and embrace new technologies to provide better, faster, and more efficient solutions.",
    },
    {
      icon: "fa-award",
      title: "Excellence",
      description: "We strive for excellence in everything we do, from initial consultation to loan disbursement and beyond.",
    },
    {
      icon: "fa-handshake",
      title: "Partnership",
      description: "We view our relationship with clients as a long-term partnership, supporting them throughout their financial journey.",
    },
    {
      icon: "fa-clock",
      title: "Reliability",
      description: "Our clients can count on us to deliver on our promises, with consistent communication and timely service delivery.",
    },
  ];

  const timeline = [
    {
      year: "2016",
      title: "Company Founded",
      description: "Started with a vision to simplify financial solutions",
    },
    {
      year: "2018",
      title: "First 500 Clients",
      description: "Reached our first major milestone",
    },
    {
      year: "2020",
      title: "Digital Transformation",
      description: "Embraced technology for better service",
    },
    {
      year: "2025",
      title: "Industry Leader",
      description: "Recognized as a trusted financial partner",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            About <span className="gradient-text">KK Financial 2016</span>
          </h1>
          <p className="text-xl text-muted-foreground font-semibold mb-4">
            Your Trusted Partner in Financial Success
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            With years of experience in the financial industry, KK Financial 2016 has been helping individuals and businesses achieve their financial goals through expert consultation and personalized loan solutions.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Our Story</h2>
              <p className="text-muted-foreground leading-relaxed">
                Founded in 2016, KK Financial has grown from a small consultancy to a trusted name in financial services across Mumbai. Our journey began with a simple mission: to make financial solutions accessible, transparent, and tailored to each client's unique needs.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Over the years, we have successfully helped many clients secure loans for their homes, businesses, education, and personal needs. Our commitment to excellence and personalized service has made us a preferred choice for loan consulting in Mumbai.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <Card className="bg-gradient-to-br from-blue-50 to-teal-50 border-none">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold gradient-text">9+</div>
                    <div className="text-sm text-muted-foreground mt-1">Years Experience</div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-blue-50 to-teal-50 border-none">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold gradient-text">₹100Cr+</div>
                    <div className="text-sm text-muted-foreground mt-1">Loans Facilitated</div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-blue-50 to-teal-50 border-none col-span-2">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold gradient-text">15+</div>
                    <div className="text-sm text-muted-foreground mt-1">Bank Partners</div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-6">
              {timeline.map((item, index) => (
                <div key={index} className="flex gap-4 group">
                  <div className="flex-shrink-0 w-20 text-right">
                    <div className="text-2xl font-bold gradient-text">{item.year}</div>
                  </div>
                  <div className="flex-shrink-0 pt-2">
                    <div className="w-3 h-3 rounded-full bg-primary group-hover:scale-150 transition-transform"></div>
                  </div>
                  <div className="flex-1 pb-8 border-l-2 border-gray-200 pl-4 -ml-1.5">
                    <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Leadership</h2>
            <p className="text-lg text-muted-foreground">
              Meet the expert team driving our success
            </p>
          </div>

          <div className="space-y-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="hover-elevate bg-white overflow-hidden hover:shadow-xl transition-all">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-48 h-64 md:h-auto bg-gradient-to-br from-blue-100 to-teal-100 flex items-center justify-center">
                      <div className="w-32 h-32 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center">
                        <i className="fas fa-user text-5xl text-primary"></i>
                      </div>
                    </div>
                    <div className="flex-1 p-8">
                      <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                      <p className="text-primary font-semibold mb-4">{member.title}</p>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {member.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {member.expertise.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Our <span className="gradient-text">Core Values</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="hover-elevate border hover:border-primary/50 hover:shadow-lg transition-all">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 gradient-bg-blue-teal rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className={`fas ${value.icon} text-white text-2xl`}></i>
                  </div>
                  <h3 className="font-bold text-lg mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
