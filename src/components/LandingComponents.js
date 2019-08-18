import React, {Component} from 'react';
import {Body, Button, Card, CardItem, Container, Content, Header, Icon, Left, Right, Text} from 'native-base';
import {Image, Modal, StyleSheet, TouchableHighlight, View, FlatList} from 'react-native';
import * as DeviceRatio from "../layout/DeviceRatio";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux'
import {dial} from "../utils/CallDialer";
import _ from "lodash";
import TermsOfService from "../components/Terms";
import CustomActivityIndicator from "../layout/CustomActivityIndicator";

const redlogo = require("../assets/bkblogo.png");
const resizeMode = 'center';


@connect(({ auth,service }) => ({ auth,service }))
export default class LandingComponents extends Component {
    constructor(props){
        super(props)
        this.state = {
            region: {},
            problem:'',
            modalVisible:false
        }
    }
    componentDidMount(){
        this.fetchProblemCategory();
    }

    fetchProblemCategory =()=>{
        const {dispatch} = this.props;
        dispatch({
            type:'service/requestCategory',
            payload:{}
        })
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
        const staticServices = [
            {
                problemid:100,
                description:"Flat Tire",
                staticService: true ,
                icon:"alert-circle"
            },
            {
                problemid:101,
                description:"Emergency Fuel",
                staticService: true,
                icon:"fuel"
            },
            {
                problemid:102,
                description:"Flat Battery",
                staticService: true,
                icon:"car-battery"
            },
            {
                problemid:103,
                description:"Towing",
                staticService: true,
                icon:"towing"
            },
            {
                problemid:104,
                description:"Key Finder",
                staticService: true,
                icon:"key-remove"
            },
            {
                problemid:105,
                description:"Alternative Transport",
                staticService: true,
                icon:"car-pickup"
            },

        ];
        const {srCategory} = this.props.service;

        const renderproblems = _.map(staticServices, (item, x) => {
            return(
                <TouchableHighlight key={item.problemid} onPress={() => this.setModalVisible(true,"")}underlayColor="white">
                    <View style={styles.button}>
                        <MaterialCommunityIcons style={{fontSize:60 , color:'#ED1727',padding: 10}} name={item.icon}/>
                        <Text style={styles.buttonText}>{item.description}</Text>
                    </View>
                </TouchableHighlight>
            )
        })
               return (

                <Content padder >
                    <View style={{flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        flexWrap:'wrap',
                    }}>
                        {this.props.service.loading?
                            <CustomActivityIndicator
                                animating = {true}
                                text="Please Wait..."
                                color="#D44638"
                            />:null
                        }
                        {
                           renderproblems
                        }
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
        marginBottom: 10,
        alignItems:'center',
        alignContent:'center'
    }
});