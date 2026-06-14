document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. ACESSIBILIDADE: TAMANHO DA FONTE
    // ==========================================
    const btnFontIncrease = document.getElementById('btn-font-increase');
    const btnFontDecrease = document.getElementById('btn-font-decrease');
    let currentFontSize = 16;

    const updateFontSize = (size) => {
        if (size >= 12 && size <= 24) {
            currentFontSize = size;
            document.documentElement.style.fontSize = `${currentFontSize}px`;
        }
    };

    btnFontIncrease.addEventListener('click', () => updateFontSize(currentFontSize + 2));
    btnFontDecrease.addEventListener('click', () => updateFontSize(currentFontSize - 2));

    // ==========================================
    // 2. ACESSIBILIDADE: MODALIDADE DE CONTRASTE
    // ==========================================
    const btnContrast = document.getElementById('btn-contrast');
    btnContrast.addEventListener('click', () => {
        document.body.classList.toggle('high-contrast');
    });

    // ==========================================
    // 3. CARROSSEL (RENDERIZAÇÃO DATA-DRIVEN)
    // ==========================================
    const testimonialsData = [
        {
            quote: "A tecnologia trouxe meu filho de volta da capital. Hoje ele comanda os drones de pulverização e a análise de solo. Nossa produção de grãos subiu 35% e a fazenda agora tem um futuro claro.",
            author: "Ronaldo Lima",
            meta: "Produtor Rural - Castro/PR"
        },
        {
            quote: "Eu achava que o agro era só esforço físico bruto. Quando vi o sistema de monitoramento por inteligência artificial e a preservação das nossas nascentes, entendi o meu propósito aqui.",
            author: "Matheus Silva",
            meta: "Eng. Agrônomo e Sucessor Familiar"
        },
        {
            quote: "Unir a sabedoria do meu pai com práticas sustentáveis automatizadas transformou nossa propriedade em referência regional de carbono neutro.",
            author: "Camila Antunes",
            meta: "Diretora de Operações Agroecológicas"
        }
    ];

    const carouselTrack = document.getElementById('carousel-track');
    
    testimonialsData.forEach(item => {
        const slide = document.createElement('div');
        slide.classList.add('testimonial-slide');
        slide.setAttribute('role', 'group');
        slide.setAttribute('aria-roledescription', 'slide');
        
        slide.innerHTML = `
            <p class="testimonial-quote">"${item.quote}"</p>
            <div class="testimonial-author">${item.author}</div>
            <div class="testimonial-meta">${item.meta}</div>
        `;
        carouselTrack.appendChild(slide);
    });

    // Lógica do Carrossel
    const btnPrev = document.getElementById('carousel-prev');
    const btnNext = document.getElementById('carousel-next');
    let currentSlide = 0;

    const moveCarousel = (index) => {
        if (index >= testimonialsData.length) currentSlide = 0;
        else if (index < 0) currentSlide = testimonialsData.length - 1;
        else currentSlide = index;
        
        carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    };

    btnNext.addEventListener('click', () => moveCarousel(currentSlide + 1));
    btnPrev.addEventListener('click', () => moveCarousel(currentSlide - 1));

    // ==========================================
    // 4. ACORDEÃO (RENDERIZAÇÃO DATA-DRIVEN)
    // ==========================================
    const faqData = [
        {
            question: "Como a tecnologia ajuda diretamente na sucessão familiar?",
            answer: "A nova geração é nativa digital. Ao trazer automação, análise de dados e sistemas inteligentes, a gestão da propriedade torna-se um desafio estratégico e moderno, gerando forte atrativo profissional para os jovens."
        },
        {
            question: "Preciso investir muito dinheiro logo no início?",
            answer: "Não. O processo de modernização sustentável é modular. Começamos corrigindo falhas básicas de manejo com dados e, escalonadamente, reinvestimos o lucro gerado em tecnologias mais robustas."
        },
        {
            question: "Minha propriedade é de médio porte. Serve para mim?",
            answer: "Com certeza. Tecnologias sustentáveis e de precisão hoje são altamente escaláveis e adaptáveis para fazendas de qualquer tamanho, com foco principal na otimização de margem de lucro."
        }
    ];

    const accordionContainer = document.getElementById('faq-accordion');

    faqData.forEach((item, index) => {
        const accItem = document.createElement('div');
        accItem.classList.add('accordion-item');

        accItem.innerHTML = `
            <button class="accordion-header" aria-expanded="false" aria-controls="faq-content-${index}">
                <span>${item.question}</span>
                <span class="accordion-icon" aria-hidden="true">▼</span>
            </button>
            <div id="faq-content-${index}" class="accordion-content">
                <p>${item.answer}</p>
            </div>
        `;
        accordionContainer.appendChild(accItem);
    });

    // Lógica do Acordeão
    const headers = accordionContainer.querySelectorAll('.accordion-header');
    
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const content = item.querySelector('.accordion-content');
            const isExpanded = header.getAttribute('aria-expanded') === 'true';

            // Fecha todos antes de abrir o atual
            accordionContainer.querySelectorAll('.accordion-item').forEach(i => {
                i.classList.remove('active');
                i.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
                i.querySelector('.accordion-content').style.maxHeight = null;
            });

            if (!isExpanded) {
                item.classList.add('active');
                header.setAttribute('aria-expanded', 'true');
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // ==========================================
    // 5. ENVIO DO FORMULÁRIO (CONVERSÃO)
    // ==========================================
    const form = document.getElementById('landing-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Diagnóstico Solicitado com Sucesso! Nossa equipe entrará em contato nas próximas 24 horas.');
        form.reset();
    });
});