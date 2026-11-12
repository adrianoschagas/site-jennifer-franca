#!/usr/bin/env node
/* Gera as páginas das áreas de atuação e os dados de SEO (sem dependências).
   Uso:  node tools/build.js
   Quando o domínio estiver definido, preencha DOMINIO abaixo e rode de novo:
   o script passa a gerar canonical, og:url, og:image, sitemap.xml e robots.txt. */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

// ===================== CONFIGURAÇÃO =====================
const DOMINIO = 'https://jenniferfranca.adv.br'; // ex.: 'https://www.jenniferfranca.adv.br' (sem barra no final)
const NOME = 'Jennifer França';
const OAB = 'OAB/SP 484.960';
const TELEFONE = '+5511951341466';
// ========================================================

const AREAS = [
  {
    slug: 'direito-do-trabalho',
    nome: 'Direito do Trabalho',
    title: 'Advogada Trabalhista em Mauá/SP | Jennifer França',
    description: 'Advogada trabalhista em Mauá/SP para trabalhadores e empresas: rescisão, verbas rescisórias, horas extras, vínculo de emprego, assédio e consultoria preventiva.',
    h1: 'Advogada trabalhista em Mauá/SP',
    intro: 'Atuação em Direito do Trabalho para trabalhadores e empresas, na orientação preventiva e em processos na Justiça do Trabalho, em todo o estado de São Paulo.',
    grupos: [
      {
        titulo: 'Para trabalhadores',
        texto: 'Análise do contrato, da jornada e dos pagamentos para identificar o que a lei garante em cada situação.',
        itens: [
          ['Rescisão e verbas rescisórias', 'Conferência dos valores pagos no fim do contrato: saldo de salário, aviso prévio, férias, 13º, FGTS e multa.'],
          ['Horas extras e intervalos', 'Apuração da jornada efetivamente cumprida, adicional noturno, insalubridade e periculosidade.'],
          ['Reconhecimento de vínculo', 'Trabalho sem registro em carteira ou contratação como pessoa jurídica que disfarça uma relação de emprego.'],
          ['Assédio e danos morais', 'Situações de assédio moral ou sexual, discriminação e constrangimento no ambiente de trabalho.'],
          ['Acidente e doença ocupacional', 'Direitos de quem sofreu acidente ou adoeceu em razão do trabalho, incluindo estabilidade e indenizações.'],
          ['Estabilidades', 'Gestante, acidentária e outras garantias de emprego previstas em lei ou em norma coletiva.'],
        ],
      },
      {
        titulo: 'Para empresas',
        texto: 'Prevenção de passivos e defesa técnica, com atenção às rotinas de pessoal e às regras de compliance.',
        itens: [
          ['Consultoria preventiva', 'Orientação sobre contratação, jornada, remuneração, desligamentos e políticas internas.'],
          ['Defesa em reclamações trabalhistas', 'Atuação em audiências, elaboração de defesas e recursos na Justiça do Trabalho.'],
          ['Contratos e documentos', 'Elaboração e revisão de contratos de trabalho, acordos, regulamentos e termos.'],
          ['Compliance trabalhista e LGPD', 'Adequação de práticas internas e do tratamento de dados de empregados e candidatos.'],
        ],
      },
    ],
    faq: [
      ['Existe prazo para entrar com uma ação trabalhista?', 'Sim. Em regra, a ação deve ser proposta em até dois anos após o fim do contrato, e é possível cobrar direitos dos últimos cinco anos. Há exceções, por isso cada caso precisa ser analisado individualmente.'],
      ['Ainda estou empregado. Posso consultar uma advogada?', 'Pode. A consulta é sigilosa e serve justamente para esclarecer dúvidas e orientar decisões antes que elas sejam tomadas.'],
      ['Quais documentos ajudam na análise de um caso trabalhista?', 'Carteira de trabalho, contrato, holerites, termo de rescisão, extrato do FGTS, cartões de ponto e conversas ou e-mails relacionados ao trabalho. Se não tiver tudo, a consulta indica o que será necessário.'],
      ['A advogada atende empresas em questões trabalhistas?', 'Sim. O atendimento a empresas inclui consultoria preventiva, revisão de documentos e defesa em reclamações trabalhistas.'],
    ],
  },
  {
    slug: 'direito-civil',
    nome: 'Direito Cível',
    title: 'Advogada Cível em Mauá/SP | Contratos e Indenizações | Jennifer França',
    description: 'Advogada cível em Mauá/SP: contratos, responsabilidade civil, indenizações, cobranças e direito do consumidor para pessoas e empresas no estado de São Paulo.',
    h1: 'Advogada cível em Mauá/SP',
    intro: 'Atuação em Direito Cível para pessoas e empresas, com foco em prevenir conflitos por meio de bons contratos e em resolvê-los, de forma negociada ou judicial, quando surgem.',
    grupos: [
      {
        titulo: 'Principais temas',
        texto: 'O Direito Cível trata das relações entre particulares: o que foi combinado, o que foi descumprido e como reparar.',
        itens: [
          ['Contratos', 'Elaboração, análise e revisão de contratos de prestação de serviços, compra e venda, locação e parcerias.'],
          ['Responsabilidade civil', 'Pedidos e defesas em ações de indenização por danos materiais e morais.'],
          ['Cobranças e execuções', 'Recuperação de créditos, notificações extrajudiciais e defesa de quem está sendo cobrado.'],
          ['Direito do consumidor', 'Problemas com produtos, serviços, cobranças indevidas e descumprimento de oferta.'],
          ['Questões empresariais', 'Apoio jurídico às rotinas da empresa, com atenção a compliance e proteção de dados (LGPD).'],
          ['Solução extrajudicial', 'Negociação e acordos para resolver o conflito sem processo, quando isso é possível.'],
        ],
      },
    ],
    faq: [
      ['Preciso de uma advogada para fazer um contrato?', 'Não é obrigatório, mas um contrato bem redigido evita dúvidas sobre o que foi combinado e reduz o risco de conflito. A revisão antes da assinatura costuma ser mais simples do que a discussão depois.'],
      ['Existe prazo para pedir indenização?', 'Sim, e ele varia conforme o tipo de situação. Por isso é importante buscar orientação logo após o ocorrido, para que o prazo aplicável ao caso seja verificado.'],
      ['Todo conflito precisa virar processo?', 'Não. Muitas situações podem ser resolvidas por notificação ou acordo. O caminho adequado depende do caso e é avaliado na consulta.'],
    ],
  },
  {
    slug: 'direito-de-familia',
    nome: 'Direito de Família',
    title: 'Advogada de Família em Mauá/SP | Divórcio, Guarda e Pensão | Jennifer França',
    description: 'Advogada de família em Mauá/SP: divórcio, união estável, guarda, convivência, pensão alimentícia, inventário e partilha. Atendimento agendado e sigiloso.',
    h1: 'Advogada de família em Mauá/SP',
    intro: 'Atuação em Direito de Família e Sucessões com discrição e respeito, buscando soluções que preservem as pessoas envolvidas, especialmente as crianças.',
    grupos: [
      {
        titulo: 'Principais temas',
        texto: 'Questões de família pedem técnica e sensibilidade. Sempre que possível, a solução consensual é priorizada.',
        itens: [
          ['Divórcio', 'Consensual ou litigioso, com definição de partilha de bens, guarda, convivência e alimentos.'],
          ['União estável', 'Reconhecimento, formalização por contrato e dissolução, com os efeitos patrimoniais correspondentes.'],
          ['Guarda e convivência', 'Definição ou alteração do regime de guarda e do convívio com os filhos.'],
          ['Pensão alimentícia', 'Fixação, revisão, exoneração e cobrança de alimentos.'],
          ['Inventário e partilha', 'Transmissão dos bens deixados por quem faleceu, pela via judicial ou em cartório.'],
          ['Planejamento patrimonial', 'Pacto antenupcial, escolha do regime de bens e testamento.'],
        ],
      },
    ],
    faq: [
      ['O divórcio pode ser feito em cartório?', 'Quando há consenso entre as partes, em muitos casos sim, sempre com a presença de advogado. Havendo filhos menores ou divergências, a situação precisa ser analisada individualmente.'],
      ['Como é calculado o valor da pensão alimentícia?', 'A lei não fixa um percentual. O valor considera as necessidades de quem recebe e as possibilidades de quem paga, e pode ser revisto se essas condições mudarem.'],
      ['Existe prazo para abrir o inventário?', 'Sim. A lei prevê o prazo de dois meses a partir do falecimento para a abertura, e o atraso pode gerar multa sobre o imposto de transmissão.'],
    ],
  },
  {
    slug: 'direito-medico',
    nome: 'Direito Médico',
    title: 'Advogada de Direito Médico em Mauá/SP | Erro Médico e Planos de Saúde | Jennifer França',
    description: 'Advogada de Direito Médico e da Saúde em Mauá/SP: erro médico, responsabilidade civil, planos de saúde, prontuário, consentimento informado e orientação a profissionais e clínicas.',
    h1: 'Advogada de Direito Médico em Mauá/SP',
    intro: 'Atuação em Direito Médico e da Saúde, nas relações entre pacientes, profissionais, clínicas, hospitais e planos de saúde, com experiência consolidada na área.',
    grupos: [
      {
        titulo: 'Para pacientes e familiares',
        texto: 'Orientação sobre direitos na relação com profissionais, instituições e operadoras de saúde.',
        itens: [
          ['Erro médico', 'Análise de casos de possível falha em atendimentos, diagnósticos, cirurgias e procedimentos, e dos pedidos de indenização cabíveis.'],
          ['Planos de saúde', 'Negativas de cobertura, reajustes, carências e cancelamentos de contrato.'],
          ['Acesso ao prontuário', 'Obtenção de cópia do prontuário e de outros documentos médicos.'],
        ],
      },
      {
        titulo: 'Para profissionais e instituições de saúde',
        texto: 'Prevenção de riscos jurídicos e defesa técnica de médicos, clínicas e demais profissionais da área.',
        itens: [
          ['Defesa em processos', 'Atuação em ações judiciais, inclusive por alegação de erro médico, e em procedimentos ético-profissionais.'],
          ['Documentação clínica', 'Termos de consentimento informado, contratos e orientações sobre prontuário.'],
          ['Compliance e LGPD na saúde', 'Adequação do tratamento de dados sensíveis de pacientes e das rotinas internas.'],
          ['Contratos', 'Relações com operadoras, parceiros, prestadores e equipe.'],
        ],
      },
    ],
    faq: [
      ['O que caracteriza erro médico?', 'Nem todo resultado indesejado é erro médico. Em geral, é preciso verificar se houve negligência, imprudência ou imperícia e se isso causou o dano. A análise depende do prontuário e, muitas vezes, de avaliação técnica.'],
      ['Tenho direito a uma cópia do meu prontuário?', 'Sim. O paciente tem direito de acesso ao próprio prontuário e pode solicitar cópia à instituição ou ao profissional responsável pela guarda do documento.'],
      ['O plano de saúde negou um procedimento. O que fazer?', 'Peça a negativa por escrito, com a justificativa, e guarde o pedido médico e os exames. Com esses documentos é possível avaliar se a recusa é regular e quais medidas cabem no caso.'],
      ['A advogada atende médicos e clínicas?', 'Sim. O atendimento inclui orientação preventiva, elaboração de documentos e defesa em processos judiciais e ético-profissionais.'],
    ],
  },
];

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// JSON-LD seguro para embutir em <script>
const ld = (obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`;

const escritorio = () => ({
  '@type': ['LegalService', 'Attorney'],
  ...(DOMINIO ? { '@id': `${DOMINIO}/#escritorio`, url: `${DOMINIO}/`, image: `${DOMINIO}/img/og.png`, logo: `${DOMINIO}/img/og.png` } : {}),
  name: `Dra. ${NOME} Advogada`,
  description: 'Advocacia em Direito do Trabalho, Cível, de Família e Médico para pessoas e empresas.',
  telephone: TELEFONE,
  email: 'contato@jenniferfranca.adv.br',
  address: { '@type': 'PostalAddress', streetAddress: 'Rua Campos Sales, 167, Sala 708, Vila Bocaina', addressLocality: 'Mauá', addressRegion: 'SP', postalCode: '09310-040', addressCountry: 'BR' },
  areaServed: { '@type': 'State', name: 'São Paulo' },
  knowsAbout: ['Direito do Trabalho', 'Direito Civil', 'Direito de Família', 'Direito Médico', 'Erro médico', 'Compliance', 'LGPD'],
  founder: { '@type': 'Person', name: NOME, jobTitle: 'Advogada', identifier: OAB },
});

const faqLd = (faq) => ({
  '@type': 'FAQPage',
  mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
});

function seoBlock(file, graph) {
  const url = DOMINIO ? `${DOMINIO}/${file === 'index.html' ? '' : file.replace(/\.html$/, '')}` : '';
  const tags = [];
  if (DOMINIO) {
    tags.push(`<link rel="canonical" href="${url}">`, `<meta property="og:url" content="${url}">`,
      `<meta property="og:image" content="${DOMINIO}/img/og.png">`, '<meta property="og:image:width" content="1200">', '<meta property="og:image:height" content="630">');
  }
  if (graph) tags.push(ld({ '@context': 'https://schema.org', '@graph': graph }));
  return tags.join('\n  ');
}

const CSP = "default-src 'none'; script-src 'self'; style-src 'self'; font-src 'self'; img-src 'self' data:; manifest-src 'self'; base-uri 'none'; form-action 'none'";

function areaPage(a) {
  const crumbs = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', ...(DOMINIO ? { item: `${DOMINIO}/` } : {}) },
      { '@type': 'ListItem', position: 2, name: a.nome },
    ],
  };
  const outras = AREAS.filter((o) => o.slug !== a.slug);
  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(a.title)}</title>
  <meta name="description" content="${esc(a.description)}">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <meta name="theme-color" content="#643e43">
  <meta name="referrer" content="strict-origin-when-cross-origin">
  <meta http-equiv="Content-Security-Policy" content="${CSP}">
  <meta property="og:type" content="article">
  <meta property="og:locale" content="pt_BR">
  <meta property="og:site_name" content="${NOME} Advogada">
  <meta property="og:title" content="${esc(a.title)}">
  <meta property="og:description" content="${esc(a.description)}">
  <meta name="twitter:card" content="summary_large_image">
  ${seoBlock(`${a.slug}.html`, [escritorio(), crumbs, faqLd(a.faq)])}
  <link rel="icon" href="img/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="css/style.css">
  <script src="js/main.js" defer></script>
</head>
<body>
  <a class="skip" href="#conteudo">Pular para o conteúdo</a>
  <div class="topband" aria-hidden="true"></div>

  <header class="nav-wrap">
    <nav class="nav" aria-label="Principal">
      <a class="brand" href="index.html" aria-label="${NOME} Advogada, início">
        <img class="brand-mark" src="img/logo-mark.svg" alt="" width="250" height="184">
        <span class="brand-text">
          <span class="brand-name">${NOME}</span>
          <span class="brand-sub">Advogada · ${OAB}</span>
        </span>
      </a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="menu">
        <span class="sr-only">Abrir menu</span>
        <span class="bars" aria-hidden="true"></span>
      </button>
      <ul class="menu" id="menu">
        <li><a href="index.html#areas">Áreas de atuação</a></li>
        <li><a href="index.html#como-funciona">Como funciona</a></li>
        <li><a href="index.html#sobre">A advogada</a></li>
        <li><a href="index.html#duvidas">Dúvidas</a></li>
        <li><a href="#contato">Contato</a></li>
        <li><a class="btn btn-primary btn-sm js-whats" href="#contato">Agendar consulta</a></li>
      </ul>
    </nav>
  </header>

  <main id="conteudo">
    <section class="page-hero container">
      <nav class="crumbs" aria-label="Você está em">
        <a href="index.html">Início</a><span aria-hidden="true">/</span><a href="index.html#areas">Áreas de atuação</a><span aria-hidden="true">/</span><span aria-current="page">${a.nome}</span>
      </nav>
      <p class="eyebrow">${a.nome}</p>
      <h1>${a.h1}</h1>
      <p class="lead">${a.intro}</p>
      <div class="actions">
        <a class="btn btn-primary js-whats" href="#contato">Agendar consulta pelo WhatsApp</a>
      </div>
    </section>
${a.grupos.map((g) => `
    <section class="section container">
      <div class="section-head">
        <h2>${g.titulo}</h2>
        <p class="aside">${g.texto}</p>
      </div>
      <div class="topics">
${g.itens.map(([t, d]) => `        <article class="topic"><h3>${t}</h3><p>${d}</p></article>`).join('\n')}
      </div>
    </section>`).join('\n')}

    <section class="section container split">
      <div>
        <p class="eyebrow">Perguntas frequentes</p>
        <h2>Dúvidas sobre ${a.nome}</h2>
      </div>
      <div class="faq">
${a.faq.map(([q, r]) => `        <details>\n          <summary>${q}</summary>\n          <p>${r}</p>\n        </details>`).join('\n')}
      </div>
    </section>

    <section class="section container" id="contato">
      <div class="contact">
        <div>
          <p class="eyebrow">Contato</p>
          <h2>Agende sua consulta</h2>
          <p>Escolha o melhor dia e horário pelo WhatsApp. O que for conversado é protegido pelo sigilo profissional.</p>
          <div class="actions"><a class="btn btn-light js-whats" href="#contato">Falar pelo WhatsApp</a></div>
        </div>
        <dl class="contact-list">
          <div><dt>WhatsApp</dt><dd><a class="js-whats js-whats-label" href="#contato">(11) 95134-1466</a></dd></div>
          <div><dt>E-mail</dt><dd><a href="mailto:contato@jenniferfranca.adv.br">contato@jenniferfranca.adv.br</a></dd></div>
          <div><dt>Escritório</dt><dd><address>Rua Campos Sales, 167, Sala 708<br>Vila Bocaina, Mauá/SP, CEP 09310-040</address></dd></div>
          <div><dt>Área de atendimento</dt><dd>Todo o estado de São Paulo</dd></div>
          <div><dt>Horário</dt><dd>Somente com agendamento</dd></div>
        </dl>
      </div>
    </section>

    <section class="section container">
      <p class="eyebrow">Outras áreas de atuação</p>
      <ul class="other-areas">
${outras.map((o) => `        <li><a href="${o.slug}.html">${o.nome}</a></li>`).join('\n')}
      </ul>
    </section>
  </main>

  <footer class="footer">
    <div class="container footer-grid">
      <div>
        <p class="footer-sign">${NOME}</p>
        <p class="footer-sub">Advogada · ${OAB} · Mauá/SP</p>
      </div>
      <ul class="footer-links">
${AREAS.map((o) => `        <li><a href="${o.slug}.html">${o.nome}</a></li>`).join('\n')}
        <li><a href="privacidade.html">Política de privacidade</a></li>
      </ul>
    </div>
    <div class="container footer-note">
      <p>Este site tem caráter exclusivamente informativo, em conformidade com o Código de Ética e Disciplina da OAB e o Provimento nº 205/2021. O conteúdo não substitui a consulta jurídica individual.</p>
      <p>© <span class="js-year">2026</span> ${NOME}. Todos os direitos reservados.</p>
    </div>
  </footer>
</body>
</html>
`;
}

// 1) Páginas das áreas
for (const a of AREAS) fs.writeFileSync(path.join(ROOT, `${a.slug}.html`), areaPage(a));

// 2) Bloco de SEO das páginas escritas à mão
function inject(file, graph) {
  const p = path.join(ROOT, file);
  const html = fs.readFileSync(p, 'utf8');
  const re = /(<!-- seo:start[^>]*-->)[\s\S]*?(<!-- seo:end -->)/;
  if (!re.test(html)) throw new Error(`Marcador seo:start/seo:end não encontrado em ${file}`);
  fs.writeFileSync(p, html.replace(re, (_, a, b) => `${a}\n  ${seoBlock(file, graph)}\n  ${b}`));
}
const index = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const strip = (s) => s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').trim();
const homeFaq = [...index.matchAll(/<summary>([\s\S]*?)<\/summary>\s*<p>([\s\S]*?)<\/p>/g)].map((m) => [strip(m[1]), strip(m[2])]);
inject('index.html', [escritorio(), faqLd(homeFaq)]);
inject('privacidade.html', null);

// 3) sitemap.xml e robots.txt
const paginas = ['index.html', ...AREAS.map((a) => `${a.slug}.html`), 'privacidade.html'];
if (DOMINIO) {
  const hoje = new Date().toISOString().slice(0, 10);
  const urls = paginas.map((f) => `  <url><loc>${DOMINIO}/${f === 'index.html' ? '' : f.replace(/\.html$/, '')}</loc><lastmod>${hoje}</lastmod></url>`).join('\n');
  fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
}
fs.writeFileSync(path.join(ROOT, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /tools/\n${DOMINIO ? `\nSitemap: ${DOMINIO}/sitemap.xml\n` : ''}`);

console.log(`OK: ${AREAS.length} páginas de área geradas.${DOMINIO ? ` Domínio: ${DOMINIO}` : ' DOMINIO ainda vazio: canonical, og:image e sitemap ficam pendentes.'}`);
