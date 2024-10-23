document.addEventListener('DOMContentLoaded', () => {
    // Seletores principais
    const menuIcon = document.getElementById('menu-icon');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const tabs = document.querySelectorAll('.tab-link');
    const contents = document.querySelectorAll('.tab-content');
    const masonryContainer = document.querySelector('.masonry-container'); // Adicione esta classe ao container do layout masonry

    // 1. Toggle do Menu Hamburger
    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // 2. Ativação de Abas
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Fechar o menu móvel após clicar em um link
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuIcon.classList.remove('active');
            }

            // Remover a classe 'active' de todas as abas
            tabs.forEach(tab => tab.classList.remove('active'));
            link.parentElement.classList.add('active');

            // Remover a classe 'active' de todo o conteúdo das abas
            contents.forEach(content => content.classList.remove('active'));

            // Adicionar a classe 'active' ao conteúdo correspondente
            const target = link.parentElement.getAttribute('data-tab');
            const activeContent = document.getElementById(target);
            if (activeContent) {
                activeContent.classList.add('active');
                // Scroll suave para a seção ativa
                activeContent.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 3. Ativação de Abas via Hash na URL
    const currentHash = window.location.hash.substring(1);
    if (currentHash) {
        const activeTab = document.querySelector(`.tab-link[data-tab="${currentHash}"]`);
        if (activeTab) {
            tabs.forEach(tab => tab.classList.remove('active'));
            activeTab.classList.add('active');

            contents.forEach(content => content.classList.remove('active'));
            document.getElementById(currentHash).classList.add('active');
        }
    }

    // 4. Efeito de Digitação
    const typingElements = document.querySelectorAll('.typing-effect');
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        let index = 0;
        const speed = 100; // Velocidade de digitação em milissegundos

        const type = () => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, speed);
            }
        };

        type();
    });

    // 5. Animações ao Scrollar usando IntersectionObserver
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% de visibilidade
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target); // Parar de observar após animar
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // 6. Exibir a primeira aba por padrão
    tabs[0]?.click();
});

// Função para enviar formulários com base no tipo
function enviarFormulario(event, formType) {
    event.preventDefault(); // Prevenir o envio padrão do formulário

    const form = event.target; // Formulário que disparou o envio
    const formData = new FormData(form); // Criar um objeto FormData

    // Converter FormData para um objeto JSON
    const dados = {};
    formData.forEach((value, key) => {
        dados[key] = value;
    });

    let url;
    switch (formType) {
        case 'contato_geral':
            url = '/api/contato_geral';
            break;
        case 'demonstracao_teste':
            url = '/api/demonstracao_teste';
            break;
        case 'proposta_comercial':
            url = '/api/proposta_comercial';
            break;
        case 'feedback':
            url = '/api/feedback';
            break;
        case 'cadastro_interesse':
            url = '/api/cadastro_interesse';
            break;
        default:
            console.error('Formulário não reconhecido');
            return;
    }

    // Enviar os dados para a API
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Informar que estamos enviando JSON
        },
        body: JSON.stringify(dados), // Converter o objeto para JSON
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message); // Exibir a mensagem de sucesso
        form.reset(); // Resetar o formulário após o envio
    })
    .catch(error => {
        console.error('Erro:', error); // Exibir erros
        alert('Ocorreu um erro ao enviar o formulário.');
    });
}
