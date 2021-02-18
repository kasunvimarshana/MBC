@extends('layout.layout')
@section('content')
@php
    //placehold.it/500x300
    $placehold_image = asset('img/logo-removebg.png');
@endphp
<div class="container">
    <div class="card-columns"><!-- card-deck | card-columns | card-group -->
        <!-- div class="w-100 d-none d-md-block d-lg-none"></div -->
        @foreach($videos as $video)
        @php
            $temp_placehold_image = ($video->image_uri) ? $video->image_uri : $placehold_image;
        @endphp
        <div class="card my-4"><!-- style="width: 18rem;" -->
            <img class="card-img-top img-fluid" src="{{ $temp_placehold_image }}" alt="{{ $video->name }}">
            <div class="card-body">
                <h4 class="card-title">{{ $video->name }}</h4>
                <p class="card-text">{{ short_string($video->description, 35, '...') }}</p>
            </div>
            <div class="card-body text-right">
                <div class="btn-group" role="group" aria-label="Button Group">
                    <a href="{{ route('video.show', ['video' => $video->id]) }}" class="card-link btn btn-info btn-show">
                        <span>
                            <i class="glyphicon glyphicon-eye-open" aria-hidden="true"></i>
                        </span>
                    </a>
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
        @endforeach
    </div>
</div>
@endsection

@section('page_scripts')
    @parent
    <script src="{{ asset('js/video/destroy_video.js') }}"></script>
@endsection