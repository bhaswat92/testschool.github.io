/**
 * Player object constructor.
 *
 * @param   {Object} config - Playback and player configuration.
 * @returns {Object}
 * 
 */

var lastSecond = null;
var secondsToCallFunction = 60;
var ip_address="";
var movie_id="";
var episode_id=0;   
var watch_status="";
var device_type="2";
var log_id="0";
var content_type="";
var is_streaming_restriction="0";
var restrict_stream_id="0";
var is_active_stream_closed="0";
var played_length="";
var log_temp_id="0";
var resume_time="";

function videolognew(authtoken,baseurl,ip_address,movie_id,episode_id,watch_status,device_type,log_id,content_type,is_streaming_restriction,restrict_stream_id,is_active_stream_closed,played_length,log_temp_id,resume_time,user_id) {
   console.log("authtoken==="+authtoken);
   console.log("ip_address==="+ip_address);
   console.log("movie_id==="+movie_id);
   console.log("episode_id==="+episode_id);
   console.log("watch_status==="+watch_status);
   console.log("device_type==="+device_type);
   console.log("log_id==="+log_id);
   console.log("content_type==="+content_type);
   console.log("is_streaming_restriction==="+is_streaming_restriction);
   console.log("restrict_stream_id==="+restrict_stream_id);
   console.log("is_active_stream_closed==="+is_active_stream_closed);
   console.log("played_length==="+played_length);
   console.log("log_temp_id==="+log_temp_id);
   console.log("resume_time==="+resume_time);
   console.log("user_id==="+user_id);
		var videodetailsxhttp = new XMLHttpRequest();
		 videodetailsxhttp.onreadystatechange = function() {
			//$('#spinner').show();
			if (this.readyState == 4 && this.status == 200) {
				//$('#spinner').hide();
				var videodetails_response = JSON.parse(this.responseText);
				console.log(videodetails_response);
				if (videodetails_response.code==200) {
					log_id=videodetails_response.log_id;
					log_temp_id=videodetails_response.log_temp_id;
					watch_status="halfplay";
					videolognew(authtoken,baseurl,ip_address,movie_id,episode_id,watch_status,device_type,log_id,content_type,is_streaming_restriction,restrict_stream_id,is_active_stream_closed,played_length,log_temp_id,resume_time,user_id);
				}else{
					alert("fail");
				}
			}
		};

		videodetailsxhttp.open("GET", ""+baseurl+"VideoLogNew?authToken="+authtoken+"&ip_address="+ip_address+"&movie_id="+movie_id+"&episode_id="+episode_id+"&watch_status="+watch_status+"&device_type="+device_type+"&log_id="+log_id+"&content_type="+content_type+"&is_streaming_restriction="+is_streaming_restriction+"&restrict_stream_id="+restrict_stream_id+"&is_active_stream_closed="+is_active_stream_closed+"&played_length="+played_length+"&log_temp_id="+log_temp_id+"&resume_time="+resume_time+"&user_id="+user_id+"", true);
		videodetailsxhttp.send();
    }
function VideoPlayer(config) {
    //var log = config.logger;
	var autoplay="";	
	var stream_uniq_id= localStorage.getItem("stream_in_video");
	var content_uniq_id=localStorage.getItem("content_uniq_id_video");
	var content_types_id=localStorage.getItem("content_types_id");
	if(localStorage.getItem("authtokenstr")!=null){
		var authtoken=localStorage.getItem("authtokenstr");
		var baseurl=localStorage.getItem("baseurl");
		var lang_code = localStorage.getItem("lang_code");
	}
	if(localStorage.getItem("loginstr")!=null){

		var user_id=localStorage.getItem("loginstr");
	}
    var player = config.player;
    var playerlength = config.playlength;
    var trailer = config.trailer;
    var multipart = config.multipart;
    ip_address="";    
    movie_id=config.muvi_uniq_id;
    
    if (multipart == "3") { 
    	
    	episode_id=config.stream_uniq_id;
    	
	} else {
		
		episode_id=0;
	}
    
       
	watch_status="start";
	
	if(config.trailer=="true"){
		
		content_type="2";
	}else{
		
		content_type="";
	}
	
	device_type="2";
	log_id="0";
	
	is_streaming_restriction="0";
	restrict_stream_id="0";
	is_active_stream_closed="0";
	played_length=config.playlength;
	log_temp_id="0";
	resume_time=config.playlength;
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

    
    var counter=-1;
    if(localStorage.getItem("count")!=null){
        counter=localStorage.getItem("count");
     }else{
    	 
    	 counter=-1; 
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
                onbufferingstart: function () {
                    //log("Buffering start.");
                    $('#spinner').show();
                    
                },
                onbufferingprogress: function (percent) {
                    //log("Buffering progress data : " + percent);
                    $('#spinner').show();
                },
                onbufferingcomplete: function () {
                    //log("Buffering complete.");
                    $('#spinner').hide();
                    
                   /* var timer = setTimeout(function() {
                    	$('#test').hide();
                    	$("#custom-seekbar").css("display", "none");
                      }, 20000);*/
                },
                oncurrentplaytime: function (currentTime) {
                    //log("Current playtime: " + currentTime);
                    //$('#spinner').hide();
                	document.getElementById("currentTime").innerHTML = Math.floor(currentTime / 3600000) + ":" + Math.floor((currentTime / 60000) % 60) + ":" + Math.floor((currentTime / 1000) % 60);
                	var test=Math.floor((currentTime / 1000));
                	var duration = webapis.avplay.getDuration();
                	var current_time =webapis.avplay.getCurrentTime();
                    document.getElementById("totalTime").innerHTML = Math.floor(duration / 3600000) + ":" + Math.floor((duration / 60000) % 60) + ":" + Math.floor((duration / 1000) % 60);            
                    var percentage = ( currentTime / duration ) * 100;
                	$('.widthspan').css('width', percentage+"%");
                	var actual_duration = Math.floor((duration/1000));
                	//console.log("duration=="+actual_duration);
                	show_alert_duration=actual_duration-10;
                	//console.log("before condition"+test+"=="+show_alert_duration);
                	if(test == show_alert_duration ){
                		//console.log(test+"=="+show_alert_duration);
                		if(localStorage.getItem("autoplayavialble")=="1"){
                			$("#auto_play_div").show();
                		}
                		
                	}
                	   //var test123 = Math.floor(duration);
                	   //console.log(test123);
                	   var testtt = Math.floor((currentTime / 1000));
                	   console.log("videolog:--"+testtt);
                	   if (testtt % secondsToCallFunction  == 0 && lastSecond !== testtt) {
                	    lastSecond = testtt
                	    console.log("sanjay:---"+testtt);
                	    resume_time=testtt;
                	    videolognew(authtoken,baseurl,ip_address,movie_id,episode_id,watch_status,device_type,log_id,content_type,is_streaming_restriction,restrict_stream_id,is_active_stream_closed,played_length,log_temp_id,resume_time,user_id); 
                	    }
                },
                onevent: function (eventType, eventData) {
                   // log("event type: " + eventType + ", data: " + eventData);
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
                	watch_status="completed";
                	videolognew(authtoken,baseurl,ip_address,movie_id,episode_id,watch_status,device_type,log_id,content_type,is_streaming_restriction,restrict_stream_id,is_active_stream_closed,played_length,log_temp_id,resume_time,user_id);
                	if(localStorage.getItem("autoplayavialble")!=null){
                        autoplay=localStorage.getItem("autoplayavialble");
                     }else{
                    	 
                    	 autoplay=0;
                     }
                	
                	//alert("autoplay=="+autoplay);
                	
                	if (autoplay == 1) {
                		counter=counter-1;
           	 	 	    localStorage.setItem("count",counter);
           	 	 	   // alert("content_types_id=="+content_types_id);
           	 	 	    $(location).attr('href',"autoplaydesc.html?content_uniq_id="+content_uniq_id+"&stream_uniq_id="+stream_uniq_id+"&click_key=next"+"&content_types_id="+content_types_id);
					} else {
                        
						this.stop();
						//window.history.back();
						localStorage.removeItem("count");
      	                localStorage.removeItem("autoplayavialble");
					}
                	
                	
                    //this.stop();                    
                }.bind(this),
                onerror: function (eventType) {
                   // log("event type error : " + eventType);
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
                    $('#test').show();
                    $("#custom-seekbar").css("display", "block");
                    //isFullscreen = true;
                }
                
                webapis.avplay.setListener(listener);
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
            	
            	//alert(config.playlength);
                webapis.avplay.prepare();
                webapis.avplay.play();
                webapis.avplay.jumpForward(parseFloat(playerlength));
                //videolognew(authtoken,baseurl,ip_address,movie_id,episode_id,watch_status,device_type,log_id,content_type,is_streaming_restriction,restrict_stream_id,is_active_stream_closed,played_length,log_temp_id,resume_time,user_id);
                
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
                //alert("pause");
                $('#play').hide();
				$('#pause').show();
            }else if (webapis.avplay.getState() === 'PLAYING') {
            	this.pause();
            	//alert("play");
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
            webapis.avplay.stop();
            window.history.back();
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
        /**
         * Jump forward 3 seconds (3000 ms).
         */
        ff: function () {
            webapis.avplay.jumpForward(30000);
        },
      
        
        /**
         * Rewind 3 seconds (3000 ms).
         */
        rew: function () {
            webapis.avplay.jumpBackward(30000);
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
         * Show information about all available stream tracks on the screen.
         */
        getTracks: function () {
            var trackInfo = webapis.avplay.getTotalTrackInfo();
            var text = 'type of track info: ' + typeof trackInfo + '<br />';
            text += 'length: ' + trackInfo.length + '<br />';
            for (var i = 0; i < trackInfo.length; i++) {
                text += 'index: ' + trackInfo[i].index + ' ';
                text += 'type: ' + trackInfo[i].type + ' ';
                text += 'extra_info: ' + trackInfo[i].extra_info + '<br />';
            }
            info.innerHTML = text;
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