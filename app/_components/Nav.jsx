"use client";
import Link from "next/link";
import { useContent } from "./editable/context";

export default function Nav() {
  const order = useContent("home.domains.order");
  const domainsData = useContent("domainsData");
  const profile = useContent("profile");

  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <Link className="brand" href="/">
          <span className="dot">D</span> Don Balanzat
        </Link>
        <div className="nav-links">
          {order.map((slug) => (
            <Link key={slug} href={`/${slug}`}>{domainsData[slug].name}</Link>
          ))}
          <Link href="/beyond">Beyond</Link>
          <Link href="/about">About</Link>
        </div>
        <a className="nav-cta" href={profile.resume} target="_blank" rel="noopener">Résumé ↗</a>
      </div>
    </nav>
  );
}
