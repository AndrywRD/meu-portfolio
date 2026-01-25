#  Portfólio - Andryw Ruhan

> Portfólio pessoal desenvolvido com arquitetura modular, componentes reutilizáveis e boas práticas de engenharia de software.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://andrywruhan.dev)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Made with](https://img.shields.io/badge/made%20with-HTML%20%7C%20CSS%20%7C%20JS-orange)]()

![Portfolio Preview](./preview.png)

---

##  Sobre o Projeto

Portfólio profissional construído do zero com foco em **escalabilidade**, **manutenibilidade** e **performance**. 

Este projeto demonstra não apenas minhas habilidades técnicas, mas também minha capacidade de:
-  Arquitetar soluções modulares e escaláveis
-  Aplicar princípios SOLID no frontend
-  Escrever código limpo, documentado e reutilizável
-  Criar sistemas de build customizados
-  Organizar projetos com padrões profissionais

---

##  Features

###  Arquitetura
- **Sistema de componentes** sem frameworks pesados
- **Build system customizado** em Node.js
- **Componentização via includes** (`@include component-name`)
- **CSS organizado** com variáveis e design tokens
- **JavaScript modular** com classes e padrões OOP

###  Design
- Interface moderna e responsiva
- Animações suaves e performáticas
- Paleta de cores consistente
- Tipografia hierárquica
- Mobile-first approach

###  Performance
- CSS externo com cache otimizado
- Lazy loading de recursos
- Animações GPU-accelerated
- Código minificado em produção

###  Acessibilidade
- Semântica HTML5 correta
- ARIA labels onde necessário
- Contraste AA/AAA
- Navegação por teclado
- Suporte a `prefers-reduced-motion`

---

##  Tecnologias

### Core
- **HTML5** - Estrutura semântica
- **CSS3** - Estilos customizados + Tailwind CDN
- **JavaScript (ES6+)** - Lógica e interatividade

### Build & Tools
- **Node.js** - Sistema de build customizado
- **npm** - Gerenciamento de dependências
- **Live Server** - Desenvolvimento local

### Princípios Aplicados
- **SOLID** - Single Responsibility, Open/Closed, Dependency Inversion
- **DRY** - Don't Repeat Yourself
- **Clean Code** - Funções pequenas, nomes descritivos
- **OOP** - Programação Orientada a Objetos
- **Component-Based Architecture** - Componentes reutilizáveis

---

##  Estrutura do Projeto

```
portfolio/
├── src/                        # Código fonte
│   ├── components/             # Componentes reutilizáveis
│   │___├── navigation.html     # Header/Menu
│   │___├── footer.html         # Rodapé
│   ├── styles/                 # Estilos organizados
│   │   ├── main.css            # Estilos base + variáveis
│   │   └── animations.css      # Animações e efeitos
│   ├── scripts/                # JavaScript modular
│   │   ├── navigation.js       # Lógica de navegação
│   │   └── utils.js            # Funções auxiliares
│   └── assets/                 # Imagens, ícones
├── pages/                      # Páginas do site
│   |── projects/               # Páginas de projetos
│       ├── index.html          # Lista de projetos
│       ├── discord-bot.html    # Projeto 1
│       └── subita-studio.html  # Projeto 2
│                               # Sobre mim
├── dist/                       # Build de produção (gerado)
├── build.js                    # Sistema de build
├── package.json                # Configuração do projeto
├── index.html                  # Página inicial
└── README.md                   # Este arquivo
|__contact.html                 # Página de contato
|__about.html                   # Página sobre
```

---

##  Como Executar

### Pré-requisitos
- Node.js (v14+)
- npm ou yarn

### Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/andrywRD/portfolio.git
cd portfolio

# 2. Instale as dependências
npm install

# 3. Execute o build
npm run build

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

O site estará disponível em `http://localhost:8080`

### Scripts Disponíveis

```bash
npm run build    # Gera pasta dist/ otimizada
npm run dev      # Build + servidor local
npm run clean    # Remove pasta dist/
```

---

##  Sistema de Componentes

### Como Funciona

O sistema de build customizado permite reutilizar componentes HTML em múltiplas páginas:

**1. Criar componente** (`src/components/navigation.html`)
```html
<header>
  <nav>...</nav>
</header>
```

**2. Incluir em páginas** (`index.html`)
```html
<!DOCTYPE html>
<html>
<body>
  <!-- @include navigation -->
  <main>Conteúdo</main>
  <!-- @include footer -->
</body>
</html>
```

**3. Build processa automaticamente**
```bash
npm run build
# Gera dist/index.html com componentes injetados
```

### Benefícios
-  **Zero duplicação**: Header/Footer em 1 arquivo cada
-  **Manutenção fácil**: Mudar navbar = editar 1 arquivo
-  **Consistência garantida**: Impossível ter versões diferentes
-  **Escalável**: Adicionar página = 2 linhas de código

---

##  Design System

### Paleta de Cores

```css
/* Core Colors */
--color-bg-primary: #09090b;      /* Zinc-950 */
--color-bg-secondary: #18181b;     /* Zinc-900 */
--color-text-primary: #fafafa;     /* Zinc-50 */
--color-accent-primary: #6366f1;   /* Indigo-500 */

/* Uso */
background-color: var(--color-bg-primary);
```

### Tipografia

```css
/* Headings */
h1: 3.75rem (60px) - Bold
h2: 3rem (48px) - Bold
h3: 1.875rem (30px) - Semibold

/* Body */
p: 1rem (16px) - Regular
small: 0.875rem (14px) - Regular
```

### Espaçamento

```css
/* Sistema baseado em múltiplos de 4px */
--spacing-xs: 0.25rem;   /* 4px */
--spacing-sm: 0.5rem;    /* 8px */
--spacing-md: 1rem;      /* 16px */
--spacing-lg: 1.5rem;    /* 24px */
--spacing-xl: 2rem;      /* 32px */
--spacing-2xl: 3rem;     /* 48px */
```

---

##  Responsividade

### Breakpoints

```css
/* Mobile First */
Base: 0px - 767px (mobile)
md: 768px+ (tablet)
lg: 1024px+ (desktop)
xl: 1280px+ (large desktop)
```

### Abordagem

- Layout fluído com Grid/Flexbox
- Imagens responsivas
- Menu mobile hamburger
- Font size adaptativo
- Touch targets adequados (44px mínimo)

---

##  Acessibilidade

### Checklist Implementado

- [x] Semântica HTML5 (`<header>`, `<main>`, `<footer>`, `<article>`)
- [x] Hierarquia de headings (apenas 1 `<h1>` por página)
- [x] ARIA labels em botões e navegação
- [x] Alt text descritivo em imagens
- [x] Contraste mínimo AA (4.5:1 para texto)
- [x] Navegação por teclado funcional
- [x] Foco visível em elementos interativos
- [x] Redução de movimento (`prefers-reduced-motion`)

### Lighthouse Score

```
Performance: 95+
Accessibility: 100
Best Practices: 95+
SEO: 100
```

---

##  Customização

### Adicionar Nova Página

```bash
# 1. Criar arquivo em pages/
touch pages/nova-pagina.html

# 2. Usar componentes
<!-- @include navigation -->
<main>Conteúdo</main>
<!-- @include footer -->

# 3. Build
npm run build
```

### Criar Novo Componente

```bash
# 1. Criar em src/components/
touch src/components/meu-componente.html

# 2. Usar em páginas
<!-- @include meu-componente -->

# 3. Build reconhece automaticamente
npm run build
```

### Modificar Estilos

```css
/* src/styles/main.css */
/* Editar variáveis CSS */
:root {
  --color-accent-primary: #8b5cf6; /* Nova cor */
}
```

---

##  Métricas do Código

### Antes da Refatoração
```
Linhas duplicadas: ~1.190
Arquivos com código repetido: 6
Manutenibilidade: Baixa
```

### Depois da Refatoração
```
Linhas únicas: ~140
Componentes reutilizáveis: 5+
Redução de duplicação: 88%
Manutenibilidade: Alta
```

---

##  Conceitos Demonstrados

### SOLID Principles
- **Single Responsibility**: Cada módulo/função tem 1 responsabilidade
- **Open/Closed**: Componentes extensíveis via props
- **Dependency Inversion**: Páginas dependem de abstrações (componentes)

### Design Patterns
- **Template Method**: Sistema de build
- **Singleton**: Instância única de classes
- **Module Pattern**: Scripts encapsulados

### Clean Code
- Funções pequenas e focadas
- Nomes descritivos (sem ambiguidade)
- Comentários úteis (não redundantes)
- DRY (Don't Repeat Yourself)
- KISS (Keep It Simple, Stupid)


##  Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

##  Autor

**Andryw Ruhan**

- GitHub: [@andrywRD](https://github.com/andrywRD)
- LinkedIn: [Andryw Ruhan](https://linkedin.com/in/andryw-ruhan)
- Email: andrywruhandavid@gmail.com
- Portfolio: [andrywruhan.dev](https://andrywruhan.dev)


##  Notas Técnicas

### Por Que Não Usar React/Vue/Angular?

Este projeto demonstra que **nem sempre precisamos de frameworks pesados**. 

Com vanilla JavaScript bem estruturado, conseguimos:
-  Componentização
-  Reutilização de código
-  Build system customizado
-  Performance superior
-  Zero overhead de framework

**Trade-offs considerados:**
- Framework: Rápido para escalar, mas adiciona complexidade
- Vanilla: Mais controle, menos abstração, performance melhor

Para este caso de uso (portfólio estático), vanilla é a escolha ideal.

### Build System vs Frameworks de Build

Criei um build system customizado porque:
1. **Aprendizado**: Entender como funcionam por baixo dos panos
2. **Controle**: Customizar exatamente o que preciso
3. **Simplicidade**: Sem configuração complexa de Webpack/Vite
4. **Performance**: Zero overhead, apenas o necessário

---
