/**
 * Blog Category Loader
 * Carrega posts de uma categoria específica
 */

const BlogCategoryLoader = (function() {
  const METADATA_URL = '/content/metadata/posts.json';
  
  function getCategoryFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('category');
  }
  
  async function fetchMetadata() {
    try {
      const response = await fetch(METADATA_URL);
      if (!response.ok) throw new Error('Falha ao carregar metadados');
      return await response.json();
    } catch (error) {
      console.error('Erro:', error);
      return { posts: [], categories: [] };
    }
  }
  
  function formatDate(dateString) {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
  }
  
  function renderPostCard(post) {
    const tagsHTML = post.tags.map(tag => 
      `<span class="px-2 py-1 rounded text-xs bg-zinc-700/50 text-zinc-400">#${tag}</span>`
    ).join('');
    
    return `
      <article class="blog-card group cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl" onclick="window.location.href='/pages/blog/post.html?slug=${post.slug}'">
        <div class="overflow-hidden rounded-t-lg h-48 bg-zinc-800">
          <img src="${post.coverImage}" alt="${post.title}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" loading="lazy" onerror="this.src='/src/assets/blog/covers/default.jpg'">
        </div>
        <div class="p-6 bg-zinc-800/50 backdrop-blur rounded-b-lg">
          <div class="flex items-center gap-4 mb-3 text-sm text-zinc-400">
            <time datetime="${post.date}">${formatDate(post.date)}</time>
            <span>${post.readTime}</span>
          </div>
          <h3 class="text-2xl font-bold text-zinc-50 mb-3 group-hover:text-indigo-400 transition-colors">${post.title}</h3>
          <p class="text-zinc-300 mb-4 line-clamp-3">${post.description}</p>
          <div class="flex flex-wrap gap-2">
            <span class="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">${post.category}</span>
            ${tagsHTML}
          </div>
        </div>
      </article>
    `;
  }
  
  async function init() {
    const categorySlug = getCategoryFromURL();
    
    if (!categorySlug) {
      window.location.href = '/pages/blog/index.html';
      return;
    }
    
    const metadata = await fetchMetadata();
    const category = metadata.categories.find(c => c.slug === categorySlug);
    
    if (!category) {
      alert('Categoria não encontrada');
      window.location.href = '/pages/blog/index.html';
      return;
    }
    
    document.title = `${category.name} - Blog Andryw Ruhan`;
    document.getElementById('category-title').content = document.title;
    document.getElementById('category-description').content = category.description;
    document.getElementById('breadcrumb-category').textContent = category.name;
    document.getElementById('category-main-title').textContent = category.name;
    document.getElementById('category-description-text').textContent = category.description;
    
    const categoryPosts = metadata.posts
      .filter(p => p.published && p.category === category.name)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    
    document.getElementById('category-post-count').textContent = categoryPosts.length;
    
    const grid = document.getElementById('category-posts-grid');
    const emptyState = document.getElementById('empty-state');
    
    if (categoryPosts.length === 0) {
      grid.innerHTML = '';
      emptyState.classList.remove('hidden');
    } else {
      emptyState.classList.add('hidden');
      grid.innerHTML = categoryPosts.map(renderPostCard).join('');
    }
    
    console.log(`✅ Categoria carregada: ${category.name} (${categoryPosts.length} posts)`);
  }
  
  return { init };
})();

window.BlogCategoryLoader = BlogCategoryLoader;