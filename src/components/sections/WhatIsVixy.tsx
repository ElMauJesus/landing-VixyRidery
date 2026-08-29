"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, DollarSign, ShieldCheck, Clock } from "lucide-react";
import { VIXY_FEATURES } from "@/data/landingData";
import styles from "./WhatIsVixy.module.css";

const iconMap: Record<string, React.ReactNode> = {
  Zap: <Zap size={22} color="#FFFFFF" />,
  DollarSign: <DollarSign size={22} color="#FFFFFF" />,
  ShieldCheck: <ShieldCheck size={22} color="#FFFFFF" />,
  Clock: <Clock size={22} color="#FFFFFF" />,
};

export const WhatIsVixy: React.FC = () => {
  return (
    <section id="nosotros" className={styles.section}>
      <div className="container">
        <motion.div
          className={styles.cardContainer}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className={styles.grid}>
            {/* Left Box - Text */}
            <div className={styles.leftCol}>
              <h2 className={styles.title}>
                ¿QUÉ ES <br />
                <span className="text-gradient">VIXY RIDER</span>?
              </h2>
              <p className={styles.text}>
                Somos una plataforma de movilidad en moto que te ofrece viajes rápidos, económicos y seguros. Conectamos personas con riders verificados para que te muevas por la ciudad de forma fácil y confiable.
              </p>
            </div>

            {/* Right Box - 2x2 Features Grid */}
            <div className={styles.featuresGrid}>
              {VIXY_FEATURES.map((feature, idx) => (
                <motion.div
                  key={feature.id}
                  className={styles.featureCard}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <div className={styles.iconCircle}>
                    {iconMap[feature.iconName] || <Zap size={22} color="#FFFFFF" />}
                  </div>
                  <div className={styles.featureContent}>
                    <h3 className={styles.featureTitle}>{feature.title}</h3>
                    <p className={styles.featureDesc}>{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
