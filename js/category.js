var filtHasCategory = "";
var filtPermalink = "";
var filtCategoryId = "";

var init = function () {
    var country = localStorage.getItem("country");
    $('#spinner').show();
    var myData = [];
    var sortData = [];
    var generstringdata = "";
    var sortbydata = "";
    var dataGenername = "";
    var sortbypermalink = "";

    /*for filter use temporary*/

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
    if ("catActiveId" in localStorage) {

    } else {
        $('#navcat').addClass('current');
    }

    /*menu active*/
    $("#category").css("color", "#fff");

    $(document).ready(function () {
        var backupPermalink = localStorage.getItem("backupPermalink");
        var backupHasCategory = localStorage.getItem("backupHasCategory");
        var backupCategoryId = localStorage.getItem("backupCategoryId");
        if (backupPermalink != null && backupHasCategory != null && backupCategoryId != null) {
            // var $current = $('.current');
            // $current.removeClass('current');

            $.ajax({
                type: 'GET',
                url: baseurl + 'getCategoryList',
                dataType: 'json',
                timeout: 20000,
                data: {
                    authToken: authtoken,
                    content_flag: 0,
                    lang_code: lang_code
                },
                success: function (data, textStatus, xhr) {
                    if (xhr.status == 200) {
                        var category_response = data;
                        console.log(category_response);
                        if (category_response.code == 200) {
                            var appendCategories = '';
                            for (var i = 0; i < category_response.category_list.length; i++) {
                                appendCategories += '<p id="cat_' + i + '" permalink="' + category_response.category_list[i].permalink + '" has_subcategory="' + category_response.category_list[i].has_subcategory + '" category_id="' + category_response.category_list[i].category_id + '">' + category_response.category_list[i].category_name + '</p>';
                            }
                            if (appendCategories != '') {
                                $('#categories').empty().append(appendCategories);
                                var currentActtId = localStorage.getItem("leftCurrentId");
                                if (currentActtId != null) {
                                    //$("#" + currentActtId).addClass('current');
                                    $("#" + currentActtId).css("color", "#00c0ff");
                                }
                            }
                        }
                    }
                },
                error: function (xhr, textStatus) {
                    errorUtil(xhr, textStatus);
                },
            });

            if (backupHasCategory == 1) {
                //leftCategoryList();
                callSubCategory(backupCategoryId, backupPermalink);

            } else {
                //console.log("category");
                //leftCategoryList();
                category(backupPermalink);
            }
        } else {
            $.ajax({
                type: 'GET',
                url: baseurl + 'getCategoryList',
                dataType: 'json',
                timeout: 20000,
                data: {
                    authToken: authtoken,
                    content_flag: 0,
                    lang_code: lang_code
                },
                success: function (data, textStatus, xhr) {
                    if (xhr.status == 200) {
                        var category_response = data;
                        console.log(category_response);
                        if (category_response.code == 200) {
                            var appendCategories = '';
                            for (var i = 0; i < category_response.category_list.length; i++) {
                                if (i == 0) {
                                    localStorage.setItem("backupPermalink", category_response.category_list[i].permalink);
                                    localStorage.setItem("backupHasCategory", category_response.category_list[i].has_subcategory);
                                    localStorage.setItem("backupCategoryId", category_response.category_list[i].category_id);
                                    localStorage.setItem("leftCurrentId", "cat_0");
                                    if (category_response.category_list[i].has_subcategory === 0) {
                                        //console.log('category');
                                        filtHasCategory = 0;
                                        filtPermalink = category_response.category_list[i].permalink;
                                        category(category_response.category_list[i].permalink);
                                    } else {
                                        filtHasCategory = 1;
                                        filtPermalink = category_response.category_list[i].category_id;
                                        filtCategoryId = category_response.category_list[i].permalink;
                                        callSubCategory(category_response.category_list[i].category_id, category_response.category_list[i].permalink);
                                    }
                                }
                                appendCategories += '<p id="cat_' + i + '" permalink="' + category_response.category_list[i].permalink + '" has_subcategory="' + category_response.category_list[i].has_subcategory + '" category_id="' + category_response.category_list[i].category_id + '">' + category_response.category_list[i].category_name + '</p>';
                            }
                            if (appendCategories != '') {
                                $('#categories').empty().append(appendCategories);
                                //$("#categories").children('p').eq(0).addClass('current');
                                $("#categories").children('p').eq(0).css("color", "#00c0ff");

                            } else {
                                //console.log("No Categories");
                            }
                        } else {
                            $('#nocontent').text("No Response From Server");
                            $('#nocontent').show();
                            var timer = setTimeout(function () {
                                $('#nocontent').hide();
                            }, 5000);
                        }
                    }
                },
                error: function (xhr, textStatus) {
                    errorUtil(xhr, textStatus);
                },
            });
        }

        var genre = {};
        var getFilterlist_response = {};
        var sort_by = {};
        var filterList = new XMLHttpRequest();
        filterList.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var getFilterlist_response = JSON.parse(this.responseText);
                console.log(getFilterlist_response);
                genre = getFilterlist_response.genre;
                sort_by = getFilterlist_response.sort_by;
                var gener_data = '';
                for (var i = 0; i < genre.length; i++) {
                    generdata = genre[i];
                    gener_data += '<label style="margin-bottom:40px;display:block;font-size: 32px;" focusable data-genername="' + genre[i]['name'] + '" data-idvalue="' + i + '" id="ger_' + i + '" class="chkloop"><input type="checkbox" name="genrChk" class="chkbox" id="chkbox' + i + '" data-genername="' + genre[i]['name'] + '">' + genre[i]['name'] + '</label>';
                }
                var sort_by_data = '';
                for (var j = 0; j < sort_by.length; j++) {
                    sort_bydata = sort_by[j];
                    sort_by_data += '<label focusable style="margin-bottom:40px;" id="sortby_' + j + '" data-sortid="sortby' + j + '" data-idvalue="' + j + '" data-name="' + sort_by[j]['name'] + '" data-permalink="' + sort_by[j]['permalink'] + '" data-default="' + sort_by[j]['is_default'] + '"><input type="radio" name="sortby" class="chkbox" id="radio' + j + '" data-default="' + sort_by[j]['is_default'] + '">' + sort_by[j]['name'] + '</label>';
                }
                if (gener_data.length > 0) {
                    $("#filterby").show();
                } else {
                    $("#filterby").hide();
                }
                if (sort_by_data.length > 0) {
                    $("#sortby").show();
                } else {
                    $("#sortby").hide();
                }
                $("#generdata").html(gener_data);
                $("#sortdata").html(sort_by_data);
            }
        };
        filterList.open("GET", "" + baseurl + "getFilterDetails?authToken=" + authtoken + "&lang_code=" + lang_code + "", true);
        filterList.send();
    });
    function category(permalink) {
        //console.log("category"+permalink);
        $('#spinner').show();
        if (localStorage.getItem("generstringdata") == null || localStorage.getItem("generstringdata") == "") {
            generstringdata = "";
        } else {
            generstringdata = localStorage.getItem("generstringdata")
        }
        if (localStorage.getItem("sortbypermalink") == null || localStorage.getItem("sortbypermalink") == "") {
            sortbydata = "";
        } else {
            sortbydata = localStorage.getItem("sortbypermalink")
        }
        //console.log('sortbydata' + sortbydata);
        //console.log('generstringdata' + generstringdata);
        $.ajax({
            type: 'GET',
            url: baseurl + 'getContentList',
            dataType: 'json',
            timeout: 80000,
            data: {
                authToken: authtoken,
                permalink: permalink,
                lang_code: lang_code,
                genre: generstringdata,
                orderby: sortbydata,
                limit: 100,
                country: country
            },
            success: function (data, textStatus, xhr) {
                if (xhr.status == 200) {
                    var content_response = data;
                    console.log(content_response);
                    if (content_response.status == 200) {
                        var appendData = '';
                        if (content_response.movieList.length > 0) {
                            var j = 0;
                            var k = 0;
                            for (var i = 0; i < content_response.movieList.length; i++) {
                                var content_types_id = content_response.movieList[i].content_types_id;
                                if (content_types_id == "1" || content_types_id == "2" || content_types_id == "3" || content_types_id == "4") {
                                    j = j + 1;
                                    if ((j % 4) == 1) {
                                        k++;
                                    }
                                    var rand = Math.floor(Math.random() * 90 + 10);
                                    if (content_response.movieList[i].posterForTv != "") {
                                        appendData += '<div class="cusWidth cus-langdiv favRow' + k + '" id="favCol' + j + '_' + k + '" position="' + j + '" content_types_id="' + content_response.movieList[i].content_types_id + '" data-permalink="' + content_response.movieList[i].permalink + '"><div class="cutom-card"> <div class="cutom-cardbody"> <img src="' + content_response.movieList[i].posterForTv + '" class="img-fluid" alt=""><p class="see-more"></p></div></div></div>';
                                    } else {
                                        // appendData += '<div class="cusWidth cus-langdiv favRow' + k + '" id="favCol' + rand + '_' + k + '" position="' + j + '" content_types_id="' + content_response.movieList[i].content_types_id + '" data-permalink="' + content_response.movieList[i].permalink + '"><div class="cutom-card"> <div class="cutom-cardbody"> <img src="images/languageimage.jpg" class="img-fluid" alt=""><p class="see-more">' + content_response.movieList[i].name + '</p></div></div></div>';
                                        appendData += '<div class="cusWidth cus-langdiv favRow' + k + '" id="favCol' + j + '_' + k + '" position="' + j + '" content_types_id="' + content_response.movieList[i].content_types_id + '" data-permalink="' + content_response.movieList[i].permalink + '"><div class="cutom-card"> <div class="cutom-cardbody"> <img src="images/no_image_tv.png" class="img-fluid" alt=""></div></div></div>';
                                    }
                                }
                                if (content_response.movieList.length == (i + 1)) {
                                    $('#spinner').hide();
                                    //$('#cattegorySecBody').removeClass('hide');
                                    $("#contentBodySection").removeClass('hide');
                                }
                            }
                            if (appendData != '') {
                                $('#nocontent').hide();
                                $("#contentBodySection").empty().append('<div class="innerBodySection" id="innerBodySection">' + appendData + '</div>');
                                contentActivated();
                            } else {
                                $("#contentBodySection").empty();
                                $('#spinner').hide();
                                $('#nocontent').text(localStorage.getItem("no_content"));
                                $('#nocontent').show();
                            }
                        } else {
                            $("#contentBodySection").empty();
                            $('#spinner').hide();
                            $('#nocontent').text(localStorage.getItem("no_content"));
                            $('#nocontent').show();
                            //console.log('nocontent');
                        }
                    }
                }
            },
            error: function (xhr, textStatus) {
                errorUtil(xhr, textStatus);
            },
        });
    }
    var temp1 = 0;

    function callSubCategory(category_id, permalink) {
        $("#contentBodySection").empty();
        temp1 = 0;
        $('#spinner').show();
        function subCategoryResp(data, textStatus, xhr) {
            if (data.code == 200) {
                let subcategoryLen = data.sub_category_list.length;
                for (let i = 0; i < subcategoryLen; i++) {
                    let name = data.sub_category_list[i].subcat_name;
                    let subpermalink = data.sub_category_list[i].permalink;
                    let loop = i;
                    callSubCategoryContent(name, permalink, subpermalink, subcategoryLen, loop);
                }
            }
        }
        var URL = baseurl + "getSubCategoryList?authToken=" + authtoken + "&category_id=" + category_id + "&lang_code=" + lang_code;
        makeGetAjaxCall(URL, 15000, subCategoryResp);
        //console.log("category_id" + category_id + "===================permalink" + permalink)

        // $("#contentBodySection").empty();
        // temp1 = 0;
        // $('#spinner').show();
        // //console.log(category_id);
        // var subCtegory = new XMLHttpRequest();
        // subCtegory.onreadystatechange = function () {
        //     if (this.readyState == 4 && this.status == 200) {
        //         var getSubcategory_response = JSON.parse(this.responseText);
        //         console.log(getSubcategory_response);
        //         var subcategoryLen = getSubcategory_response.sub_category_list.length;
        //         //console.log(subcategoryLen);
        //         if (getSubcategory_response.code == 200) {
        //             for (var i = 0; i < subcategoryLen; i++) {
        //                 var name = getSubcategory_response.sub_category_list[i].subcat_name;
        //                 var subpermalink = getSubcategory_response.sub_category_list[i].permalink;
        //                 var loop = i;
        //                 callSubCategoryContent(name, permalink, subpermalink, subcategoryLen, loop);
        //             }
        //         }
        //     }
        // }
        // subCtegory.onerror = function () {
        //     $('#nocontent').text("Error in internet !!");
        //     $('#nocontent').show();
        //     var timer = setTimeout(function () {
        //         $('#nocontent').hide();
        //     }, 5000);
        // }
        // subCtegory.timeout = 15000;
        // subCtegory.ontimeout = function () {
        //     $('#nocontent').text(localStorage.getItem("internet_slow"));
        //     $('#nocontent').show();
        //     var timer = setTimeout(function () {
        //         $('#nocontent').hide();
        //     }, 5000);
        //     location.reload(true);
        // }
        // subCtegory.open("GET", "" + baseurl + "getSubCategoryList?authToken=" + authtoken + "&category_id=" + category_id + "&lang_code=" + lang_code + "", true);
        // subCtegory.send();
    }

    function callSubCategoryContent(nameHeader, permalink, subpermalink, subcategoryLen, loop) {
        console.log("nameHeader" + nameHeader + "  permalink" + permalink + "  subpermalink" + subpermalink + "  subcategoryLen" + subcategoryLen + "  loop" + loop);
        if (localStorage.getItem("generstringdata") == null || localStorage.getItem("generstringdata") == "") {
            generstringdata = "";
        } else {
            generstringdata = localStorage.getItem("generstringdata")
        }
        if (localStorage.getItem("sortbypermalink") == null || localStorage.getItem("sortbypermalink") == "") {
            sortbydata = "";
        } else {
            sortbydata = localStorage.getItem("sortbypermalink")
        }
        //console.log('sortbydata' + sortbydata);
        //console.log('generstringdata' + generstringdata);
        function subCatContentDetailsResp(data, textStatus, xhr) {
            var getResponse = data;
            console.log(getResponse);
            if (getResponse.status == 200) {
                if (getResponse.movieList.length > 0) {
                    $('#nocontent').hide();
                    var appendData = '';
                    var temp = 0;
                    for (var j = 0; j < getResponse.movieList.length; j++) {
                        var content_types_id = getResponse.movieList[j].content_types_id;
                        if (content_types_id == "1" || content_types_id == "2" || content_types_id == "3" || content_types_id == "4") {
                            temp = temp + 1
                            var randString = nameHeader.substring(1, 4);
                            if (getResponse.movieList[j].posterForTv != '') {
                                appendData += '<div class="col-lg-3 cus-langdiv" id="subcat' + randString + '_' + temp + '" position="' + temp + '" content_types_id="' + getResponse.movieList[j].content_types_id + '" data-permalink="' + getResponse.movieList[j].permalink + '"><div class="cutom-card "> <div class="cutom-cardbody"> <img id="al-halaqa-al-akhera" src="' + getResponse.movieList[j].posterForTv + '" class="img-fluid" alt=""><p class="see-more"></p></div></div></div>';
                            } else {
                                // appendData += '<div class="col-lg-3 cus-langdiv" id="subcat' + randString + '_' + temp + '" position="' + temp + '" content_types_id="' + getResponse.movieList[j].content_types_id + '" data-permalink="' + getResponse.movieList[j].permalink + '"><div class="cutom-card "> <div class="cutom-cardbody"> <img id="al-halaqa-al-akhera" src="images/languageimage.jpg" class="img-fluid" alt=""><p class="see-more">' + getResponse.movieList[j].name + '</p></div></div></div>';
                                appendData += '<div class="col-lg-3 cus-langdiv" id="subcat' + randString + '_' + temp + '" position="' + temp + '" content_types_id="' + getResponse.movieList[j].content_types_id + '" data-permalink="' + getResponse.movieList[j].permalink + '"><div class="cutom-card "> <div class="cutom-cardbody"> <img id="al-halaqa-al-akhera" src="images/no_image_tv.png" class="img-fluid" alt=""></div></div></div>';
                            }
                        }
                        if (subcategoryLen == (loop + 1)) {
                            $('#spinner').hide();
                            //$("#cattegorySecBody").removeClass('hide');
                            $("#contentBodySection").removeClass('hide');
                        }
                    }
                    if (appendData != '') {
                        temp1 = temp1 + 1;
                        $('#nocontent').hide();
                        $("#contentBodySection").append('<div class="row mb-4 rowNo' + temp1 + '" id="rowNo_' + temp1 + '"><div class="col-lg-12"><h3 class="cus-h3-padding">' + nameHeader + '</h3></div><div class="col-lg-12 homepagecontent_div" id="subcategoryContent_div">' + appendData + '</div></div>');
                        console.log(subcategoryLen);
                        console.log(temp1);
                        if (subcategoryLen === temp1)
                            contentActivated();
                    } else {
                        $("#contentBodySection").empty();
                        // $('#spinner').hide();
                        // $('#nocontent').text(localStorage.getItem("no_content"));
                        // $('#nocontent').show();
                    }
                } else {
                    $('#spinner').hide();
                    $("#contentBodySection").removeClass('hide');
                    if ($("#contentBodySection").children().length == 0) {
                        $('#nocontent').text(localStorage.getItem("no_content"));
                        $('#nocontent').show();
                    }
                }
            }
        }
        var URL = baseurl + "getContentList?authToken=" + authtoken + "&permalink=" + permalink + "_subcategory_" + subpermalink + "&genre=" + generstringdata + "&orderby=" + sortbydata + "&lang_code=" + lang_code + "&country=" + country + "&limit=100";
        makeGetAjaxCall(URL, 30000, subCatContentDetailsResp);

        // var getCategoryData = new XMLHttpRequest()
        // getCategoryData.onreadystatechange = function () {
        //     if (this.readyState == 4 && this.status == 200) {
        //         var getResponse = JSON.parse(this.responseText);
        //         console.log(getResponse);
        //         if (getResponse.status == 200) {
        //             if (getResponse.movieList.length > 0) {
        //                 $('#nocontent').hide();
        //                 var appendData = '';
        //                 var temp = 0;
        //                 for (var j = 0; j < getResponse.movieList.length; j++) {
        //                     var content_types_id = getResponse.movieList[j].content_types_id;
        //                     if (content_types_id == "1" || content_types_id == "2" || content_types_id == "3" || content_types_id == "4") {
        //                         temp = temp + 1
        //                         var randString = nameHeader.substring(1, 4);
        //                         if (getResponse.movieList[j].posterForTv != '') {
        //                             appendData += '<div class="col-lg-3 cus-langdiv" id="subcat' + randString + '_' + temp + '" position="' + temp + '" content_types_id="' + getResponse.movieList[j].content_types_id + '" data-permalink="' + getResponse.movieList[j].permalink + '"><div class="cutom-card "> <div class="cutom-cardbody"> <img id="al-halaqa-al-akhera" src="' + getResponse.movieList[j].posterForTv + '" class="img-fluid" alt=""><p class="see-more"></p></div></div></div>';
        //                         } else {
        //                             // appendData += '<div class="col-lg-3 cus-langdiv" id="subcat' + randString + '_' + temp + '" position="' + temp + '" content_types_id="' + getResponse.movieList[j].content_types_id + '" data-permalink="' + getResponse.movieList[j].permalink + '"><div class="cutom-card "> <div class="cutom-cardbody"> <img id="al-halaqa-al-akhera" src="images/languageimage.jpg" class="img-fluid" alt=""><p class="see-more">' + getResponse.movieList[j].name + '</p></div></div></div>';
        //                             appendData += '<div class="col-lg-3 cus-langdiv" id="subcat' + randString + '_' + temp + '" position="' + temp + '" content_types_id="' + getResponse.movieList[j].content_types_id + '" data-permalink="' + getResponse.movieList[j].permalink + '"><div class="cutom-card "> <div class="cutom-cardbody"> <img id="al-halaqa-al-akhera" src="images/no_image_tv.png" class="img-fluid" alt=""></div></div></div>';
        //                         }
        //                     }
        //                     if (subcategoryLen == (loop + 1)) {
        //                         $('#spinner').hide();
        //                         //$("#cattegorySecBody").removeClass('hide');
        //                         $("#contentBodySection").removeClass('hide');
        //                     }
        //                 }
        //                 if (appendData != '') {
        //                     temp1 = temp1 + 1;
        //                     $('#nocontent').hide();
        //                     $("#contentBodySection").append('<div class="row mb-4 rowNo' + temp1 + '" id="rowNo_' + temp1 + '"><div class="col-lg-12"><h3 class="cus-h3-padding">' + nameHeader + '</h3></div><div class="col-lg-12 homepagecontent_div" id="subcategoryContent_div">' + appendData + '</div></div>');
        //                     contentActivated();
        //                 } else {
        //                     $("#contentBodySection").empty();
        //                     // $('#spinner').hide();
        //                     // $('#nocontent').text(localStorage.getItem("no_content"));
        //                     // $('#nocontent').show();
        //                 }
        //             } else {
        //                 $('#spinner').hide();
        //                 $("#contentBodySection").removeClass('hide');
        //                 if ($("#contentBodySection").children().length == 0) {
        //                     $('#nocontent').text(localStorage.getItem("no_content"));
        //                     $('#nocontent').show();
        //                 }
        //             }
        //         }
        //     }
        // }
        // getCategoryData.timeout = 30000;
        // getCategoryData.ontimeout = function () {
        //     $('#nocontent').text(localStorage.getItem("internet_slow"));
        //     $('#nocontent').show();
        //     var timer = setTimeout(function () {
        //         $('#nocontent').hide();
        //     }, 5000);
        // }
        // getCategoryData.open("GET", "" + baseurl + "getContentList?authToken=" + authtoken + "&permalink=" + permalink + "_subcategory_" + subpermalink + "&genre=" + generstringdata + "&orderby=" + sortbydata + "&lang_code=" + lang_code + "&limit=" + 100 + "", true);
        // getCategoryData.send();
    }

    //Remote Function//
    document.onkeydown = checkKey;

    function checkKey(e) {
        e = e || window.event;
        //For RTl Use ( Don't Modify This Section )
        var remoteBtnCode = '';
        var lang_code = localStorage.getItem("lang_code");
        if (lang_code == "ar" || lang_code == "arc" || lang_code == "az" || lang_code == "dv" || lang_code == "iw" || lang_code == "ku" ||
            lang_code == "fa" || lang_code == "ur") {
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
                if (currentparentId === "categories") {
                    if ($current.prev().length > 0) {
                        $current.removeClass('current');
                        $current.prev().addClass('current');
                    } else {
                        $current.removeClass('current');
                        $('#mainmenu').children().eq(0).addClass('current');
                    }
                } else if (currentparentId == "innerBodySection") {
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
                        $("#filter").addClass("current");
                    }
                } else if (currentparentId == "subcategoryContent_div") {
                    var rowId = $current.parent().parent().get()[0].id;
                    if ($current.parent().parent().prev().length > 0) {
                        $current.removeClass('current');
                        var id = parseInt(rowId.split("_")[1]);
                        var nextRowId = id - 1;
                        var tempid = id - 2;
                        $(".rowNo" + tempid).removeClass('hide');
                        $("#rowNo_" + nextRowId).children().eq(1).children('div').removeClass("hide");
                        $("#rowNo_" + nextRowId).children().eq(1).children('div').eq(0).addClass('current');
                    } else {
                        $current.removeClass('current');
                        $("#filter").addClass("current");
                    }
                } else if (currentparentId == "filtersec") {
                    $current.removeClass('current');
                    $('#mainmenu').children().eq(0).addClass('current');
                } else if (currentparentId == "generdata") {
                    if ($current.prev().length > 0) {
                        $current.removeClass('current');
                        $current.prev().removeClass('d-none');
                        $current.prev().addClass('current');
                    } else {
                        $current.removeClass('current');
                        $("#oktype").addClass("current");
                    }
                } else if (currentparentId == "sortdata") {
                    if ($current.prev().length > 0) {
                        $current.removeClass('current');
                        $current.prev().addClass('current');
                    } else {
                        $current.removeClass('current');
                        $("#oktype").addClass("current");
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
                    $current.removeClass("current");
                    if ($("#contentBodySection").children().length == 0) {
                        $("#categories").children('p').eq(0).addClass('current');
                    } else if ($("#contentBodySection").children().length == 1) {
                        $("#contentBodySection").children().eq(0).children().eq(0).addClass('current');
                    } else {
                        $("#contentBodySection").children().eq(0).children().eq(1).children('div').eq(0).addClass('current');
                    }
                    // var children = $("#contentBodySection").children().get()[0].id;
                    // if (children == "innerBodySection") {
                    //     if ($("#contentBodySection").children().length > 0) {
                    //         $current.removeClass("current");
                    //         $("#contentBodySection").children().eq(0).children().eq(0).addClass('current');
                    //     }
                    // } else {
                    //     if ($("#contentBodySection").children().length > 0) {
                    //         $current.removeClass("current");
                    //         $("#contentBodySection").children().eq(0).children().eq(1).children('div').eq(0).addClass('current');
                    //     } else {
                    //         alert("sdjwqdhooqhs")
                    //     }
                    // }
                    /*$current.removeClass("current");
                    var children = $("#contentBodySection").children().get()[0].id;
                    if (children == "innerBodySection") {
                        $("#contentBodySection").children().eq(0).children().eq(0).addClass('current');
                    }
                    else {
                        $("#contentBodySection").children().eq(0).children().eq(1).children('div').eq(0).addClass('current');
                    }*/
                } else if (currentparentId === "categories") {
                    if ($current.next().length > 0) {
                        $current.removeClass('current');
                        $current.next().addClass('current');
                    }
                } else if (currentparentId == "innerBodySection") {
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
                } else if (currentparentId == "subcategoryContent_div") {
                    var rowId = $current.parent().parent().get()[0].id;
                    if ($current.parent().parent().next().length > 0) {
                        $current.removeClass('current');
                        var id = parseInt(rowId.split("_")[1]);
                        var nextRowId = id + 1;
                        if (id >= 3) {
                            var tempid = id - 2;
                            $(".rowNo" + tempid).addClass('hide');
                        }
                        $("#rowNo_" + nextRowId).children().eq(1).children('div').removeClass("hide");
                        $("#rowNo_" + nextRowId).children().eq(1).children('div').eq(0).addClass('current');
                    }
                } else if (currentparentId == "btnFilterSec") {
                    $current.removeClass('current');
                    if ($("#generdata").children().length > 0) {
                        $("#generdata").children().removeClass('hide');
                        $("#generdata").children("label").eq(0).addClass('current');
                    } else {
                        $("#sortdata").children().removeClass("d-none");
                        $("#sortdata").children("label").eq(0).addClass('current');
                    }
                } else if (currentparentId == "generdata") {
                    if ($current.next().length > 0) {
                        $current.removeClass('current');
                        var position = parseInt($("#" + currentId).attr("data-idvalue"));
                        if (position >= 6) {
                            var deletedId = position - 6;
                            $("#ger_" + deletedId).addClass('d-none');
                        }
                        $current.next().addClass('current');
                    }
                } else if (currentparentId == "sortdata") {
                    if ($current.next().length > 0) {
                        $current.removeClass('current');
                        $current.next().addClass('current');
                    }
                } else if (currentparentId == "filtersec") {
                    $current.removeClass("current");
                    if ($("#contentBodySection").children().length == 0) {
                        $current.removeClass('current');
                        $("#categories").children('p').eq(0).addClass('current');
                    } else if ($("#contentBodySection").children().length == 1) {
                        $("#contentBodySection").children().eq(0).children().eq(0).addClass('current');
                    } else {
                        $("#contentBodySection").children().eq(0).children().eq(1).children('div').eq(0).addClass('current');
                    }

                    // $current.removeClass("current");
                    // var children = $("#contentBodySection").children().get()[0].id;
                    // if (children == "innerBodySection") {
                    //     $("#contentBodySection").children().eq(0).children().eq(0).addClass('current');
                    // } else {
                    //     $("#contentBodySection").children().eq(0).children().eq(1).children('div').eq(0).addClass('current');
                    // }
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
                } else if (currentparentId == "subcategoryContent_div") {
                    if ($current.prev().length > 0) {
                        $current.removeClass('current');
                        $current.prev().removeClass('hide');
                        $current.prev().addClass('current');
                    } else {
                        $current.removeClass('current');
                        $("#categories").children('p').eq(0).addClass('current');
                    }
                } else if (currentparentId == "innerBodySection") {
                    if ($current.prev().length > 0) {
                        $current.removeClass('current');
                        var position = parseInt($('#' + currentId).attr('position'));
                        if ((position % 4) == 1) {
                            var deletedIndex = (parseInt(currentId.split("_")[1])) - 2;
                            $('.favRow' + deletedIndex).removeClass('hide');
                        }
                        $current.prev().addClass('current');
                    } else {
                        $current.removeClass('current');
                        $("#categories").children('p').eq(0).addClass('current');
                    }
                } else if (currentparentId == "btnFilterSec") {
                    if ($current.next().length > 0) {
                        $current.removeClass('current');
                        $current.next().addClass('current');
                    }
                } else if (currentparentId == "sortdata") {
                    $current.removeClass('current');
                    $("#generdata").children().removeClass("d-none");
                    $("#generdata").children("label").eq(0).addClass('current');
                } else if (currentparentId == "filtersec") {
                    $current.removeClass('current');
                    $("#categories").children('p').eq(0).addClass('current');
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
                if (currentparentId == "mainmenu") {
                    if ($current.next().length > 0) {
                        $current.removeClass('current');
                        $current.next().addClass('current');
                    }
                } else if (currentparentId == "innerBodySection") {
                    if ($current.next().length > 0) {
                        $current.removeClass('current');
                        var position = parseInt($('#' + currentId).attr('position'));
                        if (position >= 12 && (position % 4) == 0) {
                            var deletedIndex = (parseInt(currentId.split("_")[1])) - 2;
                            $('.favRow' + deletedIndex).addClass('hide');
                        }
                        $current.next().addClass('current');
                    }
                } else if (currentparentId === "categories") {
                    var children = $("#contentBodySection").children().get()[0].id;
                    if (children == "innerBodySection") {
                        if ($("#contentBodySection").children().length > 0) {
                            $current.removeClass("current");
                            $("#contentBodySection").children().eq(0).children().eq(0).addClass('current');
                        }
                    } else {
                        if ($("#contentBodySection").children().length > 0) {
                            $current.removeClass("current");
                            $("#contentBodySection").children().removeClass("hide");
                            $("#contentBodySection").children().eq(0).children().eq(1).children('div').eq(0).addClass('current');
                        }
                    }
                } else if (currentparentId === "subcategoryContent_div") {
                    if ($current.next().length > 0) {
                        var position = parseInt($("#" + currentId).attr("position"));
                        var hideposition = position - 2;
                        if (position >= 3) {
                            var tempCurrentId = currentId.split("_")[0];
                            //console.log(tempCurrentId)
                            var deletedId = tempCurrentId + "_" + hideposition;
                            $("#" + deletedId).addClass('hide');
                        }
                        $current.removeClass('current');
                        $current.next().addClass('current');
                    }
                } else if (currentparentId == "btnFilterSec") {
                    if ($current.prev().length > 0) {
                        $current.removeClass('current');
                        $current.prev().addClass('current');
                    }
                } else if (currentparentId == "generdata") {
                    $current.removeClass('current');
                    $("#sortdata").children().removeClass("d-none");
                    $("#sortdata").children("label").eq(0).addClass('current');
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
            } else if (currentparentId === "categories") {
                if ($('.chkbox').prop('checked')) {
                    $('.chkbox').prop("checked", false);

                } else {
                    //$('.chkbox').prop("checked", t);
                }
                localStorage.removeItem("generstringdata");
                localStorage.removeItem("sortbypermalink");

                var permalink = $('#' + currentId).attr('permalink');
                var has_subcategory = $('#' + currentId).attr('has_subcategory');
                var category_id = $('#' + currentId).attr('category_id');

                filtHasCategory = has_subcategory;
                filtPermalink = permalink;
                filtCategoryId = category_id;

                /*Backups for the back to this page*/
                localStorage.setItem("backupPermalink", permalink);
                localStorage.setItem("backupHasCategory", has_subcategory);
                localStorage.setItem("backupCategoryId", category_id);
                localStorage.setItem("leftCurrentId", currentId);

                // for remove current color and add current color
                $(".categories p").each(function (index) {
                    $(this).css("color", "#fff");
                });
                $("#" + currentId).css("color", "#0cb9f2");

                if (has_subcategory == 1) {
                    $('#nocontent').empty();
                    $("#contentBodySection").empty();
                    $("#contentBodySection").addClass('hide');
                    callSubCategory(category_id, permalink);
                } else {
                    $('#nocontent').empty();
                    $("#contentBodySection").empty();
                    $("#contentBodySection").addClass('hide');
                    category(permalink);
                }
            } else if (currentparentId == "filtersec") {
                // $('#spinner').hide();
                // $current.removeClass('current');
                // $("#closemodal").addClass('current');

                // $("#filterModal").on("shown.bs.modal", function () {
                //     if ($('.chkbox').prop('checked')) {
                //         $('.chkbox').prop("checked", false);
                //     } else {
                //         //$('.chkbox').prop("checked", true);
                //     }
                // }).modal('show');
                $('#spinner').hide();
                $current.removeClass('current');
                $("#filterModal").modal('show');
                $("#closemodal").addClass('current');
            } else if (currentparentId == "btnFilterSec") {
                $('#spinner').hide();
                if (currentId == "closemodal") {
                    $current.removeClass('current');
                    $("#filter").addClass("current");
                    $("#filterModal").modal('hide');
                } else {
                    $current.removeClass('current');
                    $("#filter").addClass("current");
                    $("#filterModal").modal('hide');
                    var generstringdata = myData.join();
                    localStorage.setItem("generstringdata", generstringdata);
                    if (filtHasCategory == "0") {
                        category(filtPermalink);
                    } else {
                        callSubCategory(filtCategoryId, filtPermalink);
                    }
                }
            }
            if (currentparentId == "generdata") {
                dataGenername = $('#' + currentId).attr('data-genername');
                var splitdata = currentId.split("_");
                if ($('#chkbox' + splitdata[1]).is(':checked')) {
                    $('#chkbox' + splitdata[1]).prop('checked', false);
                    myData.pop(dataGenername);
                } else {
                    $('#chkbox' + splitdata[1]).prop('checked', true);
                    myData.push(dataGenername);
                    localStorage.setItem("dataGenername", dataGenername);
                }
            }
            if (currentparentId == "sortdata") {
                sortbypermalink = $("#" + currentId).attr('data-permalink');
                var splitdata = currentId.split("_");
                if ($('#radio' + splitdata[1]).is(':checked')) {
                    $('#radio').prop('checked', false);
                    localStorage.removeItem("sortbypermalink");
                } else {
                    $('#radio' + splitdata[1]).prop('checked', true);
                    localStorage.setItem("sortbypermalink", sortbypermalink);
                }
            } else if (currentparentId == "subcategoryContent_div") {
                localStorage.setItem("catActiveId", currentId);
                var permalink = $('#' + currentId).attr('data-permalink');
                var content_types_id = $('#' + currentId).attr('content_types_id');
                if (content_types_id == "1" || content_types_id == "2" || content_types_id == "4") {
                    var create_href = "singlepart.html?permalink=" + permalink;
                    $(location).attr('href', create_href);
                } else {
                    var create_href = "multipart.html?permalink=" + permalink;
                    $(location).attr('href', create_href);
                }
            } else if (currentparentId == "innerBodySection") {
                localStorage.setItem("catActiveId", currentId);
                var permalink = $('#' + currentId).attr('data-permalink');
                var content_types_id = $('#' + currentId).attr('content_types_id');
                if (content_types_id == "1" || content_types_id == "2" || content_types_id == "4") {
                    var create_href = "singlepart.html?permalink=" + permalink;
                    $(location).attr('href', create_href);
                } else {
                    var create_href = "multipart.html?permalink=" + permalink;
                    $(location).attr('href', create_href);
                }
            }
        } else if (remoteBtnCode == '10009') {
            if ($('#filterModal').is(':visible') == true) {
                var $current = $('.current');
                $current.removeClass('current');
                $("#filter").addClass("current");
                $("#filterModal").modal('hide');
            } else {
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
    }
    //Remote Function//
} //end
window.onload = init;

// for navigation menu
function navBarCall(permalink) {
    if (($("#spinner").is(":visible") != true)) {
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
}

// function errorUtil(xhr, textStatus) {
//     if (xhr.readyState == 0 && textStatus == "error") {
//         location.reload(true);
//         console.log('not ready');
//     } else if (textStatus == "timeout") {
//         console.log('timeout');
//         $('#nocontent').text(localStorage.getItem("internet_slow"));
//         $('#nocontent').show();
//         var timer = setTimeout(function () {
//             $('#nocontent').hide();
//             location.reload(true);
//         }, 5000);
//     } else {
//         console.log('No Response From Server!');
//         $('#nocontent').text("No Response From Server!");
//         $('#nocontent').show();
//         var timer = setTimeout(function () {
//             $('#nocontent').hide();
//         }, 5000);
//     }
// }

function contentActivated() {
    let tempHasCategory = localStorage.getItem("backupHasCategory");
    if ("catActiveId" in localStorage) {
        let backUpCatId = localStorage.getItem("catActiveId");
        if (tempHasCategory == 1) {
            var $current = $('.current');
            $current.removeClass("current");
            $("#" + backUpCatId).addClass("current");
            var $current = $('.current');
            var currentId = $current.get()[0].id;
            var currentparentId = $current.parent().parent().get()[0].id;
            var parentRowId = parseInt(currentparentId.split("_")[1]);

            let colItemId = parseInt(currentId.split("_")[1]);
            if (colItemId > 4) {
                for (let i = 1; i <= colItemId - 4; i++) {
                    console.log("#" + currentId.split("_")[0] + "_" + i);
                    $("#" + currentId.split("_")[0] + "_" + i).addClass('hide');
                }
            }

            if (parentRowId > 3) {
                for (let i = 1; i < parentRowId - 2; i++) {
                    $(".rowNo" + i).addClass('hide');
                }
            }

        } else {
            if ("catActiveId" in localStorage) {
                let rowPosition = parseInt(backUpCatId.split("_")[1]);
                if (rowPosition > 3) {
                    var $current = $('.current');
                    $current.removeClass("current");
                    for (let i = 0; i < rowPosition - 3; i++) {
                        $(".favRow" + i).addClass('hide');
                    }
                }
                $("#" + backUpCatId).addClass("current");
            }
        }
    }
}