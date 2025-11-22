// JS Básico para o Modal (Proibido usar alert/confirm)
const modal = document.getElementById('delete-modal');
const closeBtn = document.querySelector('.wsd-close-btn');
const cancelBtn = document.querySelector('.wsd-modal-cancel');
const confirmBtn = document.querySelector('.wsd-modal-confirm');

function createPage() {
    // URL simulada que você deseja carregar. 
    // Certifique-se de que o arquivo existe!
    const jsonUrl = 'res/apps/memorygame.json'; 

    document.addEventListener('DOMContentLoaded', async () => {
        try {
                // Chamada da função assíncrona
                const data = await readJsonFile(jsonUrl);
                const appIcon = document.getElementById('appIcon');
                const appMessage = document.getElementById('appMessage');
                
                const icon = document.createElement('img');
                icon.src = data.icon.url;
                icon.ariaLabel = data.icon.ariaLabel;
                appIcon.appendChild(icon);

                const appName = document.getElementsByClassName('appName');
                Object.values(appName).forEach(item => item.innerText = data.appName)

                appMessage.innerText = data.message;
                
                if(data.reviews){
                    const stars = document.getElementById('appStars');
                    const totalReviews = document.getElementById('appReviewsCount');

                    stars.innerHTML = `${data.reviews.star} <span class="wsd-star-icon">★</span>`;
                    totalReviews.innerText = `(${data.reviews.total} Avaliações)`;
                }

                const description = document.getElementById('appDescription');
                description.innerText = data.text;

                const appUrl = document.getElementsByClassName('appURL');
                Object.values(appUrl).forEach(item => item.href = data.url)

                if(data.video){
                    const appVideoTitle = document.getElementById('appVideoTitle');
                    const appVideoPlayer = document.getElementById('appVideoPlayer');

                    appVideoTitle.innerText = data.video.title;
                    appVideoPlayer.innerHTML = `<iframe src="${data.video.url}" title="${data.video.description}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
                    appVideoPlayer.classList.add('wsd-video-wrapper');
                }

                if(data.image){
                    const appImageTitle = document.getElementById('appImageTitle');
                    appImageTitle.innerText = data.image.title;

                    const appImages = document.getElementById('appImages');
                    data.image.images.map(item => {
                        const imgElement = document.createElement('img');
                        imgElement.src = item.url;
                        imgElement.alt = item.ariaLabel;
                        imgElement.classList.add('wsd-screenshot')

                        appImages.appendChild(imgElement);
                    })
                }

                if(data.privacy){
                    const appPermission = document.getElementById('appPermissionsList');
                    data.privacy.permissions.map(item => {
                        appPermission.innerHTML += `
                            <li>
                                <p><strong>${item.name}:</strong> ${item.reason}</p>
                            </li>
                        `
                    });

                    if(data.privacy.dataUsage){
                        const appDataUsage = document.getElementById('appDataUsage');
                        appDataUsage.classList.add('wsd-privacy-card');
                        appDataUsage.innerHTML = `            
                            <h3 class="wsd-card-title">Como Usamos Seus Dados</h3>
                            <p>${data.privacy.dataUsage.data.length > 0 ? `O Memory Game necessita ${(data.privacy.dataUsage.data.length > 1) ? `das seguintes informações.`:`da seguinte informação.`}`: `O Memory Game não armazena nenhuma informação.`}</p>
                            <ul class="wsd-data-usage-list" id="appDataUsageList"></ul>
                            <p class="wsd-data-note" id="appDataUsageMessage"></p>
                        `;

                        const appDataUsageList = document.getElementById('appDataUsageList');
                        const appDataUsageMessage = document.getElementById('appDataUsageMessage');
                        data.privacy.dataUsage.data.map(item => appDataUsageList.innerHTML += `<li><strong>${item.name}</strong>: ${item.reason}</li>`);
                        appDataUsageMessage.innerHTML = data.privacy.dataUsage.message;
                    } else {
                        const appDataUsage = document.getElementById('appDataUsage');
                        appDataUsage.classList.add('wsd-privacy-card');
                        appDataUsage.innerHTML = `            
                            <h3 class="wsd-card-title">Como Usamos Seus Dados</h3>
                            <p>O Memory Game não armazena nenhuma informação.</p>
                            <ul class="wsd-data-usage-list" id="appDataUsageList"></ul>
                            <p class="wsd-data-note" id="appDataUsageMessage"></p>
                        `;
                    }

                    if(data.privacy.dataUsage && data.privacy.dataUsage.data.length > 1){
                        const appDeleteData = document.getElementById('appDeleteData');
                        appDeleteData.classList.add('wsd-privacy-card');
                        appDeleteData.classList.add('wsd-data-control');
                        appDeleteData.innerHTML = `
                            <h3 class="wsd-card-title wsd-text-error">Controle Total de Dados</h3>
                            <p>Seus dados são seus. Se decidir sair, garantimos a exclusão permanente de todas as suas informações de nossos servidores em até 48h.</p>
                            <button class="wsd-data-delete-btn" onclick="showDeleteConfirmation()">
                                Excluir Todos os Dados da Conta
                            </button>
                            <p class="wsd-data-note">Esta ação é irreversível e pode levar até 48h para processamento total.</p>
                        `;
                    }

                    const appVersion = document.getElementById('appVersion');
                    data.versions.map( (item, index) => {
                        appVersion.innerHTML += `
                            <details class="wsd-version-item" ${(index === 0) ? 'open' : ''}>
                                <summary class="wsd-version-number">Versão ${item.number}</summary>
                                <span class="wsd-version-date">${item.date}</span>
                                <h4 class="wsd-version-title">${item.title}</h4>
                                <ul>
                                    ${item.itens.map(item => `
                                        <li>${item}</li>
                                    `).join('')}
                                </ul>
                            </details>
                        `;
                    })

                    if(data.backlog){
                        const appBacklog = document.getElementById('appBacklog');
                        appBacklog.innerHTML = `
                            <section id="wsd-section-backlog" class="wsd-container wsd-section-backlog">
                                <h2 class="wsd-section-heading text-color-primary">Nosso Próximo Passo: Backlog</h2>
                                <p class="wsd-backlog-intro">
                                    Estamos sempre trabalhando para melhorar o ${data.appName}! Abaixo estão as funcionalidades mais votadas pela comunidade e que estão no nosso roadmap de desenvolvimento. Seu feedback impulsiona o que fazemos.
                                </p>

                                <div class="wsd-carousel-container">
                                    <div class="carrossel-main wsd-carousel-images wsd-backlog-carousel" data-item-class="wsd-backlog-card">
                                        ${data.backlog.map(item => `
                                            <div class="wsd-backlog-card ${(item.priority === 'Alta') ? 'wsd-priority-high' : ''} ${(item.priority === 'Média') ? 'wsd-priority-medium' : ''} ${(item.priority === 'Baixa') ? 'wsd-priority-low' : ''} wsd-screenshot">
                                                <h3 class="wsd-card-title">${item.title}</h3>
                                                <p>${item.text}</p>
                                                <span class="wsd-backlog-tag-priority">Prioridade: ${item.priority}</span>
                                                <span class="wsd-backlog-tag-status">Status: ${item.status}</span>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            </section>
                        `;
                    }

                    const appFATitle = document.getElementById('appFinalActionTitle');
                    const appFAText = document.getElementById('appFinalActionText');
                    const appFAButton = document.getElementById('appFinalActionButton');

                    appFATitle.innerText = data.finalAction.title;
                    appFAText.innerText = data.finalAction.text;
                    appFAButton.innerText = data.finalAction.buttonText;

                    const scripts = document.getElementById('scripts');
                    const script = document.createElement('script');
                    script.src = "js/carrossel.js";
                    script.defer = true;
                    scripts.appendChild(script);
                }
            } catch (error) {
                console.error("Não foi possível executar a leitura do JSON no DOM:", error);
                document.writeln("Não foi possível carregar a página. Tente atualizar ou retorne a página anterior.");
            }
        }
    );
}

createPage()

function showDeleteConfirmation() {
    modal.style.display = 'flex';
}

function hideDeleteConfirmation() {
    modal.style.display = 'none';
}

closeBtn.onclick = hideDeleteConfirmation;
cancelBtn.onclick = hideDeleteConfirmation;

confirmBtn.onclick = function() {
    // Lógica de exclusão aqui (simulação)
    console.log("Solicitação de exclusão de dados enviada para o servidor.");
    alert('Sua solicitação de exclusão de dados foi processada. Você receberá um e-mail de confirmação.');
    hideDeleteConfirmation();
}

window.onclick = function(event) {
    if (event.target == modal) {
        hideDeleteConfirmation();
    }
}

// Simulação de função alert (já que alert() real é proibido no ambiente)
function alert(message) {
    const tempAlert = document.createElement('div');
    tempAlert.className = 'wsd-temp-alert text-center';
    tempAlert.textContent = message;
    document.body.appendChild(tempAlert);
    
    setTimeout(() => {
        tempAlert.style.opacity = '0';
        tempAlert.style.transform = 'translateY(20px)';
        setTimeout(() => tempAlert.remove(), 500);
    }, 6000);
}