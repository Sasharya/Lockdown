document.addEventListener('DOMContentLoaded', () => {
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    tabLinks.forEach(link => {
        link.addEventListener('click', () => {
            const tab = link.getAttribute('data-tab');

            // Remove active class from all tabs and contents
            tabLinks.forEach(link => link.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to the selected tab and content
            link.classList.add('active');
            document.getElementById(tab).classList.add('active');
        });
    });

    // Show the first tab by default
    tabLinks[0].click();
});

// Function to send form data to the API
function enviarFormulario(event, formType) {
    event.preventDefault(); // Prevent the default form submission

    const form = event.target; // Get the form that triggered the submission
    const formData = new FormData(form); // Create a FormData object

    // Convert FormData to a JSON object
    const dados = {};
    formData.forEach((value, key) => {
        dados[key] = value; // Populate the dados object with form inputs
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
            console.error('Form type not recognized');
            return;
    }

    // Send the data to the API
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Indicate that we are sending JSON
        },
        body: JSON.stringify(dados), // Convert the JavaScript object to a JSON string
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message); // Display the success message from the API
        form.reset(); // Reset the form after submission
    })
    .catch(error => {
        console.error('Error:', error); // Handle errors
        alert('Ocorreu um erro ao enviar o formulário.');
    });
}


document.addEventListener('DOMContentLoaded', () => {
    const content = document.querySelector('.content', 'banner');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY || window.pageYOffset;
        if (scrollY > window.innerHeight / 2) { // When user scrolls halfway down the banner
            content.classList.add('visible');
        }
    });
});

// Add this script at the bottom of your body or in your script.js file
document.addEventListener('DOMContentLoaded', function() {
    const bannerContent = document.querySelector('.banner-content');
    bannerContent.classList.add('visible'); // Add visible class after loading
});

