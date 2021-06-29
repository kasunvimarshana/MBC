<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Hash;
use Exception;

class AuthController extends Controller
{
    //
    public function create(){
        if( auth::check() ){
            return redirect()->route('home', []);
        }else {
            return view('auth.login', []);
        }
    }

    public function login(Request $request){
        $rules = array(
            'email'    => 'required|exists:users,email',
            'password' => 'required|min:3'
        );
        
        $validator = Validator::make($request->all(), $rules);
        
        if($validator->fails()){
            return redirect()
                ->back()
                ->withErrors( $validator )
                ->withInput( $request->except(['password']) );
        }else{
            $email = urldecode($request->input('email'));
            $password = urldecode($request->input('password'));
            $credentials = array(
                'email' => $email,
                'password' => $password
            );

            auth()->attempt( $credentials );
            
            if( auth()->check() ){
                return redirect()->route('home', []);
            }else{
                return redirect()
                    ->back()
                    ->withInput( $request->except(['password']) );
            }
        }
    }

    public function logout(){
        auth()->logout();
        session()->flush();
        return redirect()->route('login.create', []);
    }
}
