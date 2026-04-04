import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Target, Users, Award, TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AnimatedElement: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ 
  children, 
  className = '',
  delay = 0 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-primary/90 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <AnimatedElement>
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
                About Vee Technologies
              </h1>
              <p className="text-lg md:text-xl text-white/90 font-paragraph leading-relaxed">
                Leading the way in product engineering and manufacturing solutions with cross-industry expertise and innovative approaches
              </p>
            </div>
          </AnimatedElement>
        </div>

        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <AnimatedElement>
              <Card className="border-none shadow-2xl bg-white overflow-hidden">
                <CardContent className="p-8 md:p-12">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mr-4">
                      <Target className="h-8 w-8 text-secondary" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary">
                      Our Mission
                    </h2>
                  </div>
                  <p className="text-lg text-muted-foreground font-paragraph leading-relaxed mb-6">
                    At veetechnologies.com, we are dedicated to transforming product visions into market-ready solutions. 
                    Our mission is to help organizations overcome challenges in competition, time to market, and cost efficiency 
                    through innovative engineering and manufacturing services.
                  </p>
                  <p className="text-lg text-muted-foreground font-paragraph leading-relaxed">
                    We work closely with product development teams to identify the appropriate technologies needed to achieve 
                    optimal design, materials, and manufacturability. Our process starts with a clear understanding of all 
                    technical, quality, and safety requirements, utilizing cutting-edge tools and thorough analysis.
                  </p>
                </CardContent>
              </Card>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <AnimatedElement>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
                Our Core Values
              </h2>
              <p className="text-lg text-muted-foreground font-paragraph max-w-2xl mx-auto">
                The principles that guide our work and define our commitment to excellence
              </p>
            </div>
          </AnimatedElement>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Award,
                title: 'Excellence',
                description: 'Delivering the highest quality standards in every project we undertake'
              },
              {
                icon: Users,
                title: 'Collaboration',
                description: 'Working closely with clients to understand and exceed their expectations'
              },
              {
                icon: TrendingUp,
                title: 'Innovation',
                description: 'Embracing cutting-edge technologies and methodologies for optimal results'
              },
              {
                icon: Target,
                title: 'Precision',
                description: 'Meticulous attention to detail in design, analysis, and execution'
              }
            ].map((value, index) => (
              <AnimatedElement key={index} delay={index * 100}>
                <Card className="h-full border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 mb-4">
                      <value.icon className="h-8 w-8 text-secondary" />
                    </div>
                    <h3 className="text-xl font-heading font-semibold text-primary mb-3">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground font-paragraph">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <AnimatedElement>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
                  Cross-Industry Expertise
                </h2>
                <p className="text-lg text-muted-foreground font-paragraph">
                  Leveraging experience from multiple industries to deliver superior solutions
                </p>
              </div>
            </AnimatedElement>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  industry: 'Automotive',
                  description: 'Advanced engineering solutions for vehicle design, manufacturing, and optimization'
                },
                {
                  industry: 'Aerospace',
                  description: 'Precision engineering for aircraft components and systems with rigorous quality standards'
                },
                {
                  industry: 'Heavy Engineering',
                  description: 'Robust solutions for large-scale industrial equipment and machinery'
                },
                {
                  industry: 'Industrial Products',
                  description: 'Innovative designs for manufacturing equipment and industrial applications'
                }
              ].map((item, index) => (
                <AnimatedElement key={index} delay={index * 100}>
                  <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-heading font-semibold text-primary mb-3">
                        {item.industry}
                      </h3>
                      <p className="text-muted-foreground font-paragraph">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </AnimatedElement>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <AnimatedElement>
              <Card className="border-none shadow-2xl bg-white">
                <CardContent className="p-8 md:p-12">
                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-8 text-center">
                    Our Approach
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mr-4">
                        <span className="text-xl font-heading font-bold text-secondary">1</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-heading font-semibold text-primary mb-2">
                          Understanding Requirements
                        </h3>
                        <p className="text-muted-foreground font-paragraph">
                          We begin with a comprehensive understanding of all technical, quality, and safety requirements 
                          to ensure our solutions meet your exact needs.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mr-4">
                        <span className="text-xl font-heading font-bold text-secondary">2</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-heading font-semibold text-primary mb-2">
                          Advanced Tools & Analysis
                        </h3>
                        <p className="text-muted-foreground font-paragraph">
                          Utilizing cutting-edge 3D modeling tools, 2D drawings, and thorough analysis to create 
                          custom products fit for your specific requirements.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mr-4">
                        <span className="text-xl font-heading font-bold text-secondary">3</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-heading font-semibold text-primary mb-2">
                          Digital Transformation
                        </h3>
                        <p className="text-muted-foreground font-paragraph">
                          Enabling companies to seamlessly embrace the digital world and transform traditional 
                          business processes into next-generation enterprises geared for optimal performance.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary to-primary/90 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <AnimatedElement>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                Ready to Work With Us?
              </h2>
              <p className="text-lg text-white/90 mb-8 font-paragraph">
                Let&apos;s discuss how our expertise can help transform your product vision into reality.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-white font-paragraph text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Link to="/contact">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </AnimatedElement>
        </div>
      </section>

      <Footer />
    </div>
  );
}
