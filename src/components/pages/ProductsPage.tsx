import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Image } from '@/components/ui/image';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Phone } from 'lucide-react';
import { useState } from 'react';

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Sample products - these are the original products displayed on the website
  const sampleProducts = [
    {
      id: 1,
      name: 'Excavator Teeth & Adapters',
      category: 'spares',
      description: 'Premium Qubota excavator teeth and adapters engineered for maximum durability and performance. Manufactured with high-grade alloy steel for extended service life and superior wear resistance in demanding excavation operations.',
      image: 'https://static.wixstatic.com/media/06e14d_458112a76baf48569db35c7862c33494~mv2.webp',
    },
    {
      id: 2,
      name: 'Hydraulic Fasteners & Bolts',
      category: 'hydraulics',
      description: 'Heavy-duty Qubota hydraulic fasteners and bolts crafted from premium steel alloys. Built to withstand extreme pressure and vibration, ensuring reliable performance and long-lasting durability in hydraulic systems.',
      image: 'https://static.wixstatic.com/media/06e14d_05aacc7436c74a7c9323d30032398dfb~mv2.webp',
    },
    {
      id: 3,
      name: 'Swing Bearings',
      category: 'spares',
      description: 'Qubota, in partnership with SHINIL Precision, offers high-quality swing bearings with precise gear-cutting and advanced technology, supporting diameters up to 6,500 mm for heavy equipment.',
      longDescription: 'Qubota proudly serves as the exclusive distributor for SHINIL Precision Co. Ltd. of South Korea, a leader in swing bearing manufacturing with an annual production capacity of 250,000 units. SHINIL\'s state-of-the-art facilities boast cutting-edge technology and specialized expertise for precision gear cutting and rigorous testing of swing bearings up to an impressive 6,500 mm in outer diameter. Qubota is committed to delivering these superior quality swing bearings to customers in India.\n\nKey Features:\n• Precisely gear-cut bearings ensuring an exact fit and exceptionally smooth operation\n• Manufacturing by Shinil utilizing advanced technological processes and stringent quality assurance\n• Broad diameter range (up to 6,500 mm) guaranteeing compatibility with a wide array of heavy equipment\n• Exclusive distribution by Qubota, ensuring reliable availability and dedicated customer service',
      image: 'https://static.wixstatic.com/media/06e14d_9486f58c907f41918926dc2a3b639b81~mv2.webp',
    },
    {
      id: 4,
      name: 'Pins & Bushes',
      category: 'spares',
      description: 'Qubota offers robust excavator pins and bushings, crafted from premium steel for superior strength and enduring performance in challenging environments.',
      longDescription: 'Qubota specializes in the production of excavator pins and bushings, engineered to deliver exceptional resilience under the most rigorous operational demands. Utilizing high-grade steel, these components ensure unparalleled dependability and extended service life. Through stringent testing and precise manufacturing techniques, Qubota provides optimal solutions that enhance your excavator\'s efficiency. Rely on Qubota for outstanding pins and bushings built to endure the harshest conditions.',
      image: 'https://static.wixstatic.com/media/06e14d_1cfde715435b4aaa8761ff2fc1447127~mv2.webp',
    },
    {
      id: 5,
      name: 'Fuel & Air Filters',
      category: 'filtration',
      description: 'High-efficiency Qubota fuel and air filters designed to protect engine components and maximize performance. Premium filtration media ensures clean fuel and air supply, extending engine life and reducing maintenance costs.',
      image: 'https://static.wixstatic.com/media/06e14d_f5851c8b465e47828ea2e3d1e0f353e2~mv2.webp',
    },
    {
      id: 6,
      name: 'Rock-Breaker Chisels',
      category: 'spares',
      description: 'Qubota\'s rock-breaker chisels are engineered for heavy-duty demolition and quarrying, offering superior durability and performance.',
      longDescription: 'Qubota\'s rock-breaker chisels are specifically designed and constructed for boulder breaking, concrete demolition, quarrying, slab removal, and sloped/bedrock surfaces. Qubota produces these chisels in its own 39,000 sq m, state-of-the-art facility with global-brand equipment, complete heat-treatment and paint-shop facilities, and multi-stage quality control. Its in-house R&D center constantly improves durability and performance. Made proudly in India from Qubota ISO-certified plant.\n\nKey Features:\n• Chisel diameter ranges from 40 mm to 240 mm\n• Designed with the highest quality raw materials and precise heat treatment\n• Manufacturing range supports major rock-breaker brands and all sizes\n• Strong design for intensive breaking in hard rock and concrete',
      image: 'https://static.wixstatic.com/media/06e14d_c22fe9afa195490b8c1db08e6436c90f~mv2.webp',
    },
    {
      id: 7,
      name: 'Bucket Teeth & Wear Parts',
      category: 'spares',
      description: 'Qubota offers a comprehensive range of Ground Engaging Tools (GET) and wear parts, including teeth, adapters, pins, and locks. Manufactured from high-alloy boron steel with precise heat treatment, these components ensure superior durability and cost-effectiveness for all major OEM mining and construction equipment.',
      longDescription: 'Qubota delivers optimal and economical Ground Engaging Tools (GET) solutions, featuring a diverse product line of teeth, adapters, pins, and locks. These are designed to cater to a wide spectrum of applications, from compact to large-scale mining and construction machinery. Leveraging the extensive expertise of Black Cat Blades Ltd., a company with over 45 years of experience and multiple production facilities globally, Qubota ensures world-class quality. Our wear parts, including blades and end bits, are meticulously fabricated from high-alloy boron steel and undergo precise heat treatment to meet the stringent demands of heavy earthmoving equipment. Key Features include: a complete selection of wear components such as teeth, adapters, side cutters, and cutting edges; manufacturing with high-alloy boron steel and advanced heat treatment for enhanced durability; compatibility with most leading OEM bucket and undercarriage systems; and a design focused on minimizing operational costs while ensuring reliable performance in the most challenging environments.',
      image: 'https://static.wixstatic.com/media/06e14d_7598ee99464d42098aa5e975afb2c7e1~mv2.png',
    },
    {
      id: 8,
      name: 'Onboard Weighing System',
      category: 'spares',
      description: 'Qubota, as the official distributor of LOADRITE, offers advanced onboard weighing systems for precise, real-time load measurement, enhancing productivity and reducing operational costs by eliminating scale house trips.',
      longDescription: 'Qubota is the official distributor for the New Zealand-based LOADRITE onboard weighing system, engineered for unparalleled accuracy. This innovative system enables operators to precisely calculate, weigh, and record each load as it is lifted, eliminating the need for repetitive trips to a scale house. By integrating LOADRITE, businesses can significantly save time, boost productivity, and mitigate wear and tear or damage caused by overloaded trucks.\n\nKey Features:\n• Real-time load measurement for enhanced accuracy\n• Robust design for demanding and dynamic operational environments\n• Contributes to reduced fuel consumption and optimized loading cycles\n• Intuitive, advanced interface for straightforward and rapid operation\n• Consistently reliable load data to improve overall productivity',
      image: 'https://static.wixstatic.com/media/06e14d_6b6b9f8ed73840e1a83b85b906c3a221~mv2.webp',
    },
    {
      id: 9,
      name: 'Undercarriage Components',
      category: 'spares',
      description: 'Robust Qubota undercarriage components designed for extreme durability and reliability. Built with reinforced steel construction to withstand continuous stress and provide extended service life in challenging terrain.',
      image: 'https://static.wixstatic.com/media/06e14d_758f05a486b84fa092d26676eef37988~mv2.webp',
    },
    {
      id: 10,
      name: 'Hydraulic Pump',
      category: 'hydraulics',
      description: 'High-performance Qubota hydraulic pump engineered for rock breaker equipment and heavy-duty applications. Precision-manufactured with advanced sealing technology to deliver consistent pressure and flow rates, ensuring reliable operation in demanding conditions.',
      image: 'https://static.wixstatic.com/media/06e14d_fbe5b3621f6544b0b117bb3fe545b93b~mv2.png',
    },
    // {
    //   id: 11,
    //   name: 'Engage Machine',
    //   category: 'spares',
    //   description: 'Professional-grade Qubota engage machine designed for seamless integration with hydraulic rock breaker systems. Built with precision engineering to ensure smooth engagement and reliable performance in continuous industrial operations.',
    //   image: 'https://static.wixstatic.com/media/06e14d_8f4103098eae4d21be25dc4c6bf83919~mv2.png',
    // },
    {
      id: 12,
      name: 'Pressure Meter',
      category: 'hydraulics',
      description: 'Precision Qubota pressure meter designed for accurate monitoring of hydraulic systems in rock breaker equipment. Features digital display and high-accuracy sensors for real-time pressure readings, ensuring optimal system performance and safety.',
      image: 'https://static.wixstatic.com/media/06e14d_9b5eccca30564d93a0064dcf78b8bd20~mv2.png',
    },
    {
      id: 13,
      name: 'Hydraulic Hose Assembly',
      category: 'hydraulics',
      description: 'Heavy-duty Qubota hydraulic hose assembly engineered for high-pressure applications in rock breaker systems. Manufactured with premium materials and reinforced construction to withstand extreme pressure and temperature fluctuations.',
      image: 'https://static.wixstatic.com/media/06e14d_a6e496907b7d4f3fb807c2e428fee228~mv2.png',
    },
    {
      id: 14,
      name: 'Accumulator Tank',
      category: 'hydraulics',
      description: 'Robust Qubota accumulator tank designed for energy storage and pressure stabilization in hydraulic rock breaker systems. Built with high-grade steel construction and advanced safety features for reliable long-term performance.',
      image: 'https://static.wixstatic.com/media/06e14d_d8a429c148b140ddad853182c1f58799~mv2.png',
    },
    {
      id: 15,
      name: 'Ground Engaging Tools (GET) Solutions',
      category: 'spares',
      description: 'Qubota delivers superior Ground Engaging Tools (GET) solutions, including teeth, adapters, pins, and locks, engineered for diverse mining and construction applications. Our high-grade, heat-treated boron steel components ensure exceptional durability and performance, reducing operational costs across all major OEM earthmoving equipment.',
      longDescription: 'Qubota offers a comprehensive range of cost-effective Ground Engaging Tools (GET) designed to meet the rigorous demands of mining and construction. Our product line encompasses teeth, adapters, pins, and locks, suitable for equipment from the smallest to the largest scale. Leveraging over 45 years of expertise from Black Cat Blades Ltd., Qubota\'s GET solutions are manufactured in state-of-the-art facilities, utilizing high-alloy boron steel and precise heat treatment. This meticulous production process ensures that our blades and end bits meet exacting specifications for durability and reliability.\n\nKey Features:\n• Complete array of wear components such as teeth, adapters, side cutters, and cutting edges\n• Manufacturing with high-alloy boron steel and precise heat treatment for enhanced durability\n• Compatibility with most leading OEM bucket and undercarriage systems\n• Design focused on reducing operating costs while performing reliably in the harshest environments',
      image: 'https://static.wixstatic.com/media/06e14d_ff93c37d2dd74194a810fc7cccd58a9b~mv2.png?originWidth=640&originHeight=448',
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
                  <p className="font-paragraph text-base text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {selectedProduct.longDescription || selectedProduct.description}
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
