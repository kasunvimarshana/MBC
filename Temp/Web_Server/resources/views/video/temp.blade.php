@extends('layout.layout')
@section('content')
<div class="table-responsive">
<table class="table caption-top">
<!-- caption>Caption</caption -->
<thead>
    <tr>
        <th scope="col" class="w-25" style="text-align: left;"> Title </th>
        <th scope="col" class="w-50" style="text-align: left;"> Description </th>
        <th scope="col" class="w-25" style="text-align: center;">  </th>
    </tr>
</thead>
<tbody style="text-align: left;">
    @foreach($videos as $video)
    <tr>
        <td style="text-align: left;">{{ $video->name }}</td>
        <td style="text-align: left;">{{ $video->description }}</td>
        <td style="text-align: center;">
            <div class="btn-group" role="group" aria-label="Third group">
                <button type="button" class="btn btn-info">
                    <span>
                        <i class="glyphicon glyphicon-eye-open" aria-hidden="true"></i>
                    </span>
                </button>
                <button type="button" class="btn btn-warning">
                    <span>
                        <i class="glyphicon glyphicon-edit" aria-hidden="true"></i>
                    </span>
                </button>
                <button type="button" class="btn btn-danger">
                    <span>
                        <i class="glyphicon glyphicon-trash" aria-hidden="true"></i>
                    </span>
                </button>
            </div>
        </td>
    </tr>
    @endforeach
</tbody>
</table>
</div>
@endsection