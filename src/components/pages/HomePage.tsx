// WI-HPI
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Mail, Facebook, Linkedin, Instagram, Twitter, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { BaseCrudService } from '@/integrations';
import { EngineeringServices, ClientTestimonials } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Robust Animated Reveal Component - Crash Free
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
      { threshold: 0.1, rootMargin: '50px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default function HomePage() {
  const navigate = useNavigate();
  const [services, setServices] = useState<EngineeringServices[]>([]);
  const [testimonials, setTestimonials] = useState<ClientTestimonials[]>([]);
  const [isLoadingServices, setIsLoadingServices] = useState(true);
  const [isLoadingTestimonials, setIsLoadingTestimonials] = useState(true);
  
  // UI State
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);

  useEffect(() => {
    const fetchServices = async () => {
      setIsLoadingServices(true);
      try {
        const result = await BaseCrudService.getAll<EngineeringServices>('engineeringservices', {}, { limit: 10 });
        setServices(result.items);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setIsLoadingServices(false);
      }
    };

    const fetchTestimonials = async () => {
      setIsLoadingTestimonials(true);
      try {
        const result = await BaseCrudService.getAll<ClientTestimonials>('clienttestimonials', {}, { limit: 5 });
        setTestimonials(result.items);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setIsLoadingTestimonials(false);
      }
    };

    fetchServices();
    fetchTestimonials();
  }, []);

  // Handlers for Testimonial Carousel
  const nextTestimonial = () => {
    setActiveTestimonialIndex((prev) => (prev + 1) % Math.max(1, testimonials.length));
  };

  const prevTestimonial = () => {
    setActiveTestimonialIndex((prev) => (prev - 1 + Math.max(1, testimonials.length)) % Math.max(1, testimonials.length));
  };

  return (
    <div className="min-h-screen bg-background font-paragraph text-foreground" dir="ltr">
      <Header />
      {/* HERO SECTION */}
      <section className="relative h-[50vh] md:h-[70vh] min-h-[400px] md:min-h-[600px] flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://static.wixstatic.com/media/06e14d_24d660821d4043ce802c040e834eb7a5~mv2.png" 
            alt="Engineering Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/85 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <AnimatedElement>
              <div className="hidden md:flex items-center gap-2 text-xs md:text-sm text-white/70 mb-4 md:mb-6 tracking-wide overflow-x-auto">
                <Link to="/" className="hover:text-secondary transition-colors whitespace-nowrap">Home</Link>
                <span>›</span>
                <Link to="/what-we-do" className="hover:text-secondary transition-colors whitespace-nowrap">What We Do</Link>
                <span>›</span>
                <Link to="/solutions" className="hover:text-secondary transition-colors whitespace-nowrap">Product Engineering Solutions</Link>
                <span>›</span>
                <span className="text-secondary whitespace-nowrap">Product / Process Engineering & Manufacturing</span>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <h1 className="text-2xl md:text-5xl lg:text-6xl font-heading font-light text-white leading-tight mb-2 md:mb-4">
                Interdisciplinary Engineering Expertise
              </h1>
              <h2 className="text-lg md:text-3xl font-heading text-secondary mb-6 md:mb-10">
                With a Detailed yet Flexible Approach
              </h2>
            </AnimatedElement>

            <AnimatedElement delay={400}>
              <Button 
                onClick={() => navigate('/contact')}
                variant="link" 
                className="text-white hover:text-secondary p-0 text-base md:text-lg font-light group flex items-center gap-2"
              >
                Lets Talk 
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-2" />
              </Button>
            </AnimatedElement>
          </div>
        </div>
      </section>
      {/* INTRO SECTION */}
      <section className="py-12 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedElement>
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-4xl font-heading text-secondary mb-6 md:mb-10 text-center md:text-left">The Pinnacle of Hydraulic Engineering & Reliable Solutions</h2>
              
              <div className="space-y-4 md:space-y-6 text-muted-foreground leading-relaxed text-base md:text-lg">
                <p>
                  Welcome to A & S Engineering Services, where power meets precision. We are dedicated to providing the highest quality service for all types of hydraulic rock breakers, regardless of the brand. Our mission is to ensure that your machinery never stops, no matter how tough the terrain.
                </p>
                <p>
                  <strong className="text-foreground">Expertise in Every Component</strong><br/>
                  We don't just repair; we restore. Our team specializes in diagnosing and fixing every intricate part of a hydraulic breaker. From minor adjustments to major overhauls, we solve problems related to core parts (Front Head, Back Head, Piston, and Cylinder), structural integrity (Through Bolts, Bracket Body issues, and Mounting Bolt failures), and performance tuning (Nitrogen Gas charging and resolving all types of stroke and pressure-related problems).
                </p>
                <p>
                  <strong className="text-foreground">Multi-Brand Machine Servicing</strong><br/>
                  Beyond being masters of rock breakers, we extend our premium technical services to world-class heavy machinery. We provide specialized maintenance and repair for Tata, Hyundai, Sany and other leading excavator brands.
                </p>
                <p>
                  <strong className="text-foreground">Driven by a Qualified Engineering Team</strong><br/>
                  What truly defines A & S Engineering Services is our elite technical workforce. We believe that professional machinery deserves professional hands. Our workforce consists of a high-performing engineer team, with every engineer professionally trained, holding B.Tech or Diploma degrees in Mechanical Engineering. This academic background allows us to deliver solutions based on scientific accuracy and technical depth.
                </p>
                <p>
                  <strong className="text-foreground">Why Choose A & S Engineering Services?</strong><br/>
                  In an industry where every hour of downtime matters, we provide the reliability you need. We combine advanced engineering knowledge with practical field experience to deliver best-in-class quality that guarantees durability and maximizes your productivity. Any Brand, Any Problem, One Solution: A & S Engineering Services.
                </p>
              </div>
            </div>
          </AnimatedElement>
        </div>
      </section>
      {/* SERVICES SPLIT SECTION */}
      <section className="bg-[#5A5A5A] text-white">
        <div className="flex flex-col lg:flex-row min-h-[400px] md:min-h-[600px]">
          
          {/* Left Navigation */}
          <div className="w-full lg:w-[35%] py-8 md:py-16 lg:py-24 relative z-10 shadow-2xl">
            <AnimatedElement>
              <h3 className="text-xl md:text-2xl font-heading font-bold px-4 md:px-8 lg:px-16 mb-4 md:mb-8">Services</h3>
              
              <div className="flex flex-col relative max-h-[50vh] md:max-h-none overflow-y-auto md:overflow-y-visible">
                {isLoadingServices ? (
                  <div className="px-4 md:px-8 lg:px-16 py-8 flex justify-center">
                    <LoadingSpinner />
                  </div>
                ) : services.length > 0 ? (
                  services.map((service, idx) => (
                    <button
                      key={service._id}
                      onClick={() => setActiveServiceIndex(idx)}
                      className={`text-left px-4 md:px-8 lg:px-16 py-3 md:py-4 transition-all duration-300 relative group text-sm md:text-base ${
                        idx === activeServiceIndex
                          ? 'bg-secondary text-white font-medium shadow-lg scale-[1.02] z-10'
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span className="relative z-10">{service.serviceTitle}</span>
                      {/* Hover indicator line */}
                      <div className={`absolute left-0 top-0 bottom-0 w-1 bg-secondary transition-transform duration-300 origin-left ${
                        idx === activeServiceIndex ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`} />
                    </button>
                  ))
                ) : (
                  <div className="px-4 md:px-8 lg:px-16 text-gray-400 italic text-sm">No services currently available.</div>
                )}
              </div>
            </AnimatedElement>
          </div>

          {/* Right Content Area */}
          <div className="w-full lg:w-[65%] relative bg-primary overflow-hidden min-h-[300px] md:min-h-[400px]">
            {isLoadingServices ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <LoadingSpinner />
              </div>
            ) : services.length > 0 && services[activeServiceIndex] ? (
              <>
                {/* Background Image for Active Service */}
                <div className="absolute inset-0 transition-opacity duration-700">
                  <Image 
                    src={services[activeServiceIndex].serviceImage || "https://static.wixstatic.com/media/06e14d_d4334d461386478d817fef37d45427fb~mv2.png?originWidth=1152&originHeight=576"} 
                    alt={services[activeServiceIndex].serviceTitle || "Service"} 
                    className="w-full h-full object-cover opacity-40 mix-blend-overlay"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex items-center p-4 md:p-8 lg:p-16 z-10">
                  <AnimatedElement key={activeServiceIndex} className="max-w-2xl">
                    <p className="text-white/90 text-sm md:text-lg lg:text-xl leading-relaxed mb-4 md:mb-8 font-light">
                      {services[activeServiceIndex].shortDescription || 
                       services[activeServiceIndex].detailedDescription || 
                       "Explore our comprehensive engineering solutions designed to optimize your processes and enhance product quality."}
                    </p>
                    <Link 
                      to={`/services/${services[activeServiceIndex]._id}`} 
                      className="inline-flex items-center text-secondary font-medium hover:text-white transition-colors group text-sm md:text-base"
                    >
                      Explore More 
                      <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-2" />
                    </Link>
                  </AnimatedElement>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </section>
      {/* TESTIMONIALS SECTION */}
      <section className="py-12 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedElement>
            <h2 className="text-2xl md:text-4xl font-heading text-secondary text-center mb-8 md:mb-16">
              Client Testimonials
            </h2>

            <div className="max-w-5xl mx-auto relative">
              {isLoadingTestimonials ? (
                <div className="flex justify-center py-20">
                  <LoadingSpinner />
                </div>
              ) : testimonials.length > 0 ? (
                <div className="relative px-4 md:px-12">
                  {/* Carousel Navigation */}
                  {testimonials.length > 1 && (
                    <>
                      <button 
                        onClick={prevTestimonial}
                        className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-secondary transition-colors p-1 md:p-2"
                        aria-label="Previous testimonial"
                      >
                        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                      </button>
                      <button 
                        onClick={nextTestimonial}
                        className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-secondary transition-colors p-1 md:p-2"
                        aria-label="Next testimonial"
                      >
                        <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                      </button>
                    </>
                  )}

                  {/* Active Testimonial Content */}
                  <div className="text-center transition-opacity duration-500" key={activeTestimonialIndex}>
                    <p className="text-base md:text-xl text-muted-foreground italic leading-relaxed mb-6 md:mb-10">
                      "{testimonials[activeTestimonialIndex].testimonialText}"
                    </p>
                    
                    <div className="flex flex-col items-center justify-center">
                      {testimonials[activeTestimonialIndex].clientPhoto && (
                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden mb-3 md:mb-4 border-2 border-secondary/20">
                          <Image 
                            src={testimonials[activeTestimonialIndex].clientPhoto!} 
                            alt={testimonials[activeTestimonialIndex].clientName || "Client"} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <h4 className="text-secondary font-medium text-base md:text-lg">
                        {testimonials[activeTestimonialIndex].clientTitle || testimonials[activeTestimonialIndex].clientName}
                      </h4>
                      <p className="text-foreground font-medium text-sm md:text-base">
                        {testimonials[activeTestimonialIndex].companyName}
                      </p>
                    </div>
                  </div>
                  
                  {/* Carousel Indicators */}
                  {testimonials.length > 1 && (
                    <div className="flex justify-center gap-2 mt-8 md:mt-12">
                      {testimonials.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveTestimonialIndex(idx)}
                          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                            idx === activeTestimonialIndex ? 'bg-secondary w-8' : 'bg-gray-300 hover:bg-gray-400'
                          }`}
                          aria-label={`Go to testimonial ${idx + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center text-muted-foreground italic py-12">
                  No testimonials available at this time.
                </div>
              )}
            </div>
          </AnimatedElement>
        </div>
      </section>
      {/* PRE-FOOTER CONTACT SECTION */}
      <section className="relative bg-[#4A4A4A] text-white overflow-hidden">
        {/* Large Background Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03]">
          <span className="text-[6rem] md:text-[10rem] lg:text-[15rem] font-heading font-bold whitespace-nowrap">
            LET'S TALK
          </span>
        </div>

        <div className="container mx-auto px-4 py-12 md:py-24 relative z-10 text-center">
          <AnimatedElement>
            <a 
              href="mailto:asengineeringservices41wn@gmail.com" 
              className="text-xl md:text-4xl lg:text-5xl font-light hover:text-secondary transition-colors inline-flex items-center gap-2 md:gap-4 mb-6 md:mb-12 flex-wrap justify-center"
            >
              <Mail className="w-6 h-6 md:w-10 md:h-10 text-secondary flex-shrink-0" />
              <span className="break-all">asengineeringservices41wn@gmail.com</span>
            </a>

            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 text-xs md:text-sm tracking-widest uppercase text-gray-400">
              <a href="#" className="hover:text-white transition-colors flex items-center gap-1"><Facebook className="w-3 h-3 md:w-4 md:h-4"/> <span className="hidden md:inline">Facebook</span></a>
              <span className="text-gray-600">/</span>
              <a href="#" className="hover:text-white transition-colors flex items-center gap-1"><Linkedin className="w-3 h-3 md:w-4 md:h-4"/> <span className="hidden md:inline">Linkedin</span></a>
              <span className="text-gray-600">/</span>
              <a href="#" className="hover:text-white transition-colors flex items-center gap-1"><Instagram className="w-3 h-3 md:w-4 md:h-4"/> <span className="hidden md:inline">Instagram</span></a>
              <span className="text-gray-600">/</span>
              <a href="#" className="hover:text-white transition-colors flex items-center gap-1"><Twitter className="w-3 h-3 md:w-4 md:h-4"/> <span className="hidden md:inline">X</span></a>
              <span className="text-gray-600">/</span>
              <a href="#" className="hover:text-white transition-colors flex items-center gap-1"><Youtube className="w-3 h-3 md:w-4 md:h-4"/> <span className="hidden md:inline">Youtube</span></a>
            </div>
          </AnimatedElement>
        </div>
      </section>
      {/* CONTACT INFO BAR */}
      <section className="bg-white relative border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between py-8 md:py-8 relative gap-6 md:gap-0">
            
            {/* Floating Orange Circle */}
            <div className="absolute -top-12 md:-top-20 left-1/2 md:left-12 -translate-x-1/2 md:translate-x-0 w-24 h-24 md:w-40 md:h-40 bg-secondary rounded-full flex items-center justify-center text-white text-center font-heading font-medium text-xs md:text-base shadow-xl z-20 hover:scale-105 transition-transform cursor-pointer" onClick={() => navigate('/contact')}>
              HAVE ANY<br/>QUESTIONS?
            </div>

            {/* Phone Numbers */}
            <div className="mt-12 md:mt-0 md:ml-64 flex flex-col sm:flex-row gap-4 md:gap-12 text-foreground text-sm md:text-base">
              <div>
                <span className="text-gray-500 text-xs md:text-sm mr-2">INDIA :</span>
                <a href="tel:+917909455907" className="font-medium hover:text-secondary transition-colors">+91 7909455907</a>
              </div>
            </div>

            {/* Quick Nav */}
            <div className="flex flex-wrap gap-2 md:gap-8 text-xs md:text-sm font-medium text-gray-600 uppercase tracking-wide justify-center md:justify-end">
              <Link to="/what-we-do" className="hover:text-secondary transition-colors">What We Do</Link>
              <Link to="/about" className="hover:text-secondary transition-colors">About Us</Link>
              <Link to="/csr" className="hover:text-secondary transition-colors">CSR</Link>
              <Link to="/careers" className="hover:text-secondary transition-colors">Careers</Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
