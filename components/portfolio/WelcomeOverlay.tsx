"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import styles from "@/app/portfolio/portfolio.module.css";

const LOTTIE_SRC = "https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js";
const LOTTIE_ANIMATION_URL = "https://lottie.host/a8b58d5e-017d-4de8-b269-28e2f4eedf0d/s32haolBvf.json";

declare global {
  interface Window {
    lottie?: {
      loadAnimation: (opts: {
        container: Element;
        renderer: string;
        loop: boolean;
        autoplay: boolean;
        path: string;
      }) => { addEventListener: (event: string, cb: () => void) => void; destroy: () => void };
    };
  }
}

export default function WelcomeOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<{ destroy: () => void } | null>(null);
  const [hiding, setHiding] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const hide = () => {
      setHiding(true);
      setTimeout(() => setHidden(true), 650);
    };
    const fallback = setTimeout(hide, 3500);
    return () => {
      clearTimeout(fallback);
      animRef.current?.destroy();
    };
  }, []);

  const handleScriptReady = () => {
    if (!window.lottie || !containerRef.current || animRef.current) return;
    const anim = window.lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop: false,
      autoplay: true,
      path: LOTTIE_ANIMATION_URL,
    });
    animRef.current = anim;
    anim.addEventListener("complete", () => {
      setHiding(true);
      setTimeout(() => setHidden(true), 650);
    });
  };

  if (hidden) return null;

  return (
    <>
      <Script src={LOTTIE_SRC} strategy="afterInteractive" onReady={handleScriptReady} />
      <div className={`${styles.welcomeOverlay} ${hiding ? styles.hiding : ""}`}>
        <div ref={containerRef} style={{ width: 220, height: 220 }} />
      </div>
    </>
  );
}
