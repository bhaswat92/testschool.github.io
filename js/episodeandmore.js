var checkTime;
//Initialize function
var subtitleArr = [];
var init = function () {
	var country = localStorage.getItem("country");
	var played_length = 0;
	var country = localStorage.getItem("country");
	if (localStorage.getItem("authtokenstr") != null) {
		var authtoken = localStorage.getItem("authtokenstr");
		var baseurl = localStorage.getItem("baseurl");
		var lang_code = localStorage.getItem("lang_code");
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
	//$('#navhome').addClass('current');

	var episode_muvi_unique_id = '';
	var episode_muvi_streamunique_id = '';
	var loginstr = localStorage.getItem("loginstr");
	if (localStorage.getItem("loginstr") != null) {
		$('#myaccounts').show();
		$('#logout').show();
	}

	if (localStorage.getItem("Mylibrary") == "1" && localStorage.getItem("loginstr") != null) {
		$('#mylibrary').show();
	}
	if (localStorage.getItem("WatchHistory") == "1" && localStorage.getItem("loginstr") != null) {
		$('#watchhistory').show();
	}
	if (localStorage.getItem("Myfavorite") == "1" && localStorage.getItem("loginstr") != null) {
		$('#myfavourite').show();
	}
	$('#episodelistimageload').hide();

	$(document).ready(function () {
		//For RTl Use ( Don't Modify This Section )
		var lang_code = localStorage.getItem("lang_code");
		if (lang_code == "ar" || lang_code == "arc" || lang_code == "az" || lang_code == "dv" || lang_code == "iw" || lang_code == "ku"
			|| lang_code == "fa" || lang_code == "ur") {
			$('.right-scroll').insertBefore('.fixed-test');
		}
		$('#spinner').show();
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

		var rating = getParameterByName("rating", window.location.href);
		var review = getParameterByName("review", window.location.href);
		var muviduration = getParameterByName("video_duration", window.location.href);
		var title = getParameterByName("title", window.location.href);
		var releaseDate = getParameterByName("release", window.location.href);
		var currentseries_number = getParameterByName("series_number", window.location.href);
		var currentperm = getParameterByName("permalink", window.location.href);
		var currentperm = replacespecialcharcter(currentperm);
		function replacespecialcharcter(string) {
			if (string != null) {
				var string = string.replace(/[&\/\\#,+()$~%.'":*?<>{}],''/g);
				return string;
			} else {
				return null;
			}
		};

		//console.log(currentperm);
		var series_number = JSON.parse("[" + currentseries_number + "]");
		var i = 0;
		var seasonbuttton = "";
		var releaseDateHtml = '';
		var seasonNumberHtml = '';
		var content_description = '';
		var seasonbuttton = '';
		//var series_number=1;
		//console.log(series_number.length);
		if (!releaseDate == "") {
			releaseDateHtml = ' <li id="releasedate">' + releaseDate + '</font></li>';
		}
		seasonNumberHtml = '<li id="releasedate">' + series_number.length + '  Seasons </font></li>';
		/*var name='<b style="line-height: normal;font-size:45px;" class="text-color" >'+title+'</b>';*/

		content_description += '<div ><b id="name" class="text-color" style="font-size:45px; margin-left:1px;font-weight:700px;">' + title + '</b><hr style="margin-top: 2px;border-top: 0px;margin-right:445px;margin-left: 1px;background: #0cb9f2;height: 3px;"></div>' +
			'<div class="col-md-12" style="padding-left: 0px;"><ul class="nav navbar-nav nav-time-duration">' +
			releaseDateHtml + seasonNumberHtml;

		if (!releaseDate == "" && muviduration == "") {

			$('#two').hide();
			$('#one').show();
		} else if (releaseDate == "" && muviduration == "") {
			$('#one').hide();
			$('#two').hide();
		}
		else if (releaseDate == "" && !muviduration == "") {
			$('#one').hide();
			$('#two').show();
		}



		var season = localStorage.getItem("season");
		//var seasons = localStorage.getItem("seasons");
		var seasons = "Seasons";



		$('#name').html(title);
		$('#bar').show();
		$('#year').html(releaseDate);
		if ('' + series_number.length + '' > 1) {
			$('#season').html('' + series_number.length + '' + ' ' + '' + seasons + '');

		} else {
			$('#season').html('' + series_number.length + '' + ' ' + '' + season + '');

		}

		$('#time').html(muviduration);





		//		var season_no='<b style="line-height: normal;font-size:40px;" class="text-color" >'+series_number.length+'  Seasons</b>';
		for (i = 0; i < series_number.length; i++) {
			//console.log(series_number[i]);

			seasonbuttton += '<div id=' + i + ' series-id=' + series_number[i] + ' data-perma=' + currentperm + ' class="row mt-4">' +
				'<div class="col-12">' +
				'<img id="season_buttonn" src="images/season-play-white.png" width="36" /><span class="singlepart-text mt-2 font-weight-normal" id="season_button" data-id=' + series_number[i] + ' data-perma=' + currentperm + '>' + season + ' ' + series_number[i] + '</span>' +
				'</div>' +
				'</div>';


			//			var seasonbuttton='<b class="text-uppercase" ></b>';
			//seasonbuttton +='<div  class="epis_item"><img src="images/season.png"  id="season_image" class="seasonImage" /><h3 style="text-transform: uppercase;" id="season_button" focusable data-id='+series_number[i]+' data-perma='+currentperm+' >Season  '+series_number[i]+'</h3></div>';

			$('#seanson_div').html(seasonbuttton);
			$("#seanson_div").children('div').eq(0).addClass('current');

		}
		$('#content_details').html(content_description);
		//		$('#season').html(season_no);
		//console.log("values =="+series_number[0]+""+currentperm)
		CallepisodeDetailsApi(series_number[0], currentperm);

		function CallepisodeDetailsApi(series_number, currentperm) {
			var currentperm = currentperm;
			var series_number = series_number;
			function getepisodeDetailsResp(data, textStatus, xhr) {
				console.log(data);
				$('#navbarcontent').show();
				episode_Details = data;
				console.log(episode_Details)
				var episodebannerimage = "";
				var episodebannerdesc = "";
				var episodedesc = "";
				episode_muvi_unique_id = episode_Details.muvi_uniq_id;
				//console.log("episodemuviuniqueid==="+episode_muvi_unique_id);
				var episodelength = episode_Details.episode.length;
				var viewmore_banner = '';
				var sectionindex = ""
				var content_row_length = 1;
				var curr_row_start_value = 0;
				var total_row = Math.ceil(episodelength / 1);
				//console.log("Total row value=="+total_row);

				for (var j = 0; j < total_row; j++) {
					var row_index = "row" + j;
					//console.log("Value need to check"+row_index+" row length=="+content_row_length+" curr_value=="+curr_row_start_value );

					for (i = curr_row_start_value; i < content_row_length; i++) {
						var story = truncate(episode_Details.episode[i]['episode_story']);
						episode_muvi_streamunique_id = episode_Details.episode[i]['movie_stream_uniq_id'];
						//console.log(episode_Details.episode[i]['poster_url'])


						if (episode_Details.episode[i]['posterForTv'] != "") {
							episodebannerimage += '<div id="episode_' + i + '" class="list-box-select" data-row=' + row_index + ' data-perma="episodeimagediv" data-muviunique_id=' + episode_muvi_unique_id + '  data-muvi_stream-unique_id=' + episode_Details.episode[i]['movie_stream_uniq_id'] + ' data-movieutl=' + episode_Details.episode[i]['movieUrlForTv'] + '>' +
								'<div class="list-img-select episode_img">' +
								'<img src="' + episode_Details.episode[i]['posterForTv'] + '" class="img-fluid  border-inside" />' +
								'<div class="dtls"><p>S' + episode_Details.episode[i]['series_number'] + ' : E' + episode_Details.episode[i]['episode_number'] + '</p></div>' +
								'</div>' +
								'<div class="list-text-select">' +
								'<h2 class="heading2 mt-3">' + episode_Details.episode[i]['episode_title'] + '</h2>' +
								'<div class="title-bar3"></div>' +
								'<p class="text-muted">' + story + '</p>' +
								'</div>' +
								'</div>';
						} else {
							episodebannerimage += '<div id="episode_' + i + '" class="list-box-select" data-row=' + row_index + ' data-perma="episodeimagediv" data-muviunique_id=' + episode_muvi_unique_id + '  data-muvi_stream-unique_id=' + episode_Details.episode[i]['movie_stream_uniq_id'] + ' data-movieutl=' + episode_Details.episode[i]['movieUrlForTv'] + '>' +
								'<div class="list-img-select episode_img">' +
								'<img src="images/no_image_tv.png" style="width: 482px;height: 260px;" class="img-fluid border-inside" / >' +
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
					var secton_length = episode_Details.episode.length - 1;
					content_row_length = content_row_length + 1;
					if (content_row_length > secton_length) {
						content_row_length = secton_length + 1;
					}
					curr_row_start_value = curr_row_start_value + 1;

				}


				/*for(i=0;i<episode_Details.episode.length;)
				{
					var story=truncate(episode_Details.episode[i]['episode_story']);
					episode_muvi_streamunique_id = episode_Details.episode[i]['movie_stream_uniq_id'];
					console.log(episode_Details.episode[i]['poster_url'])
					if (episode_Details.episode[i]['posterForTv']!="") {	
					episodebannerimage +='<div focusable class="list-box-select" data-row='+row_index+' data-perma="episodeimagediv" data-muviunique_id='+episode_muvi_unique_id+'  data-muvi_stream-unique_id='+episode_Details.episode[i]['movie_stream_uniq_id']+' data-movieutl='+episode_Details.episode[i]['movieUrlForTv']+'>'+
					 '<div class="list-img-select">'+
					 '<img src="'+episode_Details.episode[i]['posterForTv']+'" class="img-fluid  border-inside" />'+
					 '</div>'+
					 '<div class="list-text-select">'+
					 '<h2 class="heading2 mt-3">'+episode_Details.episode[i]['episode_title']+'</h2>'+
					 '<div class="title-bar3"></div>'+
					 '<p class="text-muted">'+story+'</p>'+
					 '</div>'+
					 '</div>';
					}else{
					episodebannerimage +='<div focusable class="list-box-select" data-row='+row_index+' data-perma="episodeimagediv" data-muviunique_id='+episode_muvi_unique_id+'  data-muvi_stream-unique_id='+episode_Details.episode[i]['movie_stream_uniq_id']+' data-movieutl='+episode_Details.episode[i]['movieUrlForTv']+'>'+
					 '<div class="list-img-select">'+
					 '<img src="images/no_image.png" class="img-fluid  border-inside" />'+
					 '</div>'+
					 '<div class="list-text-select">'+
					 '<h2 class="heading2 mt-3">'+episode_Details.episode[i]['episode_title']+'</h2>'+
					 '<div class="title-bar3"></div>'+
					 '<p class="text-muted">'+story+'</p>'+
					 '</div>'+
					 '</div>';
					}
					i++;
				}*/

				$('#episodelistimageload').html(episodebannerimage);
				var timer = setTimeout(function () {
					$('#spinner').hide();
					$('#episodelistimageload').show();
				}, 5000);
			}

			var URL = baseurl + "episodeDetails?authToken=" + authtoken + "&permalink=" + currentperm + "&series_number=" + series_number + "&lang_code=" + lang_code + "&country=" + country + "&limit=500";
			makeGetAjaxCall(URL, 30000, getepisodeDetailsResp);
		};

		// $(document).on("click", "#season_button", function (e) {
		// 	var number = $(this).attr('data-id');
		// 	//console.log("button id="+number);
		// 	CallepisodeDetailsApi(number);
		// });


		//$('#seanson_div').html(seasonbuttton);

		function truncate(string) {
			if (string.length > 150)
				return string.substring(0, 150) + '...';
			else
				return string;
		};


		function callGetVideoDetails(muvi_streamunique_id, muviunique_id) {
			$('#spinner').show();
			var total_SubtitleObj = [];

			function getVideoDetailsResp(data, textStatus, xhr) {
				$('#spinner').hide();
				console.log(data);
				var videodetails_response = data;
				if (videodetails_response.code == 200) {
					if (videodetails_response.hasOwnProperty("licenseUrl")) {
						if (videodetails_response.subTitle.length > 0) {
							for (
								var index = 0;
								index < videodetails_response.subTitle.length;
								index++
							) {
								if (index == 0) {
									var subtileData = {
										default: true,
										kind: "subtitles",
										label: videodetails_response.subTitle[index].language,
										src: videodetails_response.subTitle[index].url,
										srclang: videodetails_response.subTitle[index].code,
									};
								} else {
									var subtileData = {
										kind: "subtitles",
										label: videodetails_response.subTitle[index].language,
										src: videodetails_response.subTitle[index].url,
										srclang: videodetails_response.subTitle[index].code,
									};
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
						//alert(played_length);
					} else {
						played_length = videodetails_response.played_length;
						//played_length = played_length * 1000;
						if (videodetails_response.hasOwnProperty("licenseUrl")) {
							played_length = played_length;
						} else {
							played_length = played_length * 1000;
						}
						//alert(played_length);
					}
					var child = 'licenseUrl' in videodetails_response || 'there is no child'
					if (child == "there is no child") {
						//alert("no key");
					} else {
						var licenseUrl = videodetails_response.licenseUrl;
					}
					if (thirdpartyUrl == "" || thirdpartyUrl == " " || thirdpartyUrl == "null" || thirdpartyUrl == null) {

						if (video_url == "" || video_url == " " || video_url == "null" || video_url == null) {
							$('#nocontent').html("No video available");
							$('#nocontent').show();
							var timer = setTimeout(function () {
								$('#nocontent').hide();
							}, 1000);
						} else {
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
						//alert("Unable to play the content");
						$('#nocontent').html("Unable to play the content");
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
			var URL = baseurl + "getVideoDetails?authToken=" + authtoken + "&content_uniq_id=" + muviunique_id + "&license_type=1" + "&stream_uniq_id=" + muvi_streamunique_id + "&user_id=" + loginstr + "&subtitle_type=smi&lang_code=en";
			makeGetAjaxCall(URL, 30000, getVideoDetailsResp);
		}


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
					}, 5000);
				}
			}
			var URL = baseurl + "isContentAuthorized?authToken=" + authtoken + "&movie_id=" + muviunique_id + "&episode_id=" + muvi_streamunique_id + "&season_id=0&purchase_type=episode&user_id=" + loginstr + "&country=" + country;
			makeGetAjaxCall(URL, 30000, getValidateUserResp);
		}

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
		document.onkeydown = checkKey;
		function checkKey(e) {
			var position;
			var $current
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
				$current = $('.current');
				position = $current.parent().get()[0].id;
				currentparentId = $current.parent().parent().get()[0].id;
				// if (currentparentId == "contentpart") {
				// 	$current.removeClass('current');
				// 	$('#mainmenu').children().eq(0).addClass('current');
				// }
				if (position == "episodelistimageload") {
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
				else if (position == "seanson_div") {
					if ($current.prev().length > 0) {
						$current.removeClass('current');
						$current.prev().addClass('current');
					} else {
						$current.removeClass('current');
						$('#mainmenu').children().eq(0).addClass('current');
					}
				}

			} else if (remoteBtnCode == '40') {
				// down arrow key
				$current = $('.current');
				position = $current.parent().get()[0].id;
				if (position == "mainmenu") {
					$current.removeClass('current');
					$("#seanson_div").children('div').eq(0).addClass('current');

				}
				else if (position == "seanson_div") {
					if ($current.next().length > 0) {
						$current.removeClass('current');
						$current.next().addClass('current');
					}
				}
				else if (position == "episodelistimageload") {
					if ($current.next().length > 0) {
						$current.removeClass('current');
						$current.prev().addClass('d-none');
						$current.next().addClass('current');
					}
				}
			} else if (remoteBtnCode == '37') {
				// left arrow key
				$current = $('.current');
				position = $current.parent().get()[0].id;
				if (position == "episodelistimageload") {
					$current.removeClass('current');
					$("#seanson_div").children('div').eq(0).addClass('current');
				}
				else if (position == "mainmenu") {
					if ($current.prev().length > 0) {
						$current.removeClass('current');
						$current.prev().addClass('current');
					}
				}
			} else if (remoteBtnCode == '39') {
				// right arrow key
				$current = $('.current');
				position = $current.parent().get()[0].id;
				if (position == "seanson_div") {
					$current.removeClass('current');
					$("#episodelistimageload").children('div').removeClass('d-none');
					$("#episodelistimageload").children('div').eq(0).addClass('current');
				}
				else if (position == "mainmenu") {
					if ($current.next().length > 0) {
						$current.removeClass('current');
						$current.next().addClass('current');
					}
				}

			} else if (remoteBtnCode == '13') {
				$current = $('.current');
				var idd = $current.get()[0].id;
				position = $current.parent().get()[0].id;
				//alert(position);
				if (position == "mainmenu") {
					var permalink = $("#" + idd).attr('data-permalink');
					navBarCall(permalink);
				}
				if (position == "seanson_div") {

					var permalink = $("#" + idd).attr('data-perma');
					var series_number = $("#" + idd).attr('series-id');
					$('#spinner').show();
					CallepisodeDetailsApi(series_number, permalink);

				} else {
					if (localStorage.getItem("loginstr") == null) {
						$(location).attr('href', "pickboxlogin.html");
					} else {
						var muvi_streamunique_id = $("#" + idd).attr("data-muvi_stream-unique_id");
						var muviunique_id = $("#" + idd).attr("data-muviunique_id");
						var isFreeContent = $("#" + idd).attr("data-isFreeContent");
						if (isFreeContent == "1") {
							//alert("free");
							callGetVideoDetails(muvi_streamunique_id, muviunique_id);
						} else {
							callValidateUser(muvi_streamunique_id, muviunique_id);
						}
					}
				}
			} else if (remoteBtnCode == '10009') {
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
	});//end ready function main
};
//window.onload can work without <body onload="">
window.onload = init;

