<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <!-- Required meta tags -->
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <!-- CSRF Token Meta Added -->
        <meta name="csrf-token" content="{{ csrf_token() }}"/>
        <!-- Bootstrap CSS -->
        <link href="{{ asset('css/app.css') }}" rel="stylesheet" crossorigin="anonymous"/>
        <title>MBC</title>
    </head>
    <body>

        <!-- div class="container container-fluid" -->
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="{{ url('/') }}">
                        <img src="{{ asset('img/logo-removebg.png') }}" alt="Logo" width="65" height="24" class="d-inline-block align-top"/>
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul class="navbar-nav mr-auto">
                            <!-- li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="{{ url('/') }}">Home</a>
                            </li -->
                        </ul>

                        <ul class="navbar-nav ml-auto">
                            @if( auth()->check() )
                                <li class="nav-item">
                                    <a class="nav-link active" href="{{ route('videos', []) }}"> Video List </a>
                                </li>

                                <li class="nav-item">
                                    <a class="nav-link active" href="{{ route('video.create', []) }}"> Add New Video </a>
                                </li>

                                <li class="nav-item">
                                    <a class="nav-link active" href="{!! route('login.logout') !!}" onclick="return confirm('Are you sure?')">
                                        <span class="glyphicon glyphicon-log-out"></span> <span> Logout </span>
                                    </a>
                                </li>
                            @else
                                <li class="nav-item">
                                    <a class="nav-link active" href="{!! route('login.create') !!}">
                                        <span class="glyphicon glyphicon-log-in"></span> Login
                                    </a>
                                </li>
                            @endif
                        </ul>
                        
                    </div>
                </div>
            </nav>
        <!-- /div -->
        <div class="container-fluid">
            <div class="col">
                @yield('content')
            </div>
        </div>

        <script src="{{ asset('js/app.js') }}" crossorigin="anonymous"></script>

        @includeIf('partials.messages', array())

        @section('page_scripts')
        @show
    </body>
</html>