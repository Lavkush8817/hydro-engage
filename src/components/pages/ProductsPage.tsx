import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mail, Phone, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const products = [
    {
      id: 1,
      name: 'Industrial Pumps',
      category: 'pumps',
      description: 'High-performance industrial pumps for various applications',
      image: 'https://static.wixstatic.com/media/06e14d_621099791d42425baa4c6376cab5516d~mv2.png?originWidth=256&originHeight=192',
    },
    {
      id: 2,
      name: 'Control Systems',
      category: 'controls',
      description: 'Advanced automation and control systems',
      image: 'https://static.wixstatic.com/media/06e14d_48073fc30085490291d3e6ce2b691ae8~mv2.png?originWidth=256&originHeight=192',
    },
    {
      id: 3,
      name: 'Hydraulic Components',
      category: 'hydraulics',
      description: 'Premium hydraulic parts and assemblies',
      image: 'https://static.wixstatic.com/media/06e14d_0d0a8886614348fea2391bae18f3787e~mv2.png?originWidth=256&originHeight=192',
    },
    {
      id: 4,
      name: 'Electrical Panels',
      category: 'electrical',
      description: 'Custom electrical panels and switchgear',
      image: 'https://static.wixstatic.com/media/06e14d_02dd7a29aeb44bed8a5e9619be4f6cdd~mv2.png?originWidth=256&originHeight=192',
    },
    {
      id: 5,
      name: 'Spare Parts Kit',
      category: 'spares',
      description: 'Complete spare parts kits for maintenance',
      image: 'https://static.wixstatic.com/media/06e14d_aef671743d1f425190749bf312d66708~mv2.png?originWidth=256&originHeight=192',
    },
    {
      id: 6,
      name: 'Pressure Gauges',
      category: 'instruments',
      description: 'Precision measurement instruments',
      image: 'https://static.wixstatic.com/media/06e14d_23137387a3f0410d9cd5d9b92547fc6b~mv2.png?originWidth=256&originHeight=192',
    },
    {
      id: 7,
      name: 'Valve Assemblies',
      category: 'valves',
      description: 'Industrial-grade valve systems',
      image: 'https://static.wixstatic.com/media/06e14d_8c60031dd7b744df99012b68da9d534f~mv2.png?originWidth=256&originHeight=192',
    },
    {
      id: 8,
      name: 'Filtration Systems',
      category: 'filtration',
      description: 'Advanced filtration and purification systems',
      image: 'https://static.wixstatic.com/media/06e14d_076d4de2e41c46f096764cba6267eb36~mv2.png?originWidth=256&originHeight=192',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'pumps', label: 'Pumps' },
    { id: 'controls', label: 'Controls' },
    { id: 'hydraulics', label: 'Hydraulics' },
    { id: 'electrical', label: 'Electrical' },
    { id: 'spares', label: 'Spare Parts' },
    { id: 'instruments', label: 'Instruments' },
    { id: 'valves', label: 'Valves' },
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
              Our Products
            </h1>
            <p className="font-paragraph text-lg text-primary-foreground/90 max-w-2xl mx-auto">
              Explore our comprehensive range of industrial products and components designed for excellence
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
                        <a href="mailto:info@company.com" className="text-link hover:underline">
                          info@company.com
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
                        <a href="tel:+1234567890" className="text-link hover:underline">
                          +1 (234) 567-890
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
    </div>
  );
};

export default ProductsPage;
