<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'video_uri',
        'image_uri',
        'description',
        'type'
    ];

    public function format(){
        $this->image_uri = $this->getFormattedImageUri();
        return $this;
    }

    public function getFormattedVideoUri(){
        return $this->video_uri;
    }

    public function getFormattedImageUri(){
        return asset( $this->image_uri );
    }
    
    public function formatVideoUri(){
        if( ($this->video_uri) && ( strcasecmp($this->type, 'youtube') === 0 ) ){
            $url_components = parse_url( $this->video_uri ); 
            parse_str($url_components['query'], $params); 
            $this->video_uri = ($params && $params["v"]) ? $params["v"] : $this->video_uri;
        }
        return $this;
    }
}
