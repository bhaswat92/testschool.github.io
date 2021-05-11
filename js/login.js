let init = function () {
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
	$('#login2').attr('placeholder', localStorage.getItem("password"));
	$("#login3").text(localStorage.getItem("login"));
	$("#forgot").text(localStorage.getItem("forgot_password"));
	$("#register").text(localStorage.getItem("register_here"));

	let loginapicall = (email, pass) => {
		$('#spinner').show();
		function loginResponse(data, textStatus, xhr) {
			$('#spinner').hide();
			console.log(data);
			if (data.code === 200) {
				let loginResponse = data;
				$('#nocontent').html("Login Successful");
				$('#nocontent').show();
				setTimeout(() => {
					$('#nocontent').hide();
					localStorage.setItem("loginstr", loginResponse.id);
					localStorage.setItem("emailstr", loginResponse.email);
					localStorage.setItem("login_history_id", loginResponse.login_history_id);
					window.location.href = "homepage.html"
				}, 1000);
			} else {
				$('#nocontent').html(localStorage.getItem("email_password_invalid"));
				$('#nocontent').show();
				setTimeout(() => {
					$('#nocontent').hide();
				}, 5000);
			}
		}
		const DATA = "authToken=" + authtoken + "&email=" + email + "&password=" + pass;
		const URL = "" + baseurl + "login?" + DATA;
		makeGetAjaxCall(URL, 20000, loginResponse);
	}


	//	Remote Function //
	document.onkeydown = checkKey;
	function checkKey(e) {
		e = e || window.event;
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
			var $current = $('.current');
			var currentId = $current.get()[0].id;
			var currentParentId = $current.parent().get()[0].id;
			if (currentParentId == "forrm") {
				if ($current.prev().length > 0) {
					if (currentId == "login3") {
						$("#login1").blur();
					} else if (currentId == "login2Div") {
						$("#login2").blur();
					} else {
						$("#login1").blur();
						$("#login2").blur();
					}
					$current.removeClass('current');
					$current.prev().addClass('current');
				}
			}
			else {
				$current.removeClass('current');
				$('#login3').addClass('current');
			}

		} else if (remoteBtnCode == '40') {
			// down arrow key
			var $current = $('.current');
			var currentId = $current.get()[0].id;
			var currentParentId = $current.parent().get()[0].id;
			if (currentParentId == "forrm") {
				if ($current.next().length > 0) {
					if (currentId == "login1Div") {
						//$("#login1").focus();
						$("#login1").blur();
					} else if (currentId == "login2Div") {
						$("#login2").blur();
						//$("#login2").focus();
					} else {
						$("#login1").blur();
						$("#login2").blur();
					}
					$current.removeClass('current');
					$current.next().addClass('current');
				}
				else {
					$current.removeClass('current');
					$('#frgt').children().eq(0).addClass('current');
				}
			}
		} else if (remoteBtnCode == '37') {
			// left arrow key
			var $current = $('.current');
			var currentParentId = $current.parent().get()[0].id;
			if (currentParentId == "frgt") {
				if ($current.prev().length > 0) {
					$current.removeClass('current');
					$current.prev().addClass('current');
				}
			}
		} else if (remoteBtnCode == '39') {
			// right arrow key
			var $current = $('.current');
			var currentParentId = $current.parent().get()[0].id;
			if (currentParentId == "frgt") {
				if ($current.next().length > 0) {
					$current.removeClass('current');
					$current.next().addClass('current');
				}
			}
		}
		else if (remoteBtnCode == '13') {
			// OK key
			var $current = $('.current');
			var currentId = $current.get()[0].id;
			var mailformat = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,8})+$/;
			if (currentId != null) {
				if (currentId == "login3") {
					var email = $('#login1').val();
					var pass = $('#login2').val();
					if (email == "" || pass == "") {
						$('#nocontent').html("Field should not blank");
						$('#nocontent').show();
						var timer = setTimeout(function () {
							$('#nocontent').hide();
						}, 1000);
					} else {
						if (email.match(mailformat)) {
							$("#login1").blur();
							$("#login2").blur();
							loginapicall(email, pass);
						} else {
							$('#nocontent').html("Email is not valid");
							$('#nocontent').show();
							var timer = setTimeout(function () {
								$('#nocontent').hide();
							}, 5000);
						}
					}
				} else if (currentId == "forgotDiv") {
					$("#login1").blur();
					$("#login2").blur();
					window.location.href = "forgotpassword.html"
				} else if (currentId == "newUserDiv") {
					$("#login1").blur();
					$("#login2").blur();
					window.location.href = "register.html";
				} else if (currentId == "login1Div") {
					console.log('login1');
					$("#login2").blur();
					$("#login1").focus();
				} else if (currentId == "login2Div") {
					console.log('login2');
					$("#login1").blur();
					$("#login2").focus();
				}
			}
		} else if (remoteBtnCode == '10009') {
			//RETURN button
			window.history.back();
		} else if (remoteBtnCode == '10182') {
			localStorage.setItem("AppExit", "yes")
			window.tizen.application.getCurrentApplication().exit();
		}
	}
	//	Remote Function //
};
window.onload = init;