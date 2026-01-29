const fs = require('fs');
const path = require('path');

/**
 * Sistema de Build Completo - Portfolio + Blog
 * Responsabilidade: Injetar componentes HTML em páginas e processar blog
 * Princípio SRP: Cada função tem uma responsabilidade única
 * 
 * Integração com:
 * - build-blog.js (processamento de Markdown)
 * - build-sitemap.js (geração de sitemap.xml)
 */

class PortfolioBuildSystem {
  constructor() {
    this.componentsDir = path.join(__dirname, 'src', 'components');
    this.pagesDir = path.join(__dirname, 'pages');
    this.distDir = path.join(__dirname, 'dist');
    this.components = new Map();
  }

  /**
   * Carrega todos os componentes da pasta src/components
   * Agora inclui componentes do blog também
   */
  loadComponents() {
    console.log('📦 Carregando componentes...');
    
    const componentFiles = [
      'navigation.html',
      'footer.html',
      'project-card.html'
    ];

    // Carregar componentes principais
    componentFiles.forEach(file => {
      const componentPath = path.join(this.componentsDir, file);
      if (fs.existsSync(componentPath)) {
        const content = fs.readFileSync(componentPath, 'utf-8');
        const componentName = file.replace('.html', '');
        this.components.set(componentName, content);
        console.log(`  ✓ ${componentName}`);
      }
    });

    // Carregar componentes do blog (se existirem)
    const blogComponentsDir = path.join(this.componentsDir, 'blog');
    if (fs.existsSync(blogComponentsDir)) {
      const blogComponentFiles = fs.readdirSync(blogComponentsDir);
      
      blogComponentFiles.forEach(file => {
        if (file.endsWith('.html')) {
          const componentPath = path.join(blogComponentsDir, file);
          const content = fs.readFileSync(componentPath, 'utf-8');
          const componentName = 'blog/' + file.replace('.html', '');
          this.components.set(componentName, content);
          console.log(`  ✓ ${componentName}`);
        }
      });
    }
  }

  /**
   * Processa uma página, substituindo <!-- @include component-name -->
   * Suporta componentes aninhados (ex: blog/blog-header)
   */
  processPage(htmlContent, pagePath) {
    let processed = htmlContent;

    // Regex para encontrar <!-- @include component-name --> ou <!-- @include blog/component-name -->
    const includeRegex = /<!--\s*@include\s+([\w\/-]+)\s*-->/g;
    
    processed = processed.replace(includeRegex, (match, componentName) => {
      const component = this.components.get(componentName);
      
      if (component) {
        console.log(`  ✓ Incluindo ${componentName} em ${pagePath}`);
        return component;
      } else {
        console.warn(`  ⚠ Componente não encontrado: ${componentName}`);
        return match;
      }
    });

    return processed;
  }

  /**
   * Cria estrutura de diretórios se não existir
   */
  ensureDir(dir) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  /**
   * Copia arquivo mantendo estrutura de pastas
   */
  copyFile(source, dest) {
    this.ensureDir(path.dirname(dest));
    fs.copyFileSync(source, dest);
  }

  /**
   * Processa todos os arquivos HTML
   */
  buildPages() {
    console.log('\n🔨 Construindo páginas...');

    const processDirectory = (dir, relativeDir = '') => {
      const items = fs.readdirSync(dir);

      items.forEach(item => {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          // Recursivamente processar subdiretórios
          processDirectory(fullPath, path.join(relativeDir, item));
        } else if (item.endsWith('.html')) {
          // Processar arquivo HTML
          const htmlContent = fs.readFileSync(fullPath, 'utf-8');
          const processed = this.processPage(htmlContent, path.join(relativeDir, item));
          
          // Salvar em dist/
          const destPath = path.join(this.distDir, relativeDir, item);
          this.ensureDir(path.dirname(destPath));
          fs.writeFileSync(destPath, processed, 'utf-8');
          console.log(`  ✓ ${path.join(relativeDir, item)}`);
        }
      });
    };

    // Processar raiz
    ['index.html', 'about.html', 'contact.html'].forEach(file => {
      const filePath = path.join(__dirname, file);
      if (fs.existsSync(filePath)) {
        const htmlContent = fs.readFileSync(filePath, 'utf-8');
        const processed = this.processPage(htmlContent, file);
        const destPath = path.join(this.distDir, file);
        fs.writeFileSync(destPath, processed, 'utf-8');
        console.log(`  ✓ ${file}`);
      }
    });

    // Processar pages/
    if (fs.existsSync(this.pagesDir)) {
      processDirectory(this.pagesDir, 'pages');
    }
  }

  /**
   * Copia assets (CSS, JS, imagens)
   */
  copyAssets() {
    console.log('\n📁 Copiando assets...');

    const assetDirs = ['src/styles', 'src/scripts', 'src/assets'];

    assetDirs.forEach(dir => {
      const fullDir = path.join(__dirname, dir);
      if (fs.existsSync(fullDir)) {
        const destDir = path.join(this.distDir, dir);
        this.copyDirectoryRecursive(fullDir, destDir);
      }
    });
  }

  /**
   * Copia conteúdo do blog (posts.json e outros metadados)
   */
  copyBlogContent() {
    console.log('\n📝 Copiando conteúdo do blog...');

    const contentDir = path.join(__dirname, 'content');
    if (fs.existsSync(contentDir)) {
      const destContentDir = path.join(this.distDir, 'content');
      this.copyDirectoryRecursive(contentDir, destContentDir);
    }
  }

  /**
   * Copia diretório recursivamente
   */
  copyDirectoryRecursive(source, dest) {
    this.ensureDir(dest);
    const items = fs.readdirSync(source);

    items.forEach(item => {
      const sourcePath = path.join(source, item);
      const destPath = path.join(dest, item);
      const stat = fs.statSync(sourcePath);

      if (stat.isDirectory()) {
        this.copyDirectoryRecursive(sourcePath, destPath);
      } else {
        this.copyFile(sourcePath, destPath);
        console.log(`  ✓ ${path.relative(__dirname, destPath)}`);
      }
    });
  }

  /**
   * Limpa diretório dist/
   */
  clean() {
    console.log('🧹 Limpando dist/...');
    if (fs.existsSync(this.distDir)) {
      fs.rmSync(this.distDir, { recursive: true, force: true });
    }
    this.ensureDir(this.distDir);
  }

  /**
   * Executa build do blog (se build-blog.js existir)
   */
  async buildBlog() {
    const buildBlogPath = path.join(__dirname, 'build-blog.js');
    
    if (fs.existsSync(buildBlogPath)) {
      console.log('\n📚 Executando build do blog...');
      
      try {
        const { buildBlog } = require('./build-blog.js');
        buildBlog();
        console.log('  ✓ Blog processado com sucesso');
      } catch (error) {
        console.error('  ✗ Erro ao processar blog:', error.message);
        console.log('  ℹ Continuando build sem o blog...');
      }
    } else {
      console.log('\n📚 Build do blog não encontrado (opcional)');
      console.log('  ℹ Para adicionar blog, crie build-blog.js');
    }
  }

  /**
   * Gera sitemap.xml (se build-sitemap.js existir)
   */
  async generateSitemap() {
    const buildSitemapPath = path.join(__dirname, 'build-sitemap.js');
    
    if (fs.existsSync(buildSitemapPath)) {
      console.log('\n🗺️  Gerando sitemap.xml...');
      
      try {
        const { generateSitemap } = require('./build-sitemap.js');
        generateSitemap();
        console.log('  ✓ Sitemap gerado com sucesso');
      } catch (error) {
        console.error('  ✗ Erro ao gerar sitemap:', error.message);
        console.log('  ℹ Continuando build sem sitemap...');
      }
    } else {
      console.log('\n🗺️  Build de sitemap não encontrado (opcional)');
    }
  }

  /**
   * Copia robots.txt para dist/ (se existir)
   */
  copyRobotsTxt() {
    const robotsPath = path.join(__dirname, 'robots.txt');
    const distRobotsPath = path.join(this.distDir, 'robots.txt');
    
    if (fs.existsSync(robotsPath)) {
      console.log('\n🤖 Copiando robots.txt...');
      fs.copyFileSync(robotsPath, distRobotsPath);
      console.log('  ✓ robots.txt copiado');
    }
  }

  /**
   * Exibe estatísticas do build
   */
  displayStats() {
    console.log('\n📊 Estatísticas do Build:');
    
    // Contar arquivos HTML
    const htmlFiles = this.countFilesByExtension(this.distDir, '.html');
    console.log(`  • Páginas HTML: ${htmlFiles}`);
    
    // Contar arquivos CSS
    const cssFiles = this.countFilesByExtension(this.distDir, '.css');
    console.log(`  • Arquivos CSS: ${cssFiles}`);
    
    // Contar arquivos JS
    const jsFiles = this.countFilesByExtension(this.distDir, '.js');
    console.log(`  • Arquivos JS: ${jsFiles}`);
    
    // Tamanho total
    const totalSize = this.getDirectorySize(this.distDir);
    const sizeInMB = (totalSize / (1024 * 1024)).toFixed(2);
    console.log(`  • Tamanho total: ${sizeInMB} MB`);
  }

  /**
   * Conta arquivos por extensão
   */
  countFilesByExtension(dir, extension) {
    let count = 0;
    
    const countInDir = (currentDir) => {
      if (!fs.existsSync(currentDir)) return;
      
      const items = fs.readdirSync(currentDir);
      
      items.forEach(item => {
        const fullPath = path.join(currentDir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          countInDir(fullPath);
        } else if (item.endsWith(extension)) {
          count++;
        }
      });
    };
    
    countInDir(dir);
    return count;
  }

  /**
   * Calcula tamanho de diretório
   */
  getDirectorySize(dir) {
    let size = 0;
    
    const calculateSize = (currentDir) => {
      if (!fs.existsSync(currentDir)) return;
      
      const items = fs.readdirSync(currentDir);
      
      items.forEach(item => {
        const fullPath = path.join(currentDir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          calculateSize(fullPath);
        } else {
          size += stat.size;
        }
      });
    };
    
    calculateSize(dir);
    return size;
  }

  /**
   * Executa build completo (Portfolio + Blog)
   */
  async build() {
    console.log('🚀 Iniciando build completo...\n');
    console.log('================================================');
    
    const startTime = Date.now();
    
    try {
      // 1. Limpar dist/
      this.clean();
      
      // 2. Carregar componentes
      this.loadComponents();
      
      // 3. Construir páginas HTML
      this.buildPages();
      
      // 4. Copiar assets
      this.copyAssets();
      
      // 5. Build do blog (opcional)
      await this.buildBlog();
      
      // 6. Copiar conteúdo do blog
      this.copyBlogContent();
      
      // 7. Gerar sitemap (opcional)
      await this.generateSitemap();
      
      // 8. Copiar robots.txt (opcional)
      this.copyRobotsTxt();
      
      // 9. Exibir estatísticas
      this.displayStats();
      
      const endTime = Date.now();
      const duration = ((endTime - startTime) / 1000).toFixed(2);
      
      console.log('\n================================================');
      console.log('✅ Build concluído com sucesso!');
      console.log(`⏱️  Tempo de build: ${duration}s`);
      console.log(`📦 Arquivos gerados em: ${this.distDir}`);
      console.log('================================================\n');
      
    } catch (error) {
      console.error('\n❌ Erro durante o build:', error);
      console.error(error.stack);
      process.exit(1);
    }
  }
}

// ============================================
// EXECUÇÃO
// ============================================

if (require.main === module) {
  const builder = new PortfolioBuildSystem();
  builder.build();
}

module.exports = PortfolioBuildSystem;