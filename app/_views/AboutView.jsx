"use client";
import Link from "next/link";
import { useContent } from "../_components/editable/context";
import EditableText from "../_components/editable/EditableText";
import EditableRichText from "../_components/editable/EditableRichText";
import EditableMedia from "../_components/editable/EditableMedia";
import { resolveRef } from "../_data/site";

const H4_HEAD = { fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--faint)", margin: "26px 0 12px" };

export default function AboutView() {
  const about = useContent("about");
  const profile = useContent("profile");
  const mission = useContent("home.mission");

  return (
    <main>
      <section className="dhero">
        <div className="wrap">
          <Link className="backlink" href="/">← Home</Link>
          <EditableText as="div" className="kicker" value={about.kicker} path="about.kicker" />
          <EditableText as="h1" className="serif" value={about.title} path="about.title" />
          <EditableText as="p" className="tagline" value={about.tagline} path="about.tagline" />
        </div>
      </section>

      <div className="wrap" style={{ padding: "40px 0 20px" }}>
        <div className="about-grid">
          <div>
            {about.paragraphs.map((para, i) => (
              <EditableRichText key={i} as="p" tokens={para} path={`about.paragraphs.${i}`} />
            ))}

            <h4 style={H4_HEAD}>{about.standForHeading}</h4>
            {mission.map((m) => (
              <p key={m} className="serif" style={{ fontSize: 20, color: "var(--text)", marginBottom: 10 }}>
                <span style={{ color: "var(--amber)", marginRight: 10 }}>✦</span>{m}
              </p>
            ))}

            <h4 style={H4_HEAD}>{about.educationHeading}</h4>
            {about.education.map((e, i) => (
              <EditableText key={i} as="p" multiline value={e} path={`about.education.${i}`} />
            ))}
          </div>

          <aside className="about-side">
            <EditableMedia path="about.sideImage" src={resolveRef(about.sideImage)} folder="space">
              <img src={resolveRef(about.sideImage)} alt={about.sideImageAlt} />
            </EditableMedia>
            <h4>{about.nowHeading}</h4>
            <ul>
              {about.now.map((n) => <li key={n}><span>▹</span>{" " + n}</li>)}
            </ul>
            <h4 style={{ marginTop: 18 }}>{about.connectHeading}</h4>
            <ul>
              <li><span>▹</span> <a href={profile.linkedin} target="_blank" rel="noopener">LinkedIn</a></li>
              <li><span>▹</span> <a href={profile.github} target="_blank" rel="noopener">GitHub</a></li>
              <li><span>▹</span> <a href={`mailto:${profile.email}`}>{profile.email}</a></li>
              <li><span>▹</span> <a href={profile.resume} target="_blank" rel="noopener">Résumé (PDF)</a></li>
            </ul>
          </aside>
        </div>
      </div>
    </main>
  );
}
