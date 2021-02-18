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
        'description'
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
}
