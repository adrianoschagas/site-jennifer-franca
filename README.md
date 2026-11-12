# Site Jennifer França · Advogada Trabalhista

Site institucional estático (HTML, CSS e um pequeno JavaScript), sem banco de dados, sem painel de administração e sem dependências externas.

## Estrutura

| Arquivo | Para que serve |
|---|---|
| `index.html` | Página principal |
| `direito-*.html` | Páginas das quatro áreas (geradas por `tools/build.js`, não editar à mão) |
| `privacidade.html` | Política de privacidade (LGPD) |
| `css/style.css` | Visual: cores, fontes, layout |
| `js/main.js` | Número do WhatsApp, menu do celular |
| `img/logo.svg`, `img/logo-mark.svg` | Logo recriado em vetor (serve também para impressão) |
| `img/og.png` | Imagem que aparece ao compartilhar o link |
| `fonts/` | Fontes hospedadas no próprio site (licença OFL) |
| `tools/build.js` | Gera as páginas das áreas, dados estruturados, sitemap e robots |
| `_headers` | Cabeçalhos de segurança (Cloudflare Pages / Netlify) |

## Como editar

- Textos da página principal: direto no `index.html`.
- Textos das áreas: na lista `AREAS` em `tools/build.js`; depois rodar `node tools/build.js`.
- Sempre que mudar as perguntas frequentes do `index.html`, rodar `node tools/build.js` para atualizar os dados estruturados.

## Pendências antes de publicar

1. **Domínio**: já configurado como `https://jenniferfranca.adv.br` em `tools/build.js`. Se o nome registrado for outro, alterar `DOMINIO` e rodar `node tools/build.js`.
3. **E-mail**: o site mostra `contato@jenniferfranca.adv.br`. Antes de publicar, ativar o redirecionamento na Cloudflare (*Email* → *Email Routing*) para o e-mail pessoal dela e enviar uma mensagem de teste.
5. **CEP do escritório** (opcional): acrescentar na seção `id="contato"` e no JSON-LD (`tools/build.js`).
4. **Revisão dos textos** pela advogada, em especial as páginas das áreas.

## SEO

Já feito no site:

- Título e descrição únicos por página, com área + cidade ("Advogada trabalhista em Mauá/SP").
- Uma página por área de atuação, com conteúdo próprio e perguntas frequentes.
- Dados estruturados (schema.org `LegalService`, `FAQPage`, `BreadcrumbList`).
- HTML semântico, um `h1` por página, links internos entre as áreas, site leve e responsivo.
- Open Graph para compartilhamento em WhatsApp e redes sociais.

Fora do site (é o que mais pesa para aparecer em buscas locais):

1. **Perfil da Empresa no Google** (google.com/business): criar, verificar, escolher a categoria "Advogado", colocar o link do site. Nome, telefone e cidade devem ser idênticos aos do site.
2. **Google Search Console**: cadastrar o domínio e enviar o `sitemap.xml`.
3. **Conteúdo recorrente**: artigos informativos sobre dúvidas reais dos clientes (posso criar a seção de artigos).
4. **Links de entrada**: perfil no LinkedIn, Instagram e Jusbrasil apontando para o site.

Resultados de SEO levam semanas ou meses e não podem ser garantidos.

## Ver no computador

Abra a pasta no VS Code, instale a extensão *Live Server* e clique em "Go Live". Ou, com Python instalado:

```bash
python -m http.server 8000
```

Depois acesse `http://localhost:8000`.

## Publicar (recomendado: GitHub + Cloudflare Pages, gratuito)

1. Criar conta no GitHub, criar um repositório (pode ser público, serve de portfólio) e enviar esta pasta.
2. Criar conta na Cloudflare → *Workers & Pages* → *Create* → *Pages* → *Connect to Git* → escolher o repositório. Framework: *None*. Build command: vazio. Output directory: `/`.
3. Cada `git push` passa a publicar o site automaticamente, com HTTPS.
4. Registrar o domínio no [registro.br](https://registro.br). Existe a categoria **`.adv.br`**, exclusiva para advogados (ex.: `jenniferfranca.adv.br`).
5. Na Cloudflare Pages → *Custom domains* → adicionar o domínio e seguir as instruções de DNS.
6. Com o domínio definido: preencher `DOMINIO` em `tools/build.js`, rodar `node tools/build.js` e publicar de novo.

## Segurança

O que já está no projeto:

- **Site estático**: não há servidor de aplicação, banco de dados, login ou formulário para atacar.
- **Zero terceiros**: nenhuma fonte, script, CDN ou analytics externo; nada de cookies.
- **Content-Security-Policy estrita** (`default-src 'none'`, só arquivos do próprio site), sem scripts ou estilos inline.
- **HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy** no arquivo `_headers`.
- Links externos com `rel="noopener noreferrer"`.

O que depende de vocês (é onde sites assim costumam ser comprometidos):

- **Autenticação em dois fatores** nas contas do GitHub, Cloudflare e registro.br.
- Senhas únicas, guardadas em gerenciador de senhas.
- No registro.br, manter os dados de contato atualizados e renovar o domínio em dia.
- Após publicar, testar em <https://securityheaders.com> e <https://observatory.mozilla.org> (meta: nota A/A+).

## Publicidade na advocacia (OAB)

Os textos foram escritos em tom informativo e sóbrio, seguindo o Provimento nº 205/2021 do CFOAB: sem promessa de resultado, sem menção a valores ou gratuidade, sem depoimentos de clientes e sem chamadas de captação. Ao editar, mantenha essa linha, e a revisão final do conteúdo deve ser da própria advogada.
