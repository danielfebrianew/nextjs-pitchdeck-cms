import { painItems, TOTAL_SECTIONS } from "./constants";
import { Reveal } from "./reveal";
import { SectionMeta } from "./section-meta";

export function PainPoints() {
  return (
    <section
      id="masalah"
      className="section"
      style={{
        background: "#f8f4ec",
        backgroundImage: `
          radial-gradient(ellipse 600px 400px at 8% 12%, rgba(122,28,28,0.04) 0%, transparent 60%),
          radial-gradient(ellipse 500px 400px at 92% 88%, rgba(122,28,28,0.05) 0%, transparent 60%)
        `,
        position: "relative",
      }}
    >
      <SectionMeta index={2} total={TOTAL_SECTIONS} label="The Problem" />

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background:
            "linear-gradient(90deg, transparent, rgba(122,28,28,0.25), transparent)",
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.4fr",
          gap: 96,
          alignItems: "center",
          maxWidth: "var(--maxw)",
          margin: "0 auto",
        }}
      >
        {/* LEFT — title block */}
        <Reveal>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10.5,
                letterSpacing: "0.22em",
                fontWeight: 600,
                color: "#7a1c1c",
                marginBottom: 20,
                textTransform: "uppercase",
              }}
            >
              Masalah
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.4rem, 4.6vw, 3.8rem)",
                lineHeight: 1.0,
                color: "#1a0f0a",
                fontWeight: 900,
                letterSpacing: "0.01em",
                textTransform: "uppercase",
                margin: "0 0 24px",
              }}
            >
              Brand Premium,
              <br />
              <em
                style={{
                  color: "#7a1c1c",
                  fontStyle: "italic",
                  fontWeight: 700,
                  textTransform: "none",
                  fontSize: "0.9em",
                }}
              >
                Website-nya
              </em>{" "}
              Belum.
            </h2>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 14,
                marginBottom: 24,
                color: "#7a1c1c",
              }}
            >
              <span
                style={{
                  width: 48,
                  height: 1,
                  background: "currentColor",
                  opacity: 0.4,
                  display: "block",
                }}
              />
              <span style={{ fontSize: 10, letterSpacing: "0.3em" }}>···</span>
              <span
                style={{
                  width: 48,
                  height: 1,
                  background: "currentColor",
                  opacity: 0.4,
                  display: "block",
                }}
              />
            </div>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                color: "#6e6a5e",
                lineHeight: 1.7,
                maxWidth: 360,
                margin: "0 auto",
              }}
            >
              Empat friction utama yang dialami brand wine premium di Indonesia
              ketika konten website mereka dikelola tim eksternal.
            </p>
          </div>
        </Reveal>

        {/* RIGHT — 2×2 grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            background: "var(--color-paper)",
            border: "1px solid rgba(122,28,28,0.18)",
          }}
        >
          {painItems.map((item, i) => (
            <Reveal key={item.number} delay={i * 100}>
              <div
                className={[
                  "pain-card-wine",
                  i % 2 === 0 ? "pain-card-wine--border-r" : "",
                  i < 2 ? "pain-card-wine--border-b" : "",
                ].join(" ")}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10.5,
                    letterSpacing: "0.28em",
                    color: "rgba(122,28,28,0.55)",
                    fontWeight: 600,
                    marginBottom: 6,
                    textTransform: "uppercase",
                  }}
                >
                  {item.number}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 18,
                    letterSpacing: "0.02em",
                    color: "#1a0f0a",
                    fontWeight: 900,
                    marginBottom: 14,
                    textTransform: "uppercase",
                    lineHeight: 1.1,
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    color: "#6e6a5e",
                    lineHeight: 1.65,
                    maxWidth: 240,
                    margin: "0 auto",
                  }}
                >
                  {item.desc}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 1,
          background:
            "linear-gradient(90deg, transparent, rgba(122,28,28,0.25), transparent)",
        }}
      />
    </section>
  );
}
