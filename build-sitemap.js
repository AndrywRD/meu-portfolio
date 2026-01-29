const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://andrywruhan.dev';
const METADATA_FILE = path.join(__dirname, 'content', 'metadata', 'posts.json');
const OUTPUT_FILE = path.join(__dirname, 'dist', 'sitemap.xml');

function generateSitemap() {
  const metadata = JSON.parse(fs.readFileSync(METADATA_FILE, 'utf-8'));
  
  const pages = [
    { url: '', priority: 1.0, changefreq: 'weekly' },
    { url: '/pages/blog/index.html', priority: 0.9, changefreq: 'daily' },
    { url: '/about.html', priority: 0.8, changefreq: 'monthly' },
    { url: '/contact.html', priority: 0.7, changefreq: 'monthly' }
  ];
  
  metadata.posts
    .filter(p => p.published)
    .forEach(post => {
      pages.push({
        url: `/pages/blog/post.html?slug=${post.slug}`,
        priority: 0.8,
        changefreq: 'weekly',
        lastmod: post.date
      });
    });
  
  metadata.categories.forEach(category => {
    pages.push({
      url: `/pages/blog/category.html?category=${category.slug}`,
      priority: 0.7,
      changefreq: 'weekly'
    });
  });
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    ${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ''}
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
  
  if (!fs.existsSync(path.dirname(OUTPUT_FILE))) {
    fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  }
  
  fs.writeFileSync(OUTPUT_FILE, xml);
  console.log(`✅ Sitemap gerado: ${pages.length} URLs`);
}

if (require.main === module) {
  generateSitemap();
}

module.exports = { generateSitemap };