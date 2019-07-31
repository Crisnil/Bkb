import _ , { debounce }from 'lodash';
const apiKey ='AIzaSyDAMt8MF8rgeK3FbWsq8MCWL0NHsDy6Oys'

export const getLocation = () => {
    return new Promise(
        (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (data) => resolve(data.coords),
                (err) => reject(err)
            );
        }
    );
}

export const getReverseGeocoding =(coordinates) =>{

    return new Promise(
        (resolve,reject)=>{
            fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + coordinates.latitude+","+coordinates.longitude + '&key=' + apiKey)
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log('ADDRESS GEOCODE is BACK!! => ');
                    resolve(responseJson),
                    (err) => reject(err)
                })
        }
    )
}