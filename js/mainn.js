let internet = false;
let lastPlayerCurrentTime = 0;
(function () {
    'use strict';
    /**
     * Displays logging information on the screen and in the console.
     * @param {string} msg - Message to log.
     */
    var counter = -1;
    if (localStorage.getItem("count") != null) {
        counter = localStorage.getItem("count");
    } else {

        counter = -1;
    }
    var season_info = localStorage.getItem("isRegistrationEnabled");

    var lastSecond = null;
    var secondsToCallFunction = 60;
    var ip_address = localStorage.getItem("ip_address");
    var movie_id = "";
    var episode_id = 0;
    var watch_status = "";
    var device_type = "2";
    var log_id = "0";
    var content_type = "";
    var is_streaming_restriction = "0";
    var restrict_stream_id = "0";
    var is_active_stream_closed = "0";
    var played_length = "";
    var log_temp_id = "0";
    var resume_time = "";
    var testtt = 0;

    var san = "";

    if (localStorage.getItem("loginstr") != null) {
        var user_id = localStorage.getItem("loginstr");
    }

    var player;
    var page;
    var playlength = 0;
    var trailer = "false";
    var multipart = "";
    var curr_permalink;
    var authtoken = localStorage.getItem("authtokenstr");
    var baseurl = localStorage.getItem("baseurl");
    var mediaqueueresponse;
    var content_uniq_id;
    var muvi_uniq_id;
    var stream_uniq_id;
    var content_types_id;
    var previous = false;
    var next = false;
    function getParameterByName(name, href) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(href);
        if (results == null)
            return "vikings";
        else
            return decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    stream_uniq_id = getParameterByName("stream_uniq_id", window.location.href);
    muvi_uniq_id = getParameterByName("muvi_uniq_id", window.location.href);
    console.log("s" + stream_uniq_id)
    console.log("m" + muvi_uniq_id)
    playlength = getParameterByName("playlength", window.location.href);
    multipart = getParameterByName("multipart", window.location.href);
    page = localStorage.getItem("page");
    trailer = localStorage.getItem("trailer");
    curr_permalink = localStorage.getItem("curr_permalink");

    //console.log("stream unique id==" + stream_uniq_id);
    var focuscolor = '#0cb9f2';
    //var name="PLAYREADY";
    var name = 'No DRM'
    var url = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4';
    //var url="https://muvi-dev.s3.amazonaws.com/8916/EncodedVideo/uploads/movie_stream/full_movie/69149/stream.mpd";
    var licenseServer = "http://pr.test.expressplay.com/playready/RightsManager.asmx?ExpressPlayToken=AgAAAxEcWuYAAABwkE-A-I-KkrozvqW2lG9aMmw09ghBr6BQU-tYV6JyHR3HXMfmEiFxQkX4BdY3naqTZOAwMt8GGCZI3QN3NOFa3JUcPwScRK7jXOydc5jt1zHiLssASou6pI1sRqtiKgC0NvXizF-Q6gLLu6FsssEilrJeQ8tBxUAtZ9-PBz_-lkOiweEP";
    var customData = "";
    // flag to monitor UHD toggling
    var uhdStatus = false;
    /**
     * Register keys used in this application
     */
    //var isSubtitleHide = false;
    let prevIndex = '';
    let prevAudioTrack = '';
    var subtitleURL = localStorage.getItem("smiSubtitle");
    var country = localStorage.getItem("country");
    //console.log("============================" + subtitleURL);
    if (trailer == "false") {
        mediaqueueApi()
    }
    let prevSpeedIndex = "speed3";
    registerKeys();
    registerKeyHandler();
    function mediaqueueApi() {
        var mediaqueuexhr = new XMLHttpRequest();
        mediaqueuexhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                mediaqueueresponse = JSON.parse(this.responseText);
                var mediaqueue = this.responseText;
                localStorage.setItem("mediaqueueresponse", mediaqueue);
                //console.log(mediaqueueresponse);
                if (mediaqueueresponse.code == 200) {

                    if (Object.getOwnPropertyNames(mediaqueueresponse.next_media_info).length > 0) {
                        $("#title").text(mediaqueueresponse.next_media_info.content_title);
                        $("#autoplay_image").attr("src", mediaqueueresponse.next_media_info.poster_for_tv);
                        content_uniq_id = mediaqueueresponse.next_media_info.content_uniq_id;
                        localStorage.setItem("content_uniq_id_video", content_uniq_id);
                        stream_uniq_id = mediaqueueresponse.next_media_info.stream_uniq_id;
                        localStorage.setItem("stream_in_video", stream_uniq_id);
                        content_types_id = mediaqueueresponse.next_media_info.content_types_id;
                        localStorage.setItem("content_types_id", content_types_id);
                        localStorage.setItem("autoplayavialble", "1");
                    }
                    else {
                        localStorage.setItem("autoplayavialble", "0");
                    }
                    if (Object.getOwnPropertyNames(mediaqueueresponse.previous_media_info).length == 0) {
                        $("#previous").hide();
                    }
                }

            }
        }
        mediaqueuexhr.open("GET", "" + baseurl + "getmediaqueue?authToken=" + authtoken + "&stream_uniq_id=" + stream_uniq_id + "&country=" + country + "&content_info=1", true);
        mediaqueuexhr.send();
    }
    function registerKeys() {
        var usedKeys = [
            'MediaPause',
            'MediaPlay',
            'MediaPlayPause',
            'MediaFastForward',
            'MediaRewind',
            'MediaStop',
            '0',
            '1',
            '2',
            '3',
            'Exit'
        ];

        usedKeys.forEach(
            function (keyName) {
                tizen.tvinputdevice.registerKey(keyName);
            }
        );
    }



    function videolognew(authtoken, baseurl, ip_address, movie_id, episode_id, watch_status, device_type, log_id, content_type, is_streaming_restriction, restrict_stream_id, is_active_stream_closed, played_length, log_temp_id, resume_time, user_id) {
        // var videodetailsxhttp = new XMLHttpRequest();
        // videodetailsxhttp.onreadystatechange = function () {
        //     //$('#spinner').show();
        //     if (this.readyState == 4 && this.status == 200) {
        //         //$('#spinner').hide();
        //         var videodetails_response = JSON.parse(this.responseText);
        //         //console.log(videodetails_response);
        //         if (videodetails_response.code == 200) {
        //             log_id = videodetails_response.log_id;
        //             log_temp_id = videodetails_response.log_temp_id;
        //             watch_status = "halfplay";
        //             //console.log("success");
        //             videolognew(authtoken, baseurl, ip_address, movie_id, episode_id, watch_status, device_type, log_id, content_type, is_streaming_restriction, restrict_stream_id, is_active_stream_closed, played_length, log_temp_id, resume_time, user_id);
        //         } else {
        //             //console.log("fails");
        //         }
        //     }
        // };
        // videodetailsxhttp.open("GET", "" + baseurl + "VideoLogNew?authToken=" + authtoken + "&ip_address=" + ip_address + "&movie_id=" + movie_id + "&episode_id=" + episode_id + "&watch_status=" + watch_status + "&device_type=" + device_type + "&log_id=" + log_id + "&content_type=" + content_type + "&is_streaming_restriction=" + is_streaming_restriction + "&restrict_stream_id=" + restrict_stream_id + "&is_active_stream_closed=" + is_active_stream_closed + "&played_length=" + played_length + "&log_temp_id=" + log_temp_id + "&resume_time=" + resume_time + "&user_id=" + user_id + "", true);
        // videodetailsxhttp.send();

        $.ajax({
            url: baseurl + "VideoLogNew?authToken=" + authtoken + "&ip_address=" + ip_address + "&movie_id=" + movie_id + "&episode_id=" + episode_id + "&watch_status=" + watch_status + "&device_type=" + device_type + "&log_id=" + log_id + "&content_type=" + content_type + "&is_streaming_restriction=" + is_streaming_restriction + "&restrict_stream_id=" + restrict_stream_id + "&is_active_stream_closed=" + is_active_stream_closed + "&played_length=" + played_length + "&log_temp_id=" + log_temp_id + "&resume_time=" + resume_time + "&user_id=" + user_id,
            type: 'GET',
            datatype: 'json',
            contentType: 'application/x-www-form-urlencoded',
        })
            .done(function (data) {
                //console.log(data);
                if (data.code == 200) {
                    log_id = data.log_id;
                    log_temp_id = data.log_temp_id;
                    watch_status = "halfplay";
                    //console.log("success");
                    videolognew(authtoken, baseurl, ip_address, movie_id, episode_id, watch_status, device_type, log_id, content_type, is_streaming_restriction, restrict_stream_id, is_active_stream_closed, played_length, log_temp_id, resume_time, user_id);
                }
            })
            .fail(function (jqXHR, textStatus, errorThrown) { console.log(textStatus) });
    }



    function VideoPlayer(config) {
        //var log = config.logger;
        //console.log(config);
        var autoplay = "";
        var stream_uniq_id = localStorage.getItem("stream_in_video");
        var content_uniq_id = localStorage.getItem("content_uniq_id_video");
        var content_types_id = localStorage.getItem("content_types_id");
        if (localStorage.getItem("authtokenstr") != null) {
            var authtoken = localStorage.getItem("authtokenstr");
            var baseurl = localStorage.getItem("baseurl");
            var lang_code = localStorage.getItem("lang_code");
        }
        var player = config.player;
        var playerlength = config.playlength;
        var trailer = config.trailer;
        var multipart = config.multipart;
        ip_address = localStorage.getItem("ip_address");
        movie_id = config.muvi_uniq_id;
        if (multipart == "3") {
            episode_id = config.stream_uniq_id;
        } else {
            episode_id = 0;
        }
        watch_status = "start";
        if (config.trailer == "true") {
            content_type = "2";
        } else {

            content_type = "";
        }

        device_type = "2";
        log_id = "0";

        is_streaming_restriction = "0";
        restrict_stream_id = "0";
        is_active_stream_closed = "0";
        played_length = config.playlength;
        log_temp_id = "0";
        resume_time = config.playlength;
        /**
         * HTML controls div
         */
        var controls = config.controls;

        //videolognew(authtoken,baseurl,ip_address,movie_id,episode_id,watch_status,device_type,log_id,content_type,is_streaming_restriction,restrict_stream_id,is_active_stream_closed,played_length,log_temp_id,resume_time,user_id);


        var isFullscreen = false;

        //this.videolognew();

        /**
         * DRM type to handle
         * @type {String}
         */
        //var chosenDrm = config.drms.NO_DRM;
        //var chosenDrm = config.drms.PLAYREADY;
        /**
         * HTML element to display stream properties.
         */
        var info = config.info;

        var defaultResolutionWidth = 1920;
        var resolutionWidth = config.resolutionWidth;

        var playerCoords = {
            x: Math.floor(10 * resolutionWidth / defaultResolutionWidth),
            y: Math.floor(300 * resolutionWidth / defaultResolutionWidth),
            width: Math.floor(854 * resolutionWidth / defaultResolutionWidth),
            height: Math.floor(480 * resolutionWidth / defaultResolutionWidth)
        };


        var counter = -1;
        if (localStorage.getItem("count") != null) {
            counter = localStorage.getItem("count");
        } else {

            counter = -1;
        }
        /**
         * 4k flag
         * @type {Boolean}
         */
        var isUhd = false;

        return {
            /**
             * Function to initialize the playback.
             * @param {String} url - content url, if there is no value then take url from config
             */
            play: function (url) {
                //log('Starting playback');
                /* Create listener object. */
                var listener = {
                    onsubtitlechange: function (duration, text, type, attriCount, attributes) {
                        //console.log(text)
                        // document.getElementById('subtitle').innerHTML = text;
                        if (text !== " ") {
                            $(".subtitleDiv").empty().append('<h2 id="subtitle">' + text + '</h2>');
                        } else {
                            $(".subtitleDiv").empty();
                        }
                    },
                    onbufferingstart: function () {
                        //log("Buffering start.");
                        $('#spinner').show();
                    },
                    onbufferingprogress: function (percent) {
                        //console.log("Buffering progress data========= : " + percent);
                        $('#spinner').show();
                    },
                    onbufferingcomplete: function () {
                        $('#spinner').hide();
                        // multi audio present
                        let audioCount = 0;
                        var totalTrackInfo = webapis.avplay.getTotalTrackInfo();
                        for (var i = 0; i < totalTrackInfo.length; i++) {
                            if (totalTrackInfo[i].type == 'AUDIO') {
                                audioCount++;
                            }
                        }
                        if (audioCount > 1) {
                            $(".audioBtn").show();
                            // if ($('.audioBtn').is(':visible') == false) {
                            //     $('<div focusable id="audioBtn" class="audioBtn"><i class="fa fa-headphones"></i></div>').insertAfter(".ff");
                            // }
                        }
                        /* var timer = setTimeout(function() {
                             $('#test').hide();
                             $("#custom-seekbar").css("display", "none");
                           }, 20000);*/
                    },
                    oncurrentplaytime: function (currentTime) {
                        //console.log("Current playtime: " + currentTime);
                        //$('#spinner').hide();
                        if (currentTime == 0) {
                            prevSpeedIndex = "speed3";
                        }
                        document.getElementById("currentTime").innerHTML = Math.floor(currentTime / 3600000) + ":" + Math.floor((currentTime / 60000) % 60) + ":" + Math.floor((currentTime / 1000) % 60);
                        var test = Math.floor((currentTime / 1000));
                        var duration = webapis.avplay.getDuration();
                        var current_time = webapis.avplay.getCurrentTime();
                        lastPlayerCurrentTime = webapis.avplay.getCurrentTime();
                        document.getElementById("totalTime").innerHTML = Math.floor(duration / 3600000) + ":" + Math.floor((duration / 60000) % 60) + ":" + Math.floor((duration / 1000) % 60);
                        var percentage = (currentTime / duration) * 100;
                        $('.widthspan').css('width', percentage + "%");
                        var actual_duration = Math.floor((duration / 1000));
                        var show_alert_duration = actual_duration - 10;
                        if (test == show_alert_duration) {
                            if (localStorage.getItem("autoplayavialble") == "1") {
                                $("#auto_play_div").show();
                            }
                        }
                        testtt = Math.floor((currentTime / 1000));
                        console.log(testtt);
                        console.log(currentTime);
                        if (testtt % secondsToCallFunction == 0 && lastSecond !== testtt) {
                            lastSecond = testtt
                            resume_time = testtt;
                            var ip_address = localStorage.getItem("ip_address");
                            videolognew(authtoken, baseurl, ip_address, movie_id, episode_id, watch_status, device_type, log_id, content_type, is_streaming_restriction, restrict_stream_id, is_active_stream_closed, played_length, log_temp_id, resume_time, user_id);
                        }
                    },
                    onevent: function (eventType, eventData) {
                        console.log("event type: " + eventType + ", data: " + eventData);
                    },
                    ondrmevent: function (drmEvent, drmData) {
                        // log("DRM callback: " + drmEvent + ", data: " + drmData);
                        /* Playready Challenge alternative scenario start */
                        if (drmData.name === "Challenge") {
                            var drmParam = {
                                ResponseMessage: drmData.message
                            };
                            // log('setDrm InstallLicense: ' + JSON.stringify(drmParam));
                            webapis.avplay.setDrm("PLAYREADY", "InstallLicense", JSON.stringify(drmParam));
                        }
                        /* Playready Challenge alternative scenario end */
                    },
                    onstreamcompleted: function () {
                        // if (internet) {
                        //     alert('No internet connection!');
                        //     webapis.avplay.pause();
                        //     $('#play').hide();
                        //     $('#pause').show();
                        //     $('#spinner').show();
                        //     setTimeout(() => {
                        //         window.history.go(counter);
                        //         localStorage.removeItem("count");
                        //         localStorage.removeItem("autoplayavialble");
                        //     }, 5000);
                        // } else {
                        //     watch_status = "completed";
                        //     var ip_address = localStorage.getItem("ip_address");
                        //     videolognew(authtoken, baseurl, ip_address, movie_id, episode_id, watch_status, device_type, log_id, content_type, is_streaming_restriction, restrict_stream_id, is_active_stream_closed, played_length, log_temp_id, resume_time, user_id);
                        //     if (localStorage.getItem("autoplayavialble") != null) {
                        //         autoplay = localStorage.getItem("autoplayavialble");
                        //     } else {
                        //         autoplay = 0;
                        //     }
                        //     if (autoplay == 1) {
                        //         counter = counter - 1;
                        //         localStorage.setItem("count", counter);
                        //         $(location).attr('href', "autoplaydesc.html?content_uniq_id=" + content_uniq_id + "&stream_uniq_id=" + stream_uniq_id + "&click_key=next" + "&content_types_id=" + content_types_id);
                        //     } else {
                        //         this.stop();
                        //     }
                        // }
                        //internet = false;
                        //this.stop();     
                        watch_status = "completed";
                        var ip_address = localStorage.getItem("ip_address");
                        videolognew(authtoken, baseurl, ip_address, movie_id, episode_id, watch_status, device_type, log_id, content_type, is_streaming_restriction, restrict_stream_id, is_active_stream_closed, played_length, log_temp_id, resume_time, user_id);
                        if (localStorage.getItem("autoplayavialble") != null) {
                            autoplay = localStorage.getItem("autoplayavialble");
                        } else {
                            autoplay = 0;
                        }
                        if (autoplay == 1) {
                            counter = counter - 1;
                            localStorage.setItem("count", counter);
                            $(location).attr('href', "autoplaydesc.html?content_uniq_id=" + content_uniq_id + "&stream_uniq_id=" + stream_uniq_id + "&click_key=next" + "&content_types_id=" + content_types_id);
                        } else {
                            this.stop();
                        }
                    }.bind(this),
                    onerror: function (eventType) {
                        if (eventType === "PLAYER_ERROR_CONNECTION_FAILED") {
                            //internet = true;
                            location.reload();
                        } else {
                            //alert("Player Error !");
                            location.reload();
                        }
                    }
                };
                if (!url) {
                    url = config.url;
                }
                // log('videoPlayer open: ' + url);
                try {
                    webapis.avplay.open(url);
                    if (isFullscreen === false) {
                        webapis.avplay.setDisplayRect(0, 0, 1920, 1080);
                        player.classList.add('fullscreenMode');
                        controls.classList.add('fullscreenMode');
                        //$('#test').show();
                        //$("#custom-seekbar").css("display", "block");
                        hideSeekBar();
                        //isFullscreen = true;
                    }
                    webapis.avplay.setListener(listener);
                    if (subtitleURL == '') {
                        webapis.avplay.setSilentSubtitle(true);
                    } else {
                        if ("subtitleLang" in localStorage) {
                            let chkSubtitleLang = JSON.parse(localStorage.getItem("subtitleLang"));
                            if (chkSubtitleLang !== "") {
                                var subtitleFileName = 'subtitle' + new Date().getTime();
                                var download = new tizen.DownloadRequest(subtitleURL, 'wgt-private-tmp', subtitleFileName);
                                tizen.download.start(download, {
                                    oncompleted: function (downloadId, fullPath) {
                                        tizen.filesystem.resolve('wgt-private-tmp',
                                            function (e) {
                                                var packageURI = e.toURI().substring(7);
                                                webapis.avplay.setExternalSubtitlePath(packageURI + '/' + subtitleFileName + '.smi');
                                                $('<div focusable id="subTitlebtn" class="subTitlebtn"><i class="fa fa-cc"></i></div>').insertAfter(".speed");
                                            },
                                            function (e) {
                                                console.log(e);
                                            }, 'r');
                                    },
                                    onfailed: function (error) {
                                        console.log('Failed to download Subtitle');
                                    }
                                });
                            }
                        }
                    }
                } catch (e) {
                    // log(e);
                }
                //set bitrates according to the values in your stream manifest
                //			this.setBitrate(477000, 2056000, 2056000, 688000);

                //set 4k
                if (isUhd) {
                    this.set4K();
                }

                /* Setting DRMs */
                switch (config.name) {
                    case "PLAYREADY":
                        this.setPlayready();
                        break;
                    case "PLAYREADY_GET_CHALLENGE":
                        this.setPlayreadyChallenge();
                        break;
                    case "WIDEVINE":
                        this.setWidevine();
                        break;
                    default:
                    // log('no DRM');
                }
                if (config.name !== "PLAYREADY_GET_CHALLENGE") {
                    webapis.avplay.prepare();
                    webapis.avplay.play();
                    webapis.avplay.jumpForward(parseFloat(playerlength));
                    //videolognew(authtoken, baseurl, ip_address, movie_id, episode_id, watch_status, device_type, log_id, content_type, is_streaming_restriction, restrict_stream_id, is_active_stream_closed, played_length, log_temp_id, resume_time, user_id);
                }
            },
            /**
             * Function to start/pause playback.
             * @param {String} url - content url, if there is no value then take url from config
             */
            playPause: function (url) {
                if (!url) {
                    url = config.url;
                }
                if (webapis.avplay.getState() === 'PAUSED') {
                    this.pause();
                    $('#play').hide();
                    $('#pause').show();
                } else if (webapis.avplay.getState() === 'PLAYING') {
                    this.pause();
                    $('#play').show();
                    $('#pause').hide();
                }
                else {
                    this.play(url);
                }
            },
            /**
             * Function to stop current playback.
             */
            stop: function () {
                $(".subtitle1").text("stop");
                webapis.avplay.stop();
                if ("customCounter" in localStorage) {
                    customBack(localStorage.getItem("customCounter"));
                } else {
                    customBack(1);
                }
                //window.history.go(counter);
                localStorage.removeItem("count");
                localStorage.removeItem("autoplayavialble");
                //switch back from fullscreen to window if stream finished playing
                if (isFullscreen === true) {
                    this.toggleFullscreen();
                }
                info.innerHTML = '';
            },
            /**
             * Function to pause/resume playback.
             * @param {String} url - content url, if there is no value then take url from config
             */
            pause: function (url) {
                if (!url) {
                    url = config.url;
                }
                if (webapis.avplay.getState() === 'PLAYING') {
                    webapis.avplay.pause();

                } else if (webapis.avplay.getState() === 'NONE' || webapis.avplay.getState() === 'IDLE') {
                    this.play(url);
                } else {
                    webapis.avplay.play();

                }
            },
            mediaPlay: function () {
                if (webapis.avplay.getState() === 'PAUSED') {
                    webapis.avplay.play();
                }
            },
            mediaPaused: function () {
                if (webapis.avplay.getState() === 'PLAYING') {
                    webapis.avplay.pause();
                }
            },
            /**
             * Jump forward 3 seconds (3000 ms).
             */
            ff: function (currentTime) {
                webapis.avplay.jumpForward(30000);
                var currentPlayTime = webapis.avplay.getCurrentTime();
                var duration = webapis.avplay.getDuration();
                var percentage = (currentPlayTime / duration) * 100;
                $('.widthspan').css('width', percentage + "%");
                document.getElementById("currentTime").innerHTML = Math.floor(currentPlayTime / 3600000) + ":" + Math.floor((currentPlayTime / 60000) % 60) + ":" + Math.floor((currentPlayTime / 1000) % 60);
                webapis.avplay.setSubtitlePosition(3000);
            },
            /**
             * Rewind 3 seconds (3000 ms).
             */
            rew: function () {
                webapis.avplay.jumpBackward(30000);
                var currentPlayTime = webapis.avplay.getCurrentTime();
                var duration = webapis.avplay.getDuration();
                var percentage = (currentPlayTime / duration) * 100;
                $('.widthspan').css('width', percentage + "%");
                document.getElementById("currentTime").innerHTML = Math.floor(currentPlayTime / 3600000) + ":" + Math.floor((currentPlayTime / 60000) % 60) + ":" + Math.floor((currentPlayTime / 1000) % 60);
                webapis.avplay.setSubtitlePosition(-3000);
            },
            suspend: function () {
                //webapis.avplay.pause();
                webapis.avplay.suspend();
            },

            resume: function () {
                webapis.avplay.restore();
                webapis.avplay.play();
                $('#play').show();
                $('#pause').hide();
            },

            /**
             * Set information about chosen DRM type.
             * @param {String} drm - String name of the DRM option to call correct option in play() function.
             */
            setChosenDrm: function (drm) {
                chosenDrm = drm;
            },
            /**
             * Set flag to play UHD content.
             * @param {Boolean} isEnabled - Flag to set UHD.
             */
            setUhd: function (isEnabled) {
                isUhd = isEnabled;
            },
            /**
             * Set to TV to play UHD content.
             */
            set4K: function () {
                webapis.avplay.setStreamingProperty("SET_MODE_4K", "true");
            },
            /**
             * Function to set specific bitrates used to play the stream.
             * In case of Smooth Streaming STARTBITRATE and SKIPBITRATE values 'LOWEST', 'HIGHEST', 'AVERAGE' can be set.
             * For other streaming engines there must be numeric values.
             *
             * @param {Number} from  - Lower value of bitrates range.
             * @param {Number} to    - Hieher value of the birrates range.
             * @param {Number} start - Bitrate which should be used for initial chunks.
             * @param {Number} skip  - Bitrate that will not be used.
             */
            setBitrate: function (from, to, start, skip) {
                var bitrates = '|BITRATES=' + from + '~' + to;

                if (start !== '' && start !== undefined) {
                    bitrates += '|STARTBITRATE=' + start;
                }
                if (to !== '' && to !== undefined) {
                    bitrates += '|SKIPBITRATE=' + skip;
                }

                webapis.avplay.setStreamingProperty("ADAPTIVE_INFO", bitrates);
            },
            /**
             * Function to change current VIDEO/AUDIO/TEXT track
             * @param {String} type  - Streaming type received with webapis.avplay.getTotalTrackInfo(), possible values
             *     are: VIDEO, AUDIO, TEXT.
             * @param {Number} index - Track id received with webapis.avplay.getTotalTrackInfo().
             */
            setTrack: function (type, index) {
                webapis.avplay.setSelectTrack(type, index);
            },
            /**
             * Function to set Playready license server and (optionally) custom data.
             * It needs special privilege in config.xml:
             * <tizen:privilege name="http://developer.samsung.com/privilege/drmplay"/>
             */
            setPlayready: function () {


                var drmParam = {
                    DeleteLicenseAfterUse: true
                };
                if (config.licenseServer !== '' && config.licenseServer !== undefined) {
                    drmParam.LicenseServer = config.licenseServer;
                }
                if (config.customData !== '' && config.customData !== undefined) {
                    drmParam.CustomData = config.customData;
                }

                //log('setDrm Playready param: ' + JSON.stringify(drmParam));
                try {
                    webapis.avplay.setDrm("PLAYREADY", "SetProperties", JSON.stringify(drmParam));
                } catch (e) {
                    //log(e.name);
                }
            },
            /**
             * Function send challenge request to playready license server.
             * It needs special privilege in config.xml:
             * <tizen:privilege name="http://developer.samsung.com/privilege/drmplay"/>
             */
            setPlayreadyChallenge: function () {
                var drmParam = {
                    DeleteLicenseAfterUse: true,
                    GetChallenge: true
                };

                var PrepareSuccessCallback = function () {
                    //log('PrepareSuccessCallback');
                    webapis.avplay.play();
                };

                // log('setDrm Playready GetChallenge param: ' + JSON.stringify(drmParam));
                webapis.avplay.setDrm("PLAYREADY", "SetProperties", JSON.stringify(drmParam));
                webapis.avplay.prepareAsync(PrepareSuccessCallback);
            },
            /**
             * Function to set Widevine license server and (optionally) custom data.
             * It needs special privilege in config.xml:
             * <tizen:privilege name="http://developer.samsung.com/privilege/drminfo"/>
             */
            setWidevine: function () {
                //var deviceId = webapis.drminfo.getEsn('WIDEVINE');
                var drmParam = "DEVICE_ID=" + deviceId + "|DEVICE_TYPE_ID=60|STREAM_ID=|IP_ADDR=|DRM_URL=" +
                    chosenDrm.licenseServer + "|PORTAL=OEM|I_SEEK=|CUR_TIME=|USER_DATA=";
                if (chosenDrm.customData !== '' && chosenDrm.customData !== undefined) {
                    drmParam += chosenDrm.customData;
                }
                //  log('setStreamingProperty Widevine param: ' + drmParam);
                try {
                    webapis.avplay.setStreamingProperty("WIDEVINE", drmParam);
                } catch (e) {
                    // log(e.name);
                }
            },
            /**
             * Show streaming properties on the screen.
             */
            getProperties: function () {
                var text = 'AVAILABLE_BITRATE: ' + webapis.avplay.getStreamingProperty("AVAILABLE_BITRATE") + '<br />';
                text += 'CURRENT_BANDWIDTH: ' + webapis.avplay.getStreamingProperty("CURRENT_BANDWITH") + '<br />';
                text += 'DURATION: ' + webapis.avplay.getStreamingProperty("DURATION") + '<br />';
                text += 'BUFFER_SIZE: ' + webapis.avplay.getStreamingProperty("BUFFER_SIZE") + '<br />';
                text += 'START_FRAGMENT: ' + webapis.avplay.getStreamingProperty("START_FRAGMENT") + '<br />';
                text += 'COOKIE: ' + webapis.avplay.getStreamingProperty("COOKIE") + '<br />';
                text += 'CUSTOM_MESSAGE: ' + webapis.avplay.getStreamingProperty("CUSTOM_MESSAGE");
                info.innerHTML = text;
                console.log(text);
            },

            /**
             * Switch between full screen mode and normal windowed mode.
             */
            toggleFullscreen: function () {
                if (isFullscreen === false) {
                    webapis.avplay.setDisplayRect(0, 0, 1920, 1080);
                    player.classList.add('fullscreenMode');
                    controls.classList.add('fullscreenMode');
                    isFullscreen = true;
                } else {
                    try {
                        webapis.avplay.setDisplayRect(
                            playerCoords.x,
                            playerCoords.y,
                            playerCoords.width,
                            playerCoords.height
                        );
                    } catch (e) {
                        // log(e);
                    }
                    player.classList.remove('fullscreenMode');
                    controls.classList.remove('fullscreenMode');
                    isFullscreen = false;
                }
            }
        };
    }

    function changeSubtileTrack() {
        try {
            var totalTracks = webapis.avplay.getTotalTrackInfo();
            var currentTracks = webapis.avplay.getCurrentStreamInfo();
            var currentIndex;
            for (var i = 0; i < currentTracks.length; i++) {
                if (currentTracks[i].type == 'TEXT') {
                    currentIndex = currentTracks[i].index;
                    break;
                }
            }
            for (var i = 0; i < totalTracks.length; i++) {
                if (totalTracks[i].type == 'TEXT') {
                    if (totalTracks[i].index != currentIndex) {
                        webapis.avplay.setSelectTrack('TEXT', totalTracks[i].index);
                        text = 'Change to index: ' + totalTracks[i].index;
                        log(text);
                        break;
                    }
                }
            }
        }
        catch (e) {
            console.log('test5 throw exception : ' + JSON.stringify(e));
        }
    }
    function changeAudioTrack() {
        try {
            var totalTracks = webapis.avplay.getTotalTrackInfo();
            var currentTracks = webapis.avplay.getCurrentStreamInfo();
            var currentIndex;
            for (var i = 0; i < currentTracks.length; i++) {
                if (currentTracks[i].type == 'AUDIO') {
                    currentIndex = currentTracks[i].index;
                    break;
                }
            }
            for (var i = 0; i < totalTracks.length; i++) {
                if (totalTracks[i].type == 'AUDIO') {
                    if (totalTracks[i].index != currentIndex) {
                        webapis.avplay.setSelectTrack('AUDIO', totalTracks[i].index);
                        text = 'Change to index: ' + totalTracks[i].index;
                        log(text);
                        break;
                    }
                }
            }
        }
        catch (e) {
            console.log('test throw exception : ' + JSON.stringify(e));
        }
    }
    /**
     * Handle input from remote
     */
    function registerKeyHandler() {
        document.addEventListener('keydown', function (e) {
            switch (e.keyCode) {
                case 13:    // Enter
                    //player.toggleFullscreen();
                    break;
                case 38:    // Enter
                    if ((localStorage.getItem("trailer") == "true" || localStorage.getItem("trailer") == "false") && localStorage.getItem("content_types_id") != 4) {
                        $("#auto_play_div").hide();
                    }
                    break;
                case 37:
                    if (previous == true) {
                    } else if (next == true) {
                    } else {
                    }
                    break;
                case 40:    //DOWN arrow
                    //switchDrm('down');
                    if ((localStorage.getItem("trailer") == "true" || localStorage.getItem("trailer") == "false") && localStorage.getItem("content_types_id") != 4) {
                        $('#test').show();
                        $("#custom-seekbar").css("display", "block");
                        setTimeout(function () {
                            $('#test').hide();
                            $("#custom-seekbar").css("display", "none");
                            //$("#auto_play_div").hide();
                        }, 30000);
                        if (trailer == "false") {
                            if (Object.getOwnPropertyNames(mediaqueueresponse.next_media_info).length == 0) {
                                $("#auto_play_div").hide();
                                $("#next").hide();
                            } else {
                                $("#title").text(mediaqueueresponse.next_media_info.content_title);
                                $("#autoplay_image").attr("src", mediaqueueresponse.next_media_info.poster_for_tv);
                                content_uniq_id = mediaqueueresponse.next_media_info.content_uniq_id;
                                localStorage.setItem("content_uniq_id_video", content_uniq_id);
                                stream_uniq_id = mediaqueueresponse.next_media_info.stream_uniq_id;
                                localStorage.setItem("stream_in_video", stream_uniq_id);
                                content_types_id = mediaqueueresponse.next_media_info.content_types_id;
                                localStorage.setItem("content_types_id", content_types_id);
                                $("#auto_play_div").show();
                                $("#next").show();
                            }
                            if (Object.getOwnPropertyNames(mediaqueueresponse.previous_media_info).length == 0) {
                                $("#previous").hide();

                            } else {

                                $("#title").text(mediaqueueresponse.previous_media_info.content_title);
                                $("#autoplay_image").attr("src", mediaqueueresponse.previous_media_info.poster_for_tv);
                                content_uniq_id = mediaqueueresponse.previous_media_info.content_uniq_id;
                                localStorage.setItem("content_uniq_id_video", content_uniq_id);
                                stream_uniq_id = mediaqueueresponse.previous_media_info.stream_uniq_id;
                                localStorage.setItem("stream_in_video", stream_uniq_id);
                                content_types_id = mediaqueueresponse.previous_media_info.content_types_id;
                                localStorage.setItem("content_types_id", content_types_id);
                                $("#previous").show();
                            }
                        }
                        setTimeout(() => {
                            $("#auto_play_div").hide();
                            $("#next").hide();
                            $("#previous").hide();
                        }, 20000);
                    }
                    break;
                case 10252:
                    if ((localStorage.getItem("trailer") == "true" || localStorage.getItem("trailer") == "false") && localStorage.getItem("content_types_id") != 4) {
                        player.playPause();
                    }
                // MediaPlayPause
                case 415:
                    // MediaPlay
                    //player.playPause();
                    if ((localStorage.getItem("trailer") == "true" || localStorage.getItem("trailer") == "false") && localStorage.getItem("content_types_id") != 4) {
                        hideSeekBar();
                        $('#play').show();
                        $('#pause').hide();
                    }
                    player.mediaPlay();
                    // console.log("==MediaPlay========");
                    break;
                case 19:    // MediaPause
                    //player.playPause();
                    if ((localStorage.getItem("trailer") == "true" || localStorage.getItem("trailer") == "false") && localStorage.getItem("content_types_id") != 4) {
                        hideSeekBar();
                        $('#play').hide();
                        $('#pause').show();
                    }
                    player.mediaPaused();
                    // console.log("==MediaPause========");
                    break;
                case 413:   // MediaStop
                    if ((localStorage.getItem("trailer") == "true" || localStorage.getItem("trailer") == "false") && localStorage.getItem("content_types_id") != 4) {
                        hideSeekBar();
                        $('#play').show();
                        $('#pause').hide();
                    }
                    player.stop();
                    break;
                case 417:   // MediaFastForward
                    if ((localStorage.getItem("trailer") == "true" || localStorage.getItem("trailer") == "false") && localStorage.getItem("content_types_id") != 4) {
                        hideSeekBar();
                        player.ff();
                    }
                    break;
                case 412:   // MediaRewind
                    if ((localStorage.getItem("trailer") == "true" || localStorage.getItem("trailer") == "false") && localStorage.getItem("content_types_id") != 4) {
                        hideSeekBar();
                        player.rew();
                    }
                    break;
                case 48: //key 0
                    //log();
                    break;
                case 49: //Key 1
                    // setUhd();
                    //document.getElementById('subtitle').style.visibility = 'visible';
                    break;
                case 50: //Key 2
                    // document.getElementById('subtitle').style.visibility = 'hidden';
                    //player.getTracks();
                    break;
                case 51: //Key 3
                    //player.getProperties();
                    //changeSubtileTrack();
                    break;
                case 10009: // Return
                    if ($('.subtitleModal').is(':visible')) {
                        $(".subtitleModal").modal('hide');
                    } else if ($('.audioModal').is(':visible')) {
                        $(".audioModal").modal('hide');
                    } else if ($('.speedModal').is(':visible')) {
                        $(".speedModal").modal('hide');
                    } else {
                        if ("customCounter" in localStorage) {
                            customBack(localStorage.getItem("customCounter"));
                        } else {
                            //window.history.go(counter);
                            customBack(1);
                        }
                        $(".speedModal").modal('hide');
                        $(".audioModal").modal('hide');
                        $(".subtitleModal").modal('hide');
                        videolognew(authtoken, baseurl, ip_address, movie_id, episode_id, watch_status, device_type, log_id, content_type, is_streaming_restriction, restrict_stream_id, is_active_stream_closed, played_length, log_temp_id, resume_time, user_id);
                        localStorage.removeItem("smiSubtitle");
                        localStorage.removeItem("subtitleLang");
                        window.history.go(counter);
                        localStorage.removeItem("count");
                        localStorage.removeItem("autoplayavialble");
                    }
                    break;
                case 10182:
                    console.log("AppExit");
                    localStorage.setItem("AppExit", "yes")
                    tizen.application.getCurrentApplication().exit();
                default:
                // log("Unhandled key");
            }
        });
    }



    function registerMouseEvents() {
        document.querySelector('.video-controls .play').addEventListener(
            'click',
            function () {
                player.playPause();
                document.getElementById('streamParams').style.visibility = 'visible';
            }
        );

        document.querySelector('.video-controls .pause').addEventListener(
            'click',
            player.playPause
        );
        document.querySelector('.video-controls .ff').addEventListener(
            'click',
            player.ff
        );
        document.querySelector('.video-controls .rew').addEventListener(
            'click',
            player.rew
        );
        document.querySelector('.video-controls .fullscreen').addEventListener(
            'click',
            player.toggleFullscreen
        );
    }



    /**
     * Changes drm settings according to user's action
     * @param {String} direction - 'up' or 'down'
     */

    /**
     * Function initialising application.
     */
    window.onload = function () {
        webapis.network.addNetworkStateChangeListener(function (value) {
            if (value == webapis.network.NetworkState.GATEWAY_DISCONNECTED) {
                webapis.avplay.pause();
                alert('No internet connection!');
                $('#spinner').show();
            } else if (value == webapis.network.NetworkState.GATEWAY_CONNECTED) {
                // Something you want to do when network is connected again
                if (localStorage.getItem("trailer") == "false" && localStorage.getItem("content_types_id") == 4) {
                    setTimeout(function () {
                        location.reload();
                    }, 5000)
                } else {
                    webapis.avplay.restore(localStorage.getItem("url"), lastPlayerCurrentTime, false);
                }
                webapis.avplay.play();
                $('#spinner').hide();
            }
        });

        //videolognew();
        $.caph.focus.activate(function (nearestFocusableFinderProvider, controllerProvider) {
            //console.log(controllerProvider);
            //console.log(nearestFocusableFinderProvider);

            controllerProvider.onFocused(function (event, originalEvent) {
                var id = $(event.currentTarget).attr("id");
                if (id == "previous") {
                    previous = true;
                    next = false;
                    $("#title").text(mediaqueueresponse.previous_media_info.content_title);
                    $("#autoplay_image").attr("src", mediaqueueresponse.previous_media_info.poster_for_tv);
                    content_uniq_id = mediaqueueresponse.previous_media_info.content_uniq_id;
                    localStorage.setItem("content_uniq_id_video", content_uniq_id);
                    stream_uniq_id = mediaqueueresponse.previous_media_info.stream_uniq_id;
                    localStorage.setItem("stream_in_video", stream_uniq_id);
                    content_types_id = mediaqueueresponse.previous_media_info.content_types_id;
                    localStorage.setItem("content_types_id", content_types_id);
                }
                else if (id == "next") {
                    $("#title").text(mediaqueueresponse.next_media_info.content_title);
                    $("#autoplay_image").attr("src", mediaqueueresponse.next_media_info.poster_for_tv);
                    content_uniq_id = mediaqueueresponse.next_media_info.content_uniq_id;
                    localStorage.setItem("content_uniq_id_video", content_uniq_id);
                    stream_uniq_id = mediaqueueresponse.next_media_info.stream_uniq_id;
                    localStorage.setItem("stream_in_video", stream_uniq_id);
                    content_types_id = mediaqueueresponse.next_media_info.content_types_id;
                    localStorage.setItem("content_types_id", content_types_id);
                    next = true;
                    previous = false;
                } else {
                    next = false;
                    previous = false;
                }
                $(event.currentTarget).css({
                    //color:focuscolor
                    background: '#00abea'
                });


            });

            controllerProvider.onBlurred(function (event, originalEvent) {
                $(event.currentTarget).css({
                    //color:'white'
                    background: 'transparent'
                });

            });

            controllerProvider.onSelected(function (event, originalEvent) {
                $(event.currentTarget).toggleClass("selected");
                var detailspermalink = $(event.currentTarget).attr('id');
                if (detailspermalink == "play") {
                    player.playPause();
                    $('#play').hide();
                    $('#pause').show();
                } else if (detailspermalink == "pause") {
                    player.playPause();
                    $('#play').show();
                    $('#pause').hide();
                } else if (detailspermalink == "ff") {
                    player.ff();
                } else if (detailspermalink == "rew") {
                    player.rew();
                }
                else if (detailspermalink == "previous") {
                    counter = counter - 1;
                    localStorage.setItem("count", counter);
                    $(location).attr('href', "autoplaydesc.html?content_uniq_id=" + content_uniq_id + "&stream_uniq_id=" + stream_uniq_id + "&click_key=previous" + "&content_types_id=" + content_types_id);
                }
                else if (detailspermalink == "next") {
                    counter = counter - 1;
                    localStorage.setItem("count", counter);
                    $(location).attr('href', "autoplaydesc.html?content_uniq_id=" + content_uniq_id + "&stream_uniq_id=" + stream_uniq_id + "&click_key=next" + "&content_types_id=" + content_types_id);
                } else if (detailspermalink == "subTitlebtn") {
                    $(".speedModal").modal('hide');
                    $(".audioModal").modal('hide');
                    let subtitle = '<p focusable index="-1" id="langHide"><i class="fa fa-cc-diners-club"></i> Off </p>';
                    var totalTrackInfo = webapis.avplay.getTotalTrackInfo();
                    let subtitleNo = 0;
                    let langListing = JSON.parse(localStorage.getItem("subtitleLang"));
                    for (var i = 0; i < totalTrackInfo.length; i++) {
                        if (totalTrackInfo[i].type == 'TEXT') {
                            subtitle += '<p focusable index="' + totalTrackInfo[i].index + '" id="lang' + totalTrackInfo[i].index + '"><i class="fa fa-file-audio-o"></i>&nbsp;' + langListing[subtitleNo]["name"] + '</p>';
                            subtitleNo++;
                        }
                    }
                    var currentTracks = webapis.avplay.getCurrentStreamInfo();
                    var currentIndex;
                    for (var i = 0; i < currentTracks.length; i++) {
                        if (currentTracks[i].type == 'TEXT') {
                            currentIndex = currentTracks[i].index;
                            break;
                        }
                    }
                    $(".subtitleBody").empty().append(subtitle);
                    $("#lang" + currentIndex).addClass("subTitleAct");
                    prevIndex = currentIndex;
                    $(".subtitleModal").modal('show');
                    setTimeout(function () {
                        $(".subtitleModal").modal('hide');
                    }, 15000);
                } else if (detailspermalink == "speed") {
                    $(".subtitleModal").modal('hide');
                    $(".audioModal").modal('hide');
                    $(".speedModalBody").empty().append('<p focusable id="speed2" index="-2">-2x</p><p focusable id="speed3" index="1">Normal</p><p focusable id="speed4" index="2">2x</p>');
                    $("#" + prevSpeedIndex).addClass("subTitleAct");
                    $(".speedModal").modal('show');
                    setTimeout(function () {
                        $(".speedModal").modal('hide');
                    }, 15000);
                } else if (detailspermalink == "audioBtn") {
                    var totalTrackInfo = webapis.avplay.getTotalTrackInfo();
                    let multiAudio = '';
                    let multiAudioNo = 1;
                    for (var i = 0; i < totalTrackInfo.length; i++) {
                        if (totalTrackInfo[i].type == 'AUDIO') {
                            let currentTrackObj = totalTrackInfo[i].extra_info;
                            var jsonObj = JSON.parse(currentTrackObj);
                            let langCode = jsonObj.language;
                            let langageShow = getLanguageByLnagCode(langCode);
                            multiAudio += '<p focusable index="' + totalTrackInfo[i].index + '" id="audio' + totalTrackInfo[i].index + '"><i class="fa fa-music"></i>&nbsp;' + langageShow + '</p>';
                        }
                    }
                    var currentTracks = webapis.avplay.getCurrentStreamInfo();
                    var currentIndex;
                    for (var i = 0; i < currentTracks.length; i++) {
                        if (currentTracks[i].type == 'AUDIO') {
                            currentIndex = currentTracks[i].index;
                            break;
                        }
                    }
                    $(".audioModalBody").empty().append(multiAudio);
                    $("#audio" + currentIndex).addClass("subTitleAct");
                    prevAudioTrack = currentIndex;
                    $(".subtitleModal").modal('hide');
                    $(".speedModal").modal('hide');
                    $(".audioModal").modal('show');
                    setTimeout(function () {
                        $(".audioModal").modal('hide');
                    }, 15000);
                } else {
                    if ($('.speedModal').is(':visible') == true) {
                        var index = $(event.currentTarget).attr('index');
                        const speedIndex = parseInt(index);
                        webapis.avplay.setSpeed(speedIndex);
                        prevSpeedIndex = detailspermalink;
                        $(".speedModal").modal('hide');
                    } else if ($('.audioModal').is(':visible') == true) {
                        var index = $(event.currentTarget).attr('index');
                        if (prevAudioTrack != index) {
                            changeAudioTrack();
                        }
                        $(".audioModal").modal('hide');
                    } else if ($('.subtitleModal').is(':visible') == true) {
                        var index = $(event.currentTarget).attr('index');
                        if (index == -1) {
                            document.getElementById('subtitleDiv').style.visibility = 'hidden';
                            $(".subtitleModal").modal('hide');
                        } else {
                            if (prevIndex != index) {
                                changeSubtileTrack();
                            }
                            document.getElementById('subtitleDiv').style.visibility = 'visible';
                            $(".subtitleModal").modal('hide');
                        }
                    }

                }
            });
        });


        if (window.tizen === undefined) {
            //log('This application needs to be run on Tizen device');
            return;
        }

        /**
         * Player configuration object.
         *
         * @property {Object}           drms            - object containing drm configurations
         * @property {HTML Element}     player          - application/avplayer object
         * @property {HTML Div Element} controls        - player controls
         * @property {HTLM Div Element} info            - place to display stream info
         * @property {Function}         logger          - function to use for logging within player component
         *
         */
        var DRM = localStorage.getItem("DRM");
        var url = localStorage.getItem("url");
        var licenseurl = localStorage.getItem("licenseurl");
        var customData = localStorage.getItem("customdata");

        console.log(DRM);
        console.log(url);
        console.log(licenseurl);

        var config = {

            name: DRM,
            url: url,
            licenseServer: licenseurl,
            customData: customData,
            playlength: playlength,
            stream_uniq_id: stream_uniq_id,
            muvi_uniq_id: muvi_uniq_id,
            trailer: trailer,
            multipart: multipart,
            player: document.getElementById('av-player'),
            controls: document.querySelector('.video-controls'),

        };

        /*registerKeys();
        registerKeyHandler();*/

        //Check the screen width so that the AVPlay can be scaled accordingly
        tizen.systeminfo.getPropertyValue(
            "DISPLAY",
            function (display) {
                //log("The display width is " + display.resolutionWidth);
                config.resolutionWidth = display.resolutionWidth;

                // initialize player - loaded from videoPlayer.js
                player = new VideoPlayer(config);
                registerMouseEvents();
                player.play();
            },
            function (error) {
                //log("An error occurred " + error.message);
            }
        );
    };
}());

document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
        webapis.avplay.suspend();
        //tizen.application.getCurrentApplication().hide();
    } else {
        webapis.avplay.restore(localStorage.getItem("url"), 0, false);
        webapis.avplay.play();
    }
});

const hideSeekBar = () => {
    if ((localStorage.getItem("trailer") == "true" || localStorage.getItem("trailer") == "false") && localStorage.getItem("content_types_id") != 4) {
        $(".custom-seekbar").show();
        $('.test').show();
        setTimeout(() => {
            $('.test').hide();
            $(".custom-seekbar").hide();
        }, 30000);
    } else {
        $(".live_sec").show();
    }

}
function getLanguageByLnagCode(langCode) {
    let reurnLanguage = storeLanguage.find(lang => lang.code === langCode);
    if (reurnLanguage === undefined) {
        reurnLanguage = "Language (" + langCode + ")";
    } else {
        reurnLanguage = reurnLanguage.name;
    }
    return reurnLanguage;
}
function customBack(customCounter) {
    let arrObj = JSON.parse(localStorage.getItem("historyArray"));
    for (var i = 0; i < customCounter; i++) {
        arrObj.pop();
    }
    if (arrObj.length > 0) {
        window.location.href = arrObj[arrObj.length - 1];
        arrObj.pop();
        localStorage.setItem("historyArray", JSON.stringify(arrObj));
    } else {
        window.history.back();
    }
}