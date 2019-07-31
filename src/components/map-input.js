import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


class MapInput extends React.Component {

    render() {
        return (

            <GooglePlacesAutocomplete
                placeholder='Search'
                minLength={2}
                autoFocus={true}
                returnKeyType={'search'}
                listViewDisplayed={false}
                fetchDetails={true}
                onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                    console.log(data,details);
                    this.props.notifyChange(details.geometry);
                }
                }
                query={{
                    key: 'AIzaSyDAMt8MF8rgeK3FbWsq8MCWL0NHsDy6Oys',
                    language: 'en'
                }}
                nearbyPlacesAPI='GooglePlacesSearch'
                debounce={200}
            />
        );
    }
}
export default MapInput;