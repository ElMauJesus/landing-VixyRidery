"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getAssetPath } from "@/utils/basePath";
import styles from "./Footer.module.css";

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerInner}`}>

        {/* Brand Logo — smaller version */}
        <Link href="#inicio" className={styles.logoWrap}>
          <Image
            src={getAssetPath("/icons/footer/vixylogo.png")}
            alt="Vixy Rider Logo"
            width={130}
            height={87}
            style={{ width: "130px", height: "auto", objectFit: "contain" }}
            priority
          />
        </Link>

        {/* Social Icons — High resolution SVG icons */}
        <div className={styles.socialRow}>
          {/* Instagram */}
          <a
            href="https://www.instagram.com/vixyridervzla"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialBtn}
            aria-label="Instagram"
          >
            <Image
              src={getAssetPath("/icons/footer/svgs/instagram.svg")}
              alt="Instagram"
              width={26}
              height={26}
            />
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/profile.php?id=61590775791299"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialBtn}
            aria-label="Facebook"
          >
            <Image
              src={getAssetPath("/icons/footer/svgs/facebook.svg")}
              alt="Facebook"
              width={26}
              height={26}
            />
          </a>

          {/* TikTok */}
          <a
            href="https://www.tiktok.com/@vixy.rider"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialBtn}
            aria-label="TikTok"
          >
            <Image
              src={getAssetPath("/icons/footer/svgs/tiktok.svg")}
              alt="TikTok"
              width={24}
              height={24}
            />
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/584242472477"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialBtn}
            aria-label="WhatsApp"
          >
            <Image
              src={getAssetPath("/icons/footer/svgs/whatsapp.svg")}
              alt="WhatsApp"
              width={26}
              height={26}
            />
          </a>
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Copyright */}
        <p className={styles.copyright}>
          © {new Date().getFullYear()} Vixy Rider. Todos los derechos reservados.
        </p>

      </div>
    </footer>
  );
};
