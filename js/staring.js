var checkTime;
//Initialize function
var init = function () {
	var country = localStorage.getItem("country");
	var fullstory = "";
	var viewmore_text = '';
	var name = "";
	var modaltitle = "";
	var summary = "";
	var story = "";
	var modalstory = "";
	var modalcastimage = "";
	var castimage = "";
	var focuscolor = '#0cb9f2';
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
	$('#navhome').addClass('current');

	$('#filmographytitle').text(localStorage.getItem("filmography"));
	//console.log(localStorage.getItem("filmography"));
	if (localStorage.getItem("loginstr") != null) {
		$('#myaccounts').show();
		$('#logout').show();
	}
	$('#navbarcontent').show();
	$(document).ready(function () {
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
		var currentperm = getParameterByName("permalink", window.location.href);

		//alert(currentperm);

		var castandcrewsxhttp = new XMLHttpRequest();
		castandcrewsxhttp.onreadystatechange = function () {
			$('#spinner').show();
			if (this.readyState == 4 && this.status == 200) {
				$('#spinner').hide();
				$('#contentdiv').show();
				$('#horizonatlline').hide();
				cast_crew = JSON.parse(this.responseText);
				//console.log(cast_crew)
				if (cast_crew.summary != null) {
					fullstory = cast_crew.summary;
					var castsummary = truncate(cast_crew.summary);
				} else {
					var castsummary = "";
				}
				if (cast_crew.cast_image != null) {
					cast_image = cast_crew.cast_image;
					modalcastimage = cast_crew.cast_image;

					cast_image = '<img  src="' + cast_crew.cast_image + '" class="img-fluid border-inside">';
				}
				if (cast_crew.name != null) {
					modaltitle = cast_crew.name;
					name = '<p id="name" class="text-color" style="font-size:45px;margin-bottom: 0px;font-weight:600;">' + cast_crew.name + '</p><hr class="hrLine">';
				} else {
					name = "";
				}


				summary = '<p id="name">' + castsummary + '</p>';
				viewmore_text += '<b class="horizental_line" focusable data-permalink="viemorefocus" id="fullstory" style="font-size:30px;font-weight: normal;">Viewmore</b>';
				var setstorytomodal = '<p  style="font-size:25px;margin-top:30px;font-weight:400;color: #ccc;">' + fullstory + '</p>';

				var modalimage = '  <div style="width: 20%;float: left;">' +
					'<img  src="' + cast_crew.cast_image + '" class="img-circle"  width="170" height="160" style="margin-right:10px;margin-left:15px;border:3px solid grey">' +
					'</div><div style="margin-top: 30px;float: left;width: 50%;	margin-left: 80px;"><p class="text-color" style=" margin-bottom:0px; font-size:45px;font-weight:600;">' + cast_crew.name + '</p><hr class="hrLine"></div>';


				/*var modalimage='  <div style="width: 20%;float: left;">'+
	             '<img  src="'+cast_crew.cast_image+'" class="img-circle"  width="170" height="160" style="margin-right:10px;margin-left:15px;">'+
	            '</div><div style="margin-top:55px;float: left;width: 80%;"><p class="text-color" size="6" style=" font-size:40px;">'+name+'</p></div>';*/
				castimage = '<img class="responsive cardposter pull-right"  src="' + cast_crew.cast_image + '" >';
				//console.log(name);
				var i = 0;
				var filmography_content = "";
				var filmography_data = "";

				if (cast_crew.movieList.length > 0) {
					$('#filmographytitle').show();
					$('#filmographytitle').text(localStorage.getItem("filmography"));
				}
				var tempId = 0;
				for (i = 0; i < cast_crew.movieList.length; i++) {
					var permalink_filmography = cast_crew.movieList[i]['permalink'];
					var content_types_id_filmography = cast_crew.movieList[i]['content_types_id'];
					var castimage_filmography = cast_crew.movieList[i]['posterForTv'];
					if (i <= "3") {
						var str = cast_crew.movieList[i]['posterForTv'];
						if (str != "") {
							// filmography_content +='<div focusable class="w-20 card border-inside" id="test" data-perma='+permalink_filmography+' data-contenttype='+content_types_id_filmography+'>'+
							// '<a href="#">'+
							// '<div class="hmpageimg">'+
							// '<img id='+permalink_filmography+' data-id='+content_types_id_filmography+' src="images/lang-bg.jpg" class="img-fluid" />'+
							// '<div class="see-more text-uppercase">'+cast_crew.movieList[i]['name']+'</div>'+
							// '</div>'+
							// '</a>'+
							// '</div>';
							filmography_data += '<div class="col-lg-2 cus-langdiv" id="sec_' + i + '_' + tempId + '" data-permalink=' + permalink_filmography + ' data-contenttype=' + content_types_id_filmography + '><div class="cutom-card "> <div class="cutom-cardbody"> <img id=' + permalink_filmography + ' data-id=' + content_types_id_filmography + ' src="' + castimage_filmography + '" class="img-fluid" alt=""><p class="see-more"></p></div></div></div>';
						} else {
							filmography_data += '<div class="col-lg-2 cus-langdiv" id="sec_' + i + '_' + tempId + '" data-permalink=' + permalink_filmography + ' data-contenttype=' + content_types_id_filmography + '><div class="cutom-card "> <div class="cutom-cardbody"> <img id=' + permalink_filmography + ' data-id=' + content_types_id_filmography + ' src="images/languageimage.jpg" class="img-fluid" alt=""><p class="see-more">' + cast_crew.movieList[i]['name'] + '</p></div></div></div>'
							// filmography_content +='<div focusable class="w-20 card border-inside" id="test" data-perma='+permalink_filmography+' data-contenttype='+content_types_id_filmography+'>'+
							// '<a href="#">'+
							// '<div class="hmpageimg">'+
							// '<img id='+permalink_filmography+' data-id='+content_types_id_filmography+' src='+castimage_filmography+' class="img-fluid" />'+
							// '</div>'+
							// '</a>'+
							// '</div>';
						}
					} else if (i == "4") {
						//filmography_content +='<div focusable class="w-20 card border-inside" id="viewmore" data-perma="viewmore">'+
						//'<a href="#">'+
						//'<div class="">'+
						//'<img src="images/see-more.png" class="img-fluid" />'+
						//'</div>'+
						//'</a>'+
						//'</div>';
						//filmography_content +='<div focusable  class="card" id="viewmore" data-perma="viewmore">'+
						//'<img class="responsive card-img-top permalink"  src="images/viewmore.png" >'+
						// '</div>';
					}
					//console.log(permalink_filmography);
				}
				filmography_content += '<div class="mb-4 dataRow' + tempId + '" style="width:100%"><div class="col-lg-12 homepagecontent_div" id="homepagecontent_div">' + filmography_data + '</div></div>'

				if (summary == "") {
					$('#viemorefocus').hide();
				}
				//$('.catstposterdiv').html(castimage);
				$('#name').html(name);
				$("#cast_imagee")
					.on("error", function () {
						$(this).attr("src", "https://api.muvi.com/img/no-image.png");
					})
					.attr("src", '' + cast_crew.cast_image + '');
				//$("#cast_imagee").attr('src',''+cast_crew.cast_image+'');
				//$('cast_imagee').html(cast_image);				
				$('#summary').html(summary);
				$('#feature_content_title').html(filmography_content);
				$('#storydetails').html(setstorytomodal);
				$('#modalimage').html(modalimage);
				$('#viewmoretext').html(viewmore_text);
				$('#viemorefocus').html(localStorage.getItem("view_more"));
				if (fullstory.length < 200) {
					$('#viemorefocus').hide();
				}
			}
		};
		castandcrewsxhttp.open("GET", "" + baseurl + "getCastDetail?authToken=" + authtoken + "&permalink=" + currentperm + "&lang_code=" + lang_code + "&country=" + country + "", true);
		castandcrewsxhttp.send();

		$(document).on("click", "#filmographyimagediv", function (e) {
			var content_types_id = $(this).find("img").attr('data-id');
			var permalink = $(this).find("img").attr('id');
			if (content_types_id == 1 && content_types_id == 2 && content_types_id == 4) {
				var create_href = "Movidetails.html?permalink=" + permalink + "&content_types_id=" + content_types_id;
			} else if (content_types_id == 3) {
				var create_href = "showwithepisode.html?permalink=" + permalink + "&content_types_id=" + content_types_id;
			}
			$(location).attr('href', create_href);
		});

		function truncate(string) {
			if (string.length > 200)
				return string.substring(0, 200) + '...';
			else
				return string;
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
				if (($("#spinner").is(":visible") == true)) {
					e.preventDefault();
				} else {
					//for Up Arrow key
					var $current = $('.current');
					var currentId = $current.get()[0].id;
					var currentparentId = $current.parent().get()[0].id;
					if (currentparentId == "homepagecontent_div") {
						$current.removeClass('current');
						if ($("#viemorefocus").is(":visible")) {
							$("#viemorefocus").addClass('current');
						}
						else {
							$('#mainmenu').children().eq(0).addClass('current');
						}
					} else if (currentparentId == "viewmorediv") {
						$current.removeClass('current');
						$('#mainmenu').children().eq(0).addClass('current');
					} else if (currentparentId == "mbody") {
						if (index > 0) {
							index = index - 102;
						}
						if ($('#exampleModalCenter').is(':visible')) {
							$('#mbody').scrollView();
						}
					}
				}
			} else if (remoteBtnCode == '40') {
				if (($("#spinner").is(":visible") == true)) {
					e.preventDefault();
				} else {
					// down arrow key
					var $current = $('.current');
					var currentId = $current.get()[0].id;
					var currentparentId = $current.parent().get()[0].id;
					if (currentparentId == "mainmenu") {
						$current.removeClass('current');
						if ($("#viemorefocus").is(":visible")) {
							$("#viemorefocus").addClass('current');
						}
						else {
							$(".homepagecontent_div").children().eq(0).addClass('current');
						}

					} else if (currentparentId == "viewmorediv") {
						$current.removeClass('current');
						$(".homepagecontent_div").children().eq(0).addClass('current');
					} else if (currentparentId == "mbody") {
						if (index <= height_div) {
							index = index + 102;
						}
						if ($('#exampleModalCenter').is(':visible')) {
							$('#mbody').scrollView();
						}
					}
				}
			} else if (remoteBtnCode == '37') {
				if (($("#spinner").is(":visible") == true)) {
					e.preventDefault();
				} else {
					// left arrow key
					var $current = $('.current');
					var currentId = $current.get()[0].id;
					var currentparentId = $current.parent().get()[0].id;
					if (currentparentId == "mainmenu") {
						if ($current.prev().length > 0) {
							$current.removeClass('current');
							$current.prev().addClass('current');
						}
					}
					else {
						if ($current.prev().length > 0) {
							$current.prev().removeClass('hide');
							$current.removeClass('current');
							$current.prev().addClass('current');
						}
					}
				}

			} else if (remoteBtnCode == '39') {
				if (($("#spinner").is(":visible") == true)) {
					e.preventDefault();
				} else {
					// right arrow key
					var $current = $('.current');
					var currentparentId = $current.parent().get()[0].id;
					var currentId = $current.get()[0].id;
					if (currentparentId == "mainmenu") {
						if ($current.next().length > 0) {
							$current.removeClass('current');
							$current.next().addClass('current');
						}
					}
					else if ($current.next().length > 0) {
						var _crntPosition = parseInt(currentId.split('_')[1]);
						var temp = parseInt(currentId.split('_')[2]);
						$current.removeClass('current');
						if (_crntPosition >= 4) {
							var deletedId = _crntPosition - 4;
							$("#sec_" + deletedId + "_" + temp).addClass('hide');
							//$current.prev().prev().prev().prev().addClass('hide');
						}
						$current.next().addClass('current');
					}
				}
			} else if (remoteBtnCode == '13') {
				if (($("#spinner").is(":visible") == true)) {
					e.preventDefault();
				} else {
					// OK key
					var $current = $('.current');
					var currentId = $current.get()[0].id;
					var currentparentId = $current.parent().get()[0].id;
					var permalink = $('#' + currentId).attr('data-permalink');
					if (currentparentId === "mainmenu") {
						navBarCall(permalink);
					}
					else if (currentparentId == "viewmorediv") {
						$('#exampleModalLongTitle').html(modaltitle);
						$('#modalsummary').html(fullstory);
						$("#modal_cast_imagee").attr('src', modalcastimage);
						$("#modal_cast_imagee")
							.on("error", function () {
								$(this).attr("src", 'https://api.muvi.com/img/no-image.png');
							})
							.attr("src", modalcastimage);
						$('#exampleModalCenter').modal('show');
						$current.removeClass('current');
						$('#modalsummary').addClass('current');
					} else if (currentparentId == "mbody") {

					} else {
						var content_types_id = $('#' + currentId).attr('data-contenttype');
						//alert(content_types_id);
						if (content_types_id == "1" || content_types_id == "2" || content_types_id == "4") {
							var create_href = "singlepart.html?permalink=" + permalink;
							$(location).attr('href', create_href);
						}
						else {
							var create_href = "multipart.html?permalink=" + permalink;
							$(location).attr('href', create_href);
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
					$('#mainmenu').children().eq(0).addClass('current');
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
	});
};
window.onload = init;