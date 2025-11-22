function getFooterHTML() {
    // Usamos template literals para manter o HTML limpo
    return `
        <footer class="wsd-footer">
            <div class="wsd-container wsd-footer-grid">
                
                <!-- Coluna 1: Logo e Missão -->
                <div class="wsd-footer-col wsd-footer-brand">
                    <a href="./index.html" class="wsd-brand-logo-footer" aria-label="Página Inicial WorldscaleSD">
                        <span class="wsd-logo-white">Worldscale</span><span class="wsd-logo-blue">SD</span>
                    </a>
                    <p class="wsd-footer-mission">
                        Transformando o cotidiano através de soluções digitais inteligentes e integradas.
                    </p>
                </div>

                <!-- Coluna 2: Produtos -->
                <div class="wsd-footer-col">
                    <h4 class="wsd-footer-heading">Produtos</h4>
                    <ul class="wsd-footer-list hidden">
                        <li><a href="#" class="wsd-footer-link">PlayFlow (Lazer)</a></li>
                        <li><a href="#" class="wsd-footer-link">TaskMatrix (Trabalho)</a></li>
                        <li><a href="#" class="wsd-footer-link">LifeSync (Pessoal)</a></li>
                    </ul>
                </div>

                <!-- Coluna 3: Empresa -->
                <div class="wsd-footer-col">
                    <h4 class="wsd-footer-heading">Empresa</h4>
                    <ul class="wsd-footer-list hidden">
                        <li><a href="#empresa" class="wsd-footer-link">Sobre Nós</a></li>
                        <li><a href="#" class="wsd-footer-link">Carreiras</a></li>
                        <li><a href="#" class="wsd-footer-link">Imprensa</a></li>
                    </ul>
                </div>

                <!-- Coluna 4: Suporte -->
                <div class="wsd-footer-col">
                    <h4 class="wsd-footer-heading">Suporte</h4>
                    <ul class="wsd-footer-list">
                        <li><a href="./index.html#contato" class="wsd-footer-link">Fale Conosco</a></li>
                        <li><a href="https://worldscalesd.github.io/privacypolicy/privacypolice.html" target="_blank" class="wsd-footer-link">Política de Privacidade</a></li>
                    </ul>
                </div>
            </div>

            <!-- Direitos Autorais e Marca -->
            <div class="wsd-footer-bottom wsd-container text-center">
                <p class="wsd-copyright">&copy; <time datetime="2025">2025</time> WorldscaleSD. Todos os direitos reservados.</p>
            </div>
        </footer>
    `;
}

/**
 * Injeta a string HTML no DOM.
 */
renderMenu = () => {
    document.querySelector('main').insertAdjacentHTML('afterend', this.getFooterHTML());
}

// Inicializa a injeção e funcionalidade após o carregamento do DOM
document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
});