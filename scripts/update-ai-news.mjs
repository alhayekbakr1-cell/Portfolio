import fs from 'node:fs/promises';
import path from 'node:path';

const FEEDS = [
  { name: 'OpenAI News', category: 'Frontier labs', url: 'https://openai.com/news/rss.xml' },
  { name: 'Google DeepMind Blog', category: 'Frontier labs', url: 'https://deepmind.google/blog/rss.xml' },
  { name: 'Anthropic News', category: 'Frontier labs', url: 'https://www.anthropic.com/news/rss.xml' },
  { name: 'MIT News - Artificial Intelligence', category: 'Research', url: 'https://news.mit.edu/topic/artificial-intelligence2-rss.xml' },
  { name: 'Stanford HAI', category: 'Research and policy', url: 'https://hai.stanford.edu/news/rss.xml' },
  { name: 'The Decoder', category: 'Industry', url: 'https://the-decoder.com/feed/' },
  { name: 'VentureBeat AI', category: 'Industry', url: 'https://venturebeat.com/category/ai/feed/' }
];

const OUTPUT_PATH = path.join(process.cwd(), 'public', 'ai-news.json');
const MAX_ITEMS = 30;

const stripHtml = (html = '') => html
  .replace(/<!\[CDATA\[|\]\]>/g, '')
  .replace(/<[^>]*>/g, ' ')
  .replace(/&nbsp;/g, ' ')
  .replace(/&amp;/g, '&')
  .replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'")
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/\s+/g, ' ')
  .trim();

const pick = (text, tag) => {
  const match = text.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'));
  return match ? stripHtml(match[1]) : '';
};

const pickLink = (itemXml) => {
  const atomLink = itemXml.match(/<link[^>]+href=["']([^"']+)["'][^>]*\/>/i);
  if (atomLink?.[1]) return atomLink[1].trim();
  return pick(itemXml, 'link');
};

const parseItems = (xml, feed) => {
  const blocks = xml.match(/<item[\s\S]*?<\/item>|<entry[\s\S]*?<\/entry>/gi) || [];

  return blocks.map((block) => {
    const title = pick(block, 'title');
    const description = stripHtml(
      pick(block, 'description') ||
      pick(block, 'summary') ||
      pick(block, 'content')
    );
    const rawDate = pick(block, 'pubDate') || pick(block, 'updated') || pick(block, 'published');
    const parsedDate = rawDate ? new Date(rawDate) : new Date();
    const link = pickLink(block);

    if (!title || !link) return null;

    return {
      id: `${feed.name}-${link}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 120),
      title,
      description: description.slice(0, 260),
      source: feed.name,
      category: feed.category,
      date: Number.isNaN(parsedDate.valueOf()) ? new Date().toISOString().slice(0, 10) : parsedDate.toISOString().slice(0, 10),
      link
    };
  }).filter(Boolean);
};

const fetchFeed = async (feed) => {
  const response = await fetch(feed.url, {
    headers: {
      'User-Agent': 'BakrAlhayekPortfolioAIUpdater/1.0 (+https://bakralhayek.com)'
    }
  });

  if (!response.ok) {
    throw new Error(`${feed.name} responded with ${response.status}`);
  }

  const xml = await response.text();
  return parseItems(xml, feed);
};

const main = async () => {
  const settled = await Promise.allSettled(FEEDS.map(fetchFeed));
  const items = settled
    .flatMap((result) => result.status === 'fulfilled' ? result.value : [])
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, MAX_ITEMS);

  const failedSources = settled
    .map((result, index) => result.status === 'rejected' ? `${FEEDS[index].name}: ${result.reason.message}` : null)
    .filter(Boolean);

  const payload = {
    generatedAt: new Date().toISOString(),
    summary: `Latest global AI updates from ${FEEDS.length - failedSources.length} source groups, refreshed automatically by GitHub Actions.`,
    sources: FEEDS.map(({ name, category, url }) => ({ name, category, url })),
    failedSources,
    items
  };

  await fs.writeFile(OUTPUT_PATH, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  console.log(`Wrote ${items.length} AI news items to ${OUTPUT_PATH}`);

  if (items.length === 0) {
    throw new Error('No AI news items were collected.');
  }
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
