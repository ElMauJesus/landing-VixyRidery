"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import styles from "./Button.module.css";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "dark" | "glass";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  onClick,
  className = "",
  type = "button",
  fullWidth = false,
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      type={type}
      onClick={onClick}
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${
        fullWidth ? styles.fullWidth : ""
      } ${className}`}
    >
      {icon && iconPosition === "left" && <span className={styles.icon}>{icon}</span>}
      <span className={styles.label}>{children}</span>
      {icon && iconPosition === "right" && <span className={styles.icon}>{icon}</span>}
    </motion.button>
  );
};
