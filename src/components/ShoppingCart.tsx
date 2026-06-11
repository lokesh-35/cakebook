import React, { useState, useMemo } from 'react';
import { X, Trash2, Calendar, Clock, CreditCard, ChevronRight, Gift, Sparkles, Plus, Minus, ShieldCheck } from 'lucide-react';
import { CartItem, ShippingDetails } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onCheckout: (details: ShippingDetails) => void;
}

export default function ShoppingCart({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}: ShoppingCartProps) {
  
  // Checkout Shipping Details state
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  
  // Custom delivery scheduling
  const [deliveryDate, setDeliveryDate] = useState<string>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [deliveryTime, setDeliveryTime] = useState<string>('12:00 PM - 3:00 PM');
  
  // Wax sealing elements
  const [isGift, setIsGift] = useState<boolean>(false);
  const [giftMessage, setGiftMessage] = useState<string>('');
  const [waxSeal, setWaxSeal] = useState<'rose' | 'heart' | 'signature' | 'none'>('rose');

  // Checkout step
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping'>('cart');

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + (item.itemPrice * item.quantity), 0);
  }, [cartItems]);

  const shippingCost = subtotal > 100 ? 0 : 15;
  const grandTotal = subtotal + shippingCost;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !address) {
      alert("Please provide complete shipping coordinates to dispatch the bakery courier.");
      return;
    }

    const details: ShippingDetails = {
      fullName,
      email,
      phone,
      address,
      deliveryDate,
      deliveryTime,
      isGift,
      giftMessage: isGift ? giftMessage : '',
      waxSealType: isGift ? waxSeal : 'none'
    };

    onCheckout(details);
    
    // Reset states
    setCheckoutStep('cart');
    setFullName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setGiftMessage('');
    setIsGift(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      
      {/* Black Translucent Backboard */}
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      ></div>

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        
        {/* Main Sliding Drawer Content */}
        <motion.div 
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: "spring", damping: 30, stiffness: 200 }}
          className="w-screen max-w-lg glass-premium-glow flex flex-col h-full shadow-2xl relative"
        >
          
          {/* Drawer Header */}
          <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="p-2 bg-gold/10 rounded-lg text-gold border border-gold/20">
                <Gift className="w-5 h-5" />
              </span>
              <div>
                <h2 className="font-display text-xl font-bold text-cream">
                  {checkoutStep === 'cart' ? "Your Curated Order" : "Courier Logistics"}
                </h2>
                <span className="block text-[9px] font-mono tracking-widest text-[#fff9f2]/40 uppercase">
                  {checkoutStep === 'cart' ? "REVIEW PATISSERIE ITEMS" : "SECURE DISPATCH DETAILED SHEET"}
                </span>
              </div>
            </div>
            
            <button 
              id="btn-close-cart"
              onClick={onClose} 
              className="text-cream/50 hover:text-cream w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/5 hover:border-gold/30 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {checkoutStep === 'cart' ? (
            
            /* STEP 1: REVIEW THE CART CONTENTS */
            <div className="flex-1 flex flex-col min-h-0">
              
              {cartItems.length === 0 ? (
                /* Empty Cart screen */
                <div className="flex-1 flex flex-col items-center justify-center px-10 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-charcoal border border-white/15 flex items-center justify-center text-cream">
                    <span>🧁</span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-cream">Atelier cart is vacant</h3>
                    <p className="text-xs text-cream/40 leading-relaxed mt-1">
                      Explore the Artisan catalog recipes or synthesize custom tiers with our Baker's Atelier designer block.
                    </p>
                  </div>
                  <button 
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-xl bg-gold text-black font-bold text-xs tracking-wider uppercase shadow-md hover:bg-gold/90 transition-all"
                  >
                    Examine Catalog
                  </button>
                </div>
              ) : (
                /* List of items */
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 scrollbar-custom">
                  {cartItems.map((item) => (
                    <div 
                      key={item.cartId} 
                      className="p-4 rounded-xl bg-charcoal border border-white/5 flex gap-4 hover:border-white/12 transition-colors relative"
                    >
                      {/* Product Thumbnail */}
                      <div className="w-16 h-16 rounded-lg bg-black/40 overflow-hidden shrink-0 border border-white/5">
                        {item.type === 'menu' ? (
                          <img 
                            src={item.menuItem?.image} 
                            alt={item.menuItem?.name} 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col justify-center items-center" style={{ backgroundColor: item.customDetails?.frosting.colorCode }}>
                            <span className="text-[9px] font-mono text-black font-extrabold mix-blend-difference">
                              Tier {item.customDetails?.tierCount}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Details block */}
                      <div className="flex-1 min-w-0 pr-6">
                        <span className="text-[8px] font-mono tracking-wider text-gold/80 block uppercase mb-0.5">
                          {item.type === 'menu' ? item.menuItem?.category : `Custom ${item.customDetails?.size.sizeInches}" Cake`}
                        </span>
                        
                        <h4 className="font-display text-sm font-bold text-cream truncate">
                          {item.type === 'menu' ? item.menuItem?.name : `${item.customDetails?.sponge.name} Atelier`}
                        </h4>

                        {item.type === 'custom' && item.customDetails && (
                          <p className="text-[10px] text-cream/50 truncate">
                            {item.customDetails.frosting.name} + {item.customDetails.filling.name}
                          </p>
                        )}
                        
                        <span className="block font-mono text-xs text-gold font-semibold mt-1.5">
                          ${item.itemPrice.toFixed(2)} <span className="text-cream/35 font-normal">ea</span>
                        </span>
                      </div>

                      {/* Action columns */}
                      <div className="absolute right-4 top-4 flex flex-col justify-between h-5/6 items-end">
                        <button 
                          onClick={() => onRemoveItem(item.cartId)}
                          className="text-cream/30 hover:text-pink transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        
                        <div className="flex items-center bg-black/60 border border-white/5 rounded-md p-0.5 scale-90">
                          <button 
                            onClick={() => onUpdateQuantity(item.cartId, -1)}
                            className="w-5 h-5 flex items-center justify-center text-cream/60 hover:text-cream"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 font-mono text-xs font-semibold text-cream">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => onUpdateQuantity(item.cartId, 1)}
                            className="w-5 h-5 flex items-center justify-center text-cream/60 hover:text-cream"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Subtotal HUD & trigger checkout */}
              {cartItems.length > 0 && (
                <div className="p-6 bg-black/50 border-t border-white/5 mt-auto">
                  <div className="space-y-2.5 mb-6">
                    <div className="flex justify-between text-xs text-cream/60">
                      <span>Bake Craft Subtotal</span>
                      <span className="font-mono">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xs text-cream/60">
                      <span>Express Shipping</span>
                      <span className="font-mono">{shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}</span>
                    </div>
                    <div className="border-t border-white/5 pt-3.5 flex justify-between text-sm">
                      <span className="font-display font-bold text-cream">Logistics Grand Total</span>
                      <span className="font-mono text-gold font-extrabold text-base">${grandTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    id="btn-cart-proceed-checkout"
                    onClick={() => setCheckoutStep('shipping')}
                    className="w-full py-4 rounded-xl bg-gold hover:bg-gold/90 text-black font-bold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Bespoke Checkout Block 
                    <ChevronRight className="w-4.5 h-4.5" />
                  </button>
                </div>
              )}
            </div>

          ) : (
            
            /* STEP 2: FILL COURIER LOGISTICS SHEET */
            <form onSubmit={handleCheckoutSubmit} className="flex-1 flex flex-col justify-between p-6 overflow-y-auto scrollbar-custom">
              
              <div className="space-y-5">
                
                {/* Visual backbutton */}
                <button 
                  type="button" 
                  onClick={() => setCheckoutStep('cart')}
                  className="text-xs font-mono text-gold hover:underline flex items-center gap-1"
                >
                  ← Return to Item Cart Spec
                </button>

                <div className="text-left">
                  <h3 className="font-display text-sm font-semibold text-cream uppercase tracking-wide mb-3">
                    Courier Shipping Coordinates
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-3.5 text-xs">
                    <div>
                      <label className="block text-[10px] font-mono text-cream/40 uppercase mb-1.5">Recipient Full Name</label>
                      <input 
                        type="text" 
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="E.g., Lord Byron"
                        className="w-full p-3 bg-black/40 border border-white/5 rounded-xl text-cream focus:outline-none focus:border-gold/50"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-mono text-cream/40 uppercase mb-1.5">Patisserie Email</label>
                        <input 
                          type="email" 
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="byron@estate.org"
                          className="w-full p-3 bg-black/40 border border-white/5 rounded-xl text-cream focus:outline-none focus:border-gold/50 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-cream/40 uppercase mb-1.5">Courier Phone</label>
                        <input 
                          type="tel" 
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+1 (212) 555-0199"
                          className="w-full p-3 bg-black/40 border border-white/5 rounded-xl text-cream focus:outline-none focus:border-gold/50 text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-cream/40 uppercase mb-1.5">Delivery Physical Address</label>
                      <input 
                        type="text" 
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="E.g., Regency Estate, 57 Baker St, London"
                        className="w-full p-3 bg-black/40 border border-white/5 rounded-xl text-cream focus:outline-none focus:border-gold/50"
                      />
                    </div>
                  </div>
                </div>

                {/* Date Scheduler */}
                <div className="pt-4 border-t border-white/5">
                  <h3 className="font-display text-sm font-semibold text-cream uppercase tracking-wide mb-3 flex items-center gap-2">
                    <Calendar className="w-4.5 h-4.5 text-gold" />
                    Delivery Chronology
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-[10px] font-mono text-cream/40 uppercase mb-1.5">Assigned Date</label>
                      <input 
                        type="date" 
                        required
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        className="w-full p-3 bg-black/40 border border-white/5 rounded-xl text-cream focus:outline-none focus:border-gold/50 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-cream/40 uppercase mb-1.5">Preferred Hour Slot</label>
                      <select 
                        value={deliveryTime}
                        onChange={(e) => setDeliveryTime(e.target.value)}
                        className="w-full p-3 bg-black/40 border border-white/5 rounded-xl text-cream focus:outline-none focus:border-gold/50 font-mono"
                      >
                        <option>Dawn Express (8:00 AM - 11:00 AM)</option>
                        <option>Midday Galore (12:00 PM - 3:00 PM)</option>
                        <option>Sunset Soiree (4:00 PM - 7:00 PM)</option>
                        <option>Gourmet Nocturnal (8:00 PM - 10:00 PM)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Wax Sealed Message Panel */}
                <div className="pt-4 border-t border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <label className="flex items-center gap-2 text-xs font-semibold text-cream cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={isGift}
                        onChange={(e) => setIsGift(e.target.checked)}
                        className="rounded border-white/20 bg-black text-gold focus:ring-0 focus:ring-offset-0"
                      />
                      <span>Bespoke Wax-Sealed Gift Card</span>
                    </label>
                    <span className="text-[9px] font-mono text-gold bg-gold/15 px-1.5 py-0.5 rounded uppercase">
                      Bespoke Option
                    </span>
                  </div>

                  {isGift && (
                    <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-4">
                      <div>
                        <label className="block text-[9px] font-mono text-cream/40 uppercase mb-1.5">Bespoke Greetings message</label>
                        <textarea 
                          value={giftMessage}
                          onChange={(e) => setGiftMessage(e.target.value)}
                          placeholder="Your handwritten note (Inscribed inside a premium paper board)..."
                          className="w-full h-18 p-2.5 bg-charcoal border border-white/10 rounded-lg text-xs text-cream placeholder-cream/25 focus:outline-none resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] font-mono text-cream/40 uppercase mb-1.5">Gourmet Wax Stamp Aesthetics</label>
                        <div className="grid grid-cols-3 gap-2 text-[10px]">
                          {[
                            { id: 'rose', name: 'Royal Rose' },
                            { id: 'heart', name: 'Sweetheart' },
                            { id: 'signature', name: 'Signature CB' }
                          ].map((x) => (
                            <button
                              key={x.id}
                              type="button"
                              onClick={() => setWaxSeal(x.id as any)}
                              className={`py-2 px-2.5 rounded-lg border text-center font-mono ${
                                waxSeal === x.id 
                                  ? 'bg-gold/15 border-gold text-gold font-bold' 
                                  : 'bg-black/30 border-white/5 text-cream/50'
                              }`}
                            >
                              🕯️ {x.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

              </div>

              {/* Secure Checkout Submit */}
              <div className="pt-6 border-t border-white/5 bg-black/50 mx-[-24px] px-6 mb-[-24px] pb-6 mt-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs text-cream/50">Logistics Total (inc. courier fee)</span>
                  <span className="font-mono text-gold font-bold text-lg">${grandTotal.toFixed(2)}</span>
                </div>
                
                <button
                  type="submit"
                  id="btn-confirm-checkout-final"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-gold to-[#fca311] hover:from-gold hover:to-[#ffb703] text-black font-extrabold text-sm tracking-widest uppercase transition-all shadow-[0_4px_20px_rgba(255,209,102,0.2)]"
                >
                  ⚡ Authorize Baking order
                </button>
                
                <p className="text-[10px] text-cream/30 text-center flex items-center justify-center gap-1.5 mt-3.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-mint" />
                  Your custom baking ledger will persist safely in browser storage.
                </p>
              </div>

            </form>
          )}

        </motion.div>
      </div>
    </div>
  );
}
