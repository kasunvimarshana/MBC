const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */
//@include(public_path('css/styles.css'))
//https://getbootstrap.com/docs/3.3/components/

mix.js('resources/js/app.js', 'public/js');
//mix.postCss('resources/css/app.css', 'public/css', []);
mix.sass('resources/scss/app.scss', 'public/css');

mix.js('resources/js/video/destroy_video.js', 'public/js/video');

mix.copyDirectory('resources/img', 'public/img');

mix.setPublicPath('public');
//mix.setResourceRoot("../");
