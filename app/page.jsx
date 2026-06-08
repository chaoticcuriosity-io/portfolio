const EMAIL = "dgbalanzat@gmail.com";
const LINKEDIN = "https://linkedin.com/in/donbalanzat";
const GITHUB = "https://github.com/chaoticcuriosity-io";
const RESUME = "/resume/don-balanzat-resume.pdf";

const WORK = [
  {
    img: "/images/robotics-screencast.mp4",
    title: "Humanoid Robotics",
    desc: "Lead tech on a Unitree H2 humanoid at ASU's Pooladvand Lab — sim-to-real for construction-safety research, getting people out of dangerous spots.",
    tags: ["Python", "Isaac Lab", "NVIDIA GR00T", "ROS", "MuJoCo"],
  },
  {
    img: "/images/moon-day-viewer.mp4",
    title: "Gaussian Splat Pipeline",
    desc: "A 3D/4D Gaussian-splat pipeline that converts image and video into immersive-ready assets for web, VR, Unity, and Unreal.",
    tags: ["3DGS", "Unity", "Unreal", "WebGL"],
  },
  {
    img: "/images/blue-moon-thermal-vacuum.jpg",
    title: "XR Engineering @ Blue Origin",
    desc: "Built VR labs, AR manufacturing tools, and spatial-capture pipelines from zero across every vehicle program — shipped to 12,000+ users.",
    tags: ["Unity", "GitLab CI/CD", "AWS", "ITAR"],
  },
  {
    img: "/images/thermal-i-love-physics.png",
    title: "PhLEx — AI-Native Physics Lab",
    desc: "An AI-native physics lab platform, built with ASU, that brings agentic AI into hands-on STEM learning.",
    tags: ["TypeScript", "LLMs", "Agents", "EdTech"],
  },
  {
    img: "/images/mentoring-at-mit-reality-hack.jpg",
    title: "You + AI Workshop Series",
    desc: "A hands-on workshop series — for ASU, enterprise teams, and the public — that turns AI anxiety into working habits.",
    tags: ["Training", "Enablement", "Community"],
  },
  {
    img: "/images/hyperspace-ai-xr-flyer.jpg",
    title: "Hyperspace: XR + AI",
    desc: "Designed and taught a graduate course at ASU at the convergence of immersive media and frontier AI.",
    tags: ["ASU", "Curriculum", "Frontier tools"],
  },
];

function Icon({ d }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {d}
    </svg>
  );
}

export default function Page() {
  return (
    <>
      <div className="cosmos" />

      {/* NAV */}
      <nav className="nav">
        <div className="wrap">
          <a className="brand" href="#top">
            <span className="dot">D</span> Don Balanzat
          </a>
          <div className="nav-links">
            <a href="#work">Work</a>
            <a href="#enablement">AI Enablement</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>
          <a className="nav-cta" href={RESUME} target="_blank" rel="noopener">Résumé ↗</a>
        </div>
      </nav>

      {/* HERO */}
      <header id="top" className="hero">
        <div className="wrap hero-grid">
          <div>
            <p className="eyebrow">Don Balanzat — AI Enablement Leader &amp; Builder</p>
            <h1 className="serif">I get whole companies to <em>actually use AI</em>.</h1>
            <p className="lede">
              I lead enterprise AI enablement and still ship the tools myself — agents, internal
              tooling, ML pipelines, and immersive systems. Currently <strong>AI Enablement Lead at
              Zillow</strong>, where I took weekly-active AI use in Product &amp; Design from 30% to
              75%+ in two months.
            </p>
            <div className="cta-row">
              <a className="btn btn-primary" href={RESUME} target="_blank" rel="noopener">View résumé</a>
              <a className="btn btn-ghost" href={LINKEDIN} target="_blank" rel="noopener">LinkedIn</a>
              <a className="btn btn-ghost" href={GITHUB} target="_blank" rel="noopener">GitHub</a>
              <a className="btn btn-ghost" href={`mailto:${EMAIL}`}>Email</a>
            </div>
          </div>
          <div className="portrait">
            <img src="/images/space-headshot.jpg" alt="Don Balanzat" />
            <div className="tag mono">Phoenix, AZ · <b>Remote</b></div>
          </div>
        </div>
      </header>

      {/* STATS */}
      <section className="stats">
        <div className="wrap">
          <div className="stat">
            <div className="num serif">2,700<span>+</span></div>
            <div className="lbl">people enabled across Product, Eng, Marketing &amp; Design</div>
          </div>
          <div className="stat">
            <div className="num serif">30 → 75<span>%</span></div>
            <div className="lbl">weekly-active AI adoption in 2 months (Product &amp; Design)</div>
          </div>
          <div className="stat">
            <div className="num serif">12,000<span>+</span></div>
            <div className="lbl">users on platforms I built at Blue Origin</div>
          </div>
          <div className="stat">
            <div className="num serif">10<span>+</span> yrs</div>
            <div className="lbl">building &amp; teaching hard technology</div>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="block">
        <div className="wrap">
          <div className="head">
            <div className="kicker">How I work</div>
            <h2 className="serif">Enable, build, govern — at the same time.</h2>
            <p>The job isn&apos;t slideware. It&apos;s a builder who can sit with engineering leaders as a
              peer and bring a skeptical business unit along.</p>
          </div>
          <div className="pillars">
            <div className="pillar a">
              <div className="ic"><Icon d={<><path d="M12 3v3M5.6 5.6l2.1 2.1M3 12h3M18 12h3M16.3 7.7l2.1-2.1M9 17h6M10 21h4M8.5 14a5 5 0 1 1 7 0c-.7.6-1.2 1.3-1.4 2H9.9c-.2-.7-.7-1.4-1.4-2Z"/></>} /></div>
              <h3>Enable</h3>
              <p>Strategy, operating model, champions networks, and hands-on training that move teams
                from curious to fluent — with adoption measured, not assumed.</p>
            </div>
            <div className="pillar b">
              <div className="ic"><Icon d={<><polyline points="8 7 3 12 8 17"/><polyline points="16 7 21 12 16 17"/><line x1="13" y1="4" x2="11" y2="20"/></>} /></div>
              <h3>Build</h3>
              <p>Agents and harnesses (Claude Code, Agent SDK, MCP), internal tooling, Python/PyTorch
                ML pipelines, and real-time 3D. I write the spec and ship it.</p>
            </div>
            <div className="pillar c">
              <div className="ic"><Icon d={<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></>} /></div>
              <h3>Govern</h3>
              <p>Responsible-AI guardrails and data classification — what goes to hosted models, what
                stays private, what triggers legal review — shaped by years in ITAR environments.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE — AI ENABLEMENT */}
      <section id="enablement" className="block" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="feature">
            <div className="media">
              <img src="/images/you-plus-ai-workshop.jpg" alt="You + AI workshop session" />
            </div>
            <div>
              <div className="kicker mono">Featured</div>
              <h3 className="serif">AI Enablement at Zillow</h3>
              <div className="role">AI Enablement Lead · company-wide</div>
              <p>
                I run company-wide AI adoption for 2,700+ people across Product, Engineering,
                Marketing, and Design. I authored the operating model — intake, prioritization,
                content cadence, and VP+ and champion partnerships — and built the internal tooling
                and reference implementations that show teams what good looks like.
              </p>
              <ul>
                <li>Lifted weekly-active AI use in Product &amp; Design from 30% to 75%+ in two months</li>
                <li>Stood up an AI Champions framework with a monthly winning-workflow cadence</li>
                <li>Teach Claude Code (skills, subagents, harnesses), Codex, and Cursor in real workflows</li>
              </ul>
              <div className="tags">
                <span className="tag-chip">Claude Code</span>
                <span className="tag-chip">Agent SDK</span>
                <span className="tag-chip">MCP</span>
                <span className="tag-chip">Champions network</span>
                <span className="tag-chip">Adoption metrics</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WORK GRID */}
      <section id="work" className="block" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="head">
            <div className="kicker">Selected work</div>
            <h2 className="serif">Things I&apos;ve built &amp; shipped.</h2>
            <p>From humanoid robotics to a 12,000-user XR platform — proof that the technical
              credibility is real on day one.</p>
          </div>
          <div className="grid">
            {WORK.map((w) => (
              <article className="card" key={w.title}>
                <div className="thumb">
                  {w.img.endsWith(".mp4") ? (
                    <video src={w.img} autoPlay muted loop playsInline aria-label={w.title} />
                  ) : (
                    <img src={w.img} alt={w.title} loading="lazy" />
                  )}
                </div>
                <div className="body">
                  <h3>{w.title}</h3>
                  <p>{w.desc}</p>
                  <div className="tags">
                    {w.tags.map((t) => <span className="tag-chip" key={t}>{t}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="block" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="head">
            <div className="kicker">About</div>
            <h2 className="serif">Physicist turned engineer turned enabler.</h2>
          </div>
          <div className="about">
            <div>
              <p>
                I&apos;ve spent a decade making hard technology usable — in classrooms, on factory
                floors, and across a 12,000-person aerospace company. I lead <strong>AI enablement at
                Zillow</strong>, and I run <strong>Chaotic Curiosity</strong>, a studio building XR,
                AI, and robotics for museums, universities, startups, and research labs.
              </p>
              <p>
                Before Zillow I was XR/AI Engineering Lead at <strong>Blue Origin</strong>, where I
                built emerging-tech capability from zero across every vehicle program and worked inside
                ITAR/export-controlled environments — the regulated-data side of responsible AI. I&apos;m
                happiest when I&apos;m shipping: agents, internal tooling, ML pipelines, and immersive
                systems.
              </p>
              <p>
                Two-time <strong>Blue Origin Liftoff Award</strong> winner and a <strong>Space for
                Humanity</strong> citizen-astronaut finalist. I hold an MS in Human Factors, an MS in
                Geological Sciences (XR for STEM), and a BS in Physics.
              </p>
            </div>
            <div className="side">
              <h4>Also doing</h4>
              <ul>
                <li><span>▹</span> Lead tech on a Unitree H2 humanoid (ASU Pooladvand Lab)</li>
                <li><span>▹</span> Building PhLEx, an AI-native physics lab platform with ASU</li>
                <li><span>▹</span> Technical Advisor to Space Grid AI</li>
                <li><span>▹</span> MIT Reality Hack mentor · ASU MIX Center vendor</li>
                <li><span>▹</span> Free community "You + AI" workshop series in Mesa, AZ</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact">
        <div className="wrap">
          <div className="kicker mono">Get in touch</div>
          <h2 className="serif">Let&apos;s make AI actually land.</h2>
          <p>Open to leadership roles in enterprise AI enablement — and to a good conversation about
            building things.</p>
          <div className="cta-row">
            <a className="btn btn-primary" href={`mailto:${EMAIL}`}>Email me</a>
            <a className="btn btn-ghost" href={LINKEDIN} target="_blank" rel="noopener">LinkedIn</a>
            <a className="btn btn-ghost" href={RESUME} target="_blank" rel="noopener">Résumé</a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="wrap">
          <span>© {new Date().getFullYear()} Don Balanzat</span>
          <span className="mono">
            <a href={GITHUB} target="_blank" rel="noopener">GitHub</a> ·{" "}
            <a href={LINKEDIN} target="_blank" rel="noopener">LinkedIn</a> ·{" "}
            <a href={`mailto:${EMAIL}`}>Email</a>
          </span>
        </div>
      </footer>
    </>
  );
}
