
# Caravel Racing — GitHub Pages template

Template minimal para GitHub Pages com páginas: Home, Projects, Project template, Engineering Notebook, Downloads, Contactos.

## Como usar

1. Clone este repositório localmente:
   ```bash
   git clone <URL_DO_REPO>
   cd <repo>
   ```
2. Copia os ficheiros deste template para a raiz do repo (ou faz um fork deste template).
3. Faz commit e push para a branch `main` (ou `gh-pages`):
   ```bash
   git add .
   git commit -m "Add Caravel Racing site template"
   git push origin main
   ```
4. No GitHub, vai ao repositório → Settings → Pages e seleciona a branch `main` e a pasta `/root` (ou `gh-pages` se preferires).
   O site estará disponível em `https://<username>.github.io/<repo>/` ou, se usares um custom domain, em `https://yourdomain.com`.

## Estrutura
- index.html — página principal
- projects.html — lista de projetos
- projects/caravel-v1-2025.html — página de exemplo de projeto
- engineering-notebook.html — índice do engineering notebook
- downloads/* — coloca aqui PDFs e ficheiros CAD
- css/styles.css — estilos principais
- images/* — imagens do projeto

## Dicas
- Substitui as imagens em `images/` por fotos reais e atualiza os alt texts.
- Para ficheiros grandes (ex.: .f3d), considera hospedar em Google Drive / Dropbox e linkar a partir do site.
- Se quiseres automatizar deploys a partir de `main` para `gh-pages`, procura pelo pacote `gh-pages` (npm) ou Actions oficiais do GitHub Pages.
