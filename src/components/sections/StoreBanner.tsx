"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { getAssetPath } from "@/utils/basePath";
import styles from "./StoreBanner.module.css";

export const StoreBanner: React.FC = () => {
  return (
    <section id="tienda" className={styles.section}>
      <div className={`container ${styles.sectionContainer}`}>
        <motion.div
          className={styles.bannerWrapper}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <a href="#tienda" className={styles.bannerLink} aria-label="Tienda Oficial Vixy Rider">
            <Image
              src={getAssetPath("/icons/footer/vixybanner1.png")}

              alt="Tienda Oficial Vixy Rider"
              width={1400}
              height={500}
              quality={100}
              priority
              className={styles.bannerImg}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 95vw, 1200px"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

