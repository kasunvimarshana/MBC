import {
    REMOTE_API_URI
} from '../../Constants/AppConstants';
import { 
    buildURLWithQueryString, 
    getOrigin 
} from '../../Helpers/HTTPHelper';

export const getLiveStreams = ( name = null ) => { 
    return (dispatch, getState) => {
        let _responseArray = new Array();
        const promise = new Promise((resolve, reject) => {
            let remote_api_origin = null;
            let remote_api_uri = null;
            let fetchData = {};
            Promise.resolve({
                _remote_api_origin: REMOTE_API_URI,
            })
            .then( ( { _remote_api_origin } ) => {
                remote_api_origin = _remote_api_origin;
                remote_api_uri = `${remote_api_origin}/api`;
            }, (error) => {
                throw new Error( error );
            } )
            .then( () => {
                let queryParameters = {
                    name: name
                };

                fetchData = {
                    method: "GET",
                    //body: JSON.stringify( queryParameters ),
                    headers: { 
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Connection": "close" 
                    },
                    //mode: "cors", //no-cors, *cors, same-origin
                    //credentials: "include", //include, *same-origin, omit
                    //cache: "default", //*default, no-cache, reload, force-cache, only-if-cached
                    //redirect: 'follow', // manual, *follow, error
                    //referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    Origin: getOrigin( remote_api_origin ),
                };

                const api_url = buildURLWithQueryString(remote_api_uri + "/live-streams/all/json", queryParameters);
                console.log("api_url", api_url);
                return fetch(api_url, fetchData);
            } )
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
            .then(async (json) => {
                //console.log('json', json);
                let data = json;
                if( data && Object.keys(data).length > 0 ){
                    Object.entries(data.liveStreams).forEach(([key, value]) => {
                        _responseArray.push( value );
                    });
                }
                return resolve(_responseArray);
            })
            .catch((error) => {
                console.log('error', error);
                return reject( error.message );
            })
            .finally(() => {
                //console.log("finally");
            });
        });
        return promise;
    };
};