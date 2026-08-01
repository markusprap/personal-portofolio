"use client";

import { useEffect, useRef, useState } from "react";
import styles from "@/app/portfolio/portfolio.module.css";

export default function Reveal({
  children,
  as = "div",
  id,
}: {
  children: React.ReactNode;
  as?: "div" | "section";
  id?: string;
}) {
  const ref = useRef<HTMLDivElement & HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const className = `${styles.reveal} ${visible ? styles.revealVisible : ""}`;

  if (as === "section") {
    return (
      <section id={id} ref={ref} className={className}>
        {children}
      </section>
    );
  }
  return (
    <div id={id} ref={ref} className={className}>
      {children}
    </div>
  );
}
