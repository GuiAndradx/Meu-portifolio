document.addEventListener('DOMContentLoaded', () => {
    const WHATSAPP_NUMBER = '5521966447779'; // Seu número de WhatsApp aqui
    const GENERAL_PIX_KEY = "21966447779"; // Sua chave Pix geral aqui

    // --- Funções para o Modal Padrão (Compartilhar/QR Code do Site) ---
    const qrCodeBtn = document.getElementById('qrCodeBtn');
    const qrCodeModal = document.getElementById('qrCodeModal');
    const closeSiteQrButton = document.querySelector('#qrCodeModal .close-button');
    const qrCodeContainer = document.getElementById('qrcode');

    if (qrCodeBtn && qrCodeModal && closeSiteQrButton && qrCodeContainer) {
        qrCodeBtn.addEventListener('click', () => {
            qrCodeModal.style.display = 'flex';
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

    // --- Modal para a Chave Pix Geral (MANTIDO NO CABEÇALHO) ---
    const generalPixBtnLink = document.getElementById('generalPixBtnLink');
    const generalPixModal = document.getElementById('generalPixModal');
    const closeGeneralPixButton = document.querySelector('#generalPixModal .close-button');
    const generalPixKeyDisplay = document.getElementById('generalPixKeyDisplay');
    const copyGeneralPixKeyBtn = document.getElementById('copyGeneralPixKeyBtn');

    if (generalPixBtnLink && generalPixModal && closeGeneralPixButton && generalPixKeyDisplay && copyGeneralPixKeyBtn) {
        generalPixBtnLink.addEventListener('click', () => {
            generalPixKeyDisplay.textContent = GENERAL_PIX_KEY;
            generalPixModal.style.display = 'flex';
        });

        copyGeneralPixKeyBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(GENERAL_PIX_KEY);
                alert('Chave Pix copiada para a área de transferência!');
            } catch (err) {
                console.error('Erro ao copiar a chave Pix geral: ', err);
                alert('Erro ao copiar a chave Pix. Por favor, copie manualmente: ' + GENERAL_PIX_KEY);
            }
        });

        closeGeneralPixButton.addEventListener('click', () => {
            generalPixModal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === generalPixModal) {
                generalPixModal.style.display = 'none';
            }
        });
    }

    // --- NOVO: Lógica para os Botões "Copiar Chave Pix Geral" dentro de CADA PRODUTO ---
    document.querySelectorAll('.copy-general-pix-button-item').forEach(button => {
        button.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(GENERAL_PIX_KEY);
                alert('Chave Pix geral copiada para a área de transferência!');
            } catch (err) {
                console.error('Erro ao copiar a chave Pix geral do item do produto: ', err);
                alert('Erro ao copiar a chave Pix. Por favor, copie manualmente: ' + GENERAL_PIX_KEY);
            }
        });
    });

    // --- Lógica para Botão de Orçamento Personalizado no WhatsApp ---
    document.querySelectorAll('.whatsapp-budget-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const productName = event.currentTarget.dataset.productName;
            const message = encodeURIComponent(`Olá! Gostaria de fazer um orçamento personalizado referente ao produto: ${productName}.`);
            const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
            window.open(whatsappUrl, '_blank');
        });
    });


    // --- Lógica para o seletor de Placas PREMIUM (A6, A5, A4) ---
    const placaPremiumTypeSelect = document.getElementById('placa-premium-type-select');
    const placaPremiumImage = document.getElementById('placa-premium-image');
    const placaPremiumDimensions = document.getElementById('placa-premium-dimensions');
    const placaPremiumDescription = document.getElementById('placa-premium-description');
    const placaPremiumPrice = document.getElementById('placa-premium-price');

    const placaPremiumOptions = {
        'a6-premium': {
            imgSrc: 'placa.jpg', // Imagem da placa A6 Premium
            dimensions: 'Medidas: 11cm x 15cm',
            description: 'Transforme a experiência do seu cliente com placas NFC programáveis para promoções, informações de produtos ou informações do local. Contém proteção de resina que mantém o brilho e evita desgastes.',
            price: 'R$ 139,90',
        },
        'a5-premium': {
            imgSrc: 'placa.jpg', // USANDO A MESMA IMAGEM DA A6 PREMIUM
            dimensions: 'Medidas: 15cm x 21cm',
            description: 'Transforme a experiência do seu cliente com placas NFC programáveis para promoções, informações de produtos ou informações do local. Contém proteção de resina que mantém o brilho e evita desgastes.',
            price: 'R$ 199,90',
        },
        'a4-premium': {
            imgSrc: 'placa.jpg', // USANDO A MESMA IMAGEM DA A6 PREMIUM
            dimensions: 'Medidas: 21cm x 30cm',
            description: 'Ideal para recepções, propagandas e eventos. Permite que seus clientes acessem informações, menus ou promoções via NFC com um toque. Contém proteção de resina que mantém o brilho e evita desgastes.',
            price: 'R$ 269,90',
        }
    };

    const updatePlacaPremiumDetails = (selectedType) => {
        const data = placaPremiumOptions.hasOwnProperty(selectedType) ? placaPremiumOptions[selectedType] : placaPremiumOptions['a6-premium'];
        placaPremiumImage.src = data.imgSrc;
        placaPremiumDimensions.textContent = data.dimensions;
        placaPremiumDescription.textContent = data.description;
        placaPremiumPrice.textContent = data.price;
    };

    if (placaPremiumTypeSelect) {
        placaPremiumTypeSelect.addEventListener('change', (event) => {
            updatePlacaPremiumDetails(event.target.value);
        });
        updatePlacaPremiumDetails(placaPremiumTypeSelect.value); // Define os detalhes iniciais
    }

    // --- Lógica para o seletor de Placas NORMAIS (A6, A5, A4) ---
    const placaComumTypeSelect = document.getElementById('placa-comum-type-select');
    const placaComumImage = document.getElementById('placa-comum-image');
    const placaComumDimensions = document.getElementById('placa-comum-dimensions');
    const placaComumDescription = document.getElementById('placa-comum-description');
    const placaComumPrice = document.getElementById('placa-comum-price');
    
    const placaComumOptions = {
        'a6-comum': {
            imgSrc: 'placa comum.png', // Imagem da placa A6 Comum
            dimensions: 'Medidas: 11cm x 15cm',
            description: 'Transforme a experiência do seu cliente com placas NFC programáveis para promoções, informações de produtos ou informações do local.',
            price: 'R$ 99,90',
        },
        'a5-comum': {
            imgSrc: 'placa comum.png', // USANDO A MESMA IMAGEM DA A6 COMUM
            dimensions: 'Medidas: 15cm x 21cm',
            description: 'Transforme a experiência do seu cliente com placas NFC programáveis para promoções, informações de produtos ou informações do local.',
            price: 'R$ 159,90',
        },
        'a4-comum': {
            imgSrc: 'placa comum.png', // USANDO A MESMA IMAGEM DA A6 COMUM
            dimensions: 'Medidas: 21cm x 29.7cm',
            description: 'Ideal para recepções, propagandas e eventos. Permite que seus clientes acessem informações, menus ou promoções via NFC com um toque.',
            price: 'R$ 219,90',
        }
    };

    const updatePlacaComumDetails = (selectedType) => {
        const data = placaComumOptions.hasOwnProperty(selectedType) ? placaComumOptions[selectedType] : placaComumOptions['a6-comum'];
        placaComumImage.src = data.imgSrc;
        placaComumDimensions.textContent = data.dimensions;
        placaComumDescription.textContent = data.description;
        placaComumPrice.textContent = data.price;
    };

    if (placaComumTypeSelect) {
        placaComumTypeSelect.addEventListener('change', (event) => {
            updatePlacaComumDetails(event.target.value);
        });
        updatePlacaComumDetails(placaComumTypeSelect.value); // Define os detalhes iniciais
    }
});
