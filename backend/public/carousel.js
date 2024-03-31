document.addEventListener('DOMContentLoaded', function () {
    const carouselLink = document.getElementById('carousel-link');
    carouselLink.addEventListener('click', function (event) {
        if(localStorage.getItem('token') != undefined){

            window.location.href = '/dashboard';
        }else{
            alert("Please login to use this feature");
        }
    });

});