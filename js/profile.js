var authtoken = '';
var baseurl = '';
var lang_code = '';
var userid = '';
var email = '';
var login_history_id = '';
var inputFocus = false;
var prevUsername = '';
var country = localStorage.getItem("country");
var init = function () {
    //$('#spinner').show();
    if (localStorage.getItem("authtokenstr") != null) {
        authtoken = localStorage.getItem("authtokenstr");
        baseurl = localStorage.getItem("baseurl");
        lang_code = localStorage.getItem("lang_code");
        userid = localStorage.getItem("loginstr");
        email = localStorage.getItem("emailstr");
        login_history_id = localStorage.getItem("login_history_id");
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
    $('#login5').text(localStorage.getItem("logout"));
    $('#login4').text(localStorage.getItem("btn_update_profile"));
    $('#login2').attr('placeholder', localStorage.getItem("password"));
    $('#login3').attr('placeholder', localStorage.getItem("confirm_password"));
    $('#passwordtitle').text(localStorage.getItem("change_password"));

    $('#spinner').show();
    updateProfile();


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
                    $("#login1").blur();
                    $("#login2").blur();
                    $("#email").blur();
                    $current.removeClass('current');
                    $('#mainmenu').children().eq(0).addClass('current');
                } else if (currentparentId === "buttonsec") {
                    $("#login3").blur();
                    $("#login1").blur();
                    $("#login2").blur();
                    $("#email").blur();
                    $current.removeClass("current");
                    $('#login1').addClass("current");
                } else if (currentparentId === "userConfPwd") {
                    $("#login3").blur();
                    $("#login1").blur();
                    $("#login2").blur();
                    $("#email").blur();
                    $current.removeClass("current");
                    $('#login2').addClass("current");
                } else if (currentparentId === "userPwd") {
                    $("#login3").blur();
                    $("#login1").blur();
                    $("#login2").blur();
                    $("#email").blur();
                    $current.removeClass("current");
                    $('#email').addClass("current");
                } else if (currentparentId === "userEmail") {
                    $("#login3").blur();
                    $("#login1").blur();
                    $("#login2").blur();
                    $("#email").blur();
                    $current.removeClass("current");
                    $('#login1').addClass("current");
                } else if (currentparentId === "userName") {
                    $("#login3").blur();
                    $("#login1").blur();
                    $("#login2").blur();
                    $("#email").blur();
                    $current.removeClass("current");
                    $('#profileul').children().eq(0).addClass("current");
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
                    $('#profileul').children().eq(0).addClass("current");
                } else if (currentparentId === "profileul") {
                    if (currentId == "lang") {
                        if ($('#language-div').is(':visible') == true) {
                            $current.removeClass("current");
                            $('#language-div').children().removeClass('hide');
                            $('#language-div').children().eq(0).addClass("current");
                        }else if ($('.plan-tab').is(':visible') == true) {

                        }else if ($('.contentinr_tab').is(':visible') == true) {
                            $current.removeClass("current");
                            $('#login1').addClass("current");
                            //$("#login1").focus();
                            $("#login2").blur();
                            $("#login3").blur();
                            $("#email").blur();
                        }
                    } else if (currentId == "profileDtl") {
                        if ($('#language-div').is(':visible') == true) {
                            $current.removeClass("current");
                            $('#language-div').children().removeClass('hide');
                            $('#language-div').children().eq(0).addClass("current");
                        }else if ($('.plan-tab').is(':visible') == true) {

                        }else if ($('.contentinr_tab').is(':visible') == true) {
                            $current.removeClass("current");
                            $('#login1').addClass("current");
                            //$("#login1").focus();
                            $("#login2").blur();
                            $("#login3").blur();
                            $("#email").blur();
                        }
                    }else if (currentId == "plan") {
                        if ($('#language-div').is(':visible') == true) {
                            $current.removeClass("current");
                            $('#language-div').children().removeClass('hide');
                            $('#language-div').children().eq(0).addClass("current");
                        }else if ($('.plan-tab').is(':visible') == true) {

                        }else if ($('.contentinr_tab').is(':visible') == true) {
                            $current.removeClass("current");
                            $('#login1').addClass("current");
                            //$("#login1").focus();
                            $("#login2").blur();
                            $("#login3").blur();
                            $("#email").blur();
                        }
                    } else {
                        if ($('#language-div').is(':visible') == true) {
                            $current.removeClass("current");
                            $('#language-div').children().removeClass('hide');
                            $('#language-div').children().eq(0).addClass("current");
                        }else if ($('.plan-tab').is(':visible') == true) {

                        } else if ($('.contentinr_tab').is(':visible') == true) {
                            $current.removeClass("current");
                            $('#login1').addClass("current");
                            //$("#login1").focus();
                            $("#login2").blur();
                            $("#login3").blur();
                            $("#email").blur();
                        }
                    }
                } else if (currentparentId === "userName") {
                    $current.removeClass("current");
                    // $('#login4').addClass("current");
                    var changedUName = $("#login1").val();
                    if (prevUsername !== changedUName.trim()) {
                        $('#login4').addClass("current");
                    } else {
                        $('#passwordtitle').addClass("current");
                    }
                    //$("#email").focus();
                    $("#login1").blur();
                    $("#login2").blur();
                    $("#login3").blur();
                }
                //  else if (currentparentId === "userEmail") {
                // 	$current.removeClass("current");
                // 	$('#login2').addClass("current");
                // 	//$("#login2").focus();
                // 	$("#login1").blur();
                // 	$("#email").blur();
                // 	$("#login3").blur();
                // } else if (currentparentId === "userPwd") {
                // 	$current.removeClass("current");
                // 	$('#login3').addClass("current");
                // 	//$("#login3").focus();
                // 	$("#login1").blur();
                // 	$("#login2").blur();
                // 	$("#email").blur();
                // } else if (currentparentId === "userConfPwd") {
                // 	$current.removeClass("current");
                // 	$("#login3").blur();
                // 	$("#login1").blur();
                // 	$("#login2").blur();
                // 	$("#email").blur();
                // 	$('#buttonsec').children().eq(0).addClass("current");
                // }
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
                    $("#login1").blur();
                    $("#login2").blur();
                    $("#email").blur();
                    if ($current.prev().length > 0) {
                        $current.removeClass('current');
                        $current.prev().addClass('current');
                    }
                } else if (currentparentId == "profileul") {
                    $("#login3").blur();
                    $("#login1").blur();
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
                    if ($current.prev().length > 0) {
                        var changedUName = $("#login1").val();
                        $current.removeClass('current');
                        if (prevUsername !== changedUName.trim()) {
                            $current.prev().addClass('current');
                        } else {
                            $("#login3").blur();
                            $("#login1").blur();
                            $("#login2").blur();
                            $("#email").blur();
                            $('#login5').addClass("current");
                        }

                    } else {
                        $("#login3").blur();
                        $("#login1").blur();
                        $("#login2").blur();
                        $("#email").blur();
                        $current.removeClass("current");
                        $('#login5').addClass("current");
                    }

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
                    $("#login1").blur();
                    $("#login2").blur();
                    $("#email").blur();
                    if ($current.next().length > 0) {
                        $current.removeClass('current');
                        $current.next().addClass('current');
                    }
                } else if (currentparentId == "profileul") {
                    $("#login3").blur();
                    $("#login1").blur();
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
                    var changedUName = $("#login1").val();
                    $("#login3").blur();
                    $("#login1").blur();
                    $("#login2").blur();
                    $("#email").blur();
                    $current.removeClass("current");
                    if (prevUsername !== changedUName.trim()) {
                        $('#login4').addClass("current");
                    } else {
                        $('#passwordtitle').addClass("current");
                    }

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
                if ($("#login1").is(":focus")) {
                    $("#login1").blur();
                } else {
                    $("#login1").focus();
                }
                $("#login2").blur();
                $("#login3").blur();
                $("#email").blur();
            } else if (currentparentId == "userEmail") {
                $("#email").focus();
                $("#login1").blur();
                $("#login2").blur();
                $("#login3").blur();
            } else if (currentparentId == "userPwd") {
                $("#login2").focus();
                $("#login1").blur();
                $("#email").blur();
                $("#login3").blur();
            } else if (currentparentId == "userConfPwd") {
                $("#login3").focus();
                $("#login1").blur();
                $("#login2").blur();
                $("#email").blur();
            } else if (currentparentId == "buttonsec") {
                if (currentId == "login4") {
                    $("#login1").blur();
                    $("#login2").blur();
                    $("#login3").blur();
                    $("#email").blur();
                    getvalueandupdate();
                } else {
                    $(location).attr('href', "changepassword.html");
                }
            } else if (currentparentId == "prflsec") {
                if (currentId == "login5") {
                    $("#login1").blur();
                    $("#login2").blur();
                    $("#login3").blur();
                    $("#email").blur();
                    backToPreLoginPage()
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
    var logoutdata = {
        authtoken: authtoken,
        login_history_id: login_history_id,
    }
    $.ajax({
        type: 'POST',
        url: baseurl + 'Logout',
        dataType: 'json',
        timeout: 10000,
        data: JSON.stringify(logoutdata),
        success: function (data, textStatus, xhr) {
            if (xhr.status == 200) {
                logoutresponse = data;
                console.log(logoutresponse);
                if (logoutresponse.code == 200) {
                    $('#nocontent').text(localStorage.getItem("logout_success"));
                    $('#nocontent').show();
                    $('#spinner').hide();
                    var timer = setTimeout(function () {
                        $('#nocontent').hide();
                        localStorage.removeItem("loginstr");
                        $(location).attr('href', "preLogin.html");
                    }, 2000);
                } else {
                    $('#nocontent').text(logoutresponse.msg);
                    $('#nocontent').show();
                    var timer = setTimeout(function () {
                        $('#spinner').hide();
                        $('#nocontent').hide();
                    }, 5000);
                }
            }
        },
        error: function (xhr, textStatus) {
            errorUtil(xhr, textStatus);
        },
    });
    // var timer = setTimeout(function () {
    // 	$('#spinner').hide();
    // 	localStorage.removeItem("loginstr");
    // 	//$(location).attr('href', "preLogin.html");

    // }, 2000);

}

function getvalueandupdate() {
    var name = $("#login1").val();
    if (name == "") {
        $('#nocontent').text(localStorage.getItem("required_default_msg"));
        $('#nocontent').show();
        var timer = setTimeout(function () {
            $('#nocontent').hide();
        }, 5000);
    } else {
        updateprofile(name);
    }

}

function updateprofile(name) {
    $('#spinner').show();
    $.ajax({
        type: 'GET',
        url: baseurl + 'updateUserProfile',
        dataType: 'json',
        timeout: 10000,
        data: {
            authtoken: authtoken,
            name: name,
            user_id: userid,
            lang_code: lang_code,
        },
        success: function (data, textStatus, xhr) {
            if (xhr.status == 200) {
                $('#spinner').hide();
                upprofileresponse = data;
                console.log(upprofileresponse);
                var logo_img = "";
                if (profileresponse.code == 200) {
                    //console.log(localStorage.getItem("profile_updated"))
                    $('#nocontent').text(localStorage.getItem("profile_updated"));
                    $('#nocontent').show();
                    /*Clear the password field*/
                    $("#login2").val("");
                    $("#login3").val("");
                    var timer = setTimeout(function () {
                        $('#nocontent').hide();
                    }, 5000);
                } else {
                    $('#nocontent').text(upprofileresponse.msg);
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

function chooseLang() {
    $('#spinner').show();
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var languageDiv = '';
            var langObj = JSON.parse(this.responseText);
            var navelementslength = Object.keys(langObj.lang_list).length;
            for (var i = 0; i < langObj.lang_list.length; i++) {
                if (langObj.lang_list[i].code === localStorage.getItem("lang_code")) {
                    languageDiv += '<div class="col-lg-2 cus-langdiv activeLang" id="lang_' + i + '" data-code=' + langObj.lang_list[i].code + ' ><div class="card "> <div class="card-body"> <p>' + langObj.lang_list[i].language + '</p></div></div></div>';
                } else {
                    languageDiv += '<div class="col-lg-2 cus-langdiv " id="lang_' + i + '" data-code=' + langObj.lang_list[i].code + ' ><div class="card "> <div class="card-body"> <p>' + langObj.lang_list[i].language + '</p></div></div></div>';
                }
            }
            $('#language-div').empty().append(languageDiv);
            //console.log(localStorage.getItem("my_language"));
            /*tab hide or show*/
            $('.language-tab').removeClass('hide');
            $('.contentinr_tab').addClass('hide');
            $('.plan-tab').addClass('hide');
            $('#spinner').hide();
            $('#nocontent').hide();
        }
    }
    xmlhttp.open("GET", "" + baseurl + "getLanguagelist?authToken=" + authtoken, true);
    xmlhttp.send();
}

/*My Subscription*/
function myPlans() {
    var myPlanshr = new XMLHttpRequest();
    myPlanshr.onreadystatechange = function () {
        $('#spinner').show();
        if (this.readyState == 4 && this.status == 200) {
            //$('#spinner').hide();
            myPlansresponse = JSON.parse(this.responseText);
            if (myPlansresponse.code == 200) {
                var planname = '' + myPlansresponse.Plan[0]['name'] + '';
                var planprice = "$" + '' + myPlansresponse.Plan[0]['price'] + '';
                var planfrequency = '' + myPlansresponse.Plan[0]['frequency'] + '';
                var planreccurance = '' + myPlansresponse.Plan[0]['recurrence'] + '';

                $('#currentplan').html(planname);
                $('#currentprice').html(planprice);
                $('#reccuringmonth').html(planfrequency + " " + planreccurance);

                /*tab hide or show*/
                $('.contentinr_tab').addClass('hide');
                $('.language-tab').addClass('hide');
                $('.plan-tab').removeClass('hide');
                $('#nocontent').hide();
                $('#spinner').hide();
            } else {
                $('.contentinr_tab').addClass('hide');
                $('.language-tab').addClass('hide');
                $('.plan-tab').addClass('hide');
                $('#spinner').hide();
                $('#nocontent').text(localStorage.getItem("no_data_plan"));
                $('#nocontent').show();
                /*var timer = setTimeout(function() {
                	$('#nocontent').hide();
                }, 2000);*/
            }
        }
    }
    myPlanshr.open("GET", "" + baseurl + "MyPlans?authToken=" + authtoken + "&user_id=" + userid + "&lang_code=" + lang_code + "&country=" + country, true);
    myPlanshr.send();
}

function getTextTranslation(lang_code) {
    localStorage.setItem("lang_code", lang_code);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var translationjson = JSON.parse(this.responseText);
            if (translationjson.code == "200") {
                /*Navbar section*/
                if (translationjson.translation.home != '') {
                    localStorage.setItem("home", translationjson.translation.home);
                } else {
                    localStorage.setItem("home", "Home");
                }

                if (translationjson.translation.text_search_placeholder != '') {
                    localStorage.setItem("search", translationjson.translation.text_search_placeholder);
                } else {
                    localStorage.setItem("search", "Search");
                }

                if (translationjson.translation.category != '') {
                    localStorage.setItem("categories", translationjson.translation.category);
                } else {
                    localStorage.setItem("categories", "Categories");
                }

                if (translationjson.translation.my_favourite != '') {
                    localStorage.setItem("my_favourite", translationjson.translation.my_favourite);
                } else {
                    localStorage.setItem("my_favourite", "My Favourite");
                }

                if (translationjson.translation.watch_history != '') {
                    localStorage.setItem("watch_history", translationjson.translation.watch_history);
                } else {
                    localStorage.setItem("watch_history", "Watch History");
                }

                if (translationjson.translation.my_library != '') {
                    localStorage.setItem("my_library", translationjson.translation.my_library);
                } else {
                    localStorage.setItem("my_library", "My Library");
                }

                if (translationjson.translation.profile != '') {
                    localStorage.setItem("profile", translationjson.translation.profile);
                } else {
                    localStorage.setItem("profile", "Profile");
                }

                /*Profile Page*/
                if (translationjson.translation.my_profile != '') {
                    localStorage.setItem("my_profile", translationjson.translation.my_profile);
                } else {
                    localStorage.setItem("my_profile", "My Profile");
                }

                if (translationjson.translation.app_select_language != '') {
                    localStorage.setItem("my_language", translationjson.translation.app_select_language);
                } else {
                    localStorage.setItem("my_language", "Select Your Language");
                }

                if (translationjson.translation.continue != '') {
                    localStorage.setItem("continue", translationjson.translation.continue);
                } else {
                    localStorage.setItem("continue", "Continue");
                }

                if (translationjson.translation.my_subscription != '') {
                    localStorage.setItem("my_subsciption", translationjson.translation.my_subscription);
                } else {
                    localStorage.setItem("my_subsciption", "My Subscription");
                }

                if (translationjson.translation.logout != '') {
                    localStorage.setItem("logout", translationjson.translation.logout);
                } else {
                    localStorage.setItem("logout", "Logout");
                }

                if (translationjson.translation.no_data_plan != '') {
                    localStorage.setItem("no_data_plan", translationjson.translation.no_data_plan);
                } else {
                    localStorage.setItem("no_data_plan", "No Plan Available");
                }

                if (translationjson.translation.btn_update_profile != '') {
                    localStorage.setItem("btn_update_profile", translationjson.translation.btn_update_profile);
                } else {
                    localStorage.setItem("btn_update_profile", "Update Profile");
                }

                if (translationjson.translation.save_continue != '') {
                    localStorage.setItem("save_continue", translationjson.translation.save_continue);
                } else {
                    localStorage.setItem("save_continue", "Save & Continue");
                }

                if (translationjson.translation.profile_updated != '') {
                    localStorage.setItem("profile_updated", translationjson.translation.profile_updated);
                } else {
                    localStorage.setItem("profile_updated", "Profile updated successfully.");
                }


                /*Other*/
                localStorage.setItem("current_password", translationjson.translation.current_password);
                localStorage.setItem("resume_playing", translationjson.translation.resume_playing);
                localStorage.setItem("login", translationjson.translation.login);
                localStorage.setItem("logout_success", translationjson.translation.logout_success);
                localStorage.setItem("filter", translationjson.translation.filter);
                localStorage.setItem("filter_by", translationjson.translation.filter_by);
                localStorage.setItem("sort_by", translationjson.translation.sort_by);
                localStorage.setItem("no_content", translationjson.translation.not_found);
                localStorage.setItem("episodes_title", translationjson.translation.episodes_title);
                localStorage.setItem("app_exit_message", translationjson.translation.app_exit_message);
                localStorage.setItem("change_password", translationjson.translation.change_password);
                localStorage.setItem("btn_register", translationjson.translation.btn_register);
                localStorage.setItem("email_address", translationjson.translation.email_address);
                localStorage.setItem("btn_submit", translationjson.translation.btn_submit);
                localStorage.setItem("password", translationjson.translation.text_password_placeholder);
                localStorage.setItem("forgot_password", translationjson.translation.forgot_password);
                localStorage.setItem("new_here_title", translationjson.translation.new_here_title);
                localStorage.setItem("see_more", translationjson.translation.more);

                localStorage.setItem("register_here", translationjson.translation.register_here);
                localStorage.setItem("text_name", translationjson.translation.text_name);
                localStorage.setItem("confirm_password", translationjson.translation.confirm_password);
                localStorage.setItem("btn_register", translationjson.translation.btn_register);
                localStorage.setItem("see_more", translationjson.translation.more);
                localStorage.setItem("recently_played", translationjson.translation.recently_played);
                localStorage.setItem("add_to_fav", translationjson.translation.add_to_fav);
                localStorage.setItem("added_to_fav", translationjson.translation.added_to_fav);
                localStorage.setItem("content_remove_favourite", translationjson.translation.content_remove_favourite);
                localStorage.setItem("view_trailer", translationjson.translation.view_trailer);
                localStorage.setItem("watch_now", translationjson.translation.watch_now);
                localStorage.setItem("episodes_title", translationjson.translation.episodes_title);
                localStorage.setItem("filmography", translationjson.translation.filmography);
                localStorage.setItem("view_more", translationjson.translation.view_more);
                localStorage.setItem("season", translationjson.translation.season);
                localStorage.setItem("profile_updated", translationjson.translation.profile_updated);
                localStorage.setItem("user_profile", translationjson.translation.user_profile);
                localStorage.setItem("new_password", translationjson.translation.new_password);
                localStorage.setItem("confirm_password", translationjson.translation.confirm_password);


                /*redirect to home page*/
                $(location).attr('href', "homepage.html");
            }
        }
    }
    xmlhttp.open("GET", "" + baseurl + "textTranslation?authToken=" + authtoken + "&lang_code=" + lang_code, true);
    xmlhttp.send();

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
                    prevUsername = profileresponse.display_name;
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
    localStorage.removeItem("sortbypermalink");
    localStorage.removeItem("generstringdata");
    localStorage.removeItem("keyindex");

    /*remove when loadpage firsttime*/
    localStorage.removeItem("backupPermalink");
    localStorage.removeItem("backupHasCategory");
    localStorage.removeItem("backupCategoryId");
    localStorage.removeItem("leftCurrentId");
    localStorage.removeItem("catActiveId");
    var htmlPage = permalink + "page" + ".html";
    $(location).attr('href', '' + htmlPage + '');
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






