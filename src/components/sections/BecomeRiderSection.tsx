"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import { Button } from "../ui/Button";
import { PhoneMockup } from "../graphics/PhoneMockup";
import { RiderModal } from "../ui/RiderModal";
import { getAssetPath } from "@/utils/basePath";
import styles from "./BecomeRiderSection.module.css";

export const BecomeRiderSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section id="riders-cta" className={styles.section}>
        {/* Full-width purple gradient background strip */}
        <div className={styles.purpleBg}>
          <div className={`container ${styles.grid}`}>
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
                RIDER <span className={styles.titleAccent}>VIXY</span>
              </h2>
              <p className={styles.description}>
                Gana dinero haciendo lo que te gusta. Únete a nuestra comunidad de riders y lleva tu ingreso al siguiente nivel.
              </p>
              <Button
                variant="outline"
                size="lg"
                icon={<User size={20} />}
                onClick={() => setIsModalOpen(true)}
                id="become-rider-btn"
              >
                Quiero ser Rider
              </Button>
            </motion.div>

            {/* Middle Column - Real Rider Photo (Mototaxi) */}
            <motion.div
              className={styles.middleCol}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className={styles.riderPhotoWrapper}>
                <Image
                  src={getAssetPath("/icons/footer/vixymototaxi.png")}
                  alt="Rider Vixy"
                  width={420}
                  height={560}
                  className={styles.riderPhoto}
                  style={{ objectFit: "contain", objectPosition: "bottom center" }}
                />
              </div>
            </motion.div>

            {/* Right Column - Phone Mockup instead of text box */}
            <motion.div
              className={styles.rightCol}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className={styles.phoneWrapper}>
                <PhoneMockup />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modal de confirmación de rider */}
      <RiderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
