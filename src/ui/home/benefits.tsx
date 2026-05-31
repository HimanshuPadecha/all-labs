import React from 'react';
import { motion } from 'motion/react';

export default function Benefits() {
  return (
    <section className="py-20 md:py-28 bg-black border-b border-zinc-900 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Inside a split panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left panel: Quantitative analytics and graphical stats comparison */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase font-black block">
              Quantitative Efficiency Tracker
            </span>
            <h3 className="text-2xl md:text-4xl font-sans font-black uppercase tracking-tight text-white leading-none">
              RECLAIMING EFFORT AT SCALE
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-xl">
              Manual journal tracking and code searching wastes dozens of hours of active learning. See how a centralized repository flips the academic preparation curve:
            </p>

            <div className="mt-8 p-6 bg-zinc-950 border border-zinc-900 space-y-6">
              
              {/* Stat bar 1 */}
              <div>
                <div className="flex justify-between items-center text-xs font-mono mb-2 uppercase">
                  <span className="text-zinc-400">Manual Research Run (Hours per Subject)</span>
                  <span className="text-white font-bold">12+ HOURS / WEEK</span>
                </div>
                <div className="h-6 w-full bg-zinc-900 border border-zinc-805 p-0.5 rounded-none overflow-hidden">
                  <div className="h-full bg-zinc-500 w-full rounded-none" />
                </div>
              </div>

              {/* Stat bar 2 */}
              <div>
                <div className="flex justify-between items-center text-xs font-mono mb-2 uppercase">
                  <span className="text-zinc-200 font-bold">All Labs Platform (Fuzzy Retrieval)</span>
                  <span className="text-white font-black">LESS THAN 1 MINUTE</span>
                </div>
                <div className="h-6 w-full bg-zinc-900 border border-zinc-805 p-0.5 rounded-none overflow-hidden">
                  <div className="h-full bg-white w-2% min-w-[12px] rounded-none animate-pulse" />
                </div>
              </div>

              {/* Stat Metrics Box */}
              <div className="pt-4 border-t border-zinc-900 grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs font-mono text-zinc-500 uppercase block">CODING DURATION</span>
                  <span className="text-2xl font-mono font-bold text-white uppercase mt-1 block">95% MAXIMIZED</span>
                </div>
                <div>
                  <span className="text-xs font-mono text-zinc-500 uppercase block">ADMIN BUSYWORK</span>
                  <span className="text-2xl font-mono font-bold text-zinc-450 uppercase mt-1 block">0% REDUCED</span>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Right panel: Core advantages list with monochrome checkmarkers */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6 lg:pl-6"
          >
            <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase font-black block">
              SAVES TIME SO CAN FOCUS ON ACTUAL CODING
            </span>
            <h3 className="text-2xl md:text-3xl font-sans font-black uppercase tracking-tight text-white leading-none">
              CORE PLATFORM BENEFITS
            </h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Writing journals manually is a repetitive task. Our curated archive saves time, allowing computer science students to focus on solving software engineering problems, debugging scripts, and preparing portfolios.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-3">
                <div className="h-5 w-5 bg-white text-black flex items-center justify-center rounded-none font-sans font-extrabold text-[10px] mt-0.5 flex-shrink-0">
                  ✓
                </div>
                <div>
                  <strong className="text-white uppercase tracking-wider text-[11px] block">Unified Lab Material Registry</strong>
                  <p className="text-zinc-405 text-xs mt-1">Every single lab session is fully available inside this platform. There is no need to waste valuable hours doing endless Google search runs or tracing old archives.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-5 w-5 bg-white text-black flex items-center justify-center rounded-none font-sans font-extrabold text-[10px] mt-0.5 flex-shrink-0">
                  ✓
                </div>
                <div>
                  <strong className="text-white uppercase tracking-wider text-[11px] block">No More Academic Fumbling</strong>
                  <p className="text-zinc-405 text-xs mt-1">Eliminate the unnecessary effort of spending days figuring out the entire complex database configuration or compiler steps by yourself.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-5 w-5 bg-white text-black flex items-center justify-center rounded-none font-sans font-extrabold text-[10px] mt-0.5 flex-shrink-0">
                  ✓
                </div>
                <div>
                  <strong className="text-white uppercase tracking-wider text-[11px] block">Maximize Actual Coding Hours</strong>
                  <p className="text-zinc-405 text-xs mt-1">Saves endless mechanical journal writing hours so you can focus 100% of your energy on actual practical software development, real coding, and deep learning.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-5 w-5 bg-white text-black flex items-center justify-center rounded-none font-sans font-extrabold text-[10px] mt-0.5 flex-shrink-0">
                  ✓
                </div>
                <div>
                  <strong className="text-white uppercase tracking-wider text-[11px] block">Break the endless busywork trap</strong>
                  <p className="text-zinc-405 text-xs mt-1">Directly break the university's core administrative principle of keeping you perpetually loaded with redundant documentation tasks just to stay busy.</p>
                </div>
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
