var checkTime;
var subtitleArr = [];
var init = function () {
    var country = localStorage.getItem("country");
    $('#spinner').show();
    if (localStorage.getItem("authtokenstr") != null) {
        var authtoken = localStorage.getItem("authtokenstr");
        var baseurl = localStorage.getItem("baseurl");
        var lang_code = localStorage.getItem("lang_code");
        var season_info = localStorage.getItem("isRegistrationEnabled");
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
    $('#navhome').addClass('current');
    $("#home").addClass("navActive");

    function getParameterByName(name, href) {
        //name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(href);
        if (results == null)
            return "vikings";
        else
            return decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    var currentperm = getParameterByName("permalink", window.location.href);
    var childpermalink = getParameterByName("childpermalink", window.location.href);
    var series_number = getParameterByName("series_number", window.location.href);
    var moviedata = "";
    var episode_muvi_streamunique_id = '';
    var episode_muvi_unique_id = '';
    var loginstr = localStorage.getItem("loginstr");
    var modaltitle = "";
    var modalstory = "";
    var modalcastimage = "";
    var thirdparty_url = "";
    function getSeasonDetailsResp(data, textStatus, xhr) {
        //$('#spinner').hide();
        var seasonname = '';
        var parentTitle = "";
        var story = "";
        var playerdiv = "";
        var is_favourite = "";
        var muvi_uniq_id = "";
        var is_episode = "";
        var imageUrl = "";
        var viewmore_textdata = "";
        var seasonDetails_response = data;
        if (seasonDetails_response.code == 200) {
            console.log(seasonDetails_response);
            moviedata = seasonDetails_response.movie;
            seasonname = moviedata.name;
            parentTitle = moviedata.parent_title;
            story = moviedata.story;
            imageUrl = moviedata.tv_banner;
            modaltitle = moviedata.name;
            modalstory = moviedata.story;
            modalcastimage = moviedata.poster_for_tv;
            // View trailer //
            if (seasonDetails_response.movie.has_trailer !== 0) {
                playerdiv += '<div class="row mt-8 " id="playdiv" data-muvi_stream-unique_id="' + seasonDetails_response.movie['movie_stream_uniq_id'] + '" data-muviunique_id="' + seasonDetails_response.movie['muvi_uniq_id'] + '" data-is_episode="' + seasonDetails_response.movie['is_episode'] + '"  data-perma="favourite"><div class="cus-padding"><img src="images/watch-trailer-blue.png" id="watchtrailer"/><span class="singlepart-text" id="playtrailervideo">' + localStorage.getItem("view_trailer") + '</span></div></div>';
            }
            // End View trailer //
            $('#seanson_div').html(playerdiv);
            $('#spinner').hide();
            if (parentTitle != '') {
                $('#name').text(parentTitle);
                $('#titlebar').removeClass('hide');
                $("#name").removeClass('hide');
            } else {
                $('#name').text('');
                $('#titlebar').addlass('hide');
                $('#name').addlass('hide');
            }
            if (seasonname != '') {
                $('#seasonname').text(seasonname);
                $("#seasonname").removeClass('hide');
            } else {
                $('#seasonname').text('');
                $('#seasonname').addlass('hide');
            }
            if (story != '' || story != null) {
                $('#description').text(story);
                $("#description").removeClass('hide');
                viewmore_textdata += '<span data-perma="viemorefocus" id="fullstory" style="font-size:20px;font-weight: normal;">' + localStorage.getItem("view_more") + '</span>';
                $("#viewmoretext").removeClass('hide');
                $('#viewmoretext').html(viewmore_textdata);

            } else {
                $('#description').text('');
                $('#description').addlass('hide');
                viewmore_textdata += '<span data-perma="viemorefocus" id="fullstory" style="font-size:20px;font-weight: normal;">' + localStorage.getItem("view_more") + '</span>';
                $("#viewmoretext").removeClass('hide');
                $('#viewmoretext').html(viewmore_textdata);
            }
            if (imageUrl != '') {
                $(".backgroungbg").css('background-image', 'url(' + imageUrl + ')');
            } else {
                imageUrl = 'images/background.png';
                $(".backgroungbg").css('background-image', 'url(' + imageUrl + ')');
            }
        }
    }

    var SEASON_URL = baseurl + "seasonDetails?authToken=" + authtoken + "&permalink=" + childpermalink + "&lang_code=" + lang_code + "&country=" + country;
    makeGetAjaxCall(SEASON_URL, 30000, getSeasonDetailsResp);

    function getEpisodeDetailsResp(data, textStatus, xhr) {
        episode_Details = data;
        if (episode_Details.code == 200) {
            console.log(episode_Details);
            if (episode_Details.episode.length > 0 || episode_Details.episode.length != '') {
                $('#nocontent').hide();
                var seasonData = '';
                for (var i = 0; i < episode_Details.episode.length; i++) {
                    var story = truncate(episode_Details.episode[i]['episode_story']);
                    episode_muvi_streamunique_id = episode_Details.episode[i]['movie_stream_uniq_id'];
                    if (episode_Details.episode[i]['posterForTv'] != "") {
                        seasonData += '<div id="episode_' + i + '" class="list-box-select"  data-perma="episodeimagediv" data-muviunique_id=' + episode_Details.muvi_uniq_id + ' data-isfree="' + episode_Details.episode[i]['is_free'] + '"  data-muvi_stream-unique_id=' + episode_Details.episode[i]['movie_stream_uniq_id'] + ' data-movieutl=' + episode_Details.episode[i]['movieUrlForTv'] + '>' +
                            '<div class="list-img-select episode_img border-inside">' +
                            '<img src="' + episode_Details.episode[i]['posterForTv'] + '" class="img-fluid" />' +
                            '<div class="dtls"><p>S' + episode_Details.episode[i]['series_number'] + ' : E' + episode_Details.episode[i]['episode_number'] + '</p></div>' +
                            '</div>' +
                            '<div class="list-text-select">' +
                            '<h2 class="heading2 mt-3">' + episode_Details.episode[i]['episode_title'] + '</h2>' +
                            '<div class="title-bar3"></div>' +
                            '<p class="text-muted">' + story + '</p>' +
                            '</div>' +
                            '</div>';
                    } else {
                        seasonData += '<div id=' + i + ' class="list-box-select"  data-perma="episodeimagediv" data-muviunique_id=' + episode_Details.muvi_uniq_id + ' data-isfree="' + episode_Details.episode[i]['is_free'] + '"  data-muvi_stream-unique_id=' + episode_Details.episode[i]['movie_stream_uniq_id'] + ' data-movieutl=' + episode_Details.episode[i]['movieUrlForTv'] + '>' +
                            '<div class="list-img-select episode_img border-inside">' +
                            '<img src="images/no_image_tv.png" class="img-fluid" / >' +
                            '<div class="dtls"><p>S' + episode_Details.episode[i]['series_number'] + ' : E' + episode_Details.episode[i]['episode_number'] + '</p></div>' +
                            '</div>' +
                            '<div class="list-text-select">' +
                            '<h2 class="heading2 mt-3">' + episode_Details.episode[i]['episode_title'] + '</h2>' +
                            '<div class="title-bar3"></div>' +
                            '<p class="text-muted">' + story + '</p>' +
                            '</div>' +
                            '</div>';
                    }
                }
            }

            else {
                $('#nocontent').html("No Content to Display");
                $('#nocontent').show();
                var timer = setTimeout(function () {
                    $('#nocontent').hide();
                    //location.reload(true);
                }, 4000);
            }
        }
        else {
            $('#nocontent').html("No Response From Server!!");
            $('#nocontent').show();
            var timer = setTimeout(function () {
                $('#nocontent').hide();
                location.reload(true);
            }, 3000);
        }
        $('#episodelistimageload').html(seasonData);

    }
    var EPISODE_URL = baseurl + "episodeDetails?authToken=" + authtoken + "&permalink=" + currentperm + "&series_number=" + series_number + "&lang_code=" + lang_code + "&country=" + country + "&limit=500";
    makeGetAjaxCall(EPISODE_URL, 30000, getEpisodeDetailsResp);

    function truncate(string) {
        if (string.length > 130)
            return string.substring(0, 130) + '...';
        else
            return string;
    };

    //=============== Calltrailerdetailsdetails API CALL ================//
    function callTrailerDetails(muviunique_id, muvi_streamunique_id) {
        $('#spinner').show();
        played_length = 0;
        function getTrailerDetailsResp(data, textStatus, xhr) {
            $('#spinner').hide();
            var videodetails_response = data;
            if (videodetails_response.code == 200) {
                //alert("success");
                if (videodetails_response.data.trailer_details[0].hasOwnProperty("license_url") && videodetails_response.data.trailer_details[0].license_url != "") {
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
                    if (videodetails_response.data.trailer_details[0].smi_language_list.length > 0) {
                        var smiSubtitle = videodetails_response.data.trailer_details[0].smi_subtitle;
                        localStorage.setItem("smiSubtitle", smiSubtitle);
                        localStorage.setItem("subtitleLang", JSON.stringify(videodetails_response.data.trailer_details[0].smi_language_list));
                    } else {
                        localStorage.removeItem("smiSubtitle");
                        localStorage.removeItem("subtitleLang");
                    }
                }
                var video_url = videodetails_response.data.trailer_details[0]['trailer_url'];
                var thirdpartyUrl = videodetails_response.data.trailer_details[0]['third_party_url'];
                console.log(video_url);
                console.log(thirdpartyUrl);
                var child = 'license_url' in videodetails_response.data.trailer_details[0] || 'there is no child'
                if (child == "there is no child") {
                    //alert("no key");	
                } else {
                    var licenseUrl = videodetails_response.data.trailer_details[0]['license_url'];
                    //alert(licenseUrl);
                }
                if (thirdpartyUrl == "" || thirdpartyUrl == " " || thirdpartyUrl == "null" || thirdpartyUrl == null) {
                    if (video_url == "" || video_url == " " || video_url == "null" || video_url == null) {
                        $('#nocontent').html("No Trailer available");
                        $('#nocontent').show();
                        var timer = setTimeout(function () {
                            $('#nocontent').hide();
                        }, 1000);
                    } else {
                        localStorage.setItem("url", video_url);
                        localStorage.setItem("thirdpartyUrl", thirdpartyUrl);
                        if (licenseUrl == "" || licenseUrl == " " || licenseUrl == "null" || licenseUrl == null) {
                            localStorage.setItem("licenseurl", "");
                            localStorage.setItem("DRM", "");
                        } else {
                            localStorage.setItem("licenseurl", licenseUrl);
                            localStorage.setItem("DRM", "PLAYREADY");
                        }
                        localStorage.setItem("customdata", "");
                        localStorage.setItem("page", "moviedetails");
                        localStorage.setItem("trailer", "true");
                        if (videodetails_response.data.trailer_details[0].hasOwnProperty("license_url") && videodetails_response.data.trailer_details[0].license_url != "") {
                            window.location.href = "theoplayer.html?stream_uniq_id=" + muvi_streamunique_id + "&playlength=" + played_length;
                        } else {
                            window.location.href = "playerdrm.html?stream_uniq_id=" + muvi_streamunique_id + "&playlength=" + played_length;
                        }

                    }
                } else {
                    $('#nocontent').html("unable to play the content");
                    $('#nocontent').show();
                    var timer = setTimeout(function () {
                        $('#nocontent').hide();
                    }, 5000);
                }
            } else {
                $('#nocontent').html("No video/Audio available");
                $('#nocontent').show();
                var timer = setTimeout(function () {
                    $('#nocontent').hide();
                }, 5000);
            }
        }
        var URL = baseurl + "getTrailerDetails?authToken=" + authtoken + "&muvi_uniq_id=" + muviunique_id + "&license_type=1" + "&subtitle_type=smi";
        makeGetAjaxCall(URL, 30000, getTrailerDetailsResp);
    }
    //=============== End Calltrailerdetailsdetails API CALL ================//

    //=============== Callvideodetails API CALL ================//
    function callGetVideoDetails(muvi_streamunique_id, muviunique_id) {
        $('#spinner').show();
        var total_SubtitleObj = [];
        function getVideoDetailsResp(data, textStatus, xhr) {
            $('#spinner').hide();
            var videodetails_response = data;
            if (videodetails_response.code == 200) {
                if (videodetails_response.hasOwnProperty("licenseUrl")) {
                    if (videodetails_response.subTitle.length > 0) {
                        for (var index = 0; index < videodetails_response.subTitle.length; index++) {
                            console.log(videodetails_response.subTitle[index]);
                            if (index == 0) {
                                var subtileData = {
                                    'default': true,
                                    'kind': 'subtitles',
                                    'label': videodetails_response.subTitle[index].language,
                                    'src': videodetails_response.subTitle[index].url,
                                    'srclang': videodetails_response.subTitle[index].code
                                }
                            } else {
                                var subtileData = {
                                    'kind': 'subtitles',
                                    'label': videodetails_response.subTitle[index].language,
                                    'src': videodetails_response.subTitle[index].url,
                                    'srclang': videodetails_response.subTitle[index].code
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
                    if (videodetails_response.smi_language_list.length > 0) {
                        var smiSubtitle = videodetails_response.smi_subtitle;
                        localStorage.setItem("smiSubtitle", smiSubtitle);
                        localStorage.setItem("subtitleLang", JSON.stringify(videodetails_response.smi_language_list));
                    } else {
                        localStorage.removeItem("smiSubtitle");
                        localStorage.removeItem("subtitleLang");
                    }
                }
                var video_url = videodetails_response.videoUrl;
                var thirdpartyUrl = videodetails_response.thirdparty_url;
                var length = 'played_length' in videodetails_response || 'there is no child'
                if (length == "there is no child") {
                    played_length = 0;
                } else {
                    played_length = videodetails_response.played_length;
                    // alert("played_length==========1"+played_length)
                    //played_length = played_length * 1000;
                    if (videodetails_response.hasOwnProperty("licenseUrl")) {
                        played_length = played_length;
                    } else {
                        played_length = played_length * 1000;
                    }
                }
                var child = 'licenseUrl' in videodetails_response || 'there is no child'
                if (child == "there is no child") {
                } else {
                    var licenseUrl = videodetails_response.licenseUrl;
                }
                if (thirdpartyUrl == "" || thirdpartyUrl == " " || thirdpartyUrl == "null" || thirdpartyUrl == null) {
                    if (video_url == "" || video_url == " " || video_url == "null" || video_url == null) {
                        $('#nocontent').html("No video available");
                        $('#nocontent').show();
                        var timer = setTimeout(function () {
                            $('#nocontent').hide();
                        }, 3000);
                    } else {
                        // alert(localStorage.getItem("resume_watching"));
                        if (localStorage.getItem("resume_watching") != null) {
                            var resumeplayingmsg = localStorage.getItem("resume_watching");
                        } else {
                            var resumeplayingmsg = "Continue watching where you left";
                        }
                        if (played_length > 0) {
                            if (confirm(resumeplayingmsg)) {
                                localStorage.setItem("url", video_url);
                                localStorage.setItem("thirdpartyUrl", thirdpartyUrl);
                                if (licenseUrl == "" || licenseUrl == " " || licenseUrl == "null" || licenseUrl == null) {
                                    localStorage.setItem("licenseurl", "");
                                    localStorage.setItem("DRM", "");
                                } else {
                                    localStorage.setItem("licenseurl", licenseUrl);
                                    localStorage.setItem("DRM", "PLAYREADY");
                                }
                                localStorage.setItem("customdata", "");
                                localStorage.setItem("page", "moviedetails");
                                localStorage.setItem("trailer", "false");
                                if (videodetails_response.hasOwnProperty("licenseUrl")) {
                                    window.location.href = "theoplayer.html?stream_uniq_id=" + muvi_streamunique_id + "&muvi_uniq_id=" + muviunique_id + "&playlength=" + played_length + "&multipart=3";
                                } else {
                                    window.location.href = "playerdrm.html?stream_uniq_id=" + muvi_streamunique_id + "&muvi_uniq_id=" + muviunique_id + "&playlength=" + played_length + "&multipart=3";
                                }

                            } else {
                                localStorage.setItem("url", video_url);
                                localStorage.setItem("thirdpartyUrl", thirdpartyUrl);
                                if (licenseUrl == "" || licenseUrl == " " || licenseUrl == "null" || licenseUrl == null) {
                                    localStorage.setItem("licenseurl", "");
                                    localStorage.setItem("DRM", "");
                                } else {
                                    localStorage.setItem("licenseurl", licenseUrl);
                                    localStorage.setItem("DRM", "PLAYREADY");
                                }
                                localStorage.setItem("customdata", "");
                                localStorage.setItem("page", "moviedetails");
                                localStorage.setItem("trailer", "false");
                                played_length = 0;
                                if (videodetails_response.hasOwnProperty("licenseUrl")) {
                                    window.location.href = "theoplayer.html?stream_uniq_id=" + muvi_streamunique_id + "&muvi_uniq_id=" + muviunique_id + "&playlength=" + played_length + "&multipart=3";
                                } else {
                                    window.location.href = "playerdrm.html?stream_uniq_id=" + muvi_streamunique_id + "&muvi_uniq_id=" + muviunique_id + "&playlength=" + played_length + "&multipart=3";
                                }

                            }
                        } else {
                            localStorage.setItem("url", video_url);
                            localStorage.setItem("thirdpartyUrl", thirdpartyUrl);
                            if (licenseUrl == "" || licenseUrl == " " || licenseUrl == "null" || licenseUrl == null) {
                                localStorage.setItem("licenseurl", "");
                                localStorage.setItem("DRM", "");
                            } else {
                                localStorage.setItem("licenseurl", licenseUrl);
                                localStorage.setItem("DRM", "PLAYREADY");
                            }
                            localStorage.setItem("customdata", "");
                            localStorage.setItem("page", "moviedetails");
                            localStorage.setItem("trailer", "false");
                            played_length = 0;
                            if (videodetails_response.hasOwnProperty("licenseUrl")) {
                                window.location.href = "theoplayer.html?stream_uniq_id=" + muvi_streamunique_id + "&muvi_uniq_id=" + muviunique_id + "&playlength=" + played_length + "&multipart=3";
                            } else {
                                window.location.href = "playerdrm.html?stream_uniq_id=" + muvi_streamunique_id + "&muvi_uniq_id=" + muviunique_id + "&playlength=" + played_length + "&multipart=3";
                            }
                        }
                    }
                } else {
                    $('#nocontent').html("Unable to play the content");
                    $('#nocontent').show();
                    var timer = setTimeout(function () {
                        $('#nocontent').hide();
                    }, 3000);
                }
            } else {
                $('#nocontent').html("No video/Audio available");
                $('#nocontent').show();
                var timer = setTimeout(function () {
                    $('#nocontent').hide();
                }, 3000);
            }
        }
        var URL = baseurl + "getVideoDetails?authToken=" + authtoken + "&content_uniq_id=" + muviunique_id + "&license_type=1" + "&stream_uniq_id=" + muvi_streamunique_id + "&user_id=" + loginstr + "&subtitle_type=smi&lang_code=en";
        makeGetAjaxCall(URL, 30000, getVideoDetailsResp);
    }
    //=============== End Callvideodetails API CALL ================//

    //=============== callValidateUser API CALL ================//
    function callValidateUser(muvi_streamunique_id, muviunique_id) {
        $('#spinner').show();
        function getValidateUserResp(data, textStatus, xhr) {
            $('#spinner').hide();
            var validateuser_response = data;
            if (validateuser_response.code == 429) {
                callGetVideoDetails(muvi_streamunique_id, muviunique_id);
            } else {

                $('#nocontent').html("You are not authorised to view this content. Please activate from website");
                $('#nocontent').show();
                var timer = setTimeout(function () {
                    $('#nocontent').hide();
                }, 3000);
            }
        }
        var URL = baseurl + "isContentAuthorized?authToken=" + authtoken + "&movie_id=" + muviunique_id + "&episode_id=" + muvi_streamunique_id + "&season_id=0&purchase_type=episode&user_id=" + loginstr + "&country=" + country;
        makeGetAjaxCall(URL, 30000, getValidateUserResp);
    }
    //=============== End callValidateUser API CALL ================//
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


    var index = 102;
    var prev_index = 0;
    var height_div = $('#mbody').height();
    console.log("height_div" + height_div);
    $.fn.scrollView = function () {
        console.log("indexdata" + index);
        return this.each(function () {
            $('#mbody').animate({
                scrollTop: index
            }, 10);
        });
    }

    //Remote Function//
    document.onkeydown = checkKey;
    function checkKey(e) {
        e = e || window.event;
        //For RTl Use ( Don't Modify This Section )
        var remoteBtnCode = '';
        var lang_code = localStorage.getItem("lang_code");
        if (lang_code == "ar" || lang_code == "arc" || lang_code == "az" || lang_code == "dv" || lang_code == "iw" || lang_code == "ku"
            || lang_code == "fa" || lang_code == "ur") {
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
                var currentparentIddata = $current.parent().parent().get()[0].id;
                if (currentparentId == "seanson_div") {
                    $current.removeClass('current');
                    if ($("#viewmoretext").is(':visible') == true) {
                        $("#viewmoretext").addClass('current');
                        $("#watchtrailer").attr('src', 'images/watch_trailer_white.png');
                    }
                    else {
                        $('#mainmenu').children().eq(0).addClass('current');
                        $("#watchtrailer").attr('src', 'images/watch_trailer_white.png');
                    }
                }
                else if (currentparentId == "contentsec") {
                    $current.removeClass('current');
                    $('#mainmenu').children().eq(0).addClass('current');
                }
                else if (currentparentId == "mbody") {
                    if (index > 0) {
                        index = index - 102;
                    }
                    if ($('#exampleModalCenter').is(':visible')) {
                        $('#mbody').scrollView();
                    }
                }
                else if (currentparentId == "episodelistimageload") {
                    if ($current.prev().length > 0) {
                        $current.removeClass('current');
                        $current.prev().removeClass('d-none');
                        $current.prev().addClass('current');
                    }
                    else {
                        $current.removeClass('current');
                        $('#mainmenu').children().eq(0).addClass('current');
                    }
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
                var currentparentIddata = $current.parent().parent().get()[0].id;
                if (currentparentId == "episodelistimageload") {
                    if ($current.next().length > 0) {
                        $current.removeClass('current');
                        $current.prev().addClass('d-none');
                        $current.next().addClass('current');
                    }
                }
                else if (currentparentId == "mbody") {
                    if (index <= height_div) {
                        index = index + 102;
                    }
                    if ($('#exampleModalCenter').is(':visible')) {
                        $('#mbody').scrollView();
                    }
                }
                else if (currentparentId == "mainmenu") {
                    $current.removeClass('current');
                    if ($("#fullstory").is(":visible")) {
                        $('#viewmoretext').addClass('current');
                    } else if ($("#playdiv").length) {
                        $("#playdiv").addClass('current');
                        $("#watchtrailer").attr('src', 'images/watch-trailer-blue.png');
                    } else if ($("#episodelistimageload").children().length > 0) {
                        $("#episodelistimageload").children('div').removeClass('d-none');
                        $("#episodelistimageload").children('div').eq(0).addClass('current');
                    }
                }
                else if (currentparentId == "contentsec") {
                    if ($("#playdiv").length) {
                        $current.removeClass('current');
                        $("#playdiv").addClass('current');
                        $("#watchtrailer").attr('src', 'images/watch-trailer-blue.png');
                    } else if ($("#episodelistimageload").children().length > 0) {
                        $current.removeClass('current');
                        $("#episodelistimageload").children('div').removeClass('d-none');
                        $("#episodelistimageload").children('div').eq(0).addClass('current');
                    }
                }

            }
        } else if (remoteBtnCode == '37') {
            // left arrow key
            if (($("#spinner").is(":visible") == true)) {
                e.preventDefault();
            } else {
                var $current = $('.current');
                var currentparentId = $current.parent().get()[0].id;
                if (currentparentId == "episodelistimageload") {
                    if ($("#playdiv").length) {
                        $current.removeClass('current');
                        $("#playdiv").addClass('current');
                        $("#watchtrailer").attr('src', 'images/watch-trailer-blue.png');
                    }
                    else if ($("#fullstory").is(":visible")) {
                        $('#viewmoretext').addClass('current');
                    } else {
                        $current.removeClass('current');
                        $('#mainmenu').children().eq(0).addClass('current');
                    }
                }
                else if (currentparentId == "mainmenu") {
                    if ($current.prev().length > 0) {
                        $current.removeClass('current');
                        $current.prev().addClass('current');
                    }
                }

            }
        } else if (remoteBtnCode == '39') {
            // right arrow key
            if (($("#spinner").is(":visible") == true)) {
                e.preventDefault();
            } else {
                var $current = $('.current');
                var currentId = $current.get()[0].id;
                var currentparentId = $current.parent().get()[0].id;
                if (currentparentId == "mainmenu") {
                    if ($current.next().length > 0) {
                        $current.removeClass('current');
                        $current.next().addClass('current');
                    }
                }
                else if (currentparentId == "seanson_div") {
                    $current.removeClass('current');
                    $("#episodelistimageload").children('div').removeClass('d-none');
                    $("#episodelistimageload").children('div').eq(0).addClass('current');
                    $("#watchtrailer").attr('src', 'images/watch_trailer_white.png');
                }
                else if (currentparentId == "contentsec") {
                    $current.removeClass('current');
                    $("#episodelistimageload").children('div').removeClass('d-none');
                    $("#episodelistimageload").children('div').eq(0).addClass('current');
                }
            }
        } else if (remoteBtnCode == '13') {
            // OK key
            if (($("#spinner").is(":visible") == true)) {
                e.preventDefault();
            }
            else {
                $current = $('.current');
                var currentId = $current.get()[0].id;
                currentparentId = $current.parent().get()[0].id;
                if (currentparentId == "mainmenu") {
                    var permalink = $("#" + currentId).attr('data-permalink');
                    navBarCall(permalink);
                }
                else if (currentparentId == "contentsec") {
                    $('#exampleModalLongTitle').html(modaltitle);
                    $('#modalsummary').html(modalstory);
                    $("#modal_cast_imagee")
                        .on("error", function () {
                            $(this).attr("src", "https://api.muvi.com/img/no-image.png");
                        })
                        .attr("src", modalcastimage);
                    $('#exampleModalCenter').modal('show');
                    $current.removeClass('current');
                    $('#modalsummary').addClass('current');

                }
                else if (currentId == "playdiv") {
                    var trailer_url = $('#' + currentId).attr("data-movieurl");
                    var muvi_streamunique_id = $('#' + currentId).attr("data-muvi_stream-unique_id");
                    var muviunique_id = $("#" + currentId).attr("data-muviunique_id");
                    callTrailerDetails(muviunique_id, muvi_streamunique_id);
                }
                if (currentparentId == "episodelistimageload") {
                    if (localStorage.getItem("loginstr") == null) {
                        $(location).attr('href', "login.html");
                    } else {
                        var muvi_streamunique_id = $("#" + currentId).attr("data-muvi_stream-unique_id");
                        var muviunique_id = $("#" + currentId).attr("data-muviunique_id");
                        var isFreeContent = $("#" + currentId).attr("data-isfree");
                        if (isFreeContent == "1") {
                            callGetVideoDetails(muvi_streamunique_id, muviunique_id);
                        } else {
                            callValidateUser(muvi_streamunique_id, muviunique_id);
                        }
                    }
                }
            }

        } else if (remoteBtnCode == '10009') {
            //RETURN button
            if ($('#exampleModalCenter').is(':visible')) {
                var $current = $('.current');
                $('#exampleModalCenter').hide();
                $('#exampleModalCenter').modal('hide');
                $current.removeClass('current');
                $('#viewmoretext').addClass('current');
            } else {
                //window.history.back();
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