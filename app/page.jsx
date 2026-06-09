import Link from "next/link";
import { PROFILE, MISSION, WINS, DOMAIN_ORDER, DOMAINS, isVideo } from "./_data/site";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <header className="hero">
        <div className="wrap hero-grid">
          <div>
            <p className="eyebrow">Physicist · Engineer · Builder</p>
            <h1 className="serif">I make hard technology <em>usable</em>.</h1>
            <p className="lede">
              A decade building and teaching across <strong>physics, space, immersive reality, robotics,
              and AI</strong> — from university labs to a 12,000-person aerospace company. Now <strong>AI
              Enablement Lead at Zillow</strong> and founder of the studio Chaotic Curiosity.
            </p>
            <div className="cta-row">
              <Link className="btn btn-primary" href="/ai">See the work</Link>
              <a className="btn btn-ghost" href={PROFILE.studio.url} target="_blank" rel="noopener">Chaotic Curiosity ↗</a>
              <a className="btn btn-ghost" href={PROFILE.resume} target="_blank" rel="noopener">Résumé</a>
            </div>
          </div>
          <div className="portrait">
            <img src={PROFILE.heroImage} alt="Don Balanzat" />
            <div className="tag mono">Phoenix, AZ · <b>open to work</b></div>
          </div>
        </div>
      </header>

      {/* MISSION */}
      <section className="mission">
        <div className="wrap">
          {MISSION.map((m) => <p key={m}>{m}</p>)}
        </div>
      </section>

      {/* WINS */}
      <section className="block">
        <div className="wrap">
          <div className="head">
            <div className="kicker">Recent &amp; biggest wins</div>
            <h2 className="serif">What I&apos;ve been building lately.</h2>
            <p>The most recent, highest-impact work — from enterprise AI adoption to humanoid robots that
              learn to move.</p>
          </div>
          <div className="wins">
            {WINS.map((w) => (
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

      {/* DOMAINS */}
      <section className="block" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="head">
            <div className="kicker">Explore by domain</div>
            <h2 className="serif">Depth and breadth.</h2>
            <p>Five technical domains plus a decade of teaching — each its own world of work.</p>
          </div>
          <div className="domains">
            {DOMAIN_ORDER.map((slug) => {
              const d = DOMAINS[slug];
              return (
                <Link className="dcard" href={`/${slug}`} key={slug} style={{ "--dc": d.accent }}>
                  <h3>{d.name}</h3>
                  <p>{d.tagline}</p>
                  <span className="arrow">Explore {d.name} →</span>
                </Link>
              );
            })}
            <Link className="dcard" href="/beyond" style={{ "--dc": DOMAINS.beyond.accent }}>
              <h3>Beyond</h3>
              <p>{DOMAINS.beyond.tagline}</p>
              <span className="arrow">Music, activism &amp; life →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CHAOTIC CURIOSITY */}
      <section className="block" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="cc-band">
            <div>
              <img className="cc-logo" src="/media/cc-logo.png" alt="Chaotic Curiosity" />
              <h2 className="serif">My studio: Chaotic Curiosity</h2>
              <p>A boutique studio building XR, AI, robotics, and media — for museums, universities,
                startups, and research labs. It&apos;s where a lot of this work actually happens.</p>
              <a className="btn btn-primary" href={PROFILE.studio.url} target="_blank" rel="noopener">Visit chaoticcuriosity.io ↗</a>
            </div>
            <div className="media">
              <video src="/media/ai/ai__chaotic-curiosity-reel.mp4" muted loop autoPlay playsInline preload="metadata" />
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact">
        <div className="wrap">
          <div className="kicker mono">Get in touch</div>
          <h2 className="serif">Let&apos;s build something.</h2>
          <p>Open to leadership roles in AI enablement — and to a good conversation about hard problems.</p>
          <div className="cta-row">
            <a className="btn btn-primary" href={`mailto:${PROFILE.email}`}>Email me</a>
            <a className="btn btn-ghost" href={PROFILE.linkedin} target="_blank" rel="noopener">LinkedIn</a>
            <a className="btn btn-ghost" href={PROFILE.resume} target="_blank" rel="noopener">Résumé</a>
          </div>
        </div>
      </section>
    </>
  );
}
