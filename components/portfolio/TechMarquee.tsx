"use client";

import Marquee from "react-fast-marquee";
import {
  SiReact,
  SiNodedotjs,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiPython,
  SiPostgresql,
  SiDocker,
  SiGit,
  SiLaravel,
} from "react-icons/si";
import styles from "@/app/portfolio/portfolio.module.css";

const TECH_STACK = [
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#339933" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "Next.js", Icon: SiNextdotjs, color: "#000000" },
  { name: "Tailwind", Icon: SiTailwindcss, color: "#38BDF8" },
  { name: "Python", Icon: SiPython, color: "#3776AB" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#336791" },
  { name: "Docker", Icon: SiDocker, color: "#2496ED" },
  { name: "Git", Icon: SiGit, color: "#F05033" },
  { name: "Laravel", Icon: SiLaravel, color: "#FF2D20" },
];

export default function TechMarquee() {
  return (
    <Marquee speed={40} gradient gradientColor="#f2f0eb" gradientWidth={60}>
      {TECH_STACK.map(({ name, Icon, color }) => (
        <div key={name} className={styles.techPill}>
          <Icon size={14} color={color} />
          <span>{name}</span>
        </div>
      ))}
    </Marquee>
  );
}
