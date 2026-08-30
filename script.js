// ========================================
// NAVBAR MOBILE
// ========================================

const menuToggle = document.querySelector(".menu-toggle");

const navMenu = document.querySelector(".nav-menu");


menuToggle.addEventListener("click", function () {

    navMenu.classList.toggle("active");

});


// ========================================
// TUTUP MENU SETELAH LINK DIKLIK
// ========================================

const navLinks = document.querySelectorAll(".nav-menu a");


navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navMenu.classList.remove("active");

    });

});


// ========================================
// CONTACT FORM
// ========================================

const contactForm =
    document.getElementById("contactForm");


contactForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const nama =
        document.getElementById("nama").value;


    alert(
        "Terima kasih, " +
        nama +
        "! Pesan kamu berhasil dikirim."
    );


    contactForm.reset();

});