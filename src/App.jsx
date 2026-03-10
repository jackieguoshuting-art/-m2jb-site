import { useState, useEffect, useRef } from "react";

const NAV_ITEMS = ["Overview", "About", "Market", "Operations", "Programming", "Sustainability", "Contact"];

const STATS = [
  { value: "5,000", label: "Seats" },
  { value: "50+", label: "Events / Year" },
  { value: "Apr–Nov", label: "Season" },
  { value: "Cleveland", label: "Ohio" },
];

const LAYOUTS = [
  { name: "Concert", icon: "🎵", desc: "Full-stage front-facing setup for touring acts" },
  { name: "Sports", icon: "🏟️", desc: "Field configuration for competitive events" },
  { name: "360° Festival", icon: "🎪", desc: "Wraparound crowd experience for festivals" },
  { name: "Winter T-Stage", icon: "❄️", desc: "Off-season intimate stage design" },
];

const PARTNERS = ["AEG Presents", "Ticketmaster", "SeatGeek"];

const ARTISTS = [
  { name: "Twenty One Pilots", tag: "Music · Ohio Natives" },
  { name: "Kid Cudi", tag: "Music · Cleveland Legend" },
  { name: "The Black Keys", tag: "Music · Akron Icons" },
  { name: "Dave Chappelle", tag: "Comedy" },
  { name: "Matt Rife", tag: "Comedy" },
  { name: "Yoga on the Rocks", tag: "Specialty · Wellness" },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Section({ id, children, className = "" }) {
  const [ref, vis] = useInView();
  return (
    <section
      id={id}
      ref={ref}
      className={className}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(32px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      {children}
    </section>
  );
}

function Tag({ children }) {
  return (
    <span style={{
      display: "inline-block",
      background: "#f0f0f0",
      color: "#444",
      fontSize: "0.72rem",
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      padding: "3px 10px",
      borderRadius: "2px",
      fontFamily: "'DM Mono', monospace",
    }}>{children}</span>
  );
}

function SectionTitle({ eyebrow, title }) {
  return (
    <div style={{ marginBottom: "2.5rem" }}>
      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#999", marginBottom: "0.5rem" }}>{eyebrow}</p>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 700, color: "#111", lineHeight: 1.15 }}>{title}</h2>
    </div>
  );
}

export default function App() {
  const [activeNav, setActiveNav] = useState("Overview");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    setActiveNav(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { font-family: 'DM Sans', sans-serif; background: #fafafa; color: #111; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #f0f0f0; }
        ::-webkit-scrollbar-thumb { background: #bbb; }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid #eee" : "none",
        transition: "all 0.4s ease",
        padding: "0 clamp(1.5rem, 5vw, 4rem)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: "64px",
      }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700, letterSpacing: "0.02em", color: scrolled ? "#111" : "#fff" }}>
          M2JB <span style={{ fontWeight: 400 }}>Amphitheater</span>
        </div>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {NAV_ITEMS.map(n => (
            <button key={n} onClick={() => scrollTo(n)} style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "'DM Mono', monospace", fontSize: "0.7rem",
              letterSpacing: "0.1em", textTransform: "uppercase",
              color: activeNav === n ? (scrolled ? "#111" : "#fff") : (scrolled ? "#888" : "rgba(255,255,255,0.6)"),
              fontWeight: activeNav === n ? 500 : 400,
              transition: "color 0.2s",
              padding: "4px 0",
              borderBottom: activeNav === n ? `1px solid ${scrolled ? "#111" : "#fff"}` : "1px solid transparent",
            }}>{n}</button>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <div style={{
        height: "100vh", minHeight: "600px",
        background: "linear-gradient(160deg, #0a0a0a 0%, #1c1c1c 50%, #2a2a2a 100%)",
        display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "0 clamp(1.5rem, 8vw, 8rem)",
        position: "relative", overflow: "hidden",
      }}>
        {/* decorative arcs */}
        <div style={{ position: "absolute", right: "-10%", top: "10%", width: "600px", height: "600px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.04)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: "-5%", top: "20%", width: "400px", height: "400px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.07)", pointerEvents: "none" }} />

        <div style={{ maxWidth: "760px" }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "1.2rem" }}>
            The Sky & Water Resort · Cleveland, Ohio
          </p>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(3rem, 7vw, 5.5rem)",
            fontWeight: 900, lineHeight: 1.05, color: "#fff",
            marginBottom: "1.5rem",
          }}>
            M2JB<br />Amphitheater
          </h1>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1rem, 2vw, 1.3rem)", fontStyle: "italic", color: "rgba(255,255,255,0.7)", marginBottom: "1.2rem" }}>
            Where the Lake Meets the Beat.
          </p>
          <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.45)", maxWidth: "480px", lineHeight: 1.7, marginBottom: "2.5rem" }}>
            A 5,000-seat mid-size outdoor venue redefining live entertainment in Cleveland — where music, hospitality, and culture converge.
          </p>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button onClick={() => scrollTo("Programming")} style={{
              background: "#fff", color: "#111",
              border: "none", cursor: "pointer",
              padding: "12px 28px", fontFamily: "'DM Mono', monospace",
              fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase",
              fontWeight: 500,
            }}>See What's On</button>
            <button onClick={() => scrollTo("Contact")} style={{
              background: "transparent", color: "rgba(255,255,255,0.6)",
              border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer",
              padding: "12px 28px", fontFamily: "'DM Mono', monospace",
              fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase",
            }}>Plan Your Visit</button>
          </div>
        </div>

        {/* stat bar */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          borderTop: "1px solid rgba(255,255,255,0.07)",
          display: "flex",
        }}>
          {STATS.map((s, i) => (
            <div key={i} style={{
              flex: 1, padding: "1.5rem clamp(1rem, 3vw, 2.5rem)",
              borderRight: i < STATS.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
            }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", fontWeight: 700, color: "#fff" }}>{s.value}</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginTop: "2px" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 clamp(1.5rem, 5vw, 4rem)" }}>

        {/* OVERVIEW */}
        <Section id="Overview" style={{}}>
          <div style={{ padding: "6rem 0 4rem" }}>
            <SectionTitle eyebrow="01 — Overview" title="Venue at a Glance" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
              {[
                { label: "Name", value: "M2JB Amphitheater" },
                { label: "Part of", value: "The Sky & Water Resort" },
                { label: "Location", value: "Cleveland, Ohio" },
                { label: "Capacity", value: "5,000 Seats" },
                { label: "Season", value: "April – November" },
                { label: "Peak Season", value: "June – August" },
              ].map((item, i) => (
                <div key={i} style={{ borderTop: "1px solid #e8e8e8", paddingTop: "1.2rem" }}>
                  <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#999", marginBottom: "0.4rem" }}>{item.label}</p>
                  <p style={{ fontSize: "1rem", color: "#111", fontWeight: 500 }}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <div style={{ height: "1px", background: "#ececec" }} />

        <div style={{ height: "1px", background: "#ececec" }} />

        {/* ABOUT */}
        <Section id="About">
          <div style={{ padding: "5rem 0 4rem" }}>
            <SectionTitle eyebrow="Who We Are" title="Where the Lake Meets the Beat." />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start", marginBottom: "3.5rem" }}>
              <div>
                <p style={{ fontSize: "1rem", lineHeight: 1.85, color: "#444", marginBottom: "1.5rem" }}>
                  M2JB Amphitheater is the premier lakeside entertainment destination within The Sky & Water Resort. We are a specialized team of hospitality and event management professionals dedicated to redefining the live music experience in Cleveland.
                </p>
              </div>
              <div style={{ background: "#f7f7f7", padding: "2rem", borderLeft: "3px solid #111" }}>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#999", marginBottom: "0.8rem" }}>Our Mission</p>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "#333" }}>
                  To bridge the gap between intimate clubs and massive stadiums by providing a world-class, 5,000-seat boutique venue. By integrating high-end resort amenities with professional tour-grade production, we create seamless, unforgettable <strong>"Stay & Play"</strong> experiences for fans and artists alike.
                </p>
              </div>
            </div>

          </div>
        </Section>


        {/* MARKET */}
        <Section id="Market">
          <div style={{ padding: "5rem 0 4rem" }}>
            <SectionTitle eyebrow="03 — Cleveland's Venue" title="Built for This City" />
            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "4rem", alignItems: "start" }}>
              <div>
                <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "#444", marginBottom: "2rem" }}>
                  Cleveland has a thriving live entertainment scene — and M2JB Amphitheater is the outdoor home it's been missing. A modern lakeside venue where artists want to perform and fans feel every moment.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {[
                    { icon: "🏨", title: "Stay & Play", desc: "Hotel, casino, and live events — all in one resort. Book a room and make a night of it." },
                    { icon: "☀️", title: "Summer is the Season", desc: "Peak programming June – August, with concerts and events running April through November." },
                    { icon: "📍", title: "Lakeside, Only Here", desc: "An outdoor amphitheater on the water — no other venue in Cleveland offers this setting." },
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", padding: "1.2rem", background: "#f7f7f7" }}>
                      <span style={{ fontSize: "1.3rem" }}>{item.icon}</span>
                      <div>
                        <p style={{ fontWeight: 600, fontSize: "0.9rem", marginBottom: "2px" }}>{item.title}</p>
                        <p style={{ fontSize: "0.85rem", color: "#666" }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background: "#111", padding: "2.5rem", color: "#fff" }}>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "1.5rem" }}>Competitive Landscape</p>
                {[
                  { size: "< 2,000", label: "Small clubs & theaters", fill: 0.25 },
                  { size: "2,000–5,000", label: "M2JB fills this gap ✦", fill: 1, highlight: true },
                  { size: "10,000+", label: "Large arenas & stadiums", fill: 0.4 },
                ].map((row, i) => (
                  <div key={i} style={{ marginBottom: "1.5rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", color: row.highlight ? "#fff" : "rgba(255,255,255,0.5)" }}>{row.size}</span>
                      <span style={{ fontSize: "0.75rem", color: row.highlight ? "#fff" : "rgba(255,255,255,0.4)" }}>{row.label}</span>
                    </div>
                    <div style={{ height: "3px", background: "rgba(255,255,255,0.1)", borderRadius: "2px" }}>
                      <div style={{ height: "100%", width: `${row.fill * 100}%`, background: row.highlight ? "#fff" : "rgba(255,255,255,0.3)", borderRadius: "2px", transition: "width 1s ease" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <div style={{ height: "1px", background: "#ececec" }} />

        {/* OPERATIONS */}
        <Section id="Operations">
          <div style={{ padding: "5rem 0 4rem" }}>
            <SectionTitle eyebrow="04 — Partners & Experience" title="World-Class Partners,\nSeamless Experience" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "3rem" }}>
              <div style={{ padding: "2rem", border: "1px solid #e0e0e0" }}>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#999", marginBottom: "0.8rem" }}>Venue Management</p>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", marginBottom: "0.8rem" }}>Fully Integrated</h3>
                <p style={{ fontSize: "0.9rem", color: "#555", lineHeight: 1.7 }}>
                  Every part of your experience — from pre-show dining at the resort to the show itself — is managed under one roof, so nothing falls through the cracks.
                </p>
              </div>
              <div style={{ padding: "2rem", background: "#111", color: "#fff" }}>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "0.8rem" }}>Booking Partner</p>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", marginBottom: "0.8rem" }}>AEG Presents</h3>
                <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
                  Global reach and direct access to A-list touring artists — bringing the best acts to Cleveland's newest stage.
                </p>
              </div>
            </div>
            <div>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#999", marginBottom: "1rem" }}>Ticketing Partners</p>
              <div style={{ display: "flex", gap: "1rem" }}>
                {PARTNERS.slice(1).map((p, i) => (
                  <div key={i} style={{ padding: "0.8rem 1.5rem", border: "1px solid #ddd", fontSize: "0.85rem", fontWeight: 500, color: "#333" }}>{p}</div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <div style={{ height: "1px", background: "#ececec" }} />

        {/* PROGRAMMING */}
        <Section id="Programming">
          <div style={{ padding: "5rem 0 4rem" }}>
            <SectionTitle eyebrow="05 — Programming & Layout" title="Four Configurations,\nEndless Possibilities" />

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1px", background: "#e0e0e0", marginBottom: "4rem" }}>
              {LAYOUTS.map((l, i) => (
                <div key={i} style={{ background: "#fff", padding: "1.8rem 1.5rem" }}>
                  <div style={{ fontSize: "1.8rem", marginBottom: "0.8rem" }}>{l.icon}</div>
                  <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 700, marginBottom: "0.5rem" }}>{l.name}</h4>
                  <p style={{ fontSize: "0.8rem", color: "#666", lineHeight: 1.6 }}>{l.desc}</p>
                </div>
              ))}
            </div>

            <SectionTitle eyebrow="Opening Lineup" title="Celebrating Ohio" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "#e0e0e0" }}>
              {ARTISTS.map((a, i) => (
                <div key={i} style={{ background: i % 2 === 0 ? "#fff" : "#fafafa", padding: "1.5rem" }}>
                  <p style={{ fontWeight: 600, fontSize: "0.95rem", marginBottom: "4px" }}>{a.name}</p>
                  <Tag>{a.tag}</Tag>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <div style={{ height: "1px", background: "#ececec" }} />

        {/* SUSTAINABILITY */}
        <Section id="Sustainability">
          <div style={{ padding: "5rem 0 6rem" }}>
            <SectionTitle eyebrow="06 — Guest Experience & Sustainability" title="Built for the Long Run" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.5rem" }}>
              {[
                { icon: "💡", title: "LED Lighting", desc: "Full venue conversion to energy-efficient LED systems" },
                { icon: "♻️", title: "Plastic-Free", desc: "Single-use plastic elimination across all F&B operations" },
                { icon: "📱", title: "Digital Tickets", desc: "Paperless entry for all events, reducing waste" },
                { icon: "🌧️", title: "Rain or Shine Policy", desc: "Cleveland-specific emergency protocols for storms and severe weather" },
                { icon: "♿", title: "ADA Compliance", desc: "Dedicated accessible seating and clear ingress/egress flow for all guests" },
                { icon: "🚗", title: "Traffic & Logistics", desc: "Annotated layouts with audience flow and parking guidance" },
              ].map((item, i) => (
                <div key={i} style={{ padding: "1.8rem", background: "#f7f7f7" }}>
                  <div style={{ fontSize: "1.5rem", marginBottom: "0.8rem" }}>{item.icon}</div>
                  <h4 style={{ fontWeight: 600, fontSize: "0.9rem", marginBottom: "0.5rem" }}>{item.title}</h4>
                  <p style={{ fontSize: "0.82rem", color: "#666", lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>
      </div>

      {/* CONTACT */}
      <div id="Contact" style={{
        background: "#111", color: "#fff",
        padding: "6rem clamp(1.5rem, 8vw, 8rem)",
        display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
        gap: "1.5rem",
      }}>
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
          Get In Touch
        </p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, maxWidth: "600px", lineHeight: 1.2 }}>
          Booking, Sponsorship & Private Events
        </h2>
        <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.5)", maxWidth: "460px", lineHeight: 1.7 }}>
          Interested in bringing your show to M2JB? Looking for sponsorship opportunities or planning a private event? We'd love to hear from you.
        </p>
        <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem", flexWrap: "wrap", justifyContent: "center" }}>
          <a href="mailto:info@m2jbamphitheater.com" style={{
            background: "#fff", color: "#111",
            padding: "12px 28px", fontFamily: "'DM Mono', monospace",
            fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase",
            fontWeight: 500, textDecoration: "none", display: "inline-block",
          }}>Contact Us</a>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{
            background: "transparent", color: "rgba(255,255,255,0.55)",
            border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer",
            padding: "12px 28px", fontFamily: "'DM Mono', monospace",
            fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase",
          }}>Back to Top ↑</button>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{
        background: "#0a0a0a", color: "rgba(255,255,255,0.3)",
        padding: "2rem clamp(1.5rem, 5vw, 4rem)",
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.8rem",
      }}>
        <div style={{ fontFamily: "'Playfair Display', serif", color: "rgba(255,255,255,0.7)", fontSize: "1rem" }}>M2JB Amphitheater</div>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          The Sky & Water Resort · Cleveland, Ohio
        </div>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          © 2025 M2JB Amphitheater
        </div>
      </footer>
    </>
  );
}
