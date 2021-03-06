import { 
    GET_VIDEOS_FROM_REMOTE_API
} from '../Actions/ActionType';

import {
    REMOTE_VIDEO_API_URI
} from '../../Constants/AppConstants';


export const getAllVideos = () => {
    return (dispatch, getState) => {
        let videoList = new Array();
        const promise = new Promise((resolve, reject) => {
            fetch( REMOTE_VIDEO_API_URI , {
                method: 'GET'
            })
            .then(async (response) => {
                if( response.status !== 200 ){
                    throw new Error( response.status );
                }
                let responseData = await response.json();
                return Object.assign(responseData, {});
            },
            (error) => {
                //console.log('error', error);
                throw new Error( error );
            })
            .then((json) => {
                //console.log(json);
                if( json && Object.keys(json).length > 0 ){
                    Object.entries(json.videos).forEach(([key, value]) => {
                        //console.log(key , value);
                        //value.key = key;
                        videoList.push( value );
                    });
                }
                //console.log(videoList);
                resolve(videoList);
            })
            .catch((error) => {
                console.log("catch", error);
                reject(error);
            });
        });
        return promise;
    };
};