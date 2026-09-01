"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X, ArrowRight } from "lucide-react";
import { getAssetPath } from "@/utils/basePath";
import styles from "./RiderModal.module.css";

interface RiderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RiderModal: React.FC<RiderModalProps> = ({ isOpen, onClose }) => {

  // Bloquear scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Cerrar con Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleRegister = () => {
    onClose();
    window.location.href = "/registro-rider";
  };

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="rider-modal-title"
    >
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón cerrar */}
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Cerrar"
          id="rider-modal-close"
        >
          <X size={18} />
        </button>

        {/* Logo */}
        <div className={styles.logoWrapper}>
          <Image
            src={getAssetPath("/icons/footer/vixylogo.png")}
            alt="Vixy Rider Logo"
            width={180}
            height={110}
            className={styles.logo}
            style={{ objectFit: "contain" }}
            priority
          />
        </div>

        {/* Texto */}
        <div className={styles.textBlock}>
          <h2 className={styles.title} id="rider-modal-title">
            Sé parte del
          </h2>
          <h2 className={styles.titleAccent}>lanzamiento</h2>
          <p className={styles.subtitle}>
            Regístrate ahora y sé uno de los primeros en conducir con{" "}
            <span className={styles.brandName}>Vixy Rider</span>.
          </p>
        </div>

        {/* Imagen mototaxi */}
        <div className={styles.imageWrapper}>
          <div className={styles.imageBubble} />
          <Image
            src={getAssetPath("/icons/footer/vixymototaxiPOPUP.png")}
            alt="Rider en mototaxi Vixy"
            width={320}
            height={280}
            className={styles.mototaxiImg}
            style={{ objectFit: "contain", objectPosition: "bottom center" }}
          />
        </div>

        {/* CTA Button */}
        <button
          className={styles.ctaBtn}
          onClick={handleRegister}
          id="rider-modal-register-btn"
        >
          Quiero registrarme
          <ArrowRight size={20} className={styles.ctaArrow} />
        </button>
      </div>
    </div>
  );
};
