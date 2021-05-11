var modalOpen = 1;
let sec_limit=3;
let sec_offset =1
let prevCounter = "";
var cuurentvalue = 0;
var init = function () {
	var country = localStorage.getItem("country");
	var homepage_response = '';
	$('#spinner').show();
	if (localStorage.getItem("authtokenstr") != null) {
		var authtoken = localStorage.getItem("authtokenstr");
		var baseurl = localStorage.getItem("baseurl");
		var lang_code = localStorage.getItem("lang_code");
		var userid = localStorage.getItem("loginstr");
	}
	globalhomepage(sec_limit, sec_offset ,"first")
	var season_info = localStorage.getItem("isRegistrationEnabled");
	//$("#home").text(localStorage.getItem("home"));
	//$("#search").text(localStorage.getItem("search"));
	//$("#category").text(localStorage.getItem("categories"));
	//$("#profile").text(localStorage.getItem("profile"));

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

	/*menu active*/
	$("#home").addClass("navActive");

function globalhomepage(sec_limit ,sec_offset,sequencecall) {
	function homePageResponse(data, textStatus, xhr) {
		console.log(data);

		if (data.code == 200) {
			homepage_response = data;
			var htmResponse = '';
			var tempId = 0;
			var i = 0;
			if (sequencecall == "first") {
				tempId = 0;
			}
			else {
                tempId = prevCounter;
              }
			
			if (homepage_response != null) {
				if (homepage_response.section_name.length > 0) {
					for (i = 0; i < homepage_response.section_name.length; i++) {
						var colmnData = '';
						for (var j = 0; j < homepage_response.section_name[i].data.length; j++) {
							var content_types_id = homepage_response.section_name[i].data[j].content_types_id;
							if (content_types_id == "1" || content_types_id == "2" || content_types_id == "3" || content_types_id == "4") {
								if (homepage_response.section_name[i].data[j].posterForTv != '') {
									colmnData += '<div class="col-lg-2 cus-langdiv" id="sec_' + j + '_' + tempId + '" content_types_id="' + homepage_response.section_name[i].data[j].content_types_id + '" data-seasonPermalink="' + homepage_response.section_name[i].data[j].season_permalink + '" data-sereseno="' + homepage_response.section_name[i].data[j].season_no + '" data-permalink="' + homepage_response.section_name[i].data[j].permalink + '" data-isEpisode="' + homepage_response.section_name[i].data[j].is_episode + '"><div class="cutom-card "> <div class="cutom-cardbody"> <img src="' + homepage_response.section_name[i].data[j].posterForTv + '" class="img-fluid" alt="" onerror="this.onerror=null;this.src=`images/no_image_tv.png`;"><p class="see-more"></p></div></div></div>';
								} else {
									// colmnData += '<div class="col-lg-2 cus-langdiv" id="sec_' + j + '_' + tempId + '" content_types_id="' + homepage_response.section_name[i].data[j].content_types_id + '" data-seasonPermalink="' + homepage_response.section_name[i].data[j].season_permalink + '" data-sereseno="' + homepage_response.section_name[i].data[j].season_no + '" data-permalink="' + homepage_response.section_name[i].data[j].permalink + '"  data-isEpisode="' + homepage_response.section_name[i].data[j].is_episode + '"><div class="cutom-card "> <div class="cutom-cardbody"> <img src="images/languageimage.jpg" class="img-fluid" alt=""><p class="see-more">' + homepage_response.section_name[i].data[j].name + '</p></div></div></div>';
									colmnData += '<div class="col-lg-2 cus-langdiv" id="sec_' + j + '_' + tempId + '" content_types_id="' + homepage_response.section_name[i].data[j].content_types_id + '" data-seasonPermalink="' + homepage_response.section_name[i].data[j].season_permalink + '" data-sereseno="' + homepage_response.section_name[i].data[j].season_no + '" data-permalink="' + homepage_response.section_name[i].data[j].permalink + '"  data-isEpisode="' + homepage_response.section_name[i].data[j].is_episode + '"><div class="cutom-card "> <div class="cutom-cardbody"> <img src="images/no_image_tv.png" class="img-fluid"></div></div></div>';
								}
							} else {
								//console.warn("Other Content");
								//colmnData += '<div class="col-lg-2 cus-langdiv" id="lang_'+j+'"><div class="cutom-card "> <div class="cutom-cardbody"> <img id="al-halaqa-al-akhera" src="images/languageimage.jpg" class="img-fluid" alt=""><p class="see-more">'+homepage_response.section_name[i].data[j].name+'</p></div></div></div>';
							}
						}
						if (colmnData != '') {
							htmResponse += '<div class="row mb-4 dataRow' + tempId + '"><div class="col-lg-12"><h3 class="cus-h3-padding">' + homepage_response.section_name[i].title + '</h3></div><div class="col-lg-12 homepagecontent_div" id="homepagecontent_div_' + tempId + '_' + tempId + '">' + colmnData + '</div></div>';
							tempId = tempId + 1;
							prevCounter = tempId;
               				
						}
						/*Spinner hide after all row complete*/
						if (homepage_response.section_name.length == (i + 1)) {
							$('#spinner').hide();
							$('#homepageSec').removeClass('hide');
						}
					}
					$('#homaMainBody').append(htmResponse);
					console.log("cuurentvalue=============="+cuurentvalue);
					if (sequencecall == "first") {
						contentDetails(0, 0);
					}
					else{

					}
					
				} else {
					if (sequencecall == "first") {
					$('#spinner').hide();
					$('#nocontent').text(localStorage.getItem("no_content"));
					$('#nocontent').show();
					}
					
				}
			}
		}
	}
	console.log();
	var bodyData = {
		authToken: authtoken,
		season_info: season_info,
		lang_code: lang_code,
		user_id: userid,
		platform: 'tv',
		feature_sec_offset:sec_offset,
		feature_sec_limit:sec_limit,
		country: country
	}

	console.log(bodyData);
	var url = baseurl + 'getAppHomeFeature';
	makePostAjaxCall(url, 60000, bodyData, homePageResponse);

}


	function currentData() {
		var $current = $('.current');
		var currentId = $current.get()[0].id;
		var currentparentId = $current.parent().get()[0].id;
		var sectionIndex = currentparentId.split('_')[3];
		var contentIndex = currentId.split('_')[1];
		contentDetails(sectionIndex, contentIndex);
	}

	function contentDetails(sectionIndex, contentIndex) {
		console.log(sectionIndex);
		console.log(homepage_response.section_name.length);
		if (homepage_response.section_name.length > 0) {
			var genrData = '';
			var name = homepage_response.section_name[sectionIndex].data[contentIndex].name;
			var story = homepage_response.section_name[sectionIndex].data[contentIndex].story;
			var year = homepage_response.section_name[sectionIndex].data[contentIndex].release_date;
			var duration = homepage_response.section_name[sectionIndex].data[contentIndex].video_duration;
			var genre = homepage_response.section_name[sectionIndex].data[contentIndex].genre;
			var imageUrl = homepage_response.section_name[sectionIndex].data[contentIndex].tv_banner;
	
			if (name != '') {
				$('.contentTitle').text(name);
				$('#titlebar').removeClass('hide');
			} else {
				$('.contentTitle').text('');
				$('#titlebar').addlass('hide');
			}
			if (year != '') {
				year = year.split('-')[0];
			}
			if (duration != '') {
				duration = convertToText(duration);
			}
			if (genre.length > 0) {
				genre = genre.slice(0, 3).join(', ');
			}
	
			if (year != '' && genre != '' && duration != '') {
				genrData = year + ' | ' + genre + ' | ' + duration;
			} else if (year == "" && genre != "" && duration != "") {
				genrData = genre + ' | ' + duration;
			} else if (year == "" && genre == "" && duration != "") {
				genrData = duration;
			} else if (year == "" && genre == "" && duration == "") {
				genrData = "";
			} else if (year != "" && genre != "" && duration == "") {
				genrData = year + ' | ' + genre;
			} else if (year != "" && genre == "" && duration != "") {
				genrData = year + ' | ' + duration;
			} else if (year == "" && genre != "" && duration == "") {
				genrData = genre;
			}
	
			if (genrData != '') {
				$("#gnrDetails").empty().append(genrData);
			}
	
			if (story != '') {
				$('.story').text(story);
			} else {
				$('.story').text('');
			}
	
			if (imageUrl != '') {
				$(".backgroungbg").css('background-image', 'url(' + imageUrl + ')');
			} else {
				imageUrl = 'images/background.png';
				$(".backgroungbg").css('background-image', 'url(' + imageUrl + ')');
			}
		}

	}

	function convertToText(duration) {
		var durationText = '';
		var splitTime = duration.split(':');
		var hour = parseInt(splitTime[0]) >= 9 ? splitTime[0] : splitTime[0][1];
		if (parseInt(hour) > 0) {
			durationText += hour + "h ";
		}
		var minute = parseInt(splitTime[1]) >= 9 ? splitTime[1] : splitTime[1][1];
		if (parseInt(minute) > 0) {
			durationText += minute + "m ";
		}
		var second = parseInt(splitTime[2]) > 9 ? splitTime[2] : splitTime[2][1];
		if (parseInt(second) > 0) {
			durationText += second + "s";
		}
		//durationText = parseInt((hour * 60)) + parseInt(minute) + "m";
		return durationText;
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
			} else if ($('#homePageModal').is(':visible') == true) {
				e.preventDefault();
			} else {
				var $current = $('.current');
				var currentId = $current.get()[0].id;
				var currentparentId = $current.parent().get()[0].id;
				if (currentparentId != "mainmenu") {
					if ($current.parent().parent().prev().length > 0) {
						$current.removeClass('current');
						$current.parent().parent().prev().removeClass('hide');
						$current.parent().parent().prev().children('div').eq(1).children('div').removeClass('hide');
						$current.parent().parent().prev().children('div').eq(1).children('div').eq(0).addClass('current');
						currentData();
					} else {
						$current.removeClass('current');
						$('#mainmenu').children().eq(0).addClass('current');
					}
				}
			}

		} else if (remoteBtnCode == '40') {
			// down arrow key
			if (($("#spinner").is(":visible") == true)) {
				e.preventDefault();
			} else if ($('#homePageModal').is(':visible') == true) {
				e.preventDefault();
			} else {
				var $current = $('.current');
				var currentId = $current.get()[0].id;
				var currentparentId = $current.parent().get()[0].id;
				if (currentparentId == "mainmenu") {
					$current.removeClass('current');
					$("#homaMainBody").children().removeClass('hide');
					$("#homaMainBody").children('div').eq(0).children('div').eq(1).children('div').eq(0).addClass('current');
				} else {
					if ($current.parent().parent().next().length > 0) {
						// $('#spinner').show();
						// $('#homepageSec').addClass('hide');
						sec_limit+= 2;
						sec_offset += 1
						globalhomepage(sec_limit , sec_offset,"second");
						
						$current.parent().parent().next().children('div').eq(1).children('div').removeClass('hide');
						var _crntPosition = parseInt(currentparentId.split('_')[2]);
					
						console.log(_crntPosition);
						$current.removeClass('current');
						if (_crntPosition >= 1) {
							var deletedId = _crntPosition - 1;
							$(".dataRow" + deletedId).addClass('hide');
						}
						$current.parent().parent().next().children('div').eq(1).children('div').eq(0).addClass('current')
						currentData();
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
				if (currentparentId == "mainmenu") {
					if ($current.prev().length > 0) {
						$current.removeClass('current');
						$current.prev().addClass('current');
					}
				} else if (currentparentId == "btn-container") {
					if ($current.prev().length > 0) {
						$current.removeClass('current');
						$current.prev().addClass('current');
					}
				} else {
					if ($current.prev().length > 0) {
						$current.prev().removeClass('hide');
						$current.removeClass('current');
						$current.prev().addClass('current');
						currentData();
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
				if (currentparentId == "mainmenu") {
					if ($current.next().length > 0) {
						$current.removeClass('current');
						$current.next().addClass('current');
					}
				} else if (currentparentId == "btn-container") {
					if ($current.next().length > 0) {
						$current.removeClass('current');
						$current.next().addClass('current');
					}
				} else {
					if ($current.next().length > 0) {
						var _crntPosition = parseInt(currentId.split('_')[1]);
						var temp = parseInt(currentId.split('_')[2]);
						$current.removeClass('current');
						if (_crntPosition >= 4) {
							var deletedId = _crntPosition - 4;
							$("#sec_" + deletedId + "_" + temp).addClass('hide');
							//$current.prev().prev().prev().prev().addClass('hide');
						}
						$current.next().addClass('current');
						currentData();
					}
				}
			}
		} else if (remoteBtnCode == '13') {
			// OK key
			var $current = $('.current');
			var currentId = $current.get()[0].id;
			var currentparentId = $current.parent().get()[0].id;
			var permalink = $('#' + currentId).attr('data-permalink');
			if (currentparentId === "mainmenu") {
				navBarCall(permalink);
			} else if (currentparentId == "btn-container") {
				if (currentId == "noBtn") {
					$('#homePageModal').modal('hide');
					$current.removeClass('current');
					$('#mainmenu').children().eq(0).addClass('current');
				} else {
					localStorage.setItem("appExit", 1)
					$('#homePageModal').modal('hide');
					tizen.application.getCurrentApplication().exit();
				}
			} else {
				var content_types_id = $('#' + currentId).attr('content_types_id');
				var is_episode = $('#' + currentId).attr('data-isepisode');
				if (content_types_id == "1" || content_types_id == "2" || content_types_id == "4") {
					var create_href = "singlepart.html?permalink=" + permalink;
					$(location).attr('href', create_href);
				}
				else if (content_types_id == "3") {
					if (is_episode == "2") {
						var childpermalink = $('#' + currentId).attr('data-seasonPermalink');
						var currentperm = $('#' + currentId).attr('data-permalink');
						var sereseno = $('#' + currentId).attr('data-sereseno');
						window.location.href = "seasondetails.html?childpermalink=" + childpermalink + "&permalink=" + currentperm + "&series_number=" + sereseno;
					}
					else if (is_episode == "0" || is_episode == "1") {
						var create_href = "multipart.html?permalink=" + permalink + "&is_episode=" + is_episode;
						$(location).attr('href', create_href);
					}
					else {
						var create_href = "multipart.html?permalink=" + permalink;
						$(location).attr('href', create_href);
					}
				}
			}
		} else if (remoteBtnCode == '10009') {
			if (modalOpen == 1) {
				modalOpen = 0;
				setTimeout(function () {
					modalOpen = 1;
				}, 3000);

				$('#spinner').hide();
				if ($('#homePageModal').is(':visible') == true) {
					var $current = $('.current');
					var currentId = $current.get()[0].id;
					var currentparentId = $current.parent().get()[0].id;
					if (currentparentId == "btn-container") {
						$('#homePageModal').modal('hide');
						$current.removeClass('current');
						$('#mainmenu').children().eq(0).addClass('current');
					}
					modalOpen = 1;
				} else {
					var $current = $('.current');
					var currentId = $current.get()[0].id;
					var currentparentId = $current.parent().get()[0].id;
					$current.removeClass('current');
					$('#yesBtn').addClass('current');
					$("#homePageModalTitle").text(localStorage.getItem("app_exit_message"));
					$('#homePageModal').modal('show');
				}
				localStorage.removeItem("sortbypermalink");
				localStorage.removeItem("generstringdata");
				localStorage.removeItem("keyindex");
			}

			// $('#spinner').hide();
			// if ($('#homePageModal').is(':visible') == true) {
			// 	var $current = $('.current');
			// 	var currentId = $current.get()[0].id;
			// 	var currentparentId = $current.parent().get()[0].id;
			// 	if (currentparentId == "btn-container") {
			// 		$('#homePageModal').modal('hide');
			// 		$current.removeClass('current');
			// 		$('#mainmenu').children().eq(0).addClass('current');
			// 	}
			// } else {
			// 	var $current = $('.current');
			// 	var currentId = $current.get()[0].id;
			// 	var currentparentId = $current.parent().get()[0].id;
			// 	$current.removeClass('current');
			// 	$('#yesBtn').addClass('current');
			// 	$("#homePageModalTitle").text(localStorage.getItem("app_exit_message"));
			// 	$('#homePageModal').modal('show');
			// }
			// localStorage.removeItem("sortbypermalink");
			// localStorage.removeItem("generstringdata");
			// localStorage.removeItem("keyindex");
		}
	}
	//Remote Function//

}//end

window.onload = init;