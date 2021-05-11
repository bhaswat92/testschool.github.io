var init = function () {
	if (typeof window.tizen !== "undefined") {
		window.tizen.tvinputdevice.registerKey('Exit');
	}
	localStorage.setItem("internet_slow", "Slow Internet Connection");
	localStorage.setItem("server_down", "Server is currently down");
	localStorage.setItem("no_internet_connection", "No_internet_connection");

	$('#spinner').show();
	if (localStorage.getItem("my_language") != null) {
		$("#selectLang").text(localStorage.getItem("my_language"));
	} else {
		$("#selectLang").text("Select Language");
	}
	if (localStorage.getItem("continue") != null) {
		$('.continue').text(localStorage.getItem("continue"));
	} else {
		$('.continue').text("Continue");
	}
	if (localStorage.getItem("authtokenstr") != null) {
		var authtoken = localStorage.getItem("authtokenstr");
		var baseurl = localStorage.getItem("baseurl");
		var lang_code = localStorage.getItem("lang_code");
	}

	function languageListResponse(data, textStatus, xhr) {
		console.log(data);
		var languageDiv = '';
		if (data.code == 200) {
			$('#spinner').hide();
			for (i = 0; i < data.lang_list.length; i++) {
				if (i == 0) {
					languageDiv += '<div class="col-lg-2 cus-langdiv current activeLang" id="lang_' + i + '" data-code=' + data.lang_list[i].code + ' ><div class="card "> <div class="card-body"> <p>' + data.lang_list[i].language + '</p></div></div></div>';
				} else {
					languageDiv += '<div class="col-lg-2 cus-langdiv" id="lang_' + i + '" data-code=' + data.lang_list[i].code + ' ><div class="card"> <div class="card-body"> <p>' + data.lang_list[i].language + '</p></div></div></div>';
				}
			}
			$('#language-div').empty().append(languageDiv);
			// $("#continue").show();
		} else {
			$('#nocontent').text("No Response From Server!!");
			$('#nocontent').show();
			setTimeout(() => {
				$('#nocontent').hide();
				location.reload(true);
			}, 5000);
		}
	}
	var URL = localStorage.getItem("baseurl") + "getLanguagelist?authToken=" + localStorage.getItem("authtokenstr");
	makeGetAjaxCall(URL, 15000, languageListResponse)


	//	TextTranslation Function //
	function getTextTranslation(lang_code) {
		function textTranslationResponse(data, textStatus, xhr) {
			console.log(data);
			if (data.code == "200") {
				$('#spinner').hide();
				/*common*/
				if (data.translation.slow_internet_connection != '') {
					localStorage.setItem("internet_slow", data.translation.slow_internet_connection);
				} else {
					localStorage.setItem("internet_slow", "Slow Internet Connection");
				}

				if (data.translation.slow_internet_connection != '') {
					localStorage.setItem("slow_issue_internet_connection", data.translation.slow_issue_internet_connection);
				} else {
					localStorage.setItem("slow_issue_internet_connection", "Slow Internet connection or there's a problem");
				}

				/*Navbar section*/
				if (data.translation.home != '') {
					localStorage.setItem("home", data.translation.home);
				} else {
					localStorage.setItem("home", "Home");
				}

				if (data.translation.text_search_placeholder != '') {
					localStorage.setItem("search", data.translation.text_search_placeholder);
				} else {
					localStorage.setItem("search", "Search");
				}

				if (data.translation.category != '') {
					localStorage.setItem("categories", data.translation.category);
				} else {
					localStorage.setItem("categories", "Categories");
				}

				if (data.translation.my_favourite != '') {
					localStorage.setItem("my_favourite", data.translation.my_favourite);
				} else {
					localStorage.setItem("my_favourite", "My Favourite");
				}

				if (data.translation.watch_history != '') {
					localStorage.setItem("watch_history", data.translation.watch_history);
				} else {
					localStorage.setItem("watch_history", "Watch History");
				}

				if (data.translation.my_library != '') {
					localStorage.setItem("my_library", data.translation.my_library);
				} else {
					localStorage.setItem("my_library", "My Library");
				}

				if (data.translation.profile != '') {
					localStorage.setItem("profile", data.translation.profile);
				} else {
					localStorage.setItem("profile", "Profile");
				}

				/*Profile Page*/
				if (data.translation.my_profile != '') {
					localStorage.setItem("my_profile", data.translation.my_profile);
				} else {
					localStorage.setItem("my_profile", "My Profile");
				}

				if (data.translation.app_select_language != '') {
					localStorage.setItem("my_language", data.translation.app_select_language);
				} else {
					localStorage.setItem("my_language", "Select Your Language");
				}

				if (data.translation.continue != '') {
					localStorage.setItem("continue", data.translation.continue);
				} else {
					localStorage.setItem("continue", "Continue");
				}


				if (data.translation.my_subscription != '') {
					localStorage.setItem("my_subsciption", data.translation.my_subscription);
				} else {
					localStorage.setItem("my_subsciption", "My Subscription");
				}

				if (data.translation.logout != '') {
					localStorage.setItem("logout", data.translation.logout);
				} else {
					localStorage.setItem("logout", "Logout");
				}

				if (data.translation.hasOwnProperty('no_data_plan') && data.translation.no_data_plan != '') {
					localStorage.setItem("no_data_plan", data.translation.no_data_plan);
				} else {
					localStorage.setItem("no_data_plan", "No Plan Available");
				}

				if (data.translation.btn_update_profile != '') {
					localStorage.setItem("btn_update_profile", data.translation.btn_update_profile);
				} else {
					localStorage.setItem("btn_update_profile", "Update Profile");
				}

				if (data.translation.save_continue != '') {
					localStorage.setItem("save_continue", data.translation.save_continue);
				} else {
					localStorage.setItem("save_continue", "Save & Continue");
				}

				if (data.translation.profile_updated != '') {
					localStorage.setItem("profile_updated", data.translation.profile_updated);
				} else {
					localStorage.setItem("profile_updated", "Profile updated successfully.");
				}

				if (data.translation.required_default_msg != '') {
					localStorage.setItem("required_default_msg", data.translation.required_default_msg);
				} else {
					localStorage.setItem("required_default_msg", "This field is required");
				}

				if (data.translation.password_donot_match != '') {
					localStorage.setItem("password_donot_match", data.translation.password_donot_match);
				} else {
					localStorage.setItem("password_donot_match", "Passwords do not match");
				}

				if (data.translation.password_atleast_6_char != '') {
					localStorage.setItem("password_atleast_6_char", data.translation.password_atleast_6_char);
				} else {
					localStorage.setItem("password_atleast_6_char", "Password must be of at least 6 characters");
				}

				localStorage.setItem("login", data.translation.login);
				localStorage.setItem("resume_playing", data.translation.resume_playing);
				localStorage.setItem("logout_success", data.translation.logout_success);
				localStorage.setItem("current_password", data.translation.current_password);
				localStorage.setItem("filter", data.translation.filter);
				localStorage.setItem("filter_by", data.translation.filter_by);
				localStorage.setItem("sort_by", data.translation.sort_by);
				localStorage.setItem("no_content", data.translation.not_found);
				localStorage.setItem("episodes_title", data.translation.episodes_title);
				localStorage.setItem("app_exit_message", data.translation.app_exit_message);
				localStorage.setItem("change_password", data.translation.change_password);
				localStorage.setItem("btn_register", data.translation.btn_register);
				localStorage.setItem("email_address", data.translation.email_address);
				localStorage.setItem("btn_submit", data.translation.btn_submit);
				localStorage.setItem("password", data.translation.text_password_placeholder);
				localStorage.setItem("forgot_password", data.translation.forgot_password);
				localStorage.setItem("new_here_title", data.translation.new_here_title);
				localStorage.setItem("see_more", data.translation.more);
				localStorage.setItem("register_here", data.translation.register_here);
				localStorage.setItem("text_name", data.translation.text_name);
				localStorage.setItem("confirm_password", data.translation.confirm_password);
				localStorage.setItem("btn_register", data.translation.btn_register);
				localStorage.setItem("see_more", data.translation.more);
				localStorage.setItem("recently_played", data.translation.recently_played);
				localStorage.setItem("add_to_fav", data.translation.add_to_fav);
				localStorage.setItem("added_to_fav", data.translation.added_to_fav);
				localStorage.setItem("content_remove_favourite", data.translation.content_remove_favourite);
				localStorage.setItem("view_trailer", data.translation.view_trailer);
				localStorage.setItem("watch_now", data.translation.watch_now);
				localStorage.setItem("episodes_title", data.translation.episodes_title);
				localStorage.setItem("filmography", data.translation.filmography);
				localStorage.setItem("view_more", data.translation.view_more);
				localStorage.setItem("season", data.translation.season);
				localStorage.setItem("user_profile", data.translation.user_profile);
				localStorage.setItem("new_password", data.translation.new_password);
				localStorage.setItem("confirm_password", data.translation.confirm_password);

				// New Added 
				if (data.translation.email_password_invalid != '' || data.translation.hasOwnProperty("email_password_invalid")) {
					localStorage.setItem("email_password_invalid", data.translation.email_password_invalid);
				} else {
					localStorage.setItem("email_password_invalid", "Email or Password is invalid!");
				}

				if (data.translation.no_internet_connection != '' || data.translation.hasOwnProperty("no_internet_connection")) {
					localStorage.setItem("no_internet_connection", data.translation.no_internet_connection);
				} else {
					localStorage.setItem("no_internet_connection", "No_internet_connection");
				}

				if (localStorage.getItem("loginstr") != null) {
					window.location.href = "homepage.html"
				} else {
					$(location).attr('href', "preLogin.html");
				}
			}
		}
		var URL = localStorage.getItem("baseurl") + "textTranslation?authToken=" + localStorage.getItem("authtokenstr") + "&lang_code=" + lang_code;
		makeGetAjaxCall(URL, 20000, textTranslationResponse);
	}
	//	TextTranslation Function //

	//	Remote Function //
	document.onkeydown = checkKey;
	function checkKey(e) {
		e = e || window.event;

		if (e.keyCode == '38') {
			//for Up Arrow key (no required)

		} else if (e.keyCode == '40') {
			// down arrow key (no required)

		} else if (e.keyCode == '37') {
			// left arrow key
			var $current = $('.current');
			var currentParentId = $current.parent().get()[0].id;
			if (currentParentId === 'language-div') {
				if ($current.prev().length > 0) {
					$current.prev().removeClass('hide');
					$current.removeClass('current');
					$current.prev().addClass('current');
				}else{
					localStorage.setItem("AppExit", "yes")
					window.tizen.application.getCurrentApplication().exit();
				}
			}
		} else if (e.keyCode == '39') {
			// right arrow key
			var $current = $('.current');
			var currentParentId = $current.parent().get()[0].id;
			if (currentParentId === 'language-div') {
				if ($current.next().length > 0) {
					var currentId = $current.get()[0].id;
					var _crntPosition = parseInt(currentId.split('_')[1]);
					$current.removeClass('current');
					if (_crntPosition >= 4) {
						var _deletePosition = _crntPosition - 4;
						$('#lang_' + _deletePosition).addClass('hide');
					}
					$current.next().addClass('current');
				}
			}
		}
		else if (e.keyCode == '13') {
			// OK key
			var $current = $('.current');
			var currentId = $current.get()[0].id;
			var lang_code = $('#' + currentId).attr('data-code');
			localStorage.setItem("lang_code", lang_code);
			localStorage.setItem("Slected_language", currentId);
			getTextTranslation(lang_code);
		}
		else if (e.keyCode == '10009') {
			tizen.application.getCurrentApplication().exit();
		} else if (e.keyCode == '10182') {
			localStorage.setItem("AppExit", "yes")
			window.tizen.application.getCurrentApplication().exit();
		}

	}

}//end
window.onload = init;

