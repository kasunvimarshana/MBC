@extends('layout.layout')
@section('content')
<form class="" action="{{ route('appSetting.store', []) }}" method="POST" autocomplete="off" enctype="multipart/form-data">
    @csrf
    @if($appSettings)
        @foreach($appSettings as $key => $value)
            <div class="form-row">
                <div class="form-group w-50">
                    <label class="col-form-label col col-sm-6">{{ $value->display_name }}</label>
                    <div class="col">
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" id="{{ $value->name }}_active" name="{{ $value->name }}" class="custom-control-input" value="true" {{ (is_true($value->data) === true) ? 'checked' : null }}>
                            <label class="custom-control-label" for="{{ $value->name }}_active"> Active </label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" id="{{ $value->name }}_inactive" name="{{ $value->name }}" class="custom-control-input" value="false" {{ (is_true($value->data) !== true) ? 'checked' : null }}>
                            <label class="custom-control-label" for="{{ $value->name }}_inactive"> Inactive </label>
                        </div>
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