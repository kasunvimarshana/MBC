<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class DenyCountriesMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $ip = $this->getIpAddressOfClient();
        $json = @file_get_contents('http://www.geoplugin.net/json.gp?ip='.$ip);
        $arr = json_decode($json);

        $active_deny_countries_rule = AppSetting::select('data')->where('name', '=', 'active_deny_countries_rule')->first();
        $deny_contries = AppSetting::select('data')->where('name', '=', 'deny_contries')->first();
        $deny_contries_array = [];
        if( $deny_contries ){
            $deny_contries_array = Str::of( $deny_contries->data )->explode(',')
                ->map(function ( $value, $key ){
                    return Str::of( trim( $value ) )->lower();
                })
                ->filter(function ($value, $key) {
                    return $value != '';
                })
                ->toArray();
        }

        if( 
            ( $active_deny_countries_rule && is_true( $active_deny_countries_rule->data ) ) 
            && ( $arr && in_array( Str::of( trim( $arr->geoplugin_countryCode ) )->lower(), $deny_contries_array )) 
        ){
            return redirect()->route('home.deny', []);
        }

        return $next($request);
    }

    private function getIpAddressOfClient(){
        $_ip = request()->ip();
        // $_ip = request()->getClientIp();
        foreach (array('HTTP_CLIENT_IP', 'HTTP_X_FORWARDED_FOR', 'HTTP_X_FORWARDED', 'HTTP_X_CLUSTER_CLIENT_IP', 'HTTP_FORWARDED_FOR', 'HTTP_FORWARDED', 'REMOTE_ADDR') as $k => $v){
            if (array_key_exists($v, $_SERVER) === true){
                foreach (explode(',', $_SERVER[$v]) as $ip_val){
                    $ip_val = trim($ip_val);
                    if (filter_var($ip_val, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) !== false){
                        $_ip = $ip_val;
                    }
                }
            }
        }
        return $_ip;
    }
}
