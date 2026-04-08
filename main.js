import './less/style.less';

document.addEventListener("DOMContentLoaded", () => {
    /* ====== MOBILE NAV TOGGLE & SCROLL ====== */
    const menuToggle = document.querySelector(".menu-toggle");
    const navUl = document.querySelector("nav ul");
    const header = document.querySelector("header");

    if (menuToggle && navUl) {
        menuToggle.addEventListener("click", () => {
            menuToggle.classList.toggle("active");
            navUl.classList.toggle("active");
            
            // Prevent body scroll when menu is open
            if(navUl.classList.contains("active")) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "auto";
            }
        });
    }

    // Shrink header on scroll
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    /* ====== INTERSECTION OBSERVER FOR FADE-UP ====== */
    const animatedElements = document.querySelectorAll(".fade-up, .fade-in, .card, .gallery-item");
    
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }, (index % 4) * 150); 
                
                if(!entry.target.classList.contains("fade-up") && !entry.target.classList.contains("fade-in")) {
                    entry.target.classList.add("fade-up", "visible");
                }
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));

    /* ====== FORM VALIDATION ====== */
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;

            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const mensaje = document.getElementById('mensaje').value;

            if(nombre && email && mensaje) {
                btn.innerHTML = "Enviando... <span style='font-size: 1.2rem; margin-left:8px;'>✈️</span>";
                btn.style.opacity = "0.8";
                
                setTimeout(() => {
                    alert(`¡Excelente ${nombre}! Recibimos tu solicitud. Un ejecutivo se contactará en breve.`);
                    contactForm.reset();
                    btn.innerHTML = "Mensaje Enviado ✓";
                    btn.style.background = "#10b981"; 
                    
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.style.background = "";
                        btn.style.opacity = "1";
                    }, 3000);
                }, 1500);
            }
        });
    }

    /* ====== ACTIVE LINK HIGHLIGHTING ====== */
    const currentLocation = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll("nav ul li a");
    
    navLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (href && (href === currentLocation || (href.includes(currentLocation) && currentLocation !== ""))) {
            link.classList.add("active");
        }
    });

    if (currentLocation === "" || currentLocation === "/" || currentLocation === "index.html") {
        const homeLink = document.querySelector('nav ul li a[href="./index.html"]') || document.querySelector('nav ul li a[href="../index.html"]') || document.querySelector('nav ul li a[href="/index.html"]') || document.querySelector('nav ul li a[href="/"]');
        if (homeLink) homeLink.classList.add("active");
    }
});
