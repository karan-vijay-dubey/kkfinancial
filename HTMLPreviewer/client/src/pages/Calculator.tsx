import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "wouter";
import type { EMICalculatorResult } from "@shared/schema";

export default function Calculator() {
  const [loanAmount, setLoanAmount] = useState(2500000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);
  const [loanType, setLoanType] = useState("home");
  const [result, setResult] = useState<EMICalculatorResult | null>(null);

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, tenureYears]);

  const calculateEMI = () => {
    if (loanAmount > 0 && interestRate > 0 && tenureYears > 0) {
      const monthlyRate = interestRate / (12 * 100);
      const tenureMonths = tenureYears * 12;

      const emi =
        (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
        (Math.pow(1 + monthlyRate, tenureMonths) - 1);

      const totalAmount = emi * tenureMonths;
      const totalInterest = totalAmount - loanAmount;
      const principalPercent = (loanAmount / totalAmount) * 100;
      const interestPercent = (totalInterest / totalAmount) * 100;

      setResult({
        monthlyEMI: emi,
        totalInterest,
        totalAmount,
        principalPercent,
        interestPercent,
      });
    }
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(num);
  };

  const loanTypeOptions = [
    { value: "home", label: "Home Loan" },
    { value: "personal", label: "Personal Loan" },
    { value: "car", label: "Car Loan" },
    { value: "education", label: "Education Loan" },
    { value: "business", label: "Business Loan" },
    { value: "lap", label: "Loan Against Property" },
  ];

  const rateCards = [
    {
      icon: "fa-home",
      title: "Home Loans",
      rate: "8.5% - 10.5%",
      tenure: "Up to 30 years",
      amount: "Up to ₹5 Crores",
      link: "/services#housing",
    },
    {
      icon: "fa-user",
      title: "Personal Loans",
      rate: "10.99% - 24%",
      tenure: "Up to 7 years",
      amount: "Up to ₹40 Lakhs",
      link: "/services#personal",
    },
    {
      icon: "fa-car",
      title: "Vehicle Loans",
      rate: "8.5% - 12%",
      tenure: "Up to 7 years",
      amount: "Up to ₹50 Lakhs",
      link: "/services#vehicle",
    },
    {
      icon: "fa-briefcase",
      title: "Business Loans",
      rate: "11% - 18%",
      tenure: "Up to 10 years",
      amount: "Up to ₹5 Crores",
      link: "/services#business",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Loan EMI <span className="gradient-text">Calculator</span>
          </h1>
          <p className="text-xl text-muted-foreground font-semibold mb-4">
            Plan your finances with accurate EMI calculations
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Use our advanced loan calculator to estimate your monthly payments and plan your budget effectively. Get instant results for all loan types.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Panel */}
            <Card className="bg-white shadow-xl border-2">
              <CardContent className="p-8">
                <div className="flex justify-between items-center mb-6 pb-6 border-b">
                  <h2 className="text-2xl font-bold">EMI Calculator</h2>
                  <Select value={loanType} onValueChange={setLoanType}>
                    <SelectTrigger className="w-48" data-testid="select-loan-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {loanTypeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-8">
                  {/* Loan Amount */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold">Loan Amount</Label>
                    <div className="flex items-center gap-3">
                      <span className="text-muted-foreground">₹</span>
                      <Input
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                        min={50000}
                        max={50000000}
                        className="flex-1"
                        data-testid="input-loan-amount"
                      />
                    </div>
                    <input
                      type="range"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      min={50000}
                      max={50000000}
                      step={50000}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                      data-testid="range-loan-amount"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>₹50K</span>
                      <span>₹5Cr</span>
                    </div>
                  </div>

                  {/* Interest Rate */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold">Interest Rate (per annum)</Label>
                    <div className="flex items-center gap-3">
                      <Input
                        type="number"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        min={6}
                        max={25}
                        step={0.1}
                        className="flex-1"
                        data-testid="input-interest-rate"
                      />
                      <span className="text-muted-foreground">%</span>
                    </div>
                    <input
                      type="range"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      min={6}
                      max={25}
                      step={0.1}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                      data-testid="range-interest-rate"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>6%</span>
                      <span>25%</span>
                    </div>
                  </div>

                  {/* Loan Tenure */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold">Loan Tenure (Years)</Label>
                    <Input
                      type="number"
                      value={tenureYears}
                      onChange={(e) => setTenureYears(Number(e.target.value))}
                      min={1}
                      max={30}
                      data-testid="input-tenure"
                    />
                    <input
                      type="range"
                      value={tenureYears}
                      onChange={(e) => setTenureYears(Number(e.target.value))}
                      min={1}
                      max={30}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                      data-testid="range-tenure"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1 Yr</span>
                      <span>30 Yrs</span>
                    </div>
                  </div>
                </div>

                {/* Summary */}
                {result && (
                  <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-teal-50 rounded-lg">
                    <h3 className="font-bold text-lg mb-4">Calculation Summary</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Monthly EMI</div>
                        <div className="text-xl font-bold gradient-text" data-testid="text-monthly-emi">
                          {formatCurrency(result.monthlyEMI)}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Total Interest</div>
                        <div className="text-xl font-bold gradient-text" data-testid="text-total-interest">
                          {formatCurrency(result.totalInterest)}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Total Amount</div>
                        <div className="text-xl font-bold gradient-text" data-testid="text-total-amount">
                          {formatCurrency(result.totalAmount)}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Results Panel */}
            <div className="space-y-6">
              <Card className="bg-white shadow-xl border-2">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-6">Payment Breakdown</h3>

                  {result && (
                    <div className="space-y-6">
                      {/* Pie Chart Representation */}
                      <div className="flex justify-center">
                        <div className="relative w-48 h-48">
                          <svg viewBox="0 0 100 100" className="transform -rotate-90">
                            <circle
                              cx="50"
                              cy="50"
                              r="40"
                              fill="none"
                              stroke="hsl(173 80% 40%)"
                              strokeWidth="20"
                              strokeDasharray={`${result.principalPercent * 2.51} ${251 - result.principalPercent * 2.51}`}
                            />
                            <circle
                              cx="50"
                              cy="50"
                              r="40"
                              fill="none"
                              stroke="hsl(217 91% 35%)"
                              strokeWidth="20"
                              strokeDasharray={`${result.interestPercent * 2.51} ${251 - result.interestPercent * 2.51}`}
                              strokeDashoffset={-result.principalPercent * 2.51}
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-2xl font-bold gradient-text">
                                {result.monthlyEMI ? formatCurrency(result.monthlyEMI) : ""}
                              </div>
                              <div className="text-xs text-muted-foreground">EMI</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Legend */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded bg-teal"></div>
                            <span className="text-sm">Principal Amount</span>
                          </div>
                          <span className="font-semibold text-sm" data-testid="text-principal-percent">
                            {result.principalPercent.toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded bg-primary"></div>
                            <span className="text-sm">Interest Amount</span>
                          </div>
                          <span className="font-semibold text-sm" data-testid="text-interest-percent">
                            {result.interestPercent.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-primary to-teal text-white shadow-xl">
                <CardContent className="p-8">
                  <h4 className="text-xl font-bold mb-2">Ready to Apply?</h4>
                  <p className="mb-6 opacity-90">Get pre-approved with competitive rates</p>
                  <Link 
                    href="/contact"
                    className="block bg-white text-primary px-6 py-3 rounded-lg font-semibold text-center shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all" 
                    data-testid="button-apply-calculator"
                  >
                    Apply for Loan
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Interest Rates */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Current Interest <span className="gradient-text">Rates</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Latest loan rates from our partner banks
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rateCards.map((card, index) => (
              <Card key={index} className="hover-elevate bg-white hover:shadow-xl transition-all">
                <CardContent className="p-6">
                  <div className="w-12 h-12 gradient-bg-blue-teal rounded-lg flex items-center justify-center mb-4">
                    <i className={`fas ${card.icon} text-white text-xl`}></i>
                  </div>
                  <h3 className="font-bold text-lg mb-4">{card.title}</h3>
                  <div className="space-y-2 text-sm mb-4">
                    <div className="font-semibold gradient-text text-lg">{card.rate}</div>
                    <div className="text-muted-foreground">{card.tenure}</div>
                    <div className="text-muted-foreground">{card.amount}</div>
                  </div>
                  <Link 
                    href={card.link}
                    className="text-primary font-semibold text-sm hover:underline" 
                    data-testid={`link-rate-${card.title.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    View Details →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
