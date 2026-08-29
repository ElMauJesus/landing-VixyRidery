"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Banknote,
  ShieldCheck,
  Clock,
  Headphones,
  Siren,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { PASSENGER_BENEFITS, RIDER_BENEFITS } from "@/data/landingData";
import styles from "./BenefitsSection.module.css";

const benefitIconMap: Record<string, React.ReactNode> = {
  Banknote: <Banknote size={20} color="#5E17EB" />,
  ShieldCheck: <ShieldCheck size={20} color="#5E17EB" />,
  Clock: <Clock size={20} color="#5E17EB" />,
  Headphones: <Headphones size={20} color="#5E17EB" />,
  Siren: <Siren size={20} color="#5E17EB" />,
  TrendingUp: <TrendingUp size={20} color="#5E17EB" />,
  Wallet: <Wallet size={20} color="#5E17EB" />,
};

export const BenefitsSection: React.FC = () => {
  return (
    <section id="riders" className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          {/* Passenger Benefits Card */}
          <motion.div
            className={styles.benefitCard}
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className={styles.cardHeader}>
              BENEFICIOS PARA <span className={styles.purpleText}>PASAJEROS</span>
            </h3>

            <div className={styles.itemsList}>
              {PASSENGER_BENEFITS.map((item) => (
                <div key={item.id} className={styles.benefitItem}>
                  <div className={styles.iconCircle}>
                    {benefitIconMap[item.iconName] || <ShieldCheck size={20} color="#5E17EB" />}
                  </div>
                  <div className={styles.itemText}>
                    <h4 className={styles.itemTitle}>{item.title}</h4>
                    <p className={styles.itemDesc}>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Rider Benefits Card */}
          <motion.div
            className={styles.benefitCard}
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className={styles.cardHeader}>
              BENEFICIOS PARA <span className={styles.purpleText}>RIDERS</span>
            </h3>

            <div className={styles.itemsList}>
              {RIDER_BENEFITS.map((item) => (
                <div key={item.id} className={styles.benefitItem}>
                  <div className={styles.iconCircle}>
                    {benefitIconMap[item.iconName] || <ShieldCheck size={20} color="#5E17EB" />}
                  </div>
                  <div className={styles.itemText}>
                    <h4 className={styles.itemTitle}>{item.title}</h4>
                    <p className={styles.itemDesc}>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
