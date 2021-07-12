<?php

namespace App\Http\Controllers;

use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Rules\ValidURIRule;
use Storage;
use Exception;

class VideoController extends Controller
{
    protected $storage_uri;

    public function __construct(){
        $this->storage_uri = env('STORAGE_URI', 'mbc_images');
    }

    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $videos = $this->getVideos( $request );
        $formatted_videos = $videos->map(function( $video ){
            return $video->format();
        });

        $data = [
            'videos' => $formatted_videos
        ];

        //dd(url('mbc_images/logo.png'));
        return view('video.index', $data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
        return view('video.create', []);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $rules = array(
            'name'    => 'required',
            'video_uri'    => ['required', new ValidURIRule( trim( $request->input('type') ) )],
            'type'    => 'required'
        );
        
        $validator = Validator::make($request->all(), $rules);

        if($validator->fails()){
            return redirect()
                ->back()
                //->withErrors( $validator )
                ->with('error', 'Plese check your Inputs')
                ->withInput();
        }else{
            $data = [
                'name' => trim( $request->input('name') ),
                'video_uri' => trim( $request->input('video_uri') ),
                'description' => trim( $request->input('description') ),
                'type' => trim( $request->input('type') )
            ];

            if( $request->hasFile('image_uri') ){
                $image = $request->file('image_uri');
                $file_original_name = $image->getClientOriginalName();
                $filename = $image->storeAs( 
                    $this->storage_uri,
                    uniqid( time() ) . '_' . $file_original_name
                );

                $data['image_uri'] = $filename;
            }

            $newVideo = Video::create( $data );

            return redirect()->back()->with('success', 'Success');
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Video  $video
     * @return \Illuminate\Http\Response
     */
    public function show(Video $video)
    {
        //
        $video->format();

        return view('video.show', ['video' => $video]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Video  $video
     * @return \Illuminate\Http\Response
     */
    public function edit(Video $video)
    {
        //
        $video->format();

        return view('video.edit', ['video' => $video]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Video  $video
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Video $video)
    {
        $rules = array(
            'name'    => 'required',
            'video_uri'    => ['required', new ValidURIRule( trim( $request->input('type') ) )],
            'type'    => 'required'
        );
        
        $validator = Validator::make($request->all(), $rules);

        if($validator->fails()){
            return redirect()
                ->back()
                //->withErrors( $validator )
                ->with('error', 'Plese check your Inputs')
                ->withInput();
        }else{
            $data = [
                'name' => trim( $request->input('name') ),
                'video_uri' => trim( $request->input('video_uri') ),
                'description' => trim( $request->input('description') ),
                'type' => trim( $request->input('type') )
            ];

            if( $request->hasFile('image_uri') ){
                $image = $request->file('image_uri');
                $file_original_name = $image->getClientOriginalName();
                $filename = $image->storeAs( 
                    $this->storage_uri,
                    uniqid( time() ) . '_' . $file_original_name
                );

                if( Storage::exists($video->image_uri) ){
                    Storage::delete( $video->image_uri );
                }

                $data['image_uri'] = $filename;
            }

            $video->update( $data );

            return redirect()->back()->with('success', 'Success');
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Video  $video
     * @return \Illuminate\Http\Response
     */
    public function destroy(Video $video)
    {
        try{
            if( Storage::exists($video->image_uri) ){
                Storage::delete( $video->image_uri );
            }
            $video->delete();
        }catch(Exception $e){
            return response()->json(['message' => 'error']);
        }

        return response()->json(['message' => 'success']);
    }

    public function getAllJson(Request $request){
        $videos = $this->getVideos( $request );
        $formatted_videos = $videos->map(function( $video ){
            return $video->format()->formatVideoUri();
        });

        $data = [
            'videos' => $formatted_videos
        ];
        
        return response()->json( $data );
    }

    private function getVideos(Request $request){
        $offset = 0;
        $limit = 10; //$limit = PHP_INT_MAX;
        $page = 0;
        $videos = Video::orderBy('id', 'desc');
        if( $request->has('is_paginate') && $request->filled('is_paginate') && is_true($request->input('is_paginate')) ){
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

            $videos = $videos->skip( $offset )->take( $limit );
        }
        $videos = $videos->get();
        return $videos;
    }
}
