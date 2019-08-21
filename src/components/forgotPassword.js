import React, {useEffect, useState} from 'react';
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


export default function ForgotPassword(props){

    const[email,setEmail]= useState("");
    const[icNum,setIcNum]=useState("");
    const [status,setStatus] = useState(false);

    const handleSubmit =()=> {
        const { dispatch,navigation } = props
        props.onClose(false)
        CustomAlert.alert("Forgot Password","To Do")
            // dispatch({
            //     type: 'auth/forgotPassword',
            //     payload: {
            //         icnumber: icNum,
            //         email:email,
            //         callback: (result, error) => {
            //             //console.log("res login",result,error);
            //             if (result) {
            //                 CustomAlert.success("Mail Sent");
            //             }else{
            //                 if(error != null){
            //                     CustomAlert.fail(error)
            //                 }else{
            //                     CustomAlert.fail("Registration Failed")
            //                 }
            //
            //             }
            //         }
            //     },
            // })
    }


    return (
        <>
            {status ?
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
                                        autoCapitalize={'none'}
                                        value={icNum}
                                        onChangeText={text => setIcNum(icNum, text)}
                                        onSubmitEditing={() => this.email.ref.focus()}
                                        blurOnSubmit={false}
                                        returnKeyType={'next'}
                                    />
                                </Item>
                                <Item floatingLabel last>

                                    <Input
                                        ref={c => {
                                            this.email = c
                                        }}
                                        placeholder={'Enter Email'}
                                        autoCapitalize={'none'}
                                        secureTextEntry
                                        value={email}
                                        onChangeText={text => setEmail(email, text)}
                                        onSubmitEditing={handleSubmit}
                                        returnKeyType={'go'}

                                    />
                                </Item>

                            </Form>
                            <Button block style={{margin: 15, marginTop: 50}} onPress={handleSubmit}>
                                <Text>Submit</Text>
                            </Button>
                        </View>
                    </Container>
                )
            }
            </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "#fff"
    },
})
