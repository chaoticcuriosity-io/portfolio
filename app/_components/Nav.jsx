import Link from "next/link";
import { DOMAIN_ORDER, DOMAINS, PROFILE } from "../_data/site";

export default function Nav() {
  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <Link className="brand" href="/">
          <span className="dot">D</span> Don Balanzat
        </Link>
        <div className="nav-links">
          {DOMAIN_ORDER.map((slug) => (
            <Link key={slug} href={`/${slug}`}>{DOMAINS[slug].name}</Link>
          ))}
          <Link href="/beyond">Beyond</Link>
          <Link href="/about">About</Link>
        </div>
        <a className="nav-cta" href={PROFILE.resume} target="_blank" rel="noopener">Résumé ↗</a>
      </div>
    </nav>
  );
}
