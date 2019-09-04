import React, {Component} from "react";
import {Dimensions, Image, Modal, TextInput, View} from "react-native";
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
} from "native-base";
import {CustomAlert} from "../layout";
import {connect} from 'react-redux';
import LazyLoadList from "../layout/LazyLoadList";
import TermsOfService from "../components/Terms";


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
            console.log("probs", problem);
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
            <ListItem avatar key={x} onPress={this.setModalVisible(item)}>
                <Left>
                    <Button style={{ backgroundColor: "#007AFF" }}>
                        <Icon active name="build" />
                    </Button>
                </Left>
                <Body>
                <Text>{item.item.problemid}</Text>
                <Text note>{item.item.description}</Text>
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
