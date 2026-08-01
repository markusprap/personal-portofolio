"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

const BG_VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4";

type Ripple = { x: number; y: number; size: number; active: boolean };

export default function IntroPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ripple, setRipple] = useState<Ripple | null>(null);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  function handleEnter(e: React.MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const maxDist = Math.sqrt(
      Math.max(cx, window.innerWidth - cx) ** 2 +
        Math.max(cy, window.innerHeight - cy) ** 2
    );
    setRipple({ x: cx, y: cy, size: maxDist * 2, active: false });
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setRipple((r) => (r ? { ...r, active: true } : r));
      });
    });
    setTimeout(() => router.push("/portfolio"), 720);
  }

  return (
    <div className={styles.intro}>
      <video
        ref={videoRef}
        className={styles.bgVideo}
        autoPlay
        muted
        loop
        playsInline
        src={BG_VIDEO_URL}
      />
      <div className={styles.overlay} />

      <div className={styles.topbar}>
        <div className={styles.topbarLogo}>&lt;markusprap /&gt;</div>
        <div className={styles.topbarRight}>
          <a href="#services">Services</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          Available for new projects
        </div>
        <h1 className={styles.introTitle}>
          Markus Prap
          <br />
          <em>Kurniawan</em>
        </h1>
        <p className={styles.introSub}>
          Full-Stack Developer based in Jombang, East Java. Crafting clean,
          purposeful software that turns complex ideas into seamless digital
          experiences.
        </p>
        <div className={styles.divider} />
        <div className={styles.bottomRow}>
          <button className={styles.enterBtn} onClick={handleEnter}>
            View Portfolio
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="#0a0a0a"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <span className={styles.scrollHint}>Full-Stack · AI · UI/UX</span>
        </div>
      </div>

      {ripple && (
        <div
          className={`${styles.ripple} ${ripple.active ? styles.rippleActive : ""}`}
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            marginLeft: -ripple.size / 2,
            marginTop: -ripple.size / 2,
          }}
        />
      )}
    </div>
  );
}
