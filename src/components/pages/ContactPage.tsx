import { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: ''
      });
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    }, 1500);
  };

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
                Get in Touch
              </h1>
              <p className="text-lg md:text-xl text-white/90 font-paragraph leading-relaxed">
                Ready to transform your product vision? Contact our team of experts today for a consultation
              </p>
            </div>
          </AnimatedElement>
        </div>

        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div>
              <AnimatedElement>
                <h2 className="text-3xl font-heading font-bold text-primary mb-6">
                  Contact Information
                </h2>
                <p className="text-lg text-muted-foreground font-paragraph mb-8">
                  Reach out to us through any of the following channels. Our team is ready to assist you with your engineering needs.
                </p>
              </AnimatedElement>

              <div className="space-y-6">
                <AnimatedElement delay={100}>
                  <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white">
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mr-4">
                          <Phone className="h-6 w-6 text-secondary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-heading font-semibold text-primary mb-2">
                            Phone
                          </h3>
                          <p className="text-muted-foreground font-paragraph">
                            India: +91 7909455907
                          </p>
                          <p className="text-muted-foreground font-paragraph">
                            WhatsApp: +91 7909455907
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedElement>

                <AnimatedElement delay={200}>
                  <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white">
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mr-4">
                          <Mail className="h-6 w-6 text-secondary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-heading font-semibold text-primary mb-2">
                            Email
                          </h3>
                          <p className="text-muted-foreground font-paragraph">
                            asengineeringservices41wn@gmail.com
                          </p>
                          <p className="text-muted-foreground font-paragraph">
                            For all appointments & inquiries
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedElement>

                <AnimatedElement delay={300}>
                  <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white">
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mr-4">
                          <MapPin className="h-6 w-6 text-secondary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-heading font-semibold text-primary mb-2">
                            Location
                          </h3>
                          <p className="text-muted-foreground font-paragraph">
                            India
                          </p>
                          <p className="text-muted-foreground font-paragraph">
                            Serving clients worldwide
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedElement>
              </div>

              <AnimatedElement delay={400}>
                <Card className="border-none shadow-lg bg-gradient-to-br from-secondary/10 to-secondary/5 mt-8">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-heading font-semibold text-primary mb-3">
                      Business Hours
                    </h3>
                    <div className="space-y-2 text-muted-foreground font-paragraph">
                      <p>Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                      <p>Saturday: 10:00 AM - 4:00 PM IST</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedElement>
            </div>

            {/* Contact Form */}
            <div>
              <AnimatedElement>
                <Card className="border-none shadow-2xl bg-white">
                  <CardContent className="p-8">
                    <h2 className="text-3xl font-heading font-bold text-primary mb-6">
                      Send Us a Message
                    </h2>

                    {submitStatus === 'success' && (
                      <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-green-800 font-paragraph">
                          Thank you for your message! We&apos;ll get back to you soon.
                        </p>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <Label htmlFor="name" className="text-primary font-paragraph font-semibold">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="mt-2 font-paragraph border-2 focus:border-secondary"
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-primary font-paragraph font-semibold">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="mt-2 font-paragraph border-2 focus:border-secondary"
                          placeholder="john@example.com"
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone" className="text-primary font-paragraph font-semibold">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          className="mt-2 font-paragraph border-2 focus:border-secondary"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>

                      <div>
                        <Label htmlFor="company" className="text-primary font-paragraph font-semibold">
                          Company Name
                        </Label>
                        <Input
                          id="company"
                          name="company"
                          type="text"
                          value={formData.company}
                          onChange={handleChange}
                          className="mt-2 font-paragraph border-2 focus:border-secondary"
                          placeholder="Your Company"
                        />
                      </div>

                      <div>
                        <Label htmlFor="message" className="text-primary font-paragraph font-semibold">
                          Message *
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          required
                          value={formData.message}
                          onChange={handleChange}
                          rows={5}
                          className="mt-2 font-paragraph border-2 focus:border-secondary"
                          placeholder="Tell us about your project requirements..."
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-secondary hover:bg-secondary/90 text-white font-paragraph text-lg py-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                      >
                        {isSubmitting ? (
                          'Sending...'
                        ) : (
                          <>
                            Send Message <Send className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </AnimatedElement>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnimatedElement>
              <Card className="border-none shadow-lg bg-white">
                <CardContent className="p-8 md:p-12 text-center">
                  <h2 className="text-3xl font-heading font-bold text-primary mb-4">
                    Why Choose A&S Engineering services?
                  </h2>
                  <p className="text-lg text-muted-foreground font-paragraph leading-relaxed mb-6">
                    With decades of combined experience in product engineering and manufacturing, we bring 
                    cross-industry expertise to every project. Our team of dedicated engineers works closely 
                    with you to transform your vision into reality, ensuring the highest quality standards 
                    and optimal performance.
                  </p>
                  <p className="text-lg text-muted-foreground font-paragraph leading-relaxed">
                    From initial concept to final production, we provide comprehensive support throughout 
                    the entire product development lifecycle. Let&apos;s discuss how we can help you achieve 
                    your engineering goals.
                  </p>
                </CardContent>
              </Card>
            </AnimatedElement>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
