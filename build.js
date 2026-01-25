const fs = require('fs');
const path = require('path');

/**
 * Sistema de Build Simples
 * Responsabilidade: Injetar componentes HTML em páginas
 * Princípio SRP: Cada função tem uma responsabilidade única
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
   */
  loadComponents() {
    console.log('📦 Carregando componentes...');
    
    const componentFiles = [
      'navigation.html',
      'footer.html',
      'project-card.html'
    ];

    componentFiles.forEach(file => {
      const componentPath = path.join(this.componentsDir, file);
      if (fs.existsSync(componentPath)) {
        const content = fs.readFileSync(componentPath, 'utf-8');
        const componentName = file.replace('.html', '');
        this.components.set(componentName, content);
        console.log(`  ✓ ${componentName}`);
      }
    });
  }

  /**
   * Processa uma página, substituindo <!-- @include component-name -->
   */
  processPage(htmlContent, pagePath) {
    let processed = htmlContent;

    // Regex para encontrar <!-- @include component-name -->
    const includeRegex = /<!--\s*@include\s+([a-z-]+)\s*-->/g;
    
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
   * Executa build completo
   */
  build() {
    console.log('🚀 Iniciando build do portfólio...\n');
    
    this.clean();
    this.loadComponents();
    this.buildPages();
    this.copyAssets();
    
    console.log('\n✅ Build concluído com sucesso!');
    console.log(`📦 Arquivos gerados em: ${this.distDir}`);
  }
}

// Executar build
if (require.main === module) {
  const builder = new PortfolioBuildSystem();
  builder.build();
}

module.exports = PortfolioBuildSystem;