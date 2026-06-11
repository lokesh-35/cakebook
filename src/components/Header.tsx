import React from 'react';
import { ShoppingBag, ChefHat, Sparkles, BookOpen, Clock } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  onCartClick: () => void;
  onOrdersClick: () => void;
  ordersCount: number;
}

export default function Header({
  activeTab,
  setActiveTab,
  cartCount,
  onCartClick,
  onOrdersClick,
  ordersCount
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full glass px-4 md:px-12 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo with Gold Glow */}
        <button 
          onClick={() => setActiveTab('explore')}
          className="group flex items-center gap-3 text-left focus:outline-none focus:ring-0"
          id="btn-logo-home"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-black border border-gold/30 group-hover:border-gold transition-all duration-300">
            <Sparkles className="w-5 h-5 text-gold animate-pulse" />
            <div className="absolute inset-0 rounded-full bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
          </div>
          <div>
            <span className="font-display text-2xl md:text-3xl font-bold italic tracking-tighter text-cream group-hover:text-gold transition-colors duration-300">
              Cakebook<span className="text-pink font-sans not-italic text-sm ml-0.5">*</span>
            </span>
            <span className="block text-[8px] font-mono tracking-[0.22em] text-[#ffd166] uppercase">
              Haute Patisserie
            </span>
          </div>
        </button>

        {/* Navigation Items */}
        <nav className="hidden md:flex items-center gap-1">
          <button
            id="nav-explore"
            onClick={() => setActiveTab('explore')}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium tracking-wide transition-all duration-300 flex items-center gap-2 ${
              activeTab === 'explore'
                ? 'bg-cream/10 text-gold border border-gold/20'
                : 'text-cream/70 hover:text-cream hover:bg-white/5'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Artisan Catalog
          </button>
          
          <button
            id="nav-atelier"
            onClick={() => setActiveTab('atelier')}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium tracking-wide transition-all duration-300 flex items-center gap-2 relative overflow-hidden group ${
              activeTab === 'atelier'
                ? 'bg-gold/10 text-gold border border-gold/40'
                : 'text-cream/70 hover:text-cream hover:bg-white/5'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/10 to-gold/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <ChefHat className="w-4 h-4 text-gold" />
            Baker's Atelier
            <span className="inline-block px-1.5 py-0.5 text-[8px] font-mono tracking-wider bg-gold text-black font-bold rounded uppercase">
              DIY
            </span>
          </button>

          <button
            id="nav-secrets"
            onClick={() => setActiveTab('secrets')}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium tracking-wide transition-all duration-300 flex items-center gap-2 ${
              activeTab === 'secrets'
                ? 'bg-cream/10 text-gold border border-gold/20'
                : 'text-cream/70 hover:text-cream hover:bg-white/5'
            }`}
          >
            <Clock className="w-4 h-4" />
            Patisserie Secrets
          </button>
        </nav>

        {/* Cart & Orders Interactions */}
        <div className="flex items-center gap-3">
          
          {/* My Orders Button with Counter */}
          <button
            id="btn-nav-orders"
            onClick={onOrdersClick}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-sm transition-all duration-300 text-cream/80 hover:text-cream"
          >
            <span className="text-xs font-mono text-gold/80">My Orders</span>
            {ordersCount > 0 && (
              <span className="px-1.5 py-0.5 text-[10px] font-mono bg-gold/20 text-gold rounded-full border border-gold/30">
                {ordersCount}
              </span>
            )}
          </button>

          {/* Glowing Premium Shopping Bag */}
          <button
            id="btn-header-cart"
            onClick={onCartClick}
            className="group relative flex items-center justify-center w-11 h-11 rounded-full glass hover:border-gold/30 hover:scale-105 transition-all duration-400 focus:outline-none"
          >
            <ShoppingBag className="w-5 h-5 text-cream group-hover:text-gold transition-colors duration-300" />
            {cartCount > 0 ? (
              <>
                {/* Active Counter Glow Badge */}
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-pink text-[10px] font-bold text-cream font-sans border border-black shadow-[0_0_10px_rgba(239,71,111,0.5)] animate-scale-up">
                  {cartCount}
                </span>
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-pink animate-ping opacity-30"></span>
              </>
            ) : null}
          </button>
          
        </div>
      </div>
      
      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden flex items-center justify-around mt-4 pt-3 border-t border-white/5">
        <button
          onClick={() => setActiveTab('explore')}
          className={`flex flex-col items-center gap-1 text-xs transition-colors duration-300 ${
            activeTab === 'explore' ? 'text-gold font-semibold' : 'text-cream/55'
          }`}
        >
          <BookOpen className="w-4.5 h-4.5" />
          <span>Catalog</span>
        </button>
        
        <button
          onClick={() => setActiveTab('atelier')}
          className={`flex flex-col items-center gap-1 text-xs transition-colors duration-300 ${
            activeTab === 'atelier' ? 'text-gold font-semibold' : 'text-cream/55'
          }`}
        >
          <ChefHat className="w-4.5 h-4.5" />
          <span>Atelier</span>
        </button>

        <button
          onClick={() => setActiveTab('secrets')}
          className={`flex flex-col items-center gap-1 text-xs transition-colors duration-300 ${
            activeTab === 'secrets' ? 'text-gold font-semibold' : 'text-cream/55'
          }`}
        >
          <Clock className="w-4.5 h-4.5" />
          <span>Secrets</span>
        </button>
        
        <button
          onClick={onOrdersClick}
          className="flex flex-col items-center gap-1 text-xs text-cream/55"
        >
          <span className="font-mono text-[9px] px-1 py-0.2 bg-white/5 rounded border border-white/10 text-gold">
            {ordersCount}
          </span>
          <span>Orders</span>
        </button>
      </div>
    </header>
  );
}
