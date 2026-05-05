"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { navLinks } from "./constants";

export function Navbar() {
  const [onHero, setOnHero] = useState(true);
  useEffect(() => {
    const el = document.querySelector("#hero");
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setOnHero(entry.isIntersecting),
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <nav className={`nav${onHero ? "" : " nav--light"}`}>
        <a href="#hero" className="nav-logo">
          <Image
            src="/kudamas-logo.png"
            alt="Kudamas logo"
            width={28}
            height={28}
            className="nav-logo-img"
            style={{ objectFit: "contain" }}
          />
          Daniel{" "}
          <span style={{ fontStyle: "italic", fontWeight: 400, fontSize: "0.75em" }}>
            &amp;
          </span>{" "}
          Kudamas
        </a>
        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
        <a href="#penutup" className="nav-cta">
          Hubungi Daniel <span style={{ marginLeft: 4 }}>↗</span>
        </a>
      </nav>
    </>
  );
}
