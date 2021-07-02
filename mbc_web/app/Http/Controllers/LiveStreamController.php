<?php

namespace App\Http\Controllers;

use App\Models\LiveStream;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Storage;
use Exception;

class LiveStreamController extends Controller
{
    protected $storage_uri;

    public function __construct(){
        $this->storage_uri = env('STORAGE_URI', 'mbc_images');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
        $liveStreams = LiveStream::all();
        $data = [
            'liveStreams' => $liveStreams
        ];
        return view('live.create', $data);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\LiveStream  $liveStream
     * @return \Illuminate\Http\Response
     */
    public function show(LiveStream $liveStream)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\LiveStream  $liveStream
     * @return \Illuminate\Http\Response
     */
    public function edit(LiveStream $liveStream)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\LiveStream  $liveStream
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, LiveStream $liveStream)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\LiveStream  $liveStream
     * @return \Illuminate\Http\Response
     */
    public function destroy(LiveStream $liveStream)
    {
        //
    }

    /**
     * Create or Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function createOrUpdate(Request $request)
    {
        $rules = array(
            // 'name'    => 'required'
        );
        
        $validator = Validator::make($request->all(), $rules);

        if($validator->fails()){
            // return redirect()->back()->with('error', 'Error');
        }else{
            // $inputData = collect( $request->except(['_token']) );
            $inputData = collect( $request->only(['MBC_Live_Streaming', 'Radio_1', 'Radio_2']) );

            $inputData->each(function ($item, $key) {
                // $title = (Str::title(Str::of( $key )->replace('_', ' ')));
                $title = (Str::upper(Str::of( $key )->replace('_', ' ')));
                $data = [
                    'name' => $key,
                    'title' => $title,
                    'uri' => $item
                ];

                $liveStream = LiveStream::updateOrCreate(
                    Arr::only($data, ['name']),
                    $data
                );
            });

            return redirect()->back()->with('success', 'Success');
        }
    }
}
