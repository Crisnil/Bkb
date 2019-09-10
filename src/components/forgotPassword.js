import React, { Component } from "react";
import {
    Container,
    Header,
    Title,
    Content,
    Text,
    Button,
    Icon,
    Footer,
    FooterTab,
    Left,
    Right,
    Body,
    Form,
    Label,
    Input,
    Item, View,CheckBox,ListItem
} from "native-base";

import { StyleSheet} from 'react-native'
import CustomActivityIndicator from "../layout/CustomActivityIndicator";
import { connect } from 'react-redux'
import {CustomAlert} from "../layout";


@connect(({ auth }) => ({ auth }))
export default class ForgotPassword extends Component{
    constructor(props) {
        super(props);
        this.state={
            email:'',
            icnumber:'',

        }
    }


    handleSubmit =()=> {
        const { dispatch,navigation } = this.props

            dispatch({
                type: 'auth/forgotPassword',
                payload: {
                    icnumber: this.state.icnumber,
                    email:this.state.email,
                    callback: (result, error) => {
                        //console.log("res login",result,error);
                        if (result) {
                            CustomAlert.success("Mail Sent. Please check you email");
                        }else{
                            if(error != null){
                                CustomAlert.fail(error)
                            }else{
                                CustomAlert.fail("Sorry, we cannot process your request tight now.")
                            }

                        }
                    }
                },
            });
        this.props.onClose(false)
    }

    render(){
        const{icnumber,email} = this.state;
        const{loading}=this.props.auth
        return (
            <>
                {loading ?
                    (
                        <CustomActivityIndicator
                            animating={true}
                            text="Loggin in..."
                            color="#D44638"
                        />
                    ) :
                    (
                        <Container style={styles.container}>
                            <Header style={{textAlign: 'center'}}>
                                <Left/>
                                <Body>
                                <Title>Forgot Password</Title>
                                </Body>
                            </Header>
                            <View style={{flex: 1}}>
                                <Form>
                                    <Item floatingLabel>

                                        <Input
                                            placeholder={'IC Number'}
                                            autoCapitalize={'characters'}
                                            value={icnumber}
                                            onChangeText={text => this.setState({icnumber: text })}
                                            onSubmitEditing={() => this.email_input.ref.focus()}
                                            blurOnSubmit={false}
                                            returnKeyType={'next'}
                                        />
                                    </Item>
                                    <Item floatingLabel last>

                                        <Input
                                            ref={c => {
                                                this.email_input = c
                                            }}
                                            placeholder={'Enter Email'}
                                            autoCapitalize={'none'}
                                            value={email}
                                            onChangeText={text => this.setState({ email: text })}
                                            onSubmitEditing={this.handleSubmit}
                                            returnKeyType={'go'}
                                        />
                                    </Item>

                                </Form>
                                <Button block style={{margin: 15, marginTop: 50}} onPress={this.handleSubmit}>
                                    <Text>Submit</Text>
                                </Button>
                            </View>
                        </Container>
                    )
                }
            </>
        );
    };
    }


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "#fff"
    },
})
