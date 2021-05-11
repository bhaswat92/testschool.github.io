//var mainfocus = 0;
var init = function () {
    if (typeof window.tizen !== "undefined") {
        var usedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Exit'];
        usedKeys.forEach(
            function (keyName) {
                tizen.tvinputdevice.registerKey(keyName);
            }
        );
    }
	if (localStorage.getItem("authtokenstr") != null) {
		var authtoken = localStorage.getItem("authtokenstr");
		var baseurl = localStorage.getItem("baseurl");
	}
	$('#login1').attr('placeholder', localStorage.getItem("email_address"));
	$("#login3").text(localStorage.getItem("btn_submit"));

	function forgotPassApiCall(email, pass) {
		$('#spinner').show();
		forgotPassResp = (data, textStatus, xhr) => {
			$('#spinner').hide();
			console.log(data);
			if (data.code == 200) {
				$('#nocontent').html("The Link has been send to your email!");
				$('#nocontent').show();
				setTimeout(() => {
					$('#nocontent').hide();
					window.location.href = "login.html"
				}, 5000);
			} else {
				$('#nocontent').html("Email is not valid");
				$('#nocontent').show();
				hideNoContent();
			}
		}
		var DATA = "authToken=" + authtoken + "&email=" + email + "&password=" + pass;
		var URL = "" + baseurl + "forgotPassword?" + DATA;
		makeGetAjaxCall(URL, 15000, forgotPassResp);
	}
	//	Remote Function //
	document.onkeydown = checkKey;
	function checkKey(e) {
		e = e || window.event;
		if (e.keyCode == '38') {
			//for Up Arrow key
			var $current = $('.current');
			var currentId = $current.get()[0].id;
			var currentParentId = $current.parent().parent().get()[0].id;
			if (currentParentId == "formsec") {
				if ($current.parent().prev().length > 0) {
					$current.removeClass('current');
					$current.parent().prev().children().addClass('current');
				}
			}
			else {
				$current.removeClass('current');
				$('#login3').addClass('current');
			}
		} else if (e.keyCode == '40') {
			// down arrow key
			var $current = $('.current');
			var currentId = $current.get()[0].id;
			var currentParentId = $current.parent().parent().get()[0].id;
			if (currentParentId == "formsec") {
				if ($current.parent().next().length > 0) {
					if (currentId == "login1") {
						$("#login1").blur();
					}
					$current.removeClass('current');
					$current.parent().next().children().addClass('current');
				}
			}
		} else if (e.keyCode == '37') {
			// left arrow key
			var $current = $('.current');
			var currentParentId = $current.parent().get()[0].id;
		} else if (e.keyCode == '39') {
			// right arrow key
			var $current = $('.current');
			var currentParentId = $current.parent().get()[0].id;
		} else if (e.keyCode == '13') {
			// OK key
			var $current = $('.current');
			var currentId = $current.get()[0].id;
			var mailformat = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,8})+$/;
			if (currentId != null) {
				//console.log("ok=================="+currentId);
				if (currentId == "login3") {
					$("#login1").blur();
					email = document.getElementById('login1').value;
					var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/;
					if (email != null && email != "") {
						if (email.match(mailformat)) {
							$("#login1").blur();
							forgotPassApiCall(email);
						} else {
							$('#nocontent').html("Email is not valid");
							$('#nocontent').show();
							hideNoContent();
						}
					} else {
						$('#nocontent').html("Field should not blank");
						$('#nocontent').show();
						hideNoContent();
					}
				}
				if (currentId == "login1") {
					$("#login1").focus();
					$("#login3").blur();
				}
			}
		} else if (e.keyCode == '10009') {
			window.history.back();
		}
		else if (e.keyCode == '10182') {
			localStorage.setItem("AppExit", "yes")
			window.tizen.application.getCurrentApplication().exit();
		}
	}
};
window.onload = init;
function hideNoContent() {
	var timer = setTimeout(function () {
		$('#nocontent').hide();
	}, 5000);
}

