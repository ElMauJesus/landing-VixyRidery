"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { VixyLogo } from "../graphics/VixyLogo";
import { Button } from "../ui/Button";
import { NAV_ITEMS } from "@/data/landingData";
import styles from "./Navbar.module.css";

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.navContainer}`}>
        {/* Brand Logo */}
        <Link href="#inicio" className={styles.logoLink}>
          <VixyLogo size="sm" />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className={styles.desktopNav}>
          {NAV_ITEMS.map((item) => (
            <Link key={item.label} href={item.href} className={styles.navLink}>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Action CTA */}
        <div className={styles.desktopCta}>
          <Button variant="primary" size="sm" icon={<Download size={16} />}>
            Descargar App
          </Button>
        </div>

        {/* Mobile Hamburger Menu Toggle */}
        <button
          className={styles.menuToggle}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={styles.mobileDrawer}
          >
            <nav className={styles.mobileNav}>
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={styles.mobileNavLink}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className={styles.mobileCtaWrapper}>
                <Button
                  variant="primary"
                  size="md"
                  icon={<Download size={18} />}
                  fullWidth
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Descargar App
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
