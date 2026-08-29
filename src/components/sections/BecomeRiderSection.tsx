"use client";

import React from "react";
import { motion } from "framer-motion";
import { User, TrendingUp, Wallet, ShieldCheck, Headphones, Siren } from "lucide-react";
import { Button } from "../ui/Button";
import styles from "./BecomeRiderSection.module.css";

const riderPerks = [
  {
    id: "r1",
    title: "90% de ganancia",
    desc: "Quédate con el 90% de cada viaje realizado.",
    icon: <TrendingUp size={18} color="#5E17EB" />,
  },
  {
    id: "r2",
    title: "Pago inmediato",
    desc: "Recibe tu dinero al instante después de cada viaje.",
    icon: <Wallet size={18} color="#5E17EB" />,
  },
  {
    id: "r3",
    title: "Póliza de seguros",
    desc: "Te protegemos a ti y a los pasajeros.",
    icon: <ShieldCheck size={18} color="#5E17EB" />,
  },
  {
    id: "r4",
    title: "Soporte 24/7",
    desc: "Asistencia para riders todos los días.",
    icon: <Headphones size={18} color="#5E17EB" />,
  },
  {
    id: "r5",
    title: "Botón de pánico",
    desc: "Tu seguridad es primero.",
    icon: <Siren size={18} color="#5E17EB" />,
  },
];

export const BecomeRiderSection: React.FC = () => {
  return (
    <section id="riders-cta" className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          {/* Left Column - Headline & CTA */}
          <motion.div
            className={styles.leftCol}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={styles.title}>
              SÉ UN <br />
              RIDER <span className="text-gradient">VIXY</span>
            </h2>
            <p className={styles.description}>
              Gana dinero haciendo lo que te gusta. Únete a nuestra comunidad de riders y lleva tu ingreso al siguiente nivel.
            </p>
            <Button variant="primary" size="lg" icon={<User size={20} />}>
              Quiero ser Rider
            </Button>
          </motion.div>

          {/* Middle Column - Rider & Motorcycle Graphic */}
          <motion.div
            className={styles.middleCol}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className={styles.riderFrame}>
              <svg viewBox="0 0 400 450" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.riderSvg}>
                <defs>
                  <linearGradient id="riderGradBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F4EFFD" />
                    <stop offset="100%" stopColor="#E5D9FA" />
                  </linearGradient>
                  <linearGradient id="suitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1E1938" />
                    <stop offset="100%" stopColor="#0B091B" />
                  </linearGradient>
                </defs>

                {/* Subtle Background Glow Circle */}
                <circle cx="200" cy="225" r="180" fill="url(#riderGradBg)" />

                {/* Motorcycle Silhouette */}
                <path d="M 80 340 L 150 280 L 250 280 L 320 340 Z" fill="#0D0B26" opacity="0.8" />
                <circle cx="90" cy="350" r="45" fill="#1A1736" stroke="#5E17EB" strokeWidth="6" />
                <circle cx="310" cy="350" r="45" fill="#1A1736" stroke="#5E17EB" strokeWidth="6" />

                {/* Rider Figure Standing */}
                {/* Legs */}
                <path d="M 175 250 L 165 370 M 225 250 L 235 370" stroke="#0D0B26" strokeWidth="24" strokeLinecap="round" />

                {/* Torso & Vixy Leather Jacket */}
                <path d="M 150 140 Q 200 120 250 140 L 240 260 L 160 260 Z" fill="url(#suitGrad)" />
                <rect x="185" y="160" width="30" height="12" rx="3" fill="#5E17EB" />
                <text x="189" y="169" fontSize="8" fill="#FFF" fontWeight="bold">VIXY</text>

                {/* Crossed Arms */}
                <path d="M 145 150 Q 200 190 255 150" stroke="#5E17EB" strokeWidth="20" strokeLinecap="round" />

                {/* Helmet */}
                <circle cx="200" cy="95" r="38" fill="#0B091B" stroke="#9D4EDD" strokeWidth="3" />
                <path d="M 175 90 C 185 75, 215 75, 225 90 C 215 102, 185 102, 175 90 Z" fill="#5E17EB" opacity="0.9" />
                <path d="M 180 88 Q 200 82 220 88" stroke="#FFFFFF" strokeWidth="2" opacity="0.6" />
              </svg>
            </div>
          </motion.div>

          {/* Right Column - Rider Benefits Perks Card */}
          <motion.div
            className={styles.rightCol}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.perksCard}>
              {riderPerks.map((perk) => (
                <div key={perk.id} className={styles.perkRow}>
                  <div className={styles.iconBox}>{perk.icon}</div>
                  <div className={styles.perkInfo}>
                    <h4 className={styles.perkTitle}>{perk.title}</h4>
                    <p className={styles.perkDesc}>{perk.desc}</p>
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
