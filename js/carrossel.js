/**
 * Inicializa a funcionalidade de carrossel para um elemento DOM específico.
 * Este elemento deve ser o contêiner de rolagem.
 * * @param {HTMLElement} carouselElement O elemento DOM do carrossel (deve ter overflow-x: auto).
 * @param {string} itemClass A classe dos itens internos do carrossel (ex: 'wsd-screenshot').
 */
function initializeCarousel(carouselElement, itemClass) {
    // 1. Configuração de Rolagem Suave
    carouselElement.style.scrollBehavior = 'smooth';
    
    // Variáveis para a funcionalidade de arrastar (Grab-to-drag)
    let isDown = false;
    let startX;
    let scrollLeft;
    
    // --- LÓGICA DE ARRASTAR E SOLTAR (GRAB-TO-DRAG) ---
    
    carouselElement.addEventListener('mousedown', (e) => {
        isDown = true;
        // Adiciona classe para o cursor 'grabbing'
        carouselElement.classList.add('active-drag');
        startX = e.pageX - carouselElement.offsetLeft;
        scrollLeft = carouselElement.scrollLeft;
        
        // Impede a seleção de texto ao iniciar o arrasto
        e.preventDefault();
    });

    carouselElement.addEventListener('mouseleave', () => {
        isDown = false;
        carouselElement.classList.remove('active-drag');
    });

    carouselElement.addEventListener('mouseup', () => {
        isDown = false;
        carouselElement.classList.remove('active-drag');
    });

    carouselElement.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        
        // Impede que o navegador trate o evento de forma nativa (ex: arrastar imagem)
        e.preventDefault(); 
        
        // Calcula a distância que o mouse moveu
        const x = e.pageX - carouselElement.offsetLeft;
        const walk = (x - startX) * 1.5; // Multiplicador para tornar o scroll mais rápido
        
        // Aplica o scroll
        carouselElement.scrollLeft = scrollLeft - walk;
        updateButtonsVisibility();
    });

    // 2. Criação dos Botões de Navegação (mantido)
    
    // Contêiner principal para centralizar os botões
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'wsd-carousel-controls';
    
    const prevButton = document.createElement('button');
    prevButton.className = 'wsd-carousel-btn wsd-prev-btn';
    prevButton.innerHTML = '&#10094;'; // Seta esquerda
    prevButton.setAttribute('aria-label', 'Voltar no carrossel');

    const nextButton = document.createElement('button');
    nextButton.className = 'wsd-carousel-btn wsd-next-btn';
    nextButton.innerHTML = '&#10095;'; // Seta direita
    nextButton.setAttribute('aria-label', 'Avançar no carrossel');
    
    // Adicionar botões ao contêiner de controle
    carouselElement.parentElement.appendChild(controlsContainer);
    controlsContainer.appendChild(prevButton);
    controlsContainer.appendChild(nextButton);

    // 3. Lógica de Navegação (mantida)
    
    // Usa a classe fornecida ou tenta inferir
    let items = carouselElement.querySelectorAll(`.${itemClass}`);
    if (items.length === 0) {
        items = carouselElement.children;
        if (items.length === 0) {
            console.warn(`Nenhum item encontrado no carrossel. Classe do item: ${itemClass}`);
            return;
        }
    }
    
    let scrollDistance = 0;
    
    // Calcula a distância de rolagem
    function calculateScrollDistance() {
        if (items.length > 0) {
            const itemRect = items[0].getBoundingClientRect();
            
            // Verifica se o item possui largura. Se não, usa 300px como fallback (largura padrão dos cards)
            const itemWidth = itemRect.width > 0 ? itemRect.width : 300; 

            const carouselStyle = window.getComputedStyle(carouselElement);
            // Pega o valor do gap do contêiner flex/grid (padrão 1.5rem = 24px)
            const gap = parseFloat(carouselStyle.gap || 0); 
            
            // Distância total do item (largura + gap/margem direita)
            const itemFullWidth = itemWidth + gap;
            
            // Distância de rolagem: 3.5 itens ou 90% da largura do carrossel
            scrollDistance = itemFullWidth * 3.5;

            if (scrollDistance > carouselElement.clientWidth * 0.8) {
                 scrollDistance = carouselElement.clientWidth * 0.9;
            }
        }
    }
    
    window.addEventListener('load', calculateScrollDistance);
    window.addEventListener('resize', calculateScrollDistance);
    calculateScrollDistance(); 
    
    prevButton.addEventListener('click', () => {
        carouselElement.scrollLeft -= scrollDistance;
        updateButtonsVisibility();
    });

    nextButton.addEventListener('click', () => {
        carouselElement.scrollLeft += scrollDistance;
        updateButtonsVisibility();
    });

    // 4. Visibilidade dos Botões (mantida)
    function updateButtonsVisibility() {
        const currentScroll = Math.round(carouselElement.scrollLeft); 
        const maxScroll = Math.round(carouselElement.scrollWidth - carouselElement.clientWidth);
        
        prevButton.style.opacity = currentScroll <= 5 ? '0.5' : '1';
        prevButton.disabled = currentScroll <= 5; 

        nextButton.style.opacity = currentScroll >= maxScroll - 5 ? '0.5' : '1';
        nextButton.disabled = currentScroll >= maxScroll - 5;
    }
    
    carouselElement.addEventListener('scroll', updateButtonsVisibility);
    
    setTimeout(updateButtonsVisibility, 100); 
}

// 5. Inicialização para Múltiplos Carrosséis (Classe: .carrossel-main)
const carousels = document.querySelectorAll('.carrossel-main');
    
carousels.forEach(carousel => {
    // Tenta obter a classe do item do atributo data-item-class ou usa o padrão
    const itemClass = carousel.getAttribute('data-item-class') || 'wsd-screenshot';
    initializeCarousel(carousel, itemClass);
});