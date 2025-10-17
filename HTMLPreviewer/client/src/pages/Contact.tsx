import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { consultationRequestSchema, loanTypes } from "@shared/schema";
import type { FAQItem } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [loanType, setLoanType] = useState<string>("housing");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      fullName: formData.get("fullName") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      city: formData.get("city") as string || "Mumbai",
      loanType: loanType, // Use state value instead of formData
      loanAmount: formData.get("loanAmount") as string,
      income: formData.get("income") as string,
      message: formData.get("message") as string,
      consent: formData.get("consent") === "on",
    };

    try {
      // Validate with Zod schema
      const validatedData = consultationRequestSchema.parse(data);

      // Submit to backend API
      const response = await apiRequest("POST", "/api/consultations", validatedData);

      if (response.success) {
        toast({
          title: "Request Submitted Successfully!",
          description: "Our team will contact you within 24 hours. We've also prepared an email for you to send.",
        });

        // Optionally open email client as backup
        const subject = `Loan Consultation Request - ${data.fullName}`;
        const body = `Dear KK Financial Team,

I am interested in your loan consultation services. Here are my details:

Name: ${data.fullName}
Phone: ${data.phone}
Email: ${data.email}
City: ${data.city}
Loan Type: ${data.loanType}
Loan Amount: ${data.loanAmount || "To be discussed"}
Monthly Income: ${data.income || "To be discussed"}

Message: ${data.message || "Please contact me for consultation."}

Please contact me at your earliest convenience.

Best regards,
${data.fullName}`;

        const mailtoLink = `mailto:kkfinancial2016@gmail.com,kkfinancial2016@yahoo.com?subject=${encodeURIComponent(
          subject
        )}&body=${encodeURIComponent(body)}`;

        // Open mailto in new window (non-blocking)
        setTimeout(() => {
          window.open(mailtoLink, "_blank");
        }, 1000);

        // Reset form
        (e.target as HTMLFormElement).reset();
        setLoanType("housing"); // Reset loan type to default
      } else {
        throw new Error("Failed to submit request");
      }
    } catch (error) {
      console.error("Consultation request error:", error);
      toast({
        title: "Submission Error",
        description: "Please check all required fields and try again. You can also call us directly at +91 93722 67693.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs: FAQItem[] = [
    {
      question: "How long does the loan approval process take?",
      answer: "The approval time varies by loan type and bank. Personal loans can be approved within 24-48 hours, while housing loans typically take 7-15 days. We ensure the fastest possible processing through our direct bank relationships.",
    },
    {
      question: "What documents are required for a loan application?",
      answer: "Generally, you'll need ID proof, address proof, income proof (salary slips or ITR), and bank statements. Specific requirements vary by loan type - we'll provide a detailed checklist based on your needs.",
    },
    {
      question: "Do you charge for consultation services?",
      answer: "No, our consultation services are completely free. We earn through bank partnerships, so you get expert guidance at no cost.",
    },
    {
      question: "Can I get a loan with a low CIBIL score?",
      answer: "Yes, we work with multiple banks and have options for various credit profiles. We also provide guidance on improving your CIBIL score for better rates.",
    },
    {
      question: "Is prepayment allowed on loans?",
      answer: "Most loans allow prepayment, though terms vary by lender. We'll help you understand prepayment charges and choose loans with flexible prepayment options.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-xl text-muted-foreground font-semibold mb-4">
            We're here to help you achieve your financial goals
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Contact our expert team for personalized loan solutions and free financial consultation. We're committed to finding the best financial options for your unique needs.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover-elevate hover:shadow-lg transition-all text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 gradient-bg-blue-teal rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-phone text-white text-2xl"></i>
                </div>
                <h3 className="font-bold mb-2">Call Us</h3>
                <p className="text-sm text-muted-foreground mb-3">Speak directly with our loan experts</p>
                <a
                  href="tel:+919372267693"
                  className="text-primary font-semibold hover:underline"
                  data-testid="link-call"
                >
                  +91 93722 67693
                </a>
                <p className="text-xs text-muted-foreground mt-2">Mon - Sat: 9:00 AM - 7:00 PM</p>
              </CardContent>
            </Card>

            <Card className="hover-elevate hover:shadow-lg transition-all text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 gradient-bg-blue-teal rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-envelope text-white text-2xl"></i>
                </div>
                <h3 className="font-bold mb-2">Email Us</h3>
                <p className="text-sm text-muted-foreground mb-3">Send us your queries anytime</p>
                <a
                  href="mailto:kkfinancial2016@yahoo.com"
                  className="text-primary text-sm font-semibold hover:underline block"
                  data-testid="link-email-yahoo"
                >
                  kkfinancial2016@yahoo.com
                </a>
                <a
                  href="mailto:kkfinancial2016@gmail.com"
                  className="text-primary text-sm font-semibold hover:underline block mt-1"
                  data-testid="link-email-gmail"
                >
                  kkfinancial2016@gmail.com
                </a>
              </CardContent>
            </Card>

            <Card className="hover-elevate hover:shadow-lg transition-all text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 gradient-bg-blue-teal rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-map-marker-alt text-white text-2xl"></i>
                </div>
                <h3 className="font-bold mb-2">Visit Us</h3>
                <p className="text-sm text-muted-foreground mb-3">Meet us for personalized consultation</p>
                <p className="text-sm">
                  Office No 27, Ground Floor, Dimple Arcade, Thakur Complex, Kandivali East, Mumbai 400101
                </p>
                <p className="text-xs text-muted-foreground mt-2">By appointment only</p>
              </CardContent>
            </Card>

            <Card className="hover-elevate hover:shadow-lg transition-all text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 gradient-bg-blue-teal rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-comments text-white text-2xl"></i>
                </div>
                <h3 className="font-bold mb-2">Free Consultation</h3>
                <p className="text-sm text-muted-foreground mb-3">Get expert advice at no cost</p>
                <p className="text-sm font-semibold">Available for all loan types</p>
                <p className="text-xs text-muted-foreground mt-2">CIBIL consultation included</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-12 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-xl border-2">
                <CardContent className="p-8">
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-2">
                      Get Free <span className="gradient-text">Consultation</span>
                    </h2>
                    <p className="text-muted-foreground">
                      Fill out the form below and our experts will get back to you within 24 hours
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input id="fullName" name="fullName" required data-testid="input-fullname" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          pattern="[6-9][0-9]{9}"
                          required
                          data-testid="input-phone"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input id="email" name="email" type="email" required data-testid="input-email" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" name="city" defaultValue="Mumbai" data-testid="input-city" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="loanType">Loan Type *</Label>
                      <Select value={loanType} onValueChange={setLoanType} required>
                        <SelectTrigger data-testid="select-loan-type-contact">
                          <SelectValue placeholder="Select loan type" />
                        </SelectTrigger>
                        <SelectContent>
                          {loanTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type.charAt(0).toUpperCase() + type.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="loanAmount">Required Loan Amount</Label>
                        <Input
                          id="loanAmount"
                          name="loanAmount"
                          placeholder="₹"
                          data-testid="input-loan-amount-contact"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="income">Monthly Income</Label>
                        <Input id="income" name="income" placeholder="₹" data-testid="input-income" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message / Requirements</Label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={4}
                        placeholder="Tell us about your specific requirements..."
                        data-testid="textarea-message"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <Checkbox id="consent" name="consent" required data-testid="checkbox-consent" />
                      <label htmlFor="consent" className="text-sm text-muted-foreground cursor-pointer">
                        I agree to receive consultation calls and updates about loan offers
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full gradient-bg-blue-teal text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      data-testid="button-submit-consultation"
                    >
                      {isSubmitting ? (
                        <>
                          <i className="fas fa-spinner fa-spin mr-2"></i>
                          Opening Email...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-envelope mr-2"></i>
                          Send Consultation Request
                        </>
                      )}
                    </button>

                    <p className="text-sm text-muted-foreground text-center">
                      <i className="fas fa-info-circle mr-1"></i>
                      This will open your email client with your request pre-filled. Simply click send to submit.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Benefits Sidebar */}
            <div className="space-y-6">
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4">Why Choose Our Consultation?</h3>
                  <div className="space-y-4">
                    {[
                      { icon: "fa-check-circle", title: "100% Free Service", desc: "No charges for consultation and guidance" },
                      { icon: "fa-user-tie", title: "Expert Advice", desc: "Get guidance from experienced loan consultants" },
                      { icon: "fa-percent", title: "Best Rates", desc: "Compare and get the most competitive rates" },
                      { icon: "fa-clock", title: "Quick Response", desc: "Get callback within 24 hours" },
                      { icon: "fa-chart-line", title: "CIBIL Guidance", desc: "Free credit score consultation included" },
                    ].map((benefit, index) => (
                      <div key={index} className="flex gap-3">
                        <i className={`fas ${benefit.icon} text-teal text-xl flex-shrink-0 mt-1`}></i>
                        <div>
                          <h4 className="font-semibold text-sm">{benefit.title}</h4>
                          <p className="text-xs text-muted-foreground">{benefit.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="gradient-bg-blue-teal text-white shadow-lg">
                <CardContent className="p-6 text-center">
                  <h4 className="font-bold text-lg mb-2">Need Immediate Help?</h4>
                  <p className="mb-4 opacity-90">Call us directly for instant assistance</p>
                  <a
                    href="tel:+919372267693"
                    className="block bg-white text-primary px-6 py-3 rounded-lg font-semibold shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all"
                    data-testid="button-call-sidebar"
                  >
                    <i className="fas fa-phone mr-2"></i>
                    Call +91 93722 67693
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Quick answers to common questions about our services
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card
                key={index}
                className="hover-elevate border-2 hover:border-primary/50 transition-all cursor-pointer"
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start gap-4">
                    <h4 className="font-bold">{faq.question}</h4>
                    <i
                      className={`fas fa-chevron-down transition-transform ${
                        openFAQ === index ? "rotate-180" : ""
                      }`}
                    ></i>
                  </div>
                  {openFAQ === index && (
                    <p className="mt-4 text-muted-foreground leading-relaxed">{faq.answer}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
