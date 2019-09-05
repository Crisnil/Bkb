import React from 'react';
import { View,Text,StyleSheet} from 'react-native';
import MapInput from '../components/map-input';
import MyMapView from '../components/map-view';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {getLocation, getReverseGeocoding} from '../services/location-service';
import _, {debounce} from 'lodash';
import {ScrollView,Dimensions,Platform,Image, Picker, TouchableOpacity,  PermissionsAndroid,BackHandler} from "react-native"
import {Container,Body, Button, Header, Icon, Left, Right, Title,Content,ActionSheet} from "native-base"
import update from 'react-addons-update'
import MapView from 'react-native-maps';
import * as DeviceRatio from "../layout/DeviceRatio";
import {connect} from 'react-redux';
import {CustomAlert, CustomNavigationService} from "../layout";
import RemarksModal from "../components/RemarksModal";
import {reset} from "../layout/CustomNavigationService";


let { height, width } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const latitudeDelta = 0.0092;
const longitudeDelta = latitudeDelta * ASPECT_RATIO;
function randomColor() {
    return `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, 0)}`;
}



@connect(({ auth,service }) => ({ auth,service }))
class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            region: { latitude: 4.88955,
                        longitude: 114.942,
                        latitudeDelta:latitudeDelta,
                        longitudeDelta: longitudeDelta,
                     },
            pickupAddress:'Pick up',
            destinationAddress:'Destination',
            markers:[],
            selecteProblem:{},
            remarksVisible:false,
            selectedRemarks:null,
            pickupRemarks:'',
            destinationRemarks:'',
            selected:"Destination"
        };
        this.onPanDrag = debounce(this.onPanDrag, 1000, {
            leading: true,
            trailing: false,
        });
    }

    componentDidMount() {
        this.requestLocationPermission();
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.backHandle)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backHandle)
    }forceUpdate(callBack: () => void): void {
    }

    backHandle = () => {
        // console.log(this.props);
        CustomNavigationService.back()()
        return true
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
                CustomAlert.alert("Current Location","Location cannot be determined, Please set your pick up location")
                console.log("Location permission denied")
            }

        } catch (err) {
            console.warn(err)
        }
    }

    async getInitialState() {
        getLocation().then(data => {
            this.onMapPress(data,"Pickup");
            this.getNearestAddress(data,"pickupAddress");
            this.updateState({
                latitude:data.latitude,
                longitude : data.longitude
            });
        });
    }

    getNearestAddress =(coord,label)=>{
        getReverseGeocoding(coord).then(data => {
            if (data.status === "OK") {
                if (!_.isEmpty(data.results)) {
                    let address = _.clone(data.results[0]);
                    this.setState({
                        [label]: _.truncate(address.formatted_address,{'length':40})
                    })
                }
            }
        })
    }


    updateState =(location)=> {
        this.setState({
            region: {
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.003,
                longitudeDelta: 0.003,
            },

        });
    }


    getPickupCoordsFromName=(loc)=>{
        let coord = {}
            coord.latitude = loc.geometry.location.lat;
            coord.longitude = loc.geometry.location.lng
        this.setState({pickupAddress:loc.formatted_address},()=> this.onMapPress(coord,"Pickup"))

    }

    getDestinationCoordsFromName=(loc)=>{
        let coord = {}
        coord.latitude = loc.geometry.location.lat;
        coord.longitude = loc.geometry.location.lng;
        this.setState({destinationAddress:loc.formatted_address},()=>this.onMapPress(coord,"Destination"))

    }

    onFocusPickup =()=>{
        console.log("pickup")
        this.setState({selected : 'Pickup'})
    }

    onFocusDest =()=>{
        console.log("dest")
        this.setState({selected : 'Destination'})
    }

    onMapRegionChange=(region)=> {
        this.setState({ region });
    }

    onPanDrag = () => {
        const { isPanding } = this.state;
        if (isPanding) {
            return;
        }
        this.setState({
            isPanding: true,
        });
    };

    onUserPinDragEnd =(e)=> {
        // let coordinates = _.clone(e.nativeEvent.coordinate);
        // this.updateState(coordinates);
        this.addMarker(e);
    }

    addMarker=(e)=> {
        let coordinates = _.clone(e.nativeEvent.coordinate);
        switch (this.state.selected) {
            case "Pickup":
                this.onMapPress(coordinates, 'Pickup');
                this.getNearestAddress(coordinates,"pickupAddress");
                break;
            case "Destination":
                this.onMapPress(coordinates, 'Destination');
                this.getNearestAddress(coordinates,"destinationAddress");
                break;
            default:
        }
    }

    onMapPress =(e,key)=> {
        this.updateState(e);
        let marked = _.clone(this.state.markers);
        let itemIdx = _.findIndex(marked, (it) => {
            return it.key == key
        })
        if (itemIdx > -1) {
            // console.log( "match",marked[itemIdx]);
            marked[itemIdx] = update(marked[itemIdx], {
                $set: {
                    coordinate: e,
                    key: key,
                }
            })
            this.setState({markers:marked}
            //,()=>
               // this.getFormattedAddress(key,e)
            )
        }
        else{

            this.setState({
                markers: [
                    ...this.state.markers,
                    {
                        coordinate:e,
                        key: key,
                        color: randomColor(),
                    },
                ],
            }
                //,()=> this.getFormattedAddress(key,e));
            )}

    }

    onSubmit =()=>{
        const{dispatch,navigation} = this.props;
        let pickup = _.find(this.state.markers, { 'key': 'Pickup'})
        let dest = _.find(this.state.markers, { 'key': 'Destination'})
        const {selected}=this.props.service;
       // reset('Drawer');
        dispatch({
            type: 'service/submitRequest',
            payload: {
                pickuplong :pickup.coordinate.longitude,
                pickuplat :pickup.coordinate.latitude,
                pickup_location :this.state.pickupAddress,
                pickupremarks :this.state.pickupRemarks,
                destination_long:!_.isEmpty(dest)? dest.coordinate.longitude : "",
                destination_lat : !_.isEmpty(dest)? dest.coordinate.latitude : "",
                destination_remarks:this.state.destinationRemarks,
                destination:this.state.destinationAddress,
                problem:selected.description ,
                callback: (result, error) => {
                    if (result) {
                        this.setState({
                            markers:[],
                        },() =>{
                            CustomAlert.success("Your service request is being processed. Our Customer Service agent will contact you shortly. Thank you!");
                            CustomNavigationService.back()()
                            // reset('Drawer');
                        })

                    }
                }
            },
        })
    }

    onSelecActions =(selected)=>{
        switch (selected.action) {
            case 'Pickup' : this.setState({
                        selectedRemarks:selected.action,
                        remarksVisible:true,
                    })
            break;
            case 'Destination' : this.setState({
                selectedRemarks:selected.action,
                remarksVisible:true,
            })
                break;
            case 'submit' : this.onSubmit()
                break;
            case 'cancel' :  ActionSheet.hide();
                break;
        }

    }

    onChangeText =(text)=> {
        switch (this.state.selectedRemarks) {
            case 'Pickup':
                this.setState({pickupRemarks:text})
                break;
            case 'Destination':
                this.setState({destinationRemarks: text})
                break
            default:
                console.log("text")
        }
    }
    onClose =()=>{
        this.setState({
            selectedRemarks:null,
            remarksVisible:false,
        })
    }

    render() {
        //console.log("markers",this.state.markers,"region",this.state.region);
        const {selected}=this.props.service;
        const grabcar_premium =require ("../assets/icons/ic_grabcar_premium.png");

        return (
            <Container>
            <Content scrollEnabled={false}>
            <View style={{height:height,width:width,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                position:'relative'
            }}>
                    <MapView
                        style={styles.map}
                        region={this.state.region}
                        mapType={"hybrid"}
                        followsUserLocation={true}
                        showsMyLocationButton={true}
                        showsUserLocation={true}
                        showsCompass={true}
                        moveOnMarkerPress={true}
                        onPanDrag={this.onPanDrag}
                        onPress={e =>this.addMarker(e)}
                    >
                        {/*<MapView.Marker*/}
                            {/*key={"pickup"}*/}
                            {/*coordinate={this.state.region}*/}
                            {/*onDragEnd={(e) => this.updateState( e.nativeEvent.coordinate )}*/}
                        {/*>*/}
                            {/*<Image style={{zIndex:2, width: 25, height: 53}} source={grabcar_premium}/>*/}
                        {/*</MapView.Marker>*/}

                        {this.state.markers.map(marker => (
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

                    <MapInput
                            getCoordsFromName={this.getPickupCoordsFromName}
                            destSyle = {pickUpStyle}
                            placeHolder={_.truncate(this.state.pickupAddress,{'length':40})}
                            pickupAddress={this.state.pickupAddress}
                            onInputFucos ={this.onFocusPickup}
                    />

                    <MapInput
                        getCoordsFromName={this.getDestinationCoordsFromName}
                        destSyle = {destStyle}
                        onInputFucos={this.onFocusDest}
                        placeHolder={_.truncate(this.state.destinationAddress,{'length':40})}
                    />

                <View style={styles.bottomContainer}>

                    <TouchableOpacity  onPress={() => this.getInitialState() }style={{ height:38, width:38,backgroundColor:"#fff",alignContent:'center',alignItems:'center'}}>
                        <Icon name = "gps-fixed" style={{lineHeight:38,color: '#5d5d5d'}}/>
                    </TouchableOpacity >
                    <View style={{marginTop:10}}>
                        <Button block disabled>
                            <Text style={{color:'#fff'}}>{selected.description}</Text>
                        </Button>
                    </View>
                    <View style={{marginTop:10}}>
                        <Button block
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: BUTTONS,
                                        cancelButtonIndex: CANCEL_INDEX,
                                        title: "Select Action"
                                    },
                                    buttonIndex => {
                                       // console.log({ clicked: BUTTONS[buttonIndex] });
                                        this.onSelecActions(BUTTONS[buttonIndex])
                                    },

                                )}
                        >
                            <Text style={{color:'#fff'}}>ACTIONS</Text>
                        </Button>
                    </View>

                </View>
            </View>
                {this.state.remarksVisible?
                    <RemarksModal
                        remarksVisible ={this.state.remarksVisible}
                        onChangeText={this.onChangeText}
                        selectedRemarks={this.state.selectedRemarks}
                        onClose={this.onClose}
                        pickupLoc={this.state.pickupAddress}
                        destination={this.state.destinationAddress}
                        pickupRemarks={this.state.pickupRemarks}
                        destinationRemarks={this.state.destinationRemarks}
                    />:null}
            </Content>
            </Container>
        );
    }
}

const BUTTONS = [
    { text: "Pick up Remarks", icon: "description", iconColor: "#B23121",action:'Pickup' },
    { text: "Destination Remarks", icon: "description", iconColor: "#B23121",action:'Destination' },
    { text: "Submit Request", icon: "build", iconColor: "#B23121",action:'submit' },
    { text: "Cancel", icon: "close", iconColor: "#B23121",action:'cancel' }
];

var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 3;

const pickUpStyle = StyleSheet.create({

    container:{
        width:'90%',
        position: 'absolute',
        top: 0
    },
    description: {
        fontWeight: 'bold',
    },
    predefinedPlacesDescription: {
        color: '#1faadb',
    },
    textInputContainer: {
        backgroundColor: 'rgba(0,0,0,0)',
        top: 15,
        width: '100%',
        borderWidth: 0
    },
    textInput: {
        marginLeft: 0,
        marginRight: 0,
        height: 38,
        color: '#5d5d5d',
        fontSize: 16,
        borderWidth: 0
    },
    listView: {
        zIndex:999,
        width:'100%',
        position: 'absolute',
        flexGrow: 1,
        elevation: 9999,
        top: 60,
        backgroundColor: '#fff',
    }
})
const destStyle = StyleSheet.create({

    container:{
        width:'90%',
        position: 'absolute',
        top: 50
    },
    description: {
        fontWeight: 'bold',
    },
    predefinedPlacesDescription: {
        color: '#1faadb',
    },
    textInputContainer: {
        backgroundColor: 'rgba(0,0,0,0)',
        top: 15,
        width: '100%',
        borderWidth: 0
    },
    textInput: {
        marginLeft: 0,
        marginRight: 0,
        height: 38,
        color: '#5d5d5d',
        fontSize: 16,
        borderWidth: 0
    },
    listView: {
        width:'100%',
        position: 'absolute',
        flexGrow: 1,
        elevation: 9999,
        top: 50,
        backgroundColor: '#fff',
    }
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        position:'relative'
    },
    map: {
        flex:1,
        ...StyleSheet.absoluteFillObject,

        // left: 0,
        // right: 0,
        // top: 0,
        // bottom: 0,
        // position: 'absolute',
    },

    bottomContainer:{
        zIndex:2,
        position: 'absolute',
        ...Platform.select({
            ios: {
                bottom:20,
            },
            android: {
                bottom:50,
            },
        }),
        flex:0.4,
        width:width -24,
        borderRadius:3,

    },


});
export default MapContainer;
