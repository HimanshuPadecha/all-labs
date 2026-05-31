"use client"
import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ShieldCheck, Terminal, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onBrowseClick: () => void;
  onExploreClick: () => void;
}

export default function Navbar({ onBrowseClick, onExploreClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 20 
          ? 'bg-black/80 backdrop-blur-md border-b border-zinc-900 shadow-lg shadow-black/20' 
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="h-8.5 w-8.5 rounded-sm bg-white flex items-center justify-center text-black font-mono font-black text-sm tracking-tighter">
              AL
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-bold text-white tracking-widest text-md leading-none">ALL LABS</span>
              <span className="text-[9px] text-zinc-500 font-mono tracking-widest mt-1">CS & MCA REGISTRY</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={onBrowseClick}
              className="text-zinc-400 hover:text-white text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer"
            >
              Lab Manuals
            </button>
            <button 
              onClick={onExploreClick}
              className="text-zinc-400 hover:text-white text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer"
            >
              Core Subjects
            </button>
            <a 
              href="#features" 
              className="text-zinc-400 hover:text-white text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer"
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              className="text-zinc-400 hover:text-white text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer"
            >
              Methodology
            </a>
            <a 
              href="#testimonials" 
              className="text-zinc-400 hover:text-white text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer"
            >
              Testimonials
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              href="https://github.com/HimanshuPadecha/all-Labs" 
              target="_blank" 
              rel="noreferrer"
              className="p-1.5 text-zinc-400 hover:text-white border border-zinc-900 hover:border-zinc-805 transition-all rounded-sm flex items-center justify-center bg-zinc-950"
              title="GitHub Repository"
            >
              <Github className="w-4 h-4" />
            </a>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-[10px] font-mono font-medium bg-zinc-900 text-zinc-300 border border-zinc-800">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
              ARCHIVE ONLINE
            </span>
            <button 
              onClick={onBrowseClick}
              className="group inline-flex items-center justify-center gap-1.5 bg-white hover:bg-neutral-200 text-black px-4 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer"
            >
              Launch Console
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-sm text-[9px] font-mono bg-zinc-900 text-zinc-300 border border-zinc-800">
              LIVE
            </span>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-zinc-400 hover:text-white p-1 rounded-sm transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black border-b border-zinc-900 font-sans"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              <button
                onClick={() => {
                  onBrowseClick();
                  setIsOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-sm uppercase tracking-wider font-medium text-zinc-300 hover:text-white hover:bg-zinc-900"
              >
                Lab Manuals
              </button>
              <button
                onClick={() => {
                  onExploreClick();
                  setIsOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-sm uppercase tracking-wider font-medium text-zinc-300 hover:text-white hover:bg-zinc-900"
              >
                Core Subjects
              </button>
              <a
                href="#features"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-sm uppercase tracking-wider font-medium text-zinc-300 hover:text-white hover:bg-zinc-900"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-sm uppercase tracking-wider font-medium text-zinc-300 hover:text-white hover:bg-zinc-900"
              >
                Methodology
              </a>
              <a
                href="#testimonials"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-sm uppercase tracking-wider font-medium text-zinc-300 hover:text-white hover:bg-zinc-900"
              >
                Testimonials
              </a>
              <div className="pt-4 border-t border-zinc-900 space-y-3">
                <button
                  onClick={() => {
                    onBrowseClick();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-white text-black font-bold uppercase tracking-widest text-xs py-3 px-4 rounded-sm hover:bg-zinc-200 transition-colors cursor-pointer"
                >
                  START BROWSING
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center gap-2 bg-zinc-950 border border-zinc-900 text-zinc-300 font-bold uppercase tracking-widest text-xs py-3 px-4 rounded-sm hover:bg-zinc-900 transition-colors cursor-pointer"
                >
                  <Github className="w-4 h-4" />
                  GitHub Code
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
