import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { BaseCrudService } from '@/integrations';
import { EngineeringServices } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AnimatedElement: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = ''
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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

export default function ServiceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<EngineeringServices | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        const data = await BaseCrudService.getById<EngineeringServices>('engineeringservices', id);
        setService(data);
      } catch (error) {
        console.error('Error fetching service:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchService();
  }, [id]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="min-h-[600px]">
        {isLoading ? (
          <div className="flex justify-center items-center py-32">
            <LoadingSpinner />
          </div>
        ) : !service ? (
          <div className="container mx-auto px-4 py-32 text-center">
            <h2 className="text-3xl font-heading font-bold text-primary mb-4">Service Not Found</h2>
            <p className="text-muted-foreground font-paragraph mb-8">
              The service you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
            <Button asChild className="bg-secondary hover:bg-secondary/90 text-white font-paragraph">
              <Link to="/services">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Services
              </Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-primary via-primary to-primary/90 text-white py-20 overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
                  backgroundSize: '30px 30px'
                }} />
              </div>

              <div className="container mx-auto px-4 relative z-10">
                <AnimatedElement>
                  <Link
                    to="/services"
                    className="inline-flex items-center text-white/80 hover:text-white mb-6 font-paragraph transition-colors"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Services
                  </Link>
                  <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                    {service.serviceTitle}
                  </h1>
                  {service.shortDescription && (
                    <p className="text-lg md:text-xl text-white/90 font-paragraph max-w-3xl">
                      {service.shortDescription}
                    </p>
                  )}
                </AnimatedElement>
              </div>

              <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-background to-transparent" />
            </section>

            {/* Service Image */}
            {service.serviceImage && (
              <section className="py-16 bg-background">
                <div className="container mx-auto px-4">
                  <AnimatedElement>
                    <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
                      <Image
                        src={service.serviceImage}
                        alt={service.serviceTitle || 'Service'}
                        className="w-full h-[400px] object-cover"
                        width={1200}
                      />
                    </div>
                  </AnimatedElement>
                </div>
              </section>
            )}

            {/* Service Details */}
            <section className="py-16 bg-gradient-to-b from-background to-muted/30">
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                  <AnimatedElement>
                    <Card className="border-none shadow-lg bg-white">
                      <CardContent className="p-8 md:p-12">
                        <h2 className="text-3xl font-heading font-bold text-primary mb-6">
                          Service Overview
                        </h2>
                        {service.detailedDescription && (
                          <div className="prose prose-lg max-w-none mb-8">
                            <p className="text-muted-foreground font-paragraph leading-relaxed whitespace-pre-line">
                              {service.detailedDescription}
                            </p>
                          </div>
                        )}

                        {service.oemPartnershipInfo && (
                          <div className="mt-8 p-6 bg-secondary/5 rounded-xl border-l-4 border-secondary">
                            <h3 className="text-xl font-heading font-semibold text-primary mb-3">
                              OEM Partnership Information
                            </h3>
                            <p className="text-muted-foreground font-paragraph leading-relaxed">
                              {service.oemPartnershipInfo}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </AnimatedElement>

                  {/* Key Benefits */}
                  <AnimatedElement>
                    <Card className="border-none shadow-lg bg-white mt-8">
                      <CardContent className="p-8 md:p-12">
                        <h2 className="text-3xl font-heading font-bold text-primary mb-6">
                          Key Benefits
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            'Expert engineering team',
                            'Advanced technology tools',
                            'Quality assurance',
                            'Timely delivery',
                            'Cost-effective solutions',
                            'Comprehensive support'
                          ].map((benefit, index) => (
                            <div key={index} className="flex items-start">
                              <CheckCircle className="h-6 w-6 text-secondary mr-3 flex-shrink-0 mt-0.5" />
                              <span className="text-muted-foreground font-paragraph">
                                {benefit}
                              </span>
                            </div>
                          ))}
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
                      Interested in This Service?
                    </h2>
                    <p className="text-lg text-white/90 mb-8 font-paragraph">
                      Contact us today to discuss how we can help you with {service.serviceTitle?.toLowerCase()}.
                    </p>
                    <Button
                      asChild
                      size="lg"
                      className="bg-secondary hover:bg-secondary/90 text-white font-paragraph text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      <Link to="/contact">Get in Touch</Link>
                    </Button>
                  </div>
                </AnimatedElement>
              </div>
            </section>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
