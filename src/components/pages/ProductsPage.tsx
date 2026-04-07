import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Mail, Phone, MessageSquare, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Sample products - these are the original products displayed on the website
  const sampleProducts = [
    {
      id: 1,
      name: 'Excavator Bucket Teeth',
      category: 'spares',
      description: 'Premium quality excavator bucket teeth engineered for maximum durability and performance. Manufactured with high-grade alloy steel for extended service life and superior wear resistance in demanding excavation operations.',
      image: 'https://static.wixstatic.com/media/06e14d_14e9574e7fd34e26b91143c5474a8c10~mv2.webp',
    },
    {
      id: 2,
      name: 'Hydraulic Fasteners & Bolts',
      category: 'hydraulics',
      description: 'Heavy-duty hydraulic fasteners and bolts crafted from premium steel alloys. Built to withstand extreme pressure and vibration, ensuring reliable performance and long-lasting durability in hydraulic systems.',
      image: 'https://static.wixstatic.com/media/06e14d_21fcdfd99c664e6c98becf2a0d3556ce~mv2.webp',
    },
    {
      id: 3,
      name: 'Hydraulic Cylinders & Tubes',
      category: 'hydraulics',
      description: 'Professional-grade hydraulic cylinders and tubes built for precision and reliability. Manufactured with hardened steel and advanced sealing technology for superior performance in heavy-duty industrial applications.',
      image: 'https://static.wixstatic.com/media/06e14d_78fa7751614340e6852ca4d23cc4a59a~mv2.webp',
    },
    {
      id: 4,
      name: 'Fuel & Air Filters',
      category: 'filtration',
      description: 'High-efficiency fuel and air filters designed to protect engine components and maximize performance. Premium filtration media ensures clean fuel and air supply, extending engine life and reducing maintenance costs.',
      image: 'https://static.wixstatic.com/media/06e14d_56a21955bd9a49be849156e017c3b5c0~mv2.webp',
    },
    {
      id: 5,
      name: 'Engine Filters & Components',
      category: 'filtration',
      description: 'Comprehensive engine filter and component solutions engineered for optimal performance and longevity. Made from advanced materials that resist heat, pressure, and chemical degradation for reliable engine protection.',
      image: 'https://static.wixstatic.com/media/06e14d_062235261c45419ab2de6fafa0e46e2d~mv2.webp',
    },
    {
      id: 6,
      name: 'Rock Breaker Components',
      category: 'spares',
      description: 'Durable rock breaker components engineered for maximum impact resistance and longevity. Premium alloy construction provides excellent wear characteristics in abrasive mining and construction environments.',
      image: 'https://static.wixstatic.com/media/06e14d_33b759966771412ea03d7a5f223ced59~mv2.webp',
    },
    {
      id: 7,
      name: 'Hydraulic Breaker Tools',
      category: 'hydraulics',
      description: 'High-performance hydraulic breaker tools designed for rock breaking and demolition applications. Precision-manufactured with advanced technology to deliver consistent impact force and reliability in demanding conditions.',
      image: 'https://static.wixstatic.com/media/06e14d_dd7c541000d44393a37d4c1390edc982~mv2.webp',
    },
    {
      id: 8,
      name: 'Pressure Monitoring System',
      category: 'hydraulics',
      description: 'Precision pressure monitoring system designed for accurate tracking of hydraulic systems. Features advanced sensors and digital display for real-time readings, ensuring optimal system performance and safety.',
      image: 'https://static.wixstatic.com/media/06e14d_59edf43932c94e13954ed386fdb006fa~mv2.webp',
    },
  ];

  const products = sampleProducts;

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'spares', label: 'Spare Parts' },
    { id: 'hydraulics', label: 'Hydraulics' },
    { id: 'filtration', label: 'Filtration' },
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-primary to-primary/80 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              Qubota Spare Parts & Components
            </h1>
            <p className="font-paragraph text-lg text-primary-foreground/90 max-w-2xl mx-auto">
              Premium quality spare parts and components provided by Qubota. Engineered for durability, reliability, and superior performance in demanding industrial applications.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex-1 w-full py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-12"
          >
            <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Filter by Category</h2>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-2 rounded-lg font-paragraph font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-secondary text-secondary-foreground shadow-lg'
                      : 'bg-muted text-foreground hover:bg-border'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Products Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {filteredProducts.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
                  <div className="w-full h-48 bg-muted overflow-hidden">
                    <Image src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                      {product.name}
                    </h3>
                    <p className="font-paragraph text-sm text-muted-foreground mb-4 flex-1">
                      {product.description}
                    </p>
                    <Button
                      onClick={() => setSelectedProduct(product)}
                      className="w-full bg-secondary hover:bg-accent text-secondary-foreground font-paragraph font-medium"
                    >
                      Learn More
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 md:p-12 border border-border"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                  Need a Specific Product?
                </h2>
                <p className="font-paragraph text-lg text-muted-foreground mb-6">
                  Don't see what you're looking for? We offer a wide range of spare parts and custom solutions. Contact our team directly to discuss your specific requirements.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 font-paragraph text-foreground">
                    <span className="text-secondary font-bold">✓</span>
                    Custom spare parts available
                  </li>
                  <li className="flex items-center gap-3 font-paragraph text-foreground">
                    <span className="text-secondary font-bold">✓</span>
                    OEM partnerships and support
                  </li>
                  <li className="flex items-center gap-3 font-paragraph text-foreground">
                    <span className="text-secondary font-bold">✓</span>
                    Fast delivery options
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-lg p-6 border border-border hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-heading font-bold text-foreground mb-1">Email Us</h3>
                      <p className="font-paragraph text-muted-foreground">
                        <a href="mailto:asengineeringservices41wn@gmail.com" className="text-link hover:underline">
                          asengineeringservices41wn@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6 border border-border hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-heading font-bold text-foreground mb-1">Call Us</h3>
                      <p className="font-paragraph text-muted-foreground">
                        <a href="tel:+917909455907" className="text-link hover:underline">
                          +91 7909455907
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6 border border-border hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <MessageSquare className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-heading font-bold text-foreground mb-1">Contact Form</h3>
                      <p className="font-paragraph text-muted-foreground">
                        <a href="/contact" className="text-link hover:underline">
                          Send us a message
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </section>

      <Footer />

      {/* Product Detail Modal */}
      <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle className="font-heading text-2xl text-foreground">
                  {selectedProduct.name}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="w-full h-64 bg-muted rounded-lg overflow-hidden">
                  <Image 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                    Product Description
                  </h3>
                  <p className="font-paragraph text-base text-muted-foreground leading-relaxed">
                    {selectedProduct.description}
                  </p>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <p className="font-paragraph text-sm text-muted-foreground">
                    <span className="font-bold text-foreground">Category:</span> {selectedProduct.category.charAt(0).toUpperCase() + selectedProduct.category.slice(1)}
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={() => setSelectedProduct(null)}
                    className="flex-1 bg-muted text-foreground hover:bg-border font-paragraph font-medium"
                  >
                    Close
                  </Button>
                  <Button
                    className="flex-1 bg-secondary hover:bg-accent text-secondary-foreground font-paragraph font-medium"
                    onClick={() => window.location.href = '/contact'}
                  >
                    Inquire Now
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductsPage;
