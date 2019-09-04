import React from 'react';
import MapView, {
    ProviderPropType,
    Marker,
    AnimatedRegion, PROVIDER_GOOGLE, PROVIDER_DEFAULT, Callout
} from 'react-native-maps';
import {StyleSheet,}from "react-native";

const MyMapView = (props) => {
    return (
        <MapView
            style={{ flex:1}}
            onPanDrag={props.onPanDrag}
            region={props.region}
            showsUserLocation={true}
            followUserLocation={true}
            loadingEnabled={true}
            mapType={"hybrid"}
            showsMyLocationButton={true}
            showsCompass={true}
            moveOnMarkerPress={true}
            onPress={e =>props.addMarker(e)}
            onRegionChangeComplete={(reg) => props.onRegionChangeComplete(reg)}>

            {props.markers.map(marker => (
                <MapView.Marker
                    key={marker.key}
                    draggable
                    coordinate={marker.coordinate}
                    pinColor={marker.color}
                    title={marker.key}
                    onDragEnd={e =>this.onUserPinDragEnd(e)}
                />
            ))}
        </MapView>
    )
}

export default MyMapView;