import React, { useState, useEffect } from 'react';
import { X, Clock, Award, Users, BookOpen, Check, Play, Pause, RotateCcw, ShoppingCart, Plus, Minus, Info } from 'lucide-react';
import { MenuItem, CartItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface RecipeDetailsProps {
  recipe: MenuItem;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export default function RecipeDetails({ recipe, onClose, onAddToCart }: RecipeDetailsProps) {
  const [multiplier, setMultiplier] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [bakingMode, setBakingMode] = useState<boolean>(false);
  const [bakerNote, setBakerNote] = useState<string>('');
  
  // Custom Timer States
  const [timeRemaining, setTimeRemaining] = useState<number>(parseInt(recipe.cookTime) * 60 || 1800);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [timerPreset, setTimerPreset] = useState<number>(parseInt(recipe.cookTime) * 60 || 1800);

  // Soundless visual flash alarm
  const [isAlarmState, setIsAlarmState] = useState<boolean>(false);

  // Timer runner
  useEffect(() => {
    let interval: any = null;
    if (timerActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0 && timerActive) {
      setTimerActive(false);
      setIsAlarmState(true);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeRemaining]);

  const toggleStep = (index: number) => {
    if (completedSteps.includes(index)) {
      setCompletedSteps(completedSteps.filter(i => i !== index));
    } else {
      setCompletedSteps([...completedSteps, index]);
    }
    setActiveStep(index + 1 < recipe.steps.length ? index + 1 : index);
  };

  const handleStartTimer = () => {
    setTimerActive(true);
    setIsAlarmState(false);
  };

  const handlePauseTimer = () => {
    setTimerActive(false);
  };

  const handleResetTimer = () => {
    setTimerActive(false);
    setTimeRemaining(timerPreset);
    setIsAlarmState(false);
  };

  const selectPreset = (seconds: number) => {
    setTimerActive(false);
    setTimerPreset(seconds);
    setTimeRemaining(seconds);
    setIsAlarmState(false);
  };

  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs > 0 ? hrs + ':' : ''}${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const triggerAddToCart = () => {
    const item: CartItem = {
      cartId: `menu-${recipe.id}-${Date.now()}`,
      type: 'menu',
      menuItem: recipe,
      quantity: 1,
      itemPrice: recipe.price,
      notes: bakerNote || 'Standard artisan baking configuration.'
    };
    onAddToCart(item);
    // Visual feedback
    setBakerNote('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto scrollbar-custom bg-black/90 backdrop-blur-xl flex justify-center items-start py-8 px-4">
      
      {/* Light Overlay decorative element */}
      <div className="absolute inset-0 bg-radial-gradient from-teal/20 via-transparent to-transparent pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 120 }}
        className="relative w-full max-w-4xl rounded-2xl bg-charcoal-light border border-white/10 overflow-hidden shadow-2xl z-10"
        id={`recipe-modal-${recipe.id}`}
      >
        
        {/* Modal Close */}
        <button 
          onClick={onClose} 
          id="btn-close-recipe"
          className="absolute top-4 right-4 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-black/60 hover:bg-black border border-white/10 hover:border-gold/50 text-cream transition-all duration-300"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Banner split */}
        <div className="relative h-64 md:h-96 w-full">
          <img 
            src={recipe.image} 
            alt={recipe.name} 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-light via-charcoal-light/40 to-black/30"></div>
          
          {/* Title Badges */}
          <div className="absolute bottom-6 left-6 md:left-10 right-6">
            <span className="inline-block px-3 py-1 mb-3 text-xs font-mono font-bold tracking-widest bg-gold text-black rounded">
              {recipe.tag.toUpperCase()}
            </span>
            <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-cream mb-2 leading-tight">
              {recipe.name}
            </h1>
            <p className="text-cream/80 text-sm md:text-base max-w-2xl font-sans font-light">
              {recipe.description}
            </p>
          </div>
        </div>

        {/* Recipe Grid Specs */}
        <div className="p-6 md:p-10 border-b border-white/5 bg-black/40 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-charcoal">
            <Clock className="w-5 h-5 text-gold" />
            <div>
              <span className="block text-[10px] font-mono uppercase tracking-wider text-cream/40">Prep Duration</span>
              <span className="font-semibold text-cream text-sm">{recipe.prepTime}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-charcoal">
            <Award className="w-5 h-5 text-pink" />
            <div>
              <span className="block text-[10px] font-mono uppercase tracking-wider text-cream/40">Bake Level</span>
              <span className="font-semibold text-pink text-sm">{recipe.difficulty}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-charcoal">
            <Users className="w-5 h-5 text-mint" />
            <div>
              <span className="block text-[10px] font-mono uppercase tracking-wider text-cream/40">Yield Size</span>
              <span className="font-semibold text-mint text-sm">{recipe.yieldText}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-charcoal">
            <BookOpen className="w-5 h-5 text-gold" />
            <div>
              <span className="block text-[10px] font-mono uppercase tracking-wider text-cream/40">Rating</span>
              <span className="font-semibold text-cream text-xs font-mono flex items-center gap-1">
                ⭐ {recipe.rating} / 5.0
              </span>
            </div>
          </div>
        </div>

        {/* Ingredients & Order split */}
        <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LFT: Ingredients Panel (7 Columns) */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-2xl font-semibold text-cream flex items-center gap-2">
                <span className="text-gold">I.</span> Ingredients Customizer
              </h3>
              
              {/* Portion Control Multiplier */}
              <div className="flex items-center bg-charcoal border border-white/5 rounded-lg p-1">
                <button 
                  onClick={() => setMultiplier(0.5)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded ${multiplier === 0.5 ? 'bg-gold text-black' : 'text-cream/60 hover:text-cream'}`}
                >
                  0.5x
                </button>
                <button 
                  onClick={() => setMultiplier(1)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded ${multiplier === 1 ? 'bg-gold text-black' : 'text-cream/60 hover:text-cream'}`}
                >
                  1x
                </button>
                <button 
                  onClick={() => setMultiplier(2)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded ${multiplier === 2 ? 'bg-gold text-black' : 'text-cream/60 hover:text-cream'}`}
                >
                  2x
                </button>
                <button 
                  onClick={() => setMultiplier(3)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded ${multiplier === 3 ? 'bg-gold text-black' : 'text-cream/60 hover:text-cream'}`}
                >
                  3x
                </button>
              </div>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto pr-2 scrollbar-custom">
              {recipe.ingredients.map((ing, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center justify-between p-3.5 rounded-xl bg-charcoal border border-white/5 hover:border-white/10 transition-colors"
                >
                  <span className="text-cream/80 font-medium text-sm flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
                    {ing.name}
                  </span>
                  <span className="font-mono text-gold font-semibold text-sm">
                    {ing.unit === 'whole' || ing.unit === 'sheets' || ing.unit === 'pods'
                      ? Math.ceil(ing.amount * multiplier) 
                      : (ing.amount * multiplier).toFixed(0)} 
                    <span className="text-cream/40 ml-1 font-normal text-xs">{ing.unit}</span>
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-4 text-xs text-cream/40 flex items-center gap-2 font-mono">
              <Info className="w-3.5 h-3.5 text-gold" />
              Recalculating portions maintains moisture levels.
            </p>
          </div>

          {/* RGT: Ordering Card (5 Columns) */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-charcoal border border-white/5 p-6 relative overflow-hidden h-full flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-gold uppercase block mb-1">
                  Taste the creation
                </span>
                <h3 className="font-display text-xl font-bold text-cream mb-4">
                  Bake-At-Home or Order Fresh
                </h3>
                
                <p className="text-cream/60 text-xs leading-relaxed mb-6">
                  Skip the scaling and kitchen mess. Our master pâtissiers can handcraft this exact recipe using heritage sour starters and express-ship it hot to your door within 24 hours.
                </p>

                {/* Gourmet Note input */}
                <div className="mb-6">
                  <label className="block text-xs font-mono text-cream/40 uppercase mb-2">Bespoke Culinary Requests</label>
                  <textarea 
                    value={bakerNote}
                    onChange={(e) => setBakerNote(e.target.value)}
                    placeholder="E.g., Low sugar, include anniversary plaque, heavy berry frosting..."
                    className="w-full h-24 p-3 bg-black/40 border border-white/10 rounded-xl text-xs text-cream placeholder-cream/20 focus:outline-none focus:border-gold/50 resize-none font-sans"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between pt-4 border-t border-white/5 mb-4">
                  <div>
                    <span className="text-xs text-cream/40">Fresh Bake Price</span>
                    <span className="block font-display text-2xl font-bold text-gold">${recipe.price.toFixed(2)}</span>
                  </div>
                  <span className="text-[10px] font-mono text-mint bg-mint/10 border border-mint/20 rounded px-2 py-1">
                    Free Luxury Courier
                  </span>
                </div>

                <button
                  id="btn-add-recipe-to-cart"
                  onClick={triggerAddToCart}
                  className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl bg-gradient-to-r from-gold to-[#fca311] hover:from-gold hover:to-[#ffb703] text-black font-bold text-sm tracking-wide transition-all duration-300 shadow-[0_4px_20px_rgba(255,209,102,0.15)] hover:shadow-[0_4px_25px_rgba(255,209,102,0.3)] active:scale-[0.98]"
                >
                  <ShoppingCart className="w-4.5 h-4.5" />
                  Request Culinary Delivery
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Baking Companion Mode (Step by Step) & Custom Timer */}
        <div className="p-6 md:p-10 border-t border-white/10 bg-black/60">
          <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
            
            {/* LFT: Step Checklist (7 Columns) */}
            <div className="w-full lg:w-7/12">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-2xl font-semibold text-cream flex items-center gap-2">
                  <span className="text-gold font-display font-semibold">II.</span> Interactive Baking steps
                </h3>
                <button
                  onClick={() => setBakingMode(!bakingMode)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    bakingMode 
                      ? 'bg-gold text-black shadow-lg' 
                      : 'bg-white/5 text-gold border border-gold/10 hover:bg-white/10'
                  }`}
                >
                  {bakingMode ? '🧘 Exit Zen Guide' : '🧁 Launch Chef Companion'}
                </button>
              </div>

              {!bakingMode ? (
                /* Regular Steps list */
                <div className="space-y-4">
                  {recipe.steps.map((step, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => toggleStep(idx)}
                      className={`group p-4 rounded-xl border transition-all duration-300 cursor-pointer flex gap-4 ${
                        completedSteps.includes(idx)
                          ? 'bg-black/40 border-mint/20 text-cream/30'
                          : 'bg-charcoal border-white/5 hover:border-gold/20'
                      }`}
                    >
                      <button className={`w-6 h-6 flex items-center justify-center rounded-full border shrink-0 transition-transform ${
                        completedSteps.includes(idx)
                          ? 'bg-mint/20 border-mint text-mint scale-105'
                          : 'border-white/20 text-transparent group-hover:border-gold/40'
                      }`}>
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <div>
                        <span className={`block text-xs font-mono mb-1 ${completedSteps.includes(idx) ? 'text-mint/40Unit' : 'text-gold/60'}`}>
                          PHASE {idx + 1}
                        </span>
                        <p className={`text-sm leading-relaxed ${completedSteps.includes(idx) ? 'line-through text-cream/30' : 'text-cream/80'}`}>
                          {step}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Zen Guide interactive focal block */
                <div className="p-6 rounded-2xl bg-charcoal border border-gold/30 hover:border-gold/50 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 bg-gold/10 border-b border-l border-gold/20 font-mono text-[9px] text-gold tracking-widest rounded-bl-xl uppercase">
                    Focused View
                  </div>
                  <div className="mb-4 flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-gold text-black text-[10px] font-mono font-bold">
                      STEP {activeStep + 1} OF {recipe.steps.length}
                    </span>
                    <span className="text-[10px] font-mono text-cream/40">
                      {Math.round(((completedSteps.length) / recipe.steps.length) * 100)}% Complete
                    </span>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.p 
                      key={activeStep}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="font-display text-lg md:text-xl text-cream leading-relaxed mb-6 font-medium italic"
                    >
                      "{recipe.steps[activeStep]}"
                    </motion.p>
                  </AnimatePresence>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                        disabled={activeStep === 0}
                        className="px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none text-xs text-cream tracking-wide transition-all"
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => setActiveStep(prev => Math.min(recipe.steps.length - 1, prev + 1))}
                        disabled={activeStep === recipe.steps.length - 1}
                        className="px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none text-xs text-cream tracking-wide transition-all"
                      >
                        Next
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        if (!completedSteps.includes(activeStep)) {
                          toggleStep(activeStep);
                        } else {
                          // just proceed
                          if (activeStep < recipe.steps.length - 1) {
                            setActiveStep(activeStep + 1);
                          }
                        }
                      }}
                      className="px-4 py-2.5 rounded-lg bg-mint text-black font-semibold text-xs tracking-wide hover:bg-mint/90 transition-all flex items-center gap-1.5"
                    >
                      <Check className="w-4 h-4" />
                      {completedSteps.includes(activeStep) ? 'Proceed Step' : 'Mark Complete & Continue'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* RGT: Craft digital Baking Timer (5 Columns) */}
            <div className="w-full lg:w-4.5/12 bg-charcoal rounded-2xl border border-white/5 p-6 h-full">
              <div className="mb-4">
                <span className="text-[10px] font-mono tracking-widest text-gold uppercase block mb-1">
                  Baker Companion Utility
                </span>
                <h4 className="font-display text-lg font-bold text-cream">
                  Oven Countdown Ticker
                </h4>
              </div>

              {/* Timer Dial Panel */}
              <div className={`py-8 rounded-xl bg-black/40 border flex flex-col items-center justify-center transition-all duration-300 ${
                isAlarmState 
                  ? 'border-pink bg-pink/10 animate-pulse' 
                  : timerActive 
                    ? 'border-gold/30 bg-gold/5' 
                    : 'border-white/5'
              }`}>
                {isAlarmState && (
                  <span className="text-pink font-mono text-[9px] uppercase tracking-widest mb-1 font-bold animate-bounce">
                    🚨 Baking COMPLETE! Check Oven! 🚨
                  </span>
                )}
                
                {/* Visual Digital Display */}
                <span className={`font-mono text-4xl md:text-5xl font-black font-mono tracking-wider ${
                  isAlarmState ? 'text-pink' : timerActive ? 'text-gold' : 'text-cream/80'
                }`}>
                  {formatTime(timeRemaining)}
                </span>
                
                <span className="text-[10px] font-mono text-cream/40 mt-1 uppercase">
                  {timerActive ? 'Active oven thermal standard' : 'Timer Paused'}
                </span>

                {/* Preset Fast Actions */}
                <div className="grid grid-cols-2 gap-2 mt-5 px-4 w-full">
                  <button 
                    onClick={() => selectPreset(parseInt(recipe.prepTime) * 60 || 900)}
                    className="py-1.5 px-2 bg-charcoal border border-white/5 hover:border-gold/30 rounded text-[9px] font-mono text-cream/70 hover:text-gold transition-colors"
                  >
                    PREP: {recipe.prepTime}
                  </button>
                  <button 
                    onClick={() => selectPreset(parseInt(recipe.cookTime) * 60 || 1800)}
                    className="py-1.5 px-2 bg-charcoal border border-white/5 hover:border-gold/30 rounded text-[9px] font-mono text-cream/70 hover:text-gold transition-colors"
                  >
                    BAKE: {recipe.cookTime}
                  </button>
                </div>
              </div>

              {/* Controls layout */}
              <div className="grid grid-cols-3 gap-2 mt-4">
                <button
                  onClick={handleResetTimer}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-charcoal-light hover:bg-white/5 text-xs font-semibold text-cream/80 border border-white/5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset
                </button>

                {timerActive ? (
                  <button
                    onClick={handlePauseTimer}
                    className="col-span-2 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-pink/20 hover:bg-pink/35 text-xs font-semibold text-pink border border-pink/30 transition-colors"
                  >
                    <Pause className="w-3.5 h-3.5" />
                    Pause oven
                  </button>
                ) : (
                  <button
                    onClick={handleStartTimer}
                    className="col-span-2 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-gold text-black hover:bg-gold/95 text-xs font-bold transition-all shadow-[0_2px_12px_rgba(255,209,102,0.2)]"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    Start timer
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>

      </motion.div>
    </div>
  );
}
