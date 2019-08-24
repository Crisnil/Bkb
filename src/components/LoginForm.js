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
import {CustomAlert} from "../layout";
import ForgotPassword from "./forgotPassword";
import * as Config from "../config/Config";


@connect(({ auth }) => ({ auth }))
class LoginForm extends Component {
    constructor(props){
        super(props);
        this.state={
            modalVisible:false,
            fetching:false,
            activity:false,
            j_username: '',
            j_password: '',
            checked:true,
            forgotPassword:false
        }
    }

    // componentWillMount() {
    //     BackHandler.addEventListener('hardwareBackPress', this.backHandle)
    // }
    //
    // componentWillUnmount() {
    //     BackHandler.removeEventListener('hardwareBackPress', this.backHandle)
    // }

    handleSubmit = () => {

        const { dispatch,navigation } = this.props
        const { j_password, j_username } = this.state
        this.state.checked ?
        dispatch({
            type: 'auth/login',
            payload: {
                username: j_username,
                password:j_password,
                callback: (result, error) => {
                    //console.log("res login",result,error);
                    if (result) {
                        // CustomAlert.success("Welcome");
                        navigation.navigate("Home")

                    }else{
                        if(error != null){
                            CustomAlert.fail(error)
                        }else{
                            CustomAlert.fail("Registration Failed")
                        }

                    }
                }
            },
        }):
            CustomAlert.alert("Notification","Please accept terms and condition",)
    }

    onPressCheck =()=>{
        console.log("press");
        this.setState({checked:!this.state.checked})
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

    setForgotForm =(visible)=> {
        this.setState({forgotPassword: visible})
    }

    render() {
        const { auth } = this.props
        const { j_password, j_username } = this.state

        return (
                <>
                    {auth.loading?
                        (
                                <CustomActivityIndicator
                                    animating = {true}
                                    text="Loggin in..."
                                    color="#D44638"
                                />
                         )

                     : (
                        <View style={{flex:1}}>
                            <Form>
                                <Item floatingLabel>

                                    <Input
                                        placeholder={'Enter Username'}
                                        autoCapitalize={'none'}
                                        value={j_username}
                                        onChangeText={text => this.setState({ j_username: text })}
                                        onSubmitEditing={() => this.password.ref.focus()}
                                        blurOnSubmit={false}
                                        returnKeyType={'next'}
                                    />
                                </Item>
                                <Item floatingLabel last>

                                    <Input secureTextEntry
                                           placeholder={'Enter Password'}
                                           autoCapitalize={'none'}
                                           secureTextEntry
                                           value={j_password}
                                           onChangeText={text => this.setState({ j_password: text })}
                                           onSubmitEditing={this.handleSubmit}
                                           returnKeyType={'go'}

                                    />
                                </Item>
                                {/*<ListItem style={{marginTop:10}}>*/}
                                    {/*<CheckBox checked={this.state.checked} onPress={this.onPressCheck} />*/}
                                    {/*<Body>*/}
                                        {/*<Button transparent>*/}
                                            {/*<Text*/}

                                                {/*onPress={() =>{this.setModalVisible(!this.state.modalVisible)}}>*/}
                                                {/*I agree to the Terms of Service*/}
                                            {/*</Text>*/}
                                        {/*</Button>*/}
                                    {/*</Body>*/}
                                {/*</ListItem>*/}

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
                                <Text>Sign In</Text>
                            </Button>
                            <Button block info style={{ margin: 15, marginTop: 10 }}
                                    onPress={() => this.props.navigation.navigate("Register")}
                            >
                                <Text>Register</Text>
                            </Button>
                            <View style={{flexDirection:'row',justifyContent: 'space-between',}}>
                                <Button transparent info style={{ margin: 15, marginTop: 10 }}
                                        onPress={()=>this.setForgotForm(true)}
                                >
                                    <Text>Forgot Password</Text>
                                </Button>
                                <Button transparent info style={{ margin: 15, marginTop: 10 }}
                                        onPress={()=>dial(`${Config.CALL_BKB}`,false)}
                                >
                                    <Text>Call Bkb</Text>
                                </Button>
                            </View>
                        </View>

                        )
                    }
                    <View>
                        <Modal
                            animationType="slide"
                            transparent={false}
                            visible={this.state.modalVisible}
                            onRequestClose={() => {
                                this.setModalVisible(false)
                            }}>
                            <TermsOfService/>
                        </Modal>

                        <Modal
                            animationType="slide"
                            transparent={false}
                            visible={this.state.forgotPassword}
                            onRequestClose={() => {
                                this.setForgotForm(false)
                            }}>
                            <ForgotPassword
                                onClose = {this.setForgotForm}
                            />
                        </Modal>
                    </View>
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

export default LoginForm;
