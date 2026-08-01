"use client";

import { useEffect, useState } from "react";
import styles from "./portfolio.module.css";
import Reveal from "@/components/portfolio/Reveal";
import TechMarquee from "@/components/portfolio/TechMarquee";
import WelcomeOverlay from "@/components/portfolio/WelcomeOverlay";

const EXPERIENCE = [
  {
    logo: "/images/codingcamp-logo.jpeg",
    alt: "Coding Camp",
    subtitle: "Learning Facilitator, SMK Cohort",
    title: "Coding Camp by DBS Foundation",
    meta: "2026 · Part-time",
  },
  {
    logo: "/images/indomaret-logo.jpeg",
    alt: "Indomaret",
    subtitle: "AR Finance Administration",
    title: "Indomaret Group",
    meta: "2022 – Present",
  },
  {
    logo: "/images/indomaret-logo.jpeg",
    alt: "Indomaret",
    subtitle: "Cash In Collection, Finance Administration",
    title: "Indomaret Group",
    meta: "2018 – 2022",
  },
];

const SERVICES = [
  {
    title: "Web Development",
    desc: "Building scalable full-stack web applications — from REST APIs and databases to responsive, performant frontends.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="1.5" y="3" width="15" height="12" rx="2" stroke="#1a1a1a" strokeWidth="1.5" />
        <path d="M6 9L3.5 10L6 11M12 9l2.5 1L12 11M8.5 12l1-6" stroke="#1a1a1a" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Mobile Development",
    desc: "Crafting native and cross-platform mobile experiences that feel natural on any device and operating system.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="5" y="1.5" width="8" height="15" rx="2" stroke="#1a1a1a" strokeWidth="1.5" />
        <circle cx="9" cy="13.5" r="0.9" fill="#1a1a1a" />
      </svg>
    ),
  },
  {
    title: "UI/UX Design",
    desc: "Designing intuitive interfaces grounded in usability. Clean, functional, and delightful to interact with.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="7" stroke="#1a1a1a" strokeWidth="1.5" />
        <circle cx="9" cy="9" r="3.5" stroke="#1a1a1a" strokeWidth="1.3" />
        <circle cx="9" cy="9" r="1.2" fill="#1a1a1a" />
      </svg>
    ),
  },
  {
    title: "AI Integration",
    desc: "Embedding AI capabilities into real-world applications — from intelligent features and LLM-powered workflows to data-driven insights.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 2v2M9 14v2M2 9h2M14 9h2M4.22 4.22l1.42 1.42M12.36 12.36l1.42 1.42M4.22 13.78l1.42-1.42M12.36 5.64l1.42-1.42" stroke="#1a1a1a" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="9" cy="9" r="3" stroke="#1a1a1a" strokeWidth="1.5" />
        <circle cx="9" cy="9" r="1" fill="#1a1a1a" />
      </svg>
    ),
  },
];

const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#projects", label: "🔥 Labs" },
  { href: "#about", label: "About me" },
  { href: "#contact", label: "Contact" },
];

export default function PortfolioPage() {
  const [navVisible, setNavVisible] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setNavVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className={styles.root}>
      <WelcomeOverlay />

      <nav className={`${styles.nav} ${navVisible ? styles.navVisible : ""}`}>
        <div className={styles.navInner}>
          <span className={styles.navLogo}>&lt;markusprap /&gt;</span>
          <div className={styles.navLinks}>
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <div className={styles.page}>
        <div id="about" className={styles.sidebar}>
          <div className={styles.avatar}>
            <img src="/images/profile.jpeg" alt="Markus Prap Kurniawan" />
          </div>
          <h1 className={styles.name}>Markus Prap Kurniawan</h1>
          <p className={styles.tagline}>Full-Stack Developer based in Jombang, East Java.</p>
          <div className={styles.socialRow}>
            <a className={styles.socialLink} href="https://linkedin.com/in/markusprap" target="_blank" title="LinkedIn" rel="noreferrer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="2" y="9" width="4" height="12" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="4" cy="4" r="2" stroke="#1a1a1a" strokeWidth="1.8" />
              </svg>
            </a>
            <a className={styles.socialLink} href="https://github.com/markusprap" target="_blank" title="GitHub" rel="noreferrer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a className={styles.socialLink} href="https://instagram.com/markusprap" target="_blank" title="Instagram" rel="noreferrer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="2" width="20" height="20" rx="5" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="#1a1a1a" strokeWidth="1.8" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </a>
            <a className={styles.socialLink} href="mailto:prapkurniawanmarkus@gmail.com" title="Email">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points="22,6 12,13 2,6" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>

        <div className={styles.main}>
          <Reveal>
            <h2 className={styles.heroTitle}>
              Crafting clean, purposeful software — turning complex ideas into seamless digital experiences
            </h2>
            <div className={styles.ctaRow}>
              <a className={styles.ctaPrimary} href="mailto:prapkurniawanmarkus@gmail.com">
                Talk with me
              </a>
              <a className={styles.ctaSecondary} href="#projects">
                See my work
              </a>
            </div>
          </Reveal>

          <TechMarquee />

          <Reveal as="section">
            <p className={styles.sectionLabel}>Working experience</p>
            <div className={styles.cardList}>
              {EXPERIENCE.map((job) => (
                <div className={styles.card} key={job.title + job.subtitle}>
                  <div className={styles.cardLogo}>
                    <img src={job.logo} alt={job.alt} />
                  </div>
                  <div className={styles.cardBody}>
                    <p className={styles.cardSubtitle}>{job.subtitle}</p>
                    <p className={styles.cardTitle}>{job.title}</p>
                  </div>
                  <span className={styles.cardMeta}>{job.meta}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal as="section">
            <p className={styles.sectionLabel}>Awards &amp; Recognition</p>
            <div className={styles.card}>
              <div className={styles.cardLogo}>
                <img src="/images/asah-logo.jpeg" alt="Asah" />
              </div>
              <div className={styles.cardBody}>
                <p className={styles.cardSubtitle}>Distinction Graduate</p>
                <p className={styles.cardTitle}>React &amp; Backend with AI — Dicoding × Accenture</p>
              </div>
              <div className={styles.cardMetaGroup} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span className={styles.cardMeta}>2025</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 12L12 4M12 4H6M12 4v6" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </Reveal>

          <Reveal as="section">
            <p className={styles.sectionLabel}>Education</p>
            <div className={styles.card}>
              <div className={styles.cardLogo}>
                <img src="/images/education-logo.png" alt="Universitas Terbuka" style={{ objectFit: "contain", padding: 3 }} />
              </div>
              <div className={styles.cardBody}>
                <p className={styles.cardSubtitle}>Sistem Informasi · GPA 3.80</p>
                <p className={styles.cardTitle}>Universitas Terbuka</p>
              </div>
              <span className={styles.cardMeta}>Aktif</span>
            </div>
          </Reveal>

          <Reveal as="section" id="services">
            <p className={styles.sectionLabel}>What I do</p>
            <div className={styles.cardList}>
              {SERVICES.map((service) => (
                <div className={styles.serviceCard} key={service.title}>
                  <div className={styles.serviceIcon}>{service.icon}</div>
                  <div>
                    <p className={styles.serviceTitle}>{service.title}</p>
                    <p className={styles.serviceDesc}>{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal as="section" id="projects">
            <p className={styles.sectionLabel}>Selected works</p>
            <a
              href="https://mkmusic-seven.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className={styles.projectCard}
            >
              <div style={{ background: "#0d0d0d", padding: "22px 22px 0", overflow: "hidden" }}>
                <div style={{ borderRadius: "10px 10px 0 0", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", borderBottom: "none" }}>
                  <div style={{ background: "#181818", padding: "10px 14px", display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ display: "flex", gap: 5 }}>
                      <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#ff5f57" }} />
                      <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#ffbd2e" }} />
                      <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#28c840" }} />
                    </div>
                    <div style={{ flex: 1, background: "#262626", borderRadius: 4, height: 20, display: "flex", alignItems: "center", padding: "0 10px", margin: "0 12px" }}>
                      <span style={{ fontFamily: "'Courier New', monospace", fontSize: 10, color: "#999" }}>mkmusic-seven.vercel.app</span>
                    </div>
                  </div>
                  <div className={styles.mockupGrid} style={{ display: "grid", background: "#121212" }}>
                    <div className={styles.mockupSidebar} style={{ borderRight: "1px solid rgba(255,255,255,0.06)", padding: "16px 14px" }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "#1db954", marginBottom: 16, letterSpacing: "0.06em" }}>MKMUSIC</div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                        <div style={{ background: "rgba(29,185,84,0.12)", borderRadius: 6, padding: "7px 10px", display: "flex", alignItems: "center", gap: 8 }}>
                          <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#1db954", flex: "none" }} />
                          <span style={{ fontSize: 11, color: "#1db954" }}>Home</span>
                        </div>
                        {["Search", "Library", "Playlists"].map((label) => (
                          <div key={label} style={{ borderRadius: 6, padding: "7px 10px", display: "flex", alignItems: "center", gap: 8 }}>
                            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#555", flex: "none" }} />
                            <span style={{ fontSize: 11, color: "#aaa" }}>{label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div style={{ padding: 16, overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ fontSize: 10, color: "#999", marginBottom: 3, letterSpacing: "0.04em" }}>NOW PLAYING</div>
                        <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.2 }}>Muter musik gaya kamu</div>
                        <div style={{ fontSize: 11, color: "#777", marginTop: 4 }}>Private YouTube music player · no ads</div>
                      </div>
                      <div>
                        <div style={{ height: 3, background: "#333", borderRadius: 2, marginBottom: 10, position: "relative" }}>
                          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "40%", background: "#1db954", borderRadius: 2 }} />
                        </div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="#aaa"><path d="M19 20L9 12l10-8v16zM7 4v16H5V4h2z" /></svg>
                          <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#1db954", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="#000"><path d="M8 5v14l11-7z" /></svg>
                          </div>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="#aaa"><path d="M5 4l10 8-10 8V4zM17 4v16h2V4h-2z" /></svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.projectBody}>
                <h3 className={styles.projectTitle}>mkmusic</h3>
                <p className={styles.projectDesc}>
                  A private, ad-free music player styled after Spotify and YouTube Music — stream YouTube audio with a
                  clean, distraction-free listening experience.
                </p>
              </div>
            </a>
          </Reveal>
        </div>
      </div>

      <div className={styles.footer}>
        <footer id="contact" className={styles.footerInner}>
          <div className={styles.footerIdentity}>
            <div className={styles.footerAvatar}>
              <img src="/images/profile.jpeg" alt="Markus" />
            </div>
            <div>
              <p className={styles.footerName}>I&apos;m Markus Prap Kurniawan</p>
              <p className={styles.footerTagline}>Full-Stack Developer based in Jombang, East Java.</p>
            </div>
          </div>
          <div className={styles.footerLinks}>
            <a href="#services">Services</a>
            <a href="#about">About me</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
          <a className={styles.footerCta} href="mailto:prapkurniawanmarkus@gmail.com">
            Talk with me
          </a>
        </footer>
      </div>
    </div>
  );
}
