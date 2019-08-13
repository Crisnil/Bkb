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
class LoginForm extends Component {
    constructor(props){
        super(props);
        this.state={
            modalVisible:false,
            fetching:false,
            activity:false,
            j_username: '',
            j_password: '',
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

        dispatch({
            type: 'auth/login',
            payload: {
                username: j_username,
                password:j_password,
                callback: (result, error) => {
                    if (result) {
                        navigation.navigate("Home")

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
                                    text="Loggin in..."
                                    color="#D44638"
                                />
                            </Modal>

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
                                <ListItem style={{marginTop:10}}>
                                    <CheckBox />
                                    <Body>
                                    <Text>I agree to the
                                        <Text
                                            onPress={() =>{this.setModalVisible(!this.state.modalVisible)}}>
                                            Terms of Service
                                        </Text>
                                    </Text>
                                    </Body>
                                </ListItem>

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
