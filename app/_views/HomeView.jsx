"use client";
import Link from "next/link";
import { useContent, useEditorCtx } from "../_components/editable/context";
import EditableText from "../_components/editable/EditableText";
import EditableRichText from "../_components/editable/EditableRichText";
import EditableMedia, { folderFromSrc } from "../_components/editable/EditableMedia";
import Sortable from "../_components/editable/Sortable";
import SortableItem from "../_components/editable/SortableItem";
import { DragHandle, RemoveButton, AddButton } from "../_components/editable/controls";
import { resolveRef, isVideo } from "../_data/site";

function Cta({ cta }) {
  const href = resolveRef(cta.href);
  const cls = `btn btn-${cta.variant}`;
  if (cta.external) return <a className={cls} href={href} target="_blank" rel="noopener">{cta.label}</a>;
  if (typeof href === "string" && href.startsWith("/")) return <Link className={cls} href={href}>{cta.label}</Link>;
  return <a className={cls} href={href}>{cta.label}</a>;
}

function WinCard({ w, idx, editing, s, onRemove }) {
  const thumb = (
    <div className="thumb">
      <EditableMedia path={`home.wins.cards.${idx}.media`} src={w.media} folder={folderFromSrc(w.media) || "ai"}>
        {isVideo(w.media)
          ? <video src={w.media} muted loop autoPlay playsInline preload="metadata" />
          : <img src={w.media} alt={w.title} loading="lazy" />}
      </EditableMedia>
    </div>
  );
  if (!editing) {
    return (
      <Link className="win" href={w.href}>
        {thumb}
        <div className="body">
          <div className="wtag">{w.tag}</div>
          <h3>{w.title}</h3>
          <p>{w.blurb}</p>
        </div>
      </Link>
    );
  }
  return (
    <div className="win cc-item" ref={s.setNodeRef} style={s.style} data-cc-card>
      <DragHandle handle={s.handle} />
      <RemoveButton onClick={onRemove} label="Remove card" />
      {thumb}
      <div className="body">
        <EditableText as="div" className="wtag" value={w.tag} path={`home.wins.cards.${idx}.tag`} />
        <EditableText as="h3" value={w.title} path={`home.wins.cards.${idx}.title`} />
        <EditableText as="p" multiline value={w.blurb} path={`home.wins.cards.${idx}.blurb`} />
      </div>
    </div>
  );
}

function DomainCard({ slug, d, editing, s }) {
  if (!editing) {
    return (
      <Link className="dcard" href={`/${slug}`} style={{ "--dc": d.accent }}>
        <h3>{d.name}</h3>
        <p>{d.tagline}</p>
        <span className="arrow">Explore {d.name} →</span>
      </Link>
    );
  }
  return (
    <div className="dcard cc-item" ref={s.setNodeRef} style={{ "--dc": d.accent, ...s.style }} data-cc-card>
      <DragHandle handle={s.handle} />
      <h3>{d.name}</h3>
      <p>{d.tagline}</p>
      <span className="arrow">Explore {d.name} →</span>
    </div>
  );
}

function SectionFrame({ id, index, total, visible, editing, ctx, children }) {
  if (!editing) return children;
  return (
    <div className={"cc-section" + (visible ? "" : " cc-hidden")} data-cc-section={id}>
      <div className="cc-section-bar">
        <span className="cc-section-name">{id}</span>
        <button type="button" onClick={() => ctx.move("home.sections", index, index - 1)} disabled={index === 0} title="Move section up">↑</button>
        <button type="button" onClick={() => ctx.move("home.sections", index, index + 1)} disabled={index === total - 1} title="Move section down">↓</button>
        <button type="button" onClick={() => ctx.toggleSection(id)}>{visible ? "Hide" : "Show"}</button>
      </div>
      {children}
    </div>
  );
}

export default function HomeView() {
  const content = useContent();
  const { home, profile, domainsData } = content;
  const ctx = useEditorCtx();
  const { editing, move, addItem, removeItem } = ctx;

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
          <Sortable path="home.mission" ids={home.mission.map((_, i) => String(i))} strategy="vertical">
            {home.mission.map((m, i) => (
              <SortableItem
                key={i}
                id={String(i)}
                render={(s) =>
                  editing ? (
                    <div className="cc-row" ref={s.setNodeRef} style={s.style}>
                      <DragHandle handle={s.handle} />
                      <EditableText as="p" value={m} path={`home.mission.${i}`} />
                      <RemoveButton onClick={() => removeItem("home.mission", i)} label="Remove statement" />
                    </div>
                  ) : (
                    <p>{m}</p>
                  )
                }
              />
            ))}
          </Sortable>
          <AddButton onClick={() => addItem("home.mission", "New statement.")}>Add statement</AddButton>
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
            <Sortable path="home.wins.cards" ids={home.wins.cards.map((w) => w.title)} strategy="rect">
              {home.wins.cards.map((w, idx) => (
                <SortableItem
                  key={w.title}
                  id={w.title}
                  render={(s) => (
                    <WinCard w={w} idx={idx} editing={editing} s={s} onRemove={() => removeItem("home.wins.cards", idx)} />
                  )}
                />
              ))}
            </Sortable>
          </div>
          <AddButton
            onClick={() =>
              addItem("home.wins.cards", {
                title: `New win ${home.wins.cards.length + 1}`,
                blurb: "Describe this work.",
                href: "/ai",
                media: "/media/cc-logo.png",
                tag: "Tag",
              })
            }
          >
            Add card
          </AddButton>
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
            <Sortable path="home.domains.order" ids={home.domains.order} strategy="rect">
              {home.domains.order.map((slug) => (
                <SortableItem
                  key={slug}
                  id={slug}
                  render={(s) => <DomainCard slug={slug} d={domainsData[slug]} editing={editing} s={s} />}
                />
              ))}
            </Sortable>
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

  const list = editing ? home.sections : home.sections.filter((s) => s.visible !== false);

  return (
    <>
      {list.map((sec, i) => (
        <SectionFrame
          key={sec.id}
          id={sec.id}
          index={editing ? i : 0}
          total={home.sections.length}
          visible={sec.visible !== false}
          editing={editing}
          ctx={ctx}
        >
          {sections[sec.id]()}
        </SectionFrame>
      ))}
    </>
  );
}
