"use client";
import Link from "next/link";
import { useContent } from "./editable/context";

export default function Footer() {
  const profile = useContent("profile");
  const order = useContent("home.domains.order");
  const domainsData = useContent("domainsData");
  const footer = useContent("footer");

  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <div className="brand"><span className="dot">D</span> Don Balanzat</div>
          <p className="footer-blurb">{profile.tagline}{footer.blurbSuffix}</p>
          <p className="footer-studio">
            Studio: <a href={profile.studio.url} target="_blank" rel="noopener">{profile.studio.name} ↗</a>
          </p>
        </div>
        <div className="footer-cols">
          <div>
            <h4>Work</h4>
            {order.map((s) => (
              <Link key={s} href={`/${s}`}>{domainsData[s].name}</Link>
            ))}
            <Link href="/beyond">Beyond</Link>
          </div>
          <div>
            <h4>Connect</h4>
            <a href={profile.linkedin} target="_blank" rel="noopener">LinkedIn</a>
            <a href={profile.github} target="_blank" rel="noopener">GitHub</a>
            <a href={`mailto:${profile.email}`}>Email</a>
            <a href={profile.resume} target="_blank" rel="noopener">Résumé</a>
          </div>
        </div>
      </div>
      <div className="wrap footer-base">© {new Date().getFullYear()} Don Balanzat · Phoenix, AZ</div>
    </footer>
  );
}
