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
import {BackHandler, Image, StyleSheet, TouchableHighlight, View,Alert,TextInput} from 'react-native';
import * as DeviceRatio from "../layout/DeviceRatio";
import {DrawerActions} from 'react-navigation';
import LandingComponents from "../components/LandingComponents";
import {CustomNavigationService} from '../layout'
import {connect} from 'react-redux'
import {dial} from "../utils/CallDialer";
import * as Config from "../config/Config";

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
        this.state ={
            pressed:0,
            text:'Useless Placeholder',
        }
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

    logoPress =()=>{
        console.log("press",this.state.pressed);
        if(this.state.pressed < 7){
            let newpress = this.state.pressed +1;
            this.setState({pressed:newpress})
        }else{

            Alert.alert(
                'API Settings',
                "// Todo Api URL",
                [
                    {text: 'Ask me later', onPress: () => {this.setState({pressed:0});console.log('Ask me later Pressed')}},
                    {text: 'Cancel', onPress: () => {this.setState({pressed:0});console.log('Cancel Pressed')}},
                    {text: 'OK', onPress: () => {this.setState({pressed:0});console.log('Ok Pressed')}},
                ],
                { cancelable: false }
            )
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
                        <TouchableHighlight underlayColor="white"  onPress={this.logoPress}>
                            <Image
                                style={{
                                    flex: 1,
                                    width: DeviceRatio.computeWidthRatio(800),
                                    resizeMode,
                                }}
                                source={redlogo}
                            />
                        </TouchableHighlight>
                    </View>
                    <Content>
                         <LandingComponents {...this.props}/>
                    </Content>
                <Footer>
                    <FooterTab>
                        <Button vertical>
                            <Text>Powered by BruGPS</Text>
                        </Button>
                    </FooterTab>
                    <FooterTab>
                        <Button vertical onPress={()=>dial(`${Config.CALL_BKB}`,false)}>
                            <Icon name="phone" />
                            <Text>Call BKB</Text>
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