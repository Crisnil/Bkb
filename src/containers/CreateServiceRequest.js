import {
    Animated,
    AppRegistry,
    Dimensions,
    Easing,
    Image,
    Modal,
    PermissionsAndroid,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    BackHandler,
    Picker,
} from "react-native";
import {
    Body,
    Button,
    Container,
    Footer,
    FooterTab,
    Header,
    Icon,
    Left,
    Right,
    Spinner,
    Titlem,
    Item,
    Input
} from "native-base";
import React, {Component} from "react";
import MapView from 'react-native-maps';
import _, {debounce} from 'lodash';
//import Icon from 'react-native-vector-icons/Entypo';
import update from 'react-addons-update'
import {NavigationActions, StackNavigator} from 'react-navigation';
import {getLocation, getReverseGeocoding} from '../services/location-service';
import {connect} from 'react-redux';
import CustomActivityIndicator from "../layout/CustomActivityIndicator";
import {reset, resetNavigate} from "../layout/CustomNavigationService";
import {CustomAlert, CustomNavigationService} from "../layout";
import RemarksModal from "../components/RemarksModal";


let { height, width } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const latitudeDelta = 0.0092;
const longitudeDelta = latitudeDelta * ASPECT_RATIO;

function randomColor() {
    return `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, 0)}`;
}

@connect(({ service }) => ({ service }))
class CreateServiceRequest extends  Component {

    constructor(props) {
        super(props);
        this.state = {
            region: {},
            selected:'destination',
            initialRender: true,
            topHomePickerToggle: false,
            initLoc: {
                latitude: 34.662496,
                longitude: 135.503177,
            },
            formattedAddress:"",
            destination:null,
            markers: [],
            problem:"",
            remarksVisible:false,
            selectedRemarks:'pickup',
            pickupRemarks:'',
            destinationRemarks:''
        };
        this.onPanDrag = debounce(this.onPanDrag, 1000, {
            leading: true,
            trailing: false,
        });
    }

    componentDidMount() {
       this.fetchProblemCategory();
       this.requestLocationPermission();
        const problem = this.props.navigation.getParam('problem', '');
        this.setState({problem : problem})
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.backHandle)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backHandle)
    }forceUpdate(callBack: () => void): void {
    }

    backHandle = () => {
        console.log(this.props);
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
                console.log("Location permission denied")
            }

        } catch (err) {
            console.warn(err)
        }
    }

    async getInitialState() {
        getLocation().then(data => {
            this.getNearestAddress(data);
            this.updateState({
                latitude:data.latitude,
                longitude : data.longitude
            });
        });
    }



    getNearestAddress =(coord)=>{
            getReverseGeocoding(coord).then(data => {
                if (data.status === "OK") {
                    if (!_.isEmpty(data.results)) {
                        let address = _.clone(data.results[0]);
                        this.setState({
                            formattedAddress: address.formatted_address
                        })
                    }
                }
            })
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

    updateState(location) {
        this.getNearestAddress(location);
        this.setState({
            region: {
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta:latitudeDelta,
                longitudeDelta: longitudeDelta,
            },
        });
    }

    addMarker=(e)=> {
        let coordinates = _.clone(e.nativeEvent.coordinate);
        switch (this.state.selected) {
            case "pickup":
                this.onMapPress(coordinates, 'pickup')
                break;
            case "destination":
                this.onMapPress(coordinates, 'destination')
                break;
            default:
        }
    }


    onMapPress =(e,key)=> {
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
                    color: randomColor()
                }
            })
            this.setState({markers:marked},()=>
                this.getFormattedAddress(key,e)
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
            },()=> this.getFormattedAddress(key,e));
        }

    }

    getFormattedAddress =(key,coordinates)=>{
        getReverseGeocoding(coordinates).then(data => {
            if (data.status === "OK") {
                if (!_.isEmpty(data.results)) {
                    let address = _.clone(data.results[0].formatted_address);
                    this.setState({destination:address})
                    let marked = _.clone(this.state.markers);
                    let itemIdx = _.findIndex(marked, (it) => {
                        return it.key == key
                    })
                    if (itemIdx > -1) {
                        // console.log( "match",marked[itemIdx]);
                        marked[itemIdx] = update(marked[itemIdx], {
                            $merge: {
                                formatted_address:address,
                            }
                        })

                        this.setState({markers:marked},()=>console.log("markers",this.state.markers))
                    }
                }
            }
        })
    }



    onUserPinDragEnd =(e)=>{
        this.addMarker(e);
    }


    onValueChange2 =(value: string)=> {
        this.setState({
            problem: value
        });
    }

    fetchProblemCategory =()=>{
        const {dispatch} = this.props;
        dispatch({
            type:'service/requestCategory',
            payload:{
                callback:(result,error)=>{
                    if(result == false){
                        CustomAlert.alert(error);
                    }
                }
            },

        })
    }

    submitSr =()=>{
        const{dispatch,navigation} = this.props;

        dispatch({
            type: 'service/submitRequest',
            payload: {
                pickuplong :this.state.region.longitude,
                pickuplat :this.state.region.latitude,
                pickup_location :this.state.formattedAddress,
                pickupremarks :this.state.pickupRemarks,
                destination_long:!_.isEmpty(this.state.markers)? this.state.markers[0].coordinate.longitude : '',
                destination_lat :!_.isEmpty(this.state.markers)? this.state.markers[0].coordinate.latitude : '',
                destination_remarks:this.state.destinationRemarks,
                destination:!_.isEmpty(this.state.markers)? this.state.markers[0].formatted_address : '',
                problem:this.state.problem ,
                callback: (result, error) => {
                    if (result) {
                        this.setState({selected2:'',
                            markers:[],
                            region:{}
                        },() =>{
                            alert(error);
                            //console.log(this.props);
                            reset('Drawer');
                        })

                    }
                }
            },
        })

    }

    openRemarks =(item)=>{
        this.setState({
            selectedRemarks:item,
            remarksVisible:true,
        })
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
            selectedRemarks:"",
            remarksVisible:false,
        },()=>console.log(this.state))
    }



    render() {

        const {srCategory}=this.props.service;
        const initialProb = this.props.navigation.getParam('noSelection', false)
        const ic_pickup = require("../assets/icons/ic_pickup.png");
        const grabcar_premium =require ("../assets/icons/ic_grabcar_premium.png");
        const grabcar = require('../assets/icons/ic_grabcar.png')
        const {service} =this.props;

        let pickerOption = _.map(srCategory,(item,x)=>{
            return (
                <Picker.Item key={x} label={item.description} value={item.description}style={{padding:10}}/>
            )
        })
        return (
           <>
            <View style={styles.container}>
                <View style={styles.homePickerContainer}>
                    <View style={{
                        flex:1.5,
                        alignItems: 'center',
                        justifyContent:'center',
                    }}>
                        <Image style={{zIndex:2, height:72, width:12, resizeMode: 'contain'}}
                               source={require('../assets/icons/hitch_pin_without_dropoff.png')}/>
                    </View>

                    <View style={{
                        flex:10.5,
                    }}>
                        <Item>
                            <Input  disabled style={{color:"#484848"}} value={_.truncate(this.state.formattedAddress,{'length':40})}/>
                            <Icon active name='menu' onPress={()=>this.openRemarks("Pickup")} />
                        </Item>
                        <Item>
                            <Input disabled style={{color:"#484848"}} value={!_.isEmpty(this.state.markers)? _.truncate(this.state.destination,{'length':40}) :" Where Are You Going?"}/>
                            <Icon active name='menu' onPress={()=>this.openRemarks("Destination")} />
                        </Item>
                    </View>

                </View>

                {this.state.region['latitude'] ?
                <MapView
                    style={styles.map}
                    showsUserLocation={true}
                    followUserLocation={true}
                    loadingEnabled={true}
                    initialRegion ={this.state.region}
                    onPanDrag={this.onPanDrag}
                    onPress={e =>this.addMarker(e)}
                >
                    <MapView.Marker
                                    key={"pickup"}
                                    coordinate={this.state.region}
                                    onDragEnd={(e) => this.updateState( e.nativeEvent.coordinate )}
                    >
                        <Image style={{zIndex:2, width: 25, height: 53}} source={grabcar_premium}/>
                    </MapView.Marker>

                    {/*{this.state.markers.map((marker,y) => (*/}

                        {/*<MapView.Marker*/}
                            {/*key={y}*/}
                            {/*coordinate={marker.latlng}*/}
                        {/*>*/}
                            {/*<View style={{transform: [{ rotate: marker.rotate}]}}>*/}
                                {/*<Image style={{zIndex:2, width: 25, height: 53}} source={grabcar_premium}/>*/}
                            {/*</View>*/}
                        {/*</MapView.Marker>*/}

                    {/*))}*/}

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
                </MapView> :
                        <CustomActivityIndicator
                            animating = {true}
                            text="Please Wait..."
                            color="#D44638"
                        />
                }
                <View style={styles.iosOnlyTopBar}/>
                <View style={styles.bottomContainer}>
                    <TouchableOpacity onPress={() => this.getInitialState()} style={{ height:38, width:38, marginLeft:20}}>
                        <Image style={{zIndex:2, height:38, width:38, resizeMode: 'contain',marginRight:12, marginBottom: 24, alignSelf:"flex-end"}}
                               source={require('../assets/icons/ic_locate.png')}
                        />
                    </TouchableOpacity >
                    <View style={styles.mobilPilihanContainer}>
                        <View style={styles.mobilTop}>
                                <View style={{
                                    flex:2
                                }}>
                                    <Image style={{ marginLeft:10,zIndex:2, height:22, width:27, resizeMode: 'contain'}}
                                           source={require('../assets/icons/ic_budget_active.png')}/>
                                </View>
                                <View style={{
                                    flex:8
                                }}>
                                    <Picker
                                        mode="dropdown"
                                        iosIcon={<Icon name="arrow-down" />}
                                        style={{ width: undefined }}
                                        placeholder="Problem"
                                        placeholderStyle={{ color: "#bfc6ea" }}
                                        placeholderIconColor="#007aff"
                                        selectedValue= {this.state.problem}
                                        onValueChange={this.onValueChange2}
                                    >
                                        { pickerOption }
                                    </Picker>
                                </View>
                        </View>

                    </View>
                    <View style={styles.dropOffButton}>
                        <Button block onPress={this.submitSr} disabled={this.props.service.loading}>
                            <Text style={{color:'#fff'}}>SUBMIT SERVICE REQUEST</Text>
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
                   pickupLoc={this.state.formatted_address}
                   destination={this.state.destination}
               />:null}
            </>
        );
    }
}

export default CreateServiceRequest;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#3A5999',
        height: height,
        width: width,

    },
    bottomContainer:{
        flex:1,
        zIndex:2,
        position: 'absolute',
        ...Platform.select({
            ios: {
                bottom:8,
            },
            android: {
                bottom:30,
            },
        }),
    },
    dropOffButton:{
        marginLeft:12,
        marginRight:12,
        borderRadius:2,
        // backgroundColor: '#008D33',
        height:56,
        width:width-24,
        zIndex:2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    iosOnlyTopBar:{
        backgroundColor: '#00B140',
        zIndex:2,
        ...Platform.select({
            ios: {
                height: 20,
            },
            android: {
                height: 0,
            },
        }),
    },
    topBarContainer:{
        backgroundColor: '#00B140',
        zIndex:2,
        height: 59,
        flexDirection:'row',
        alignItems: 'center',


    },
    homePickerContainer: {
        zIndex:2,
        marginTop:10,
        marginLeft:6,
        marginRight:6,
        borderRadius:4,
        backgroundColor: '#fff',
        flexDirection:'row',
        paddingTop:24,
        paddingBottom:24,

    },
    mobilPilihanContainer: {
        marginLeft:12,
        marginRight:12,
        borderRadius:4,
        marginBottom:17,
        zIndex:2,
    },

    mobilTop: {
        borderRadius:5,
        backgroundColor: '#fff',
        height:72,
        flexDirection:'row',
        alignItems:'center',
        zIndex:3,
        flex:10,

    },
    mobilEffect: {
        height:19,
        marginLeft:14,
        marginRight:14,
        marginTop:-7,
        borderRadius:5,
        backgroundColor: '#F4F6F8',
        zIndex:2,
    },
    map: {
        flex:1,
        ...StyleSheet.absoluteFillObject,
        zIndex:0,
    },


});

