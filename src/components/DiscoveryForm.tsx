import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle, X, Mail, Phone } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { LiquidBackground } from './LiquidBackground';

export const DiscoveryForm = () => {
  // Forces the page to the top and locks in dark mode immediately
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.classList.add('dark');
  }, []);

  const [searchParams] = useSearchParams();
  const isHK = searchParams.get('region') === 'hk';

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State mapping to your PDF
  const [formData, setFormData] = useState({
    brandName: '', stakeholder: '', email: '', website: '', brandValues: '',
    primaryGoal: '', targetAudience: '', keyMessage: '', desiredAction: '',
    visualTone: '', referenceLinks: '', audioReqs: '', graphicNeeds: '',
    primaryPlatform: '', aspectRatios: [] as string[], deliverables: '', rawFootage: '',
    shootDates: '', locations: '', talent: '', props: '',
    budgetRange: ''
  });

  const updateForm = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckbox = (ratio: string) => {
    setFormData(prev => ({
      ...prev,
      aspectRatios: prev.aspectRatios.includes(ratio)
        ? prev.aspectRatios.filter(r => r !== ratio)
        : [...prev.aspectRatios, ratio]
    }));
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(import.meta.env.VITE_FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const glassStyle = {
    background: 'rgba(18, 18, 18, 0.6)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
  };

  const inputClass = "w-full p-4 bg-gray-800/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors";
  const labelClass = "block text-sm font-medium text-gray-300 mb-2";

  if (isSuccess) {
    return (
      <div className="min-h-dvh flex items-center justify-center relative py-20">
        <LiquidBackground />
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-8 md:p-10 rounded-3xl text-center max-w-lg mx-6 w-full" style={glassStyle}>
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">Brief Received.</h2>
          
          <p className="text-gray-300 mb-8 leading-relaxed">
            Thank you for outlining your vision. I'll review these details against my production schedule and get back to you within 24-48 hours.
          </p>

          {/* Urgent Inquiries Block */}
          <div className="bg-gray-900/50 rounded-2xl p-6 mb-8 border border-gray-700/50 backdrop-blur-sm">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Need Immediate Assistance?</h3>
            <div className="space-y-4 text-left">
              <a href="mailto:stayelli.multimedia@gmail.com" className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group">
                <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                  <Mail className="w-5 h-5 text-blue-400" />
                </div>
                <span className="text-sm font-medium">stayelli.multimedia@gmail.com</span>
              </a>
              
              <div className="flex items-center gap-4 text-gray-300 group">
                <div className="p-2 bg-green-500/10 rounded-lg group-hover:bg-green-500/20 transition-colors">
                  <Phone className="w-5 h-5 text-green-400" />
                </div>
                <div className="flex flex-col text-sm font-medium gap-1">
                  <a href="tel:+639959702451" className="hover:text-white transition-colors">+63 995-970-2451 (PH)</a>
                  <a href="tel:+85291599816" className="hover:text-white transition-colors">+852 9159-9816 (HK)</a>
                </div>
              </div>
            </div>
          </div>

          <Link to="/" className="w-full py-4 bg-white text-gray-900 rounded-full font-bold hover:bg-gray-200 transition-colors inline-block shadow-lg">
            Return to Portfolio
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh py-20 px-6 relative flex justify-center items-center">
      <LiquidBackground />
      
      <div className="w-full max-w-3xl relative z-10">
        <Link to="/" className="absolute -top-12 left-0 text-gray-400 hover:text-white flex items-center gap-2 transition-colors">
          <X className="w-5 h-5" /> Cancel
        </Link>

        {/* Progress Bar */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className={`h-2 flex-1 rounded-full transition-all duration-500 ${step >= i ? 'bg-blue-500' : 'bg-gray-700'}`} />
          ))}
        </div>

        <motion.div className="p-8 md:p-12 rounded-3xl" style={glassStyle}>
          <form onSubmit={step === 5 ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }}>
            <AnimatePresence mode="wait">
              
              {/* STEP 1: Foundation */}
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="text-3xl font-bold text-white mb-6">1. Brand Foundation</h2>
                  <div className="space-y-6">
                    <div>
                      <label className={labelClass}>Company/Brand Name</label>
                      <input required type="text" className={inputClass} value={formData.brandName} onChange={e => updateForm('brandName', e.target.value)} />
                    </div>
                    <div>
                      <label className={labelClass}>Primary Stakeholder & Role (Final decision maker)</label>
                      <input required type="text" className={inputClass} value={formData.stakeholder} onChange={e => updateForm('stakeholder', e.target.value)} />
                    </div>
                    <div>
                      <label className={labelClass}>Email Address</label>
                      <input required type="email" className={inputClass} value={formData.email} onChange={e => updateForm('email', e.target.value)} />
                    </div>
                    <div>
                      <label className={labelClass}>Website & Social Handles</label>
                      <input type="text" className={inputClass} value={formData.website} onChange={e => updateForm('website', e.target.value)} />
                    </div>
                    <div>
                      <label className={labelClass}>Core Brand Values (3 words describing your identity)</label>
                      <input type="text" placeholder="e.g., Luxury, Gritty, Minimalist" className={inputClass} value={formData.brandValues} onChange={e => updateForm('brandValues', e.target.value)} />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Objectives */}
              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="text-3xl font-bold text-white mb-6">2. Strategic Objectives</h2>
                  <div className="space-y-6">
                    <div>
                      <label className={labelClass}>Primary Goal</label>
                      <select required className={inputClass} value={formData.primaryGoal} onChange={e => updateForm('primaryGoal', e.target.value)}>
                        <option value="">Select a goal...</option>
                        <option value="Brand Awareness">Brand Awareness</option>
                        <option value="Direct Sales">Direct Sales</option>
                        <option value="Educational/Tutorial">Educational/Tutorial</option>
                        <option value="Event Recap">Event Recap</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Target Audience Profile (Age, interests, pain points)</label>
                      <textarea required className={`${inputClass} min-h-[100px]`} value={formData.targetAudience} onChange={e => updateForm('targetAudience', e.target.value)} />
                    </div>
                    <div>
                      <label className={labelClass}>Key Message (One thing they must remember)</label>
                      <input required type="text" className={inputClass} value={formData.keyMessage} onChange={e => updateForm('keyMessage', e.target.value)} />
                    </div>
                    <div>
                      <label className={labelClass}>Desired Action (e.g., Book a consultation)</label>
                      <input type="text" className={inputClass} value={formData.desiredAction} onChange={e => updateForm('desiredAction', e.target.value)} />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Creative Direction */}
              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="text-3xl font-bold text-white mb-6">3. Creative Direction</h2>
                  <div className="space-y-6">
                    <div>
                      <label className={labelClass}>Visual Tone (e.g., Cinematic, Fast-Cuts, Handheld)</label>
                      <input required type="text" className={inputClass} value={formData.visualTone} onChange={e => updateForm('visualTone', e.target.value)} />
                    </div>
                    <div>
                      <label className={labelClass}>Reference Links (2-3 videos matching your desired look)</label>
                      <textarea className={`${inputClass} min-h-[100px]`} value={formData.referenceLinks} onChange={e => updateForm('referenceLinks', e.target.value)} />
                    </div>
                    <div>
                      <label className={labelClass}>Audio Requirements</label>
                      <select required className={inputClass} value={formData.audioReqs} onChange={e => updateForm('audioReqs', e.target.value)}>
                        <option value="">Select requirement...</option>
                        <option value="Voiceover">Voiceover</option>
                        <option value="On-camera interviews">On-camera interviews</option>
                        <option value="Music-only">Music-only</option>
                        <option value="Mixed">Mixed</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: Technical & Logistics */}
              {step === 4 && (
                <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="text-3xl font-bold text-white mb-6">4. Specs & Logistics</h2>
                  <div className="space-y-6">
                    <div>
                      <label className={labelClass}>Required Aspect Ratios</label>
                      <div className="flex gap-4">
                        {['9:16 (TikTok/Reels)', '16:9 (YouTube/Web)', '4:5 (IG Feed)'].map(ratio => (
                          <label key={ratio} className="flex items-center gap-2 text-white cursor-pointer">
                            <input type="checkbox" checked={formData.aspectRatios.includes(ratio)} onChange={() => handleCheckbox(ratio)} className="w-5 h-5 rounded accent-blue-500" />
                            <span className="text-sm">{ratio}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Deliverable List (e.g., 1x 60s Brand Film + 3x 15s Hooks)</label>
                      <textarea required className={`${inputClass} min-h-[80px]`} value={formData.deliverables} onChange={e => updateForm('deliverables', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Proposed Shoot Date(s)</label>
                        <input type="text" className={inputClass} value={formData.shootDates} onChange={e => updateForm('shootDates', e.target.value)} />
                      </div>
                      <div>
                        <label className={labelClass}>Locations (Scout needed?)</label>
                        <input type="text" className={inputClass} value={formData.locations} onChange={e => updateForm('locations', e.target.value)} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 5: Budget & Submit */}
              {step === 5 && (
                <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="text-3xl font-bold text-white mb-6">5. Budget & Wrap Up</h2>
                  <div className="space-y-6">
                    <div>
                      <label className={labelClass}>Project Budget Tier</label>
                      <select required className={inputClass} value={formData.budgetRange} onChange={e => updateForm('budgetRange', e.target.value)}>
                        <option value="">Select a tier...</option>
                        {isHK ? (
                          <>
                            <option value="Tier 1: HK$3,500 ">Tier 1: HK$3,500 </option>
                            <option value="Tier 2: HK$7,500">Tier 2: HK$7,500</option>
                            <option value="Tier 3: HK$12,500+">Tier 3: HK$12,500+</option>
                          </>
                        ) : (
                          <>
                            <option value="Tier 1: ₱10,000">Tier 1: ₱10,000</option>
                            <option value="Tier 2: ₱15,000">Tier 2: ₱15,000</option>
                            <option value="Tier 3: ₱22,000">Tier 3: ₱22,000</option>
                          </>
                        )}
                      </select>
                      <p className="text-xs text-gray-400 mt-2">Selecting a tier allows me to accurately tailor the production scope, crew size, and deliverables to your resources.</p>
                    </div>
                    <div>
                      <label className={labelClass}>Any other details or questions?</label>
                      <textarea className={`${inputClass} min-h-[120px]`} placeholder="Anything else I should know..." />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="flex justify-between mt-10">
              {step > 1 ? (
                <button type="button" onClick={prevStep} className="flex items-center gap-2 px-6 py-3 text-white hover:bg-gray-800 rounded-full transition-colors">
                  <ArrowLeft className="w-5 h-5" /> Back
                </button>
              ) : <div></div>}

              {step < 5 ? (
                <button type="submit" className="flex items-center gap-2 px-8 py-3 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-200 transition-colors">
                  Next <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50">
                  {isSubmitting ? 'Submitting...' : 'Submit Project Brief'}
                </button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};