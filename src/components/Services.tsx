import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowLeft, ArrowRight, Zap, Film, Layers, Camera } from 'lucide-react';
import { LiquidBackground } from './LiquidBackground'; 

const glassCardStyle = {
  background: 'rgba(24, 24, 27, 0.6)', // zinc-900 with transparency for a warmer dark base
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)'
};

const tiers = [
  {
    name: "The Social Suite",
    target: "High-retention social growth (Reels/TikTok).",
    price: "₱10,000",
    icon: Zap,
    deliverables: [
      "4x Vertical Videos (15-30s, 9:16 format)",
      "Hook-driven kinetic editing",
      "Trend-aware audio selection",
      "1 Half-Day Production (Up to 4 Hrs)"
    ]
  },
  {
    name: "The Brand Story",
    target: "Website hero headers and brand authority.",
    price: "₱15,000",
    icon: Film,
    highlight: true, 
    deliverables: [
      "1x Cinematic Master Cut (60-90s, 16:9)",
      "1x Vertical Teaser (15s, 9:16)",
      "Narrative pacing & premium color grade",
      "Full-Day Production (Up to 8 Hrs)"
    ]
  },
  {
    name: "The Full Campaign",
    target: "Complete brand launches & multi-platform presence.",
    price: "₱22,000",
    icon: Layers,
    deliverables: [
      "1x Cinematic Master Cut (60-90s, 16:9)",
      "4x Vertical Hook Videos (15-30s, 9:16)",
      "Advanced sound design & cross-platform formatting",
      "1.5 Days Production (Up to 12 Hrs)"
    ]
  }
];

const addOns = [
  { name: "Professional Brand Photography", price: "₱5,000", desc: "15–25 high-res retouched stills captured during the video production window." },
  { name: "Raw Footage Archive Transfer", price: "+50% of Base", desc: "Full delivery of unedited 4K source files + Archive Usage Rights." },
  { name: "72-Hour Expedited Delivery", price: "+30% of Base", desc: "Priority post-production status. Skip the standard 14-day queue." },
  { name: "Additional Social Cut-downs", price: "₱2,000", desc: "Extra vertical edits leveraged from the captured project footage." }
];

export const Services: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-dvh bg-zinc-950 text-zinc-50 relative selection:bg-orange-500/30">
      <LiquidBackground />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-6 flex justify-between items-center bg-zinc-950/60 backdrop-blur-md border-b border-white/5">
        <a href="/" className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-zinc-400 hover:text-orange-400 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </a>
        <span className="text-xl font-bold tracking-tighter text-zinc-100">Stayelli.</span>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24 relative z-10">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-white">Engagement Baselines</h1>
          {/* Warm Gradient Line */}
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-amber-400 mx-auto rounded-full mb-8 shadow-[0_0_15px_rgba(249,115,22,0.5)]"></div>
          <p className="text-xl text-zinc-400 font-light leading-relaxed">
            We do not just shoot footage; we engineer visual assets designed to capture attention and drive conversion. Review our baseline production tiers below.
          </p>
        </motion.div>

        {/* Pricing Tiers Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-24">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              className={`relative rounded-3xl p-8 flex flex-col transition-all duration-500 ${
                tier.highlight 
                  ? 'border-orange-500/50 scale-105 shadow-2xl shadow-orange-900/20' 
                  : 'hover:border-zinc-700 hover:bg-zinc-900/80'
              }`}
              style={{
                ...glassCardStyle,
                border: tier.highlight ? '1px solid rgba(249, 115, 22, 0.4)' : glassCardStyle.border
              }}
            >
              {tier.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full text-xs font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(249,115,22,0.4)] text-zinc-950">
                  Most Selected
                </div>
              )}
              
              <tier.icon className={`w-10 h-10 mb-6 ${tier.highlight ? 'text-orange-400' : 'text-zinc-500'}`} />
              
              <h3 className="text-2xl font-bold mb-2 text-zinc-100">{tier.name}</h3>
              <p className="text-sm text-zinc-400 mb-8 min-h-[40px]">{tier.target}</p>
              
              <div className="mb-8">
                <span className="text-sm text-zinc-500 uppercase tracking-widest font-semibold block mb-1">Starting At</span>
                <span className="text-5xl font-bold tracking-tight text-white">{tier.price}</span>
              </div>
              
              <div className="space-y-4 mb-10 flex-grow">
                {tier.deliverables.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 shrink-0 mt-0.5 ${tier.highlight ? 'text-orange-500' : 'text-zinc-600'}`} />
                    <span className="text-zinc-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              
              <a 
                href="https://placeholder-link-to-your-google-form.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-4 rounded-xl font-bold text-center transition-all duration-300 flex items-center justify-center gap-2 ${
                  tier.highlight 
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-zinc-950 hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:scale-[1.02]' 
                    : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'
                }`}
              >
                Inquire Now <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>

        {/* Strategic Add-Ons Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl p-8 md:p-12 mb-20 border border-white/5"
          style={glassCardStyle}
        >
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="md:w-1/3">
              <Camera className="w-10 h-10 text-amber-500 mb-4" />
              <h3 className="text-3xl font-bold mb-4 text-zinc-100">Strategic<br/>Enhancements</h3>
              <p className="text-zinc-400 leading-relaxed">
                Add-on services designed to maximize the utility and lifespan of your production. Can be added to any baseline tier.
              </p>
            </div>
            
            <div className="md:w-2/3 w-full grid sm:grid-cols-2 gap-6">
              {addOns.map((addon, index) => (
                <div key={index} className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 hover:border-orange-500/30 transition-colors duration-300 group">
                  <div className="flex justify-between items-start mb-2 gap-4">
                    <h4 className="font-bold text-lg leading-tight text-zinc-200 group-hover:text-orange-400 transition-colors">{addon.name}</h4>
                  </div>
                  <span className="inline-block text-amber-500 font-mono text-sm mb-3">{addon.price}</span>
                  <p className="text-sm text-zinc-500 leading-relaxed">{addon.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Operational Terms Footer */}
        <div className="text-center max-w-2xl mx-auto border-t border-white/5 pt-10">
          <p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold mb-4">Standard Operational Terms</p>
          <p className="text-sm text-zinc-400 leading-relaxed">
            All tiers include two (2) rounds of consolidated revisions and standard commercial digital licensing. Standard project turnaround is 14 business days from production wrap. A 50% non-refundable retainer is required to lock production dates.
          </p>
        </div>

      </main>
    </div>
  );
};