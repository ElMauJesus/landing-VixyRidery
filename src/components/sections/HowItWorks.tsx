"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Bike, HardHat, CheckCircle2, ArrowRight } from "lucide-react";
import { PROCESS_STEPS } from "@/data/landingData";
import styles from "./HowItWorks.module.css";

const stepIconMap: Record<string, React.ReactNode> = {
  MapPin: <MapPin size={28} color="#5E17EB" />,
  Bike: <Bike size={28} color="#5E17EB" />,
  HardHat: <HardHat size={28} color="#5E17EB" />,
  CheckCircle2: <CheckCircle2 size={28} color="#5E17EB" />,
};

export const HowItWorks: React.FC = () => {
  return (
    <section id="pasajeros" className={styles.section}>
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            VIAJA CON <span className="text-gradient">VIXY</span>
          </h2>
          <p className={styles.subtitle}>Pide tu viaje en segundos</p>
        </div>

        {/* Steps Grid */}
        <div className={styles.stepsContainer}>
          {PROCESS_STEPS.map((step, idx) => (
            <React.Fragment key={step.stepNumber}>
              <motion.div
                className={styles.stepCard}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
              >
                {/* Step Badge Number */}
                <div className={styles.stepBadge}>{step.stepNumber}</div>

                {/* Step Icon Container */}
                <div className={styles.iconCircle}>
                  {stepIconMap[step.iconName] || <MapPin size={28} color="#5E17EB" />}
                </div>

                {/* Content */}
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.description}</p>
              </motion.div>

              {/* Connecting Arrow for Desktop */}
              {idx < PROCESS_STEPS.length - 1 && (
                <div className={styles.arrowConnector}>
                  <span className={styles.dottedLine} />
                  <ArrowRight size={18} color="#9D4EDD" className={styles.arrowIcon} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
