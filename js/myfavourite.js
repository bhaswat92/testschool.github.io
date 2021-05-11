let init = function () {


	$('#spinner').show();
	if (localStorage.getItem("authtokenstr") != null) {
		var authtoken = localStorage.getItem("authtokenstr");
		var baseurl = localStorage.getItem("baseurl");
		var lang_code = localStorage.getItem("lang_code");
		var userid = localStorage.getItem("loginstr");
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
	$('#navmyfavourite').addClass('current');
	$('.singleheader').text(localStorage.getItem("my_favourite"));
	/*menu active*/
	$("#myfavourite").addClass("navActive");

	function countResponse(data, textStatus, xhr) {
		favouriteData(data.item_count);
	}
	var DATA = "authToken=" + authtoken + "&user_id=" + userid + "&lang_code=" + lang_code;
	var URL = baseurl + "ViewFavourite?" + DATA;
	makeGetAjaxCall(URL, 30000, countResponse);

	function favouriteData(limit) {
		var favoriteData = "authToken=" + authtoken + "&user_id=" + userid + "&lang_code=" + lang_code + "&limit=" + limit;
		var favoriteUrl = baseurl + "ViewFavourite?" + favoriteData;
		console.log(favoriteUrl);
		function favResponse(data, textStatus, xhr) {
			let myfav_response = data;
			if (myfav_response.status == 200) {
				//$('#spinner').hide();
				if (myfav_response.movieList.length > 0) {
					var favoriteData = '';
					var j = 0;
					var k = 0;
					for (var i = 0; i < myfav_response.movieList.length; i++) {
						var content_types_id = myfav_response.movieList[i].content_types_id;
						if (content_types_id == "1" || content_types_id == "2" || content_types_id == "3" || content_types_id == "4") {
							j = j + 1;
							if ((j % 4) == 1) {
								k++;
							}
							var rand = Math.floor(Math.random() * 90 + 10);
							if (myfav_response.movieList[i].posterForTv != '') {
								favoriteData += '<div class="cusWidth cus-langdiv favRow' + k + '" id="favCol' + rand + '_' + k + '" position="' + j + '" content_types_id="' + myfav_response.movieList[i].content_types_id + '" data-permalink="' + myfav_response.movieList[i].permalink + '"><div class="cutom-card"> <div class="cutom-cardbody"> <img src="' + myfav_response.movieList[i].posterForTv + '" class="img-fluid" alt=""><p class="see-more"></p></div></div></div>';
							} else {
								// favoriteData += '<div class="cusWidth cus-langdiv favRow' + k + '" id="favCol' + rand + '_' + k + '" position="' + j + '" content_types_id="' + myfav_response.movieList[i].content_types_id + '" data-permalink="' + myfav_response.movieList[i].permalink + '"><div class="cutom-card"> <div class="cutom-cardbody"> <img src="images/languageimage.jpg" class="img-fluid" alt=""><p class="see-more">' + myfav_response.movieList[i].name + '</p></div></div></div>';
								favoriteData += '<div class="cusWidth cus-langdiv favRow' + k + '" id="favCol' + rand + '_' + k + '" position="' + j + '" content_types_id="' + myfav_response.movieList[i].content_types_id + '" data-permalink="' + myfav_response.movieList[i].permalink + '"><div class="cutom-card"> <div class="cutom-cardbody"> <img src="images/no_image_tv.png" class="img-fluid" alt=""></div></div></div>';
							}
						} else {
							console.warn("Other Content");
						}
						if (myfav_response.movieList.length == (i + 1)) {
							$('#spinner').hide();
							$('#favouriteSecBody').removeClass('hide');
						}
					}
					$('#nocontent').hide();
					if (favoriteData != '') {
						$('.favouriteSec').empty().append(favoriteData);
					}
				} else {
					$('#spinner').hide();
					$('#nocontent').text(localStorage.getItem("no_content"));
					$('#nocontent').show();
					$('#favouriteSecBody').removeClass('hide');
				}
			} else {
				$('#spinner').hide();
				$('#nocontent').text(localStorage.getItem("no_content"));
				$('#nocontent').show();
				$('#favouriteSecBody').removeClass('hide');
			}
		}
		makeGetAjaxCall(URL, 30000, favResponse);
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
				if (currentparentId === "favouriteSec") {
					var position = parseInt($('#' + currentId).attr('position'));
					var activePosition = position - 4;
					if ($('[position=' + activePosition + ']').length > 0) {
						$current.removeClass("current");
						if (position >= 9) {
							var deletedIndex = (parseInt(currentId.split("_")[1])) - 2;
							$('.favRow' + deletedIndex).removeClass('hide');
						}
						$('[position=' + activePosition + ']').addClass("current");
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
			} else {
				var $current = $('.current');
				var currentId = $current.get()[0].id;
				var currentparentId = $current.parent().get()[0].id;
				if (currentparentId === "mainmenu") {
					if ($("#favouriteSec").children().length != 0) {
						$current.removeClass("current");
						$('.favouriteSec').children().eq(0).addClass("current");
					}
				} else if (currentparentId === "favouriteSec") {
					var position = parseInt($('#' + currentId).attr('position'));
					var activePosition = position + 4;
					if ($('[position=' + activePosition + ']').length > 0) {
						$current.removeClass("current");
						if (position >= 9) {
							var deletedIndex = (parseInt(currentId.split("_")[1])) - 2;
							$('.favRow' + deletedIndex).addClass('hide');
						}
						$('[position=' + activePosition + ']').addClass("current");
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
				} else if (currentparentId === "favouriteSec") {
					if ($current.prev().length > 0) {
						$current.removeClass('current');
						var position = parseInt($('#' + currentId).attr('position'));
						if ((position % 4) == 1) {
							var deletedIndex = (parseInt(currentId.split("_")[1])) - 2;
							$('.favRow' + deletedIndex).removeClass('hide');
						}
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
				var currentparentId = $current.parent().get()[0].id;
				var currentId = $current.get()[0].id;
				//console.log(currentparentId)
				if (currentparentId == "mainmenu") {
					if ($current.next().length > 0) {
						$current.removeClass('current');
						$current.next().addClass('current');
					}
				} else if (currentparentId === "favouriteSec") {
					if ($current.next().length > 0) {
						$current.removeClass('current');
						var position = parseInt($('#' + currentId).attr('position'));
						if (position >= 12 && (position % 4) == 0) {
							var deletedIndex = (parseInt(currentId.split("_")[1])) - 2;
							$('.favRow' + deletedIndex).addClass('hide');
						}
						$current.next().addClass('current');
					}
				}
			}
		} else if (remoteBtnCode == '13') {
			// OK key
			var $current = $('.current');
			var currentId = $current.get()[0].id;
			var currentparentId = $current.parent().get()[0].id;
			var permalink = $('#' + currentId).attr('data-permalink');
			if (currentparentId == "mainmenu") {
				navBarCall(permalink);
			} else {
				var content_types_id = $('#' + currentId).attr('content_types_id');
				if (content_types_id == "1" || content_types_id == "2" || content_types_id == "4") {
					//console.log('single');
					var create_href = "singlepart.html?permalink=" + permalink;
					$(location).attr('href', create_href);
				}
				else {
					//console.log('multi');
					var create_href = "multipart.html?permalink=" + permalink;
					$(location).attr('href', create_href);
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
	//Remote Function/

}//end
window.onload = init;