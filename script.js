// script.js

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const dropdownItems = document.querySelectorAll('.header__nav-item--dropdown');

    // Manejar la apertura y cierre del menú principal
    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('header__nav--active');
        menuToggle.classList.toggle('header__menu-toggle--active');
    });

    // Manejar la apertura y cierre de los submenús en dispositivos móviles
    dropdownItems.forEach(item => {
        const link = item.querySelector('.header__nav-link');
        link.addEventListener('click', (e) => {
            // Solo actuar en dispositivos móviles
            if (window.innerWidth <= 768) {
                e.preventDefault(); // Evitar el comportamiento por defecto del enlace
                const isActive = item.classList.contains('active');
                // Cerrar otros submenús
                dropdownItems.forEach(i => {
                    if (i !== item) {
                        i.classList.remove('active');
                    }
                });
                // Toggle el submenú actual
                item.classList.toggle('active', !isActive);
            }
        });
    });

    // Cerrar el menú al redimensionar la ventana
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('header__nav--active');
            menuToggle.classList.remove('header__menu-toggle--active');
            menuToggle.setAttribute('aria-expanded', 'false');
            dropdownItems.forEach(item => item.classList.remove('active'));
        }
    });
});

// Función para cargar contenido dinámicamente
function loadContent(page, title, bannerImage) {
    fetch(page)
        .then(response => response.text())
        .then(data => {
            document.getElementById('main-content').innerHTML = data;
            document.querySelector('.banner').style.backgroundImage = `url('${bannerImage}')`;
            document.title = `${title} - Valora, A.C.`;
            window.scrollTo(0, 0);
        })
        .catch(error => {
            console.error('Error al cargar el contenido:', error);
            document.getElementById('main-content').innerHTML = '<p>Error al cargar el contenido.</p>';
        });
}
