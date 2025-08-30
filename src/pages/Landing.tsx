import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Factory, ShoppingCart, Shield, Globe, ArrowRight, Zap, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary-light/20 to-accent-light/30">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-md border-b border-border shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">HydroCredit</h1>
              <p className="text-xs text-muted-foreground">Blockchain Trading Platform</p>
            </div>
          </div>
          <Link to="/dashboard">
            <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-accent text-white">
              Access Dashboard <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Revolutionizing Hydrogen Credit Trading
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            A transparent, secure, and efficient blockchain-powered platform for hydrogen credit management, 
            trading, and regulatory compliance built on Hyperledger Fabric.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-accent text-white shadow-primary">
                Explore Dashboard <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-white">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
          Platform Features
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-105 bg-gradient-to-br from-card to-secondary-light/10">
            <CardHeader>
              <div className="p-3 rounded-lg bg-primary/10 w-fit">
                <Factory className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Production Tracking</CardTitle>
              <CardDescription>
                Submit and track hydrogen production with real-time credit calculation
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-secondary/20 transition-all duration-300 hover:scale-105 bg-gradient-to-br from-card to-accent-light/10">
            <CardHeader>
              <div className="p-3 rounded-lg bg-secondary/10 w-fit">
                <ShoppingCart className="h-6 w-6 text-secondary" />
              </div>
              <CardTitle className="text-lg">Credit Marketplace</CardTitle>
              <CardDescription>
                Buy and sell hydrogen credits in a secure, transparent marketplace
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-accent/20 transition-all duration-300 hover:scale-105 bg-gradient-to-br from-card to-primary/5">
            <CardHeader>
              <div className="p-3 rounded-lg bg-accent/10 w-fit">
                <Shield className="h-6 w-6 text-accent" />
              </div>
              <CardTitle className="text-lg">Regulatory Compliance</CardTitle>
              <CardDescription>
                Streamlined approval process and automated compliance reporting
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-muted-foreground/20 transition-all duration-300 hover:scale-105 bg-gradient-to-br from-card to-muted/20">
            <CardHeader>
              <div className="p-3 rounded-lg bg-muted-foreground/10 w-fit">
                <Globe className="h-6 w-6 text-muted-foreground" />
              </div>
              <CardTitle className="text-lg">Public Transparency</CardTitle>
              <CardDescription>
                Open access to aggregated data and market insights
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5 py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="flex justify-center">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-foreground">1,234</h3>
              <p className="text-muted-foreground">Total Credits Traded</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-center">
                <BarChart3 className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-3xl font-bold text-foreground">89</h3>
              <p className="text-muted-foreground">Active Producers</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-center">
                <Globe className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-3xl font-bold text-foreground">100%</h3>
              <p className="text-muted-foreground">Transparency Score</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-foreground">
            Ready to Start Trading Hydrogen Credits?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join the future of sustainable energy trading with our blockchain-powered platform.
          </p>
          <Link to="/dashboard">
            <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-accent text-white shadow-primary">
              Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground">
            © 2024 HydroCredit. Powered by Hyperledger Fabric blockchain technology.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;