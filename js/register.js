
var init = function () {
    if (typeof window.tizen !== "undefined") {
        var usedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Exit'];
        usedKeys.forEach(
            function (keyName) {
                tizen.tvinputdevice.registerKey(keyName);
            }
        );
    }
	var focuscolor = '#0cb9f2';
	if (localStorage.getItem("authtokenstr") != null) {
		var authtoken = localStorage.getItem("authtokenstr");
		var baseurl = localStorage.getItem("baseurl");
	}

	$('#register1').attr('placeholder', localStorage.getItem("text_name"));
	$('#register2').attr('placeholder', localStorage.getItem("email_address"));
	$('#register3').attr('placeholder', localStorage.getItem("password"));
	$('#register4').attr('placeholder', localStorage.getItem("confirm_password"));
	$("#register5").text(localStorage.getItem("btn_register"));
	$("#login").text(localStorage.getItem("login"));

	function registerapicall(name, email, pass) {
		var registernxhr = new XMLHttpRequest();
		var data = "authToken=" + authtoken + "&name="
			+ name + "&email=" + email + "&password="
			+ pass;
		var url = "" + baseurl + "registerUser?" + data
		//console.log(url);
		registernxhr.onreadystatechange = function () {
			$('#spinner').show();
			if (this.readyState == 4 && this.status == 200) {
				$('#spinner').hide();
				loginresponse = JSON.parse(this.responseText);
				//console.log(loginresponse);
				if (loginresponse.code == 200 && loginresponse.status == "OK") {

					$('#nocontent').html("Registration Successful");
					$('#nocontent').show();
					var timer = setTimeout(function () {
						$('#nocontent').hide();
						localStorage.setItem("loginstr", loginresponse.id);
						localStorage.setItem("emailstr", loginresponse.email);
						localStorage.setItem("login_history_id", loginresponse.login_history_id);
						window.location.href = "homepage.html"
					}, 1000);
				} else {
					$('#nocontent').html(loginresponse.msg);
					$('#nocontent').show();
					var timer = setTimeout(function () {
						$('#nocontent').hide();
					}, 5000);
					$('#spinner').hide();
				}
			}
		}
		registernxhr.open("GET", url, true);
		registernxhr.send();
	}


	// Remote Function //
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
			// for Up Arrow key
			var $current = $('.current');
			var currentId = $current.get()[0].id;
			var currentParentId = $current.parent().get()[0].id;
			if (currentParentId == "registerformDiv") {
				if ($current.prev().length > 0) {
					if (currentId == "register5") {
						$("#register1").blur();
						$("#register2").blur();
						$("#register3").blur();
						//$("#register4").focus();
					} else if (currentId == "register4Div") {
						$("#register1").blur();
						$("#register2").blur();
						//$("#register3").blur();
						$("#register4").blur();
					} else if (currentId == "register3Div") {
						$("#register1").blur();
						//$("#register2").blur();
						$("#register3").blur();
						$("#register4").blur();
					} else if (currentId == "register2Div") {
						//$("#register1").blur();
						$("#register2").blur();
						$("#register3").blur();
						$("#register4").blur();
					}
					$current.removeClass('current');
					$current.prev().addClass('current');
				}
			} else {
				$current.removeClass('current');
				$("#register5").addClass('current');
			}
		} else if (remoteBtnCode == '40') {
			// down arrow key
			var $current = $('.current');
			var currentId = $current.get()[0].id;
			var currentParentId = $current.parent().get()[0].id;
			if (currentParentId == "registerformDiv") {
				if ($current.next().length > 0) {
					if (currentId == "register1Div") {
						$("#register1").blur();
						//$("#register2").blur();
						$("#register3").blur();
						$("#register4").blur();
					} else if (currentId == "register2Div") {
						$("#register1").blur();
						$("#register2").blur();
						//$("#register3").blur();
						$("#register4").blur();
					} else if (currentId == "register3Div") {
						$("#register1").blur();
						$("#register2").blur();
						$("#register3").blur();
						//$("#register4").blur();
					} else if (currentId == "register4Div") {
						$("#register1").blur();
						$("#register2").blur();
						$("#register3").blur();
						$("#register4").blur();
					}

					$current.removeClass('current');
					$current.next().addClass('current');
				} else {
					$current.removeClass('current');
					$('#login').addClass('current');
				}
			}
		} else if (remoteBtnCode == '37') {
			// left arrow key

		} else if (remoteBtnCode == '39') {
			// right arrow key

		} else if (remoteBtnCode == '13') {
			// OK key
			var $current = $('.current');
			var currentId = $current.get()[0].id;
			var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/;
			if (currentId != null) {
				if (currentId == "register5") {
					$("#register1").blur();
					$("#register2").blur();
					$("#register3").blur();
					$("#register4").blur();

					email = $('#register2').val();
					pass = $('#register3').val();
					repass = $('#register4').val();
					name = $('#register1').val();

					if (name != null && name != "" && email != null
						&& email != "" && repass != null && repass != ""
						&& pass != null && pass != "") {

						if (pass == repass) {
							if (email.match(mailformat)) {
								if (pass.length < 6 && repass.length < 6) {
									$('#nocontent').html("Password must be atleast 6 characters.");
									$('#nocontent').show();
									var timer = setTimeout(function () {
										$('#nocontent').hide();
									}, 1000);
								} else {
									$("#register1").blur();
									$("#register2").blur();
									$("#register3").blur();
									$("#register4").blur();
									registerapicall(name, email, pass);
								}
							} else {
								$('#nocontent').html("Email is not valid");
								$('#nocontent').show();
								var timer = setTimeout(function () {
									$('#nocontent').hide();
								}, 5000);
							}
						} else {
							$('#nocontent').html("Password do not match, Please re-enter the password");
							$('#nocontent').show();
							var timer = setTimeout(function () {
								$('#nocontent').hide();
							}, 5000);
						}
					} else {
						$('#nocontent').html("Field should not blank");
						$('#nocontent').show();
						var timer = setTimeout(function () {
							$('#nocontent').hide();
						}, 5000);
					}
				} else if (currentId == "login") {
					$("#register1").blur();
					$("#register2").blur();
					$("#register3").blur();
					$("#register4").blur();
					window.location.href = "login.html"
				} else if (currentId == "register1Div") {
					$("#register1").focus();
					$("#register2").blur();
					$("#register3").blur();
					$("#register4").blur();
				} else if (currentId == "register2Div") {
					$("#register1").blur();
					$("#register2").focus();
					$("#register3").blur();
					$("#register4").blur();
				} else if (currentId == "register3Div") {
					$("#register1").blur();
					$("#register2").blur();
					$("#register3").focus();
					$("#register4").blur();
				} else if (currentId == "register4Div") {
					$("#register1").blur();
					$("#register2").blur();
					$("#register3").blur();
					$("#register4").focus();
				}
			}
		}
		else if (remoteBtnCode == '10009') {
			// RETURN button
			window.history.back();
		}
		else if (remoteBtnCode == '10182') {
			localStorage.setItem("AppExit", "yes")
			window.tizen.application.getCurrentApplication().exit();
		}
	}
	// Remote Function //
};
window.onload = init;
