import _ , { debounce }from 'lodash';
import * as Config from "../config/Config";


export const getLocation = () => {
    return new Promise(
        (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (data) => resolve(data.coords),
                (err) => reject(err),
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 }
            );
        }
    );
}

export const watchLocation = () => {
    return new Promise(
        (resolve, reject) => {
            navigator.geolocation.watchPosition(
                (data) =>resolve(data.coords),
                (err) => reject(err),
                { enableHighAccuracy: true, timeout: 2000, maximumAge: 100, distanceFilter: 10 },
            );
        }
    );
}

export const getReverseGeocoding =(coordinates) =>{

    return new Promise(
        (resolve,reject)=>{
            fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + coordinates.latitude+","+coordinates.longitude + '&key=' + Config.GOOGLE_MAPS_APIKEY)
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log('ADDRESS GEOCODE is BACK!! => ');
                    resolve(responseJson),
                    (err) => reject(err)
                })
        }
    )
}