import { getCollection } from 'astro:content';
import { externalPosts } from './data/site';

export const fmtDate = (d: Date, style: 'short' | 'long' = 'short') =>
  d.toLocaleDateString('en-GB', {
    month: style === 'short' ? 'short' : 'long',
    year: 'numeric',
    ...(style === 'long' ? { day: 'numeric' } : {}),
  });

export async function getPosts<C extends 'experiments' | 'random'>(collection: C) {
  const all = await getCollection(collection, ({ data }) => !data.draft);
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export const getExperiments = () => getPosts('experiments');

export type ListedExperiment = {
  title: string;
  summary: string;
  date: Date;
  href: string;
  // Set for posts hosted elsewhere, e.g. 'Mercity'.
  where?: string;
};

// Experiments written here plus research posts published elsewhere, newest first.
export async function getExperimentList(): Promise<ListedExperiment[]> {
  const local = (await getExperiments()).map((e) => ({
    title: e.data.title,
    summary: e.data.summary,
    date: e.data.date,
    href: `/experiments/${e.id}`,
  }));
  const external = externalPosts.map((p) => ({ ...p, date: new Date(p.date) }));
  return [...local, ...external].sort((a, b) => b.date.valueOf() - a.date.valueOf());
}

// Minutes to read the prose of a markdown body at 230 words per minute (a common
// adult average for non-fiction). Code blocks, tables, HTML tags and markdown
// syntax are removed first so only words a reader actually reads are counted.
export function readingMinutes(markdown = '') {
  const prose = markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/^\|.*\|$/gm, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`~|-]+/g, ' ');
  const words = prose.match(/[\p{L}\p{N}][\p{L}\p{N}'’.,%-]*/gu)?.length ?? 0;
  return Math.max(1, Math.round(words / 230));
}
