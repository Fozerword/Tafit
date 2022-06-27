
//------------------функция remove-body
function removeBody() {

    setTimeout(function () {
        $('body').remove();
        var body = '<body class="error"><h2>В данный момент страница не доступна! <span>I\'m sorry</span></h2></body>';
        var style = '<link rel="stylesheet" href="style/index.css">';
        $('html').html(body);
        $('head').html(style);
    }, 1000);
}

//скрол текста не поместившегося в div
function scrollers() {
    $('.scroler').each(function (index) {
        let scrollChild = $(this).find('h6').width();
        let scrollChildP = $(this).find('p').width();
        let scroll = $(this).width();
        if (scroll < scrollChild) {
            let hag = scroll - scrollChild;
            $(this).find('h6').addClass('scrol-txt' + index);
            anime({
                targets: '.scrol-txt' + index,
                keyframes: [
                    { translateX: hag - 20 },
                    { translateX: 0 }
                ],
                duration: 10000,
                easing: 'easeInOutSine',
                loop: true
            });
        }
        if (scroll < scrollChildP) {
            let hag = scroll - scrollChildP;
            $(this).find('p').addClass('scrol-p' + index);
            anime({
                targets: '.scrol-p' + index,
                keyframes: [
                    { translateX: hag - 20 },
                    { translateX: 0 }
                ],
                easing: 'easeInOutSine',
                duration: 10000,
                loop: true
            });
        }
    });
}
function colGroup() {
    $.ajax({
        url: '../php/colGroup.php',
        cache: false,
        success: function (data) {
            let arrGroup = [];
            arrGroup = data.split(';');
            arrGroup.splice(arrGroup.length - 1, 1);
            return arrGroup;
        }
    });
}
//добавление скриптов
function include(url) {
    var script = document.createElement('script');
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}
let nameTrack = [];
let groupTrack = [];
let obltreck = [];
//AJAX popular SELECT
$.ajax({
    url: '../php/popular.php',
    cache: false,

    success: function (data) {
        if (data == 'error') {
            removeBody();
        }
        else {
            let track = data.split(';');
            for (let i = 0; i < track.length; i++) {
                let object = track[i].split('*');
                if (object[0] != '') {
                    obltreck[i] = object[0];
                    nameTrack[i] = object[1];
                    groupTrack[i] = object[2];
                }
            }
        }
    },
    error: function () {
        alert("Ахтунг, проблема!");
    }
});
let animation;
//admin function
function adminPlate() {
    animation = anime({
        targets: '#userIcon',
        rotate: '360',
        duration: 6000,
        easing: 'linear',
        loop: true
    });
}