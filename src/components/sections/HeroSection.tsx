"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Download, User } from "lucide-react";
import { getAssetPath } from "@/utils/basePath";
import { Button } from "../ui/Button";
import { PhoneMockup } from "../graphics/PhoneMockup";
import { MascotIllustration } from "../graphics/MascotIllustration";
import styles from "./HeroSection.module.css";

export const HeroSection: React.FC = () => {
  return (
    <section id="inicio" className={styles.heroSection}>
      <div className={`container ${styles.heroGrid}`}>
        {/* Left Column - Headline & CTAs */}
        <motion.div
          className={styles.textContent}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className={styles.mainTitle}>
            VIAJA RÁPIDO, <br />
            VIAJA SEGURO, <br />
            VIAJA CON <span className="text-gradient">VIXY</span>
          </h1>

          <p className={styles.description}>
            La plataforma de movilidad que conecta pasajeros y riders para que llegues siempre a tu destino.
          </p>

          {/* Action Buttons */}
          <div className={styles.ctaGroup}>
            <Button variant="primary" size="lg" icon={<Download size={20} />}>
              Descargar App
            </Button>
            <Button variant="outline" size="lg" icon={<User size={20} />}>
              Soy Rider
            </Button>
          </div>

          {/* App Store & Google Play Badges */}
          <div className={styles.badgesGroup}>
            {/* Google Play Item */}
            <div className={styles.badgeItem}>
              <span className={styles.badgeLabel}>DISPONIBLE EN</span>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.badgeLink}
                aria-label="Disponible en Google Play"
              >
                <Image
                  src={getAssetPath("/icons/footer/googleplay.png")}
                  alt="Google Play"
                  width={160}
                  height={48}
                  className={styles.badgeImg}
                />
              </a>
            </div>

            {/* App Store Item */}
            <div className={styles.badgeItem}>
              <span className={styles.badgeLabel}>CONSÍGUELO EN EL</span>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.badgeLink}
                aria-label="Consígalo en App Store"
              >
                <Image
                  src={getAssetPath("/icons/footer/appstore.png")}

                  alt="App Store"
                  width={160}
                  height={48}
                  className={styles.badgeImg}
                />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Hero Graphic & Phone Mockup */}
        <motion.div
          className={styles.graphicColumn}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {/* Background Mascot Illustration */}
          <div className={styles.mascotBg}>
            <MascotIllustration variant="hero" />
          </div>

          {/* Foreground 3D Smartphone */}
          <div className={styles.mockupWrapper}>
            <PhoneMockup />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
