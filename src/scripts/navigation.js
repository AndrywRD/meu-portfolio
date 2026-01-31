/**
 * MÓDULO: Navegação
 * Responsabilidade: Gerenciar comportamento do menu
 * Princípio SRP: Apenas lógica de navegação
 */

class Navigation {
  constructor() {
    this.mobileMenuBtn = null;
    this.mobileMenu = null;
    this.navLinks = null;
    this.init();
  }

  /**
   * Inicializa o módulo
   */
  init() {
    // Aguarda DOM estar pronto
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  /**
   * Configura elementos e listeners
   */
  setup() {
    this.cacheElements();
    this.attachEventListeners();
    this.setActivePage();
  }

  /**
   * Cache de elementos DOM (performance)
   */
  cacheElements() {
    this.mobileMenuBtn = document.getElementById('mobile-menu-btn');
    this.mobileMenu = document.getElementById('mobile-menu');
    this.navLinks = document.querySelectorAll('.nav-link');
  }

  /**
   * Anexa event listeners - COM SUPORTE A TOUCH
   */
  attachEventListeners() {
    if (!this.mobileMenuBtn || !this.mobileMenu) return;

    // Toggle menu mobile - suporte a click e touch
    const handleToggle = (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.toggleMobileMenu();
    };

    this.mobileMenuBtn.addEventListener('click', handleToggle);
    this.mobileMenuBtn.addEventListener('touchend', handleToggle);

    // Fechar menu ao clicar/tocar fora
    const handleOutside = (e) => this.handleOutsideClick(e);
    document.addEventListener('click', handleOutside);
    document.addEventListener('touchend', handleOutside);

    // Fechar menu ao clicar em link
    const mobileLinks = this.mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => this.closeMobileMenu());
      link.addEventListener('touchend', () => this.closeMobileMenu());
    });

    // Smooth scroll para âncoras
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => this.handleAnchorClick(e));
    });
  }

  /**
   * Toggle do menu mobile
   */
  toggleMobileMenu() {
    this.mobileMenu.classList.toggle('active');
    
    // Acessibilidade: atualizar aria-expanded
    const isExpanded = this.mobileMenu.classList.contains('active');
    this.mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
  }

  /**
   * Fecha menu mobile
   */
  closeMobileMenu() {
    this.mobileMenu.classList.remove('active');
    this.mobileMenuBtn.setAttribute('aria-expanded', 'false');
  }

  /**
   * Fecha menu ao clicar fora
   */
  handleOutsideClick(event) {
    if (!this.mobileMenuBtn || !this.mobileMenu) return;

    const isClickInside = this.mobileMenuBtn.contains(event.target) || 
                          this.mobileMenu.contains(event.target);
    
    if (!isClickInside && this.mobileMenu.classList.contains('active')) {
      this.closeMobileMenu();
    }
  }

  /**
   * Smooth scroll para âncoras
   */
  handleAnchorClick(event) {
    const href = event.currentTarget.getAttribute('href');
    
    // Verifica se é âncora na mesma página
    if (href.startsWith('#') && href.length > 1) {
      event.preventDefault();
      
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Atualizar URL sem reload
        history.pushState(null, '', href);
      }
    }
  }

  /**
   * Define página ativa no menu
   */
  setActivePage() {
    if (!this.navLinks.length) return;

    const currentPath = window.location.pathname;
    
    this.navLinks.forEach(link => {
      const linkPath = new URL(link.href).pathname;
      
      // Marcar como ativo se caminhos coincidirem
      if (linkPath === currentPath || 
          (currentPath === '/' && linkPath.includes('index.html'))) {
        link.classList.add('active', 'text-indigo-400', 'font-medium');
        link.classList.remove('text-zinc-400');
      }
    });
  }

  /**
   * Adiciona indicador de scroll (header transparente -> sólido)
   */
  enableScrollEffect() {
    const header = document.querySelector('header');
    if (!header) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      lastScroll = currentScroll;
    });
  }
}

// Inicializar módulo
const navigation = new Navigation();

// Exportar para uso em outros módulos (se necessário)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Navigation;
}
