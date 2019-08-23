import React, {Component} from 'react';
import {Body, Button, Card, CardItem, Container, Content, Header, Icon, Left, Right, Text} from 'native-base';
import {Image, Modal, StyleSheet, TouchableHighlight, View, FlatList,BackHandler} from 'react-native';
import * as DeviceRatio from "../layout/DeviceRatio";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux'
import {dial} from "../utils/CallDialer";
import _ from "lodash";
import TermsOfService from "../components/Terms";
import CustomActivityIndicator from "../layout/CustomActivityIndicator";
import {CustomAlert, CustomNavigationService} from "../layout";

const redlogo = require("../assets/bkblogo.png");
const resizeMode = 'center';


@connect(({ auth,service }) => ({ auth,service }))
export default class LandingComponents extends Component {
    constructor(props){
        super(props)
        this.state = {
            problem:{},
            modalVisible:false
        }
    }
    componentDidMount(){

        this.fetchProblemCategory();
    }


    fetchProblemCategory =()=>{

        const {dispatch,auth} = this.props;

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

    setModalVisible=(visible,problem)=> {
            if (this.props.auth.isAuthenticated) {
                const {dispatch} = this.props;
                dispatch({
                    type: 'service/checkAccepted',
                    payload: {
                        problemid: problem.problemid,
                        callback: (response) => {
                            if (response) {
                                this.props.navigation.navigate('CreateSr', {
                                    problem: problem.description,
                                });
                            } else {
                                this.setState({
                                    modalVisible: visible,
                                    problem: problem,
                                });
                            }
                        }
                    }
                })
            } else {
                this.props.navigation.navigate('Login');
            }

    }

    onAccept =()=>{
        const {dispatch} = this.props;
        dispatch({
            type: 'service/acceptTnc',
            payload: {
                problemid: this.state.problem.description,
                callback: (response) => {
                    if(response){
                        this.setState({modalVisible: false});
                        this.props.navigation.navigate('CreateSr', {
                            problem: this.state.problem.problemid,
                            noSelection:true
                        });
                    }else{
                        CustomAlert.alert("Failed","Error in Sending Service Request");
                        this.setState({modalVisible: false,problem:{}});
                    }
                }
            }
        })

    }
    onDecline =()=>{
        this.setState({modalVisible: false,
            problem:{}
        });
    }

    renderIco =(item)=>{
            switch (item.description) {
                case "Flat Tyres" :
                     return "disc-full"
                    break;
                case "Flat Battery" :
                    return "battery-alert"
                    break;
                case "Emergency Fuel" :
                    return "local-gas-station"
                    break;
                case "Towing" :
                    return "rv-hookup"
                    break;
                case "Key Finder" :
                    return "vpn-key"
                    break;
                case "Alternative Transport":
                    return "local-taxi"
                    break;
                default:
                 return  "build"
            }
    }

    render() {

        const{srCategory}=this.props.service

        const withTnc = _.filter(srCategory, 'withTnc');

        const renderproblems = _.map(withTnc.slice(0,6), (item, x) => {
            return(
                <TouchableHighlight key={item.problemid} onPress={()=>this.setModalVisible(true,item)}underlayColor="white">
                    <View style={styles.button}>
                        <Icon style={{fontSize:60 , color:'#ED1727',padding: 10}} name={this.renderIco(item)}/>
                        <Text style={styles.buttonText}>{item.description}</Text>
                    </View>
                </TouchableHighlight>
            )
        })
               return (

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
                            />
                            :renderproblems
                        }

                        {this.state.modalVisible?
                            <Modal
                                animationType="slide"
                                transparent={false}
                                visible={this.state.modalVisible}
                                onRequestClose={() => {
                                   this.onDecline()
                                }}>
                                <TermsOfService onAccept={this.onAccept} onDecline={this.onDecline} problem={this.state.problem}
                                />
                            </Modal> : null
                        }
                    </View>


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