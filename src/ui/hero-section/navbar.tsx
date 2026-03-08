"use client";
import Image from "next/image";
import Link from "next/link";
import { Variants } from "motion/react";
import { motion } from "motion/react";

const navVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};


const Navbar = () => {
  return (
    <motion.nav
      className="absolute top-0 left-0 z-50 w-full border-b border-white/5"
      variants={navVariants}
      initial="hidden"
      animate="show"
    >
      <div className="flex items-center justify-between w-full px-4 sm:px-8 lg:px-20 h-14 sm:h-16">
        {/* Logo */}
        <motion.div
          variants={itemVariants}
          className="flex items-center min-w-[44px]"
        >
          <Image
            src="/logo.png"
            alt="logo"
            width={0}
            height={0}
            sizes="(max-width: 640px) 44px, (max-width: 1024px) 80px, 104px"
            className="w-11 sm:w-20 lg:w-24 h-auto object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.25)]"
          />
        </motion.div>

        {/* Nav Links */}
        <div className="flex items-center gap-1 sm:gap-2">
          {["Python", "DBMS", "Project - I"].map((label) => (
            <motion.button
              key={label}
              variants={itemVariants}
              className="
                relative px-2 sm:px-4 py-1.5
                text-[11px] sm:text-xs lg:text-sm
                font-medium tracking-widest uppercase
                text-white/60 hover:text-white
                rounded-lg hover:bg-white/10
                transition-all duration-200
                group
              "
            >
              {label}
              <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-0 group-hover:w-4/5 h-px bg-white/40 transition-all duration-300 rounded-full" />
            </motion.button>
          ))}

          <Link
            href="/admin/seed/seed-questions"
            className="hidden lg:block ml-2"
          >
            <motion.button
              variants={itemVariants}
              className="
                px-4 py-1.5
                text-xs tracking-widest uppercase font-medium
                text-white/50 hover:text-white/90
                border border-white/10 hover:border-white/25
                bg-transparent hover:bg-white/10
                rounded-lg transition-all duration-200
              "
            >
              Admin
            </motion.button>
          </Link>
        </div>

        {/* Logout */}
        <motion.div variants={itemVariants}>
          <button
            className="
              px-3 sm:px-5 py-1.5
              text-[11px] sm:text-xs font-semibold tracking-widest uppercase
              text-white/70 hover:text-white
              bg-transparent hover:bg-white/10
              border border-white/20 hover:border-white/40
              rounded-lg transition-all duration-200 hover:-translate-y-px
            "
          >
            Logout
          </button>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
