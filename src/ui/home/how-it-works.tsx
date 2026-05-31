import React from 'react';
import { motion } from 'motion/react';
import { SAVINGS_STEPS } from '@/data/lab-data';

export default function HowItWorks() {
  return (
    <section className="py-20 md:py-28 bg-zinc-950 border-b border-zinc-900 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title block */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-24"
        >
          <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase font-black">
            Accelerated Cycles
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-sans font-black uppercase tracking-tight text-white leading-none">
            RECLAIM TIME IN THREE STEPS
          </h2>
          <p className="mt-4 text-zinc-400 text-sm leading-relaxed max-w-xl mx-auto">
            Get straightforward directions, study compiled outputs, and skip the redundant admin busywork.
          </p>
        </motion.div>

        {/* Dynamic timeline list */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {SAVINGS_STEPS.map((step, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              key={step.number}
              className="p-8 bg-black border border-zinc-900 relative flex flex-col justify-between group hover:border-zinc-850 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-zinc-900 mb-6">
                  <span className="text-3xl font-mono font-black text-white/10 group-hover:text-white/20 transition-colors">
                    0{step.number}
                  </span>
                  <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest bg-zinc-950 px-2 py-0.5 border border-zinc-900">
                    {step.badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white uppercase tracking-wider">
                  {step.title}
                </h3>
                <p className="mt-3 text-zinc-400 text-xs sm:text-[13px] leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between text-zinc-650 group-hover:text-zinc-500 transition-colors">
                <span className="text-[10px] font-mono uppercase tracking-widest">STATE: COMPLETE</span>
                <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
