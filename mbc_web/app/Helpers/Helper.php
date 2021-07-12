<?php

    //  short_string
    if (! function_exists('short_string')) {
        function short_string($str, $length = 35, $end = '...') {
            $rest = Illuminate\Support\Str::limit($str, $length, $end);
            return $rest;
        }
    }

    //  is_true
    if (! function_exists('is_true')) {
        function is_true($val, $return_null = false) {
            $boolval = ( is_string($val) ? filter_var($val, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE) : (bool) $val );
            //$boolval = boolval( $boolval );
            return ( $boolval === null && !$return_null ? false : $boolval );
        }
    }

?>