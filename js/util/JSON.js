async function readJsonFile(url) {
    try {
        const response = await fetch(url);

        // 2. Verificação do Status da Resposta (200-299 = OK)
        if (!response.ok) {
            // Se o status HTTP não for sucesso (ex: 404 Not Found, 500 Server Error),
            // lança um erro com a mensagem de status.
            throw new Error(`Erro de rede ao buscar o arquivo: Status ${response.status} (${response.statusText})`);
        }

        // 3. Conversão da Resposta para JSON
        // O método .json() é assíncrono e já faz o parseamento do corpo da resposta.
        const data = await response.json();
        
        return data;

    } catch (error) {
        // Captura erros de rede (fetch falhou) ou erros de parseamento (response.json() falhou)
        console.error("Falha ao ler o arquivo JSON:", error.message);
        
        // Re-lança o erro para que a função que chamou possa tratá-lo
        throw new Error(`Não foi possível carregar ou processar o arquivo JSON: ${error.message}`);
    }
}