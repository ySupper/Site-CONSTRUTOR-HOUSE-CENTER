let slideIndex = 1;
showSlides(slideIndex);

function moveSlide(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName("carrossel-slide");
    const dots = document.getElementsByClassName("dot");

    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }

    for (i = 0; i < slides.length; i++) {
        // Remover animações antigas
        slides[i].classList.remove("fade-in", "fade-out", "active");
        slides[i].style.display = "none";
    }

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    // Aplicar animação de fade-in no slide atual
    slides[slideIndex - 1].classList.add("fade-in", "active");
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

    // Remove a animação de entrada após ela ser concluída
    setTimeout(() => slides[slideIndex - 1].classList.remove("fade-in"), 500);
