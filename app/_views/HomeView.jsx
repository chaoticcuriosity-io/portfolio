"use client";
import { Fragment } from "react";
import Link from "next/link";
import { useContent } from "../_components/editable/context";
import { RichText } from "../_components/editable/RichText";
import { resolveRef, isVideo } from "../_data/site";

function Cta({ cta }) {
  const href = resolveRef(cta.href);
  const cls = `btn btn-${cta.variant}`;
  if (cta.external) {
    return <a className={cls} href={href} target="_blank" rel="noopener">{cta.label}</a>;
  }
  if (typeof href === "string" && href.startsWith("/")) {
    return <Link className={cls} href={href}>{cta.label}</Link>;
  }
  return <a className={cls} href={href}>{cta.label}</a>;
}

export default function HomeView() {
  const content = useContent();
  const { home, profile, domainsData } = content;

  const sections = {
    hero: () => (
      <header className="hero">
        <div className="wrap hero-grid">
          <div>
            <p className="eyebrow">{home.hero.eyebrow}</p>
            <h1 className="serif"><RichText tokens={home.hero.headline} /></h1>
            <p className="lede"><RichText tokens={home.hero.lede} /></p>
            <div className="cta-row">
              {home.hero.ctas.map((cta, i) => <Cta key={i} cta={cta} />)}
            </div>
          </div>
          <div className="portrait">
            <img src={profile.heroImage} alt={home.hero.portraitAlt} />
            <div className="tag mono"><RichText tokens={home.hero.portraitTag} /></div>
          </div>
        </div>
      </header>
    ),

    mission: () => (
      <section className="mission">
        <div className="wrap">
          {home.mission.map((m) => <p key={m}>{m}</p>)}
        </div>
      </section>
    ),

    wins: () => (
      <section className="block">
        <div className="wrap">
          <div className="head">
            <div className="kicker">{home.wins.head.kicker}</div>
            <h2 className="serif">{home.wins.head.title}</h2>
            <p>{home.wins.head.blurb}</p>
          </div>
          <div className="wins">
            {home.wins.cards.map((w) => (
              <Link className="win" href={w.href} key={w.title}>
                <div className="thumb">
                  {isVideo(w.media)
                    ? <video src={w.media} muted loop autoPlay playsInline preload="metadata" />
                    : <img src={w.media} alt={w.title} loading="lazy" />}
                </div>
                <div className="body">
                  <div className="wtag">{w.tag}</div>
                  <h3>{w.title}</h3>
                  <p>{w.blurb}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    ),

    domains: () => (
      <section className="block" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="head">
            <div className="kicker">{home.domains.head.kicker}</div>
            <h2 className="serif">{home.domains.head.title}</h2>
            <p>{home.domains.head.blurb}</p>
          </div>
          <div className="domains">
            {home.domains.order.map((slug) => {
              const d = domainsData[slug];
              return (
                <Link className="dcard" href={`/${slug}`} key={slug} style={{ "--dc": d.accent }}>
                  <h3>{d.name}</h3>
                  <p>{d.tagline}</p>
                  <span className="arrow">Explore {d.name} →</span>
                </Link>
              );
            })}
            <Link className="dcard" href="/beyond" style={{ "--dc": domainsData.beyond.accent }}>
              <h3>Beyond</h3>
              <p>{domainsData.beyond.tagline}</p>
              <span className="arrow">{home.domains.beyondCard.arrow}</span>
            </Link>
          </div>
        </div>
      </section>
    ),

    studio: () => (
      <section className="block" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="cc-band">
            <div>
              <img className="cc-logo" src={home.studio.logo} alt={home.studio.logoAlt} />
              <h2 className="serif">{home.studio.title}</h2>
              <p>{home.studio.body}</p>
              <Cta cta={home.studio.button} />
            </div>
            <div className="media">
              <video src={home.studio.video} muted loop autoPlay playsInline preload="metadata" />
            </div>
          </div>
        </div>
      </section>
    ),

    contact: () => (
      <section className="contact">
        <div className="wrap">
          <div className="kicker mono">{home.contact.kicker}</div>
          <h2 className="serif">{home.contact.title}</h2>
          <p>{home.contact.blurb}</p>
          <div className="cta-row">
            {home.contact.ctas.map((cta, i) => <Cta key={i} cta={cta} />)}
          </div>
        </div>
      </section>
    ),
  };

  return (
    <>
      {home.sections
        .filter((s) => s.visible !== false)
        .map((s) => <Fragment key={s.id}>{sections[s.id]()}</Fragment>)}
    </>
  );
}
