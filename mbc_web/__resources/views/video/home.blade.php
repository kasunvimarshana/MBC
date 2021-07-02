@extends('layout.layout')
@section('content')

<center>
    <img src="{{ asset('img/home_logo.png') }}" width="250"/>
    <h1>MBC TV MALAWI LIVE</h1>
    <video id="video" autoplay="true" width="70%" controls>MBC TV PLAYER</video>
    <br />
    <span style="font-size:12px;">Service provided by <a href="{{ url('/') }}" target="_blank">Globe Internet Ltd, Malawi</a></span>
</center>

@endsection

@section('page_scripts')
    @parent
    <script src="https://cdn.jsdelivr.net/npm/hls.js@canary"></script>
    <script>
        var video = document.getElementById('video');
        if (Hls.isSupported()) {
            var hls = new Hls();
            hls.loadSource('http://41.216.229.205:8080/live/livestream/index.m3u8');
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, function() {
                video.play();
            });
        }
        else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = 'http://41.216.229.205:8080/live/livestream/index.m3u8';
            video.addEventListener('loadedmetadata', function() {
                video.play();
            });
        }
        else {
            document.getElementById("video").innerHTML = "HLS streaming not supporte !";
        }
    </script> 
@endsection

