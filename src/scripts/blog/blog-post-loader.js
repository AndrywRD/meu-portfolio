/**
 * Blog Post Loader - CORRIGIDO
 * Carrega e renderiza post individual
 */

const BlogPostLoader = (function() {
  // CORREÇÃO: Caminhos corretos para produção
  const METADATA_URL = '/content/metadata/posts.json';
  const POSTS_DIR = '/dist/blog/posts';
  
  function getSlugFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('slug');
  }
  
  async function fetchPostMetadata(slug) {
    try {
      const response = await fetch(METADATA_URL);
      if (!response.ok) throw new Error('Falha ao carregar metadados');
      
      const data = await response.json();
      const post = data.posts.find(p => p.slug === slug);
      
      return post || null;
    } catch (error) {
      console.error('Erro ao buscar metadados:', error);
      return null;
    }
  }
  
  async function fetchPostContent(slug) {
    try {
      // CORREÇÃO: Tentar múltiplos caminhos
      const possiblePaths = [
        `/dist/blog/posts/${slug}.html`,
        `/blog/posts/${slug}.html`,
        `../../dist/blog/posts/${slug}.html`
      ];
      
      for (const path of possiblePaths) {
        try {
          const response = await fetch(path);
          if (response.ok) {
            console.log(`✅ Post carregado de: ${path}`);
            return await response.text();
          }
        } catch (e) {
          console.log(`❌ Tentativa falhou: ${path}`);
        }
      }
      
      throw new Error('Post não encontrado em nenhum caminho');
      
    } catch (error) {
      console.error('Erro ao carregar post:', error);
      
      // FALLBACK: Retornar mensagem amigável
      return `
        <div class="text-center py-12">
          <svg class="w-24 h-24 mx-auto mb-4 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 class="text-2xl font-bold text-zinc-400 mb-2">Conteúdo em processamento</h3>
          <p class="text-zinc-500 mb-4">O conteúdo deste post está sendo gerado. Tente novamente em alguns instantes.</p>
          <p class="text-xs text-zinc-600">Erro técnico: ${error.message}</p>
        </div>
      `;
    }
  }
  
  function formatDate(dateString) {
    const date = new Date(dateString + 'T00:00:00');
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('pt-BR', options);
  }
  
  function updateMetaTags(post) {
    document.title = `${post.title} - Blog Andryw Ruhan`;
    
    // Atualizar meta tags (verificar se existem)
    const updateMetaTag = (id, content) => {
      const element = document.getElementById(id);
      if (element) element.content = content;
    };
    
    updateMetaTag('post-title', document.title);
    updateMetaTag('post-description', post.description);
    updateMetaTag('post-keywords', post.tags.join(', '));
    updateMetaTag('og-title', post.title);
    updateMetaTag('og-description', post.description);
    updateMetaTag('og-image', post.coverImage);
    updateMetaTag('og-url', window.location.href);
  }
  
  function renderPost(post, content) {
    // Breadcrumb
    const breadcrumbCategory = document.getElementById('breadcrumb-category');
    if (breadcrumbCategory) breadcrumbCategory.textContent = post.category;
    
    // Category badge
    const categoryBadge = document.getElementById('post-category-badge');
    if (categoryBadge) categoryBadge.textContent = post.category;
    
    // Title
    const mainTitle = document.getElementById('post-main-title');
    if (mainTitle) mainTitle.textContent = post.title;
    
    // Author
    const author = document.getElementById('post-author');
    if (author) author.textContent = post.author;
    
    // Content
    const contentContainer = document.getElementById('post-content');
    if (contentContainer) {
      contentContainer.innerHTML = content;
      
      // Highlight code blocks (se hljs estiver disponível)
      if (typeof hljs !== 'undefined') {
        contentContainer.querySelectorAll('pre code').forEach((block) => {
          hljs.highlightElement(block);
        });
      }
    }
  }
  
  async function init() {
    const slug = getSlugFromURL();
    
    if (!slug) {
      console.warn('Nenhum slug encontrado na URL');
      window.location.href = '/pages/blog/index.html';
      return;
    }
    
    console.log(`🔍 Carregando post: ${slug}`);
    
    const post = await fetchPostMetadata(slug);
    
    if (!post) {
      alert('Post não encontrado nos metadados');
      window.location.href = '/pages/blog/index.html';
      return;
    }
    
    if (!post.published) {
      alert('Este post ainda não foi publicado');
      window.location.href = '/pages/blog/index.html';
      return;
    }
    
    console.log('✅ Metadados carregados:', post);
    
    const content = await fetchPostContent(slug);
    
    updateMetaTags(post);
    renderPost(post, content);
    
    console.log(`✅ Post renderizado: ${post.title}`);
  }
  
  return { init };
})();

// Tornar disponível globalmente
window.BlogPostLoader = BlogPostLoader;