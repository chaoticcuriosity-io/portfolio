"use client";
import Link from "next/link";
import { useContent } from "../_components/editable/context";
import EditableText from "../_components/editable/EditableText";
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
          <EditableText as="h1" className="serif" value={d.name} path={`domainsData.${slug}.name`} />
          <EditableText as="p" className="tagline" value={d.tagline} path={`domainsData.${slug}.tagline`} />
          <EditableText as="p" className="intro" multiline value={d.intro} path={`domainsData.${slug}.intro`} />
        </div>
      </section>

      <div className="wrap">
        <div className="dlayout">
          <aside className="bullets">
            <h4>{d.name === "Beyond" ? "A few things" : "Experience"}</h4>
            <ul>
              {d.bullets.map((b, i) => (
                <EditableText key={i} as="li" multiline value={b} path={`domainsData.${slug}.bullets.${i}`} />
              ))}
            </ul>
          </aside>
          <div>
            <Gallery items={d.media} basePath={`domainsData.${slug}.media`} />
          </div>
        </div>
      </div>
    </main>
  );
}
