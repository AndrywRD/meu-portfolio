/**
 * MÓDULO: Navegação
 * Responsabilidade: Gerenciar comportamento do menu
 * Princípio SRP: Apenas lógica de navegação
 * VERSÃO CORRIGIDA: Garantia de carregamento do DOM
 */

class Navigation {
  constructor() {
    this.mobileMenuBtn = null;
    this.mobileMenu = null;
    this.navLinks = null;
    this.init();
  }

  /**
   * Inicializa o módulo - VERSÃO CORRIGIDA
   */
  init() {
    // Função de inicialização
    const initialize = () => {
      console.log('🚀 Inicializando Navigation...');
      this.setup();
      console.log('✅ Navigation inicializado com sucesso!');
    };

    // Garante que DOM está pronto
    if (document.readyState === 'loading') {
      console.log('⏳ Aguardando DOM...');
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initialize, 50);
      });
    } else {
      console.log('✅ DOM já carregado');
      setTimeout(initialize, 50);
    }
  }

  /**
   * Configura elementos e listeners
   */
  setup() {
    this.cacheElements();
    
    // Verifica se elementos existem
    if (!this.mobileMenuBtn || !this.mobileMenu) {
      console.error('❌ Elementos do menu não encontrados!', {
        button: this.mobileMenuBtn,
        menu: this.mobileMenu
      });
      return;
    }
    
    console.log('✅ Elementos encontrados:', {
      button: !!this.mobileMenuBtn,
      menu: !!this.mobileMenu
    });
    
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
    
    console.log('📦 Elementos cacheados:', {
      button: !!this.mobileMenuBtn,
      menu: !!this.mobileMenu,
      linksCount: this.navLinks.length
    });
  }

  /**
   * Anexa event listeners - COM SUPORTE A TOUCH
   */
  attachEventListeners() {
    if (!this.mobileMenuBtn || !this.mobileMenu) {
      console.error('❌ Não foi possível anexar listeners - elementos não existem');
      return;
    }

    console.log('🔗 Anexando event listeners...');

    // Toggle menu mobile - suporte a click e touch
    const handleToggle = (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('🎯 Toggle acionado!');
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

    console.log('✅ Event listeners anexados com sucesso!');
  }

  /**
   * Toggle do menu mobile
   */
  toggleMobileMenu() {
    this.mobileMenu.classList.toggle('active');
    
    const isExpanded = this.mobileMenu.classList.contains('active');
    console.log('📱 Menu toggled:', isExpanded ? 'ABERTO' : 'FECHADO');
    
    // Acessibilidade: atualizar aria-expanded
    this.mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
  }

  /**
   * Fecha menu mobile
   */
  closeMobileMenu() {
    console.log('🔒 Fechando menu...');
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

// GARANTIR que só inicializa após DOM estar pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 DOMContentLoaded disparado, criando Navigation...');
    window.navigation = new Navigation();
  });
} else {
  console.log('📄 DOM já estava pronto, criando Navigation...');
  window.navigation = new Navigation();
}

// Exportar para uso em outros módulos (se necessário)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Navigation;
}
