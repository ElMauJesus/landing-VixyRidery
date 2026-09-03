"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { getAssetPath } from "@/utils/basePath";
import styles from "./HeroSection.module.css";

export const HeroSection: React.FC = () => {
  return (
    <section
      id="inicio"
      className={styles.heroSection}
      style={{ backgroundImage: `url('${getAssetPath("/icons/footer/vixyfondo.png")}')` }}
    >
      <div className={`container ${styles.heroContent}`}>
        {/* Headline & CTAs */}
        <motion.div
          className={styles.textContent}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
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

          {/* Action Buttons: Google Play & App Store */}
          <div className={styles.ctaGroup}>
            {/* Google Play Button */}
            <motion.a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.storeBtn}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              aria-label="Disponible en Google Play"
            >
              <div className={styles.storeIconWrap}>
                <Image
                  src={getAssetPath("/icons/footer/googleplay.svg")}
                  alt="Google Play"
                  width={26}
                  height={26}
                  className={styles.storeSvgIcon}
                />
              </div>
              <div className={styles.storeTextCol}>
                <span className={styles.storeSub}>DISPONIBLE EN</span>
                <span className={styles.storeTitle}>GOOGLE PLAY</span>
              </div>
            </motion.a>

            {/* App Store Button */}
            <motion.a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.storeBtn}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              aria-label="Consígalo en App Store"
            >
              <div className={styles.storeIconWrap}>
                <Image
                  src={getAssetPath("/icons/footer/apple.svg")}
                  alt="App Store"
                  width={26}
                  height={26}
                  className={styles.storeSvgIcon}
                />
              </div>
              <div className={styles.storeTextCol}>
                <span className={styles.storeSub}>CONSÍGUELO EN EL</span>
                <span className={styles.storeTitle}>APP STORE</span>
              </div>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
