var checkTime;
var subtitleArr = [];
var init = function () {
  var country = localStorage.getItem("country");
  $("#spinner").show();
  if (localStorage.getItem("authtokenstr") != null) {
    var authtoken = localStorage.getItem("authtokenstr");
    var baseurl = localStorage.getItem("baseurl");
    var lang_code = localStorage.getItem("lang_code");
  }

  if (localStorage.getItem("authtokenstr") != null) {
    var authtoken = localStorage.getItem("authtokenstr");
    var baseurl = localStorage.getItem("baseurl");
    var lang_code = localStorage.getItem("lang_code");
    var userid = localStorage.getItem("loginstr");
  }

  /*===dynamically inserted menu according to CMS====*/
  var navmenu =
    '<li class="nav-item" data-permalink="home" id="navhome"><div class="nav-link" id="home">' +
    localStorage.getItem("home") +
    '</div></li><li class="nav-item" data-permalink="search" id="navsearch"><div class="nav-link" id="search">' +
    localStorage.getItem("search") +
    '</div></li><li class="nav-item" data-permalink="category" id="navcat"><div class="nav-link" id="category">' +
    localStorage.getItem("categories") +
    "</div></li>";
  if (
    localStorage.getItem("Myfavorite") == "1" &&
    localStorage.getItem("loginstr") != null
  ) {
    navmenu +=
      '<li class="nav-item" data-permalink="myfavourite"  id="navmyfavourite"> <div class="nav-link" id="myfavourite">' +
      localStorage.getItem("my_favourite") +
      "</div></li>";
  }
  if (
    localStorage.getItem("WatchHistory") == "1" &&
    localStorage.getItem("loginstr") != null
  ) {
    navmenu +=
      '<li class="nav-item" data-permalink="watchhistory" id="navwatchhistory"> <div class="nav-link" id="watchhistory">' +
      localStorage.getItem("watch_history") +
      "</div></li>";
  }
  if (
    localStorage.getItem("Mylibrary") == "1" &&
    localStorage.getItem("loginstr") != null
  ) {
    navmenu +=
      '<li class="nav-item" data-permalink="mylibrary" id="navmylibrary"> <div class="nav-link" id="mylibrary">' +
      localStorage.getItem("my_library") +
      "</div></li>";
  }
  navmenu +=
    '<li class="nav-item" data-permalink="profile" id="navprofile"><div class="nav-link last-nav" id="profile">' +
    localStorage.getItem("profile") +
    "</div></li>";
  //$(navmenu).insertAfter('#navcat');
  $("#mainmenu").empty().append(navmenu);
  $("#navhome").addClass("current");
  /*menu active*/
  // $("#home").addClass("navActive");
  var modaltitle = "";
  var modalstory = "";
  var modalcastimage = "";
  var thirdparty_url = "";
  var story = "";
  var fullstory = "";
  var muvi_streamunique_id = "";
  var muviunique_id = "";

  function getParameterByName(name, href) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(href);
    if (results == null) return "vikings";
    else return decodeURIComponent(results[1].replace(/\+/g, " "));
  }
  var currentperm = getParameterByName("permalink", window.location.href);
  var content_types_id = getParameterByName(
    "content_types_id",
    window.location.href
  );
  localStorage.setItem("curr_permalink", currentperm);
  localStorage.setItem("content_types_id", content_types_id);
  var loginstr = localStorage.getItem("loginstr");

  function convertToText(duration) {
    var durationText = "";
    var splitTime = duration.split(":");
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
    return durationText;
  }

  function addedToFav(muviunique_id, is_episode) {
    $("#spinner").show();
    function addToFavouriteSec(data, textStatus, xhr) {
      console.log(data);
      $("#spinner").hide();
      var favourite_response = data;
      if (favourite_response.code == 200) {
        $("#favimagechange").attr("src", "images/favourite_selected.png");
        document.getElementById("fav").innerHTML = localStorage.getItem(
          "added_to_fav"
        );
        $("#nocontent").html(favourite_response.msg);
        $("#nocontent").show();
        var timer = setTimeout(function () {
          $("#nocontent").hide();
          $("#favdiv").attr("data-is_fav", "1");
          localStorage.setItem("isfavourite", "1");
        }, 1000);
      } else {
        $("#nocontent").html(favourite_response.msg);
        $("#nocontent").show();
        var timer = setTimeout(function () {
          $("#nocontent").hide();
        }, 1000);
      }
    }
    var URL =
      baseurl +
      "AddtoFavlist?authToken=" +
      authtoken +
      "&movie_uniq_id=" +
      muviunique_id +
      "&content_type=" +
      is_episode +
      "&user_id=" +
      loginstr;
    makeGetAjaxCall(URL, 30000, addToFavouriteSec);
  }

  function deleteToFav(muviunique_id, is_episode) {
    $("#spinner").show();
    function removeFromFavourite(data, textStatus, xhr) {
      console.log(data);
      $("#spinner").hide();
      var favourite_response = data;
      if (favourite_response.code == 200) {
        $("#favimagechange").attr("src", "images/favourite.png");
        document.getElementById("fav").innerHTML = localStorage.getItem(
          "add_to_fav"
        );
        $("#nocontent").html(favourite_response.msg);
        $("#nocontent").show();
        var timer = setTimeout(function () {
          $("#nocontent").hide();
          $("#favdiv").attr("data-is_fav", "0");
          localStorage.setItem("isfavourite", "0");
        }, 1000);
      } else {
        $("#nocontent").html(favourite_response.msg);
        $("#nocontent").show();
        var timer = setTimeout(function () {
          $("#nocontent").hide();
        }, 1000);
      }
    }
    var URL =
      baseurl +
      "DeleteFavList?authToken=" +
      authtoken +
      "&movie_uniq_id=" +
      muviunique_id +
      "&content_type=" +
      is_episode +
      "&user_id=" +
      loginstr;
    makeGetAjaxCall(URL, 30000, removeFromFavourite);
  }

  function truncate(string) {
    if (string.length > 150) {
      return string.substring(0, 150) + "...";
    } else {
      return string;
    }
  }

  function replacespecialcharcter(string) {
    if (string != null) {
      var string = string.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, " ");
      return string;
    } else {
      return null;
    }
  }

  function callGetVideoDetails(muvi_streamunique_id, muviunique_id) {
    console.log(
      muvi_streamunique_id +
      "         " +
      muviunique_id +
      "         " +
      loginstr
    );
    $("#spinner").show();
    function getVedioDtlsResp(data, textStatus, xhr) {
      console.log(data);
      $("#spinner").hide();
      var videodetails_response = data;
      if (videodetails_response.code == 200) {
        if (videodetails_response.hasOwnProperty("licenseUrl")) {
          if (videodetails_response.subTitle.length > 0) {
            for (
              var index = 0;
              index < videodetails_response.subTitle.length;
              index++
            ) {
              if (index == 0) {
                var subtileData = {
                  default: true,
                  kind: "subtitles",
                  label: videodetails_response.subTitle[index].language,
                  src: videodetails_response.subTitle[index].url,
                  srclang: videodetails_response.subTitle[index].code,
                };
              } else {
                var subtileData = {
                  kind: "subtitles",
                  label: videodetails_response.subTitle[index].language,
                  src: videodetails_response.subTitle[index].url,
                  srclang: videodetails_response.subTitle[index].code,
                };
              }

              subtitleArr.push(subtileData);
            }
            localStorage.setItem("subtitleArr", JSON.stringify(subtitleArr));
          } else {
            localStorage.removeItem("subtitleArr");
            // remove subtitle from player
          }
        } else {
          if (videodetails_response.smi_language_list.length > 0) {
            var smiSubtitle = videodetails_response.smi_subtitle;
            localStorage.setItem("smiSubtitle", smiSubtitle);
            localStorage.setItem(
              "subtitleLang",
              JSON.stringify(videodetails_response.smi_language_list)
            );
          } else {
            localStorage.removeItem("smiSubtitle");
            localStorage.removeItem("subtitleLang");
          }

        }

        var video_url = videodetails_response.videoUrl;
        var thirdpartyUrl = videodetails_response.thirdparty_url;
        var length =
          "played_length" in videodetails_response || "there is no child";
        if (length == "there is no child") {
          played_length = 0;
        } else {
          played_length = videodetails_response.played_length;
          // alert("played_length==========1"+played_length)
          if (videodetails_response.hasOwnProperty("licenseUrl")) {
            played_length = played_length;
          } else {
            played_length = played_length * 1000;
          }
          //
          // alert("played_length==========2"+played_length)
        }
        var child =
          "licenseUrl" in videodetails_response || "there is no child";
        if (child == "there is no child") {
          //alert("no key");
        } else {
          var licenseUrl = videodetails_response.licenseUrl;
        }

        if (
          thirdpartyUrl == "" ||
          thirdpartyUrl == " " ||
          thirdpartyUrl == "null" ||
          thirdpartyUrl == null
        ) {
          if (
            video_url == "" ||
            video_url == " " ||
            video_url == "null" ||
            video_url == null
          ) {
            $("#nocontent").html("No video available");
            $("#nocontent").show();
            var timer = setTimeout(function () {
              $("#nocontent").hide();
            }, 1000);
          } else {
            // alert(localStorage.getItem("resume_watching"));
            if (localStorage.getItem("resume_watching") != null) {
              var resumeplayingmsg = localStorage.getItem("resume_watching");
            } else {
              var resumeplayingmsg = "Continue watching where you left";
            }
            if (played_length > 0 && localStorage.getItem("content_types_id") != 4) {
              if (confirm(resumeplayingmsg)) {
                localStorage.setItem("url", video_url);
                localStorage.setItem("thirdpartyUrl", thirdpartyUrl);
                if (
                  licenseUrl == "" ||
                  licenseUrl == " " ||
                  licenseUrl == "null" ||
                  licenseUrl == null
                ) {
                  localStorage.setItem("licenseurl", "");
                  localStorage.setItem("DRM", "");
                } else {
                  localStorage.setItem("licenseurl", licenseUrl);
                  localStorage.setItem("DRM", "PLAYREADY");
                }
                localStorage.setItem("customdata", "");
                localStorage.setItem("page", "moviedetails");
                localStorage.setItem("trailer", "false");
                if (videodetails_response.hasOwnProperty("licenseUrl")) {
                  window.location.href =
                    "theoplayer.html?stream_uniq_id=" +
                    muvi_streamunique_id +
                    "&muvi_uniq_id=" +
                    muviunique_id +
                    "&playlength=" +
                    played_length +
                    "&multipart=0";
                } else {
                  window.location.href =
                    "playerdrm.html?stream_uniq_id=" +
                    muvi_streamunique_id +
                    "&muvi_uniq_id=" +
                    muviunique_id +
                    "&playlength=" +
                    played_length +
                    "&multipart=0";
                }
              } else {
                localStorage.setItem("url", video_url);
                localStorage.setItem("thirdpartyUrl", thirdpartyUrl);
                if (
                  licenseUrl == "" ||
                  licenseUrl == " " ||
                  licenseUrl == "null" ||
                  licenseUrl == null
                ) {
                  localStorage.setItem("licenseurl", "");
                  localStorage.setItem("DRM", "");
                } else {
                  localStorage.setItem("licenseurl", licenseUrl);
                  localStorage.setItem("DRM", "PLAYREADY");
                }
                localStorage.setItem("customdata", "");
                localStorage.setItem("page", "moviedetails");
                localStorage.setItem("trailer", "false");
                played_length = 0;
                if (videodetails_response.hasOwnProperty("licenseUrl")) {
                  window.location.href = "theoplayer.html?stream_uniq_id=" + muvi_streamunique_id + "&muvi_uniq_id=" + muviunique_id + "&playlength=" + played_length + "&multipart=0";
                } else {
                  if (localStorage.getItem("content_types_id") == 4) {
                    window.location.href = "theoplayer.html?stream_uniq_id=" + muvi_streamunique_id + "&muvi_uniq_id=" + muviunique_id + "&playlength=" + played_length + "&multipart=0";
                  } else {
                    window.location.href = "playerdrm.html?stream_uniq_id=" + muvi_streamunique_id + "&muvi_uniq_id=" + muviunique_id + "&playlength=" + played_length + "&multipart=3";
                  }
                }
              }
            } else {
              played_length = 0;
              localStorage.setItem("url", video_url);
              localStorage.setItem("thirdpartyUrl", thirdpartyUrl);
              if (
                licenseUrl == "" ||
                licenseUrl == " " ||
                licenseUrl == "null" ||
                licenseUrl == null
              ) {
                localStorage.setItem("licenseurl", "");
                localStorage.setItem("DRM", "");
              } else {
                localStorage.setItem("licenseurl", licenseUrl);
                localStorage.setItem("DRM", "PLAYREADY");
              }
              localStorage.setItem("customdata", "");
              localStorage.setItem("page", "moviedetails");
              localStorage.setItem("trailer", "false");
              if (videodetails_response.hasOwnProperty("licenseUrl")) {
                window.location.href = "theoplayer.html?stream_uniq_id=" + muvi_streamunique_id + "&muvi_uniq_id=" + muviunique_id + "&playlength=" + played_length + "&multipart=0";
              } else {
                if (localStorage.getItem("content_types_id") == 4) {
                  window.location.href = "theoplayer.html?stream_uniq_id=" + muvi_streamunique_id + "&muvi_uniq_id=" + muviunique_id + "&playlength=" + played_length + "&multipart=0";
                } else {
                  window.location.href = "playerdrm.html?stream_uniq_id=" + muvi_streamunique_id + "&muvi_uniq_id=" + muviunique_id + "&playlength=" + played_length;
                }
              }
            }
          }
        } else {
          $("#nocontent").text("Unable to play the content");
          $("#nocontent").show();
          var timer = setTimeout(function () {
            $("#nocontent").hide();
          }, 5000);
        }
      } else {
        $("#nocontent").text("No video/Audio available");
        $("#nocontent").show();
        noContentHide();
      }
    }

    var URL = baseurl + "getVideoDetails?authToken=" + authtoken + "&content_uniq_id=" + muviunique_id + "&license_type=1" + "&stream_uniq_id=" + muvi_streamunique_id + "&user_id=" + loginstr + "&subtitle_type=smi&lang_code=en";
    makeGetAjaxCall(URL, 30000, getVedioDtlsResp);
  }

  function callTrailerDetails(muviunique_id, muvi_streamunique_id) {
    $("#spinner").show();
    played_length = 0;
    function getTrailorDtlsResp(data, textStatus, xhr) {
      console.log(data);
      $("#spinner").hide();
      var videodetails_response = data;
      if (videodetails_response.code == 200) {
        //alert("success");
        if (videodetails_response.data.trailer_details[0].hasOwnProperty("license_url") && videodetails_response.data.trailer_details[0].license_url != "") {
          if (videodetails_response.data.trailer_details[0].subTitle.length > 0) {
            for (var index = 0; index < videodetails_response.data.trailer_details[0].subTitle.length; index++) {
              console.log(videodetails_response.data.trailer_details[0].subTitle[index]);
              if (index == 0) {
                var subtileData = {
                  default: true,
                  kind: "subtitles",
                  label: videodetails_response.data.trailer_details[0].subTitle[index].language,
                  src: videodetails_response.data.trailer_details[0].subTitle[index].url,
                  srclang: videodetails_response.data.trailer_details[0].subTitle[index].code,
                };
              } else {
                var subtileData = {
                  kind: "subtitles",
                  label: videodetails_response.data.trailer_details[0].subTitle[index].language,
                  src: videodetails_response.data.trailer_details[0].subTitle[index].url,
                  srclang: videodetails_response.data.trailer_details[0].subTitle[index].code,
                };
              }
              subtitleArr.push(subtileData);
            }
            localStorage.setItem("subtitleArr", JSON.stringify(subtitleArr));
          } else {
            localStorage.removeItem("subtitleArr");
            // remove subtitle from player
          }
        } else {
          if (videodetails_response.data.trailer_details[0].smi_language_list.length > 0) {
            var smiSubtitle = videodetails_response.data.trailer_details[0].smi_subtitle;
            localStorage.setItem("smiSubtitle", smiSubtitle);
            localStorage.setItem("subtitleLang", JSON.stringify(videodetails_response.data.trailer_details[0].smi_language_list));
          } else {
            localStorage.removeItem("smiSubtitle");
            localStorage.removeItem("subtitleLang");
          }
        }
        var video_url = videodetails_response.data.trailer_details[0]["trailer_url"];
        var thirdpartyUrl = videodetails_response.data.trailer_details[0]["third_party_url"];
        console.log(video_url);
        console.log(thirdpartyUrl);
        var child =
          "license_url" in videodetails_response.data.trailer_details[0] ||
          "there is no child";
        if (child == "there is no child") {
          //alert("no key");
        } else {
          var licenseUrl = videodetails_response.data.trailer_details[0]["license_url"];
          //alert(licenseUrl);
        }
        if (
          thirdpartyUrl == "" ||
          thirdpartyUrl == " " ||
          thirdpartyUrl == "null" ||
          thirdpartyUrl == null
        ) {
          if (
            video_url == "" ||
            video_url == " " ||
            video_url == "null" ||
            video_url == null
          ) {
            $("#nocontent").html("No Trailer available");
            $("#nocontent").show();
            var timer = setTimeout(function () {
              $("#nocontent").hide();
            }, 1000);
          } else {
            localStorage.setItem("url", video_url);
            localStorage.setItem("thirdpartyUrl", thirdpartyUrl);
            if (
              licenseUrl == "" ||
              licenseUrl == " " ||
              licenseUrl == "null" ||
              licenseUrl == null
            ) {
              localStorage.setItem("licenseurl", "");
              localStorage.setItem("DRM", "");
            } else {
              localStorage.setItem("licenseurl", licenseUrl);
              localStorage.setItem("DRM", "PLAYREADY");
            }
            localStorage.setItem("customdata", "");
            localStorage.setItem("page", "moviedetails");
            localStorage.setItem("trailer", "true");
            if (videodetails_response.data.trailer_details[0].hasOwnProperty("license_url") && videodetails_response.data.trailer_details[0].license_url != "") {
              window.location.href = "theoplayer.html?stream_uniq_id=" + muvi_streamunique_id + "&playlength=" + played_length;
            } else {
              window.location.href = "playerdrm.html?stream_uniq_id=" + muvi_streamunique_id + "&playlength=" + played_length;
            }
          }
        } else {
          $("#nocontent").html("Unable to play the content");
          $("#nocontent").show();
          var timer = setTimeout(function () {
            $("#nocontent").hide();
          }, 5000);
        }
      } else {
        $("#nocontent").html("No video/Audio available");
        $("#nocontent").show();
        var timer = setTimeout(function () {
          $("#nocontent").hide();
        }, 1000);
      }
    }
    var URL = baseurl + "getTrailerDetails?authToken=" + authtoken + "&muvi_uniq_id=" + muviunique_id + "&license_type=1" + "&subtitle_type=smi";
    makeGetAjaxCall(URL, 30000, getTrailorDtlsResp);
  }

  function callForPlayedLength(muvi_streamunique_id, muviunique_id) {
    $("#spinner").show();
    function getPlayedLength(data, textStatus, xhr) {
      console.log(data);
      $("#spinner").hide();
      var videodetails_response = data;
      if (videodetails_response.code == 200) {
        var played_length = videodetails_response.played_length;
        if (played_length > 0) {
          localStorage.setItem("player_length", played_length);
          $("#resumediv").removeClass("hide");
          var resumediv =
            '<b class="text-uppercase" data-perma="resume-play" focusable style="font-size:30px;padding:12px;font-weight: normal;" data-isFreeContent=' +
            mybanner_img.movie["isFreeContent"] +
            " data-muviunique_id=" +
            mybanner_img.movie["muvi_uniq_id"] +
            " data-muvi_stream-unique_id=" +
            mybanner_img.movie["movie_stream_uniq_id"] +
            " data-movieurl=" +
            mybanner_img.movie["movieUrlForTv"] +
            ">" +
            localStorage.getItem("resume_watching") +
            "</b>";
          $("#resumePlayvideo").html(resumediv);
        } else {
          $("#resumediv").addClass("hide");
        }
      }
    }
    var URL = baseurl + "getVideoDetails?authToken=" + authtoken + "&content_uniq_id=" + muviunique_id + "&stream_uniq_id=" + muvi_streamunique_id + "&user_id=" + loginstr + "&lang_code=" + lang_code;
    makeGetAjaxCall(URL, 30000, getPlayedLength);
  }

  function callValidateUser(muvi_streamunique_id, muviunique_id) {
    $("#spinner").show();
    function getValidateResp(data, textStatus, xhr) {
      console.log(data);
      $("#spinner").hide();
      var validateuser_response = data;
      console.log(validateuser_response);
      if (validateuser_response.code == 429) {
        callGetVideoDetails(muvi_streamunique_id, muviunique_id);
      } else if (validateuser_response.code == 411) {
        $("#nocontent").text(validateuser_response.msg);
        $("#nocontent").show();
      } else {
        $("#nocontent").text(
          "You are not authorised to view this content. Please activate from website"
        );
        $("#nocontent").show();
      }
      var timer = setTimeout(function () {
        $("#nocontent").hide();
      }, 5000);
    }
    var URL =
      baseurl +
      "isContentAuthorized?authToken=" +
      authtoken +
      "&movie_id=" +
      muviunique_id +
      "&episode_id=0&season_id=0&purchase_type=show&user_id=" +
      loginstr +
      "&country=" +
      country;
    makeGetAjaxCall(URL, 30000, getValidateResp);
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
    $(location).attr("href", "" + htmlPage + "");
  }

  var index = 102;
  var prev_index = 0;
  var height_div = $("#mbody").height();
  console.log("height_div" + height_div);
  $.fn.scrollView = function () {
    console.log("indexdata" + index);
    return this.each(function () {
      $("#mbody").animate(
        {
          scrollTop: index,
        },
        10
      );
    });
  };

  function getContentResponse(data, textStatus, xhr) {
    console.log(data);
    $("#spinner").hide();
    $("#allbuttondiv").show();
    mybanner_img = data;
    localStorage.setItem("content_types_id", data.movie.content_types_id);
    console.log(mybanner_img);
    var rating = mybanner_img.rating;
    var review = mybanner_img.review;
    var strbannerimage = "";
    var name = "";
    var genre = "";
    var playnow = "";
    var castimage = "";
    var is_favourite = "";
    var i = 0;
    var content_description = "";
    var viewmore_text = "";
    var muvi_uniq_id = "";
    var movie_stream_uniq_id = "";

    var is_episode = "";
    var favouriteimage = "";
    var release_date = "";
    var video_duration = "";
    var banner = "";
    var is_favourite;
    if (mybanner_img.code == 200) {
      $("#navbarcontent").show();
      if (mybanner_img.movie["trailerThirdpartyUrl"] != "null") {
        thirdparty_url = mybanner_img.movie["trailerThirdpartyUrl"];
      } else {
        thirdparty_url = "";
      }
      if (currentperm == mybanner_img.movie["permalink"]) {
        if (mybanner_img.movie["story"] != "null") {
          fullstory = mybanner_img.movie["story"];
          story = truncate(mybanner_img.movie["story"]);
          story = story;
        }

        if (mybanner_img.movie["name"] != "null") {
          var name = mybanner_img.movie["name"];
          modaltitle = mybanner_img.movie["name"];
        }
        if (mybanner_img.movie["permalink"] != "null") {
          var permalink = replacespecialcharcter(
            mybanner_img.movie["permalink"]
          );
        }
        if (mybanner_img.movie["is_favorite"] != "null") {
          is_favourite = mybanner_img.movie["is_favorite"];
        }
        if (mybanner_img.movie["muvi_uniq_id"] != "null") {
          muvi_uniq_id = mybanner_img.movie["muvi_uniq_id"];
        }
        if (mybanner_img.movie["movie_stream_uniq_id"] != "null") {
          movie_stream_uniq_id = mybanner_img.movie["movie_stream_uniq_id"];
        }
        if (mybanner_img.movie["is_episode"] != "null") {
          is_episode = mybanner_img.movie["is_episode"];
        } else {
          is_episode = "0";
        }
        if (mybanner_img.movie["video_duration"] != "null") {
          video_duration = mybanner_img.movie["video_duration"];
          var duration = video_duration;
        }
        if (mybanner_img.movie["release_date"] != "null") {
          year = replacespecialcharcter(mybanner_img.movie["release_date"]);
          var release_date = year.split("-", 1);
        }
        if (
          mybanner_img.movie["genre"] != "" ||
          mybanner_img.movie["genre"] != "null"
        ) {
          var genre = mybanner_img.movie["genre"].replace(/[^a-zA-Z,]/g, " ");
          genre = genre.replace(",", ",  ");
          //var genre = JSON.parse(mybanner_img.movie['genre']);
          //genre = genre.slice(0, 3).join(', ');
        } else {
          genre = "";
        }
        if (genre == "null") {
          genre = "";
        }
        if (genre == "undefined") {
          genre = "";
        }
        var posterofTv = mybanner_img.movie["posterForTv"];
        modalcastimage = mybanner_img.movie["posterForTv"];
        banner = mybanner_img.movie["tv_banner"];
        var body = document.getElementsByTagName("BODY")[0];

        if (banner != "") {
          body.style.backgroundImage = "url(" + banner + ")";
          body.style.backgroundRepeat = "no-repeat";
          body.style.backgroundPosition = "left top";
          body.style.backgroundAttachment = "scroll";
          body.style.width = "100%";
          body.style.backgroundSize = "cover";
        } else {
          body.style.backgroundImage = 'url("images/background.png")';
          //$('body').css('background-image','#000000');
        }
        for (i = 0; i < mybanner_img.movie.cast_detail.length; i++) {
          var cast_details_image =
            mybanner_img.movie.cast_detail[i]["celeb_image"];
          var cast_details_image_permalink =
            mybanner_img.movie.cast_detail[i]["permalink"];
          //console.log(cast_details_image);
          if (i < 5) {
            castimage +=
              '<img focusable src="' +
              cast_details_image +
              '" data-perma=' +
              cast_details_image_permalink +
              '  id="castcrew' +
              i +
              '" class="img-circle" alt="Cinque Terre" width="90" height="90" style="border: 2px solid grey;">';
          } else {
          }
        }
        var genreHtml = "";
        var releaseDateHtml = "";
        var durationHtml = "";
        var playerdiv = "";
        if (!genre == "") {
          genreHtml = "" + genre + "";
        }
        if (!release_date == "") {
          releaseDateHtml = "" + release_date + "";
        }
        if (!video_duration == "") {
          durationHtml = "" + convertToText(duration) + "";
        }
        var ratingStar = "";
        if (fullstory != null && fullstory != "") {
          if (rating > 0 || review > 0) {
            for (var i = 0; i < 5; i++) {
              if (i < rating) {
                ratingStar += '<span class="fa fa-star checked"></span>';
              } else {
                ratingStar += '<span class="fa fa-star"></span>';
              }
            }
            //ratingStar += '<span class="text-muted"> (' + review + ')</span>';
          }
          content_description +=
            '<div class="col-lg-5 col-md-5 col-sm-5">' +
            '<h1 class="heading cus-width">' +
            name +
            "</h1>" +
            '<div class="title-bar"></div>' +
            '<div class="p-light mb-3 text-muted"><span>' +
            releaseDateHtml +
            '</span><span id="one" style="padding: 0px 8px;">|</span> <span>' +
            genreHtml +
            '</span> <span id="two" style="padding: 0px 8px;">|</span> <span>' +
            durationHtml +
            "</span></div>" +
            '<div class="rating">' +
            ratingStar +
            "</div>" +
            '<p style="font-size: 22px;line-height: 30px;">' +
            story +
            "</p>";

          viewmore_text +=
            '<b class="horizental_line" data-perma="viemorefocus" id="fullstory" style="font-size:20px;font-weight: normal;">' +
            localStorage.getItem("view_more") +
            "</b>";
        } else {
          if (rating > 0 || review > 0) {
            for (var i = 0; i < 5; i++) {
              if (i < rating) {
                ratingStar += '<span class="fa fa-star checked"></span>';
              } else {
                ratingStar += '<span class="fa fa-star"></span>';
              }
            }
          }
          content_description +=
            '<div class="col-lg-5 col-md-5 col-sm-5">' +
            '<h1 class="heading cus-width">' +
            name +
            "</h1>" +
            '<div class="title-bar"></div>' +
            '<div class="p-light mb-3 text-muted"><span>' +
            releaseDateHtml +
            '</span> <span id="one" style="padding: 0px 8px;">|</span> <span>' +
            genreHtml +
            '</span> <span id="two" style="padding: 0px 8px;">|<span> </span>' +
            durationHtml +
            "</span></div>" +
            '<div class="rating">' +
            ratingStar +
            "</div>" +
            '<p style="font-size: 22px;line-height: 30px;">' +
            story +
            "</p>";
        }
        var setstorytomodal =
          '<p  style="font-size:25px; font-weight:400;margin-top:30px;color: #ccc;">' +
          fullstory +
          "</p>";
        var modalimage =
          '  <div style="width: 20%;float: left;">' +
          '<img  src="' +
          posterofTv +
          '" class="img-circle"  width="170" height="160" style="margin-right:10px;margin-left:15px;border:2px solid grey">' +
          '</div><div style="margin-top: 30px;float: left;width: 50%;	margin-left: 80px;"><p class="text-color" size="6" style=" font-size:45px; font-weight: 700; margin-bottom:0px;">' +
          name +
          '</p><hr style="margin-top: 2px;margin-right: 370px;border-top: 0px;margin-left: 2px;background: #0cb9f2;height: 2px;"></div>';
        //console.log(is_favourite);
        if (mybanner_img.movie["content_types_id"] != "4") {
          playerdiv +=
            '<div class="row mt-4" id="playdiv" data-perma="play-button" data-isFreeContent="' +
            mybanner_img.movie["isFreeContent"] +
            '" data-muviunique_id="' +
            mybanner_img.movie["muvi_uniq_id"] +
            '" data-muvi_stream-unique_id="' +
            mybanner_img.movie["movie_stream_uniq_id"] +
            '" data-movieurl="' +
            mybanner_img.movie["movieUrlForTv"] +
            '"><div class="col-12 cus-padding"><img src="images/play-button_white.png" id="playbutton"/><span class="singlepart-text" id="playvideo">' +
            localStorage.getItem("watch_now") +
            '</span><div class="mt-3"><img src="images/multipart-line.png" /></div></div></div></div>';
        } else {
          playerdiv +=
            '<div class="row mt-4" id="playdiv" data-perma="play-button" data-isFreeContent="' +
            mybanner_img.movie["isFreeContent"] +
            '" data-muviunique_id="' +
            mybanner_img.movie["muvi_uniq_id"] +
            '" data-muvi_stream-unique_id="' +
            mybanner_img.movie["movie_stream_uniq_id"] +
            '" data-movieurl="' +
            mybanner_img.movie["feed_url"] +
            '"><div class="col-12 cus-padding"><img src="images/play-button_white.png" id="playbutton"/><span class="singlepart-text" id="playvideo">' +
            localStorage.getItem("watch_now") +
            '</span><div class="mt-3"><img src="images/multipart-line.png" /></div></div></div></div>';
        }
        if (mybanner_img.movie.trailer_status !== 0) {
          playerdiv +=
            '<div class="row mt-4" id="tarilerdiv" data-perma="viewtrailer" data-muvi_stream-unique_id="' +
            mybanner_img.movie["movie_stream_uniq_id"] +
            '"  data-movieurl="' +
            mybanner_img.movie["trailerUrl"] +
            '" data-muviunique_id="' +
            mybanner_img.movie["muvi_uniq_id"] +
            '"><div class="col-12 cus-padding"><img src="images/watch_trailer_white.png" id="watchtrailer"/><span class="singlepart-text" id="playtrailervideo">' +
            localStorage.getItem("view_trailer") +
            '</span><div class="mt-3"><img src="images/multipart-line.png" /></div></div></div>';
        }
        if (localStorage.getItem("Myfavorite") == "1") {
          if (is_favourite == 0) {
            localStorage.setItem("isfavourite", "0");
            playerdiv =
              playerdiv +
              '<div class="row mt-4" id="favdiv" data-is_fav=' +
              is_favourite +
              " data-muviunique_id=" +
              muvi_uniq_id +
              " data-is_episode=" +
              is_episode +
              ' data-perma="favourite"><div class="col-12 cus-padding"><img src="images/favourite_white.png" id="favimagechange"/><span class="singlepart-text" id="fav">' +
              localStorage.getItem("add_to_fav") +
              "</span></div></div>";
            $("#favimagechange").attr("src", "images/favourite_white.png");
          } else {
            localStorage.setItem("isfavourite", "1");
            playerdiv =
              playerdiv +
              '<div class="row mt-4" id="favdiv" data-is_fav=' +
              is_favourite +
              " data-muviunique_id=" +
              muvi_uniq_id +
              " data-is_episode=" +
              is_episode +
              ' data-perma="favourite"><div class="col-12 cus-padding"><img src="images/favourite_selected_white.png" id="favimagechange"/><span class="singlepart-text" id="fav">' +
              localStorage.getItem("added_to_fav") +
              "</span></div></div>";
            $("#favimagechange").attr(
              "src",
              "images/favourite_selected_white.png"
            );
          }
        } else {
        }
      }
      $("#content_details").html(content_description);
      $("#cast_image").html(castimage);
      $("#cast_image img").each(function () {
        $(this).on("error", function () {
          $(this).attr("src", "https://api.muvi.com/img/no-image.png");
        });
      });
      $("#viewmoretext").html(viewmore_text);
      //$('#fav').html(favouriteimage);
      $("#storydetails").html(setstorytomodal);
      $("#modalimage").html(modalimage);
      $("#buttondiv").html(playerdiv);
      //$('#playtrailervideo').html(playtrailervideo);

      if (release_date != "" && genre != "" && video_duration != "") {
        $("#one").show();
        $("#two").show();
      } else if (release_date == "" && genre != "" && video_duration != "") {
        $("#one").hide();
        $("#two").show();
      } else if (release_date == "" && genre == "" && video_duration != "") {
        $("#one").hide();
        $("#two").hide();
      } else if (release_date == "" && genre == "" && video_duration == "") {
        $("#one").hide();
        $("#two").hide();
      } else if (release_date != "" && genre != "" && video_duration == "") {
        $("#one").show();
        $("#two").hide();
      } else if (release_date != "" && genre == "" && video_duration != "") {
        $("#one").show();
        $("#two").hide();
      } else if (release_date == "" && genre != "" && video_duration == "") {
        $("#one").hide();
        $("#two").hide();
      }
      if (fullstory.length < 150) {
        $("#fullstory").hide();
      }
      if (loginstr != null) {
        callForPlayedLength(movie_stream_uniq_id, muvi_uniq_id);
      }
    } else {
      $("#nocontent").html(mybanner_img.msg);
      $("#nocontent").show();
    }
  }
  var URL =
    baseurl +
    "getContentDetails?authToken=" +
    authtoken +
    "&permalink=" +
    currentperm +
    "&user_id=" +
    loginstr +
    "&lang_code=" +
    lang_code +
    "&country=" +
    country;
  makeGetAjaxCall(URL, 20000, getContentResponse);

  //Remote Function//
  document.onkeydown = checkKey;

  function checkKey(e) {
    e = e || window.event;
    //For RTl Use ( Don't Modify This Section )
    var remoteBtnCode = "";
    var lang_code = localStorage.getItem("lang_code");
    if (
      lang_code == "ar" ||
      lang_code == "arc" ||
      lang_code == "az" ||
      lang_code == "dv" ||
      lang_code == "iw" ||
      lang_code == "ku" ||
      lang_code == "fa" ||
      lang_code == "ur"
    ) {
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

    if (remoteBtnCode == "38") {
      //for Up Arrow key
      var $current = $(".current");
      var currentId = $current.get()[0].id;
      var currentparentId = $current.parent().get()[0].id;
      var currentparentIddata = $current.parent().parent().get()[0].id;
      if (currentparentId == "viewmorediv") {
        $current.removeClass("current");
        $("#mainmenu").children().eq(0).addClass("current");
      } else if (currentparentIddata == "allbuttondiv") {
        if ($current.prev().length > 0) {
          $current.removeClass("current");
          if (currentId == "favdiv") {
            if ($("#watchtrailer").length) {
              $("#watchtrailer").attr("src", "images/watch-trailer-blue.png");
              $("#playbutton").attr("src", "images/play-button_white.png");
            } else {
              $("#playbutton").attr("src", "images/play-button.png");
            }
            if (localStorage.getItem("isfavourite") == 0) {
              $("#favimagechange").attr("src", "images/favourite_white.png");
            } else {
              $("#favimagechange").attr(
                "src",
                "images/favourite_selected_white.png"
              );
            }
            $current.prev().addClass("current");
          } else if (currentId == "tarilerdiv") {
            $("#watchtrailer").attr("src", "images/watch_trailer_white.png");
            if (localStorage.getItem("isfavourite") == 0) {
              $("#favimagechange").attr("src", "images/favourite_white.png");
            } else {
              $("#favimagechange").attr(
                "src",
                "images/favourite_selected_white.png"
              );
            }
            $("#playbutton").attr("src", "images/play-button.png");
            $current.prev().addClass("current");
          }
        } else {
          $current.removeClass("current");
          if ($("#cast_image").children().length == 0) {
            if ($("#fullstory").is(":visible")) {
              $("#viewmoretext").addClass("current");
              if (localStorage.getItem("isfavourite") == 0) {
                $("#favimagechange").attr("src", "images/favourite_white.png");
              } else {
                $("#favimagechange").attr(
                  "src",
                  "images/favourite_selected_white.png"
                );
              }
              $("#watchtrailer").attr("src", "images/watch_trailer_white.png");
              $("#playbutton").attr("src", "images/play-button_white.png");
            } else {
              $("#mainmenu").children().eq(0).addClass("current");
              $("#playbutton").attr("src", "images/play-button_white.png");
            }
          } else {
            $("#cast_image").children().eq(0).addClass("current");
            $("#playbutton").attr("src", "images/play-button_white.png");
          }
        }
      } else if (currentparentId == "cast_image") {
        $current.removeClass("current");
        if ($("#fullstory").is(":visible")) {
          $("#viewmoretext").addClass("current");
        } else {
          $("#mainmenu").children().eq(0).addClass("current");
        }
      } else if (currentparentId == "mbody") {
        if (index > 0) {
          index = index - 102;
        }
        if ($("#exampleModalCenter").is(":visible")) {
          $("#mbody").scrollView();
        }
      }
    } else if (remoteBtnCode == "40") {
      // down arrow key
      if ($("#spinner").is(":visible") == true) {
        e.preventDefault();
      } else {
        var $current = $(".current");
        var currentId = $current.get()[0].id;
        var currentparentId = $current.parent().get()[0].id;
        var currentparentIddata = $current.parent().parent().get()[0].id;

        if (currentparentId == "mainmenu") {
          $current.removeClass("current");
          if ($("#fullstory").is(":visible")) {
            $("#viewmoretext").addClass("current");
          } else {
            if ($("#cast_image").children().length == 0) {
              $("#buttondiv").children().eq(0).addClass("current");
              $("#playbutton").attr("src", "images/play-button.png");
              if (localStorage.getItem("isfavourite") == 0) {
                $("#favimagechange").attr("src", "images/favourite_white.png");
              } else {
                $("#favimagechange").attr(
                  "src",
                  "images/favourite_selected_white.png"
                );
              }
            } else {
              $("#cast_image").children().eq(0).addClass("current");
              $("#playbutton").attr("src", "images/play-button_white.png");
              if (localStorage.getItem("isfavourite") == 0) {
                $("#favimagechange").attr("src", "images/favourite_white.png");
              } else {
                $("#favimagechange").attr(
                  "src",
                  "images/favourite_selected_white.png"
                );
              }
              $("#watchtrailer").attr("src", "images/watch_trailer_white.png");
            }
          }
        } else if (currentparentIddata == "content_details") {
          $current.removeClass("current");
          if ($("#cast_image").children().length == 0) {
            $("#buttondiv").children().eq(0).addClass("current");
            $("#playbutton").attr("src", "images/play-button.png");
            if (localStorage.getItem("isfavourite") == 0) {
              $("#favimagechange").attr("src", "images/favourite_white.png");
            } else {
              $("#favimagechange").attr(
                "src",
                "images/favourite_selected_white.png"
              );
            }
            $("#watchtrailer").attr("src", "images/watch_trailer_white.png");
          } else {
            $("#cast_image").children().eq(0).addClass("current");
            $("#playbutton").attr("src", "images/play-button_white.png");
            if (localStorage.getItem("isfavourite") == 0) {
              $("#favimagechange").attr("src", "images/favourite_white.png");
            } else {
              $("#favimagechange").attr(
                "src",
                "images/favourite_selected_white.png"
              );
            }
            $("#watchtrailer").attr("src", "images/watch_trailer_white.png");
          }
        } else if (currentparentIddata === "allbuttondiv") {
          if ($current.next().length > 0) {
            $current.removeClass("current");
            if (currentId == "playdiv") {
              $("#playbutton").attr("src", "images/play-button_white.png");
              if ($("#watchtrailer").length) {
                $("#watchtrailer").attr("src", "images/watch-trailer-blue.png");
                if (localStorage.getItem("isfavourite") == 0) {
                  $("#favimagechange").attr(
                    "src",
                    "images/favourite_white.png"
                  );
                } else {
                  $("#favimagechange").attr(
                    "src",
                    "images/favourite_selected_white.png"
                  );
                }
              } else {
                if (localStorage.getItem("isfavourite") == 0) {
                  $("#favimagechange").attr("src", "images/favourite.png");
                } else {
                  $("#favimagechange").attr(
                    "src",
                    "images/favourite_selected.png"
                  );
                }
              }
              $current.next().addClass("current");
            } else if (currentId === "tarilerdiv") {
              $("#playbutton").attr("src", "images/play-button_white.png");
              $("#watchtrailer").attr("src", "images/watch_trailer_white.png");
              if (localStorage.getItem("isfavourite") == 0) {
                $("#favimagechange").attr("src", "images/favourite.png");
              } else {
                $("#favimagechange").attr(
                  "src",
                  "images/favourite_selected.png"
                );
              }
              $current.next().addClass("current");
            }
          }
        } else if (currentparentId == "cast_image") {
          $current.removeClass("current");
          $("#buttondiv").children().eq(0).addClass("current");
          $("#playbutton").attr("src", "images/play-button.png");
        } else if (currentparentId == "mbody") {
          if (index <= height_div) {
            index = index + 102;
          }
          if ($("#exampleModalCenter").is(":visible")) {
            $("#mbody").scrollView();
          }
        }
      }
    } else if (remoteBtnCode == "37") {
      // left arrow key
      if ($("#spinner").is(":visible") == true) {
        e.preventDefault();
      } else {
        var $current = $(".current");
        var currentparentId = $current.parent().get()[0].id;

        if (currentparentId == "mainmenu") {
          if ($current.prev().length > 0) {
            $current.removeClass("current");
            $current.prev().addClass("current");
          }
        } else if (currentparentId == "cast_image") {
          if ($current.prev().length > 0) {
            $current.removeClass("current");
            $current.prev().addClass("current");
          }
        }
      }
    } else if (remoteBtnCode == "39") {
      // right arrow key
      if ($("#spinner").is(":visible") == true) {
        e.preventDefault();
      } else {
        var $current = $(".current");
        var currentparentId = $current.parent().get()[0].id;
        var currentId = $current.get()[0].id;

        if (currentparentId == "mainmenu") {
          if ($current.next().length > 0) {
            $current.removeClass("current");
            $current.next().addClass("current");
          }
        } else if (currentparentId == "cast_image") {
          if ($current.next().length > 0) {
            $current.removeClass("current");
            $current.next().addClass("current");
          }
        }
      }
    } else if (remoteBtnCode == "13") {
      // OK key
      var $current = $(".current");
      var currentId = $current.get()[0].id;
      var currentparentId = $current.parent().get()[0].id;
      //var permalink = $('#'+currentId).attr('data-permalink');
      if (currentparentId == "cast_image") {
        if (currentId != null) {
          var permalink = $("#" + currentId).attr("data-perma");
          var create_href = "staring.html?permalink=" + permalink;
          $(location).attr("href", create_href);
        }
      } else if (currentId == "viewmoretext") {
        $("#exampleModalLongTitle").html(modaltitle);
        $("#modalsummary").html(fullstory);
        $("#modal_cast_imagee").attr("src", modalcastimage);
        $("#modal_cast_imagee")
          .on("error", function () {
            $(this).attr("src", "https://api.muvi.com/img/no-image.png");
          })
          .attr("src", modalcastimage);
        $("#exampleModalCenter").modal("show");
        $current.removeClass("current");
        $("#modalsummary").addClass("current");
        //$("#mbody").attr('src',modalcastimage);
      }
      if (currentparentId == "mainmenu") {
        var permalink = $("#" + currentId).attr("data-permalink");
        navBarCall(permalink);
      } else if (currentId == "playdiv") {
        muvi_streamunique_id = $("#" + currentId).attr(
          "data-muvi_stream-unique_id"
        );
        muviunique_id = $("#" + currentId).attr("data-muviunique_id");
        var isFreeContent = $("#" + currentId).attr("data-isFreeContent");

        if (isFreeContent == "1") {
          callGetVideoDetails(muvi_streamunique_id, muviunique_id);
        } else {
          callValidateUser(muvi_streamunique_id, muviunique_id);
        }
      } else if (currentId == "tarilerdiv") {
        muvi_streamunique_id = $("#" + currentId).attr(
          "data-muvi_stream-unique_id"
        );
        muviunique_id = $("#" + currentId).attr("data-muviunique_id");
        callTrailerDetails(muviunique_id, muvi_streamunique_id);
      } else if (currentId == "favdiv") {
        var is_episode = $("#" + currentId).attr("data-is_episode");
        is_favourite = $("#" + currentId).attr("data-is_fav");
        muviunique_id = $("#" + currentId).attr("data-muviunique_id");
        if (localStorage.getItem("Myfavorite") == "1") {
          if (is_favourite == 0) {
            addedToFav(muviunique_id, is_episode);
          } else {
            deleteToFav(muviunique_id, is_episode);
          }
        } else {
          $("#nocontent").html("Add to favorite not enabled");
          $("#nocontent").show();
          noContentHide();
        }
      } else if (currentparentId == "mbody") {
      }
    } else if (remoteBtnCode == "10009") {
      //RETURN button
      if ($("#exampleModalCenter").is(":visible")) {
        var $current = $(".current");
        $("#exampleModalCenter").hide();
        $("#exampleModalCenter").modal("hide");
        $current.removeClass("current");
        $("#viewmoretext").addClass("current");
      } else {
        //window.history.back();
        localStorage.removeItem("generstringdata");
        localStorage.removeItem("sortbypermalink");
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
};
window.onload = init;
function noContentHide() {
  var timer = setTimeout(function () {
    $("#nocontent").hide();
  }, 5000);
}
