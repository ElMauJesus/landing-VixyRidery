"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import styles from "./Card.module.css";

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  bordered?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  hoverEffect = true,
  bordered = true,
  padding = "md",
}) => {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -5, boxShadow: "0 16px 36px rgba(94, 23, 235, 0.12)" } : undefined}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`${styles.card} ${bordered ? styles.bordered : ""} ${
        styles[`padding-${padding}`]
      } ${className}`}
    >
      {children}
    </motion.div>
  );
};
