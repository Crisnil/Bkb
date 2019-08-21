import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Text, Icon, Right,Body,Left,Button } from 'native-base';
import {View,Image,TouchableHighlight,StyleSheet,BackHandler} from 'react-native';
import * as DeviceRatio from "../layout/DeviceRatio";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DrawerActions } from 'react-navigation';
import {dial} from "../utils/CallDialer";
import LandingComponents from "../components/LandingComponents";
import { CustomAlert, CustomNavigationService, CustomTitleBar } from '../layout'
import { connect } from 'react-redux'

const redlogo = require("../assets/bkblogo.png");
const resizeMode = 'center';

const openSideMenu =(action)=>{
    return()=>{
        this.props.navigation.dispatch(action)
    }

}

@connect(({ auth,services }) => ({ auth,services }))
export default class LandingPage extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        console.log("logging in");
        const {dispatch} = this.props;
            dispatch({
            type: 'auth/checkAuth',
            payload:{}
        })
    }



    onIconPress =(route)=>{
        const {auth,navigation} = this.props;
        return()=>{
            navigation.navigate(route)
        }
    }

    render() {
        return (
            <Container styel={{ backgroundColor: 'b3c7f9'}}>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={CustomNavigationService.openDrawer()}
                        >
                            <Icon name="menu" style={{marginRight:10,color:'#fff',fontSize:27}}/>
                        </Button>
                    </Left>
                    <Right>

                        <Icon name="account-circle" style={{marginRight:10,color:'#fff',fontSize:27}}
                                                onPress={this.onIconPress("Dashboard")}
                        />
                        <Icon name="exit-to-app"  style={{color:'#fff',fontSize:27}}
                            onPress={()=>BackHandler.exitApp()}
                        />
                    </Right>
                </Header>
                    <View style={{flex:0.3, alignItems: 'center',
                        justifyContent: 'center',}}>
                        {/*<ImageBackground source={redlogo} style={styles.logo} resizeMode/>*/}
                        <Image
                            style={{
                                flex: 1,
                                width: DeviceRatio.computeWidthRatio(800),
                                resizeMode,
                            }}
                            source={redlogo}
                        />
                    </View>
                <LandingComponents {...this.props}/>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 60,
        alignItems: 'center'
    },
    button: {
        marginBottom: 20,
        width: DeviceRatio.computeWidthRatio(300),
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    buttonText: {
        padding: 5,
        color: '#000',
        marginBottom: 10
    }
});