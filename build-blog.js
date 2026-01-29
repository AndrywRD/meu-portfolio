const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');
const hljs = require('highlight.js');
const slugify = require('slugify');

// ============================================
// CONFIGURAÇÕES
// ============================================
const POSTS_DIR = path.join(__dirname, 'content', 'posts');
const METADATA_FILE = path.join(__dirname, 'content', 'metadata', 'posts.json');
const OUTPUT_DIR = path.join(__dirname, 'dist', 'blog');

// Configurar marked para usar highlight.js
marked.setOptions({
  highlight: function(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: 'hljs language-',
  breaks: true,
  gfm: true
});

// ============================================
// FUNÇÕES UTILITÁRIAS (Seguindo Clean Code)
// ============================================

/**
 * Lê todos os arquivos .md do diretório de posts
 * @returns {Array} Lista de caminhos de arquivos .md
 */
function getMarkdownFiles() {
  if (!fs.existsSync(POSTS_DIR)) {
    console.warn(`⚠️  Diretório de posts não encontrado: ${POSTS_DIR}`);
    return [];
  }
  
  return fs.readdirSync(POSTS_DIR)
    .filter(file => file.endsWith('.md'))
    .map(file => path.join(POSTS_DIR, file));
}

/**
 * Extrai metadados e conteúdo de um arquivo Markdown
 * @param {string} filePath - Caminho do arquivo .md
 * @returns {Object} { metadata, content, html }
 */
function parseMarkdownFile(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data: frontmatter, content } = matter(fileContent);
  
  // Gerar slug se não existir
  const slug = frontmatter.slug || slugify(frontmatter.title, {
    lower: true,
    strict: true,
    locale: 'pt'
  });
  
  // Converter Markdown → HTML
  const html = marked.parse(content);
  
  return {
    metadata: {
      ...frontmatter,
      slug,
      filePath: path.relative(__dirname, filePath),
      id: slug,
      published: frontmatter.published !== false  // Default: true
    },
    content,
    html
  };
}

/**
 * Calcula tempo estimado de leitura
 * @param {string} content - Conteúdo em texto
 * @returns {string} Tempo de leitura (ex: "5 min")
 */
function calculateReadTime(content) {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min`;
}

/**
 * Gera objeto de post com todos os metadados
 * @param {Object} parsedPost - Post parseado
 * @returns {Object} Post completo com metadados
 */
function createPostObject(parsedPost) {
  const { metadata, content } = parsedPost;
  
  return {
    id: metadata.id,
    title: metadata.title,
    slug: metadata.slug,
    description: metadata.description || '',
    author: metadata.author || 'Andryw Ruhan',
    date: metadata.date,
    readTime: metadata.readTime || calculateReadTime(content),
    category: metadata.category || 'Sem categoria',
    tags: metadata.tags || [],
    coverImage: metadata.coverImage || '/src/assets/blog/covers/default.jpg',
    published: metadata.published,
    featured: metadata.featured || false,
    filePath: metadata.filePath
  };
}

/**
 * Atualiza posts.json com novos metadados
 * @param {Array} posts - Lista de posts processados
 */
function updateMetadataFile(posts) {
  const metadata = JSON.parse(fs.readFileSync(METADATA_FILE, 'utf-8'));
  
  metadata.posts = posts;
  metadata.metadata.lastUpdated = new Date().toISOString().split('T')[0];
  metadata.metadata.totalPosts = posts.filter(p => p.published).length;
  
  fs.writeFileSync(METADATA_FILE, JSON.stringify(metadata, null, 2));
  console.log(`✅ posts.json atualizado: ${metadata.metadata.totalPosts} posts publicados`);
}

/**
 * Cria arquivo HTML para um post individual
 * @param {Object} parsedPost - Post parseado com HTML
 */
function generatePostHTML(parsedPost) {
  const { metadata, html } = parsedPost;
  
  // TODO: Implementar template injection na Fase 3
  // Por enquanto, apenas salvar HTML bruto
  const outputPath = path.join(OUTPUT_DIR, 'posts', `${metadata.slug}.html`);
  
  if (!fs.existsSync(path.dirname(outputPath))) {
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  }
  
  fs.writeFileSync(outputPath, html);
  console.log(`📄 Post gerado: ${metadata.slug}.html`);
}

// ============================================
// FUNÇÃO PRINCIPAL
// ============================================

/**
 * Processa todos os posts Markdown e gera arquivos HTML
 */
function buildBlog() {
  console.log('🚀 Iniciando build do blog...\n');
  
  // 1. Ler arquivos Markdown
  const markdownFiles = getMarkdownFiles();
  
  if (markdownFiles.length === 0) {
    console.log('⚠️  Nenhum post encontrado em content/posts/');
    return;
  }
  
  console.log(`📚 Encontrados ${markdownFiles.length} posts\n`);
  
  // 2. Processar cada post
  const processedPosts = [];
  
  markdownFiles.forEach(filePath => {
    try {
      console.log(`⚙️  Processando: ${path.basename(filePath)}`);
      
      const parsedPost = parseMarkdownFile(filePath);
      const postObject = createPostObject(parsedPost);
      
      processedPosts.push(postObject);
      generatePostHTML(parsedPost);
      
    } catch (error) {
      console.error(`❌ Erro ao processar ${filePath}:`, error.message);
    }
  });
  
  // 3. Atualizar posts.json
  updateMetadataFile(processedPosts);
  
  console.log('\n✨ Build do blog concluído!\n');
}

// ============================================
// EXECUÇÃO
// ============================================

if (require.main === module) {
  buildBlog();
}

module.exports = { buildBlog, parseMarkdownFile, createPostObject };