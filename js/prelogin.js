//Initialize function
var init = function () {
	if (typeof window.tizen !== "undefined") {
		window.tizen.tvinputdevice.registerKey('Exit');
	}
	if (localStorage.getItem("authtokenstr") != null) {
		var authtoken = localStorage.getItem("authtokenstr");
		var baseurl = localStorage.getItem("baseurl");
	}
	$("#registerButton").text(localStorage.getItem("btn_register"));
	$("#loginButton").text(localStorage.getItem("login"));

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
		} else if (remoteBtnCode == '40') {
			// down arrow key
		} else if (remoteBtnCode == '37') {
			// left arrow key
			var $current = $('.current');
			var currentparentId = $current.parent().get()[0].id;
			if (currentparentId === "preLoginId") {
				if ($current.prev().length > 0) {
					$current.removeClass('current');
					$current.prev().addClass('current');
				}
			}
		} else if (remoteBtnCode == '39') {
			// right arrow key
			var $current = $('.current');
			var currentparentId = $current.parent().get()[0].id;
			if (currentparentId === "preLoginId") {
				if ($current.next().length > 0) {
					$current.removeClass('current');
					$current.next().addClass('current');
				}
			}
		}
		else if (remoteBtnCode == '13') {
			// OK key
			var $current = $('.current');
			var currentparentId = $current.get()[0].id;
			if (currentparentId != null) {
				if (localStorage.getItem("loginstr") == null) {
					if (currentparentId === "login") {
						$(location).attr('href', "login.html");
					} else if (currentparentId === "register") {
						$(location).attr('href', "register.html");
					}
				} else {
					window.location.href = "login.html";
				}
			}
		}
		else if (remoteBtnCode == '10009') {
			//RETURN button
			$(location).attr('href', "languagelisting.html");
		} else if (remoteBtnCode == '10182') {
			localStorage.setItem("AppExit", "yes")
			window.tizen.application.getCurrentApplication().exit();
		}
	}
};
window.onload = init;

