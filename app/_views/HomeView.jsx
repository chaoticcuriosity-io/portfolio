"use client";
import { Fragment } from "react";
import Link from "next/link";
import { useContent } from "../_components/editable/context";
import EditableText from "../_components/editable/EditableText";
import EditableRichText from "../_components/editable/EditableRichText";
import EditableMedia from "../_components/editable/EditableMedia";
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
            <EditableText as="p" className="eyebrow" value={home.hero.eyebrow} path="home.hero.eyebrow" />
            <EditableRichText as="h1" className="serif" tokens={home.hero.headline} path="home.hero.headline" />
            <EditableRichText as="p" className="lede" tokens={home.hero.lede} path="home.hero.lede" />
            <div className="cta-row">
              {home.hero.ctas.map((cta, i) => <Cta key={i} cta={cta} />)}
            </div>
          </div>
          <div className="portrait">
            <EditableMedia path="profile.heroImage" src={profile.heroImage} folder="space">
              <img src={profile.heroImage} alt={home.hero.portraitAlt} />
            </EditableMedia>
            <EditableRichText as="div" className="tag mono" tokens={home.hero.portraitTag} path="home.hero.portraitTag" />
          </div>
        </div>
      </header>
    ),

    mission: () => (
      <section className="mission">
        <div className="wrap">
          {home.mission.map((m, i) => (
            <EditableText key={i} as="p" value={m} path={`home.mission.${i}`} />
          ))}
        </div>
      </section>
    ),

    wins: () => (
      <section className="block">
        <div className="wrap">
          <div className="head">
            <EditableText as="div" className="kicker" value={home.wins.head.kicker} path="home.wins.head.kicker" />
            <EditableText as="h2" className="serif" value={home.wins.head.title} path="home.wins.head.title" />
            <EditableText as="p" multiline value={home.wins.head.blurb} path="home.wins.head.blurb" />
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
            <EditableText as="div" className="kicker" value={home.domains.head.kicker} path="home.domains.head.kicker" />
            <EditableText as="h2" className="serif" value={home.domains.head.title} path="home.domains.head.title" />
            <EditableText as="p" multiline value={home.domains.head.blurb} path="home.domains.head.blurb" />
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
              <EditableMedia path="home.studio.logo" src={home.studio.logo} folder="personal">
                <img className="cc-logo" src={home.studio.logo} alt={home.studio.logoAlt} />
              </EditableMedia>
              <EditableText as="h2" className="serif" value={home.studio.title} path="home.studio.title" />
              <EditableText as="p" multiline value={home.studio.body} path="home.studio.body" />
              <Cta cta={home.studio.button} />
            </div>
            <div className="media">
              <EditableMedia path="home.studio.video" src={home.studio.video} folder="ai">
                <video src={home.studio.video} muted loop autoPlay playsInline preload="metadata" />
              </EditableMedia>
            </div>
          </div>
        </div>
      </section>
    ),

    contact: () => (
      <section className="contact">
        <div className="wrap">
          <EditableText as="div" className="kicker mono" value={home.contact.kicker} path="home.contact.kicker" />
          <EditableText as="h2" className="serif" value={home.contact.title} path="home.contact.title" />
          <EditableText as="p" multiline value={home.contact.blurb} path="home.contact.blurb" />
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
