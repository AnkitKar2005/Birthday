"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

const variants = {
  primary:
    "bg-gradient-to-r from-gold/90 to-gold/70 text-midnight hover:from-gold hover:to-gold/80 shadow-lg shadow-gold/10",
  ghost:
    "bg-transparent text-cream/80 hover:text-cream hover:bg-cream/5",
  outline:
    "bg-transparent border border-cream/20 text-cream/80 hover:border-cream/40 hover:text-cream",
};

const sizes = {
  sm: "px-4 py-2 text-xs tracking-widest",
  md: "px-6 py-3 text-sm tracking-widest",
  lg: "px-8 py-4 text-sm tracking-widest",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className={`
          relative inline-flex items-center justify-center gap-2
          rounded-full font-sans font-medium uppercase
          transition-colors duration-300 cursor-pointer
          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold
          disabled:opacity-50 disabled:pointer-events-none
          ${variants[variant]} ${sizes[size]} ${className}
        `}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
