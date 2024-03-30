document.addEventListener('DOMContentLoaded', function () {
    const carouselLink = document.getElementById('carousel-link');
    carouselLink.addEventListener('click', function (event) {
        window.location.href = '/dashboard';
    });

});