import React from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  Terminal, 
  HelpCircle, 
  FileText, 
  Zap, 
  Users,
  Code
} from 'lucide-react';
import { SAAS_FEATURES } from '@/data/lab-data';

export default function Features() {
  const getFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen': return <BookOpen className="w-5 h-5 text-white" />;
      case 'Terminal': return <Terminal className="w-5 h-5 text-white" />;
      case 'HelpCircle': return <HelpCircle className="w-5 h-5 text-white" />;
      case 'FileText': return <FileText className="w-5 h-5 text-white" />;
      case 'Zap': return <Zap className="w-5 h-5 text-white" />;
      case 'Users': return <Users className="w-5 h-5 text-white text-semibold" />;
      default: return <Code className="w-5 h-5 text-white" />;
    }
  };

  return (
    <section id="features" className="py-20 md:py-28 relative z-10 border-b border-zinc-900 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-24"
        >
          <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase font-bold">
            Curated Platform Scope
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-sans font-black uppercase tracking-tight text-white leading-none">
            NOTHING SUPERFLUOUS, <br />
            JUST THE COMPLETE REPOSITORY
          </h2>
          <p className="mt-4 text-zinc-400 text-sm leading-relaxed max-w-2xl mx-auto">
            Eliminating administrative overhead so students can focus 100% of their attention on clean code formatting and real database logic.
          </p>
        </motion.div>

        {/* Bento grid list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SAAS_FEATURES.map((feat, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              key={feat.id}
              className="p-8 bg-zinc-950 border border-zinc-900/80 hover:border-zinc-800 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-zinc-905 mb-6">
                  <div className="p-3 bg-zinc-900 group-hover:bg-zinc-850 border border-zinc-850 transition-colors rounded-none">
                    {getFeatureIcon(feat.iconName)}
                  </div>
                  <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest bg-zinc-900/50 px-2 py-0.5 rounded-sm">
                    {feat.badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white uppercase tracking-wider">
                  {feat.title}
                </h3>
                <p className="mt-3 text-zinc-400 text-xs sm:text-[13px] leading-relaxed">
                  {feat.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-900/40 flex items-center gap-1.5 text-zinc-500 group-hover:text-white transition-colors">
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold">RESOURCING LOG</span>
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover:bg-white transition-colors"></span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
