@extends('layout.layout')
@section('content')
@php
    $placehold_image = asset('img/logo-removebg.png');
@endphp
<div class="container">
    <div class="card-deck">
        @php
            $temp_placehold_image = ($video->image_uri !== asset(null)) ? $video->image_uri : $placehold_image;
        @endphp

        <div class="card my-4">
            <!-- img class="card-img-top img-fluid" src="" alt="{{ $video->name }}"/ -->
            <video poster="{{ $temp_placehold_image }}" controls preload="metadata" id="video_player" width="100%" height="255">
                <source src="{{ $video->video_uri }}" type="video/mp4"/>
                <source src="{{ $video->video_uri }}" type="video/ogg"/>
                <source src="{{ $video->video_uri }}" type="video/webm"/>
                <source src="{{ $video->video_uri }}" type="application/x-mpegURL"/>
                <object data="{{ $video->video_uri }}" width="100%" height="255">
                    <embed src="{{ $video->video_uri }}" width="100%" height="255"/>
                </object>
            </video>

            <div class="card-body">
                <h4 class="card-title">{{ $video->name }}</h4>
                <p class="card-text">{{ $video->description }}</p>
            </div>
            <div class="card-body text-right">
                <div class="btn-group" role="group" aria-label="Button Group">
                    <a href="{{ route('video.edit', ['video' => $video->id]) }}" class="card-link btn btn-warning btn-edit">
                        <span>
                            <i class="glyphicon glyphicon-edit" aria-hidden="true"></i>
                        </span>
                    </a>
                    <a href="{{ route('video.destroy', ['video' => $video->id]) }}" class="card-link btn btn-danger btn-destroy">
                        <span>
                            <i class="glyphicon glyphicon-trash" aria-hidden="true"></i>
                        </span>
                    </a>
                </div>
            </div>
        </div>

    </div>
</div>
@endsection

@section('page_scripts')
    @parent
    <script src="{{ asset('js/video/destroy_video.js') }}"></script>
@endsection