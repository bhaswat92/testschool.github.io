var init = function () {
	var country = localStorage.getItem("country");
	$('#searchInput').val('');
	var searchresponse = '';
	// $('#spinner').hide();
	if (localStorage.getItem("authtokenstr") != null) {
		var authtoken = localStorage.getItem("authtokenstr");
		var baseurl = localStorage.getItem("baseurl");
		var lang_code = localStorage.getItem("lang_code");
		var userid = localStorage.getItem("loginstr");
	}
	var season_info = localStorage.getItem("isRegistrationEnabled");

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
	$('#navsearch').addClass('current');
	/*menu active*/
	$("#search").addClass("navActive");

	function searchCall() {
		let searchvalue = $('#searchInput').val();
		var DATA = "authToken=" + authtoken + "&season_info= " + season_info + "&q=" + searchvalue + "&lang_code=" + lang_code + "&country=" + country + "&limit=500";
		var URL = "" + baseurl + "searchData?" + DATA;
		if (searchvalue != '') {
			$('#spinner').show();
			function searchApiResponse(data, textStatus, xhr) {
				searchresponse = data;
				console.log(searchresponse);
				if (searchresponse.code === 200) {
					$('#spinner').hide();
					var searchApndData = '';
					if (searchresponse.search.length > 0) {
						var j = 0;
						var k = 0;
						for (var i = 0; i < searchresponse.search.length; i++) {
							var posterForTv = ''
							var title = '';
							var genre = '';
							var year = '';
							var duration = '';
							var genrData = '';
							if (searchresponse.search[i].hasOwnProperty('title') && searchresponse.search[i].title != '') {
								title = searchresponse.search[i].title;
							}
							if (searchresponse.search[i].hasOwnProperty('genres') && searchresponse.search[i].genres.length > 0) {
								genre = searchresponse.search[i].genres.join(', ');
							}
							if (searchresponse.search[i].hasOwnProperty('release_date') && searchresponse.search[i].release_date != '') {
								year = searchresponse.search[i].release_date.split('-')[0];

							}
							if (searchresponse.search[i].hasOwnProperty('video_duration') && searchresponse.search[i].video_duration != '') {
								duration = convertToText(searchresponse.search[i].video_duration);
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

							if (searchresponse.search[i].posterForTv != '') {
								posterForTv = searchresponse.search[i].posterForTv;
							} else {
								// posterForTv = 'images/languageimage.jpg';
								posterForTv = 'images/no_image_tv.png';
							}
							var content_types_id = searchresponse.search[i].content_types_id;

							if (content_types_id == "1" || content_types_id == "2" || content_types_id == "3" || content_types_id == "4") {
								j = j + 1;
								if ((j % 2) == 1) {
									k++;
								}
								//searchApndData += '<div class="searchCard favRow'+k+'" id="search_'+k+'_'+j+'" content_types_id="'+searchresponse.search[i].content_types_id+'" data-permalink="'+searchresponse.search[i].permalink+'"><div class="searchCardContainer"><div class="searchimg"><img src="'+posterForTv+'" class="img-fluid"></div><div class="searchDtls"><p class="name">'+title+'</p><div class="srchTitleBar"></div><p><span class="year">'+year+'</span> &nbsp;<span class="fstArr">|</span> &nbsp;<span class="genre">'+genre+'</span> &nbsp;<span class="scndArr">|</span> &nbsp;<span class="duration">'+duration+'</span></p></div></div></div>';
								searchApndData += '<div class="searchCard favRow' + k + '" id="search_' + k + '_' + j + '" content_types_id="' + searchresponse.search[i].content_types_id + '" data-permalink="' + searchresponse.search[i].permalink + '" data-sereseno="' + searchresponse.search[i].season_number + '" data-seasonPermalink="' + searchresponse.search[i].season_permalink + '" data-isEpisode="' + searchresponse.search[i].is_episode + '"><div class="searchCardContainer"><div class="searchimg"><img src="' + posterForTv + '" class="img-fluid"></div><div class="searchDtls"><p class="name">' + title + '</p><div class="srchTitleBar"></div><p>' + genrData + '</p></div></div></div>';
							}
						}
						$('.searchResponse').empty().append(searchApndData);
					} else {
						$('.searchResponse').empty();
						$('#spinner').hide();
						$('#nocontent').text(localStorage.getItem("no_content"));
						$('#nocontent').show();
						var timer = setTimeout(function () {
							$('#nocontent').hide();
						}, 5000);
					}
				}
			}
			makeGetAjaxCall(URL, 30000, searchApiResponse);
		} else {
			$('#nocontent').text('Enter text to search');
			$('#nocontent').show();
			var timer = setTimeout(function () {
				$('#nocontent').hide();
			}, 5000);
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
		//durationText = parseInt((hour * 60)) + parseInt(minute) + "m ";

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
			} else {
				var $current = $('.current');
				var currentId = $current.get()[0].id;
				var currentparentId = $current.parent().get()[0].id;
				if (currentparentId == "searchResponse") {
					var rowPosition = parseInt(currentId.split('_')[1]);
					//console.log(rowPosition);
					var index = parseInt(currentId.split('_')[2]);
					//console.log(index);
					var prevId = index - 2;
					var prevRowPosition = rowPosition - 1;
					if ($('#search_' + prevRowPosition + '_' + prevId).length > 0) {
						$current.removeClass('current');
						$('.favRow' + (rowPosition - 2)).removeClass('d-none');
						$('#search_' + prevRowPosition + '_' + prevId).addClass('current');
					} else {
						$current.removeClass('current');
						$('#searchInput').addClass('current');
					}
				}
				else if (currentparentId == "searchBtnContain") {
					$("#searchInput").blur();
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
					//$('#searchInput').focus();
					$current.removeClass("current");
					$('#searchInput').addClass("current");
				} else if (currentparentId === "searchBtnContain") {
					if ($('.searchResponse').children().length > 0) {
						$current.removeClass("current");
						$("#searchInput").blur();
						$('.searchResponse').children().eq(0).addClass('current');
					}
				} else if (currentparentId == "searchResponse") {
					var rowPosition = parseInt(currentId.split('_')[1]);
					//console.log(rowPosition);
					var index = parseInt(currentId.split('_')[2]);
					//console.log(index);
					var nextId = index + 2;
					var nextRowPosition = rowPosition + 1;
					if ($('#search_' + nextRowPosition + '_' + nextId).length > 0) {
						if (rowPosition > 4 && (rowPosition % 2) == 0 || (rowPosition % 2) == 1) {
							$current.removeClass('current');
							$('.favRow' + (rowPosition - 4)).addClass('d-none');
							$('#search_' + nextRowPosition + '_' + nextId).addClass('current');
						} else {
							$current.removeClass('current');
							$('#search_' + nextRowPosition + '_' + nextId).addClass('current');
						}
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
				var currentId = $current.get()[0].id;
				if (currentparentId == "mainmenu") {
					if ($current.prev().length > 0) {
						$current.removeClass('current');
						$current.prev().addClass('current');
					}
				} else if (currentparentId == "searchBtnContain") {
					$current.removeClass('current');
					$('#searchInput').addClass('current');
				} else if (currentparentId == "searchResponse") {
					if ($current.prev().length > 0) {
						var rowPosition = parseInt(currentId.split('_')[1]);
						//console.log(rowPosition);
						var index = parseInt(currentId.split('_')[2]);
						//console.log(index);
						var nextId = index - 1;
						var nextRowPosition = rowPosition - 1;
						if ((index % 2) == 1) {
							$current.removeClass('current');
							$('.favRow' + (rowPosition - 3)).removeClass('d-none');
							$current.prev().addClass('current');
						} else {
							$current.removeClass('current');
							$current.prev().addClass('current');
						}
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
					if ($current.next().length > 0) {
						$current.removeClass('current');
						$current.next().addClass('current');
					}
				} else if (currentparentId == "inputGroup") {
					$("#searchInput").blur();
					$current.removeClass('current');
					$('#searchBtn').addClass('current');
				} else if (currentparentId == "searchResponse") {
					if ($current.next().length > 0) {
						var rowPosition = parseInt(currentId.split('_')[1]);
						//console.log(rowPosition);
						var index = parseInt(currentId.split('_')[2]);
						//console.log(index);
						var nextId = index + 1;
						var nextRowPosition = rowPosition + 1;
						if (rowPosition > 4 && (index % 2) == 0) {
							$current.removeClass('current');
							$('.favRow' + (rowPosition - 4)).addClass('d-none');
							$current.next().addClass('current');
						} else {
							$current.removeClass('current');
							$current.next().addClass('current');
						}
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
			} else if (currentparentId == "searchBtnContain") {
				$('#searchInput').focus();
			} else if (currentparentId == "searchResponse") {
				var permalink = $('#' + currentId).attr('data-permalink');
				var content_types_id = $('#' + currentId).attr('content_types_id');
				var is_episode = $('#' + currentId).attr('data-isepisode');
				if (content_types_id == "1" || content_types_id == "2" || content_types_id == "4") {
					//console.log('single');
					var create_href = "singlepart.html?permalink=" + permalink;
					$(location).attr('href', create_href);
				}
				else if (content_types_id == "3") {
					var create_href = "multipart.html?permalink=" + permalink;
					$(location).attr('href', create_href);
					// if(is_episode == "2"){
					// 	var childpermalink = $('#'+currentId).attr('data-seasonpermalink');
					// 	var currentperm = $('#'+currentId).attr('data-permalink');
					// 	var sereseno = $('#'+currentId).attr('data-sereseno');

					// 	window.location.href="seasondetails.html?childpermalink="+childpermalink+"&permalink="+currentperm+"&series_number="+sereseno;
					// }
					// else if(is_episode == "0" || is_episode == "1"){
					// 	var create_href = "multipart.html?permalink="+ permalink +"&is_episode="+ is_episode;
					// 	$(location).attr('href', create_href);
					// }
					// else{
					// 	var create_href = "multipart.html?permalink=" + permalink;
					// 	$(location).attr('href', create_href);
					// }
				}
			}
		} else if (remoteBtnCode == '65376') {
			var $current = $('.current');
			var currentId = $current.get()[0].id;
			var currentparentId = $current.parent().get()[0].id;
			if (currentparentId == "searchBtnContain") {
				$("#searchInput").blur();
				searchCall();
			}
		}
		else if (remoteBtnCode == '10009') {
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
	//Remote Function//
}//end
window.onload = init;