"use client"
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Check, ArrowRight } from 'lucide-react';

export default function CTA() {
  const [subscribedEmail, setSubscribedEmail] = useState<string>('');
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscribedEmail) return;
    setIsSubscribed(true);
    setSubscribedEmail('');
    setTimeout(() => {
      setIsSubscribed(false);
    }, 4000);
  };

  return (
    <section className="py-20 md:py-28 bg-zinc-950 border-b border-zinc-900 relative z-10 text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="p-8 md:p-16 bg-black border border-zinc-90 w-full relative"
        >
          <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase font-bold">
            Curriculum Updates Feed
          </span>
          
          <h2 className="mt-4 text-3xl md:text-5xl font-sans font-black uppercase tracking-tight text-white leading-none">
            STAY AHEAD OF THE TIMELINE
          </h2>
          
          <p className="mt-4 text-zinc-400 text-xs sm:text-[13px] leading-relaxed max-w-xl mx-auto">
            Subscribe to get immediate notification logs when new subjects, projects, or practical manuals get deployed into our active archive.
          </p>

          <form onSubmit={handleNewsletterSubmit} className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-zinc-550 absolute left-3.5 top-3.5" />
              <input 
                type="email" 
                required
                placeholder="Enter college student email..."
                value={subscribedEmail}
                onChange={(e) => setSubscribedEmail(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-805 text-xs text-white rounded-none pl-10 pr-3 py-3.5 focus:outline-none focus:border-zinc-500 font-mono"
              />
            </div>
            <button 
              type="submit"
              className="bg-white hover:bg-zinc-200 text-black px-6 py-3.5 text-xs font-bold uppercase tracking-widest transition-all duration-200 cursor-pointer rounded-none flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Subscribe</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {isSubscribed && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-xs font-mono text-white flex items-center justify-center gap-1.5 bg-zinc-900 py-2.5 px-4 max-w-xs mx-auto border border-zinc-800"
            >
              <Check className="w-3.5 h-3.5 text-white" />
              <span className="font-bold">EMAIL SUBSCRIBED TO SYNC LOGS</span>
            </motion.div>
          )}

        </motion.div>

      </div>
    </section>
  );
}
