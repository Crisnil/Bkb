import React, {Component} from 'react';
import {
    Body,
    Button,
    Card,
    CardItem,
    Container,
    Content,
    Footer,
    FooterTab,
    Header,
    Icon,
    Left,
    Right,
    Text
} from 'native-base';
import {BackHandler, Image, StyleSheet, TouchableHighlight, View} from 'react-native';
import * as DeviceRatio from "../layout/DeviceRatio";
import {DrawerActions} from 'react-navigation';
import LandingComponents from "../components/LandingComponents";
import {CustomNavigationService} from '../layout'
import {connect} from 'react-redux'
import {dial} from "../utils/CallDialer";

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
                <Footer>
                    <FooterTab>
                        <Button vertical onPress={()=>dial('09209502976',false)}>
                            <Icon name="phone" />
                            <Text>Special Assistance</Text>
                        </Button>
                    </FooterTab>
                </Footer>
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