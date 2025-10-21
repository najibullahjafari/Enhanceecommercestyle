import { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Search, Menu, X, Heart, Eye, Star, TrendingUp, Zap, Shield, Truck, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { Input } from './components/ui/input';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  badge?: string;
  inCart?: number;
}

const categories = [
  { name: 'Electronics', icon: '⚡', color: 'from-blue-500 to-cyan-500', count: 234 },
  { name: 'Fashion', icon: '👔', color: 'from-pink-500 to-rose-500', count: 456 },
  { name: 'Home & Garden', icon: '🏡', color: 'from-green-500 to-emerald-500', count: 189 },
  { name: 'Sports', icon: '⚽', color: 'from-orange-500 to-amber-500', count: 312 },
  { name: 'Beauty', icon: '💄', color: 'from-purple-500 to-pink-500', count: 278 },
  { name: 'Books', icon: '📚', color: 'from-indigo-500 to-blue-500', count: 445 },
];

const products: Product[] = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    price: 299.99,
    originalPrice: 399.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    category: 'Electronics',
    rating: 4.8,
    reviews: 234,
    badge: 'Sale',
  },
  {
    id: 2,
    name: 'Smart Watch Pro',
    price: 449.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    category: 'Electronics',
    rating: 4.9,
    reviews: 456,
    badge: 'New',
  },
  {
    id: 3,
    name: 'Designer Sunglasses',
    price: 189.99,
    originalPrice: 249.99,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
    category: 'Fashion',
    rating: 4.7,
    reviews: 189,
  },
  {
    id: 4,
    name: 'Leather Backpack',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
    category: 'Fashion',
    rating: 4.6,
    reviews: 312,
    badge: 'Featured',
  },
  {
    id: 5,
    name: 'Minimalist Table Lamp',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop',
    category: 'Home & Garden',
    rating: 4.8,
    reviews: 145,
  },
  {
    id: 6,
    name: 'Yoga Mat Pro',
    price: 79.99,
    originalPrice: 99.99,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop',
    category: 'Sports',
    rating: 4.9,
    reviews: 267,
    badge: 'Sale',
  },
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cart, setCart] = useState<Record<number, number>>({});
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const addToCart = (productId: number) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const updateCart = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      const newCart = { ...cart };
      delete newCart[productId];
      setCart(newCart);
    } else {
      setCart(prev => ({ ...prev, [productId]: quantity }));
    }
  };

  const cartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  const filteredProducts = selectedCategory
    ? products.filter(p => p.category === selectedCategory)
    : products;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl tracking-tight">ModernShop</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#" className="text-slate-700 hover:text-blue-600 transition-colors">Home</a>
              <a href="#products" className="text-slate-700 hover:text-blue-600 transition-colors">Shop</a>
              <a href="#" className="text-slate-700 hover:text-blue-600 transition-colors">About</a>
              <a href="#" className="text-slate-700 hover:text-blue-600 transition-colors">Contact</a>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="hidden sm:flex relative">
                <Search className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-xs"
                  >
                    {cartCount}
                  </motion.div>
                )}
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-xl"
          >
            <div className="px-4 py-4 space-y-3">
              <a href="#" className="block px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors">Home</a>
              <a href="#products" className="block px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors">Shop</a>
              <a href="#" className="block px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors">About</a>
              <a href="#" className="block px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors">Contact</a>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-6 bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30">
                🎉 New Collection Available
              </Badge>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl mb-6 tracking-tight">
                Discover Your
                <span className="block bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                  Perfect Style
                </span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-lg">
                Shop the latest trends with exclusive deals. Free shipping on orders over $50.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 shadow-xl shadow-black/10 group">
                  Shop Now
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm">
                  View Collections
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12">
                {[
                  { label: 'Products', value: '1000+' },
                  { label: 'Happy Customers', value: '50K+' },
                  { label: 'Rating', value: '4.9★' },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                  >
                    <div className="text-3xl">{stat.value}</div>
                    <div className="text-sm text-blue-200">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-3xl blur-2xl opacity-30 animate-pulse" />
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=800&fit=crop"
                  alt="Hero"
                  className="relative rounded-3xl shadow-2xl"
                />
              </div>

              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -left-8 top-20 bg-white rounded-2xl p-4 shadow-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-600">Trending</div>
                    <div className="text-slate-900">+127% Sales</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute -right-8 bottom-20 bg-white rounded-2xl p-4 shadow-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-600">Secure</div>
                    <div className="text-slate-900">100% Safe</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="border-y border-slate-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Truck, label: 'Free Shipping', desc: 'On orders $50+' },
              { icon: Shield, label: 'Secure Payment', desc: '100% Protected' },
              { icon: Zap, label: 'Fast Delivery', desc: '2-3 Days' },
              { icon: Heart, label: '30-Day Returns', desc: 'Money Back' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-3"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-slate-900">{item.label}</div>
                  <div className="text-sm text-slate-600">{item.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl mb-4 tracking-tight">Shop by Category</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Explore our diverse collection across multiple categories
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05, y: -4 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                onClick={() => setSelectedCategory(category.name)}
                className="group relative overflow-hidden rounded-2xl bg-white border-2 border-slate-200 p-6 hover:border-blue-500 hover:shadow-xl transition-all"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                <div className="relative">
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="text-slate-900 mb-1">{category.name}</h3>
                  <p className="text-sm text-slate-600">{category.count} items</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
            <div>
              <h2 className="text-4xl sm:text-5xl mb-2 tracking-tight">Featured Products</h2>
              <p className="text-xl text-slate-600">
                {selectedCategory ? `Showing ${selectedCategory}` : 'Discover our bestsellers'}
              </p>
            </div>
            {selectedCategory && (
              <Button
                variant="outline"
                onClick={() => setSelectedCategory(null)}
                className="border-slate-300"
              >
                <X className="w-4 h-4 mr-2" />
                Clear Filter
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-blue-500 hover:shadow-2xl transition-all duration-300"
              >
                {/* Image */}
                <div className="relative overflow-hidden bg-slate-100 aspect-square">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-4 left-4">
                      <Badge
                        className={`
                          ${product.badge === 'Sale' ? 'bg-red-500' : ''}
                          ${product.badge === 'New' ? 'bg-green-500' : ''}
                          ${product.badge === 'Featured' ? 'bg-blue-500' : ''}
                          text-white shadow-lg
                        `}
                      >
                        {product.badge}
                      </Badge>
                    </div>
                  )}

                  {/* Quick Actions */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="icon" variant="secondary" className="rounded-full shadow-lg">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="secondary" className="rounded-full shadow-lg">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="text-sm text-slate-600 mb-2">{product.category}</div>
                  <h3 className="text-slate-900 mb-2 line-clamp-1">{product.name}</h3>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-slate-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-slate-600">({product.reviews})</span>
                  </div>

                  {/* Price & Actions */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl text-blue-600">${product.price}</div>
                      {product.originalPrice && (
                        <div className="text-sm text-slate-400 line-through">
                          ${product.originalPrice}
                        </div>
                      )}
                    </div>

                    {cart[product.id] ? (
                      <div className="flex items-center gap-2 bg-slate-100 rounded-xl p-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 rounded-lg hover:bg-white"
                          onClick={() => updateCart(product.id, cart[product.id] - 1)}
                        >
                          -
                        </Button>
                        <span className="w-8 text-center">{cart[product.id]}</span>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 rounded-lg hover:bg-white"
                          onClick={() => updateCart(product.id, cart[product.id] + 1)}
                        >
                          +
                        </Button>
                      </div>
                    ) : (
                      <Button
                        size="icon"
                        className="rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 hover:shadow-lg hover:shadow-blue-500/30"
                        onClick={() => addToCart(product.id)}
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl mb-4 tracking-tight">Stay in the Loop</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Subscribe to get special offers, free giveaways, and updates on new arrivals
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 backdrop-blur-sm h-12"
              />
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl">ModernShop</span>
              </div>
              <p className="text-slate-400 mb-6">
                Your trusted partner for premium products and exceptional shopping experience.
              </p>
              <div className="flex gap-3">
                {['facebook', 'twitter', 'instagram'].map((social) => (
                  <button
                    key={social}
                    className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors flex items-center justify-center"
                  >
                    <span className="sr-only">{social}</span>
                    <div className="w-5 h-5 rounded-full bg-slate-600" />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="mb-4">Quick Links</h3>
              <ul className="space-y-3 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h3 className="mb-4">Customer Service</h3>
              <ul className="space-y-3 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Track Order</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="mb-4">Contact Us</h3>
              <ul className="space-y-3 text-slate-400">
                <li>📞 +1 (555) 123-4567</li>
                <li>📧 hello@modernshop.com</li>
                <li>📍 123 Commerce St, NY 10001</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-400 text-sm">
            <div>© 2025 ModernShop. All rights reserved.</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
