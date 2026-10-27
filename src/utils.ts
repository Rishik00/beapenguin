import { getCollection } from 'astro:content';

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

// Experiment write-ups hosted on this site, newest first.
export async function getExperimentList() {
  return (await getExperiments()).map((e) => ({
    title: e.data.title,
    summary: e.data.summary,
    date: e.data.date,
    href: `/experiments/${e.id}`,
  }));
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
