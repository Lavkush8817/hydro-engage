import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { Input } from '@/components/ui/input';
import { BaseCrudService } from '@/integrations';
import { EngineeringServices } from '@/entities';
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

export default function ServicesPage() {
  const [services, setServices] = useState<EngineeringServices[]>([]);
  const [filteredServices, setFilteredServices] = useState<EngineeringServices[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      setIsLoading(true);
      try {
        const result = await BaseCrudService.getAll<EngineeringServices>('engineeringservices');
        setServices(result.items);
        setFilteredServices(result.items);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredServices(services);
    } else {
      const filtered = services.filter(service =>
        service.serviceTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.shortDescription?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredServices(filtered);
    }
  }, [searchQuery, services]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

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
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-8">
                A & S Engineering Services
              </h1>
              <div className="space-y-6 text-base md:text-lg text-white/95 font-paragraph leading-relaxed">
                <p>
                  Where power meets precision. We are dedicated to providing the highest quality service for all types of hydraulic rock breakers, regardless of the brand. Our mission is to ensure that your machinery never stops, no matter how tough the terrain.
                </p>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                  <h2 className="text-xl md:text-2xl font-heading font-semibold mb-4">Expertise in Every Component</h2>
                  <p>
                    We don't just repair; we restore. Our team specializes in diagnosing and fixing every intricate part of a hydraulic breaker. From minor adjustments to major overhauls, we solve problems related to core parts (Front Head, Back Head, Piston, and Cylinder), structural integrity (Through Bolts, Bracket Body issues, and Mounting Bolt failures), and performance tuning (Nitrogen Gas charging and resolving all types of stroke and pressure-related problems).
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                  <h2 className="text-xl md:text-2xl font-heading font-semibold mb-4">Multi-Brand Machine Servicing</h2>
                  <p>
                    Beyond being masters of rock breakers, we extend our premium technical services to world-class heavy machinery. We provide specialized maintenance and repair for Tata, Hyundai, Sany, and other leading excavator brands. Our engineers possess expertise in every single machine in construction equipment and larger machinery—any brand, any problem, one solution.
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                  <h2 className="text-xl md:text-2xl font-heading font-semibold mb-4">Driven by a Qualified Engineering Team</h2>
                  <p>
                    What truly defines A & S Engineering Services is our elite technical workforce. We believe that professional machinery deserves professional hands. Our workforce consists of a high-performing engineer team, with every engineer professionally trained, holding B.Tech or Diploma degrees in Mechanical Engineering. This academic background allows us to deliver solutions based on scientific accuracy and technical depth.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedElement>
        </div>

        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Search Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedElement>
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 py-6 text-lg font-paragraph border-2 focus:border-secondary"
                />
              </div>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="min-h-[500px]">
            {isLoading ? null : filteredServices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredServices.map((service, index) => (
                  <AnimatedElement key={service._id} delay={index * 100}>
                    <Card className="h-full border-none shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden group bg-white">
                      {service.serviceImage && (
                        <div className="relative h-56 overflow-hidden">
                          <Image
                            src={service.serviceImage}
                            alt={service.serviceTitle || 'Service'}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            width={400}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        </div>
                      )}
                      <CardContent className="p-6">
                        <h3 className="text-xl font-heading font-semibold text-primary mb-3 group-hover:text-secondary transition-colors">
                          {service.serviceTitle}
                        </h3>
                        <p className="text-muted-foreground font-paragraph mb-4 line-clamp-4">
                          {service.shortDescription}
                        </p>
                        <Link
                          to={`/services/${service._id}`}
                          className="inline-flex items-center text-secondary hover:text-secondary/80 font-paragraph font-semibold transition-colors"
                        >
                          Learn More <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </CardContent>
                    </Card>
                  </AnimatedElement>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-muted-foreground font-paragraph text-lg">
                  {searchQuery ? 'No services found matching your search.' : 'No services available at the moment.'}
                </p>
              </div>
            )}
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
                Need a Custom Solution?
              </h2>
              <p className="text-lg text-white/90 mb-8 font-paragraph">
                Our team of experts is ready to discuss your specific requirements and create a tailored solution for your business.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center bg-secondary hover:bg-secondary/90 text-white font-paragraph text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Contact Us Today <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </AnimatedElement>
        </div>
      </section>

      <Footer />
    </div>
  );
}
