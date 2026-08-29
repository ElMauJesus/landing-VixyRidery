"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Navigation, Home, Clock, Wallet, User, Bike } from "lucide-react";
import styles from "./PhoneMockup.module.css";

export const PhoneMockup: React.FC = () => {
  return (
    <div className={styles.phoneContainer}>
      {/* 3D Phone Shell */}
      <motion.div
        className={styles.phoneFrame}
        initial={{ y: 20, opacity: 0, rotateY: -10, rotateX: 5 }}
        animate={{ y: 0, opacity: 1, rotateY: 0, rotateX: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Dynamic Island / Notch */}
        <div className={styles.dynamicIsland}>
          <div className={styles.cameraLens} />
        </div>

        {/* Smartphone Display */}
        <div className={styles.phoneScreen}>
          {/* Status Bar */}
          <div className={styles.statusBar}>
            <span className={styles.statusTime}>15:07</span>
            <div className={styles.statusIcons}>
              <span className={styles.signalDots} />
              <span className={styles.batteryIcon} />
            </div>
          </div>

          {/* App Header & Greeting */}
          <div className={styles.appHeader}>
            <div className={styles.userGreeting}>
              <span className={styles.greetingSub}>Hola, Abel!</span>
              <h4 className={styles.greetingTitle}>¿a dónde vamos?</h4>
            </div>

            {/* Search Input Box */}
            <div className={styles.searchBox}>
              <Search className={styles.searchIcon} size={16} />
              <span className={styles.placeholderText}>Ingresa tu destino...</span>
            </div>
          </div>

          {/* Map Display View */}
          <div className={styles.mapArea}>
            {/* Grid Pattern overlay */}
            <div className={styles.mapGrid} />
            
            {/* Route Path SVG */}
            <svg className={styles.routeSvg} viewBox="0 0 300 180" fill="none">
              <path
                d="M 50 140 C 90 140, 100 80, 160 80 C 210 80, 220 30, 260 30"
                stroke="#5E17EB"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="6 6"
              />
              <path
                d="M 50 140 C 90 140, 100 80, 160 80 C 210 80, 220 30, 260 30"
                stroke="#9D4EDD"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* Origin Dot */}
              <circle cx="50" cy="140" r="7" fill="#5E17EB" />
              <circle cx="50" cy="140" r="14" fill="#5E17EB" opacity="0.3" className={styles.pulseDot} />

              {/* Waypoint Dot */}
              <circle cx="160" cy="80" r="5" fill="#C77DFF" />

              {/* Destination Dot */}
              <circle cx="260" cy="30" r="7" fill="#7B2CBF" />
              <circle cx="260" cy="30" r="14" fill="#7B2CBF" opacity="0.4" className={styles.pulseDot} />
            </svg>

            {/* Rider Location Pin on Map */}
            <div className={styles.riderPin}>
              <Bike size={14} color="#FFFFFF" />
            </div>
          </div>

          {/* Ride Options Card Overlay */}
          <div className={styles.rideCard}>
            <div className={styles.vehicleOption}>
              <div className={styles.vehicleIconBadge}>
                <Bike size={20} color="#FFFFFF" />
              </div>
              <div className={styles.vehicleDetails}>
                <span className={styles.vehicleTitle}>Moto</span>
                <span className={styles.vehicleSub}>20 min • 1.2km</span>
              </div>
              <span className={styles.vehiclePrice}>$2.00</span>
            </div>

            {/* Request Ride CTA */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              className={styles.requestBtn}
            >
              Solicitar Vixy
            </motion.button>
          </div>

          {/* Bottom App Navigation */}
          <div className={styles.bottomNav}>
            <div className={`${styles.navTab} ${styles.activeTab}`}>
              <Home size={18} />
              <span>Inicio</span>
            </div>
            <div className={styles.navTab}>
              <Clock size={18} />
              <span>Viajes</span>
            </div>
            <div className={styles.navTab}>
              <Wallet size={18} />
              <span>Billetera</span>
            </div>
            <div className={styles.navTab}>
              <User size={18} />
              <span>Perfil</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
