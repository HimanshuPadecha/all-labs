"use client"
import React, { ForwardedRef } from 'react';
import { motion } from 'motion/react';
import { Binary, Database, Globe, Code, ArrowRight } from 'lucide-react';
import { LAB_SUBJECTS } from '@/data/lab-data';
import Link from 'next/link';

interface CategoriesProps {
  onSelectCategory: (id: string) => void;
}

export const Categories = React.forwardRef(function Categories(
  { onSelectCategory }: CategoriesProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const getSubjectIcon = (iconName: string) => {
    switch (iconName) {
      case 'Binary': return <Binary className="w-6 h-6 text-white" />;
      case 'Database': return <Database className="w-6 h-6 text-white" />;
      case 'Globe': return <Globe className="w-6 h-6 text-white" />;
      default: return <Code className="w-6 h-6 text-white" />;
    }
  };

  return (
    <section 
      id="categories" 
      ref={ref} 
      className="py-20 md:py-28 bg-zinc-950 border-b border-zinc-900 relative z-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase font-black">
            Academic Portfolios
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-sans font-black uppercase tracking-tight text-white leading-none">
            AVAILABLE REGISTRIES
          </h2>
          <p className="mt-4 text-zinc-400 text-sm leading-relaxed">
            Direct access to structured, fully compiled, MCA-specific practical indices and algorithmic implementations.
          </p>
        </motion.div>

        {/* Categories cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {LAB_SUBJECTS.map((sub, index) => (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -5 }}
              key={sub.id}
              className="p-8 bg-black border border-zinc-900 flex flex-col justify-between group hover:border-zinc-800 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-zinc-900 mb-6">
                  <div className="p-3 bg-zinc-900 border border-zinc-850 group-hover:bg-zinc-850 transition-colors">
                    {getSubjectIcon(sub.iconName)}
                  </div>
                  <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                    {sub.practicalCount} Practical Tasks
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-3 group-hover:text-white transition-colors">
                  {sub.name}
                </h3>
                
                <p className="text-zinc-400 text-xs sm:text-[13px] leading-relaxed">
                  {sub.description}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-900/60">
                <Link href={sub.url}>
                <button
                  className="w-full bg-zinc-900 hover:bg-white text-zinc-300 hover:text-black py-3 px-4 text-xs font-bold uppercase tracking-widest transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 rounded-none border border-zinc-850"
                >
                  <span>LOAD SUBJECT MANUAL</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
});
