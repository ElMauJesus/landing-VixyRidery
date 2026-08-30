"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { getAssetPath } from "@/utils/basePath";
import styles from "./SafetySection.module.css";

export const SafetySection: React.FC = () => {
  return (
    <section id="seguridad" className={styles.section}>
      <div className={`container ${styles.sectionContainer}`}>
        <motion.div
          className={styles.bannerWrapper}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Banner para mobile/tablet (< 1000px) */}
          <Image
            src={getAssetPath("/icons/footer/vixybanner2tlf2.png")}
            alt="Tu Seguridad, Nuestra Prioridad - Vixy Rider"
            width={1400}
            height={500}
            quality={100}
            priority
            className={`${styles.bannerImg} ${styles.bannerMobile}`}
            sizes="100vw"
          />
          {/* Banner para desktop (≥ 1000px) */}
          <Image
            src={getAssetPath("/icons/footer/vixybanner2.png")}
            alt="Tu Seguridad, Nuestra Prioridad - Vixy Rider"
            width={1400}
            height={500}
            quality={100}
            priority
            className={`${styles.bannerImg} ${styles.bannerDesktop}`}
            sizes="(max-width: 1200px) 95vw, 1200px"
          />
        </motion.div>
      </div>
    </section>
  );
};

