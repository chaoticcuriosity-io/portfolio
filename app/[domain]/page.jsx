import { notFound } from "next/navigation";
import { DOMAINS } from "../_data/site";
import DomainView from "../_views/DomainView";

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
  if (!DOMAINS[domain]) notFound();
  return <DomainView slug={domain} />;
}
