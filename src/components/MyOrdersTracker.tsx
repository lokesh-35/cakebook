import React, { useState, useEffect } from 'react';
import { Order, CartItem } from '../types';
import { Search, Compass, Printer, RefreshCw, Calendar, MapPin, Sparkles, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'motion/react';

interface MyOrdersTrackerProps {
  orders: Order[];
  onReorder: (items: CartItem[]) => void;
  onClose?: () => void;
}

export default function MyOrdersTracker({ orders, onReorder, onClose }: MyOrdersTrackerProps) {
  const [searchId, setSearchId] = useState<string>('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Auto-select most recent order on load
  useEffect(() => {
    if (orders.length > 0 && !selectedOrder) {
      setSelectedOrder(orders[0]);
    }
  }, [orders, selectedOrder]);

  const filteredOrders = orders.filter(ord => 
    ord.id.toLowerCase().includes(searchId.toLowerCase()) || 
    ord.shipping.fullName.toLowerCase().includes(searchId.toLowerCase())
  );

  const getStatusStep = (status: Order['status']) => {
    switch (status) {
      case 'Received': return 0;
      case 'Baking': return 1;
      case 'Out for Delivery': return 2;
      case 'Delivered': return 3;
      default: return 0;
    }
  };

  const stepsDetails = [
    { title: 'Logistics Registered', icon: '📝', desc: 'Recipe ingredients cataloged and scaled by head patissier.' },
    { title: 'Inside Artisan Oven', icon: '🧁', desc: 'Tempering Belgian chocolate and folding yeast sourdough blocks.' },
    { title: 'Dispacthed via Courier', icon: '🚴', desc: 'Secure temperature-isolated vehicle routing to your home.' },
    { title: 'Served & Savored', icon: '✨', desc: 'Hand-delivered with official wax seal intact. Completed.' }
  ];

  const handlePrintMock = () => {
    window.print();
  };

  const handleTriggerReorder = (order: Order) => {
    onReorder(order.items);
    alert("🧁 All items from this deluxe order have been appended to your cart!");
  };

  return (
    <section className="py-8 px-4 md:px-8 max-w-7xl mx-auto" id="order-tracker-section">
      
      {/* Intro section */}
      <div className="mb-12">
        <span className="text-xs font-mono font-bold tracking-widest text-[#fff9f2]/40 uppercase block mb-1">
          RESERVATION ARCHIVE SYSTEM
        </span>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-cream tracking-tight">
          Bespoke Order <span className="text-gold font-display italic">Tracker</span>
        </h2>
        <p className="text-cream/50 text-xs md:text-sm mt-2 max-w-lg font-light leading-relaxed">
          Verify oven baking logs, delivery timelines, and print carbon-style brand invoices for your luxury desserts.
        </p>
      </div>

      {orders.length === 0 ? (
        /* Empty Orders state */
        <div className="py-20 p-8 rounded-2xl bg-charcoal border border-white/5 text-center max-w-xl mx-auto space-y-5">
          <div className="w-16 h-16 rounded-full bg-black/40 border border-white/5 flex items-center justify-center text-cream text-xl mx-auto">
            🎫
          </div>
          <div>
            <h3 className="font-display text-lg font-bold text-cream">No bakery ledgers registered</h3>
            <p className="text-xs text-cream/40 leading-relaxed mt-1">
              Any custom boutique creations or recipe book orders you complete will appear instantly in this secure client portal.
            </p>
          </div>
        </div>
      ) : (
        /* Orders Master-Detail grid split */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LFT COLUMN: Orders List Sidebar (4 Columns) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-4 rounded-xl bg-charcoal border border-white/5">
              <label className="block text-[10px] font-mono text-cream/40 uppercase mb-2">Search Order IDs / Client</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  placeholder="E.g., CB-4820"
                  className="w-full bg-black/40 border border-white/10 rounded-lg py-2 pl-8 pr-4 text-xs text-cream placeholder-cream/20 focus:outline-none focus:border-gold/30 font-mono"
                />
                <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-cream/20" />
              </div>
            </div>

            <div className="space-y-2 max-h-120 overflow-y-auto pr-2 scrollbar-custom">
              {filteredOrders.map((ord) => {
                const isActive = selectedOrder?.id === ord.id;
                return (
                  <div
                    key={ord.id}
                    onClick={() => setSelectedOrder(ord)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isActive 
                        ? 'bg-gold/10 border-gold/40 shadow-md' 
                        : 'bg-charcoal border-white/5 hover:border-white/12'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-mono text-xs font-bold text-gold">{ord.id}</span>
                      <span className={`px-2 py-0.5 rounded text-[8px] font-mono tracking-wider uppercase font-bold ${
                        ord.status === 'Delivered' 
                          ? 'bg-mint/10 text-mint border border-mint/20' 
                          : ord.status === 'Out for Delivery'
                            ? 'bg-pink/10 text-pink border border-pink/20' 
                            : 'bg-gold/15 text-gold border border-gold/25'
                      }`}>
                        {ord.status}
                      </span>
                    </div>

                    <div className="text-xs text-cream/70 flex justify-between">
                      <span className="font-sans font-medium truncate max-w-[120px]">{ord.shipping.fullName}</span>
                      <span className="font-mono font-medium text-cream">${ord.totalPrice.toFixed(2)}</span>
                    </div>
                    
                    <span className="block text-[9px] text-[#fff9f2]/35 mt-2 font-mono">
                      📅 {new Date(ord.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                );
              })}

              {filteredOrders.length === 0 && (
                <p className="text-xs text-cream/40 text-center py-6 font-mono">No ledgers match parameters</p>
              )}
            </div>
          </div>

          {/* RGT COLUMN: Selected Order full details receipt (8 Columns) */}
          {selectedOrder && (
            <div className="lg:col-span-8 space-y-6">
              
              {/* 1. Status Progress Tracker */}
              <div className="p-6 rounded-2xl bg-charcoal border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 bg-white/5 rounded-bl-xl font-mono text-[8px] text-cream/35 tracking-widest uppercase">
                  ACTIVE PIPELINE STATUS
                </div>

                <h3 className="font-display text-sm font-semibold text-cream uppercase tracking-wider mb-6 flex items-center gap-2">
                  <Compass className="w-4.5 h-4.5 text-gold" />
                  Bakery Assembly Chronology
                </h3>

                {/* Vertical/Horizontal step nodes */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                  
                  {/* Visual connecter line (Desktop background) */}
                  <div className="hidden md:block absolute top-[22px] left-8 right-8 h-0.5 bg-white/5 z-0" />
                  
                  {stepsDetails.map((st, i) => {
                    const activeStep = getStatusStep(selectedOrder.status);
                    const isDone = i <= activeStep;
                    const isCurrent = i === activeStep;

                    return (
                      <div key={i} className="flex md:flex-col items-start md:items-center text-left md:text-center z-10 gap-3 md:gap-0">
                        
                        {/* Node Symbol */}
                        <div className={`w-11 h-11 rounded-full flex items-center justify-center text-lg shadow-md border m-1.5 transition-all ${
                          isCurrent 
                            ? 'bg-gold border-gold text-black scale-110 shadow-lg shadow-gold/25'
                            : isDone
                              ? 'bg-charcoal border-mint/40 text-cream'
                              : 'bg-black/40 border-white/5 text-cream/20'
                        }`}>
                          {isCurrent ? '🔥' : st.icon}
                        </div>

                        {/* Text explanation */}
                        <div className="mt-1">
                          <span className={`block text-xs font-bold ${isCurrent ? 'text-gold' : isDone ? 'text-cream' : 'text-cream/30'}`}>
                            {st.title}
                          </span>
                          <p className="text-[10px] text-cream/45 font-light leading-normal mt-1 md:max-w-[140px] md:mx-auto">
                            {st.desc}
                          </p>
                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 2. Visual Deluxe invoice / slip */}
              <div id="cakebook-printable-receipt" className="p-6 md:p-8 rounded-2xl bg-charcoal-light border border-white/10 relative shadow-2xl space-y-6">
                
                {/* Visual authenticity brand stamp */}
                <div className="absolute top-10 right-6 md:right-10 w-22 h-22 rounded-full border-2 border-dashed border-gold/15 rotate-12 flex flex-col items-center justify-center pointer-events-none text-center">
                  <span className="text-[7px] font-mono font-bold text-gold/25 tracking-widest uppercase">CB EXQUISITE</span>
                  <span className="text-[11px] font-display font-bold text-gold/20 tracking-wider">CAKEBOOK</span>
                  <span className="text-[6px] font-mono text-gold/20 uppercase font-bold">100% ORGANIC</span>
                </div>

                <div className="flex justify-between items-start border-b border-white/5 pb-6">
                  <div>
                    <h4 className="font-display text-lg font-bold text-cream">CAKEBOOK INVOICE</h4>
                    <span className="text-[9px] font-mono text-gold font-bold tracking-widest uppercase">OFFICIAL GOURMET STAMPED</span>
                  </div>
                  <div className="text-right font-mono text-xs">
                    <span className="block text-cream/35">ORDER SERIAL NO</span>
                    <span className="text-gold font-bold">{selectedOrder.id}</span>
                  </div>
                </div>

                {/* Content grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                  <div>
                    <span className="block text-[8px] font-mono text-cream/40 uppercase mb-1.5">Dispatch coordinates</span>
                    <p className="font-semibold text-cream text-sm mb-1">{selectedOrder.shipping.fullName}</p>
                    <p className="text-cream/60 leading-normal mb-1">{selectedOrder.shipping.address}</p>
                    <p className="text-cream/45 font-mono">{selectedOrder.shipping.phone} | {selectedOrder.shipping.email}</p>
                  </div>
                  <div className="md:text-right">
                    <span className="block text-[8px] font-mono text-cream/40 uppercase mb-1.5 md:text-right">Courier Chronology</span>
                    <p className="font-semibold text-gold text-sm mb-1">📅 {selectedOrder.shipping.deliveryDate}</p>
                    <p className="text-cream/60 font-mono text-xs">{selectedOrder.shipping.deliveryTime}</p>
                    {selectedOrder.shipping.isGift && (
                      <span className="inline-block mt-2 px-2 py-0.5 rounded bg-pink/10 border border-pink/20 text-pink text-[9px] font-mono uppercase font-bold">
                        🕯️ Certified Wax message Seal
                      </span>
                    )}
                  </div>
                </div>

                {/* Wax seal greeting content if present */}
                {selectedOrder.shipping.isGift && selectedOrder.shipping.giftMessage && (
                  <div className="p-4 rounded-xl bg-black/40 border border-gold/15 relative">
                    <span className="absolute bottom-3 right-4 text-xs font-serif italic text-gold animate-pulse">
                      wax-sealed 📜
                    </span>
                    <span className="block text-[8px] font-mono text-gold uppercase mb-1">wax seal message body</span>
                    <p className="text-xs text-cream/80 italic font-display leading-relaxed font-light pr-20">
                      "{selectedOrder.shipping.giftMessage}"
                    </p>
                  </div>
                )}

                {/* Items listings inside receipt */}
                <div className="border-t border-b border-white/5 py-4 space-y-3.5">
                  <span className="block text-[8px] font-mono text-cream/40 uppercase">LEDGER ITEMS BREAKDOWN</span>
                  
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-start text-xs">
                      <div>
                        <div className="font-semibold text-cream">
                          {item.type === 'menu' ? item.menuItem?.name : `Atelier custom: ${item.customDetails?.sponge.name}`}
                          <span className="text-gold font-mono font-medium text-[10px] ml-1.5">x{item.quantity}</span>
                        </div>
                        <p className="text-[10px] text-cream/40 leading-normal mt-0.5 max-w-sm">
                          {item.notes}
                        </p>
                      </div>
                      <span className="font-mono text-cream font-medium">${(item.itemPrice * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Financial balances */}
                <div className="flex flex-col items-end space-y-1.5 font-mono text-xs">
                  <div className="flex justify-between w-48 text-cream/50">
                    <span>Subtotal</span>
                    <span>${(selectedOrder.totalPrice - (selectedOrder.totalPrice > 100 ? 0 : 15)).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between w-48 text-cream/50">
                    <span>Premium Courier</span>
                    <span>{selectedOrder.totalPrice > 100 ? "FREE" : "$15.00"}</span>
                  </div>
                  <div className="flex justify-between w-48 text-lg font-bold border-t border-white/10 pt-2.5 text-gold font-sans font-extrabold text-right">
                    <span className="font-sans font-bold">Total Paid</span>
                    <span>${selectedOrder.totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                {/* Controls inside Receipt */}
                <div className="flex gap-2.5 pt-4 border-t border-white/5 no-print">
                  <button
                    onClick={handlePrintMock}
                    className="flex-1 py-3 px-3 rounded-lg bg-charcoal border border-white/5 hover:border-gold/30 text-xs font-semibold text-cream/80 hover:text-gold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Printer className="w-4 h-4" />
                    Print Receipt
                  </button>

                  <button
                    onClick={() => handleTriggerReorder(selectedOrder)}
                    className="flex-1 py-3 px-3 rounded-lg bg-gold text-black hover:bg-gold/95 font-bold text-xs tracking-wide flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98]"
                  >
                    <RefreshCw className="w-4 h-4 animate-spin-reverse" />
                    Reorder Entire Package
                  </button>
                </div>

              </div>

            </div>
          )}

        </div>
      )}

    </section>
  );
}
