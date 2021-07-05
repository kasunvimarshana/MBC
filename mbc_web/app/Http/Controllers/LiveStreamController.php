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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        //
        $liveStreams = $this->getLiveStreams( $request );
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
            return redirect()
                ->back()
                //->withErrors( $validator )
                ->with('error', 'Plese check your Inputs')
                ->withInput();
        }else{
            // $inputData = collect( $request->except(['_token']) );
            $inputData = collect( $request->only(['MBC_Live_Streaming', 'Radio_1', 'Radio_2']) );

            $inputData->each(function ($item, $key) {
                // $title = (Str::title(Str::of( $key )->replace('_', ' ')));
                $title = (Str::upper(Str::of( $key )->replace('_', ' ')));
                $data = [
                    'name' => trim( $key ),
                    'title' => trim( $title ),
                    'uri' => trim( $item )
                ];

                $liveStream = LiveStream::updateOrCreate(
                    Arr::only($data, ['name']),
                    $data
                );
            });

            return redirect()->back()->with('success', 'Success');
        }
    }

    public function getAllJson(Request $request)
    {
        $liveStreams = $this->getLiveStreams( $request );
        $formatted_liveStreams = $liveStreams->map(function( $liveStream ){
            return $liveStream;
        });

        $data = [
            'liveStreams' => $formatted_liveStreams
        ];

        return response()->json( $data );
    }

    private function getLiveStreams(Request $request){
        $offset = 0;
        $limit = 10; //$limit = PHP_INT_MAX;
        $page = 0;
        $liveStreams = LiveStream::orderBy('id', 'asc');

        if( $request->has('name') && $request->filled('name') ){
            $name = trim( $request->input('name') );
            $liveStreams = $liveStreams->where('name', '=', $name);
        }

        if( $request->has('is_paginate') && $request->filled('is_paginate') && $this->is_true($request->input('is_paginate')) ){
            if( $request->has('limit') && $request->filled('limit') ){
                $limit = abs(intval( $request->input('limit') ));
            }
            if( $request->has('offset') && $request->filled('offset') ){
                $offset = abs(intval( $request->input('offset') ));
            }
            if( $request->has('page') && $request->filled('page') ){
                $page = abs(intval( $request->input('page') ));
                $offset = abs(($page - 1) * $limit);
            }

            $liveStreams = $liveStreams->skip( $offset )->take( $limit );
        }
        $liveStreams = $liveStreams->get();
        return $liveStreams;
    }
}
