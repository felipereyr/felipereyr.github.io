document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
})

function iniciarApp(){
    navegacionFija();
    ScrollNav();
}

function navegacionFija(){
    const barra = document.querySelector('.header');
    const video = document.querySelector('.video');

    window.addEventListener('scroll', function(){
        console.log(video.getBoundingClientRect());

        if(video.getBoundingClientRect().top < 0 ){
            barra.classList.add('fijo');
        }else{
            barra.classList.add('remove');
        }
    });
}


function ScrollNav(){
    const enlaces = document.querySelectorAll('.header__nav a');
    enlaces.forEach(enlace=>{
        enlace.addEventListener('click', function(e){
            e.preventDefault();

            const seccionScroll = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll);
            seccion.scrollIntoView({behavior: "smooth"});
        });
    });
}