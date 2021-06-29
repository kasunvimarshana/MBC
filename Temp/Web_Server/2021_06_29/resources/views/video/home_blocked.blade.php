@extends('layout.layout')
@section('content')

<center>
    <img src="{{ asset('img/home_logo.png') }}" width="250"/>
    <h1>MBC TV MALAWI LIVE</h1>
        <div>This content is blocked for your reagon.</div>
    <br />
    <span style="font-size:12px; position: fixed;left: 0;bottom: 0;height: 10%;width: 100%;background-color: gray;
">Service provided by <a href="{{ url('/') }}" target="_blank">Globe Internet Ltd, Malawi</a></span>
</center>

@endsection

@section('page_scripts')
    @parent
    
@endsection

