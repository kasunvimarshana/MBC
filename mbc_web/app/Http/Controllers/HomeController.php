<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function home_permit(){
        return view('video.home');
    }

    public function home_deny(){
        return view('video.home_blocked');
    }

    // public function home(){
    //     $ip = $_SERVER['REMOTE_ADDR'];
    //     $json = @file_get_contents('http://www.geoplugin.net/json.gp?ip='.$ip);
    //     //dd($json);
    //     $arr = json_decode($json);
    //     if(($arr) && ($arr->geoplugin_countryCode == 'MW')){
    //         return view('video.home');
    //     }else{
    //         return view('video.home_blocked');
    //     } 
    // }
}
