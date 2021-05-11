var authtoken = '';
var baseurl = '';
var lang_code = '';
var userid = '';
var email = '';
var init = function () {
    //$('#spinner').show();
    if (localStorage.getItem("authtokenstr") != null) {
        authtoken = localStorage.getItem("authtokenstr");
        baseurl = localStorage.getItem("baseurl");
        lang_code = localStorage.getItem("lang_code");
        userid = localStorage.getItem("loginstr");
        email = localStorage.getItem("emailstr");
        //console.log(email);
    }

    /*===dynamically inserted menu according to CMS====*/
    var navmenu = '<li class="nav-item" data-permalink="home" id="navhome"><div class="nav-link" id="home">' + localStorage.getItem("home") + '</div></li><li class="nav-item" data-permalink="search" id="navsearch"><div class="nav-link" id="search">' + localStorage.getItem("search") + '</div></li><li class="nav-item" data-permalink="category" id="navcat"><div class="nav-link" id="category">' + localStorage.getItem("categories") + '</div></li>';
    if (localStorage.getItem("Myfavorite") == "1" && localStorage.getItem("loginstr") != null) {
        navmenu += '<li class="nav-item" data-permalink="myfavourite"  id="navmyfavourite"> <div class="nav-link" id="myfavourite">' + localStorage.getItem("my_favourite") + '</div></li>';
    }
    if (localStorage.getItem("WatchHistory") == "1" && localStorage.getItem("loginstr") != null) {
        navmenu += '<li class="nav-item" data-permalink="watchhistory" id="navwatchhistory"> <div class="nav-link" id="watchhistory">' + localStorage.getItem("watch_history") + '</div></li>';
    }
    if (localStorage.getItem("Mylibrary") == "1" && localStorage.getItem("loginstr") != null) {
        navmenu += '<li class="nav-item" data-permalink="mylibrary" id="navmylibrary"> <div class="nav-link" id="mylibrary">' + localStorage.getItem("my_library") + '</div></li>';
    }
    navmenu += '<li class="nav-item" data-permalink="profile" id="navprofile"><div class="nav-link last-nav" id="profile">' + localStorage.getItem("profile") + '</div></li>';
    //$(navmenu).insertAfter('#navcat');
    $("#mainmenu").empty().append(navmenu);
    $('#navprofile').addClass('current');
    /*menu active*/
    $("#profile").addClass("navActive");

    $('#profileDtl').text(localStorage.getItem("my_profile"));
    $('#lang').text(localStorage.getItem("my_language"));
    $('#plan').text(localStorage.getItem("my_subsciption"));
    $('#languageHeader').text(localStorage.getItem("my_language"));
    $('.continue').text(localStorage.getItem("continue"));
    $('#login4').text(localStorage.getItem("btn_update_profile"));
    $('#login2').attr('placeholder', localStorage.getItem("password"));
    $('#login3').attr('placeholder', localStorage.getItem("confirm_password"));
    $('#currentpas').attr('placeholder', localStorage.getItem("current_password"));
    $(document).ready(function () {
        $('#spinner').show();
        updateProfile();
    });


    //Remote Function//
    document.onkeydown = checkKey;

    function checkKey(e) {
        e = e || window.event;
        //For RTl Use ( Don't Modify This Section )
        var remoteBtnCode = '';
        var lang_code = localStorage.getItem("lang_code");
        if (lang_code == "ar" || lang_code == "arc" || lang_code == "az" || lang_code == "dv" || lang_code == "iw" || lang_code == "ku" ||
            lang_code == "fa" || lang_code == "ur") {
            if (e.keyCode == "37") {
                remoteBtnCode = 39;
            } else if (e.keyCode == "39") {
                remoteBtnCode = 37;
            } else {
                remoteBtnCode = e.keyCode;
            }
        } else {
            remoteBtnCode = e.keyCode;
        }

        if (remoteBtnCode == '38') {
            //for Up Arrow key
            if (($("#spinner").is(":visible") == true)) {
                e.preventDefault();
            } else {
                var $current = $('.current');
                var currentId = $current.get()[0].id;
                var currentparentId = $current.parent().get()[0].id;

                if (currentparentId == "language-div") {
                    $current.removeClass("current");
                    $('#profileul').children().eq(0).addClass("current");
                } else if (currentparentId === "profileul") {
                    $("#login3").blur();
                    $("#currentpas").blur();
                    $("#login2").blur();
                    $("#email").blur();
                    $current.removeClass('current');
                    $('#mainmenu').children().eq(0).addClass('current');
                } else if (currentparentId === "buttonsec") {
                    $("#login3").blur();
                    $("#currentpas").blur();
                    $("#login2").blur();
                    $("#email").blur();
                    $current.removeClass("current");
                    $('#login3').addClass("current");
                } else if (currentparentId === "userConfPwd") {
                    $("#login3").blur();
                    $("#currentpas").blur();
                    $("#login2").blur();
                    $("#email").blur();
                    $current.removeClass("current");
                    $('#login2').addClass("current");
                } else if (currentparentId === "userPwd") {
                    $("#login3").blur();
                    $("#currentpas").blur();
                    $("#login2").blur();
                    $("#email").blur();
                    $current.removeClass("current");
                    $('#currentpas').addClass("current");
                } else if (currentparentId == "crntPwd") {
                    $current.removeClass('current');
                    $('#mainmenu').children().eq(0).addClass('current');
                }
            }

        } else if (remoteBtnCode == '40') {
            // down arrow key
            if (($("#spinner").is(":visible") == true)) {
                e.preventDefault();
            } else {
                var $current = $('.current');
                var currentId = $current.get()[0].id;
                var currentparentId = $current.parent().get()[0].id;
                if (currentparentId === "mainmenu") {
                    $current.removeClass("current");
                    $('#currentpas').addClass("current");
                } else if (currentparentId == "crntPwd") {
                    $("#login3").blur();
                    $("#currentpas").blur();
                    $("#login2").blur();
                    $("#email").blur();
                    $current.removeClass("current");
                    $('#login2').addClass("current");
                } else if (currentparentId == "userPwd") {
                    $("#login3").blur();
                    $("#currentpas").blur();
                    $("#login2").blur();
                    $("#email").blur();
                    $current.removeClass("current");
                    $('#login3').addClass("current");
                } else if (currentparentId == "userConfPwd") {
                    $("#login3").blur();
                    $("#currentpas").blur();
                    $("#login2").blur();
                    $("#email").blur();
                    $current.removeClass("current");
                    $('#login4').addClass("current");
                }
            }
        } else if (remoteBtnCode == '37') {
            // left arrow key
            if (($("#spinner").is(":visible") == true)) {
                e.preventDefault();
            } else {
                var $current = $('.current');
                var currentparentId = $current.parent().get()[0].id;
                var currentId = $current.get()[0].id;
                if (currentparentId == "mainmenu") {
                    $("#login3").blur();
                    $("#currentpas").blur();
                    $("#login2").blur();
                    $("#email").blur();
                    if ($current.prev().length > 0) {
                        $current.removeClass('current');
                        $current.prev().addClass('current');
                    }
                } else if (currentparentId == "profileul") {
                    $("#login3").blur();
                    $("#currentpas").blur();
                    $("#login2").blur();
                    $("#email").blur();
                    if ($current.prev().length > 0) {
                        $current.removeClass('current');
                        $current.prev().addClass('current');
                    }
                } else if (currentparentId == "language-div") {
                    if ($current.prev().length > 0) {
                        $current.prev().removeClass('hide');
                        $current.removeClass('current');
                        $current.prev().addClass('current');
                    }
                } else if (currentparentId === "buttonsec") {
                    $("#login3").blur();
                    $("#currentpas").blur();
                    $("#login2").blur();
                    $("#email").blur();
                }
            }
        } else if (remoteBtnCode == '39') {
            // right arrow key
            if (($("#spinner").is(":visible") == true)) {
                e.preventDefault();
            } else {
                var $current = $('.current');
                var currentparentId = $current.parent().get()[0].id;
                var currentId = $current.get()[0].id;

                //console.log(currentparentId)
                if (currentparentId == "mainmenu") {
                    $("#login3").blur();
                    $("#currentpas").blur();
                    $("#login2").blur();
                    $("#email").blur();
                    if ($current.next().length > 0) {
                        $current.removeClass('current');
                        $current.next().addClass('current');
                    }
                } else if (currentparentId == "profileul") {
                    $("#login3").blur();
                    $("#currentpas").blur();
                    $("#login2").blur();
                    $("#email").blur();
                    if ($current.next().length > 0) {
                        $current.removeClass('current');
                        $current.next().addClass('current');
                    }
                } else if (currentparentId == "language-div") {
                    if ($current.next().length > 0) {
                        var _crntPosition = parseInt(currentId.split('_')[1]);
                        $current.removeClass('current');
                        if (_crntPosition >= 4) {
                            var _deletePosition = _crntPosition - 4;
                            $('#lang_' + _deletePosition).addClass('hide');
                        }
                        $current.next().addClass('current');
                    }
                } else if (currentparentId === "buttonsec") {
                    if ($current.next().length > 0) {
                        $current.removeClass('current');
                        $current.next().addClass('current');
                    }
                } else if (currentparentId == "prflsec") {
                    $("#login3").blur();
                    $("#currentpas").blur();
                    $("#login2").blur();
                    $("#email").blur();
                    $current.removeClass("current");
                    $('#login4').addClass("current");
                }
            }
        } else if (remoteBtnCode == '13') {
            // OK key
            var $current = $('.current');
            var currentId = $current.get()[0].id;
            var currentparentId = $current.parent().get()[0].id;
            if (currentparentId == "mainmenu") {
                var permalink = $('#' + currentId).attr('data-permalink');
                navBarCall(permalink);
            } else if (currentparentId == "profileul") {

                if (currentId == "profileDtl") {
                    updateProfile();
                } else if (currentId == "lang") {
                    chooseLang();
                } else {
                    myPlans();
                }
            } else if (currentparentId == "language-div") {
                var lang_code = $("#" + currentId).attr('data-code');
                getTextTranslation(lang_code);
                localStorage.setItem("lang_code", lang_code);
            } else if (currentparentId == "userName") {
                $("#currentpas").focus();
                $("#login2").blur();
                $("#login3").blur();
                $("#email").blur();
            } else if (currentparentId == "userEmail") {
                $("#email").focus();
                $("#currentpas").blur();
                $("#login2").blur();
                $("#login3").blur();
            } else if (currentparentId == "userPwd") {
                if ($("#login2").is(":focus")) {
                    $("#login2").blur();
                } else {
                    $("#login2").focus();
                }
                $("#currentpas").blur();
                $("#email").blur();
                $("#login3").blur();
            } else if (currentparentId == "userConfPwd") {
                $("#login3").focus();
                $("#currentpas").blur();
                $("#login2").blur();
                $("#email").blur();
            } else if (currentparentId == "crntPwd") {
                if ($("#currentpas").is(":focus")) {
                    $("#currentpas").blur();
                } else {
                    $("#currentpas").focus();
                }
                $("#login3").blur();
                $("#login2").blur();
                $("#email").blur();
            } else if (currentparentId == "buttonsec") {
                if (currentId == "login4") {
                    $("#currentpas").blur();
                    $("#login2").blur();
                    $("#login3").blur();
                    $("#email").blur();
                    getvalueandupdate();
                }
            }
        } else if (remoteBtnCode == '10009') {
            // window.history.back();
            let arrObj = JSON.parse(localStorage.getItem("historyArray"));
            arrObj.pop();
            if (arrObj.length > 0) {
                window.location.href = arrObj[arrObj.length - 1];
                arrObj.pop();
                localStorage.setItem("historyArray", JSON.stringify(arrObj));
            } else {
                window.history.back();
            }
        }
    }
    //Remote Function//
} //end
window.onload = init;



function backToPreLoginPage() {
    $('#spinner').show();
    var timer = setTimeout(function () {
        $('#spinner').hide();
        localStorage.removeItem("loginstr");
        $(location).attr('href', "preLogin.html");
    }, 2000);
}

function getvalueandupdate() {
    var currentpas = $("#currentpas").val();
    var pass = $("#login2").val();
    var cpass = $("#login3").val();
    if (currentpas == "") {
        $('#nocontent').text(localStorage.getItem("required_default_msg"));
        $('#nocontent').show();
        var timer = setTimeout(function () {
            $('#nocontent').hide();
        }, 5000);
    } else if (pass == "") {
        $('#nocontent').text("Please Enter Password");
        $('#nocontent').show();
        var timer = setTimeout(function () {
            $('#nocontent').hide();
        }, 5000);
    } else if (cpass == "") {
        $('#nocontent').text("Please Enter Confirm-Password");
        $('#nocontent').show();
        var timer = setTimeout(function () {
            $('#nocontent').hide();
        }, 5000);
    } else if (pass.length < 6 && cpass.length < 6) {
        $('#nocontent').text(localStorage.getItem("password_atleast_6_char"));
        $('#nocontent').show();
        var timer = setTimeout(function () {
            $('#nocontent').hide();
        }, 5000);
    } else if (pass != cpass) {
        $('#nocontent').text(localStorage.getItem("password_donot_match"));
        $('#nocontent').show();
        var timer = setTimeout(function () {
            $('#nocontent').hide();
        }, 5000);
    } else {
        updateprofile(currentpas, pass);
    }

}

function updateprofile(currentpas, pass) {
    $('#spinner').show();
    $.ajax({
        type: 'GET',
        url: baseurl + 'updateUserProfile',
        dataType: 'json',
        timeout: 10000,
        data: {
            authtoken: authtoken,
            current_password: currentpas,
            user_id: userid,
            password: pass,
            lang_code: lang_code,
        },
        success: function (data, textStatus, xhr) {
            if (xhr.status == 200) {
                $('#spinner').hide();
                var response_data = data;
                var logo_img = "";
                if (response_data.code == 200) {
                    //console.log(localStorage.getItem("profile_updated"))
                    $('#nocontent').text(response_data.msg);
                    $('#nocontent').show();
                    /*Clear the password field*/
                    $("#currentpas").val("");
                    $("#login2").val("");
                    $("#login3").val("");
                    var timer = setTimeout(function () {
                        $('#nocontent').hide();
                        $(location).attr('href', "profilepage.html");
                    }, 5000);
                } else {
                    $('#nocontent').text(response_data.msg);
                    $('#nocontent').show();
                    var timer = setTimeout(function () {
                        $('#nocontent').hide();
                    }, 5000);
                }
            }
        },
        error: function (xhr, textStatus) {
            errorUtil(xhr, textStatus);
        },
    });
}

/*Profile*/
function updateProfile() {
    $.ajax({
        type: 'GET',
        url: baseurl + 'getProfileDetails',
        dataType: 'json',
        timeout: 10000,
        data: {
            authtoken: authtoken,
            email: email,
            user_id: userid,
            lang_code: lang_code
        },
        success: function (data, textStatus, xhr) {
            if (xhr.status == 200) {
                profileresponse = data;
                console.log(profileresponse);
                if (profileresponse.code == 200) {
                    $('#login1').val(profileresponse.display_name);
                    $('#email').val(profileresponse.email);
                    if (profileresponse.profile_image != "" && profileresponse.profile_image != "https://api.muvi.com/img/no-image.png") {
                        var response_img = profileresponse.profile_image;
                        var ori_img = response_img.replace("thumb", "original");
                        $("#profile_image").attr('src', ori_img);
                    }
                    /*tab hide or show*/
                    $('.contentinr_tab').removeClass('hide');
                    $('.language-tab').addClass('hide');
                    $('.plan-tab').addClass('hide');
                    $('#spinner').hide();
                    $('#nocontent').hide();
                }
            }
        },
        error: function (xhr, textStatus) {
            errorUtil(xhr, textStatus);
        },
    });
}

// for navigation menu
function navBarCall(permalink) {
    if (($("#spinner").is(":visible") != true)) {
        localStorage.removeItem("sortbypermalink");
        localStorage.removeItem("generstringdata");
        localStorage.removeItem("keyindex");

        /*remove when loadpage firsttime*/
        localStorage.removeItem("backupPermalink");
        localStorage.removeItem("backupHasCategory");
        localStorage.removeItem("backupCategoryId");
        localStorage.removeItem("leftCurrentId");

        var htmlPage = permalink + "page" + ".html";
        $(location).attr('href', '' + htmlPage + '');
    }
}


function errorUtil(xhr, textStatus) {
    if (xhr.readyState == 0 && textStatus == "error") {
        location.reload(true);
        console.log('not ready');
    } else if (textStatus == "timeout") {
        console.log('timeout');
        $('#nocontent').text(localStorage.getItem("internet_slow"));
        $('#nocontent').show();
        var timer = setTimeout(function () {
            $('#nocontent').hide();
            location.reload(true);
        }, 5000);
    } else {
        console.log('No Response From Server!');
        $('#nocontent').text("No Response From Server!");
        $('#nocontent').show();
        var timer = setTimeout(function () {
            $('#nocontent').hide();
        }, 5000);
    }
}

