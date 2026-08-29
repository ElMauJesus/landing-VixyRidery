"use client";

import React from "react";
import styles from "./MascotIllustration.module.css";

interface MascotIllustrationProps {
  variant?: "hero" | "kart" | "badge";
  className?: string;
}

export const MascotIllustration: React.FC<MascotIllustrationProps> = ({
  variant = "hero",
  className = "",
}) => {
  return (
    <div className={`${styles.mascotWrapper} ${styles[variant]} ${className}`}>
      {/* Speed lines background effect */}
      <div className={styles.speedLines}>
        <span />
        <span />
        <span />
      </div>

      <svg
        viewBox="0 0 220 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.mascotSvg}
      >
        <defs>
          <linearGradient id="foxFur" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF7B00" />
            <stop offset="100%" stopColor="#E65100" />
          </linearGradient>

          <linearGradient id="helmetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7B2CBF" />
            <stop offset="50%" stopColor="#5E17EB" />
            <stop offset="100%" stopColor="#3C096C" />
          </linearGradient>

          <filter id="mascotGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Glow Circle */}
        <circle cx="110" cy="110" r="95" fill="url(#helmetGrad)" opacity="0.12" filter="url(#mascotGlow)" />

        {/* Fox Ears (Helmet integrated) */}
        <path d="M 50 70 L 30 20 L 80 50 Z" fill="url(#helmetGrad)" />
        <path d="M 170 70 L 190 20 L 140 50 Z" fill="url(#helmetGrad)" />
        <path d="M 55 60 L 40 32 L 72 50 Z" fill="#FFB74D" />
        <path d="M 165 60 L 180 32 L 148 50 Z" fill="#FFB74D" />

        {/* Fox Head Base */}
        <path d="M 45 100 Q 110 170 175 100 Q 185 70 160 55 Q 110 40 60 55 Q 35 70 45 100 Z" fill="url(#foxFur)" />

        {/* White Muzzle */}
        <path d="M 70 115 Q 110 160 150 115 Q 110 95 70 115 Z" fill="#FFFFFF" />

        {/* Cute Nose */}
        <polygon points="102,125 118,125 110,135" fill="#1A153A" />

        {/* Rider Helmet Visor */}
        <path d="M 45 75 C 65 50, 155 50, 175 75 C 165 88, 55 88, 45 75 Z" fill="url(#helmetGrad)" stroke="#C77DFF" strokeWidth="2" />
        <path d="M 55 76 C 75 62, 145 62, 165 76 Z" fill="#FFFFFF" opacity="0.3" />

        {/* Cheerful Big Eyes */}
        <circle cx="80" cy="100" r="14" fill="#1A153A" />
        <circle cx="140" cy="100" r="14" fill="#1A153A" />
        <circle cx="84" cy="96" r="5" fill="#FFFFFF" />
        <circle cx="144" cy="96" r="5" fill="#FFFFFF" />

        {/* Jacket Collar / Suit */}
        <path d="M 50 160 Q 110 190 170 160 L 185 210 Q 110 230 35 210 Z" fill="url(#helmetGrad)" />
        <path d="M 110 165 L 110 215" stroke="#FFFFFF" strokeWidth="3" strokeDasharray="4 4" />
      </svg>
    </div>
  );
};
