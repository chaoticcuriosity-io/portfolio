"use client";
import Link from "next/link";
import { useContent } from "../_components/editable/context";
import Gallery from "../_components/Gallery";

export default function DomainView({ slug }) {
  const d = useContent(`domainsData.${slug}`);
  if (!d) return null;

  return (
    <main style={{ "--accent-domain": d.accent }}>
      <section className="dhero">
        <div className="wrap">
          <Link className="backlink" href="/">← All work</Link>
          <div className="kicker">{d.name === "Beyond" ? "Off the clock" : "Domain"}</div>
          <h1 className="serif">{d.name}</h1>
          <p className="tagline">{d.tagline}</p>
          <p className="intro">{d.intro}</p>
        </div>
      </section>

      <div className="wrap">
        <div className="dlayout">
          <aside className="bullets">
            <h4>{d.name === "Beyond" ? "A few things" : "Experience"}</h4>
            <ul>
              {d.bullets.map((b) => <li key={b}>{b}</li>)}
            </ul>
          </aside>
          <div>
            <Gallery items={d.media} />
          </div>
        </div>
      </div>
    </main>
  );
}
