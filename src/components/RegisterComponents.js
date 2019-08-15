import React, { Component } from "react";
import { BackHandler, Animated, Easing,StyleSheet,Modal,ActivityIndicator,Image} from 'react-native'
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
import {dial} from "../utils/CallDialer";
import { connect } from 'react-redux'
import TermsOfService from "../components/Terms";
import CustomActivityIndicator from "../layout/CustomActivityIndicator";
import CustomInput from "../layout/CustomInput";
import CustomButton from "../layout/CustomButton";
import * as DeviceRatio from "../layout/DeviceRatio";


@connect(({ auth }) => ({ auth }))
class RegisterComponenets extends Component {
    constructor(props){
        super(props);
        this.state={
            modalVisible:false,
            fetching:false,
            activity:false,
            ic_number: '',
            phone_number: '',
            email:'',
            password:'',
        }
    }


    handleVerify = () => {

        const { dispatch,navigation } = this.props
        const { ic_number, phone_number,email,password } = this.state

        dispatch({
            type: 'auth/verify',
            payload: {
                ic_number: ic_number,
                phone_number:phone_number,
                email:email,
                password:password,
                callback: (result, error) => {
                    if (!result) {
                        alert(error);
                    }
                }
            },
        })
    }

    handleSubmit = () => {

        const { dispatch,navigation } = this.props
        const { ic_number, phone_number,email,password } = this.state

        dispatch({
            type: 'auth/verify',
            payload: {
                ic_number: ic_number,
                phone_number:phone_number,
                email:email,
                password:password,
                callback: (result, error) => {
                    if (result) {
                        navigation.navigate("Login")

                    }else{
                        alert(error)
                    }
                }
            },
        })
    }

    onLogin = () => {
        this.setState({ fetching: true,activity:true });
        setTimeout(() => {
            this.setState({ fetching: false,activity:false });
            this.props.navigation.navigate("Home")
        }, 500);
    };

    setModalVisible=(visible)=> {
        this.setState({modalVisible: visible});
    }


    render() {
        const { auth } = this.props
        const { j_password, j_username } = this.state

        return (
            <>
                {auth.loading?
                    (
                        <Modal
                            animationType="none"
                            transparent={false}
                            visible={auth.loading}
                        >
                            <CustomActivityIndicator
                                animating = {true}
                                text="Please wait..."
                                color="#D44638"
                            />
                        </Modal>

                    )

                    : (
                        <View style={{flex:1}}>
                            <Form>
                                <Item inlineLabel>

                                    <Input
                                        placeholder={'Enter IC Number'}
                                        autoCapitalize={'none'}
                                        value={j_username}
                                        onChangeText={text => this.setState({ ic_number: text })}
                                        // onSubmitEditing={() => this.password.ref.focus()}
                                        blurOnSubmit={false}
                                        returnKeyType={'next'}
                                    />
                                </Item>
                                <Item inlineLabel >

                                    <Input
                                           placeholder={'Phone Number'}
                                           autoCapitalize={'none'}
                                           value={j_password}
                                           onChangeText={text => this.setState({ phone_number: text })}
                                           onSubmitEditing={this.handleVerify}
                                           returnKeyType={'go'}

                                    />

                                </Item>

                                <Item inlineLabel >

                                    <Input
                                           placeholder={'Email Address'}
                                           autoCapitalize={'none'}
                                           value={j_password}
                                           onChangeText={text => this.setState({ email: text })}
                                           // onSubmitEditing={this.handleVerify}
                                           returnKeyType={'next'}

                                    />

                                </Item>

                                <Item inlineLabel last>

                                    <Input secureTextEntry
                                           placeholder={'Password'}
                                           autoCapitalize={'none'}
                                           value={j_password}
                                           onChangeText={text => this.setState({ password: text })}
                                           onSubmitEditing={this.handleSubmit}
                                           returnKeyType={'go'}

                                    />
                                </Item>

                                {/*<View style={{ marginHorizontal: DeviceRatio.computePixelRatio(32),justifyContent: 'center' }}>*/}
                                {/*<CustomInput*/}
                                {/*placeholder={'Enter Username'}*/}
                                {/*autoCapitalize={'none'}*/}
                                {/*value={j_username}*/}
                                {/*onChangeText={text => this.setState({ j_username: text })}*/}
                                {/*onSubmitEditing={() => this.password.ref.focus()}*/}
                                {/*blurOnSubmit={false}*/}
                                {/*returnKeyType={'next'}*/}
                                {/*labelStyle={{*/}
                                {/*display: 'none',*/}
                                {/*}}*/}
                                {/*inputStyle={{*/}
                                {/*borderColor: '#0984e3',*/}
                                {/*}}*/}
                                {/*/>*/}

                                {/*<CustomInput*/}
                                {/*ref={c => {*/}
                                {/*this.password = c*/}
                                {/*}}*/}
                                {/*placeholder={'Enter Password'}*/}
                                {/*autoCapitalize={'none'}*/}
                                {/*secureTextEntry*/}
                                {/*value={j_password}*/}
                                {/*onChangeText={text => this.setState({ j_password: text })}*/}
                                {/*onSubmitEditing={this.handleSubmit}*/}
                                {/*returnKeyType={'go'}*/}
                                {/*labelStyle={{*/}
                                {/*display: 'none',*/}
                                {/*}}*/}
                                {/*inputStyle={{*/}
                                {/*borderColor: '#0984e3',*/}
                                {/*}}*/}
                                {/*/>*/}

                                {/*<CustomButton*/}
                                {/*type={'primary'}*/}
                                {/*onPress={this.handleSubmit}*/}
                                {/*title={'Login'}*/}
                                {/*disabled={auth.loading}*/}
                                {/*/>*/}
                                {/*</View>*/}
                            </Form>
                            <Button block style={{ margin: 15, marginTop: 50 }}
                                    onPress={this.handleSubmit}
                            >
                                <Text>Submit</Text>
                            </Button>
                            <Button block info style={{ margin: 15, marginTop: 10 }}
                                    onPress={() => this.setState({ic_number: '',
                                        phone_number: '',
                                        email:'',
                                        password:'',})}
                            >
                                <Text>Clear</Text>
                            </Button>
                        </View>
                    )
                }
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "#fff"
    },
})

export default RegisterComponenets;
