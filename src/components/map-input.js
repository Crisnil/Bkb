import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { View,Text,StyleSheet} from 'react-native';
import * as Config from "../config/Config";
import {Icon} from "native-base";

class MapInput extends React.Component {
    constructor(props){
        super(props);

    }

    render() {
        return (

            <GooglePlacesAutocomplete
                placeholder={this.props.placeHolder}
                minLength={2}
                autoFocus={false}
                autoCorrect={false}
                listViewDisplayed= {false}        // true/false/undefined
                fetchDetails={true}
                renderDescription={(row) => row.description}    // custom description render
                onPress={(data, details = null) => {    // 'details' is provided when fetchDetails = true
                    // console.log(data)
                    // console.log(details)
                    this.props.getCoordsFromName(details)
                }}
                getDefaultValue = {()=> {
                    return '';      // text input default value
                }}
                textInputProps={{
                    onFocus: () =>this.props.onInputFucos(),
                }}
                query={{
                    // available options: https://developers.google.com/places/web-service/autocomplete
                    key: Config.GOOGLE_MAPS_APIKEY,
                    language: 'en',
                    types: 'geocode'
                }}
                styles={this.props.destSyle}

                currentLocationLabel="Current location"
                nearbyPlacesAPI='GooglePlacesSearch'
                GoogleReverseGeocodingQuery={{
                    // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                }}
                GooglePlacesSearchQuery={{
                    // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                    rankby: 'distance',
                    types: 'food'
                }}

                filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3', 'sublocality', 'administrative_area_level_2', 'administrative_area_level_1']}
                // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                debounce={200}
                renderLeftButton={() =><Text></Text>}
                renderRightButton={() => <Text></Text> }

            />

        );
    }
}
export default MapInput;