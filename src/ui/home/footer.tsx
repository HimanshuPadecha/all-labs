import React from 'react';
import { motion } from 'motion/react';
import { Terminal, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-black py-12 md:py-20 relative z-10 text-center sm:text-left"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-zinc-900">
          
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-white">
              <Terminal className="w-5 h-5" />
              <span className="font-sans font-black tracking-widest uppercase text-sm">ALL LABS.</span>
            </div>
            <p className="text-zinc-505 text-xs leading-relaxed max-w-sm">
              The ultimate computer science utility. Reclaiming countless hours of redundant documentation and tracing to focus purely on high quality coding algorithms.
            </p>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="space-y-3">
              <h4 className="text-white text-xs font-mono uppercase tracking-widest font-black">CURRICULUM</h4>
              <ul className="space-y-2 text-zinc-505 text-xs font-mono uppercase">
                <li><span className="hover:text-white transition-colors cursor-pointer">Python </span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">DBMS Queries</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Project - 1 Web</span></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-white text-xs font-mono uppercase tracking-widest font-black">PLATFORM</h4>
              <ul className="space-y-2 text-zinc-505 text-xs font-mono uppercase">
                <li><span className="hover:text-white transition-colors cursor-pointer">Interactive Sandbox</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Journal Indexer</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Verified Materials</span></li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1 space-y-3">
              <h4 className="text-white text-xs font-mono uppercase tracking-widest font-black">SECURITY</h4>
              <div className="p-3 bg-zinc-950 border border-zinc-900 inline-flex items-center gap-1.5 rounded-none text-left">
                <ShieldCheck className="w-4 h-4 text-white flex-shrink-0" />
                <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase leading-none">VERIFIED REFERENCE SAFE</span>
              </div>
            </div>
          </div>

        </div>

        {/* Legal bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-600 text-[10px] font-mono uppercase tracking-widest">
          <span>© {new Date().getFullYear()} ALL LABS PLATFORM. FREE OPEN SOURCE EDUCATIONAL UTILITY.</span>
          <div className="flex gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">PRIVACY MANIFEST</span>
            <span className="hover:text-white transition-colors cursor-pointer">ACADEMIC EXEMPTION</span>
          </div>
        </div>

      </div>
    </motion.footer>
  );
}
