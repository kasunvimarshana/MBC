<?php

namespace App\Http\Controllers;

use App\Models\AppSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Storage;
use Exception;

class AppSettingController extends Controller
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
        $appSettings = $this->getAppSettings( $request );

        $rowFilter_1 = ['active_permit_countries_rule'];
        $appSettings = $appSettings->filter(function ($value, $key) use ($rowFilter_1){
            return in_array($value->name, $rowFilter_1);
        });

        $data = [
            'appSettings' => $appSettings
        ];
        return view('setting.create', $data);
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
     * @param  \App\Models\AppSetting  $appSetting
     * @return \Illuminate\Http\Response
     */
    public function show(AppSetting $appSetting)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\AppSetting  $appSetting
     * @return \Illuminate\Http\Response
     */
    public function edit(AppSetting $appSetting)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\AppSetting  $appSetting
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, AppSetting $appSetting)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\AppSetting  $appSetting
     * @return \Illuminate\Http\Response
     */
    public function destroy(AppSetting $appSetting)
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
            $inputData = collect( $request->only(['active_permit_countries_rule']) );

            $inputData->each(function ($item, $key) {
                $_name = trim( $key );
                $_data = trim( $item );
                // $_display_name = (Str::title(Str::of( $_name )->replace('_', ' ')));
                $_display_name = (Str::upper(Str::of( $_name )->replace('_', ' ')));
                $data = [
                    'name' => ( $_name ),
                    'display_name' => ( $_display_name ),
                    'data' => ( $_data )
                ];

                $appSetting = AppSetting::updateOrCreate(
                    Arr::only($data, ['name']),
                    $data
                );
            });

            return redirect()->back()->with('success', 'Success');
        }
    }

    private function getAppSettings(Request $request){
        $offset = 0;
        $limit = 10; //$limit = PHP_INT_MAX;
        $page = 0;
        $appSettings = AppSetting::orderBy('id', 'asc');

        if( $request->has('name') && $request->filled('name') ){
            $name = trim( $request->input('name') );
            $appSettings = $appSettings->where('name', '=', $name);
        }

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

            $appSettings = $appSettings->skip( $offset )->take( $limit );
        }
        $appSettings = $appSettings->get();
        return $appSettings;
    }
}
