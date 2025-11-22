const urlParams = new URLSearchParams(window.location.search);
const pageName = urlParams.get('page');

// Verifica se o parâmetro 'page' foi fornecido
if (!pageName) {
    documentTitle.textContent = "Página Inicial Padrão";
    pageHeading.textContent = "Bem-vindo!";
    pageText.textContent = "Para carregar conteúdo dinâmico, adicione o parâmetro '?page=NOMEDAPAGINA' na URL. Por exemplo, tente '?page=cards' (o arquivo 'cards.json' existe).";
    return;
}

// 2. Construir o caminho do arquivo JSON
const jsonPath = `data/${pageName}.json`;