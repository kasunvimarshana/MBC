@extends('layout.layout')
@section('content')
<form class="" action="{{ route('video.store', []) }}" method="POST" autocomplete="off" enctype="multipart/form-data">
    @csrf
    <div class="form-row">
        <div class="form-group w-50">
            <label class="col-form-label col col-sm-3" id="name_label" for="name">Title</label>
            <div class="col">
                <input type="text" name="name" class="form-control" id="name" aria-describedby="name_label" required="required"/>
            </div>
        </div>
    </div>

    <div class="form-row">
        <div class="form-group w-50">
            <label class="col-form-label col col-sm-3" id="video_uri_label" for="video_uri">Video Link</label>
            <div class="col">
                <input type="text" name="video_uri" class="form-control" id="video_uri" aria-describedby="video_uri_label" required="required"/>
            </div>
        </div>
    </div>

    <div class="form-row">
        <div class="form-group w-50">
            <label class="col-form-label col col-sm-3" id="description_label" for="description">Description</label>
            <div class="col">
                <textarea name="description" class="form-control" id="description" aria-describedby="description_label"></textarea>
            </div>
        </div>
    </div>

    <div class="form-row"><!-- class="col-auto" -->
        <div class="form-group w-50">
        <label class="col-form-label col col-sm-3" id="image_uri_label" for="image_uri">Feature Image</label>
            <div class="col">
                <input type="file" name="image_uri" class="form-control-file" id="image_uri" aria-describedby="image_uri_label"/>
            </div>
        </div>
    </div>

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