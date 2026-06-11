import React, { useState } from 'react';
import { BAKER_SECRETS } from '../data';
import { BakerSecret } from '../types';
import { BookOpen, Search, Clock, Award, X, Sparkles, BookOpenCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function BakerBlogSecrets() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSecret, setSelectedSecret] = useState<BakerSecret | null>(null);

  const filteredSecrets = BAKER_SECRETS.filter(secret => 
    secret.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    secret.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    secret.secretText.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-8 px-4 md:px-8 max-w-7xl mx-auto" id="patisserie-secrets-section">
      
      {/* Search and Intro */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="text-xs font-mono font-bold tracking-widest text-gold uppercase block mb-1">
            HAUTE PROFESSIONAL ENCYCLOPEDIA
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-cream tracking-tight">
            Patisserie <span className="text-gold font-display italic">Secrets</span>
          </h2>
          <p className="text-cream/50 text-xs md:text-sm mt-2 max-w-xl font-light">
            Unlock the science of fluid-dynamics, protein folding, structural physics, and laminated butter weights taught at world-class Parisian ateliers.
          </p>
        </div>

        {/* Cinematic Search bar */}
        <div className="relative w-full md:w-80">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search chemical compounds or folds..."
            className="w-full bg-charcoal border border-white/5 focus:border-gold/30 rounded-xl py-3 pl-10 pr-4 text-xs text-cream placeholder-cream/25 focus:outline-none transition-colors"
          />
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-cream/30" />
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSecrets.map((secret, idx) => {
          // Alternative sizing for bento variation
          const isLarge = idx === 0 || idx === 3;
          
          return (
            <div
              key={idx}
              onClick={() => setSelectedSecret(secret)}
              className={`p-6 md:p-8 rounded-2xl bg-charcoal border border-white/5 hover:border-gold/20 cursor-pointer transition-all duration-300 relative overflow-hidden group flex flex-col justify-between ${
                isLarge ? 'md:col-span-1 min-h-[280px]' : 'min-h-[250px]'
              }`}
            >
              {/* Background circular lens glowing effect */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-radial-gradient from-gold/5 via-transparent to-transparent rounded-full blur-xl group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-0.5 rounded bg-gold/15 text-gold text-[9px] font-mono font-bold uppercase tracking-wider border border-gold/20">
                    {secret.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-cream/40 font-mono text-[10px]">
                    <Clock className="w-3.5 h-3.5 text-gold/60" />
                    <span>{secret.readTime}</span>
                  </div>
                </div>

                <h3 className="font-display text-xl md:text-2xl font-bold text-cream tracking-tight group-hover:text-gold transition-colors duration-300 leading-tight">
                  {secret.title}
                </h3>

                <p className="text-cream/50 text-xs font-light line-clamp-3 mt-3 leading-relaxed">
                  {secret.secretText}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-gold uppercase tracking-wider">
                <span>Engage Codex Entry</span>
                <span className="translate-x-[-4px] group-hover:translate-x-0 transition-transform duration-300">
                  →
                </span>
              </div>
            </div>
          );
        })}

        {filteredSecrets.length === 0 && (
          <div className="col-span-full py-20 bg-charcoal rounded-2xl border border-white/5 text-center px-6">
            <span className="text-xl">🔍</span>
            <p className="text-sm font-semibold text-cream mt-3">No professional directives found</p>
            <p className="text-xs text-cream/45 mt-1">Review spelling of molecular dough variables.</p>
          </div>
        )}
      </div>

      {/* Secret Detail Reader Modal */}
      <AnimatePresence>
        {selectedSecret && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-xl flex justify-center items-center py-10 px-4">
            
            <motion.div
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              className="relative w-full max-w-2xl rounded-2xl bg-charcoal-light border border-white/10 p-6 md:p-10 shadow-2xl z-10 overflow-hidden"
            >
              {/* Backlight glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-32 bg-radial-gradient from-gold/10 via-transparent to-transparent blur-2xl pointer-events-none"></div>

              {/* Close Button */}
              <button 
                onClick={() => setSelectedSecret(null)}
                className="absolute top-4 right-4 text-cream/40 hover:text-cream w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/5 hover:border-gold/30 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-4">
                <span className="px-2.5 py-0.5 rounded bg-gold/10 text-gold text-[10px] font-mono font-bold uppercase tracking-wider">
                  {selectedSecret.category}
                </span>
                <span className="text-[10px] font-mono text-cream/40">
                  ✦ {selectedSecret.readTime} Studio Directive
                </span>
              </div>

              <h2 className="font-display text-2xl md:text-3xl font-extrabold text-cream mb-6 leading-tight tracking-tight">
                {selectedSecret.title}
              </h2>

              <div className="space-y-4 text-sm md:text-base text-cream/80 font-light leading-relaxed">
                <p>{selectedSecret.secretText}</p>
                <p>
                  To apply this scientific method at home, we advise recording temperatures using a digital infrared scanner. Dough humidity ratios should never fall outside the 64-68% range. Keep active hydration rates stable to protect structural integrity.
                </p>
              </div>

              {/* Decorative culinary checklist HUD */}
              <div className="mt-8 p-4 rounded-xl bg-black/30 border border-white/5 grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="block text-[8px] text-cream/40 uppercase">Recommended Gear</span>
                  <span className="text-gold">⚖️ Gram microscale & Laser Probe</span>
                </div>
                <div>
                  <span className="block text-[8px] text-cream/40 uppercase">Optimal Room Temperature</span>
                  <span className="text-mint">🌡️ 19°C - 21°C</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedSecret(null)}
                className="mt-8 w-full py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-cream font-bold text-xs tracking-wider uppercase border border-white/10 hover:border-gold/30 transition-all flex items-center justify-center gap-2"
              >
                <BookOpenCheck className="w-4 h-4 text-gold" />
                Mark directive as read
              </button>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
