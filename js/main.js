(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            const spinnerElement = document.getElementById('spinner');
            if (spinnerElement) {
                spinnerElement.classList.remove('show');
                setTimeout(() => spinnerElement.style.display = 'none', 1000);
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').css('top', '0px');
        } else {
            $('.sticky-top').css('top', '-100px');
        }
    });
    
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').addClass('active');
        } else {
            $('.back-to-top').removeClass('active');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        autoplayTimeout: 7000,
        autoplaySpeed: 2000,
        autoplayHoverPause: true,
        smartSpeed: 1500,
        items: 1,
        dots: true,
        loop: true,
        nav: false,
        animateIn: 'fadeIn',
        animateOut: 'fadeOut',
        onInitialized: function() {
            console.log('¡Carrusel listo para girar! 🎠');
        },
        onTranslated: function() {
            $('.owl-dot.active').addClass('bounce');
            setTimeout(function() {
                $('.owl-dot.active').removeClass('bounce');
            }, 200);
        }
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav : false,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
    // Smooth scroll para los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('.nav-main');
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(0,0,0,0.8)';
        } else {
            nav.style.background = 'rgba(0,0,0,0.3)';
        }
    });

    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true
    });

    // Manejo del formulario de contacto
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Aquí iría la lógica de envío
            const button = this.querySelector('button[type="submit"]');
            button.innerHTML = '<i class="fas fa-check"></i> ' + (localStorage.getItem('selectedLanguage') === 'en' ? 'Sent!' : localStorage.getItem('selectedLanguage') === 'pt' ? 'Enviado!' : '¡Enviado!');
            button.classList.add('success');
            
            // Resetear después de 3 segundos
            setTimeout(() => {
                button.innerHTML = translations[localStorage.getItem('selectedLanguage') || 'es']['contact.send'];
                button.classList.remove('success');
                this.reset();
            }, 3000);
        });
    }

    // Efecto typing para títulos
    document.addEventListener('DOMContentLoaded', function() {
        const titles = document.querySelectorAll('.display-3');
        titles.forEach(title => {
            title.classList.add('typing-effect');
        });
    });

    // Transiciones entre páginas
    document.body.classList.add('fade-transition');
    window.onload = () => {
        document.body.classList.add('show');
    }

    // Mejorar el comportamiento del botón de scroll
    window.addEventListener('scroll', function() {
        const backToTop = document.querySelector('.back-to-top');
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    // Optimización de carrusel para móviles
    $(window).on('resize', function() {
        if ($(window).width() < 768) {
            $('.header-carousel').trigger('refresh.owl.carousel');
        }
    });

    // Mejorar comportamiento del dropdown de idiomas en móvil
    $(document).ready(function() {
        const $dropdown = $(".dropdown");
        
        if ($(window).width() <= 768) {
            // En móvil, toggle al click
            $('.dropdown-toggle').on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                $(this).next('.dropdown-menu').slideToggle(300);
            });

            // Cerrar al seleccionar idioma
            $('.language-option').on('click', function() {
                $(this).closest('.dropdown-menu').slideUp(300);
                $('.navbar-collapse').collapse('hide');
            });

            // Cerrar al tocar fuera
            $(document).on('click', function(e) {
                if (!$(e.target).closest('.dropdown').length) {
                    $('.dropdown-menu').slideUp(300);
                }
            });
        }
    });

    // Reemplazamos el código problemático en main.js
    document.addEventListener('DOMContentLoaded', function() {
        console.log('[Debug] Main.js loaded successfully');
        
        // Eliminamos cualquier referencia al spinner
        // Código seguro que no intenta acceder a elementos que podrían no existir
    });
})(jQuery);
