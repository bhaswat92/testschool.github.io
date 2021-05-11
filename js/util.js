makeGetAjaxCall = (url, time, callback) => {
    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded',
        timeout: time,
        cache: false,
        // success: callback,
        // error: function (xhr, textStatus) {
        //     errorUtil(xhr, textStatus);
        // },
    })
        .done(callback)
        .fail(function (jqXHR, textStatus, errorThrown) { errorUtil(jqXHR, textStatus); });
}
makePostAjaxCall = (url, time, bodyData, callback) => {
    $.ajax({
        type: 'POST',
        url: url,
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded',
        timeout: time,
        data: JSON.stringify(bodyData),
        cache: false,
        // success: callback,
        // error: function (xhr, textStatus) {
        //     errorUtil(xhr, textStatus);
        // },
    })
        .done(callback)
        .fail(function (jqXHR, textStatus, errorThrown) { errorUtil(jqXHR, textStatus); });
}
function errorUtil(xhr, textStatus) {
    // console.log(xhr);
    // console.log(textStatus);
    if (xhr.readyState == 0 && textStatus == "error") {
        //$('#nocontent').text(localStorage.getItem("no_internet_connection"));
        $('#nocontent').show();
        setTimeout(function () {
            $('#nocontent').hide();
            location.reload(true);
        }, 15000);
        //console.log('Not connected.\nPlease verify your network connection.');
    } else if (xhr.status == 404) {
        $('#nocontent').text(localStorage.getItem("server_down"));
        $('#nocontent').show();
        setTimeout(function () {
            $('#nocontent').hide();
            $('#spinner').hide();
        }, 10000);
        //console.log('The requested page not found. [404]');
    } else if (xhr.status == 500) {
        $('#nocontent').text(localStorage.getItem("server_down"));
        $('#nocontent').show();
        setTimeout(function () {
            $('#nocontent').hide();
            $('#spinner').hide();
        }, 10000);
        //console.log('Internal Server Error [500].');
    } else if (textStatus === 'timeout') {
        $('#nocontent').text(localStorage.getItem("internet_slow"));
        $('#nocontent').show();
        setTimeout(function () {
            $('#nocontent').hide();
            location.reload(true);
        }, 15000);
        //console.log('Time out error.');
    } else {
        $('#nocontent').text(localStorage.getItem("server_down"));
        $('#nocontent').show();
        setTimeout(function () {
            $('#nocontent').hide();
            location.reload(true);
        }, 10000);
    }
}
