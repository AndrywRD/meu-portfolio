/**
 * Blog Search
 * Sistema de busca e filtros para posts
 */

const BlogSearch = (function() {
  // ==================== ESTADO ====================
  let activeFilters = {
    query: '',
    category: null,
    tag: null
  };
  
  // ==================== FUNÇÕES PRIVADAS ====================
  
  function normalizeText(text) {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }
  
  function matchesFilters(post) {
    // Filtro de query
    if (activeFilters.query) {
      const query = normalizeText(activeFilters.query);
      const title = normalizeText(post.title);
      const description = normalizeText(post.description);
      const tags = post.tags.map(t => normalizeText(t)).join(' ');
      
      const matches = 
        title.includes(query) || 
        description.includes(query) ||
        tags.includes(query);
      
      if (!matches) return false;
    }
    
    // Filtro de categoria
    if (activeFilters.category && post.category !== activeFilters.category) {
      return false;
    }
    
    // Filtro de tag
    if (activeFilters.tag && !post.tags.includes(activeFilters.tag)) {
      return false;
    }
    
    return true;
  }
  
  function applyFilters() {
    const allPosts = window.BlogLoader.getAllPosts();
    const filteredPosts = allPosts.filter(matchesFilters);
    
    window.BlogLoader.renderPosts(filteredPosts);
    renderActiveFilters();
    
    console.log(`🔍 Busca: ${filteredPosts.length} de ${allPosts.length} posts`);
  }
  
  function renderActiveFilters() {
    const container = document.getElementById('active-filters');
    if (!container) return;
    
    const filters = [];
    
    if (activeFilters.query) {
      filters.push(`
        <div class="filter-badge flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-500/20 text-indigo-300 text-sm">
          <span>Busca: "${activeFilters.query}"</span>
          <button onclick="BlogSearch.clearQuery()" class="hover:text-indigo-100">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      `);
    }
    
    if (activeFilters.category) {
      filters.push(`
        <div class="filter-badge flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-300 text-sm">
          <span>Categoria: ${activeFilters.category}</span>
          <button onclick="BlogSearch.clearCategory()" class="hover:text-blue-100">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      `);
    }
    
    if (activeFilters.tag) {
      filters.push(`
        <div class="filter-badge flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-500/20 text-purple-300 text-sm">
          <span>Tag: #${activeFilters.tag}</span>
          <button onclick="BlogSearch.clearTag()" class="hover:text-purple-100">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      `);
    }
    
    if (filters.length > 0) {
      filters.push(`
        <button onclick="BlogSearch.clearAll()" class="px-3 py-1.5 rounded-lg bg-zinc-700 text-zinc-300 hover:bg-zinc-600 text-sm transition-colors">
          Limpar todos
        </button>
      `);
    }
    
    container.innerHTML = filters.join('');
  }
  
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  // ==================== FUNÇÕES PÚBLICAS ====================
  
  function init() {
    const searchInput = document.getElementById('blog-search-input');
    
    if (searchInput) {
      const debouncedSearch = debounce((query) => {
        activeFilters.query = query;
        applyFilters();
      }, 300);
      
      searchInput.addEventListener('input', (e) => {
        debouncedSearch(e.target.value);
      });
    }
    
    console.log('✅ Sistema de busca inicializado');
  }
  
  function filterByCategory(category) {
    activeFilters.category = category;
    applyFilters();
  }
  
  function filterByTag(tag) {
    activeFilters.tag = tag;
    applyFilters();
  }
  
  function clearQuery() {
    activeFilters.query = '';
    const searchInput = document.getElementById('blog-search-input');
    if (searchInput) searchInput.value = '';
    applyFilters();
  }
  
  function clearCategory() {
    activeFilters.category = null;
    applyFilters();
  }
  
  function clearTag() {
    activeFilters.tag = null;
    applyFilters();
  }
  
  function clearAll() {
    activeFilters = {
      query: '',
      category: null,
      tag: null
    };
    
    const searchInput = document.getElementById('blog-search-input');
    if (searchInput) searchInput.value = '';
    
    applyFilters();
  }
  
  return {
    init,
    filterByCategory,
    filterByTag,
    clearQuery,
    clearCategory,
    clearTag,
    clearAll
  };
})();

window.BlogSearch = BlogSearch;