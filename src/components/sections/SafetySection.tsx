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
          <Image
            src={getAssetPath("/icons/footer/vixybanner2.png")}

            alt="Tu Seguridad, Nuestra Prioridad - Vixy Rider"
            width={1400}
            height={500}
            quality={100}
            priority
            className={styles.bannerImg}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 95vw, 1200px"
          />
        </motion.div>
      </div>
    </section>
  );
};

