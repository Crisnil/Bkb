import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Text, Icon, Right,Body,Left,Button } from 'native-base';
import {View,Image,TouchableHighlight,StyleSheet,Modal} from 'react-native';
import * as DeviceRatio from "../layout/DeviceRatio";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux'
import {dial} from "../utils/CallDialer";
import {getLocation, getReverseGeocoding} from "../services/location-service";

import TermsOfService from "../components/Terms";

const redlogo = require("../assets/bkblogo.png");
const resizeMode = 'center';


@connect(({ auth }) => ({ auth }))
export default class LandingComponents extends Component {
    constructor(props){
        super(props)
        this.state = {
            region: {},
            problem:'',
            modalVisible:false
        }
    }

    setModalVisible=(visible,problem)=> {
        if(this.props.auth.isAuthenticated) {
            this.setState({
                modalVisible: visible,
                problem: problem,
            });
        }else{
            this.props.navigation.navigate('Login');
        }
    }

    onAccept =()=>{
        this.setState({modalVisible: false},()=>{
            this.props.navigation.navigate('CreateSr', {
                problem: this.state.problem,
                noSelection:true
            });
        });
    }
    onDecline =()=>{
        this.setState({modalVisible: false,
            problem:''
        });
    }
    render() {
               return (

                <Content padder >
                    <View style={{flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        flexWrap:'wrap',
                    }}>

                        <TouchableHighlight  onPress={() => this.setModalVisible(true,"Flat Tire")}underlayColor="white">
                            <View style={styles.button}>
                                <MaterialCommunityIcons style={{fontSize:60 , color:'#ED1727',padding: 10}} name='car-battery'/>
                                <Text style={styles.buttonText}>Flat Battery</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight   onPress={() => this.setModalVisible(true,"Emergency Fuel")} underlayColor="white">
                            <View style={styles.button}>
                                <MaterialCommunityIcons name='fuel'  style={{fontSize:60 , color:'#ED1727',padding: 10}}/>
                                <Text style={styles.buttonText}>Emergency Fuel</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight   onPress={() => this.setModalVisible(true,"Flat Tire")}underlayColor="white">
                            <View style={styles.button}>
                                <MaterialCommunityIcons name='alert-circle'  style={{fontSize:60 , color:'#ED1727',padding: 10}}/>
                                <Text style={styles.buttonText}>Flat Tire</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight   onPress={() => this.setModalVisible(true,"Towing")} underlayColor="white">
                            <View style={styles.button}>
                                <MaterialCommunityIcons name='towing'  style={{fontSize:60 , color:'#ED1727',padding: 10}}/>
                                <Text style={styles.buttonText}>Towing</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight   onPress={() => this.setModalVisible(true,"Key Finder")}underlayColor="white">
                            <View style={styles.button}>
                                <MaterialCommunityIcons name='key-remove'  style={{fontSize:60 , color:'#ED1727',padding: 10}}/>
                                <Text style={styles.buttonText}>Key Finder</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight   onPress={() => this.setModalVisible(true,"Alternative Transport")}underlayColor="white">
                            <View style={styles.button}>
                                <MaterialCommunityIcons name='car-pickup'  style={{fontSize:60 , color:'#ED1727',padding: 10}}/>
                                <Text style={styles.buttonText}>Alternative Transport</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight   onPress={()=>dial('09209502976',false)} underlayColor="white">
                            <View style={styles.button}>
                                <MaterialCommunityIcons name='phone'  style={{fontSize:60 , color:'#ED1727',padding: 10}}/>
                                <Text style={styles.buttonText}>Special Assistance</Text>
                            </View>
                        </TouchableHighlight>

                    </View>
                    <View>
                        {this.state.modalVisible?
                            <Modal
                                animationType="slide"
                                transparent={false}
                                visible={this.state.modalVisible}
                                onRequestClose={() => {
                                    this.setModalVisible(false)
                                }}>
                                <TermsOfService onAccept={this.onAccept} onDecline={this.onDecline} />
                            </Modal> : null
                        }
                    </View>
                </Content>

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