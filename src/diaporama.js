jQuery(document).ready(function ($) {
    /*{
        init(selector) {
            //recherche des elements dans le dom et assignation
            //evenements
        },
        slideSuivante()
    }*/
    //passe automatiquement à la diaporama suivante toutes les 5 secondes.
    var interval;
    interval = setInterval(function () {
        moveRight();
    }, 5000);


    //arrêt diaporama au passage de la souris
    $('.mySlider').mouseover(function () {
        clearInterval(interval);
    });
    //reprise défilement du diaporama au retrait de la souris
    $('.mySlider').mouseleave(function () {
        interval = setInterval(function () {
            moveRight();
        }, 5000);
    });

    var slideCount = $('.mySlider ul li').length;
    var slideWidth = $('.mySlider ul li').width();
    var slideHeight = $('.mySlider ul li').height();
    var sliderUlWidth = slideCount * slideWidth;

    $('.mySlider').css({
        width: slideWidth,
        height: slideHeight
    });

    $('.mySlider ul').css({
        width: sliderUlWidth,
        marginLeft: -slideWidth
    });

    $('.mySlider ul li:last-child').prependTo('.mySlider ul');
    // Méthode qui fait fonctionner le diaporama en arrière
    function moveLeft() {
        $('.mySlider ul').animate({
            left: +slideWidth
        }, 426, function () {
            $('.mySlider ul li:last-child').prependTo('.mySlider ul');
            $('.mySlider ul').css('left', '');
        });
    };
    // Méthode qui fait fonctionner le diaporama en avant
    function moveRight() {
        $('.mySlider ul').animate({
            left: -slideWidth
        }, 426, function () {
            $('.mySlider ul li:first-child').appendTo('.mySlider ul');
            $('.mySlider ul').css('left', '');
        });
    };
    //evènement qui actionne le diaporama avant/arrière en fonction du clic souris sur l'une des flêches
    //---------arrière
    $('.mySlider_prev').click(function () {
        moveLeft();
        return false;
    });
    //---------avant
    $('.mySlider_next').click(function () {
        moveRight();
        return false;
    });

    //evènement qui actionne le diaporama avant/arrière en fonction de la touche appuyée
    document.addEventListener("keydown", function (e) {
        if (e.keyCode === 37) {
            moveLeft();
        } else if (e.keyCode === 39) {
            moveRight();
        }
    });
});
