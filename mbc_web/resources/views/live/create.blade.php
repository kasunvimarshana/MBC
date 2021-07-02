@extends('layout.layout')
@section('content')
<form class="" action="{{ route('liveStream.store', []) }}" method="POST" autocomplete="off" enctype="multipart/form-data">
    @csrf
    @if($liveStreams)
        @foreach($liveStreams as $key => $value)
            <div class="form-row">
                <div class="form-group w-50">
                    <label class="col-form-label col col-sm-4">{{ $value->title }}</label>
                    <div class="col">
                        <input 
                            type="text" 
                            name="{{ $value->name }}" 
                            class="form-control" 
                            placeholder="{{ $value->title }}"
                            value="{{ $value->uri }}"/>
                    </div>
                </div>
            </div>
        @endforeach
    @endif

    <div class="form-row">
        <div class="form-group w-50">
            <div class="col">
                <div class="btn-group" role="group" aria-label="Button Group">
                    <button type="submit" class="btn btn-info">
                        <span>
                            <i class="glyphicon glyphicon-save" aria-hidden="true"></i>
                        </span>
                        <span>
                            Save
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </div>

</form>
@endsection