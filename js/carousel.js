
var projetos = [
    {
        titulo:    "Moodboard",
        descricao: "Sistema de moodboard com drag and drop para organização de ideias",
        tag:       "JavaScript",
        imagem:    "img/moodboard.png",
        emoji:     "🖥️",
        link:      "https://github.com/filipinigui/Organizacao-Metas",
        linkTexto: "Ver no GitHub",
        linkApp:   "https://filipinigui.github.io/Organizacao-Metas/",
        linkAppTexto:   "Ver o app"
    },
    {
        titulo:    "Moodboard",
        descricao: "Sistema de moodboard com drag and drop para organização de ideias",
        tag:       "JavaScript",
        imagem:    "img/moodboard.png",
        emoji:     "🖥️",
        link:      "https://filipinigui.github.io/Organizacao-Metas/",
        linkTexto: "Ver no GitHub",
        linkApp:   "",
        linkAppTexto:   "Ver o app"
    },
    {
        titulo:    "Moodboard",
        descricao: "Sistema de moodboard com drag and drop para organização de ideias",
        tag:       "JavaScript",
        imagem:    "img/moodboard.png",
        emoji:     "🖥️",
        link:      "https://filipinigui.github.io/Organizacao-Metas/",
        linkTexto: "Ver no GitHub",
        linkApp:   "",
        linkAppTexto:   "Ver o app"
    },
    {
        titulo:    "Moodboard",
        descricao: "Sistema de moodboard com drag and drop para organização de ideias",
        tag:       "JavaScript",
        imagem:    "img/moodboard.png",
        emoji:     "🖥️",
        link:      "https://filipinigui.github.io/Organizacao-Metas/",
        linkTexto: "Ver no GitHub",
        linkApp:   "",
        linkAppTexto:   "Ver o app"
    }
];


var config = {
    desktop: 1,   // > 900px  — 1 card por vez, todos os projetos acessíveis
    tablet:  1,   // 600px - 900px
    mobile:  1    // < 600px
};


var indiceAtual  = 0;
var cardsPorVez  = config.desktop;
var totalPaginas = 0;


function calcularCardsPorVez() {
    var largura = $(window).width();
    if (largura > 900) return config.desktop;
    if (largura > 600) return config.tablet;
    return config.mobile;
}



function criarHTMLCard(projeto) {
    var imagemHTML = projeto.imagem
        ? '<img class="card-imagem" src="' + projeto.imagem + '" alt="' + projeto.titulo + '">'
        : '<div class="card-imagem sem-imagem">' + projeto.emoji + '</div>';

    return (
        '<div class="projeto-card">'
        +   imagemHTML
        +   '<div class="card-body">'
        +       '<span class="card-tag">' + projeto.tag + '</span>'
        +       '<h3 class="card-titulo">' + projeto.titulo + '</h3>'
        +       '<p class="card-descricao">' + projeto.descricao + '</p>'
        +       '<a href="' + projeto.link + '" target="_blank" class="card-link">'
        +           projeto.linkTexto + ' →'
        +       '</a><br>' 
        +       '<a href="' + projeto.linkApp + '" target="_blank" class="card-link">'
        +           projeto.linkAppTexto + ' →'
        +       '</a>'
        +   '</div>'
        + '</div>'
    );
}

function construirCarrossel() {
    var $track     = $('.carousel-track');
    var $dots      = $('.carousel-dots');
    var $trackWrap = $('.carousel-track-wrapper');

    $track.empty();
    $dots.empty();
    indiceAtual = 0;

    cardsPorVez  = calcularCardsPorVez();
    totalPaginas = Math.max(1, projetos.length - cardsPorVez + 1);

    // Largura de cada card: divide o espaço disponível pelo nº de cards visíveis
    var larguraWrapper = $trackWrap.outerWidth();
    var gap            = 24; // deve ser igual ao gap no CSS
    var larguraCard    = (larguraWrapper - gap * (cardsPorVez - 1)) / cardsPorVez;

    // Insere os cards no trilho
    $.each(projetos, function (i, projeto) {
        var $card = $(criarHTMLCard(projeto));
        $card.css('min-width', larguraCard + 'px');
        $track.append($card);
    });

    // Cria os dots (um por posição navegável)
    for (var p = 0; p < totalPaginas; p++) {
        var $dot = $('<button class="carousel-dot" aria-label="Ir para posição ' + (p + 1) + '"></button>');
        $dot.data('pagina', p);
        $dots.append($dot);
    }

    atualizarCarrossel();
}

function atualizarCarrossel() {
    var $track  = $('.carousel-track');
    var $btnEsq = $('.carousel-btn-left');
    var $btnDir = $('.carousel-direita');

    var larguraCard  = $('.projeto-card').first().outerWidth();
    var gap          = 24;
    var deslocamento = indiceAtual * (larguraCard + gap);

    $track.css('transform', 'translateX(-' + deslocamento + 'px)');

    // Atualiza o dot ativo
    $('.carousel-dot').removeClass('ativo');
    $('.carousel-dot').eq(indiceAtual).addClass('ativo');

    // Desabilita botões nas extremidades
    $btnEsq.prop('disabled', indiceAtual === 0);
    $btnDir.prop('disabled', indiceAtual >= totalPaginas - 1);
}



$(document).on('click', '.carousel-btn-left', function () {
    if (indiceAtual > 0) {
        indiceAtual--;
        atualizarCarrossel();
    }
});

$(document).on('click', '.carousel-direita', function () {
    if (indiceAtual < totalPaginas - 1) {
        indiceAtual++;
        atualizarCarrossel();
    }
});

$(document).on('click', '.carousel-dot', function () {
    indiceAtual = $(this).data('pagina');
    atualizarCarrossel();
});



var touchStartX = 0;

$(document).on('touchstart', '.carousel-track-wrapper', function (e) {
    touchStartX = e.originalEvent.touches[0].clientX;
});

$(document).on('touchend', '.carousel-track-wrapper', function (e) {
    var diff  = touchStartX - e.originalEvent.changedTouches[0].clientX;
    var limiar = 50;

    if (diff > limiar && indiceAtual < totalPaginas - 1) {
        indiceAtual++;
        atualizarCarrossel();
    } else if (diff < -limiar && indiceAtual > 0) {
        indiceAtual--;
        atualizarCarrossel();
    }
});

var timerResize;
$(window).on('resize', function () {
    clearTimeout(timerResize);
    timerResize = setTimeout(construirCarrossel, 200);
});


$(document).ready(function () {
    construirCarrossel();
});