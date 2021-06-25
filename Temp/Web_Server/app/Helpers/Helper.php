<?php

    if (! function_exists('short_string')) {
        function short_string($str, $length = 35, $end = '...') {
            $rest = Illuminate\Support\Str::limit($str, $length, $end);
            return $rest;
        }
    }
?>