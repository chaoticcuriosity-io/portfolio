import Link from "next/link";
import { notFound } from "next/navigation";
import { DOMAINS } from "../_data/site";
import Gallery from "../_components/Gallery";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(DOMAINS).map((domain) => ({ domain }));
}

export async function generateMetadata({ params }) {
  const { domain } = await params;
  const d = DOMAINS[domain];
  if (!d) return {};
  return {
    title: `${d.name} — Don Balanzat`,
    description: d.tagline,
  };
}

export default async function DomainPage({ params }) {
  const { domain } = await params;
  const d = DOMAINS[domain];
  if (!d) notFound();

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
