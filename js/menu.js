/**
 * menu.js
 * Injeta a estrutura HTML do menu e adiciona a funcionalidade mobile.
 */

class DynamicMenuInjector {
    /**
     * Construtor da classe DynamicMenuInjector.
     * @param {string} injectionPoint - Seletor onde o menu será injetado (e.g., 'body').
     * @param {string} menuButtonSelector - Seletor do botão sanduíche.
     * @param {string} menuContainerSelector - Seletor do contêiner do menu a ser alternado.
     * @param {string} activeClass - Classe CSS para alternar a visibilidade do menu.
     */
    constructor(injectionPoint, menuButtonSelector, menuContainerSelector, activeClass = 'is-active') {
        this.injectionPoint = document.querySelector(injectionPoint);
        this.menuButtonSelector = menuButtonSelector;
        this.menuContainerSelector = menuContainerSelector;
        this.activeClass = activeClass;
        
        if (this.injectionPoint) {
            this.renderMenu();
            // Agora que o menu está no DOM, podemos inicializar a funcionalidade
            this.initFunctionalEvents();
        } else {
            console.error('DynamicMenuInjector: Ponto de injeção não encontrado no DOM.');
        }
    }

    /**
     * Retorna a string HTML completa do cabeçalho de navegação.
     */
    getMenuHTML() {
        // Usamos template literals para manter o HTML limpo
        return `
            <header class="wsd-header">
                <nav class="wsd-container wsd-nav">
                    <a href="./index.html" class="wsd-brand-logo text-gradient" aria-label="Página Inicial WorldscaleSD">
                        Worldscale<span class="wsd-logo-sd">SD</span>
                    </a>
                    
                    <div class="wsd-nav-menu md-flex md-flex-space-x-8">
                        <a href="./index.html" class="wsd-nav-link">&#x1F3E0</a>
                        <a href="./index.html#solucoes" class="wsd-nav-link">Soluções</a>
                        <a href="./index.html#jornada" class="wsd-nav-link">Nosso Ecossistema</a>
                        <a href="./index.html#contato" class="wsd-nav-link">Contato</a>
                    </div>
                    
                    <button class="wsd-mobile-menu-btn md-hidden" aria-label="Abrir Menu" aria-expanded="false">
                        <svg xmlns="http://www.w3.org/2000/svg" class="wsd-icon-menu" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </nav>
            </header>
        `;
    }

    /**
     * Injeta a string HTML no DOM.
     */
    renderMenu = () => {
        // Insere o HTML do menu como o primeiro filho do ponto de injeção (geralmente body)
        this.injectionPoint.insertAdjacentHTML('beforebegin', this.getMenuHTML());
    }

    /**
     * Inicializa os event listeners para a funcionalidade mobile.
     */
    initFunctionalEvents = () => {
        const menuButton = document.querySelector(this.menuButtonSelector);
        const menuContainer = document.querySelector(this.menuContainerSelector);

        if (!menuButton || !menuContainer) return;

        /**
         * Alterna a classe de ativação no contêiner do menu.
         */
        const toggleMenu = () => {
            menuContainer.classList.toggle(this.activeClass);
            const isExpanded = menuContainer.classList.contains(this.activeClass);
            menuButton.setAttribute('aria-expanded', isExpanded);
        }

        // 1. Evento de clique no botão
        menuButton.addEventListener('click', toggleMenu);

        // 2. Opcional: Fechar o menu ao clicar em um link de âncora (UX mobile)
        menuContainer.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', () => {
                if (menuContainer.classList.contains(this.activeClass)) {
                    toggleMenu();
                }
            });
        });
    }
}

// Inicializa a injeção e funcionalidade após o carregamento do DOM
document.addEventListener('DOMContentLoaded', () => {
    // Configuração: Injetar no <body>, usando os seletores de classe do HTML original
    new DynamicMenuInjector(
        'main',
        '.wsd-mobile-menu-btn',
        '.wsd-nav-menu',
        'is-active'
    );
});