$(document).ready(function () {
	//localStorage.clear();
	localStorage.setItem("authtokenstr", "92b9a7907748d038f3277feafcf07506");
	localStorage.setItem("baseurl", "https://api.muvi.com/rest/");
	localStorage.setItem("ipbaseurl" , "https://api.ipify.org/?format=json");

	//  localStorage.setItem("authtokenstr", "ebd810e97c3c9606d64c8dc717e568f2");
	//  localStorage.setItem("baseurl", "https://api.edocent.com/rest/");

	if (localStorage.getItem("authtokenstr") != null) {
		var authtoken = localStorage.getItem("authtokenstr");
		var baseurl = localStorage.getItem("baseurl");
		var lang_code = localStorage.getItem("lang_code");
		var ipbaseurl = localStorage.getItem("ipbaseurl");
	} else {
		localStorage.setItem("lang_code", "en");
	}


	var ipaddress = new XMLHttpRequest();
	ipaddress.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var ipaddress_response = JSON.parse(this.responseText);
			console.log(ipaddress_response);
			localStorage.setItem("ip_address",ipaddress_response.ip);
		}
	}
	ipaddress.open("GET", ipbaseurl, true);
	ipaddress.send();



	var myfavxhttp = new XMLHttpRequest();
	myfavxhttp.open("POST", "" + baseurl + "isRegistrationEnabled/", true);
	myfavxhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	myfavxhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var myfav_response = JSON.parse(this.responseText);
			if (myfav_response.code == "200") {
				localStorage.setItem("Mylibrary", myfav_response.isMylibrary);
				localStorage.setItem("WatchHistory", myfav_response.watch_history);
				localStorage.setItem("Myfavorite", myfav_response.has_favourite);
				localStorage.setItem("isRegistrationEnabled", myfav_response.is_season_available);
				var timer = setTimeout(function () {
					if (localStorage.getItem("loginstr") != null) {
						window.location.href = "homepage.html";
					} else {
						window.location.href = "languagelisting.html";
					}
				}, 2000);

			} else {
				if (localStorage.getItem("loginstr") != null) {
					window.location.href = "homepage.html"
				} else {
					window.location.href = "languagelisting.html"
				}
			}
		}
	};
	myfavxhttp.send("authToken=" + authtoken + "");
});