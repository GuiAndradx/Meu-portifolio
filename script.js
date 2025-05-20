document.addEventListener('DOMContentLoaded', () => {
    // --- Funções para o Modal Padrão (Compartilhar/QR Code do Site) ---
    const qrCodeBtn = document.getElementById('qrCodeBtn');
    const qrCodeModal = document.getElementById('qrCodeModal');
    const closeSiteQrButton = document.querySelector('#qrCodeModal .close-button');
    const qrCodeContainer = document.getElementById('qrcode');

    if (qrCodeBtn && qrCodeModal && closeSiteQrButton && qrCodeContainer) {
        qrCodeBtn.addEventListener('click', () => {
            qrCodeModal.style.display = 'flex'; // Exibe o modal
            if (!qrCodeContainer.dataset.qrcodeGenerated) {
                const websiteUrl = window.location.href;
                new QRCode(qrCodeContainer, {
                    text: websiteUrl,
                    width: 180,
                    height: 180,
                    colorDark : "#000000",
                    colorLight : "#ffffff",
                    correctLevel : QRCode.CorrectLevel.H
                });
                qrCodeContainer.dataset.qrcodeGenerated = 'true';
            }
        });

        closeSiteQrButton.addEventListener('click', () => {
            qrCodeModal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === qrCodeModal) {
                qrCodeModal.style.display = 'none';
            }
        });
    }

    // --- Botão de Compartilhar ---
    const shareSiteBtn = document.getElementById('shareSiteBtn');
    if (shareSiteBtn) {
        shareSiteBtn.addEventListener('click', () => {
            if (navigator.share) {
                navigator.share({
                    title: document.title,
                    text: 'Confira meu portfólio de soluções NFC!',
                    url: window.location.href
                }).then(() => {
                    console.log('Conteúdo compartilhado com sucesso!');
                }).catch((error) => {
                    console.error('Erro ao compartilhar:', error);
                });
            } else {
                alert('O seu navegador não suporta a função de compartilhamento direto. Por favor, copie o link: ' + window.location.href);
            }
        });
    }

    // --- Funcionalidade de Expandir/Contrair Produtos ---
    const toggleProductsBtn = document.getElementById('toggleProductsBtn');
    const productsContent = document.getElementById('productsContent');
    const toggleIcon = toggleProductsBtn ? toggleProductsBtn.querySelector('.toggle-icon') : null;

    if (toggleProductsBtn && productsContent && toggleIcon) {
        toggleProductsBtn.addEventListener('click', () => {
            productsContent.classList.toggle('products-content-visible');
            productsContent.classList.toggle('products-content-hidden');
            toggleIcon.classList.toggle('rotated'); // Rotaciona a seta
        });
    }

    // --- Modal Pix do Produto (ABRIR SOMENTE) E COPIAR CÓDIGO ---
    const productPixModal = document.getElementById('productPixModal');
    const pixCloseButton = document.querySelector('.pix-close-button');
    const pixQrCodeImage = document.getElementById('pixQrCodeImage');
    const copyPixCodeBtn = document.getElementById('copyPixCodeBtn'); // NOVO: Botão de copiar

    let currentPixCode = ''; // Variável para armazenar o código Pix do produto atual

    if (productPixModal && pixCloseButton && pixQrCodeImage && copyPixCodeBtn) {
        // Event listener para todos os botões "Pagar com Pix"
        document.querySelectorAll('.pix-button').forEach(button => {
            button.addEventListener('click', (event) => {
                const qrCodeSrc = event.currentTarget.dataset.qrcode;
                currentPixCode = event.currentTarget.dataset.pixCode; // Pega o código Pix
                
                if (qrCodeSrc) {
                    pixQrCodeImage.src = qrCodeSrc;
                    productPixModal.style.display = 'flex'; // Exibe o modal Pix
                }
            });
        });

        // Event listener para o botão "Copiar Código Pix"
        copyPixCodeBtn.addEventListener('click', async () => {
            if (currentPixCode) {
                try {
                    await navigator.clipboard.writeText(currentPixCode);
                    alert('Código Pix copiado para a área de transferência!');
                } catch (err) {
                    console.error('Erro ao copiar o código Pix: ', err);
                    alert('Erro ao copiar o código Pix. Por favor, copie manualmente: ' + currentPixCode);
                }
            } else {
                alert('Nenhum código Pix disponível para copiar.');
            }
        });

        // Fechar modal Pix
        pixCloseButton.addEventListener('click', () => {
            productPixModal.style.display = 'none';
            currentPixCode = ''; // Limpa o código ao fechar
        });

        // Fechar modal Pix ao clicar fora dele
        window.addEventListener('click', (event) => {
            if (event.target === productPixModal) {
                productPixModal.style.display = 'none';
                currentPixCode = ''; // Limpa o código ao fechar
            }
        });
    }
});