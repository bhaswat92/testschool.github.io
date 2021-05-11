var defaultPlaybackId='speed_2';
var defaultSubtile='subtitle_0';
var defaultAudio ='audio_0';
var defaultMenuId='';

function speedCreate(){
    var speed=[0.25,0.5,1,1.5,2];
    var _speed_div='';
    for (var index = 0; index < speed.length; index++) {
      if(speed[index] === 1){
         _speed_div+='<div class="menu-item" id="speed_'+index+'">Normal</div>';
      }else{
         _speed_div+='<div class="menu-item" id="speed_'+index+'">'+speed[index]+'</div>';
      }
    }
    //console.log(_speed_div);
    $(".menu-right").empty().append('<p class="list-title">Playback Speed</p><div class="speed-list" id="speed-list">'+_speed_div+'</div>');
}

// key function
function upKey() {
    var $current = $('.current');
    var currentId = $current.get()[0].id;
    var currentParentId = $current.parent().get()[0].id;
    console.log('up')
    if(currentParentId==="innerBlock"){
        if (($("#auto_play_div").is(":visible") == true)) {
            document.getElementById('auto_play_div').style.display='none';
        }
        $current.removeClass('current');
        $(".cusProgress").addClass('current');
    }else if(currentParentId==="speed-list"){
        if ($current.prev().length > 0) {
            $current.removeClass('current');
            $current.prev().addClass("current");
        }
    }else if(currentParentId==="subtile-list"){
        if ($current.prev().length > 0) {
            $current.removeClass('current');
            $current.prev().addClass("current");
        }
    }else if(currentParentId==="audio-list"){
        if ($current.prev().length > 0) {
            $current.removeClass('current');
            $current.prev().addClass("current");
        }
    }
}
function downKey() {
    var $current = $('.current');
    var currentId = $current.get()[0].id;
    var currentParentId = $current.parent().get()[0].id;
    console.log('down')
    if(currentParentId==="video-controls"){
        $current.removeClass('current');
        $("#innerBlock").children().eq(1).addClass('current');
    }else if(currentParentId==="speed-list"){
        if ($current.next().length > 0) {
            $current.removeClass('current');
            $current.next().addClass("current");
        }
    }else if(currentParentId==="subtile-list"){
        if ($current.next().length > 0) {
            $current.removeClass('current');
            $current.next().addClass("current");
        }
    }
    else if(currentParentId==="audio-list"){
        if ($current.next().length > 0) {
            $current.removeClass('current');
            $current.next().addClass("current");
        }
    }else if(currentParentId==="innerBlock"){
        if (trailer == "false") {
            console.log(mediaQueueResponse);
            if (Object.getOwnPropertyNames(mediaQueueResponse.previous_media_info).length == 0) {
                document.getElementById("previous").style.display='none';
            } else {
                $("#title").text(mediaQueueResponse.previous_media_info.content_title);
                if(mediaQueueResponse.previous_media_info.poster_for_tv != ''){
                    $("#autoplay_image").attr("src", mediaQueueResponse.previous_media_info.poster_for_tv);
                }else{
                    $("#autoplay_image").attr("src", "images/no_image.png");
                }
                content_uniq_id = mediaQueueResponse.previous_media_info.content_uniq_id;
                localStorage.setItem("content_uniq_id_video", content_uniq_id);
                stream_uniq_id = mediaQueueResponse.previous_media_info.stream_uniq_id;
                localStorage.setItem("stream_in_video", stream_uniq_id);
                content_types_id = mediaQueueResponse.previous_media_info.content_types_id;
                localStorage.setItem("content_types_id", content_types_id);
                document.getElementById('auto_play_div').style.display='block';
                document.getElementById("previous").style.display='block';
            }
            if (Object.getOwnPropertyNames(mediaQueueResponse.next_media_info).length == 0) {
                //document.getElementById('auto_play_div').style.display='none';
                document.getElementById("next").style.display='none';
            } else {
                $("#title").text(mediaQueueResponse.next_media_info.content_title);
                if(mediaQueueResponse.next_media_info.poster_for_tv != ''){
                    $("#autoplay_image").attr("src", mediaQueueResponse.next_media_info.poster_for_tv);
                }else{
                    $("#autoplay_image").attr("src", "images/no_image.png");
                }
                content_uniq_id = mediaQueueResponse.next_media_info.content_uniq_id;
                localStorage.setItem("content_uniq_id_video", content_uniq_id);
                stream_uniq_id = mediaQueueResponse.next_media_info.stream_uniq_id;
                localStorage.setItem("stream_in_video", stream_uniq_id);
                content_types_id = mediaQueueResponse.next_media_info.content_types_id;
                localStorage.setItem("content_types_id", content_types_id);
                document.getElementById('auto_play_div').style.display='block';
                document.getElementById("next").style.display='block';
            }
            
        }
    }
}
function leftKey() {
    var $current = $('.current');
    var currentId = $current.get()[0].id;
    var currentParentId = $current.parent().get()[0].id;

    console.log('left')
    if(currentParentId==="innerBlock"){
        if ($current.prev().length > 0) {
            $current.removeClass('current');
            $current.prev().addClass("current");
        }
    }else if(currentParentId==="video-controls"){
        if(currentId === "cusProgress"){
            player.currentTime -= 10;
        }
    }else if(currentParentId == "playersec"){
        if ($current.prev().length > 0) {
            if (($("#previous").is(":visible") == true)) {
                console.log("1");
                $current.removeClass('current');
                $("#previous").addClass('current');
            } else {
                menuDefaultActive();
            }
        } else {
            menuDefaultActive();
        }
    }
}
function rightKey() {
    var $current = $('.current');
    var currentId = $current.get()[0].id;
    var currentParentId = $current.parent().get()[0].id;
    console.log('right')
    if(currentParentId==="innerBlock"){
        if ($current.next().length > 0) {
            $current.removeClass('current');
            $current.next().addClass("current");
        }else{
            if (($("#auto_play_div").is(":visible") == true)) {
                if (($("#previous").is(":visible") == true)) {
                    console.log("1");
                    $current.removeClass('current');
                    $("#previous").addClass('current');
                } else {
                    console.log("2");
                    $current.removeClass('current');
                    $("#next").addClass('current');
                }
            }
        }
    }else if(currentParentId==="video-controls"){
        if(currentId === "cusProgress"){
            player.currentTime += 10;
        }
    }else if (currentParentId == "playersec") {
        if ($current.next().length > 0) {
            $current.removeClass('current');
            $current.next().addClass('current');
        }
    }
}
function enterKey() {
    var $current = $('.current');
    var currentId = $current.get()[0].id;
    var currentParentId = $current.parent().get()[0].id;
    if(currentParentId==="innerBlock"){
        if(currentId==="pause"){
            player.play();
        }else if(currentId==="play"){
            player.pause();
        }
        else if(currentId==="rew"){
            player.currentTime -= 10;
        }else if(currentId==="ff"){
            player.currentTime += 10;
        }
        else if(currentId==="speed"){
            if (($("#auto_play_div").is(":visible") == true)) {
                document.getElementById('auto_play_div').style.display='none';
            }
            speedCreate();
            $current.removeClass('current');
            $("#"+defaultPlaybackId).addClass("current");
            $(".menu-right").addClass('opened');
            //defaultMenuId = currentId;
        }else if(currentId==="subTitlebtn"){
            if (($("#auto_play_div").is(":visible") == true)) {
                document.getElementById('auto_play_div').style.display='none';
            }
            $(".menu-right").empty().append('<p class="list-title">Subtile</p><div class="subtile-list" id="subtile-list">'+subtileList+'</div>');
            $current.removeClass('current');
            $("#"+defaultSubtile).addClass("current");
            //defaultSubtile=currentId;
            $(".menu-right").addClass('opened');
        }else if(currentId==="audio_btn"){
            if (($("#auto_play_div").is(":visible") == true)) {
                document.getElementById('auto_play_div').style.display='none';
            }
            $(".menu-right").empty().append('<p class="list-title">Audio</p><div class="audio-list" id="audio-list">'+audioList+'</div>');
            $current.removeClass('current');
            $("#"+defaultAudio).addClass("current");
            //defaultAudio=currentId;
            $(".menu-right").addClass('opened');
        }
    }else if(currentParentId==="speed-list"){
        var speed=[0.25,0.5,1,1.5,2];
        var currentPos=parseInt(currentId.split("_")[1]);
        defaultPlaybackId=currentId;
        player.playbackRate = speed[currentPos];
        //menuDefaultActive();
        $(".menu-right").removeClass('opened');
        $current.removeClass('current');
        $("#innerBlock").children().eq(1).addClass('current');
    }else if(currentParentId==="subtile-list"){
        //defaultSubtile=currentId;
        if(currentId=="subtitle_off"){
            player.textTracks.forEach(function(track) {
                track.mode = "disabled";
              });
            defaultSubtile="subtitle_off";
        }else{
            var currentPos=parseInt(currentId.split("_")[1]);
            player.textTracks.forEach(function(track) {
                track.mode = "disabled";
              });
            player.textTracks[currentPos].mode = "showing";
            defaultSubtile=currentId;
        }
        //menuDefaultActive();
        $(".menu-right").removeClass('opened');
        $current.removeClass('current');
        $("#innerBlock").children().eq(1).addClass('current');
    }
    else if(currentParentId==="audio-list"){
        var currentPos=parseInt(currentId.split("_")[1]);
        player.audioTracks.forEach(function(track) {
            track.enabled = false;
        });
        if(currentPos == ''){
            player.audioTracks[0].enabled = true;
        }else{
            player.audioTracks[currentPos].enabled = true;
        }
        defaultAudio=currentId;
        //menuDefaultActive();
        $(".menu-right").removeClass('opened');
        $current.removeClass('current');
        $("#innerBlock").children().eq(1).addClass('current');
    }else if (currentParentId == "playersec") {
        if (currentId == "previous") {
            console.log("previous");
            counter = counter - 1;
            localStorage.setItem("count", counter);
            $("#title").text(mediaQueueResponse.previous_media_info.content_title);
            if(mediaQueueResponse.previous_media_info.poster_for_tv != ''){
                $("#autoplay_image").attr("src", mediaQueueResponse.previous_media_info.poster_for_tv);
            }else{
                $("#autoplay_image").attr("src", "images/no_image.png");
            }
            auto_play_content_uniq_id = mediaQueueResponse.previous_media_info.content_uniq_id;
            localStorage.setItem("content_uniq_id_video", content_uniq_id);
            auto_play_stream_uniq_id = mediaQueueResponse.previous_media_info.stream_uniq_id;
            localStorage.setItem("stream_in_video", stream_uniq_id);
            auto_play_content_types_id = mediaQueueResponse.previous_media_info.content_types_id;
            localStorage.setItem("content_types_id", content_types_id);
            $(location).attr('href', "autoplaydesc.html?content_uniq_id=" + auto_play_content_uniq_id + "&stream_uniq_id=" + auto_play_stream_uniq_id + "&click_key=previous" + "&content_types_id=" + auto_play_content_types_id);
        } else if (currentId == "next") {
            console.log("next");
            counter = counter - 1;
            localStorage.setItem("count", counter);
            $("#title").text(mediaQueueResponse.next_media_info.content_title);
            if(mediaQueueResponse.next_media_info.poster_for_tv != ''){
                $("#autoplay_image").attr("src", mediaQueueResponse.next_media_info.poster_for_tv);
            }else{
                $("#autoplay_image").attr("src", "images/no_image.png");
            }
            auto_play_content_uniq_id = mediaQueueResponse.next_media_info.content_uniq_id;
            localStorage.setItem("content_uniq_id_video", content_uniq_id);
            auto_play_stream_uniq_id = mediaQueueResponse.next_media_info.stream_uniq_id;
            localStorage.setItem("stream_in_video", stream_uniq_id);
            auto_play_content_types_id = mediaQueueResponse.next_media_info.content_types_id;
            localStorage.setItem("content_types_id", content_types_id);
            $(location).attr('href', "autoplaydesc.html?content_uniq_id=" + auto_play_content_uniq_id + "&stream_uniq_id=" + auto_play_stream_uniq_id + "&click_key=next" + "&content_types_id=" + auto_play_content_types_id);
        }
    }else if(currentParentId==="error_btn-div"){
        if ("customCounter" in localStorage) {
            customBack(localStorage.getItem("customCounter"));
        } else {
            customBack(1);
        }
    }
}
function menuDefaultActive(){
    console.log('called')
    var $current = $('.current');
    var currentId = $current.get()[0].id;
    var currentParentId = $current.parent().get()[0].id;
    if(($("#auto_play_div").is(":visible") == true)){
        document.getElementById('auto_play_div').style.display='none';
    }
    if(($("#menu-right").is(":visible") == true)){
        $(".menu-right").removeClass('opened');
    }
    if(errorNotificShow){
        $current.removeClass('current');
        $("#error_back").addClass("current");
    }else{
        if(($("#video-controls").is(":visible") == true)){
            $current.removeClass('current');
            $("#"+currentId).addClass("current");
        }else{
            $current.removeClass('current');
            $("#innerBlock").children().eq(1).addClass('current');
        }
    }
}
