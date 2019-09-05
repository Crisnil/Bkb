import React, {Component} from "react";
import {Dimensions, Image, Modal, TextInput, View,StyleSheet} from "react-native";
import {
    Body,
    Button,
    Container,
    Content,
    Footer,
    FooterTab,
    Form,
    Header,
    Icon,
    Left,
    Right,
    Text,
    Title,
    Textarea,
    List,
    ListItem,
    Subtitle
} from "native-base";
import {CustomAlert} from "../layout";
import {connect} from 'react-redux';
import LazyLoadList from "../layout/LazyLoadList";
import TermsOfService from "../components/Terms";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableHighlight} from "../components/LandingComponents";
import * as DeviceRatio from "../layout/DeviceRatio";

@connect(({ auth,service }) => ({ auth,service }))
class ProblemCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            modalVisible:false
        };
    }
    componentDidMount(){
        this.fetchProblemCategory();
    }

    fetchProblemCategory =()=>{
        const {dispatch} = this.props;
        dispatch({
            type:'service/requestCategory',
            payload:{
                callback:(result,error)=>{
                    if(result == false){
                        CustomAlert.alert("Service Category",error);
                    }
                }
            },

        })
    }

    setModalVisible=(problem)=> {
        return()=> {
            if (this.props.auth.isAuthenticated) {
                const {dispatch} = this.props;
                dispatch({
                    type: 'service/onSelect',
                    payload: {
                        problem: problem.item,
                        callback: (response) => {
                            if (response) {
                                this.setState({
                                    modalVisible: true,
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
    }

    onAccept =()=>{
        // const {dispatch} = this.props;
        // dispatch({
        //     type: 'service/acceptTnc',
        //     payload: {
        //         problemid: this.state.problem.problemid,
        //         callback: (response) => {
        //             if(response){
        this.setState({modalVisible: false});
        this.props.navigation.navigate('MapContainer', {
            tncAccepted:true
        });
        //             }else{
        //                 CustomAlert.alert("Failed","Error in Sending Service Request");
        //                 this.setState({modalVisible: false,problem:{}});
        //             }
        //         }
        //     }
        // })

    }
    onDecline =()=>{
        const {dispatch} = this.props;
        dispatch({
            type: 'service/onSelect',
            payload: {
                clearSelection: true
            }
        })
        this.setState({modalVisible: false,
            problem:{}
        });
    }


    renderItems =(item,x)=>{
        return(
            <ListItem icon key={x} onPress={this.setModalVisible(item)}>
                <Left>
                    <Button style={{backgroundColor: '#fff'}}>
                        <MaterialCommunityIcons style={{color:'#ED1727'}} active name={item.item.icon_name? item.item.icon_name : "wrench"} />
                    </Button>
                </Left>
                <Body>
                <Text>{item.item.description}</Text>
                </Body>
                <Right>

                </Right>
            </ListItem>

        )
    }
    render() {
        const{srCategory}=this.props.service;
        return (

                <Container>
                    <Header>
                        <Left/>
                        <Body>
                        <Title>Problem Listing</Title>
                        <Subtitle>Please Choose</Subtitle>
                        </Body>
                        {/*<Right>*/}
                        {/*<MaterialCommunityIcons name="account-outline" style={{marginRight:10,color:'#fff',fontSize:27}}*/}
                        {/*onPress={this.props.onClose}*/}
                        {/*/>*/}
                        {/*</Right>*/}
                    </Header>
                    <Content padder>
                        <LazyLoadList
                            data={srCategory}
                            renderItem={this.renderItems}
                            onRefresh={this.reFreshing}
                            refreshing={this.props.service.loading}
                        />

                        {this.state.modalVisible?
                            <Modal
                                animationType="slide"
                                transparent={false}
                                visible={this.state.modalVisible}
                                onRequestClose={() => {
                                    this.onDecline()
                                }}>
                                <TermsOfService onAccept={this.onAccept} onDecline={this.onDecline} problem={this.state.problem.item}
                                />
                            </Modal> : null
                        }
                    </Content>
                </Container>
        );
    }
}

export default ProblemCategory;

const styles = StyleSheet.create({
    container: {
        paddingTop: 60,
        alignItems: 'center'
    },
    button: {
        marginBottom: 20,
        width: DeviceRatio.computeWidthRatio(100),
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