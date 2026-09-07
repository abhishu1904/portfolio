const body = document.body;
const loader = document.getElementById("loader");
const themeToggle = document.getElementById("themeToggle");
const mobileMenuButton = document.getElementById("mobileMenuButton");
const mobileMenu = document.getElementById("mobileMenu");
const typingText = document.getElementById("typingText");
const contactForm = document.getElementById("contactForm");
const navLinks = document.querySelectorAll(".nav-link");
const mobileLinks = document.querySelectorAll(".mobile-menu a");
const sections = document.querySelectorAll("main section");

window.addEventListener("load", () => {
    setTimeout(() => {
        if (loader) {
            loader.classList.add("loaded");
        }
    }, 1500);
});

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "light") {
    body.classList.add("light-theme");
    if (themeToggle) {
        themeToggle.textContent = "☀";
    }
} else {
    if (themeToggle) {
        themeToggle.textContent = "◐";
    }
}

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        body.classList.toggle("light-theme");
        const isLight =
            body.classList.contains("light-theme");
        if (isLight) {
            themeToggle.textContent = "☀";
            localStorage.setItem(
                "portfolio-theme",
                "light"
            );
        } else {
            themeToggle.textContent = "◐";
            localStorage.setItem(
                "portfolio-theme",
                "dark"
            );
        }
    });
}

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
        mobileMenu.classList.toggle("active");
        const isOpen =
            mobileMenu.classList.contains("active");
        mobileMenuButton.setAttribute(
            "aria-expanded",
            isOpen
        );
    });
}

mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
        if (mobileMenu) {
            mobileMenu.classList.remove("active");
        }
        if (mobileMenuButton) {
            mobileMenuButton.setAttribute(
                "aria-expanded",
                "false"
            );
        }
    });
});

document.addEventListener("click", (event) => {
    if (!mobileMenu || !mobileMenuButton) {
        return;
    }
    const clickedInsideMenu =
        mobileMenu.contains(event.target);
    const clickedButton =
        mobileMenuButton.contains(event.target);
    if (
        !clickedInsideMenu &&
        !clickedButton
    ) {
        mobileMenu.classList.remove("active");
        mobileMenuButton.setAttribute(
            "aria-expanded",
            "false"
        );
    }
});

if (typingText) {
    const roles = [
        "Fullstack Developer",
        "Web Developer",
        "JavaScript Developer",
        "Problem Solver",
        "Tech Enthusiast"
    ];
    let roleIndex = 0;
    let characterIndex = 0;
    let deleting = false;
    const typingSpeed = 90;
    const deletingSpeed = 55;
    const pauseAfterTyping = 1600;
    const pauseAfterDeleting = 500;

    function typeRole() {
        const currentRole =
            roles[roleIndex];
        if (!deleting) {
            typingText.textContent =
                currentRole.substring(
                    0,
                    characterIndex + 1
                );
            characterIndex++;
            if (
                characterIndex ===
                currentRole.length
            ) {
                setTimeout(() => {
                    deleting = true;
                    typeRole();
                }, pauseAfterTyping);
                return;
            }
            setTimeout(
                typeRole,
                typingSpeed
            );
        }
        else {
            typingText.textContent =
                currentRole.substring(
                    0,
                    characterIndex - 1
                );
            characterIndex--;
            if (characterIndex === 0) {
                deleting = false;
                roleIndex =
                    (roleIndex + 1) %
                    roles.length;
                setTimeout(
                    typeRole,
                    pauseAfterDeleting
                );
                return;
            }
            setTimeout(
                typeRole,
                deletingSpeed
            );
        }
    }
    setTimeout(typeRole, 800);
}

function updateActiveNavigation() {
    let currentSection = "";
    const scrollPosition =
        window.scrollY + 150;
    sections.forEach(section => {
        const sectionTop =
            section.offsetTop;
        const sectionHeight =
            section.offsetHeight;
        if (
            scrollPosition >= sectionTop &&
            scrollPosition <
            sectionTop + sectionHeight
        ) {
            currentSection =
                section.getAttribute("id");
        }
    });
    navLinks.forEach(link => {
        link.classList.remove("active");
        const href =
            link.getAttribute("href");
        if (
            href === `#${currentSection}`
        ) {
            link.classList.add("active");
        }
    });
}

window.addEventListener(
    "scroll",
    updateActiveNavigation
);

window.addEventListener(
    "load",
    updateActiveNavigation
);

document
    .querySelectorAll('a[href^="#"]')
    .forEach(anchor => {
        anchor.addEventListener(
            "click",
            function (event) {
                const targetId =
                    this.getAttribute("href");
                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }
                const target =
                    document.querySelector(
                        targetId
                    );
                if (!target) {
                    return;
                }
                event.preventDefault();
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        );
    });

const revealElements =
    document.querySelectorAll(
        ".section-heading, " +
        ".about-text, " +
        ".detail-card, " +
        ".skill-card, " +
        ".project-card, " +
        ".timeline-item, " +
        ".contact-intro, " +
        ".contact-form"
    );

revealElements.forEach(element => {
    element.style.opacity = "0";
    element.style.transform =
        "translateY(30px)";
    element.style.transition =
        "opacity 0.7s ease, " +
        "transform 0.7s ease";
});

const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity =
                        "1";
                    entry.target.style.transform =
                        "translateY(0)";
                    observer.unobserve(
                        entry.target
                    );
                }
            });
        },
        {
            threshold: 0.12
        }
    );

revealElements.forEach(element => {
    revealObserver.observe(element);
});

function staggerCards(selector) {
    const cards =
        document.querySelectorAll(selector);
    cards.forEach((card, index) => {
        card.style.transitionDelay =
            `${index * 0.08}s`;
    });
}

staggerCards(".skill-card");
staggerCards(".project-card");
staggerCards(".detail-card");
staggerCards(".timeline-item");

const projectCards =
    document.querySelectorAll(
        ".project-card"
    );

projectCards.forEach(card => {
    card.addEventListener(
        "mousemove",
        (event) => {
            const rect =
                card.getBoundingClientRect();
            const x =
                event.clientX -
                rect.left;
            const y =
                event.clientY -
                rect.top;
            const centerX =
                rect.width / 2;
            const centerY =
                rect.height / 2;
            const rotateX =
                ((y - centerY) /
                    centerY) * -2;
            const rotateY =
                ((x - centerX) /
                    centerX) * 2;
            card.style.transform =
                `translateY(-8px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)`;
        }
    );
    card.addEventListener(
        "mouseleave",
        () => {
            card.style.transform =
                "translateY(0) rotateX(0) rotateY(0)";

        }
    );
});
const heroVisual =
    document.querySelector(
        ".hero-visual"
    );
const heroImage =
    document.querySelector(
        ".hero-image"
    );
if (
    heroVisual &&
    heroImage &&
    window.innerWidth > 700
) {
    heroVisual.addEventListener(
        "mousemove",
        (event) => {
            const rect =
                heroVisual.getBoundingClientRect();
            const x =
                event.clientX -
                rect.left -
                rect.width / 2;
            const y =
                event.clientY -
                rect.top -
                rect.height / 2;
            const moveX =
                x / 35;
            const moveY =
                y / 35;
            heroImage.style.transform =
                `translate(${moveX}px, ${moveY}px)`;
        }
    );

    heroVisual.addEventListener(
        "mouseleave",
        () => {
            heroImage.style.transform =
                "translate(0, 0)";
        }
    );
}

const particle =
    document.querySelector(
        ".particle"
    );

if (particle) {
    document.addEventListener(
        "mousemove",
        (event) => {
            if (window.innerWidth <= 700) {
                return;
            }
            const x =
                (event.clientX /
                    window.innerWidth) * 20;
            const y =
                (event.clientY /
                    window.innerHeight) * 20;
            particle.style.marginLeft =
                `${x}px`;
            particle.style.marginTop =
                `${y}px`;
        }
    );
}

if (contactForm) {
    contactForm.addEventListener(
        "submit",
        (event) => {
            event.preventDefault();
            const name =
                document.getElementById(
                    "name"
                ).value.trim();
            const email =
                document.getElementById(
                    "email"
                ).value.trim();
            const message =
                document.getElementById(
                    "message"
                ).value.trim();
            if (
                !name ||
                !email ||
                !message
            ) {
                alert(
                    "Please fill in all fields."
                );
                return;
            }
            const subject =
                encodeURIComponent(
                    `Portfolio Contact from ${name}`
                );
            const body =
                encodeURIComponent(
                    `Name: ${name}\n\n` +
                    `Email: ${email}\n\n` +
                    `Message:\n${message}`
                );
            const mailto =
                `mailto:sutradharhimansu@gmail.com` +
                `?subject=${subject}` +
                `&body=${body}`;
            window.location.href =
                mailto;
        }
    );
}

const buttons =
    document.querySelectorAll(
        ".primary-button, " +
        ".secondary-button, " +
        ".nav-button"
    );

buttons.forEach(button => {
    button.addEventListener(
        "click",
        () => {
            button.style.transform =
                "scale(0.97)";
            setTimeout(() => {
                button.style.transform =
                    "";
            }, 120);
        }
    );
});

window.addEventListener(
    "resize",
    () => {
        if (
            window.innerWidth > 700 &&
            mobileMenu
        ) {
            mobileMenu.classList.remove(
                "active"
            );
        }
        if (
            window.innerWidth <= 700 &&
            heroImage
        ) {
            heroImage.style.transform =
                "translate(0, 0)";
        }
    }
);

console.log(
    "%cHimansu Portfolio 🚀",
    "font-size: 18px; font-weight: bold;"
);

console.log(
    "Built with HTML, CSS and JavaScript."
);
