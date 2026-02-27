$(document).ready(function () {

    window.scrollTo(0, 0);


    $(window).on('scroll', function () {
        var scrollY = $(window).scrollTop();

        if (scrollY > 60) {
            $('header').addClass('scrolled');
        } else {
            $('header').removeClass('scrolled');
        }

        verificarSecaoAtiva();

        animarCards();

    });


    function verificarSecaoAtiva() {
        var scrollY      = $(window).scrollTop();
        var alturaJanela = $(window).height();
        var alturaDoc    = $(document).height();


        if (scrollY + alturaJanela >= alturaDoc - 10) {
            $('.nav-link').removeClass('active');
            $('.nav-link').last().addClass('active');
            return;
        }

        $('section[id]').each(function () {
            var secaoTopo   = $(this).offset().top - 100;
            var secaoAltura = $(this).outerHeight();
            var secaoId     = $(this).attr('id');

            if (scrollY >= secaoTopo && scrollY < secaoTopo + secaoAltura) {
                $('.nav-link').removeClass('active');
                $('.nav-link[href="#' + secaoId + '"]').addClass('active');
            }
        });
    }


    function animarCards() {
        $('.card-habilidades:not(.visivel)').each(function () {
            var cardTopo   = $(this).offset().top;
            var viewBottom = $(window).scrollTop() + $(window).height();

            if (cardTopo < viewBottom - 60) {
                var $card  = $(this);
                var indice = $('.card-habilidades').index(this);

                setTimeout(function () {
                    $card.addClass('visivel');
                }, indice * 80);
            }
        });
    }

    animarCards();


    $('a[href^="#"]').on('click', function (e) {
        var alvo = $(this).attr('href');

        if ($(alvo).length) {
            e.preventDefault();

            var posicao = $(alvo).offset().top - 80;

            $('html, body').animate(
                { scrollTop: posicao },
                600,
                'swing'
            );
        }
    });


    $('#copiar-email').on('click', function (e) {
        e.preventDefault();                              

        var $el    = $(this);
        var email  = $el.data('email');                  
        var $texto = $el.find('strong');                
        var textoOriginal = $texto.text();               

        navigator.clipboard.writeText(email).then(function () {

            $texto.text('Copiado! ✓');
            $el.css('border-color', 'var(--cor-acento)');

            setTimeout(function () {
                $texto.text(textoOriginal);              
                $el.css('border-color', '');             
            }, 2000);

        }).catch(function () {
            $texto.text('Ctrl+C para copiar');
            setTimeout(function () {
                $texto.text(textoOriginal);
            }, 2000);
        });
    });


    $('#ano-footer').text(new Date().getFullYear());

});