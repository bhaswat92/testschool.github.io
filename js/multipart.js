var checkTime;
var subtitleArr = [];
var init = function () {
    $("#spinner").show();
    var country = localStorage.getItem("country");
    if (localStorage.getItem("authtokenstr") != null) {
        var authtoken = localStorage.getItem("authtokenstr");
        var baseurl = localStorage.getItem("baseurl");
        var lang_code = localStorage.getItem("lang_code");
        var season_info = localStorage.getItem("isRegistrationEnabled");
    }
    /*===dynamically inserted menu according to CMS====*/
    var navmenu =
        '<li class="nav-item" data-permalink="home" id="navhome"><div class="nav-link" id="home">' +
        localStorage.getItem("home") +
        '</div></li><li class="nav-item" data-permalink="search" id="navsearch"><div class="nav-link" id="search">' +
        localStorage.getItem("search") +
        '</div></li><li class="nav-item" data-permalink="category" id="navcat"><div class="nav-link" id="category">' +
        localStorage.getItem("categories") +
        "</div></li>";
    if (
        localStorage.getItem("Myfavorite") == "1" &&
        localStorage.getItem("loginstr") != null
    ) {
        navmenu +=
            '<li class="nav-item" data-permalink="myfavourite"  id="navmyfavourite"> <div class="nav-link" id="myfavourite">' +
            localStorage.getItem("my_favourite") +
            "</div></li>";
    }
    if (
        localStorage.getItem("WatchHistory") == "1" &&
        localStorage.getItem("loginstr") != null
    ) {
        navmenu +=
            '<li class="nav-item" data-permalink="watchhistory" id="navwatchhistory"> <div class="nav-link" id="watchhistory">' +
            localStorage.getItem("watch_history") +
            "</div></li>";
    }
    if (
        localStorage.getItem("Mylibrary") == "1" &&
        localStorage.getItem("loginstr") != null
    ) {
        navmenu +=
            '<li class="nav-item" data-permalink="mylibrary" id="navmylibrary"> <div class="nav-link" id="mylibrary">' +
            localStorage.getItem("my_library") +
            "</div></li>";
    }
    navmenu +=
        '<li class="nav-item" data-permalink="profile" id="navprofile"><div class="nav-link last-nav" id="profile">' +
        localStorage.getItem("profile") +
        "</div></li>";
    //$(navmenu).insertAfter('#navcat');
    $("#mainmenu").empty().append(navmenu);
    $("#navhome").addClass("current");

    var name = "";
    var video_duration = "";
    var release_date = "";
    var modaltitle = "";
    var releaseDateHtml = "";
    var modalstory = "";
    var modalcastimage = "";
    $("#episode_more").text(localStorage.getItem("episodes_title"));
    var fullstory = "";

    function getParameterByName(name, href) {
        //name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(href);
        if (results == null) return "vikings";
        else return decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    var currentperm = getParameterByName("permalink", window.location.href);

    localStorage.setItem("curr_permalink", currentperm);
    //var isepisode = getParameterByName("is_episode" , window.location.href);
    var loginstr = localStorage.getItem("loginstr");
    if (localStorage.getItem("loginstr") != null) {
        $("#myaccounts").show();
        $("#logout").show();
    }
    if (
        localStorage.getItem("Mylibrary") == "1" &&
        localStorage.getItem("loginstr") != null
    ) {
        $("#mylibrary").show();
    }
    if (
        localStorage.getItem("WatchHistory") == "1" &&
        localStorage.getItem("loginstr") != null
    ) {
        $("#watchhistory").show();
    }
    if (
        localStorage.getItem("Myfavorite") == "1" &&
        localStorage.getItem("loginstr") != null
    ) {
        $("#myfavourite").show();
    }
    if (localStorage.getItem("episodes_title") == null) {
        $("#episode_more_details").text("Please select episode");
    } else {
        $("#episode_more_details").text(localStorage.getItem("episodes_title"));
    }

    //var currentperm="vikings";
    var isfav = 0;
    var total_series = 0;
    var series_no = 0;
    var thirdparty_url = "";
    var muvi_streamunique_id = "";
    var muviunique_id = "";
    var is_episode = "";

    function getContentDetailsResp(data, textStatus, xhr) {
        console.log(data);
        $("#spinner").hide();
        $("#allbuttondiv").show();
        mybanner_img = data;
        var rating = mybanner_img.rating;
        var review = mybanner_img.review;
        console.log(mybanner_img);
        var strbannerimage = "";
        var viewmore_text = "";
        var genre = "";
        var playerdiv = "";
        var story = "";
        var playnow = "";
        var castimage = "";
        var muvi_uniq_id = "";
        var movie_stream_uniq_id = "";
        var favouriteimage = "";
        var is_favourite = "";
        var trailerdiv = "";
        var i = 0;
        var content_description = "";
        var episode_more = "";
        console.log(currentperm);
        if (mybanner_img.code == 200) {
            $("#navbarcontent").show();
            if (mybanner_img.movie["trailerThirdpartyUrl"] != "null") {
                thirdparty_url = mybanner_img.movie["trailerThirdpartyUrl"];
            } else {
                thirdparty_url = "";
            }
            if (currentperm == mybanner_img.movie["permalink"]) {
                if (mybanner_img.movie["story"] != "null") {
                    fullstory = mybanner_img.movie["story"];
                    var story = truncate(mybanner_img.movie["story"]);
                    var story = story;
                    //var story=replacespecialcharcter(story);
                }
                if (mybanner_img.movie["name"] != "null") {
                    //name=replacespecialcharcter(mybanner_img.movie['name']);
                    name = mybanner_img.movie["name"];
                    modaltitle = mybanner_img.movie["name"];
                }
                if (mybanner_img.movie["permalink"] != "null") {
                    var permalink = replacespecialcharcter(
                        mybanner_img.movie["permalink"]
                    );
                }
                if (mybanner_img.movie["release_date"] != "null") {
                    var year = replacespecialcharcter(mybanner_img.movie["release_date"]);
                    var release_date = year.split("-", 1);
                } else {
                    release_date = "";
                }
                if (mybanner_img.movie["video_duration"] != "null") {
                    video_duration = mybanner_img.movie["video_duration"];
                    var duration = video_duration;
                }
                if (mybanner_img.movie["is_favorite"] != "null") {
                    var is_favourite = mybanner_img.movie["is_favorite"];
                }
                if (mybanner_img.movie["muvi_uniq_id"] != "null") {
                    muvi_uniq_id = mybanner_img.movie["muvi_uniq_id"];
                }
                if (mybanner_img.movie["is_episode"] != "null") {
                    is_episode = mybanner_img.movie["is_episode"];
                } else {
                    is_episode = "0";
                }

                if (mybanner_img.movie["genre"] != "null") {
                    genre = mybanner_img.movie["genre"].replace(/[^a-zA-Z,]/g, " ");
                    //genre=JSON.parse(genre);
                    // var genre = JSON.parse(mybanner_img.movie['genre']);
                    // genre = genre.slice(0, 3).join(', ');
                } else {
                    genre = "";
                }
                if (genre == "null") {
                    genre = "";
                }
                if (genre == "undefined") {
                    genre = "";
                }
                var posterofTv = mybanner_img.movie["posterForTv"];
                modalcastimage = mybanner_img.movie["posterForTv"];

                banner = mybanner_img.movie["tv_banner"];
                var body = document.getElementsByTagName("BODY")[0];
                //$('body').css('backgroundImage','url("'+banner+'")');

                if (banner != null) {
                    body.style.backgroundImage = "url(" + banner + ")";
                    body.style.backgroundRepeat = "no-repeat";
                    body.style.backgroundPosition = "left top";
                    body.style.backgroundAttachment = "scroll";
                    body.style.width = "100%";
                    body.style.backgroundSize = "cover";
                } else {
                    $("body").css("background-color", "#000000");
                }

                if (mybanner_img.movie.cast_detail.length > 0) {
                    $("#cast_image").show();
                } else {
                    //$('#cast_image').hide();
                }

                for (i = 0; i < mybanner_img.movie.cast_detail.length; i++) {
                    var cast_details_image =
                        mybanner_img.movie.cast_detail[i]["celeb_image"];
                    var cast_details_image_permalink =
                        mybanner_img.movie.cast_detail[i]["permalink"];
                    if (i < 5) {
                        castimage +=
                            '<img focusable src="' +
                            cast_details_image +
                            '" data-perma=' +
                            cast_details_image_permalink +
                            '  id="castcrew' +
                            i +
                            '" class="img-circle" alt="Cinque Terre" width="90" height="90" style="border: 2px solid grey;">';
                    } else {
                    }
                }
                var genreHtml = "";
                var durationHtml = "";
                if (genre == null || genre == "") {
                    genreHtml = "";
                } else {
                    genreHtml = "" + genre + "";
                }
                if (!release_date == "") {
                    releaseDateHtml = "" + release_date + "";
                }
                if (!video_duration == "") {
                    durationHtml = "" + convertToText(duration) + "";
                }
                var ratingStar = "";
                if (fullstory != null && fullstory != "") {
                    if (rating > 0 || review > 0) {
                        for (var i = 0; i < 5; i++) {
                            if (i < rating) {
                                ratingStar += '<span class="fa fa-star checked"></span>';
                            } else {
                                ratingStar += '<span class="fa fa-star"></span>';
                            }
                        }
                        //ratingStar+='<span class="text-muted"> ('+review+')</span>';
                    }
                    content_description +=
                        '<div class="col-lg-5 col-md-5 col-sm-5">' +
                        '<h1 class="heading">' +
                        name +
                        "</h1>" +
                        '<div class="title-bar"></div>' +
                        '<div class="p-light mb-3 text-muted"><span>' +
                        releaseDateHtml +
                        '</span> <span id="one">|</span> <span>' +
                        genreHtml +
                        '</span> <span id="two">|<span> </span>' +
                        durationHtml +
                        "</span></div>" +
                        '<div class="rating">' +
                        ratingStar +
                        "</div>" +
                        "<p>" +
                        story +
                        "</p>";
                    viewmore_text +=
                        '<b focusable data-perma="viemorefocus" id="fullstory" style="font-size:20px;font-weight: normal;">' +
                        localStorage.getItem("view_more") +
                        "</b>";
                } else {
                    if (rating > 0 || review > 0) {
                        for (var i = 0; i < 5; i++) {
                            if (i < rating) {
                                ratingStar += '<span class="fa fa-star checked"></span>';
                            } else {
                                ratingStar += '<span class="fa fa-star"></span>';
                            }
                        }

                        ratingStar += '<span class="text-muted"> (' + review + ")</span>";
                    }

                    content_description +=
                        '<div class="col-lg-5 col-md-5 col-sm-5">' +
                        '<h1 class="heading">' +
                        name +
                        "</h1>" +
                        '<div class="title-bar"></div>' +
                        '<div class="p-light mb-3 text-muted"><span>' +
                        releaseDateHtml +
                        '</span> <span id="one">|</span> <span>' +
                        genreHtml +
                        '</span> <span id="two">|<span> </span>' +
                        durationHtml +
                        "</span></div>" +
                        '<div class="rating">' +
                        ratingStar +
                        "</div>" +
                        '<p style="font-size: 22px;">' +
                        story +
                        "</p>";

                    viewmore_text +=
                        '<b focusable data-perma="viemorefocus" id="fullstory" style="font-size:20px;font-weight: normal;">' +
                        localStorage.getItem("view_more") +
                        "</b>";
                }

                var setstorytomodal =
                    '<p style="font-size:25px;margin-top:30px;font-weight: 400;color: #ccc;">' +
                    fullstory +
                    "</p>";
                var modalimage =
                    '  <div style="width: 20%;float: left;">' +
                    '<img  src="' +
                    posterofTv +
                    '" class="img-circle"  width="170" height="160" style="margin-right:10px;margin-left:15px;">' +
                    '</div><div style="margin-top: 30px;float: left;width: 50%;	margin-left: 80px;"><p class="text-color"  style=" margin-bottom:0px;font-size:45px;font-weight: 600;">' +
                    name +
                    '</p><hr style="margin-top: 2px;    border-top: 0px;margin-right: 380px;margin-left: 3px;background: #0cb9f2;height: 2px;"></div>';
                var episode_seriesnumber = mybanner_img.epDetails.series_number;
                series_no = JSON.parse("[" + episode_seriesnumber + "]");
                console.log(episode_seriesnumber);
                var series_number = JSON.parse("[" + episode_seriesnumber + "]");
                total_series = mybanner_img.epDetails.total_series;

                if (mybanner_img.movie.trailer_status !== 0) {
                    playerdiv +=
                        '<div class="row mt-4" id="playdiv" data-is_fav="' +
                        is_favourite +
                        '" data-muvi_stream-unique_id="' +
                        mybanner_img.movie["movie_stream_uniq_id"] +
                        '" data-muviunique_id="' +
                        muvi_uniq_id +
                        '" data-is_episode="' +
                        is_episode +
                        '" data-movieurl="' +
                        mybanner_img.movie["trailerUrl"] +
                        '" data-perma="favourite"><div class="col-12 cus-padding"><img src="images/watch_trailer_white.png" id="watchtrailer"/><span class="singlepart-text" id="playtrailervideo">' +
                        localStorage.getItem("view_trailer") +
                        '</span><div class="mt-3"><img src="images/multipart-line.png"/></div></div></div>';
                }
                //====trailor Section==== //
                if ((is_episode == "0" || is_episode == "1") && season_info == "1") {
                    seasonPoster();
                } else {
                    playerdiv +=
                        '<div class="row mt-4" id="tarilerdiv" data-title="' +
                        name +
                        '" data-series="' +
                        series_number +
                        '" data-totalseries="' +
                        total_series +
                        '" data-perma="' +
                        permalink +
                        '" data-releasedate="' +
                        release_date +
                        '" data-muviduration="' +
                        video_duration +
                        '"><div class="col-12 cus-padding"><img src="images/episode_blue_white.png" id="episode_more_details"/> <span class="singlepart-text" id="episode_more">' +
                        localStorage.getItem("episodes_title") +
                        '</span><div class="mt-3"><img src="images/multipart-line.png"/></div></div></div>';
                }

                //====End Episode Section==== //
                if (localStorage.getItem("Myfavorite") == "1") {
                    if (is_favourite == 0) {
                        localStorage.setItem("isfavourite", "0");
                        playerdiv +=
                            '<div class="row mt-4" id="favdiv" data-is_fav="' +
                            is_favourite +
                            '" data-muviunique_id="' +
                            muvi_uniq_id +
                            '" data-is_episode="' +
                            is_episode +
                            '" data-perma="favourite"><div class="col-12 cus-padding"><img src="images/favourite_white.png" id="favimagechange"/><span class="singlepart-text" id="fav">' +
                            localStorage.getItem("add_to_fav") +
                            "</span></div></div>";
                        $("#favimagechange").attr("src", "images/favourite_white.png");
                    } else {
                        localStorage.setItem("isfavourite", "1");
                        playerdiv +=
                            '<div class="row mt-4" id="favdiv" data-is_fav="' +
                            is_favourite +
                            '" data-muviunique_id="' +
                            muvi_uniq_id +
                            '" data-is_episode="' +
                            is_episode +
                            '" data-perma="favourite"><div class="col-12 cus-padding"><img src="images/favourite_selected_white.png" id="favimagechange"/><span class="singlepart-text" id="fav">' +
                            localStorage.getItem("added_to_fav") +
                            "</span></div></div>";
                        $("#favimagechange").attr("src", "images/favourite_selected.png");
                    }
                } else {
                }

                //====End Favourite Section==== //
            }

            $("#content_details").html(content_description);

            if (releaseDateHtml == "" && genreHtml == "" && durationHtml == "") {
                $(".text-muted").hide();
            } else if (
                releaseDateHtml != "" &&
                genreHtml == "" &&
                durationHtml == ""
            ) {
                $("#one").hide();
                $("#two").hide();
            } else if (
                releaseDateHtml != "" &&
                genreHtml == "" &&
                durationHtml != ""
            ) {
                $("#one").hide();
            } else if (
                releaseDateHtml != "" &&
                genreHtml != "" &&
                durationHtml == ""
            ) {
                $("#two").hide();
            } else if (
                releaseDateHtml == "" &&
                genreHtml != "" &&
                durationHtml != ""
            ) {
                $("#one").hide();
            } else if (
                releaseDateHtml == "" &&
                genreHtml != "" &&
                durationHtml == ""
            ) {
                $("#one").hide();
                $("#two").hide();
            } else if (
                releaseDateHtml == "" &&
                genreHtml == "" &&
                durationHtml != ""
            ) {
                $("#two").hide();
            }

            $("#buttondiv").html(playerdiv);
            $("#viewmoretext").html(viewmore_text);
            //$('#episode_more').html(episode_more);
            $("#cast_image").html(castimage);
            $("#cast_image img").each(function () {
                $(this).on("error", function () {
                    $(this).attr("src", "https://api.muvi.com/img/no-image.png");
                });
            });
            $("#storydetails").html(setstorytomodal);
            $("#modalimage").html(modalimage);

            // if ((is_episode == "0" || is_episode == "1") && season_info == "1") {
            // 	$("#tarilerdiv").hide();
            // 	seasonPoster();
            // }
            // else {
            // 	$("#tarilerdiv").show();
            // }

            if (release_date != "" && genre != "" && video_duration != "") {
                $("#one").show();
                $("#two").show();
            } else if (release_date == "" && genre != "" && video_duration != "") {
                $("#one").hide();
                $("#two").show();
            } else if (release_date == "" && genre == "" && video_duration != "") {
                $("#one").hide();
                $("#two").hide();
            } else if (release_date == "" && genre == "" && video_duration == "") {
                $("#one").hide();
                $("#two").hide();
            } else if (release_date != "" && genre != "" && video_duration == "") {
                $("#one").show();
                $("#two").hide();
            } else if (release_date != "" && genre == "" && video_duration != "") {
                $("#one").show();
                $("#two").hide();
            }
            if (fullstory.length < 150) {
                $("#fullstory").hide();
            }
            if (loginstr != null) {

            }
        } else {
            $("#nocontent").html(mybanner_img.msg);
            $("#nocontent").show();
        }
    }
    var URL =
        baseurl +
        "getContentDetails?authToken=" +
        authtoken +
        "&permalink=" +
        currentperm +
        "&user_id=" +
        loginstr +
        "&lang_code=" +
        lang_code +
        "&country=" +
        country;
    makeGetAjaxCall(URL, 30000, getContentDetailsResp);

    function callTrailerDetails(muviunique_id, muvi_streamunique_id) {
        $("#spinner").show();
        played_length = 0;
        function getTrailerDetailsResp(data, textStatus, xhr) {
            console.log(data);
            $("#spinner").hide();
            var videodetails_response = data;
            if (videodetails_response.code == 200) {
                //alert("success");
                if (videodetails_response.data.trailer_details[0].hasOwnProperty("license_url") && videodetails_response.data.trailer_details[0]["license_url"] != "") {
                    if (videodetails_response.data.trailer_details[0].subTitle.length > 0) {
                        for (var index = 0; index < videodetails_response.data.trailer_details[0].subTitle.length; index++) {
                            console.log(videodetails_response.data.trailer_details[0].subTitle[index]);
                            if (index == 0) {
                                var subtileData = {
                                    'default': true,
                                    'kind': 'subtitles',
                                    'label': videodetails_response.data.trailer_details[0].subTitle[index].language,
                                    'src': videodetails_response.data.trailer_details[0].subTitle[index].url,
                                    'srclang': videodetails_response.data.trailer_details[0].subTitle[index].code
                                }
                            } else {
                                var subtileData = {
                                    'kind': 'subtitles',
                                    'label': videodetails_response.data.trailer_details[0].subTitle[index].language,
                                    'src': videodetails_response.data.trailer_details[0].subTitle[index].url,
                                    'srclang': videodetails_response.data.trailer_details[0].subTitle[index].code
                                }
                            }

                            subtitleArr.push(subtileData);
                        }
                        localStorage.setItem("subtitleArr", JSON.stringify(subtitleArr));
                    } else {
                        localStorage.removeItem("subtitleArr");
                        // remove subtitle from player
                    }
                } else {
                    if (
                        videodetails_response.data.trailer_details[0].smi_language_list !=
                        null
                    ) {
                        console.log("coming");
                        var smiSubtitle =
                            videodetails_response.data.trailer_details[0].smi_subtitle;
                        localStorage.setItem("smiSubtitle", smiSubtitle);
                        localStorage.setItem(
                            "subtitleLang",
                            JSON.stringify(
                                videodetails_response.data.trailer_details[0].smi_language_list
                            )
                        );
                    } else {
                        console.log("hiiii");
                        localStorage.removeItem("smiSubtitle");
                        localStorage.removeItem("subtitleLang");
                    }
                }
                var video_url =
                    videodetails_response.data.trailer_details[0]["trailer_url"];
                var thirdpartyUrl =
                    videodetails_response.data.trailer_details[0]["third_party_url"];
                console.log(video_url);
                console.log(thirdpartyUrl);
                var child =
                    "license_url" in videodetails_response.data.trailer_details[0] ||
                    "there is no child";
                if (child == "there is no child") {
                    //alert("no key");
                } else {
                    var licenseUrl =
                        videodetails_response.data.trailer_details[0]["license_url"];
                    //alert(licenseUrl);
                }
                if (
                    thirdpartyUrl == "" ||
                    thirdpartyUrl == " " ||
                    thirdpartyUrl == "null" ||
                    thirdpartyUrl == null
                ) {
                    if (
                        video_url == "" ||
                        video_url == " " ||
                        video_url == "null" ||
                        video_url == null
                    ) {
                        $("#nocontent").html("No Trailer available");
                        $("#nocontent").show();
                        var timer = setTimeout(function () {
                            $("#nocontent").hide();
                        }, 1000);
                    } else {
                        localStorage.setItem("url", video_url);
                        localStorage.setItem("thirdpartyUrl", thirdpartyUrl);
                        if (
                            licenseUrl == "" ||
                            licenseUrl == " " ||
                            licenseUrl == "null" ||
                            licenseUrl == null
                        ) {
                            localStorage.setItem("licenseurl", "");
                            localStorage.setItem("DRM", "");
                        } else {
                            localStorage.setItem("licenseurl", licenseUrl);
                            localStorage.setItem("DRM", "PLAYREADY");
                        }
                        localStorage.setItem("customdata", "");
                        localStorage.setItem("page", "moviedetails");
                        localStorage.setItem("trailer", "true");
                        if (videodetails_response.data.trailer_details[0].hasOwnProperty("license_url") && videodetails_response.data.trailer_details[0]["license_url"] != "") {
                            window.location.href = "theoplayer.html?stream_uniq_id=" + muvi_streamunique_id + "&playlength=" + played_length;
                        } else {
                            window.location.href = "playerdrm.html?stream_uniq_id=" + muvi_streamunique_id + "&playlength=" + played_length;
                        }
                    }
                } else {
                    $("#nocontent").html("unable to play the content");
                    $("#nocontent").show();
                    var timer = setTimeout(function () {
                        $("#nocontent").hide();
                    }, 5000);
                }
            } else {
                $("#nocontent").html("No video/Audio available");
                $("#nocontent").show();
                var timer = setTimeout(function () {
                    $("#nocontent").hide();
                }, 5000);
            }
        }

        var URL = baseurl + "getTrailerDetails?authToken=" + authtoken + "&muvi_uniq_id=" + muviunique_id + "&license_type=1" + "&subtitle_type=smi";
        makeGetAjaxCall(URL, 30000, getTrailerDetailsResp);
    }

    //========== For Season Poster API ===========//
    function seasonPoster() {
        function seasonPosterResp(data, textStatus, xhr) {
            console.log(data);
            var seasonList_response = data;
            if (seasonList_response.code == 200) {
                var seasonListData = "";
                var htmResponse = "";
                var tempId = 0;
                var i = 0;
                for (i = 0; i < seasonList_response.data.length; i++) {
                    if (seasonList_response.data[i].poster_for_tv != "") {
                        seasonListData +=
                            '<div class="col-lg-2 cus-langdiv" id="sec_' +
                            i +
                            "_" +
                            tempId +
                            '" data-permalink="' +
                            seasonList_response.data[i].permalink +
                            '" data-sereseno="' +
                            seasonList_response.data[i].season_no +
                            '"><div class="cutom-card "> <div class="cutom-cardbody"> <img src="' +
                            seasonList_response.data[i].poster_for_tv +
                            '" class="img-fluid" alt=""><p class="see-more">' +
                            seasonList_response.data[i].title +
                            "</p></div></div></div>";
                    } else {
                        // seasonListData += '<div class="col-lg-2 cus-langdiv" id="sec_' + i + '_' + tempId + '" data-permalink="' + seasonList_response.data[i].permalink + '" data-sereseno="' + seasonList_response.data[i].season_no + '"><div class="cutom-card "> <div class="aftrebg"> <img src="images/languageimage.jpg" class="img-fluid" alt=""><p class="see-more">' + seasonList_response.data[i].title + '</p></div></div></div>';
                        seasonListData +=
                            '<div class="col-lg-2 cus-langdiv" id="sec_' +
                            i +
                            "_" +
                            tempId +
                            '" data-permalink="' +
                            seasonList_response.data[i].permalink +
                            '" data-sereseno="' +
                            seasonList_response.data[i].season_no +
                            '"><div class="cutom-card "> <div class="aftrebg"> <img src="images/no_image_tv.png" class="img-fluid" alt=""></div></div></div>';
                    }
                }
                if (seasonListData != "") {
                    htmResponse +=
                        '<div class="row mb-4 dataRow' +
                        tempId +
                        '"><div class="col-lg-12"><h3 class="cus-h3-padding">' +
                        localStorage.getItem("season") +
                        '</h3></div><div class="col-lg-12 homepagecontent_div" id="homepagecontent_div">' +
                        seasonListData +
                        "</div></div>";
                    $("#mnsec").removeClass("hide");
                    $("#spinner").hide();
                }
                $("#seasondiv").html(htmResponse);
            } else {
                // $('#nocontent').text("No Response From Server");
                // $('#nocontent').show();
                // var timer = setTimeout(function () {
                // 	$('#nocontent').hide();
                // 		location.reload(true);
                // 	}, 3000);
            }
        }
        var URL =
            baseurl +
            "seasonList?authToken=" +
            authtoken +
            "&permalink=" +
            currentperm +
            "&lang_code=" +
            lang_code +
            "&country=" +
            country;
        makeGetAjaxCall(URL, 30000, seasonPosterResp);
    }
    //========== End For Season Poster API ===========//

    function convertToText(duration) {
        var durationText = "";
        var splitTime = duration.split(":");
        var hour = parseInt(splitTime[0]) >= 9 ? splitTime[0] : splitTime[0][1];
        if (parseInt(hour) > 0) {
            durationText += hour + "h";
        }
        var minute = parseInt(splitTime[1]) >= 9 ? splitTime[1] : splitTime[1][1];
        if (parseInt(minute) > 0) {
            durationText += minute + "m";
        }
        /* var second = parseInt(splitTime[2]) > 9 ? splitTime[2] : splitTime[2][1];
             if(parseInt(second) > 0){
               durationText += second+" Second";
             }*/
        return durationText;
    }

    function addedToFav(muviunique_id, is_episode) {
        $("#spinner").show();
        function addedToFavouriteSec(data, textStatus, xhr) {
            console.log(data);
            $("#spinner").hide();
            var favourite_response = data;
            if (favourite_response.code == 200) {
                $("#favimagechange").attr("src", "images/favourite_selected.png");
                document.getElementById("fav").innerHTML = localStorage.getItem(
                    "added_to_fav"
                );
                $("#nocontent").html(favourite_response.msg);
                $("#nocontent").show();
                var timer = setTimeout(function () {
                    $("#nocontent").hide();
                    $("#favdiv").attr("data-is_fav", "1");
                    localStorage.setItem("isfavourite", "1");
                }, 5000);
            } else {
                $("#nocontent").html(favourite_response.msg);
                $("#nocontent").show();
                var timer = setTimeout(function () {
                    $("#nocontent").hide();
                }, 5000);
            }
        }
        var URL =
            baseurl +
            "AddtoFavlist?authToken=" +
            authtoken +
            "&movie_uniq_id=" +
            muviunique_id +
            "&content_type=" +
            is_episode +
            "&user_id=" +
            loginstr;
        makeGetAjaxCall(URL, 30000, addedToFavouriteSec);
    }

    function deleteToFav(muviunique_id, is_episode) {
        $("#spinner").show();
        function removeFromFavourite(data, textStatus, xhr) {
            console.log(data);
            $("#spinner").hide();
            var favourite_response = data;
            if (favourite_response.code == 200) {
                $("#favimagechange").attr("src", "images/favourite.png");
                document.getElementById("fav").innerHTML = localStorage.getItem(
                    "add_to_fav"
                );
                $("#nocontent").html(favourite_response.msg);
                $("#nocontent").show();
                var timer = setTimeout(function () {
                    $("#nocontent").hide();
                    $("#favdiv").attr("data-is_fav", "0");
                    localStorage.setItem("isfavourite", "0");
                }, 5000);
            } else {
                $("#nocontent").html(favourite_response.msg);
                $("#nocontent").show();
                var timer = setTimeout(function () {
                    $("#nocontent").hide();
                }, 5000);
            }
        }
        var URL =
            baseurl +
            "DeleteFavList?authToken=" +
            authtoken +
            "&movie_uniq_id=" +
            muviunique_id +
            "&content_type=" +
            is_episode +
            "&user_id=" +
            loginstr;
        makeGetAjaxCall(URL, 30000, removeFromFavourite);
    }

    function truncate(string) {
        if (string.length > 150) return string.substring(0, 150) + "...";
        else return string;
    }

    function replacespecialcharcter(string) {
        if (string != null) {
            var string = string.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, " ");
            return string;
        } else {
            return null;
        }
    }

    var index = 102;
    var prev_index = 0;
    var height_div = $("#mbody").height();
    console.log("height_div" + height_div);
    $.fn.scrollView = function () {
        console.log("indexdata" + index);
        return this.each(function () {
            $("#mbody").animate(
                {
                    scrollTop: index,
                },
                10
            );
        });
    };

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
        $(location).attr("href", "" + htmlPage + "");
    }
    var y = 120;
    //Remote Function//
    document.onkeydown = checkKey;

    function checkKey(e) {
        e = e || window.event;
        //For RTl Use ( Don't Modify This Section )
        var remoteBtnCode = "";
        var lang_code = localStorage.getItem("lang_code");
        if (
            lang_code == "ar" ||
            lang_code == "arc" ||
            lang_code == "az" ||
            lang_code == "dv" ||
            lang_code == "iw" ||
            lang_code == "ku" ||
            lang_code == "fa" ||
            lang_code == "ur"
        ) {
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

        if (remoteBtnCode == "38") {
            //for Up Arrow key
            if ($("#spinner").is(":visible") == true) {
                e.preventDefault();
            } else {
                var $current = $(".current");
                var currentId = $current.get()[0].id;
                var currentparentId = $current.parent().get()[0].id;
                var currentparentIddata = $current.parent().parent().get()[0].id;
                if (currentparentId == "viewmorediv") {
                    $current.removeClass("current");
                    $("#mainmenu").children().eq(0).addClass("current");
                } else if (currentparentId == "homepagecontent_div") {
                    $current.removeClass("current");
                    if ($("#favdiv").length) {
                        $("#favdiv").addClass("current");
                        if (localStorage.getItem("isfavourite") == 0) {
                            $("#favimagechange").attr("src", "images/favourite.png");
                        } else {
                            $("#favimagechange").attr("src", "images/favourite_selected.png");
                        }
                    } else if ($("#tarilerdiv").length) {
                        $("#episode_more_details").attr("src", "images/episode_blue.png");
                        $("#tarilerdiv").addClass("current");
                    } else {
                        $("#watchtrailer").attr("src", "images/watch-trailer-blue.png");
                        $("#playdiv").addClass("current");
                    }
                } else if (currentparentIddata == "allbuttondiv") {
                    if ($current.prev().length > 0) {
                        $current.removeClass("current");
                        if (currentId == "favdiv") {
                            if ($("#tarilerdiv").length) {
                                $("#episode_more_details").attr(
                                    "src",
                                    "images/episode_blue.png"
                                );
                            } else {
                                $("#watchtrailer").attr("src", "images/watch-trailer-blue.png");
                            }
                            //$("#watchtrailer").attr('src', 'images/watch_trailer_white.png');
                            //$("#playbutton").attr('src', 'images/play-button_white.png');

                            if (localStorage.getItem("isfavourite") == 0) {
                                $("#favimagechange").attr("src", "images/favourite_white.png");
                            } else {
                                $("#favimagechange").attr(
                                    "src",
                                    "images/favourite_selected_white.png"
                                );
                            }
                            $current.prev().addClass("current");
                        } else if (currentId == "tarilerdiv") {
                            $("#watchtrailer").attr("src", "images/watch-trailer-blue.png");
                            if (localStorage.getItem("isfavourite") == 0) {
                                $("#favimagechange").attr("src", "images/favourite_white.png");
                            } else {
                                $("#favimagechange").attr(
                                    "src",
                                    "images/favourite_selected_white.png"
                                );
                            }
                            $("#playbutton").attr("src", "images/play-button.png");
                            $("#episode_more_details").attr(
                                "src",
                                "images/episode_blue_white.png"
                            );
                            $current.prev().addClass("current");
                        }
                    } else {
                        $current.removeClass("current");
                        if ($("#cast_image").children().length == 0) {
                            if ($("#fullstory").is(":visible")) {
                                $("#viewmoretext").addClass("current");
                            } else {
                                $("#mainmenu").children().eq(0).addClass("current");
                            }
                            if (localStorage.getItem("isfavourite") == 0) {
                                $("#favimagechange").attr("src", "images/favourite_white.png");
                            } else {
                                $("#favimagechange").attr(
                                    "src",
                                    "images/favourite_selected_white.png"
                                );
                            }
                            $("#watchtrailer").attr("src", "images/watch_trailer_white.png");
                            $("#playbutton").attr("src", "images/play-button_white.png");
                        } else {
                            $("#cast_image").children().eq(0).addClass("current");
                            if ($("#tarilerdiv").length) {
                                $("#episode_more_details").attr(
                                    "src",
                                    "images/episode_blue_white.png"
                                );
                            }
                            if ($("#playdiv").length) {
                                $("#watchtrailer").attr(
                                    "src",
                                    "images/watch_trailer_white.png"
                                );
                            }
                            if ($("#favdiv").length) {
                                if (localStorage.getItem("isfavourite") == 0) {
                                    $("#favimagechange").attr(
                                        "src",
                                        "images/favourite_white.png"
                                    );
                                } else {
                                    $("#favimagechange").attr(
                                        "src",
                                        "images/favourite_selected_white.png"
                                    );
                                }
                            }
                        }
                    }
                } else if (currentparentId == "cast_image") {
                    $current.removeClass("current");
                    $("#viewmoretext").addClass("current");
                } else if (currentparentId == "mbody") {
                    if (index > 0) {
                        index = index - 102;
                    }
                    if ($("#exampleModalCenter").is(":visible")) {
                        $("#mbody").scrollView();
                    }
                }
            }
        } else if (remoteBtnCode == "40") {
            // down arrow key
            if ($("#spinner").is(":visible") == true) {
                e.preventDefault();
            } else {
                var $current = $(".current");
                var currentId = $current.get()[0].id;
                var currentparentId = $current.parent().get()[0].id;
                var currentparentIddata = $current.parent().parent().get()[0].id;

                if (currentparentId == "mainmenu") {
                    $current.removeClass("current");
                    if ($("#fullstory").is(":visible")) {
                        $("#viewmoretext").addClass("current");
                    } else {
                        if ($("#cast_image").children().length == 0) {
                            $("#buttondiv").children().eq(0).addClass("current");
                            $("#playbutton").attr("src", "images/play-button.png");
                            $("#watchtrailer").attr("src", "images/watch-trailer-blue.png");
                            if ($("#tarilerdiv").length) {
                                $("#episode_more_details").attr(
                                    "src",
                                    "images/episode_blue.png"
                                );
                                if (localStorage.getItem("isfavourite") == 0) {
                                    $("#favimagechange").attr(
                                        "src",
                                        "images/favourite_white.png"
                                    );
                                } else {
                                    $("#favimagechange").attr(
                                        "src",
                                        "images/favourite_selected_white.png"
                                    );
                                }
                            } else {
                                if (localStorage.getItem("isfavourite") == 0) {
                                    $("#favimagechange").attr("src", "images/favourite.png");
                                } else {
                                    $("#favimagechange").attr(
                                        "src",
                                        "images/favourite_selected.png"
                                    );
                                }
                            }
                        } else {
                            $("#cast_image").children().eq(0).addClass("current");
                            $("#playbutton").attr("src", "images/play-button_white.png");
                            if (localStorage.getItem("isfavourite") == 0) {
                                $("#favimagechange").attr("src", "images/favourite_white.png");
                            } else {
                                $("#favimagechange").attr(
                                    "src",
                                    "images/favourite_selected_white.png"
                                );
                            }
                            $("#watchtrailer").attr("src", "images/watch_trailer_white.png");
                        }
                    }
                } else if (currentparentIddata == "content_details") {
                    $current.removeClass("current");
                    if ($("#cast_image").children().length == 0) {
                        $("#buttondiv").children().eq(0).addClass("current");
                        $("#playbutton").attr("src", "images/play-button.png");
                        if ($("#tarilerdiv").length) {
                            $("#watchtrailer").attr("src", "images/watch_trailer_blue.png");
                        } else if ($("#playdiv").length) {
                            $("#watchtrailer").attr("src", "images/watch-trailer-blue.png");
                        } else {
                            if (localStorage.getItem("isfavourite") == 0) {
                                $("#favimagechange").attr("src", "images/favourite.png");
                            } else {
                                $("#favimagechange").attr(
                                    "src",
                                    "images/favourite_selected.png"
                                );
                            }
                        }
                    } else {
                        $("#cast_image").children().eq(0).addClass("current");
                        $("#playbutton").attr("src", "images/play-button_white.png");
                        if (localStorage.getItem("isfavourite") == 0) {
                            $("#favimagechange").attr("src", "images/favourite_white.png");
                        } else {
                            $("#favimagechange").attr(
                                "src",
                                "images/favourite_selected_white.png"
                            );
                        }
                        $("#watchtrailer").attr("src", "images/watch_trailer_white.png");
                    }
                } else if (currentparentIddata == "allbuttondiv") {
                    if ($current.next().length > 0) {
                        $current.removeClass("current");
                        if (currentId == "playdiv") {
                            $("#watchtrailer").attr("src", "images/watch_trailer_white.png");
                            if ($("#tarilerdiv").length) {
                                $("#episode_more_details").attr(
                                    "src",
                                    "images/episode_blue.png"
                                );
                                if (localStorage.getItem("isfavourite") == 0) {
                                    $("#favimagechange").attr(
                                        "src",
                                        "images/favourite_white.png"
                                    );
                                } else {
                                    $("#favimagechange").attr(
                                        "src",
                                        "images/favourite_selected_white.png"
                                    );
                                }
                            } else {
                                if (localStorage.getItem("isfavourite") == 0) {
                                    $("#favimagechange").attr("src", "images/favourite.png");
                                } else {
                                    $("#favimagechange").attr(
                                        "src",
                                        "images/favourite_selected.png"
                                    );
                                }
                            }
                            $current.next().addClass("current");
                        } else if (currentId == "tarilerdiv") {
                            $("#watchtrailer").attr("src", "images/watch_trailer_white.png");
                            if (localStorage.getItem("isfavourite") == 0) {
                                $("#favimagechange").attr("src", "images/favourite.png");
                            } else {
                                $("#favimagechange").attr(
                                    "src",
                                    "images/favourite_selected.png"
                                );
                            }
                            $("#episode_more_details").attr(
                                "src",
                                "images/episode_blue_white.png"
                            );
                            $current.next().addClass("current");
                        }
                    } else if (currentId == "favdiv") {
                        if ($("#seasondiv").children().length > 0) {
                            $current.removeClass("current");
                            $(".homepagecontent_div").children().removeClass("hide");
                            $(".homepagecontent_div").children().eq(0).addClass("current");

                            if (localStorage.getItem("isfavourite") == 0) {
                                $("#favimagechange").attr("src", "images/favourite_white.png");
                            } else {
                                $("#favimagechange").attr(
                                    "src",
                                    "images/favourite_selected_white.png"
                                );
                            }
                        }
                    } else {
                        if ($("#seasondiv").children().length > 0) {
                            $("#watchtrailer").attr("src", "images/watch_trailer_white.png");
                            $current.removeClass("current");
                            $(".homepagecontent_div").children().removeClass("hide");
                            $(".homepagecontent_div").children().eq(0).addClass("current");
                        }
                    }
                } else if (currentparentId == "cast_image") {
                    $current.removeClass("current");
                    $("#buttondiv").children().eq(0).addClass("current");
                    if ($("#playdiv").length) {
                        $("#watchtrailer").attr("src", "images/watch-trailer-blue.png");
                    } else if ($("#tarilerdiv").length) {
                        $("#episode_more_details").attr("src", "images/episode_blue.png");
                    } else {
                        if (localStorage.getItem("isfavourite") == 0) {
                            $("#favimagechange").attr("src", "images/favourite.png");
                        } else {
                            $("#favimagechange").attr("src", "images/favourite_selected.png");
                        }
                    }
                } else if (currentparentId == "mbody") {
                    if (index <= height_div) {
                        index = index + 102;
                    }
                    if ($("#exampleModalCenter").is(":visible")) {
                        $("#mbody").scrollView();
                    }
                }
            }
        } else if (remoteBtnCode == "37") {
            // left arrow key
            if ($("#spinner").is(":visible") == true) {
                e.preventDefault();
            } else {
                var $current = $(".current");
                var currentparentId = $current.parent().get()[0].id;
                if (currentparentId == "mainmenu") {
                    if ($current.prev().length > 0) {
                        $current.removeClass("current");
                        $current.prev().addClass("current");
                    }
                } else if (currentparentId == "cast_image") {
                    if ($current.prev().length > 0) {
                        $current.removeClass("current");
                        $current.prev().addClass("current");
                    }
                } else if (currentparentId == "homepagecontent_div") {
                    if ($current.prev().length > 0) {
                        $current.prev().removeClass("hide");
                        $current.removeClass("current");
                        $current.prev().addClass("current");
                    }
                }
            }
        } else if (remoteBtnCode == "39") {
            // right arrow key
            if ($("#spinner").is(":visible") == true) {
                e.preventDefault();
            } else {
                var $current = $(".current");
                var currentparentId = $current.parent().get()[0].id;
                var currentId = $current.get()[0].id;
                if (currentparentId == "mainmenu") {
                    if ($current.next().length > 0) {
                        $current.removeClass("current");
                        $current.next().addClass("current");
                    }
                } else if (currentparentId == "cast_image") {
                    if ($current.next().length > 0) {
                        $current.removeClass("current");
                        $current.next().addClass("current");
                    }
                } else if (currentparentId == "homepagecontent_div") {
                    if ($current.next().length > 0) {
                        var _crntPosition = parseInt(currentId.split("_")[1]);
                        var temp = parseInt(currentId.split("_")[2]);
                        $current.removeClass("current");
                        if (_crntPosition >= 4) {
                            var deletedId = _crntPosition - 4;
                            $("#sec_" + deletedId + "_" + temp).addClass("hide");
                            //$current.prev().prev().prev().prev().addClass('hide');
                        }
                        $current.next().addClass("current");
                    }
                }
            }
        } else if (remoteBtnCode == "13") {
            // OK key

            if ($("#spinner").is(":visible") == true) {
                e.preventDefault();
            } else {
                var $current = $(".current");
                var currentId = $current.get()[0].id;
                var currentparentId = $current.parent().get()[0].id;

                //var permalink = $('#'+currentId).attr('data-permalink');
                if (currentparentId == "cast_image") {
                    if (currentId != null) {
                        var permalink = $("#" + currentId).attr("data-perma");
                        var create_href = "staring.html?permalink=" + permalink;
                        $(location).attr("href", create_href);
                    }
                } else if (currentId == "viewmoretext") {
                    $("#exampleModalLongTitle").html(modaltitle);
                    $("#modalsummary").html(fullstory);
                    //$("#modal_cast_imagee").attr('src',modalcastimage);
                    $("#modal_cast_imagee")
                        .on("error", function () {
                            $(this).attr("src", "https://api.muvi.com/img/no-image.png");
                        })
                        .attr("src", modalcastimage);
                    $("#exampleModalCenter").modal("show");
                    $current.removeClass("current");
                    $("#modalsummary").addClass("current");
                } else if (currentparentId == "homepagecontent_div") {
                    var childpermalink = $("#" + currentId).attr("data-permalink");
                    var sereseno = $("#" + currentId).attr("data-sereseno");
                    window.location.href =
                        "seasondetails.html?childpermalink=" +
                        childpermalink +
                        "&permalink=" +
                        currentperm +
                        "&series_number=" +
                        sereseno;
                }
                if (currentparentId == "mainmenu") {
                    var permalink = $("#" + currentId).attr("data-permalink");
                    navBarCall(permalink);
                } else if (currentId == "playdiv") {
                    var trailer_url = $("#" + currentId).attr("data-movieurl");
                    muvi_streamunique_id = $("#" + currentId).attr(
                        "data-muvi_stream-unique_id"
                    );
                    muviunique_id = $("#" + currentId).attr("data-muviunique_id");
                    //alert(muvi_streamunique_id);
                    //alert(muviunique_id);
                    callTrailerDetails(muviunique_id, muvi_streamunique_id);

                    //         if (thirdparty_url=="" || thirdparty_url==" " || thirdparty_url=="null" || thirdparty_url==null) {
                    //         if(trailer_url=="" || trailer_url==" " || trailer_url=="null" || trailer_url==null){
                    // 	    $('#nocontent').html("No trailer available");
                    // 		 $('#nocontent').show();
                    // 		 var timer = setTimeout(function() {
                    // 			$('#nocontent').hide();
                    //           }, 1000);
                    // 	//$('.toast').text("No trailer available").fadeIn(400).delay(3000).fadeOut(400);

                    // }else{
                    // 	localStorage.setItem("url",trailer_url);
                    // 	localStorage.setItem("page","showwithepisode");
                    // 	localStorage.setItem("trailer","true");
                    // 	window.location.href="playerdrm.html?stream_uniq_id="+muvi_streamunique_id;
                    // }
                    // }else{
                    // 	$('#nocontent').html("Unable to play the content");
                    // 		 $('#nocontent').show();
                    // 		 var timer = setTimeout(function() {
                    // 			$('#nocontent').hide();
                    //         }, 1000);
                    // }
                } else if (currentId == "tarilerdiv") {
                    var episode_series_number = $("#" + currentId).attr(
                        "data-totalseries"
                    );
                    var permalink = $("#" + currentId).attr("data-perma");
                    //var episode_series_number= JSON.parse("[" + episode_series_number + "]");
                    //var episode_total_series = $('#'+currentId).attr('data-totalseries');
                    var episodetitle = $("#" + currentId).attr("data-title");
                    var releaseDateHtml = $("#" + currentId).attr("data-releasedate");
                    var muviduration = $("#" + currentId).attr("data-muviduration");

                    if (episode_series_number > 0 || episode_series_number != "") {
                        localStorage.setItem("series_number", series_no);
                        localStorage.setItem("total_series", total_series);
                        localStorage.setItem("permalink", permalink);
                        localStorage.setItem("title", name);
                        localStorage.setItem("video_duration", video_duration);
                        localStorage.setItem("release", releaseDateHtml);
                        var create_href =
                            "episodeandmore.html?series_number=" +
                            series_no +
                            "&total_series=" +
                            total_series +
                            "&permalink=" +
                            permalink +
                            "&title=" +
                            name +
                            "&video_duration=" +
                            video_duration +
                            "&release=" +
                            releaseDateHtml +
                            "";
                        $(location).attr("href", create_href);
                    } else {
                        $("#nocontent").html("No season available");
                        $("#nocontent").show();
                        var timer = setTimeout(function () {
                            $("#nocontent").hide();
                        }, 1000);
                    }
                } else if (currentId == "favdiv") {
                    var is_episode = $("#" + currentId).attr("data-is_episode");
                    is_favourite = $("#" + currentId).attr("data-is_fav");
                    muviunique_id = $("#" + currentId).attr("data-muviunique_id");
                    if (localStorage.getItem("Myfavorite") == "1") {
                        if (is_favourite == 0) {
                            addedToFav(muviunique_id, is_episode);
                        } else {
                            deleteToFav(muviunique_id, is_episode);
                        }
                    } else {
                        $("#nocontent").html("Add to favorite not enable");
                        $("#nocontent").show();
                        var timer = setTimeout(function () {
                            $("#nocontent").hide();
                        }, 1000);

                        //$('.toast').text("Add to favorite not enabled").fadeIn(400).delay(3000).fadeOut(400);
                    }
                }
            }
        } else if (remoteBtnCode == "10009") {
            //RETURN button
            if ($("#exampleModalCenter").is(":visible")) {
                var $current = $(".current");
                $("#exampleModalCenter").hide();
                $("#exampleModalCenter").modal("hide");
                $current.removeClass("current");
                $("#viewmoretext").addClass("current");
            } else {
                //window.history.back();
                localStorage.removeItem("generstringdata");
                localStorage.removeItem("sortbypermalink");
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
    }
};
//window.onload can work without <body onload="">
window.onload = init;
