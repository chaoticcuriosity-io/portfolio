import Link from "next/link";
import { DOMAIN_ORDER, DOMAINS, PROFILE } from "../_data/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <div className="brand"><span className="dot">D</span> Don Balanzat</div>
          <p className="footer-blurb">{PROFILE.tagline}. Building for the benefit of Earth and the
            diversity of its inhabitants.</p>
          <p className="footer-studio">
            Studio: <a href={PROFILE.studio.url} target="_blank" rel="noopener">{PROFILE.studio.name} ↗</a>
          </p>
        </div>
        <div className="footer-cols">
          <div>
            <h4>Work</h4>
            {DOMAIN_ORDER.map((s) => (
              <Link key={s} href={`/${s}`}>{DOMAINS[s].name}</Link>
            ))}
            <Link href="/beyond">Beyond</Link>
          </div>
          <div>
            <h4>Connect</h4>
            <a href={PROFILE.linkedin} target="_blank" rel="noopener">LinkedIn</a>
            <a href={PROFILE.github} target="_blank" rel="noopener">GitHub</a>
            <a href={`mailto:${PROFILE.email}`}>Email</a>
            <a href={PROFILE.resume} target="_blank" rel="noopener">Résumé</a>
          </div>
        </div>
      </div>
      <div className="wrap footer-base">© {new Date().getFullYear()} Don Balanzat · Phoenix, AZ</div>
    </footer>
  );
}
