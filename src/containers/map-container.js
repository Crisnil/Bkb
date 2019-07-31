import React from 'react';
import { View,PermissionsAndroid } from 'react-native';
import MapInput from '../components/map-input';
import MyMapView from '../components/map-view';
import { getLocation } from '../services/location-service';

class MapContainer extends React.Component {
    state = {
        region: {},
    };

    componentDidMount() {
        this.requestLocationPermission();
    }

    async requestLocationPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'ReactNativeCode Location Permission',
                    'message': 'ReactNativeCode App needs access to your location '
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                this.getInitialState()
                console.log("Location permission granted")
            } else {
                console.log("Location permission denied")
            }
        } catch (err) {
            console.warn(err)
        }
    }

    getInitialState() {
        getLocation().then(data => {
            this.updateState({
                latitude: data.latitude,
                longitude: data.longitude,
            });
        });
    }

    updateState(location) {
        this.setState({
            region: {
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.003,
                longitudeDelta: 0.003,
            },
        });
    }

    getCoordsFromName(loc) {
        console.log("loc",loc);
        this.updateState({
            latitude: loc.location.lat,
            longitude: loc.location.lng,
        });
    }

    onMapRegionChange(region) {
        this.setState({ region });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 0.4 }}>
                    <MapInput notifyChange={loc => this.getCoordsFromName(loc)} />
                </View>
                {this.state.region['latitude'] ? (
                    <View style={{ flex: 1 }}>
                        <MyMapView
                            region={this.state.region}
                            onRegionChange={reg => this.onMapRegionChange(reg)}
                        />
                    </View>
                ) : null}
            </View>
        );
    }
}

export default MapContainer;
