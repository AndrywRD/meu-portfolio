---
title: "5 Projetos Reais que Criei em 7 Meses com IA: Do Caos ao TypeScript"
date: "2026-01-30"
category: "Desenvolvimento"
tags: [IA, projetos, desenvolvimento, TypeScript, Next.js]
description: "Jogos, bots, landing pages e um studio criativo — como IA me ajudou (e às vezes atrapalhou) a construir projetos que jamais faria sozinho"
coverImage: /src/assets/blog/covers/projetos-ia.jpg
author: Andryw Ruhan
published: true
featured: true
---

# 5 Projetos Reais que Criei em 7 Meses com IA: Do Caos ao TypeScript

Sete meses atrás, eu estava começando em Python, com aquela vontade imediatista de criar coisas mas sem paciência para sintaxe. Hoje, trabalho com Next.js, TypeScript, Prisma e Docker em projetos reais que estão saindo do papel. 

Não, não virei especialista. Mas aprendi algo valioso: com IA, você pode construir projetos que pareciam impossíveis — desde que esteja disposto a falhar algumas vezes antes de acertar.

Este não é um tutorial nem um guia definitivo. É um relato honesto sobre 5 projetos que criei nesses meses, mostrando o que funcionou, o que falhou, e o que aprendi no processo. Se você está começando ou considerando usar IA no desenvolvimento, talvez minha experiência ajude.

## Mercante João Paulo - O Bot que Me Ensinou Arquitetura

### O que é

Mercante João Paulo é um bot gacha/card game para Discord. Pensa em Yugioh misturado com Hearthstone, mas com cartas "meme" e uma dose de personalidade própria. Os usuários coletam cartas através de comandos, batalham com elas e progridem por níveis. Simples na ideia, complexo na execução.

Sempre gostei de jogos de cartas. Comecei com Yugioh — tive coleções, participei de eventos, campeonatos, e senti bastante raiva também do rumo do jogo. Depois veio Hearthstone, um clássico onde passei horas com meu deck de Hunter midrange. Tentei Magic, mas confesso que para um jogador de Yugioh não funciona. Hoje em dia ainda continuo jogando Legends of Runeterra.

Eu queria criar um jogo, mas sabia das dificuldades de fazer algo realmente jogável. Então o bot foi minha maneira de explorar criatividade sem encarar o monstro que seria desenvolver um jogo completo.

### A Evolução (e o Desastre da Versão 1)

**Versão 1 - Python Macarrônico:**
Um arquivo. Apenas um. Com 1.5k linhas de código onde tudo estava junto: lógica de batalha, sistema de cartas, comandos, economia. O banco de dados? Arquivos JSON. Sim, arquivos JSON para armazenar tudo.

Funcionou. De certa forma. Consegui entregar risadas aos amigos tentando dropar cartas lendárias. O problema? Tinha um bug que não deixava ninguém dropar as lendárias. Demos mais de 300 pulls e zero cartas lendárias apareceram. Acontece.

Mas o pior não era o bug. Era tentar implementar qualquer feature nova. Mexer em uma função quebrava três outras. Adicionar uma mecânica nova exigia reescrever metade do arquivo. Era código funcional, mas insustentável.

**Versão 2 - JavaScript/TypeScript + Prisma + Docker + Postgres:**
Não foi exatamente uma "mudança de stack". Foi mais uma expansão — uma forma de aprender novas possibilidades enquanto reconstruía algo melhor. Hoje trabalho com JavaScript, TypeScript, schema Prisma e Docker com Postgres. Tecnologias que nem conhecia direito 7 meses atrás.

### Como a IA Ajudou (e Ensinou)

A IA sugeriu a migração para essa stack mais robusta quando expliquei minhas dificuldades de escalar. Ela me ajudou a estruturar o schema Prisma de forma que cada entidade fizesse sentido — cartas, usuários, batalhas, inventário.

Refatorou a lógica de batalha que sozinho me levaria semanas para entender. Não porque a IA é mágica, mas porque ela conseguiu traduzir conceitos complexos de forma que eu pudesse aprender fazendo.

### A Lição Brutal

Descartei a versão 1 completamente. Todo aquele código, todas aquelas horas, foram para o lixo. E aprendi algo importante: **código funcional não é código sustentável**.

Todos os meus projetos tiveram versões anteriores que falharam. E tudo bem. Falhar rápido não é bug — é parte do processo.

---

## Portfólio + Blog - Onde Aprendi Componentização

### O que é

Meu portfólio começou como uma vitrine para recrutadores. Eu estava (e ainda estou) procurando minha primeira vaga como programador, então fazia sentido ter algo para mostrar. Mas desde então, passei a encarar isso como meu projeto pessoal de progresso.

Uso tecnologias como Git, HTML/CSS, Tailwind, JavaScript, TypeScript e Python. É onde aglomero meus conhecimentos e, cada vez mais, compartilho o que aprendi.

### A Motivação Real

Gosto de como o conhecimento da programação é compartilhado. Há uma cultura de ajudar, de ensinar, de documentar. Quero fazer minha parte nisso. Então hoje utilizo o portfólio não só para me apresentar, mas para compartilhar aquilo que aprendi.

### Complexidade e Aprendizado

Foi um projeto simples tecnicamente, mas que me colocou pela primeira vez de frente com outras linguagens e tecnologias que eu não conhecia. Foi explorando muitas coisas novas ao mesmo tempo.

A IA me ajudou a não ter medo. Quando eu não sabia como estruturar um componente React, perguntava. Quando não entendia a diferença entre state e props, pedia exemplos. Aprendi fazendo, iterando, quebrando e consertando.

### Componentização Deixou de Ser Desafio

No início, separar tudo em componentes parecia verbose e desnecessário. "Por que não deixar tudo em um arquivo?" 

Hoje, componentização virou necessidade em todos os meus projetos. Separação de responsabilidades deixou de ser um conceito abstrato e virou um padrão mental. Cada componente tem sua função. Cada função tem seu lugar.

### Status Atual

Está terminado, mas vivo. Atualizo constantemente o design, o front, o backend. Meu blog também vive ali, crescendo com cada post que escrevo refletindo sobre essas mudanças que estamos vivendo.

---

## Súbita Studio - Quando Contexto Rico Vira Magia

### O que é

Súbita Studio é meu projeto de empreendedorismo junto com meu sócio designer, Gabriel Cavalheiro. É um studio criativo focado inicialmente em peças de roupas com estampas conceituais.

Hoje utilizo ferramentas de programação nesse projeto, mas ele conta com várias outras: Notion e Drive para organização, Behance e Pinterest para inspiração e modelos, Photoshop e edição de vídeo para produção de conteúdo. É bem além de só código.

Nossa motivação é construir algo que nos represente, tanto criativamente quanto no sentimento de fazer parte disso. Buscamos passar a filosofia do viver bem trazendo os momentos súbitos que fazem diferença na vida. Queremos aprender a empreender e construir nossa identidade — seja dentro da moda, ou web design, ou criando ideias.

Acredito ser um projeto bem ambicioso, mas estamos trabalhando da forma que pudemos. Considero desafiador, com desafios que vão além da programação.

### A Landing Page

Criamos uma landing page focada em realizar pré-vendas das peças de roupas iniciais. Ela funciona como um funil de vendas, mas como é um site, podemos incluir elementos de design e outros detalhes — é como se fosse um plus para as ferramentas de marketing.

**Stack técnica:**
- Next.js com JavaScript e TypeScript
- Postgres como banco de dados
- API própria para produtos (com estoque, tamanhos, variações)
- Database para newsletter
- CTA direto para WhatsApp

Por que WhatsApp? Porque achamos exagero criar um sistema completo de login, carrinho e integração com Mercado Pago agora. Além disso, ainda não temos a confiança dos clientes para que depositem seus cartões ali. Então mantemos simples: interessou? Vem falar com a gente.

### A Mágica do Contexto Rico

Aqui é onde a coisa fica interessante. Quando criamos a landing page, não chegamos para a IA e falamos "faz um site de roupas". Passamos contexto. Muito contexto.

**Documentos que demos para a IA:**

**Texto Fundacional:**
```
domingo
2h40

a cidade não percebeu
e nada no mundo mudou
mas algo aconteceu.

é quente
o tempo está respirando diferente
algo tocou
sem pedir licença

ninguém viu
e ninguém escutou
mas você sentiu
e isso basta.

ainda acende.
```

Esse texto não é só poético — ele serve como sistema, filtro e bússola para todas as decisões da marca. Define o tom, a vibe, a essência.

**Conceito Visual:**
- Visão térmica como linguagem central
- Cidade fria (preto, grafite, cinza) × corpo quente (laranja, roxo, vermelho, amarelo)
- Paleta específica: #010001, #150014, #590283, #E10600, #FD6205, #FFBF00
- Texturas imperfeitas, bordas imprecisas, grão e ruído
- Referências visuais: 15 imagens de câmeras térmicas, gradientes, paletas

**Persona da Marca:**
- Tom de voz: poético mas acessível, sereno mas firme
- Não explica demais, aproxima
- Observa, narra, convida
- Nunca pede atenção, nunca compete por validação

### O Resultado

A primeira versão que a IA gerou estava 80-90% alinhada com nossa visão. Precisamos de poucas alterações para chegar em algo útil e escalável. 

Não foi sorte. Foi contexto denso.

A IA não adivinhou o que queríamos. Ela **interpretou** o material que demos. E isso fez toda a diferença.

### Status e Lições

Está em produção, com lançamento previsto para fevereiro. Faltam os produtos finais, um vídeo para a hero section, alguns ajustes. Mas está vivo, funcionando, pronto para escalar.

**A lição de ouro:** Contexto rico = output próximo da visão inicial.

Quanto mais você consegue articular o que quer — não só em palavras, mas em referências visuais, paletas, conceitos, filosofia — melhor a IA consegue te ajudar a materializar.

---

## Os Projetos que Falharam (e Por Que Isso Importa)

### O CRM da Súbita - Minha Pior Falha

Decidi criar um CRM do zero para a Súbita. Queria gerenciar clientes, pedidos, estoque, tudo. Passei dias planejando arquitetura, pensando em features, estruturando banco de dados.

Até descobrir que a Nuvemshop na versão gratuita fazia basicamente tudo que eu estava tentando construir.

Over-engineering clássico. Tentando reinventar a roda desnecessariamente.

**Lição:** Antes de construir algo complexo, pesquise se já não existe uma solução pronta que resolve 80% do problema. Seu tempo é valioso.

### O Inferno dos Imports

"Perder 2 horas arrumando um path."

Se você programa, sabe exatamente do que estou falando. Usar `@/components` em um arquivo e `../components` em outro. De repente nada funciona. O erro não diz onde está o problema. Você vasculha arquivo por arquivo tentando entender.

Às vezes o problema não é a IA. É minha própria organização. Eu mudo a estrutura de pastas, esqueço de atualizar os imports, e pronto — quebrei o build inteiro.

Os melhores bugs trabalhando com IA são exatamente esses: os inesperados. Problemas de import, caminhos errados. Sério, meu maior tempo é corrigindo esse tipo de erro.

### IA Sem Contexto é Perigoso

Já usei seis contas do Claude simultaneamente no mesmo projeto. Aprendi da pior forma.

Quando você não presta atenção rigorosa ao que a IA está modificando, erros silenciosos surgem. Ela faz uma mudança "desnecessária" em um arquivo que quebra funcionalidades em outro. Sem gerenciamento de contexto adequado, você perde controle do próprio código.

**Lição:** A IA é poderosa, mas você precisa ser o maestro. Você decide o que entra, o que sai, o que fica. Sempre.

### Todos os Projetos Tiveram Versões Anteriores que Falharam

- Versão 1 do Mercante: descartada completamente
- Versão 1 do portfólio: refatorada 3 vezes
- Versão 1 da landing Súbita: arquitetura complexa demais, simplificamos

Outros projetos só ficaram na ideia. Na hora de executar, viraram desastre. E tudo bem.

Falhar rápido não é bug. É feature. Quanto mais rápido você identifica que algo não está funcionando, mais rápido pode pivotar para algo melhor.

---

## Padrões que Emergiram - O Que Realmente Funciona

### Next.js Virou Meu Queridinho

Não esperava gostar tanto de um framework. Mas Next.js conquistou meu coração.

Por quê? `npm run dev` + hot reload + componentes + rotas automáticas. Buildar pelo PowerShell virou rotina prazerosa. Ver mudanças em tempo real acelera o aprendizado de forma absurda.

Você não espera recompilar. Não espera reload manual. Salva o arquivo, a mudança aparece. Esse ciclo de feedback rápido faz toda diferença quando você está aprendendo.

### Componentização Virou Padrão Mental

Já falei disso no portfólio, mas vale reforçar. No início, separar tudo em componentes parecia desnecessário. Hoje é necessidade.

Cada componente tem uma responsabilidade. Cada função tem seu lugar. Quando preciso mexer em algo, sei exatamente onde ir. O código fica legível, manutenível, escalável.

### Meus Prompts São Feitos Por IA

Meta, eu sei. Mas funciona.

Eu dou o contexto completo do que preciso para a IA. Ela gera um documento estruturado explicando tudo. Eu uso esse documento como prompt principal para criar o projeto.

A IA me ajuda a fazer prompts melhores para a própria IA.

### A Limitação Honesta

"Não tenho autonomia para debugar TypeScript complexo sozinho."

Preciso ser honesto sobre isso. Atualmente, não consigo debugar código complexo de TypeScript manualmente. Dependo da IA para isso.

Minha frustração é proporcional ao meu conhecimento das ferramentas utilizadas. Quanto menos eu sei sobre a tecnologia, mais dependo da IA para resolver problemas.

Mas aqui está o interessante: raramente, com bom contexto e foco em produção, a IA realiza erros tão graves. Os erros acontecem quando o contexto é vago ou quando não estou prestando atenção.

### Tecnologias que Nunca Usaria Sozinho

Postgres, Prisma, Docker, Next.js, TypeScript.

Sem IA, ainda estaria trabalhando com Python puro. Talvez nem tivesse saído do Python.

A IA me deu um atalho de aprendizado — não uma substituição. Ainda preciso entender o que está acontecendo. Mas posso aprender fazendo projetos reais, não exercícios abstratos de tutorial.

---

## Minha Conclusão

Sete meses. Cinco projetos. Múltiplas versões. Muitos fracassos.

De Python macarrônico para Next.js e TypeScript em produção. De arquivos JSON para Postgres com Prisma. De 1.5k linhas em um arquivo para arquitetura componentizada e escalável.

Não virei especialista. Longe disso. Mas estou criando coisas que sempre sonhei: jogos, este blog, uma marca própria que lança em fevereiro.

A realidade não é romântica. Passo mais tempo corrigindo paths do que gostaria. Ainda dependo muito da IA para debugar código complexo. Já joguei fora projetos inteiros e comecei do zero.

Mas estou me divertindo. Seja criando prompts eficientes, seja "passando raiva" quando a IA alucina. Ver minhas ideias tomando forma é incrivelmente gratificante.

### O Que Aprendi de Verdade

**A IA não cria além do meu conhecimento.** Ela acelera, sugere, refatora. Mas o entendimento precisa vir de mim.

**Contexto denso > prompt genérico.** Quanto mais contexto você dá, melhor o resultado. A Súbita provou isso.

**Falhar 3x antes de acertar é normal.** Todos os projetos tiveram versões descartadas. Faz parte.

**Componentização importa.** Separação de responsabilidades não é frescura — é sobrevivência.

**Escalabilidade importa desde o início.** Código funcional não basta. Precisa ser sustentável.

### A Pergunta que Deixo

Qual projeto você quer criar mas acha impossível?

Talvez não seja tão impossível quanto parece. Talvez você precise de contexto denso, algumas tentativas, e disposição para falhar antes de acertar.

Prepare-se: você vai falhar algumas vezes. Vai perder horas com imports quebrados. Vai descartar código que levou dias para escrever.

E tá tudo bem. Faz parte.

Adoraria ouvir sua perspectiva, mesmo que diferente da minha. Afinal, o que mais amo na programação é que cada desenvolvedor tem uma abordagem única — pensamos em soluções, lógicas e processos diferentes. Para mim, essa diversidade é uma forma de arte valiosa, própria dos solucionadores de problemas.

Muito obrigado pela leitura.
