var slideIndex = 0;
var slides = document.querySelectorAll('.slide');

function showSlide(n) {
    var i;
    for (i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
    }
    slideIndex = (n + slides.length) % slides.length;
    slides[slideIndex].classList.add('active');
}

function changeSlide(n) {
    showSlide(slideIndex + n);
}

setInterval(function() { changeSlide(1); }, 5000);
showSlide(0);