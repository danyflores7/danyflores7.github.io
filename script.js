function loadContent(page, bannerTitle, bannerImage) {
    // Crear una nueva solicitud XMLHttpRequest
    var xhr = new XMLHttpRequest();
    xhr.open('GET', page, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // Cargar el contenido en el elemento main
                document.getElementById('main-content').innerHTML = xhr.responseText;
                // Cambiar el banner
                updateBanner(bannerTitle, bannerImage);
                // Desplazar hacia el contenido principal en dispositivos móviles
                if (window.innerWidth < 768) {
                    window.scrollTo({
                        top: document.getElementById('main-content').offsetTop - 80, // Ajuste por la barra de navegación
                        behavior: 'smooth'
                    });
                }
            } else {
                // Manejo de errores
                document.getElementById('main-content').innerHTML = '<p>Lo sentimos, el contenido no está disponible.</p>';
            }
        }
    };
    xhr.send();
}

function updateBanner(title, image) {
    var banner = document.getElementById('banner');
    var bannerTitle = document.getElementById('banner-title');
    var bannerContent = banner.querySelector('.banner-content p');
    var ctaButton = banner.querySelector('.cta-button');

    // Añadir clase para iniciar la transición de desvanecimiento
    banner.classList.add('fade-out');

    // Esperar a que la transición termine antes de cambiar la imagen
    setTimeout(function() {
        // Actualizar título
        bannerTitle.textContent = title;

        // Actualizar imagen de fondo del banner
        banner.style.backgroundImage = 'url(' + image + ')';

        // Quitar clase de desvanecimiento
        banner.classList.remove('fade-out');
    }, 500); // Tiempo igual al de la transición CSS
}

// script.js
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const dropdowns = document.querySelectorAll('.dropdown');

    // Función para alternar el menú de navegación
    const toggleNavMenu = () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        // Actualizar atributos ARIA para accesibilidad
        const expanded = menuToggle.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', expanded);
        navMenu.setAttribute('aria-hidden', !expanded);

        // Forzar redibujo para actualizar la visualización de los submenús
        if (!navMenu.classList.contains('active')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
                const dropbtn = dropdown.querySelector('.dropbtn');
                dropbtn.setAttribute('aria-expanded', false);
            });
        }
    };

    // Función para alternar submenús en móviles
    const toggleDropdown = (dropdown) => {
        dropdown.classList.toggle('active');
        const dropbtn = dropdown.querySelector('.dropbtn');
        const expanded = dropdown.classList.contains('active');
        dropbtn.setAttribute('aria-expanded', expanded);

        // Forzar redibujo para asegurarse de que el submenú se vea inmediatamente
        dropdown.querySelector('.dropdown-content').style.display = 'block';
        void dropdown.offsetWidth; // Esto fuerza el navegador a "redibujar" el elemento
        dropdown.querySelector('.dropdown-content').style.display = '';
    };

    // Event Listener para el menú hamburguesa
    menuToggle.addEventListener('click', toggleNavMenu);

    // Event Listeners para los dropdowns
    dropdowns.forEach(dropdown => {
        const dropbtn = dropdown.querySelector('.dropbtn');
        dropbtn.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault(); // Evitar comportamiento predeterminado
                toggleDropdown(dropdown);
            }
        });
    });

    // Cerrar el menú cuando se hace clic fuera de él
    document.addEventListener('click', (e) => {
        const isClickInsideMenu = navMenu.contains(e.target) || menuToggle.contains(e.target);
        if (!isClickInsideMenu && navMenu.classList.contains('active')) {
            toggleNavMenu();
            // Cerrar todos los dropdowns
            dropdowns.forEach(dropdown => {
                if (dropdown.classList.contains('active')) {
                    dropdown.classList.remove('active');
                    const dropbtn = dropdown.querySelector('.dropbtn');
                    dropbtn.setAttribute('aria-expanded', false);
                }
            });
        }
    });

    // Cerrar el menú al hacer clic en un enlace que no es dropbtn (especialmente en móviles)
    navMenu.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' && !e.target.classList.contains('dropbtn')) {
            toggleNavMenu();
            // Cerrar todos los dropdowns
            dropdowns.forEach(dropdown => {
                if (dropdown.classList.contains('active')) {
                    dropdown.classList.remove('active');
                    const dropbtn = dropdown.querySelector('.dropbtn');
                    dropbtn.setAttribute('aria-expanded', false);
                }
            });
        }
    });

    // Actualizar el menú en caso de redimensionar la ventana
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            if (navMenu.classList.contains('active')) {
                toggleNavMenu();
            }
            // Asegurarse de que todos los dropdowns estén cerrados
            dropdowns.forEach(dropdown => {
                if (dropdown.classList.contains('active')) {
                    dropdown.classList.remove('active');
                    const dropbtn = dropdown.querySelector('.dropbtn');
                    dropbtn.setAttribute('aria-expanded', false);
                }
            });
        }
    });
});


// document.addEventListener('DOMContentLoaded', () => {
//     const menuToggle = document.getElementById('mobile-menu-toggle');
//     const navMenu = document.getElementById('nav-menu');
//     const dropdowns = document.querySelectorAll('.dropdown');

//     // Función para alternar el menú de navegación
//     const toggleNavMenu = () => {
//         navMenu.classList.toggle('active');
//         menuToggle.classList.toggle('active');
//         // Actualizar atributos ARIA para accesibilidad
//         const expanded = menuToggle.classList.contains('active');
//         menuToggle.setAttribute('aria-expanded', expanded);
//         navMenu.setAttribute('aria-hidden', !expanded);
//     };

//     // Función para alternar submenús en móviles
//     const toggleDropdown = (dropdown) => {
//         dropdown.classList.toggle('active');
//         const dropbtn = dropdown.querySelector('.dropbtn');
//         const expanded = dropdown.classList.contains('active');
//         dropbtn.setAttribute('aria-expanded', expanded);
//     };

//     // Event Listener para el menú hamburguesa
//     menuToggle.addEventListener('click', toggleNavMenu);

//     // Event Listeners para los dropdowns
//     dropdowns.forEach(dropdown => {
//         const dropbtn = dropdown.querySelector('.dropbtn');
//         dropbtn.addEventListener('click', (e) => {
//             if (window.innerWidth <= 768) {
//                 e.preventDefault(); // Evitar comportamiento predeterminado
//                 toggleDropdown(dropdown);
//             }
//         });
//     });

//     // Cerrar el menú cuando se hace clic fuera de él
//     document.addEventListener('click', (e) => {
//         const isClickInsideMenu = navMenu.contains(e.target) || menuToggle.contains(e.target);
//         if (!isClickInsideMenu && navMenu.classList.contains('active')) {
//             toggleNavMenu();
//             // Cerrar todos los dropdowns
//             dropdowns.forEach(dropdown => {
//                 if (dropdown.classList.contains('active')) {
//                     dropdown.classList.remove('active');
//                     const dropbtn = dropdown.querySelector('.dropbtn');
//                     dropbtn.setAttribute('aria-expanded', false);
//                 }
//             });
//         }
//     });

//     // Cerrar el menú al hacer clic en un enlace que no es dropbtn (especialmente en móviles)
//     navMenu.addEventListener('click', (e) => {
//         if (e.target.tagName === 'A' && !e.target.classList.contains('dropbtn')) {
//             toggleNavMenu();
//             // Cerrar todos los dropdowns
//             dropdowns.forEach(dropdown => {
//                 if (dropdown.classList.contains('active')) {
//                     dropdown.classList.remove('active');
//                     const dropbtn = dropdown.querySelector('.dropbtn');
//                     dropbtn.setAttribute('aria-expanded', false);
//                 }
//             });
//         }
//     });

//     // Actualizar el menú en caso de redimensionar la ventana
//     window.addEventListener('resize', () => {
//         if (window.innerWidth > 768) {
//             if (navMenu.classList.contains('active')) {
//                 toggleNavMenu();
//             }
//             // Asegurarse de que todos los dropdowns estén cerrados
//             dropdowns.forEach(dropdown => {
//                 if (dropdown.classList.contains('active')) {
//                     dropdown.classList.remove('active');
//                     const dropbtn = dropdown.querySelector('.dropbtn');
//                     dropbtn.setAttribute('aria-expanded', false);
//                 }
//             });
//         }
//     });
// });



// Interactividad del menú hamburguesa
// document.getElementById('mobile-menu-toggle').addEventListener('click', function() {
//     var navMenu = document.getElementById('nav-menu');
//     navMenu.classList.toggle('active');
// });

// // Manejar el clic en elementos del menú con submenús en móviles
// var dropdowns = document.querySelectorAll('.dropdown');

// dropdowns.forEach(function(dropdown) {
//     dropdown.addEventListener('click', function(e) {
//         if (window.innerWidth <= 768) {
//             e.preventDefault();
//             this.classList.toggle('active');
//         }
//     });
// });
