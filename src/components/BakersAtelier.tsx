import React, { useState, useMemo } from 'react';
import { SPONGES, FROSTINGS, FILLINGS, TOPPINGS, SIZES } from '../data';
import { SpongeOption, FrostingOption, FillingOption, ToppingOption, SizeOption, CustomCakeSelections, CartItem } from '../types';
import { Sparkles, HelpCircle, Flame, Clock, Scale, PenTool, Check, ShoppingCart, Plus, Minus, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BakersAtelierProps {
  onAddToCart: (item: CartItem) => void;
}

export default function BakersAtelier({ onAddToCart }: BakersAtelierProps) {
  // Selections state
  const [selectedSponge, setSelectedSponge] = useState<SpongeOption>(SPONGES[0]);
  const [selectedFrosting, setSelectedFrosting] = useState<FrostingOption>(FROSTINGS[0]);
  const [selectedFilling, setSelectedFilling] = useState<FillingOption>(FILLINGS[0]);
  const [selectedToppings, setSelectedToppings] = useState<ToppingOption[]>([TOPPINGS[0], TOPPINGS[3]]);
  const [selectedSize, setSelectedSize] = useState<SizeOption>(SIZES[0]);
  const [tierCount, setTierCount] = useState<1 | 2 | 3>(2);
  const [writingText, setWritingText] = useState<string>('');
  
  const [orderSuccessful, setOrderSuccessful] = useState<boolean>(false);

  // Toggle toppings helper
  const handleToggleTopping = (topping: ToppingOption) => {
    if (selectedToppings.some(t => t.id === topping.id)) {
      setSelectedToppings(selectedToppings.filter(t => t.id !== topping.id));
    } else {
      setSelectedToppings([...selectedToppings, topping]);
    }
  };

  // Recipe calculation formulas
  const calculatedCost = useMemo(() => {
    const spongeCost = selectedSponge.price;
    const frostingCost = selectedFrosting.price;
    const fillingCost = selectedFilling.price;
    const toppingsCost = selectedToppings.reduce((acc, curr) => acc + curr.price, 0);

    const baseCost = spongeCost + frostingCost + fillingCost + toppingsCost;
    
    // Tiers add complex multipliers
    const tierMultiplier = tierCount === 1 ? 1.0 : tierCount === 2 ? 1.55 : 2.1;
    
    // Size multiplier
    const finalPrice = baseCost * selectedSize.priceMultiplier * tierMultiplier;
    return parseFloat(finalPrice.toFixed(2));
  }, [selectedSponge, selectedFrosting, selectedFilling, selectedToppings, selectedSize, tierCount]);

  const statsBreakdown = useMemo(() => {
    // Estimating calorie structure
    const baseCal = 240 + selectedToppings.length * 35;
    const sizeMultiplier = selectedSize.sizeInches / 5;
    const calculatedCal = Math.round(baseCal * sizeMultiplier * tierCount);

    // Estimating preparation effort hours
    const baseHours = 4.5 + tierCount * 1.5 + selectedToppings.length * 0.4;
    return {
      caloriesPerServing: calculatedCal,
      craftHours: baseHours.toFixed(1),
      complexity: tierCount === 1 ? 'Artisanal Elite' : tierCount === 2 ? 'Chef Masterpiece' : 'Museum Sculpture'
    };
  }, [selectedToppings, selectedSize, tierCount]);

  const handleCustomAddToCart = () => {
    const customSelections: CustomCakeSelections = {
      sponge: selectedSponge,
      frosting: selectedFrosting,
      filling: selectedFilling,
      toppings: selectedToppings,
      size: selectedSize,
      tierCount,
      writingText: writingText || 'A Classic Bespoke Creation'
    };

    const item: CartItem = {
      cartId: `custom-cake-${Date.now()}`,
      type: 'custom',
      customDetails: customSelections,
      quantity: 1,
      itemPrice: calculatedCost,
      notes: `Customized with ${selectedSponge.name} Sponge, ${selectedFrosting.name} Frosting, filled with ${selectedFilling.name}. Text inscribed: "${writingText || 'None'}".`
    };

    onAddToCart(item);
    setOrderSuccessful(true);
    setTimeout(() => setOrderSuccessful(false), 3000);
  };

  return (
    <section className="py-8 px-4 md:px-8 max-w-7xl mx-auto" id="bakers-atelier-section">
      
      {/* Intro visual banner */}
      <div className="mb-12 text-center md:text-left relative py-6 px-8 rounded-2xl bg-charcoal-light border border-white/5 overflow-hidden">
        <div className="absolute top-0 right-0 p-8 w-48 h-48 bg-radial-gradient from-gold/15 to-transparent rounded-full blur-2xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-gold uppercase block mb-1">
              Bespoke Sculptural Design Tool
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-cream mb-2 tracking-tight">
              Baker's Custom <span className="text-gold italic">Atelier</span>
            </h2>
            <p className="text-cream/60 text-sm max-w-xl font-sans font-light leading-relaxed">
              Design a gorgeous digital rendering of your dream architectural celebration dessert. Our patisserie masters will bake it to physical perfection using organic flour.
            </p>
          </div>
          <div className="flex items-center gap-3 self-center md:self-auto bg-black/40 border border-white/10 px-5 py-3 rounded-xl">
            <Sparkles className="w-5 h-5 text-gold animate-bounce" />
            <div className="text-left font-mono">
              <span className="block text-[8px] text-cream/40 uppercase">LIVE CONFIGURATOR STATUS</span>
              <span className="text-xs text-gold font-bold">128 Micro-combinations active</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LFT COLUMN: Cake visual render (5 Columns) */}
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <div className="rounded-2xl bg-charcoal border border-white/5 p-6 relative overflow-hidden flex flex-col items-center justify-center">
            
            {/* Visual background gradients */}
            <div className="absolute inset-0 bg-radial-gradient from-gold/5 via-transparent to-transparent pointer-events-none"></div>
            
            {/* Live Render Canvas box */}
            <div className="w-full h-80 rounded-xl relative flex justify-center items-end pb-8 overflow-hidden bg-black/30 border border-white/5">
              
              {/* Dynamic spotlight */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-20 bg-gradient-to-b from-gold/15 to-transparent rounded-full blur-xl"></div>
              
              {/* Stage base plate */}
              <div className="absolute bottom-6 w-52 h-4 bg-charcoal-light border border-white/15 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-[7px] font-mono tracking-widest text-[#fff9f2]/20 uppercase">
                  Cakebook Atelier Pedestal
                </span>
              </div>

              {/* Dynamic Tier Renderer */}
              <div className="flex flex-col items-center gap-1 z-10 w-full px-12 pb-2">
                
                {/* TIER 3 (Top - Rendered only if tierCount is 3) */}
                {tierCount === 3 && (
                  <motion.div
                    initial={{ scale: 0, y: 10 }}
                    animate={{ scale: 1, y: 0 }}
                    className="w-24 h-11 rounded-t-lg relative border-x border-b shadow-md flex items-center justify-center"
                    style={{ 
                      backgroundColor: selectedFrosting.colorCode,
                      borderColor: selectedSponge.colorCode === '#fbf5eb' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.08)'
                    }}
                  >
                    {/* Outer ganache drip simulation */}
                    <div className="absolute bottom-0 w-full h-1 bg-black/25"></div>
                    <span className="text-[10px] font-sans font-semibold tracking-wider mix-blend-difference" style={{ color: selectedSponge.colorCode }}>
                      3
                    </span>
                  </motion.div>
                )}

                {/* TIER 2 (Middle - Rendered if tierCount is 2 or 3) */}
                {tierCount >= 2 && (
                  <motion.div
                    initial={{ scale: 0, y: 10 }}
                    animate={{ scale: 1, y: 0 }}
                    className="w-36 h-13 rounded-t-lg relative border-x border-b shadow-lg flex items-center justify-center"
                    style={{ 
                      backgroundColor: selectedFrosting.colorCode,
                      borderColor: selectedSponge.colorCode === '#fbf5eb' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.08)'
                    }}
                  >
                    {/* Layer filling line mock */}
                    <div className="absolute bottom-1/2 w-full h-1 border-y border-dashed mix-blend-color-dodge transition-all" style={{ borderColor: selectedFilling.colorCode }}></div>
                    <div className="absolute bottom-0 w-full h-1 bg-black/25"></div>
                    <span className="text-xs font-sans font-semibold tracking-wider mix-blend-difference" style={{ color: selectedSponge.colorCode }}>
                      2
                    </span>
                  </motion.div>
                )}

                {/* TIER 1 (Bottom - Always visible) */}
                <motion.div
                  className="w-48 h-15 rounded-t-lg relative border-x border-b shadow-2xl flex items-center justify-center"
                  style={{ 
                    backgroundColor: selectedFrosting.colorCode,
                    borderColor: selectedSponge.colorCode === '#fbf5eb' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.08)'
                  }}
                >
                  {/* Layer filling line mock */}
                  <div className="absolute bottom-1/3 w-full h-1 border-y border-dashed mix-blend-color-dodge transition-all" style={{ borderColor: selectedFilling.colorCode }}></div>
                  
                  {/* Edible text scroll banner plaque preview */}
                  {writingText && (
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-black/80 border border-gold/40 text-gold text-[7px] font-mono tracking-wider max-w-[120px] truncate animate-pulse uppercase">
                      ✍️ {writingText}
                    </div>
                  )}

                  <div className="absolute bottom-0 w-full h-1 bg-black/25"></div>
                  <span className="text-xs font-sans font-semibold tracking-wider mix-blend-difference animate-pulse" style={{ color: selectedSponge.colorCode }}>
                    1
                  </span>
                </motion.div>
              </div>

              {/* Toppings text pill pile HUD */}
              <div className="absolute top-4 left-4 right-4 flex flex-wrap gap-1 items-start justify-center text-center pointer-events-none">
                {selectedToppings.map(t => (
                  <span key={t.id} className="px-1.5 py-0.5 rounded bg-charcoal border border-[#fff9f2]/10 text-cream/70 text-[8px] font-mono">
                    ✦ {t.name}
                  </span>
                ))}
              </div>

            </div>

            {/* Custom Engraving plaques */}
            <div className="w-full mt-6 bg-black/40 border border-white/5 rounded-xl p-4">
              <label className="block text-[10px] font-mono text-cream/40 uppercase mb-2">
                ✍️ Custom Fondant Calligraphy Plate
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  value={writingText}
                  onChange={(e) => setWritingText(e.target.value.substring(0, 36))}
                  placeholder="Inscribe message onto edible wafer (Max 36 chars)"
                  className="w-full bg-charcoal border border-white/10 rounded-lg py-2.5 pl-3 pr-10 text-xs text-cream placeholder-cream/25 focus:outline-none focus:border-gold/50 font-mono"
                />
                <PenTool className="absolute right-3 top-3 w-4 h-4 text-cream/35 pointer-events-none" />
              </div>
            </div>

            {/* Premium Chef Specs Sheets block */}
            <div className="grid grid-cols-3 gap-3 w-full mt-4">
              <div className="p-3 bg-black/40 border border-white/5 rounded-xl text-center">
                <Scale className="w-4.5 h-4.5 text-gold mx-auto mb-1" />
                <span className="block text-[8px] font-mono text-cream/40 uppercase">Total Weight</span>
                <span className="text-xs text-cream font-bold font-mono">
                  {(selectedSize.sizeInches * 0.3 * tierCount).toFixed(1)} kg
                </span>
              </div>
              <div className="p-3 bg-black/40 border border-white/5 rounded-xl text-center">
                <Flame className="w-4.5 h-4.5 text-pink mx-auto mb-1" />
                <span className="block text-[8px] font-mono text-cream/40 uppercase">Serving Energy</span>
                <span className="text-xs text-cream font-bold font-mono">
                  {statsBreakdown.caloriesPerServing} cal
                </span>
              </div>
              <div className="p-3 bg-black/40 border border-white/5 rounded-xl text-center">
                <Clock className="w-4.5 h-4.5 text-mint mx-auto mb-1" />
                <span className="block text-[8px] font-mono text-cream/40 uppercase">Patisserie Work</span>
                <span className="text-xs text-cream font-bold font-mono">
                  {statsBreakdown.craftHours} hrs
                </span>
              </div>
            </div>

            {/* Order Confirmation Drawer */}
            <div className="w-full pt-6 mt-6 border-t border-white/5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-xs text-cream/50">Culinary Complexity: <span className="text-gold font-mono font-medium">{statsBreakdown.complexity}</span></span>
                  <span className="block font-display text-3xl font-extrabold text-gold font-sans">${calculatedCost.toFixed(2)}</span>
                </div>
                <button
                  id="btn-atelier-submit"
                  onClick={handleCustomAddToCart}
                  className="px-6 py-3 rounded-xl bg-gold text-black font-bold text-xs tracking-wider transition-all duration-300 shadow-[0_4px_15px_rgba(255,209,102,0.2)] hover:shadow-[0_4px_22px_rgba(255,209,102,0.45)] hover:bg-gold/90 active:scale-[0.98] flex items-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>

              {orderSuccessful && (
                <div className="p-2 bg-mint/10 border border-mint/20 text-mint text-xs rounded text-center font-mono">
                  ✨ Custom Creation safely logged in your Cart! ✨
                </div>
              )}
            </div>

          </div>
        </div>

        {/* RGT COLUMN: Controls (7 Columns) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* 1. Size & Sponge Selector */}
          <div className="p-6 rounded-2xl bg-charcoal border border-white/5 space-y-6">
            
            {/* Tiers choosing */}
            <div>
              <h3 className="text-sm font-mono tracking-widest text-gold uppercase mb-3 flex items-center justify-between">
                <span>1. Architectural Tiers</span>
                <span className="text-cream/35 lowercase italic">Affects height & frosting weight</span>
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    onClick={() => setTierCount(num as 1|2|3)}
                    className={`py-3.5 px-4 rounded-xl text-xs font-semibold tracking-wide border transition-all text-center ${
                      tierCount === num
                        ? 'bg-gold border-gold text-black font-bold shadow-lg shadow-gold/10'
                        : 'bg-black/30 border-white/5 text-cream/60 hover:text-cream hover:bg-white/5'
                    }`}
                  >
                    {num} {num === 1 ? 'Solid Tier' : 'Tiers'}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes option */}
            <div>
              <h3 className="text-sm font-mono tracking-widest text-gold uppercase mb-3">
                2. Base Dimension & Volume
              </h3>
              <div className="space-y-2.5">
                {SIZES.map((sz) => (
                  <div
                    key={sz.id}
                    onClick={() => setSelectedSize(sz)}
                    className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                      selectedSize.id === sz.id
                        ? 'bg-gold/5 border-gold shadow-[0_0_15px_rgba(255,209,102,0.04)] text-cream'
                        : 'bg-black/30 border-white/5 text-cream/70 hover:border-white/12'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedSize.id === sz.id ? 'border-gold' : 'border-white/20'}`}>
                        {selectedSize.id === sz.id && <div className="w-2, w-2 h-2 rounded-full bg-gold"></div>}
                      </div>
                      <div>
                        <span className="block text-sm font-semibold text-cream">{sz.name}</span>
                        <span className="block text-[10px] text-cream/45 font-mono">{sz.servingEstimate}</span>
                      </div>
                    </div>
                    <span className="font-mono text-gold text-xs font-bold">
                      x{sz.priceMultiplier.toFixed(1)} Scale
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sponge Option */}
            <div>
              <h3 className="text-sm font-mono tracking-widest text-gold uppercase mb-3">
                3. Sponge Cake Core Structure
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {SPONGES.map((sp) => (
                  <div
                    key={sp.id}
                    onClick={() => setSelectedSponge(sp)}
                    className={`p-4 rounded-xl border cursor-pointer flex items-start gap-3 transition-all ${
                      selectedSponge.id === sp.id
                        ? 'bg-gold/5 border-gold'
                        : 'bg-black/30 border-white/5 hover:border-white/12'
                    }`}
                  >
                    <div className="w-5 h-5 rounded-full border border-white/15 scale-down shrink-0 mt-0.5" style={{ backgroundColor: sp.colorCode }} />
                    <div>
                      <span className="block text-sm font-semibold text-cream">{sp.name}</span>
                      <span className="block text-[10px] text-cream/45 leading-normal mt-0.5">{sp.description}</span>
                      <span className="block text-xs text-gold/80 font-mono mt-1">+${sp.price.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* 2. Frosting (Icing Shell) & Filling selector */}
          <div className="p-6 rounded-2xl bg-charcoal border border-white/5 space-y-6">
            
            {/* Frosting Selection */}
            <div>
              <h3 className="text-sm font-mono tracking-widest text-gold uppercase mb-3">
                4. Patisserie Frosting Shell
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {FROSTINGS.map((fr) => (
                  <div
                    key={fr.id}
                    onClick={() => setSelectedFrosting(fr)}
                    className={`p-4 rounded-xl border cursor-pointer flex items-start gap-3 transition-all ${
                      selectedFrosting.id === fr.id
                        ? 'bg-gold/5 border-gold'
                        : 'bg-black/30 border-white/5 hover:border-white/12'
                    }`}
                  >
                    <div className="w-5 h-5 rounded-full border border-white/15 shrink-0 mt-0.5" style={{ backgroundColor: fr.colorCode }} />
                    <div>
                      <span className="block text-sm font-semibold text-cream">{fr.name}</span>
                      <span className="block text-[10px] text-cream/45 leading-normal mt-0.5">{fr.description}</span>
                      <span className="block text-xs text-gold/80 font-mono mt-1">+${fr.price.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Filling Selection */}
            <div>
              <h3 className="text-sm font-mono tracking-widest text-gold uppercase mb-3">
                5. High-Moisture Core Filling
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {FILLINGS.map((fl) => (
                  <div
                    key={fl.id}
                    onClick={() => setSelectedFilling(fl)}
                    className={`p-4 rounded-xl border cursor-pointer flex items-start gap-3 transition-all ${
                      selectedFilling.id === fl.id
                        ? 'bg-gold/5 border-gold'
                        : 'bg-black/30 border-white/5 hover:border-white/12'
                    }`}
                  >
                    <div className="w-5 h-5 rounded-full border border-white/15 shrink-0 mt-0.5" style={{ backgroundColor: fl.colorCode }} />
                    <div>
                      <span className="block text-sm font-semibold text-cream">{fl.name}</span>
                      <span className="block text-[10px] text-cream/45 leading-normal mt-0.5">{fl.description}</span>
                      <span className="block text-xs text-gold/80 font-mono mt-1">+${fl.price.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* 3. Luxurious Toppings options */}
          <div className="p-6 rounded-2xl bg-charcoal border border-white/5">
            <h3 className="text-sm font-mono tracking-widest text-gold uppercase mb-1">
              6. Edible Sculpture Toppings
            </h3>
            <span className="block text-[10px] text-cream/40 mb-4 uppercase">Multiple selections permitted</span>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TOPPINGS.map((tp) => {
                const isActive = selectedToppings.some(t => t.id === tp.id);
                return (
                  <div
                    key={tp.id}
                    onClick={() => handleToggleTopping(tp)}
                    className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                      isActive
                        ? 'bg-gold/10 border-gold/50 text-gold'
                        : 'bg-black/30 border-white/5 text-cream/70 hover:border-white/12'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${isActive ? 'bg-gold border-gold text-black' : 'border-white/20'}`}>
                        {isActive && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="text-xs font-semibold text-cream">{tp.name}</span>
                    </div>
                    <span className="font-mono text-[10px] text-gold/80">+${tp.price.toFixed(2)}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
