import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Text, Icon, Right,Body,Left,Button } from 'native-base';
import {View,Image,TouchableHighlight,StyleSheet} from 'react-native';
import * as DeviceRatio from "../layout/DeviceRatio";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {dial} from "../utils/CallDialer";

const redlogo = require("../assets/bkblogo.png");
const resizeMode = 'center';

export default class LandingComponents extends Component {
    render() {
               return (

                <Content padder >
                    <View style={{flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        flexWrap:'wrap',
                    }}>

                        <TouchableHighlight  onPress={() => alert("Terms and Condition Section")}underlayColor="white">
                            <View style={styles.button}>
                                <MaterialCommunityIcons style={{fontSize:60 , color:'#ED1727',padding: 10}} name='car-battery'/>
                                <Text style={styles.buttonText}>Flat Battery</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight  onPress={() => alert("Terms and Condition Section")}underlayColor="white">
                            <View style={styles.button}>
                                <MaterialCommunityIcons name='fuel'  style={{fontSize:60 , color:'#ED1727',padding: 10}}/>
                                <Text style={styles.buttonText}>Emergency Fuel</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight  onPress={() => alert("Terms and Condition Section")}underlayColor="white">
                            <View style={styles.button}>
                                <MaterialCommunityIcons name='alert-circle'  style={{fontSize:60 , color:'#ED1727',padding: 10}}/>
                                <Text style={styles.buttonText}>Flat Tire</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight  onPress={() => alert("Terms and Condition Section")}underlayColor="white">
                            <View style={styles.button}>
                                <MaterialCommunityIcons name='towing'  style={{fontSize:60 , color:'#ED1727',padding: 10}}/>
                                <Text style={styles.buttonText}>Towing</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight  onPress={() => alert("Terms and Condition Section")}underlayColor="white">
                            <View style={styles.button}>
                                <MaterialCommunityIcons name='key-remove'  style={{fontSize:60 , color:'#ED1727',padding: 10}}/>
                                <Text style={styles.buttonText}>Key Finder</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight  onPress={() => alert("Terms and Condition Section")}underlayColor="white">
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