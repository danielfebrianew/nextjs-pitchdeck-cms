"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { navLinks } from "./constants";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [overInk, setOverInk] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const probeY = y + 96;
      const activeSection = Array.from(document.querySelectorAll("section")).find((section) => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + y;
        const sectionBottom = rect.bottom + y;

        return sectionTop <= probeY && sectionBottom > probeY;
      });

      setScrolled(y > 20);
      setOverInk(activeSection?.getAttribute("data-bg") === "ink");
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const navStyle: React.CSSProperties = overInk
    ? {
        background: scrolled
          ? "linear-gradient(180deg, rgba(13,3,6,0.92) 0%, rgba(26,5,8,0.85) 100%)"
          : "linear-gradient(180deg, rgba(13,3,6,0.55) 0%, rgba(26,5,8,0.15) 100%)",
        backdropFilter: scrolled ? "blur(14px) saturate(140%)" : "blur(6px)",
        WebkitBackdropFilter: scrolled
          ? "blur(14px) saturate(140%)"
          : "blur(6px)",
        borderBottom: scrolled
          ? "1px solid rgba(201,169,97,0.18)"
          : "1px solid transparent",
        color: "#f0e6d2",
      }
    : {
        background: "rgba(248,244,236,0.94)",
        backdropFilter: "blur(14px) saturate(140%)",
        WebkitBackdropFilter: "blur(14px) saturate(140%)",
        borderBottom: "1px solid rgba(122,28,28,0.15)",
        color: "var(--color-ink)",
      };

  return (
    <nav
      className="nav nav--always-visible"
      style={{
        opacity: 1,
        pointerEvents: "auto",
        transition:
          "background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease",
        ...navStyle,
      }}
    >
      <a
        href="#hero"
        className="nav-logo"
        style={{ color: "inherit" }}
      >
        <Image
          src="/kudamas-logo.png"
          alt="Kudamas logo"
          width={28}
          height={28}
          className="nav-logo-img"
          style={{ objectFit: "contain" }}
        />
        Daniel{" "}
        <span
          style={{
            color: overInk ? "#c9a961" : "var(--color-muted)",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "0.75em",
          }}
        >
          &amp;
        </span>{" "}
        Kudamas
      </a>

      <ul className="nav-links">
        {navLinks.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              style={{
                color: overInk
                  ? "rgba(240,230,210,0.65)"
                  : "var(--color-muted)",
              }}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <a
        href="#penutup"
        className="nav-cta"
        style={
          overInk
            ? { borderColor: "#c9a961", color: "#c9a961" }
            : {}
        }
      >
        Hubungi Daniel <span style={{ marginLeft: 4 }}>↗</span>
      </a>
    </nav>
  );
}
