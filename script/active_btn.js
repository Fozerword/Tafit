
//vars
let computer = true;

//блок популярное
//блок входа авторизации
const { createApp } = Vue;
createApp({
    data() {
        return {
            timeTrack: 180,
            timeCurrent: 0,
            vhodVisible: false,
            activeP: {
                active: false,
                active1: false
            },
            activePP: true,
            activeSh: false,
            //блок кнопка вход
            form: false,
            errorMessage: '',
            NameTrack: nameTrack,//-------------------------данные из файла function.js---//
            GroupTrack: groupTrack,                                                       //
            OblTrack: obltreck,//---------------------------------------------------------//
            noRegister: true,
            registerbtn: true,
            vhodBtn: true,
            nimda: false,
            menuUser: false,
            settingA: true,
            OblTrackA: '',
            NameTrackA: 'Name_track',
            GroupTrackA: 'Group_name',
            NameAlbum: 'Name_Album',
            NameGroup: [],
            colAlbum: [],
            Txtbtn: true,
            MP3btn: false
        }
    },
    methods:
    {
        changeFoo: function (event) {
            console.log(event);
        },
        fotmatTime: function (time) {
            let min = Math.floor(time / 60);
            if (min < 10) {
                min = '0' + min;
            }
            let sec = Math.floor(time % 60);
            if (sec < 10) {
                sec = '0' + sec;

            }
            return min + ':' + sec;
        },
        play_pause: function () {
            this.activePP = !this.activePP;
        },
        shuffle: function () {
            this.activeSh = !this.activeSh;
        },
        povtor: function () {
            if (!this.activeP.active) {
                this.activeP.active = true;
                return;
            }
            else if (!this.activeP.active1) {
                this.activeP.active1 = true;
                return;
            }
            else {
                this.activeP.active = false;
                this.activeP.active1 = false;
            }
        },
        //----------------------------------------------------кнопка войти
        vhod: function () {
            this.form = true;
            setTimeout(function () {
                anime({
                    targets: '.fontForm',
                    opacity: '1',
                    duration: 800,
                    easing: 'easeInOutExpo'
                });
                $('body').css('overflow', 'hidden');
            }, 100);
        },
        // ---------------------------------------------------закрыть форму входа
        exitForm: function () {
            anime({
                targets: '.exit',
                rotate: '1080deg',
            });
            anime({
                targets: '.fontForm',
                opacity: '0',
                duration: 800,
                easing: 'easeInOutExpo'
            });
            let tif = this;
            setTimeout(function () {
                $('body').css('overflow', 'visible');
                tif.form = false;
            }, 700);
            $('input').val('');
            setTimeout(function () {
                tif.errorMessage = '';
                tif.registerbtn = true;
                tif.noRegister = true;
            }, 1000)
        },
        //---------------------------------------------------------------функция входа
        vhodForm: function (event) {
            var email = $('#login').val().trim();
            var password = $('#Password').val().trim();
            var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            if (email == '') {
                this.errorMessage = "enter email";
            } else if (password == '') {
                this.errorMessage = "enter password";
            } else {
                this.errorMessage = '';
            }

            if (this.errorMessage == '') {
                let zh = this;
                $.ajax({
                    url: '../php/vhod.php',
                    type: 'POST',
                    cache: false,
                    data: { login: email, password: password },
                    dataType: 'html',
                    success: function (data) {
                        if (data == 'error') {
                            zh.errorMessage = "incorrect login or password";
                        }
                        else {
                            $('h6.error').css('color', '#15db12');
                            zh.errorMessage = 'SUCCESS!';
                            setTimeout(function () {
                                anime({
                                    targets: '.exit',
                                    rotate: '1080deg',
                                });
                                anime({
                                    targets: '.fontForm',
                                    opacity: '0',
                                    duration: 800,
                                    easing: 'easeInOutExpo'
                                });

                                setTimeout(function () {
                                    $('.fontForm').remove();
                                    $('button.perehod').remove();
                                    zh.errorMessage = '';
                                }, 1000);
                            }, 500);
                            if (email == 'admin') {
                                zh.nimda = true;
                                setTimeout(function () {
                                    adminPlate();
                                }, 200);
                            }
                            setTimeout(function () {
                                $('body').css('overflow', 'visible');
                                zh.form = false;
                            }, 700);
                        }
                    }
                })
                    .done(function () {
                    })
                    .fail(function () {
                    })
                    .always(function () {
                    });
            }
            event.preventDefault();
        },
        //------------------------------------------------функция регистрации
        registered: function (event) {
            event.preventDefault();

            this.$forceUpdate();
            this.noRegister = false;
            this.registerbtn = false;
        },
        bnt_track: function (event) {
            $(event.path[0].childNodes[0]).show();
            $(event.path[0].childNodes[1]).show();
            $(event.path[0].childNodes[2]).show();
        },
        btn_leave: function (event) {
            $(event.path[0].childNodes[0]).hide();
            $(event.path[0].childNodes[1]).hide();
            $(event.path[0].childNodes[2]).hide();
        },
        hov_user: function () {
            animation.pause();
        },
        leave_user: function () {
            animation.play();
        },
        zaRegis: function (event) {
            event.preventDefault();
        },
        user_menu: function () {
            anime({
                targets: 'button.burger',
                rotate: '+=180',
                duration: 1000
            })
            if (!this.menuUser) {
                anime({
                    targets: '#menu_user',
                    translateY: '100%',
                    duration: 1000,
                    easing: 'linear'
                })
            }
            else {
                anime({
                    targets: '#menu_user',
                    translateY: '-100%',
                    duration: 1000,
                    easing: 'linear'
                })
            }

            this.menuUser = !this.menuUser;

        },
        setting_admin: function () {
            this.settingA = !this.settingA;
            if (!this.settingA) {
                let vue = this;
                $.ajax({
                    url: '../php/colGroup.php',
                    cache: false,
                    success: function (data) {
                        let arrGroup = [];
                        arrGroup = data.split(';');
                        arrGroup.splice(arrGroup.length - 1, 1);
                        vue.NameGroup = arrGroup;
                        vue.GroupTrackA = arrGroup[0];
                        $.ajax({
                            url: '../php/colGroup.php',
                            type: 'POST',
                            cache: false,
                            data: { name: vue.GroupTrackA },
                            dataType: 'html',
                            success: function (data) {
                                vue.colAlbum = [];
                                vue.colAlbum = data.split(';');
                                vue.colAlbum.splice(vue.colAlbum.length - 1, 1);
                                vue.NameAlbum = vue.colAlbum[0];
                            }
                        });
                    }
                });

            }
        },
        //------------------------------------------------ выпадающий список альбомов
        selectGr: function () {
            this.GroupTrackA = $('#ispoln').val();
            let vue = this;
            $.ajax({
                url: '../php/colGroup.php',
                type: 'POST',
                cache: false,
                data: { name: vue.GroupTrackA },
                dataType: 'html',
                success: function (data) {
                    vue.colAlbum = [];
                    vue.colAlbum = data.split(';');
                    vue.colAlbum.splice(vue.colAlbum.length - 1, 1);
                    vue.NameAlbum = vue.colAlbum[0];
                }
            });
        },
        vvodGr: function () {
            let vue = this;
            $.ajax({
                url: '../php/colGroup.php',
                type: 'POST',
                cache: false,
                data: { name: vue.GroupTrackA },
                dataType: 'html',
                success: function (data) {
                    vue.colAlbum = [];
                    vue.colAlbum = data.split(';');
                    vue.colAlbum.splice(vue.colAlbum.length - 1, 1);
                }
            });
        },
        selectAlb: function () {
            this.NameAlbum = $('#album-single').val();
        },
        //-------------------------------------------------------обработка формы добавления трека
        add_track: function (event) {
            this.errorMessage = '';
            $('h6.error').css('color', 'red');
            event.preventDefault();
            if (this.NameTrackA != '' && this.NameTrackA != 'Name_track') {
                if (this.GroupTrackA != '' && this.NameTrackA != 'Group_name') {
                    $('h6.error').css('color', '#15db12');
                    let vue = this;
                    this.errorMessage = 'SUCCESS';
                    $.ajax({
                        url: '../php/admin.php',
                        type: 'POST',
                        cache: false,
                        dataType: 'html',
                        data: { nameTrack: vue.NameTrackA, nameGroup: vue.GroupTrackA, nameAlbum: vue.NameAlbum },
                        success: function (data) {
                            if (data == 'error') {
                                vue.errorMessage = 'произашла ошибка запроса';
                                console.log('error');
                            }
                            else {
                                console.log(data);
                                vue.errorMessage = '';
                            }

                            vue.MP3btn = true;
                            vue.Txtbtn = false;
                        }
                    });

                } else
                    this.errorMessage = 'введите название группы';

            } else
                this.errorMessage = 'введите название трека';

        },
        //----------------------------------добавление файла песни
        addMp3: function (event) {
            event.preventDefault();
            let vue = this;
            var formData = new FormData();
            var formData = new FormData();
            formData.append('file', $("#MP3")[0].files[0]);
            console.log(formData);
            $.ajax({
                url: '../php/mp3load.php',
                type: 'POST',
                contentType: false,
                cache: false,
                processData: false,
                dataType: 'json',
                data: formData,
                success: function (data) {
                    if (data == 'error') {
                        vue.errorMessage = 'произашла ошибка запроса';
                        console.log('error');
                    }
                    else {
                        console.log(data);
                        vue.errorMessage = '';
                    }
                },
                error: function () {
                    console.log("привет");
                }
            });
        }
    },
    mounted() {
        setTimeout(function () {
            scrollers();
        }, 2000);
        if (document.cookie != '') {
            let cookie = document.cookie.split(';');
            let passwordCookie = '';
            let loginCookie = '';
            for (let i = 0; i < cookie.length; i++) {
                let objectCookie = cookie[i].split('=');
                if (objectCookie[0].trim() == 'login') {
                    loginCookie = objectCookie[1].trim();
                }
                if (objectCookie[0].trim() == 'password') {
                    passwordCookie = objectCookie[1].trim();
                }
            }
            if (passwordCookie != '' && loginCookie != '') {
                let vue = this;
                $.ajax({
                    url: '../php/vhod.php',
                    type: 'POST',
                    cache: false,
                    data: { login: loginCookie, password: passwordCookie },
                    dataType: 'html',
                    success: function (data) {
                        if (data == 'error') {
                            vue.vhodBtn = true;
                            console.log('зайди заново');
                        }
                        else {
                            vue.vhodBtn = false;
                            console.log('наш чел');
                            if (loginCookie == 'admin') {
                                vue.nimda = true;
                                setTimeout(function () {
                                    adminPlate();
                                }, 200);
                            }
                        }
                    }
                });
            }
        }
        this.GroupTrackA = this.NameGroup[0];

    }
}).mount('#app');

//-------------------------------------------компонент-регистрации

//-------------detected-modile-pc-------------------------------------------------------------------------------------------------------------------
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent))
    computer = false;
else
    computer = true;

//---------------------------------------------------------------------Пауза
/*document.querySelector('.play-pause').onclick = function () {
    document.querySelector('.play-pause').classList.toggle('active');
}

document.querySelector('.burger-left').onclick = function () {
    document.querySelector('.burger-left').classList.toggle('active');
    document.querySelector('.left-menu').classList.toggle('active');
};
//-------------------------------------------------------------перемешать
document.querySelector('.shuffle').onclick = function () {
    document.querySelector('.shuffle').classList.toggle('active');
}
//---------------------------------------------------------------Открыть плайлист

document.querySelector('#playlist').onclick = function () {
    document.querySelector('#playlist').classList.toggle('active');
}

//-------------------------------------------------------------------------повторы
*/


