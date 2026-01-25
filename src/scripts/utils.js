/**
 * MÓDULO: Utilitários
 * Responsabilidade: Funções auxiliares reutilizáveis
 * Princípio: Funções puras e independentes
 */

const Utils = {
  /**
   * Debounce: Limita frequência de execução de função
   * Uso: Scroll, resize, input
   */
  debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  /**
   * Throttle: Garante execução máxima a cada X ms
   * Uso: Scroll events, animações
   */
  throttle(func, limit = 300) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  /**
   * Verifica se elemento está visível no viewport
   * Uso: Lazy loading, animações ao scroll
   */
  isInViewport(element, offset = 0) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 - offset &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  /**
   * Intersection Observer wrapper
   * Uso: Animações ao scroll, lazy loading
   */
  observeElements(selector, callback, options = {}) {
    const defaultOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { ...defaultOptions, ...options });

    document.querySelectorAll(selector).forEach(el => observer.observe(el));
    
    return observer;
  },

  /**
   * Smooth scroll para elemento
   */
  scrollToElement(elementOrSelector, offset = 0) {
    const element = typeof elementOrSelector === 'string' 
      ? document.querySelector(elementOrSelector)
      : elementOrSelector;

    if (!element) return;

    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  },

  /**
   * Copia texto para clipboard
   */
  async copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.error('Erro ao copiar:', err);
      return false;
    }
  },

  /**
   * Formata data para locale PT-BR
   */
  formatDate(date, options = {}) {
    const defaultOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    
    return new Date(date).toLocaleDateString('pt-BR', { ...defaultOptions, ...options });
  },

  /**
   * Sanitiza string HTML (previne XSS)
   */
  escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  },

  /**
   * Trunca texto com elipses
   */
  truncate(text, length = 100, suffix = '...') {
    if (text.length <= length) return text;
    return text.substring(0, length).trim() + suffix;
  },

  /**
   * Gera ID único
   */
  generateId(prefix = 'id') {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  },

  /**
   * Verifica se device é mobile
   */
  isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  },

  /**
   * Verifica se está em modo dark (sistema)
   */
  prefersDarkMode() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  },

  /**
   * Local Storage wrapper com try/catch
   */
  storage: {
    get(key, defaultValue = null) {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
      } catch (err) {
        console.error('Erro ao ler localStorage:', err);
        return defaultValue;
      }
    },

    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (err) {
        console.error('Erro ao salvar localStorage:', err);
        return false;
      }
    },

    remove(key) {
      try {
        localStorage.removeItem(key);
        return true;
      } catch (err) {
        console.error('Erro ao remover localStorage:', err);
        return false;
      }
    },

    clear() {
      try {
        localStorage.clear();
        return true;
      } catch (err) {
        console.error('Erro ao limpar localStorage:', err);
        return false;
      }
    }
  },

  /**
   * Delay/sleep assíncrono
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  /**
   * Retry com exponential backoff
   */
  async retry(fn, maxAttempts = 3, delay = 1000) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await fn();
      } catch (err) {
        if (attempt === maxAttempts) throw err;
        await this.sleep(delay * attempt);
      }
    }
  }
};

// Exportar
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Utils;
}

// Disponibilizar globalmente
window.Utils = Utils;