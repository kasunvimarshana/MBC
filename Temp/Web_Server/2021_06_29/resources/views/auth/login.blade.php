@extends('layout.layout')
@section('content')
<div class="container text-center">
    
    <div class="page-header">
        <img src="{{ asset('img/home_logo.png') }}" width="250"/>
    </div>

    <div class="row" style="justify-content: center;">
        <div class="card-deck">
            <div class="card my-4 bg-transparent" style="width: 30rem;">
                <div class="card-body">
                    <form id="myform" action="{{ route('login.login', []) }}" method="POST" autocomplete="off">
                        @csrf
                        <div class="form-group">
                            <label for="email">Email address</label>
                            <input type="email" name="email" id="email" class="form-control" placeholder="Email" autocomplete="off" value="{{ old('email') }}"/>
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" name="password" id="password" class="form-control" placeholder="Password" autocomplete="off"/>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

</div>
@endsection