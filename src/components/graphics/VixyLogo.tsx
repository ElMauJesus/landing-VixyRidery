"use client";

import React from "react";
import Image from "next/image";
import styles from "./VixyLogo.module.css";

interface VixyLogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "color" | "white";
  className?: string;
}

export const VixyLogo: React.FC<VixyLogoProps> = ({
  size = "md",
  className = "",
}) => {
  return (
    <div className={`${styles.logoContainer} ${styles[size]} ${className}`}>
      <Image
        src="/icons/footer/vixylogo.png"
        alt="Vixy Rider Logo"
        width={300}
        height={200}
        priority
        className={styles.logoImg}
        style={{ width: "100%", height: "auto", objectFit: "contain" }}
      />
    </div>
  );
};

