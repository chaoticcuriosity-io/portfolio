"use client";
import Link from "next/link";
import { useContent, useEditorCtx } from "../_components/editable/context";
import EditableText from "../_components/editable/EditableText";
import Sortable from "../_components/editable/Sortable";
import SortableItem from "../_components/editable/SortableItem";
import { DragHandle, RemoveButton, AddButton, ColorField } from "../_components/editable/controls";
import Gallery from "../_components/Gallery";

export default function DomainView({ slug }) {
  const d = useContent(`domainsData.${slug}`);
  const { editing, removeItem, addItem } = useEditorCtx();
  if (!d) return null;

  const bulletsPath = `domainsData.${slug}.bullets`;

  return (
    <main style={{ "--accent-domain": d.accent }}>
      <section className="dhero">
        <div className="wrap">
          <Link className="backlink" href="/">← All work</Link>
          <div className="kicker">{d.name === "Beyond" ? "Off the clock" : "Domain"}</div>
          <EditableText as="h1" className="serif" value={d.name} path={`domainsData.${slug}.name`} />
          <EditableText as="p" className="tagline" value={d.tagline} path={`domainsData.${slug}.tagline`} />
          <EditableText as="p" className="intro" multiline value={d.intro} path={`domainsData.${slug}.intro`} />
          <ColorField value={d.accent} path={`domainsData.${slug}.accent`} />
        </div>
      </section>

      <div className="wrap">
        <div className="dlayout">
          <aside className="bullets">
            <h4>{d.name === "Beyond" ? "A few things" : "Experience"}</h4>
            <ul>
              <Sortable path={bulletsPath} ids={d.bullets.map((_, i) => String(i))} strategy="vertical">
                {d.bullets.map((b, i) => (
                  <SortableItem
                    key={i}
                    id={String(i)}
                    render={(s) =>
                      editing ? (
                        <li className="cc-row" ref={s.setNodeRef} style={s.style}>
                          <DragHandle handle={s.handle} />
                          <EditableText as="span" multiline value={b} path={`${bulletsPath}.${i}`} />
                          <RemoveButton onClick={() => removeItem(bulletsPath, i)} label="Remove point" />
                        </li>
                      ) : (
                        <li>{b}</li>
                      )
                    }
                  />
                ))}
              </Sortable>
            </ul>
            <AddButton onClick={() => addItem(bulletsPath, "New point.")}>Add point</AddButton>
          </aside>
          <div>
            <Gallery items={d.media} basePath={`domainsData.${slug}.media`} />
          </div>
        </div>
      </div>
    </main>
  );
}
