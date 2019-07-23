import React from 'react';
import {
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Platform, Modal, TouchableHighlight,PermissionsAndroid,Alert
} from 'react-native';
import MapView, {
    ProviderPropType,
    Marker,
    AnimatedRegion, PROVIDER_GOOGLE, PROVIDER_DEFAULT, Callout
} from 'react-native-maps';
import update from 'react-addons-update'
import {
    Body, Button, Card, CardItem, Container, Content, Footer, FooterTab, Form, Header, Icon, Input, Item, Label, Left,
    ListItem, Picker, Radio,
    Right,
    Text,
    Title, View,Spinner
} from "native-base";
import _ , { debounce }from 'lodash'


const screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0522;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const latitudeDelta = 0.025;
const longitudeDelta = 0.025;

function randomColor() {
    return `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, 0)}`;
}

class TestMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialLocation:null,
            dest:null,
            pickupLoc:null,
            region:null,
            concat: null,
            coords:[],
            x: 'false',
            cordLatitude:-6.23,
            cordLongitude:106.75,
            modalVisible:false,
            selected:'destination',
            markers:[]
        };
        this.onPanDrag = debounce(this.onPanDrag, 1000, {
            leading: true,
            trailing: false,
        });
    }

    componentDidMount(){
        console.log("didmount");
        if(Platform.OS === 'android'){
            console.log("android");
           this.requestLocationPermission()
        }else{
            this._getCurrentLocation()
        }
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
                this._getCurrentLocation()
                console.log("Location permission granted")
            } else {
                console.log("Location permission denied")
            }
        } catch (err) {
            console.warn(err)
        }
    }

    _getCurrentLocation = () =>{
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log("pos",position);
                const region = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta,
                    longitudeDelta,
                };
                //this.onRegionChangeComplete(region);
                this.setState({region:region},()=>{
                    console.log("state",this.state)
                    this.onRegionChangeComplete(region);
                })

            },
            (error) => {
                this.setState({ error: error.message })},
            { enableHighAccuracy: true, timeout: 200000, maximumAge: 2000 },
        );
    }

    onRegionChangeComplete = (region) => {
        const newState = {
            region,
            isPanding: false,
        };

        this.setState({
            newState
        });
    };

    onPanDrag = () => {
        const { isPanding } = this.state;
        if (isPanding) {
            return;
        }
        this.setState({
            isPanding: true,
        });
    };

    // onMapPress(e) {
    //     console.log(e.nativeEvent.coordinate.longitude);
    //     let region = {
    //         latitude:       e.nativeEvent.coordinate.latitude,
    //         longitude:      e.nativeEvent.coordinate.longitude,
    //         latitudeDelta:  0.00922*1.5,
    //         longitudeDelta: 0.00421*1.5
    //     }
    //     this.onRegionChange(region, region.latitude, region.longitude);
    // }

    onMapPress =(e,key)=> {
        let marked = _.clone(this.state.markers)

            let itemIdx = _.findIndex(marked, (it) => {
                return it.key == key
            })
            if (itemIdx > -1) {
                console.log( "match",marked[itemIdx]);
                marked[itemIdx] = update(marked[itemIdx], {
                    $set: {
                        coordinate: e,
                        key: key,
                        color: randomColor()
                    }
                })
                const region = {
                    latitude:e.latitude,
                    longitude: e.longitude,
                    latitudeDelta,
                    longitudeDelta,
                };
               this.setState({markers:marked},()=>console.log(this.state.markers))
            }
            else{
                this.setState({
                    markers: [
                        ...this.state.markers,
                        {
                            coordinate: e,
                            key: key,
                            color: randomColor(),
                        },
                    ],
                });
            }
    }


    addMarker=(e)=> {
        console.log(e.nativeEvent.coordinate);
        let coordinates = _.clone(e.nativeEvent.coordinate);
        switch(this.state.selected){
            case "pickup":
                this.setState({pickupLoc :coordinates},()=>{
                    this.onMapPress(coordinates ,'pickup')
                })
            break;
            case "destination":
                this.setState({dest : coordinates},()=>{
                    this.onMapPress(coordinates ,'destination')
                })

                break;
            default:
        }

    }

    onFocus =(selected)=> {
        console.log("active",selected);
        this.setState({
            selected: selected,
            [selected]:true
        })
    }

    onBlur =(field)=> {
        this.setState({
            [field]: false
        })
    }

    setModalVisible=(visible)=> {
        this.setState({modalVisible: visible});
    }

    onValueChange2 =(value: string)=> {
        this.setState({
            selected2: value
        });
    }

    render() {
        const {pickupLoc,dest,region} = this.state

        let initial = !_.isNull(pickupLoc)? pickupLoc : region;

        const {height: screenHeight} = Dimensions.get('window');

        return (
            <Container>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.openDrawer()}
                        >
                            <Icon name="ios-menu" />
                        </Button>
                    </Left>
                    <Body style={{alignItems:'center'}}>
                        <Title>SR REQUEST</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Right>
                </Header>
                    <Content>

                            <View style={{flex: 1, height: screenHeight}}>
                                <MapView
                                    provider={PROVIDER_GOOGLE}
                                    initialRegion={region}
                                    style={styles.map}
                                    showsUserLocation={true}
                                    followUserLocation={true}
                                    loadingEnabled={true}
                                    onPanDrag={this.onPanDrag}
                                    mapType={'hybrid'}
                                    onRegionChangeComplete={this.onRegionChangeComplete}
                                    onPress={e =>this.addMarker(e)}
                                >
                                    {this.state.markers.map(marker => (
                                        <Marker
                                            key={marker.key}
                                            coordinate={marker.coordinate}
                                            pinColor={marker.color}
                                            title={marker.key}
                                        />
                                    ))}
                                </MapView>
                                <View>
                                    <Card style={{backgroundColor: "#FFF"}}>
                                        <Item success={this.state['pickup']? true : false}>
                                            <Icon name="home" />
                                            <Input placeholder="Pick up Location"
                                                   value={!_.isNull(initial)? `${Math.round((initial.longitude + 0.00001) * 100) / 100},${Math.round((initial.latitude + 0.00001) * 100) / 100}`:""}
                                                   onFocus={ () => this.onFocus('pickup')}
                                                   onBlur={()=>this.onBlur('pickup')}
                                            />
                                            <Icon name='checkmark-circle' />
                                            <Button transparent onPress={()=>this.setModalVisible(true)}>
                                                <Icon  ios='ios-menu' android="md-menu" />
                                            </Button>
                                        </Item>
                                        <Item  success={this.state['destination']? true : false} last>
                                            <Icon name="navigate" />
                                            <Input placeholder="Destination(e.g. long,lat)"
                                                   value={!_.isNull(dest)? `${Math.round((dest.longitude + 0.00001) * 100) / 100},${Math.round((dest.latitude + 0.00001) * 100) / 100}`:""}
                                                   onFocus={ () => this.onFocus('destination')}
                                                   onBlur={()=>this.onBlur('destination')}/>
                                            <Icon name='checkmark-circle' />
                                        <Button transparent>
                                        <Icon  ios='ios-menu' android="md-menu" />
                                        </Button>
                                        </Item>
                                        <Item picker>
                                        <Picker
                                        mode="dropdown"
                                        iosIcon={<Icon name="arrow-down" />}
                                        style={{ width: undefined }}
                                        placeholder="Problem"
                                        placeholderStyle={{ color: "#bfc6ea" }}
                                        placeholderIconColor="#007aff"
                                        selectedValue={this.state.selected2}
                                        onValueChange={this.onValueChange2.bind(this)}
                                        >
                                        <Picker.Item label="Towing" value="key0" disabled/>
                                        <Picker.Item label="Engine Failure" value="key1" />
                                        <Picker.Item label="Flat Tire" value="key2" />
                                        <Picker.Item label="Empty Gas" value="key3" />
                                        <Picker.Item label="Overheating" value="key4" />
                                        </Picker>
                                        </Item>
                                    </Card>
                                </View>
                            </View>
                        <View>
                            <Modal
                                animationType="slide"
                                transparent={false}
                                visible={this.state.modalVisible}
                                onRequestClose={() => {
                                    Alert.alert('Modal has been closed.');
                                }}>
                                <View style={{marginTop: 22}}>
                                    <View>
                                        <Text>Hello World!</Text>
                                        <TouchableHighlight
                                            onPress={() => {
                                                this.setModalVisible(!this.state.modalVisible);
                                            }}>
                                            <Text>Hide Modal</Text>
                                        </TouchableHighlight>
                                    </View>
                                </View>
                            </Modal>
                        </View>
                </Content>
                <Footer>
                    <FooterTab>
                        <Button  active>
                            <Icon active name="shuffle" />
                            <Text>Proceed</Text>
                        </Button>
                        <Button >
                            <Icon name="refresh" />
                            <Text>Cancel</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

// TestMap.propTypes = {
//     provider: ProviderPropType,
// };

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    allNonMapThings: {
        height: '100%',
        width: '100%'
    },
    button: {
        alignItems: 'center',
        elevation: 1,
        position: 'absolute',
        bottom: 25,
        backgroundColor: '#ff6600',
        borderRadius: 10,
        width: '60%',
        height: 40,
        justifyContent: 'center',
        shadowOpacity: 0.75,
        shadowRadius: 1,
        shadowColor: 'gray',
        shadowOffset: { height: 0, width: 0}
    },
    buttonText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',

    },
});
export default TestMap;
