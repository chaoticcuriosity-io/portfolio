import Link from "next/link";
import { PROFILE, MISSION } from "../_data/site";

export const metadata = {
  title: "About — Don Balanzat",
  description: "Physicist turned engineer turned enabler. Mission, background, and how to reach me.",
};

export default function About() {
  return (
    <main>
      <section className="dhero">
        <div className="wrap">
          <Link className="backlink" href="/">← Home</Link>
          <div className="kicker">About</div>
          <h1 className="serif">About</h1>
          <p className="tagline">Physicist turned engineer turned enabler.</p>
        </div>
      </section>

      <div className="wrap" style={{ padding: "40px 0 20px" }}>
        <div className="about-grid">
          <div>
            <p>
              I&apos;ve spent a decade making hard technology usable — in classrooms, on factory floors, and
              across a 12,000-person aerospace company. I lead <strong>AI enablement at Zillow</strong>, and I
              run <strong>Chaotic Curiosity</strong>, a studio building XR, AI, and robotics for museums,
              universities, startups, and research labs.
            </p>
            <p>
              Before Zillow I was XR/AI Engineering Lead at <strong>Blue Origin</strong>, where I built
              emerging-tech capability from zero across every vehicle program and worked inside ITAR /
              export-controlled environments — the regulated-data side of responsible AI. I started as a
              physicist, spent six years running university physics labs, and I&apos;ve never stopped teaching.
            </p>
            <p>
              Today I&apos;m happiest when I&apos;m shipping: agents and internal tools, ML pipelines, immersive
              systems, and humanoid robots that learn to move. I&apos;m a <strong>2× Blue Origin Liftoff Award</strong>
              winner and a <strong>Space for Humanity</strong> citizen-astronaut finalist.
            </p>

            <h4 style={{ fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--faint)", margin: "26px 0 12px" }}>What I stand for</h4>
            {MISSION.map((m) => (
              <p key={m} className="serif" style={{ fontSize: 20, color: "var(--text)", marginBottom: 10 }}>
                <span style={{ color: "var(--amber)", marginRight: 10 }}>✦</span>{m}
              </p>
            ))}

            <h4 style={{ fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--faint)", margin: "26px 0 12px" }}>Education</h4>
            <p>M.S., Human Factors — Embry-Riddle Aeronautical University, 2025</p>
            <p>M.S., Geological Sciences (XR for STEM visualization) — Arizona State University, 2022</p>
            <p>B.S., Physics — Rutgers University, 2016</p>
          </div>

          <aside className="about-side">
            <img src={PROFILE.heroImage} alt="Don Balanzat" />
            <h4>Now</h4>
            <ul>
              <li><span>▹</span> AI Enablement Lead, Zillow</li>
              <li><span>▹</span> Founder, Chaotic Curiosity</li>
              <li><span>▹</span> Lead tech, Unitree H2 humanoid (ASU)</li>
              <li><span>▹</span> Building PhLEx, an AI-native physics lab</li>
            </ul>
            <h4 style={{ marginTop: 18 }}>Connect</h4>
            <ul>
              <li><span>▹</span> <a href={PROFILE.linkedin} target="_blank" rel="noopener">LinkedIn</a></li>
              <li><span>▹</span> <a href={PROFILE.github} target="_blank" rel="noopener">GitHub</a></li>
              <li><span>▹</span> <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a></li>
              <li><span>▹</span> <a href={PROFILE.resume} target="_blank" rel="noopener">Résumé (PDF)</a></li>
            </ul>
          </aside>
        </div>
      </div>
    </main>
  );
}
