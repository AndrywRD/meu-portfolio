/**
 * Blog Loader
 * Responsável por carregar e renderizar posts do blog
 * 
 * Princípios aplicados:
 * - Single Responsibility: Apenas carrega e renderiza posts
 * - DRY: Funções reutilizáveis
 * - Clean Code: Nomes descritivos
 */

const BlogLoader = (function() {
  // ==================== CONFIGURAÇÕES ====================
  const METADATA_URL = '/content/metadata/posts.json';
  
  // ==================== ESTADO ====================
  let allPosts = [];
  let categories = [];
  let tags = [];
  
  // ==================== FUNÇÕES PRIVADAS ====================
  
  /**
   * Busca metadados do arquivo JSON
   * @returns {Promise<Object>} Metadados do blog
   */
  async function fetchMetadata() {
    try {
      const response = await fetch(METADATA_URL);
      if (!response.ok) throw new Error('Falha ao carregar metadados');
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar metadados:', error);
      return { posts: [], categories: [], tags: [] };
    }
  }
  
  /**
   * Formata data para exibição
   * @param {string} dateString - Data em formato ISO (YYYY-MM-DD)
   * @returns {string} Data formatada (DD de Mês de YYYY)
   */
  function formatDate(dateString) {
    const date = new Date(dateString + 'T00:00:00');
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('pt-BR', options);
  }
  
  /**
   * Renderiza um card de post
   * @param {Object} post - Dados do post
   * @returns {string} HTML do card
   */
  function renderPostCard(post) {
    const tagsHTML = post.tags.map(tag => 
      `<span class="blog-card__tag px-2 py-1 rounded text-xs bg-zinc-700/50 text-zinc-400">#${tag}</span>`
    ).join('');
    
    return `
      <article class="blog-card group cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl" onclick="window.location.href='/pages/blog/post.html?slug=${post.slug}'">
        <div class="blog-card__image-wrapper overflow-hidden rounded-t-lg h-48 bg-zinc-800">
          <img 
            src="${post.coverImage}" 
            alt="${post.title}"
            class="blog-card__image w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
            onerror="this.src='/src/assets/blog/covers/default.jpg'"
          >
        </div>
        
        <div class="blog-card__content p-6 bg-zinc-800/50 backdrop-blur rounded-b-lg">
          <div class="blog-card__meta flex items-center gap-4 mb-3 text-sm text-zinc-400">
            <time datetime="${post.date}" class="flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              ${formatDate(post.date)}
            </time>
            
            <span class="flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              ${post.readTime}
            </span>
          </div>
          
          <h3 class="blog-card__title text-2xl font-bold text-zinc-50 mb-3 group-hover:text-indigo-400 transition-colors">
            ${post.title}
          </h3>
          
          <p class="blog-card__description text-zinc-300 mb-4 line-clamp-3">
            ${post.description}
          </p>
          
          <div class="blog-card__footer flex flex-wrap items-center gap-2">
            <span class="blog-card__category px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              ${post.category}
            </span>
            ${tagsHTML}
          </div>
        </div>
      </article>
    `;
  }
  
  /**
   * Renderiza lista de posts
   * @param {Array} posts - Array de posts para renderizar
   */
  function renderPosts(posts) {
    const grid = document.getElementById('posts-grid');
    const emptyState = document.getElementById('empty-state');
    
    if (posts.length === 0) {
      grid.innerHTML = '';
      emptyState.classList.remove('hidden');
      return;
    }
    
    emptyState.classList.add('hidden');
    grid.innerHTML = posts.map(renderPostCard).join('');
  }
  
  /**
   * Renderiza categorias na sidebar
   */
  function renderCategories() {
    const categoriesList = document.getElementById('categories-list');
    if (!categoriesList) return;
    
    const categoriesHTML = categories.map(category => {
      const postCount = allPosts.filter(p => p.category === category.name && p.published).length;
      
      return `
        <li data-category="${category.slug}" class="sidebar-category-item">
          <span class="w-3 h-3 rounded-full" style="background-color: ${category.color}"></span>
          <span class="flex-1">${category.name}</span>
          <span class="text-xs text-zinc-600">${postCount}</span>
        </li>
      `;
    }).join('');
    
    categoriesList.innerHTML = categoriesHTML;
    
    // Event listeners
    document.querySelectorAll('.sidebar-category-item').forEach(item => {
      item.addEventListener('click', () => {
        const categorySlug = item.dataset.category;
        window.location.href = `/pages/blog/category.html?category=${categorySlug}`;
      });
    });
  }
  
  /**
   * Renderiza tags populares na sidebar
   */
  function renderTags() {
    const tagsList = document.getElementById('tags-list');
    if (!tagsList) return;
    
    // Contar frequência das tags
    const tagCounts = {};
    allPosts.filter(p => p.published).forEach(post => {
      post.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });
    
    // Ordenar por frequência e pegar top 10
    const topTags = Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
    
    const tagsHTML = topTags.map(([tag, count]) => `
      <button 
        class="tag-btn px-3 py-1.5 rounded-lg bg-zinc-700/50 text-zinc-300 hover:bg-zinc-600 hover:text-indigo-400 transition-all text-sm"
        data-tag="${tag}"
      >
        #${tag} <span class="text-xs text-zinc-500">(${count})</span>
      </button>
    `).join('');
    
    tagsList.innerHTML = tagsHTML;
    
    // Event listeners
    document.querySelectorAll('.tag-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tag = btn.dataset.tag;
        window.BlogSearch.filterByTag(tag);
      });
    });
  }
  
  /**
   * Renderiza posts em destaque na sidebar
   */
  function renderFeaturedPosts() {
    const featuredList = document.getElementById('featured-posts-list');
    if (!featuredList) return;
    
    const featuredPosts = allPosts
      .filter(p => p.published && p.featured)
      .slice(0, 3);
    
    const featuredHTML = featuredPosts.map(post => `
      <li>
        <a href="/pages/blog/post.html?slug=${post.slug}" class="block hover:text-indigo-400 transition-colors">
          <h4 class="font-semibold text-sm text-zinc-200 mb-1">${post.title}</h4>
          <p class="text-xs text-zinc-500">${formatDate(post.date)}</p>
        </a>
      </li>
    `).join('');
    
    featuredList.innerHTML = featuredHTML || '<li class="text-zinc-500 text-sm">Nenhum post em destaque</li>';
  }
  
  // ==================== FUNÇÕES PÚBLICAS ====================
  
  /**
   * Inicializa o blog loader
   */
  async function init() {
    const metadata = await fetchMetadata();
    
    allPosts = metadata.posts || [];
    categories = metadata.categories || [];
    tags = metadata.tags || [];
    
    // Filtrar apenas posts publicados e ordenar por data (mais recente primeiro)
    const publishedPosts = allPosts
      .filter(p => p.published)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    
    renderPosts(publishedPosts);
    renderCategories();
    renderTags();
    renderFeaturedPosts();
    
    console.log(`✅ Blog carregado: ${publishedPosts.length} posts`);
  }
  
  /**
   * Obtém todos os posts
   * @returns {Array} Array de posts
   */
  function getAllPosts() {
    return allPosts.filter(p => p.published);
  }
  
  /**
   * Obtém categorias
   * @returns {Array} Array de categorias
   */
  function getCategories() {
    return categories;
  }
  
  // ==================== API PÚBLICA ====================
  
  return {
    init,
    getAllPosts,
    getCategories,
    renderPosts
  };
})();

// Tornar disponível globalmente
window.BlogLoader = BlogLoader;