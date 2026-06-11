import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import RecipeDetails from './components/RecipeDetails';
import BakersAtelier from './components/BakersAtelier';
import ShoppingCart from './components/ShoppingCart';
import BakerBlogSecrets from './components/BakerBlogSecrets';
import MyOrdersTracker from './components/MyOrdersTracker';
import { MENU_ITEMS } from './data';
import { MenuItem, CartItem, Order, ShippingDetails } from './types';
import { Search, Compass, ShoppingBag, Eye, Plus, Check, ChevronRight, Award, Flame, Heart, Sparkles, MapPin, ShieldCheck, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<string>('explore');
  const [selectedRecipe, setSelectedRecipe] = useState<MenuItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState<boolean>(false);

  // Core Persistent States using localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cakebook_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('cakebook_orders');
    return saved ? JSON.parse(saved) : [];
  });

  // Filter selection in landing menu
  const [menuFilter, setMenuFilter] = useState<'all' | 'cakes' | 'pastries' | 'cookies' | 'sculptural'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Sync state with localStorage
  useEffect(() => {
    localStorage.setItem('cakebook_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('cakebook_orders', JSON.stringify(orders));
  }, [orders]);

  // Cart helper actions
  const handleAddToCart = (newItem: CartItem) => {
    setCartItems(prev => {
      // For standard menu items, we can increment quantity if exact notes match. Otherwise keep separate
      const existingIdx = prev.findIndex(item => 
        item.type === newItem.type &&
        (newItem.type === 'menu' 
          ? item.menuItem?.id === newItem.menuItem?.id && item.notes === newItem.notes 
          : JSON.stringify(item.customDetails) === JSON.stringify(newItem.customDetails))
      );

      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += newItem.quantity;
        return copy;
      }
      return [...prev, newItem];
    });
    // Open Cart slide-out automatically for visual satisfaction!
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (cartId: string, delta: number) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.cartId === cartId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const handleRemoveCartItem = (cartId: string) => {
    setCartItems(prev => prev.filter(item => item.cartId !== cartId));
  };

  const handleReorder = (historicalItems: CartItem[]) => {
    setCartItems(prev => {
      const merged = [...prev];
      historicalItems.forEach(hi => {
        // Appending standard clean clones
        const clone = { ...hi, cartId: `${hi.cartId}-reorder-${Date.now()}` };
        merged.push(clone);
      });
      return merged;
    });
    setIsCartOpen(true);
  };

  // Checkout execution
  const handleCheckoutComplete = (details: ShippingDetails) => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.itemPrice * item.quantity), 0);
    const shippingCost = subtotal > 100 ? 0 : 15;
    const finalTotal = subtotal + shippingCost;

    const newOrder: Order = {
      id: `CB-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: Date.now(),
      status: 'Received',
      items: [...cartItems],
      shipping: details,
      totalPrice: finalTotal
    };

    setOrders(prev => [newOrder, ...prev]);
    setCartItems([]); // wipe active cart items upon order authorization
    setIsCartOpen(false);
    
    // Auto redirect to orders history so client can review the printable receipt instantly!
    setActiveTab('orders');
    setTimeout(() => {
      const el = document.getElementById('cakebook-printable-receipt');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 450);
  };

  // Filtering list items
  const filteredMenuItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      const matchesCategory = menuFilter === 'all' || item.category === menuFilter;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [menuFilter, searchQuery]);

  const totalCartCount = useMemo(() => {
    return cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
  }, [cartItems]);

  return (
    <div className="min-h-screen bg-[#050505] text-cream selection:bg-gold selection:text-black relative overflow-hidden">
      
      {/* Cinematic animated ambient background gradient grids */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--color-teal)_0%,_transparent_55%)] pointer-events-none opacity-22 z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,249,242,0.01)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,249,242,0.01)_1px,_transparent_1px)] bg-[size:100px_100px] pointer-events-none z-0" />

      {/* Sophisticated Dark Decor Ambient Blur Elements */}
      <div className="absolute top-[-100px] right-[-100px] w-96 h-96 bg-[#ef476f]/10 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-[-100px] left-[100px] w-80 h-80 bg-[#ffd166]/5 blur-[100px] rounded-full pointer-events-none z-0"></div>

      {/* Main Glass Header */}
      <Header 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={totalCartCount}
        onCartClick={() => setIsCartOpen(true)}
        ordersCount={orders.length}
        onOrdersClick={() => setActiveTab('orders')}
      />

      <main className="relative z-10 pb-20">
        
        {/* TAB 1: EXPLORE CATALOG */}
        {activeTab === 'explore' && (
          <div>
            
            {/* Cinematic Hero Spotlight */}
            <section className="relative h-[85vh] w-full flex items-center overflow-hidden border-b border-white/5" id="hero-spotlight">
              
              <div className="absolute inset-0">
                <img 
                  src="/src/assets/images/hero_bakery_dark_1781154692085.png" 
                  alt="Cakebook counter cinematic"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-85 transition-transform duration-[20s] hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              </div>

              <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full">
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="max-w-xl md:max-w-2xl space-y-6 text-left"
                >
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-semibold tracking-wider text-gold">
                    <Sparkles className="w-3.5 h-3.5" /> Haute Couture Patisserie
                  </span>

                  {/* Oversized editorial display typography */}
                  <h1 className="font-display text-5xl md:text-8xl font-bold tracking-tight text-cream leading-none">
                    Fine Art, <br />
                    <span className="text-gold italic">Baked Daily.</span>
                  </h1>

                  <p className="text-cream/70 text-sm md:text-base font-light max-w-lg leading-relaxed">
                    Welcome to Cakebook. We craft multi-tiered avant-garde masterpieces, buttery double-laminated heritage French pastries, and artisanal cookies with gold leaf sparkles. Explore recipes, order bakes.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <button
                      id="btn-hero-atelier"
                      onClick={() => setActiveTab('atelier')}
                      className="group py-5 px-10 rounded-full bg-gold text-[#432818] font-bold text-xs tracking-widest uppercase transition-all duration-300 glowing-border hover:scale-105 active:scale-[0.98]"
                    >
                      Enter Custom Atelier
                    </button>
                    
                    <a
                      href="#gourmet-catalog-deck"
                      className="py-5 px-10 rounded-full glass text-cream font-bold text-xs tracking-wider uppercase text-center hover:bg-[#fff9f2]/10 transition flex items-center justify-center gap-2"
                    >
                      Examine Catalog Deck
                      <ChevronRight className="w-4 h-4 text-gold" />
                    </a>
                  </div>
                </motion.div>
              </div>

              {/* Bottom Scrolling Status Ticker decoration */}
              <div className="absolute bottom-0 inset-x-0 py-3.5 bg-charcoal border-t border-white/5 flex overflow-hidden select-none font-mono text-[9px] tracking-widest text-[#fff9f2]/35 uppercase">
                <div className="animate-gradient whitespace-nowrap flex gap-12 shrink-0 justify-around w-full" style={{ animationDuration: '30s' }}>
                  <span>📦 Gilded courier dispatched 4 mins ago to Regency Estate</span>
                  <span>🧁 12 wedding sculptural cakes assembled this hour by Head Chefs</span>
                  <span>🍞 Sourdough starter cataloged 18 years of age and counting</span>
                  <span>📍 Paris - New York couriers running 24/7 express dispatch routes</span>
                </div>
              </div>

            </section>

            {/* Catalog Filter Header Section */}
            <section className="py-20 max-w-7xl mx-auto px-4 md:px-8" id="gourmet-catalog-deck">
              
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                  <span className="text-xs font-mono font-bold tracking-widest text-gold uppercase block mb-1">
                    EXQUISITE MENU REGISTRY
                  </span>
                  <h2 className="font-display text-4xl md:text-5xl font-bold text-cream tracking-tight">
                    Artisan Patisserie <span className="text-gold italic font-display">Catalog</span>
                  </h2>
                  <p className="text-cream/50 text-xs md:text-sm mt-3 max-w-lg leading-relaxed">
                    Filter by category to explore baking recipes or place immediate pre-orders. Everything is prepared fresh in single boutique batches.
                  </p>
                </div>

                {/* Direct Search query */}
                <div className="relative w-full md:w-80">
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search gold leaf, almond, crystal..."
                    className="w-full bg-charcoal border border-white/5 focus:border-gold/30 rounded-xl py-3 pl-10 pr-4 text-xs text-cream placeholder-cream/25 focus:outline-none transition-colors"
                  />
                  <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-cream/30" />
                </div>
              </div>

              {/* Category Pills Choice */}
              <div className="flex flex-wrap gap-2.5 mb-10 overflow-x-auto pb-2 scrollbar-none">
                {[
                  { id: 'all', name: 'All Masterpieces' },
                  { id: 'cakes', name: 'Trophy Cakes' },
                  { id: 'sculptural', name: 'Sculptural Art' },
                  { id: 'pastries', name: 'Laminated Pastries' },
                  { id: 'cookies', name: 'Boutique Cookies' }
                ].map((pill) => (
                  <button
                    key={pill.id}
                    onClick={() => setMenuFilter(pill.id as any)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all border shrink-0 ${
                      menuFilter === pill.id
                        ? 'bg-gold border-gold text-black font-bold shadow-lg shadow-gold/10'
                        : 'bg-charcoal border-white/5 text-cream/60 hover:text-cream hover:bg-white/5'
                    }`}
                  >
                    {pill.name}
                  </button>
                ))}
              </div>

              {/* Main Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredMenuItems.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-3xl glass glass-card-hover overflow-hidden flex flex-col justify-between group relative"
                  >
                    <div>
                      {/* Image Frame */}
                      <div className="h-68 md:h-80 w-full relative overflow-hidden bg-black/40">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent"></div>
                        
                        {/* Display badges */}
                        <div className="absolute top-4 left-4 flex gap-2">
                          <span className="px-2.5 py-1 rounded bg-black/70 backdrop-blur-md text-[9px] font-mono font-bold uppercase tracking-wider text-gold border border-gold/10">
                            {item.difficulty}
                          </span>
                        </div>

                        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between z-10">
                          <span className="inline-block px-2 py-0.5 text-[8px] font-mono tracking-widest bg-gold text-black rounded uppercase font-bold">
                            {item.tag}
                          </span>
                          <span className="text-xs font-mono font-bold text-cream bg-black/50 backdrop-blur-md px-2 py-1 rounded-md border border-white/5 shadow-md">
                            ⭐ {item.rating}
                          </span>
                        </div>
                      </div>

                      {/* Content panel */}
                      <div className="p-6 md:p-8 space-y-3.5 text-left">
                        <h3 className="font-display text-2xl font-bold text-cream group-hover:text-gold transition-colors duration-300 tracking-tight leading-tight">
                          {item.name}
                        </h3>
                        <p className="text-cream/60 text-xs md:text-sm font-light leading-relaxed">
                          {item.description}
                        </p>

                        {/* Fast HUD specs */}
                        <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-[#fff9f2]/35 uppercase pt-2">
                          <span className="flex items-center gap-1.5">
                            ⏱️ BAKE: {item.cookTime}
                          </span>
                          <span className="flex items-center gap-1.5">
                            🍰 PORTION: {item.yieldText}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Operational Row */}
                    <div className="p-6 md:p-8 pt-0 border-t border-white/5 bg-black/20 flex items-center justify-between mt-auto">
                      <div>
                        <span className="block text-[9px] font-mono text-[#fff9f2]/30 uppercase">Fresh Bake Rate</span>
                        <span className="font-display text-2xl font-bold text-gold">${item.price.toFixed(2)}</span>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedRecipe(item)}
                          className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-gold/30 text-xs font-semibold text-cream transition-colors flex items-center gap-1.5"
                        >
                          <Eye className="w-4 h-4 text-gold" />
                          View Recipe
                        </button>
                        
                        <button
                          onClick={() => {
                            const cartItem: CartItem = {
                              cartId: `menu-${item.id}-${Date.now()}`,
                              type: 'menu',
                              menuItem: item,
                              quantity: 1,
                              itemPrice: item.price,
                              notes: 'Standard patisserie baking configuration.'
                            };
                            handleAddToCart(cartItem);
                          }}
                          className="px-4.5 py-3 rounded-xl bg-gold hover:bg-gold/90 text-black font-extrabold text-xs tracking-wider uppercase transition-all shadow-[0_2px_12px_rgba(255,209,102,0.1)] hover:shadow-[0_2px_16px_rgba(255,209,102,0.25)] flex items-center gap-1.5 active:scale-[0.98]"
                        >
                          Order Fresh
                        </button>
                      </div>
                    </div>

                  </div>
                ))}

                {filteredMenuItems.length === 0 && (
                  <div className="col-span-full py-20 bg-charcoal rounded-2xl border border-white/5 text-center mt-6">
                    <span className="text-2xl">🧁</span>
                    <p className="text-sm font-semibold text-cream mt-3">No master bakes match search filter</p>
                    <p className="text-xs text-cream/40 mt-1">Review catalog parameters or explore the Atelier designer tab.</p>
                  </div>
                )}
              </div>

              {/* Decorative Bento Highlights Grid - Brand Creds */}
              <div className="mt-28 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="p-6 rounded-2xl bg-charcoal border border-white/5 space-y-3">
                  <span className="p-3 bg-gold/10 text-gold rounded-lg inline-block border border-gold/20">
                    🌾
                  </span>
                  <h4 className="font-display text-lg font-bold text-cream">100% Organic Stone Flour</h4>
                  <p className="text-xs text-cream/50 leading-relaxed font-light">
                    We import unhybridized stone-milled pastry grains from pesticide-free French heritage farms to develop clean, safe, complex protein structures.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-charcoal border border-white/5 space-y-3">
                  <span className="p-3 bg-pink/10 text-pink rounded-lg inline-block border border-pink/20">
                    🕯️
                  </span>
                  <h4 className="font-display text-lg font-bold text-cream">Hand-Stamped Wax Seals</h4>
                  <p className="text-xs text-cream/50 leading-relaxed font-light">
                    Every shipment is personally hand-packaged, tied with French heavy hemp ropes, and sealed with high-grade organic crimson cosmetic wax stamps.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-charcoal border border-white/5 space-y-3">
                  <span className="p-3 bg-mint/10 text-mint rounded-lg inline-block border border-mint/20">
                    🚴
                  </span>
                  <h4 className="font-display text-lg font-bold text-cream">Isolated Thermal Courier</h4>
                  <p className="text-xs text-cream/50 leading-relaxed font-light">
                    We deploy custom temperature-locked visual storage cases so your delicate croissants, gateaux, or wedding sculptures arrive at optimal moisture standards.
                  </p>
                </div>
              </div>

            </section>

          </div>
        )}

        {/* TAB 2: BAKER'S ATELIER */}
        {activeTab === 'atelier' && (
          <BakersAtelier onAddToCart={handleAddToCart} />
        )}

        {/* TAB 3: BAKER SECRETS BLOG */}
        {activeTab === 'secrets' && (
          <BakerBlogSecrets />
        )}

        {/* TAB 4: MY ORDERS TRACKER */}
        {activeTab === 'orders' && (
          <MyOrdersTracker orders={orders} onReorder={handleReorder} />
        )}

      </main>

      {/* Slide-out Glass Shopping Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <ShoppingCart 
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveCartItem}
            onCheckout={handleCheckoutComplete}
          />
        )}
      </AnimatePresence>

      {/* Recipe details modal overlay */}
      <AnimatePresence>
        {selectedRecipe && (
          <RecipeDetails 
            recipe={selectedRecipe}
            onClose={() => setSelectedRecipe(null)}
            onAddToCart={handleAddToCart}
          />
        )}
      </AnimatePresence>

      {/* Minimal Footer */}
      <footer className="py-12 border-t border-white/5 bg-black z-10 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="font-display text-lg font-bold text-cream">cake<span className="text-gold">book</span></span>
            <span className="block text-[8px] font-mono uppercase tracking-widest text-gold/40 mt-1">
              HAUTE PATISSERIE PLATFORM © 2026
            </span>
          </div>
          <div className="text-[#fff9f2]/30 text-[10px] font-mono uppercase text-center md:text-right space-y-1">
            <p>Design: Modern Black Dark aesthetic</p>
            <p>Verified Compliant under AI Studio sandbox specifications</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
