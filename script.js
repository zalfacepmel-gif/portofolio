const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const toast = document.getElementById("toast");
const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

function showToast(message) {
    if (!toast) {
        return;
    }

    toast.textContent = message;
    toast.classList.add("show");

    window.clearTimeout(showToast.timeoutId);
    showToast.timeoutId = window.setTimeout(function () {
        toast.classList.remove("show");
    }, 2200);
}

function closeMenu() {
    if (!menuToggle || !navMenu) {
        return;
    }

    menuToggle.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    navMenu.classList.remove("active");
    document.body.classList.remove("menu-open");
}

function openDeepLink(hash) {
    if (!hash || hash === "#") {
        return;
    }

    const target = document.querySelector(hash);

    if (!target) {
        return;
    }

    target.scrollIntoView({ behavior: "smooth", block: "start" });

    document.querySelectorAll(".deep-target.is-highlighted").forEach(function (item) {
        item.classList.remove("is-highlighted");
    });

    if (target.classList.contains("deep-target")) {
        target.classList.add("is-highlighted");
        window.setTimeout(function () {
            target.classList.remove("is-highlighted");
        }, 2600);
    }
}

function setActiveNav(id) {
    navLinks.forEach(function (link) {
        const isActive = link.getAttribute("href") === "#" + id;
        link.classList.toggle("active", isActive);

        if (isActive) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", function () {
        const isOpen = navMenu.classList.toggle("active");

        menuToggle.classList.toggle("is-open", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        document.body.classList.toggle("menu-open", isOpen);
    });
}

navLinks.forEach(function (link) {
    link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeMenu();
    }
});

if ("IntersectionObserver" in window) {
    const observedSections = document.querySelectorAll("main > section[id]");
    const observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    setActiveNav(entry.target.id);
                }
            });
        },
        {
            rootMargin: "-35% 0px -55% 0px",
            threshold: 0
        }
    );

    observedSections.forEach(function (section) {
        observer.observe(section);
    });
}

window.addEventListener("load", function () {
    if (window.location.hash) {
        window.setTimeout(function () {
            openDeepLink(window.location.hash);
        }, 120);
    }
});

window.addEventListener("hashchange", function () {
    openDeepLink(window.location.hash);
});

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const nama = document.getElementById("nama").value.trim();
        const email = document.getElementById("email").value.trim();
        const pesan = document.getElementById("pesan").value.trim();
        const subject = encodeURIComponent("Pesan Portfolio dari " + nama);
        const body = encodeURIComponent(
            "Nama: " + nama + "\nEmail: " + email + "\n\nPesan:\n" + pesan
        );

        window.location.href = "mailto:zalfacepmel@gmail.com?subject=" + subject + "&body=" + body;

        if (formNote) {
            formNote.textContent = "Aplikasi email akan terbuka untuk mengirim pesan.";
        }

        showToast("Pesan siap dikirim lewat email");
        contactForm.reset();
    });
}
