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
    Item, View,CheckBox,ListItem,DatePicker
} from "native-base";
import {dial} from "../utils/CallDialer";
import { connect } from 'react-redux'
import TermsOfService from "../components/Terms";
import CustomActivityIndicator from "../layout/CustomActivityIndicator";
import CustomInput from "../layout/CustomInput";
import CustomButton from "../layout/CustomButton";
import * as DeviceRatio from "../layout/DeviceRatio";
import {CustomAlert} from "../layout";
import moment from 'moment';
import { dateTimeDisplayFmt,dateDisplayFmt } from '../utils/constants';


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
            j_password:'',
            plateno:'',
            insuranceno:'',
            expirydate:new Date()
        }
    }

    setDate=(newDate)=> {
        this.setState({ expirydate: newDate });
    }

    handleVerify = () => {

        const { dispatch,navigation } = this.props
        const { ic_number, phone_number,email,j_password } = this.state

        dispatch({
            type: 'auth/verify',
            payload: {
                ic_number: ic_number,
                phone_number:phone_number,
                email:email,
                password:j_password,
                callback: (result, error) => {

                    if (!result) {
                        alert("Sorry,Cannot process your request at this moment");
                    }
                }
            },
        })
    }

    handleSubmit = () => {

        const { dispatch,navigation } = this.props
        const { ic_number, phone_number,email,j_password,plateno,expirydate,insuranceno } = this.state

        dispatch({
            type: 'auth/verify',
            payload: {
                ic_number: ic_number,
                phone_number:phone_number,
                email:email,
                password:j_password,
                plateno:plateno,
                insuranceno:insuranceno,
                expirydate:moment(expirydate).format(dateDisplayFmt).toString(),
                callback: (result, error) => {
                    if (result) {
                        CustomAlert.success("Successful");
                        navigation.navigate("Login");
                    }else{
                        alert(error);
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
        const { j_password, j_username,ic_number,phone_number,email,plateno,insuranceno } = this.state

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
                                <Item stackedLabel>
                                    <Label>Enter IC Number: Eg 00-111XXX </Label>
                                    <Input

                                        autoCapitalize={'characters'}
                                        value={ic_number}
                                        onChangeText={text => this.setState({ ic_number: text })}
                                        // onSubmitEditing={() => this.password.ref.focus()}
                                        blurOnSubmit={false}
                                        returnKeyType={'next'}
                                    />
                                </Item>
                                <Item stackedLabel >
                                    <Label>Phone</Label>
                                    <Input

                                           autoCapitalize={'none'}
                                           value={phone_number}
                                           onChangeText={text => this.setState({ phone_number: text })}
                                           //onSubmitEditing={this.handleVerify}
                                           returnKeyType={'next'}

                                    />

                                </Item>

                                <Item stackedLabel >
                                    <Label>Car Plate No</Label>
                                    <Input

                                        autoCapitalize={'characters'}
                                        value={plateno}
                                        onChangeText={text => this.setState({ plateno: text })}
                                        // onSubmitEditing={this.handleVerify}
                                        returnKeyType={'next'}

                                    />

                                </Item>

                                <Item stackedLabel >
                                    <Label>Insurance No</Label>
                                    <Input

                                        autoCapitalize={'characters'}
                                        value={insuranceno}
                                        onChangeText={text => this.setState({ insuranceno: text })}
                                        // onSubmitEditing={this.handleVerify}
                                        returnKeyType={'next'}

                                    />

                                </Item>

                                <Item stackedLabel>
                                    <Label>Expiry</Label>
                                    <DatePicker
                                        defaultDate={new Date()}
                                        minimumDate={new Date(2019, 1, 1)}
                                        maximumDate={new Date(2030, 12, 31)}
                                        locale={"en"}
                                        timeZoneOffsetInMinutes={undefined}
                                        modalTransparent={false}
                                        animationType={"fade"}
                                        androidMode={"default"}
                                        textStyle={{ color: "green" }}
                                        placeHolderTextStyle={{ color: "#d3d3d3" }}
                                        onDateChange={this.setDate}
                                        disabled={false}
                                    />

                                </Item>

                                <Item stackedLabel >
                                    <Label>Email</Label>
                                    <Input

                                           autoCapitalize={'none'}
                                           value={email}
                                           onChangeText={text => this.setState({ email: text })}
                                           // onSubmitEditing={this.handleVerify}
                                           returnKeyType={'next'}

                                    />

                                </Item>

                                <Item stackedLabel last>
                                    <Label>Password</Label>
                                    <Input secureTextEntry
                                           autoCapitalize={'none'}
                                           value={j_password}
                                           onChangeText={text => this.setState({ j_password: text })}
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
                                    onPress={() => this.setState({
                                        ic_number: '',
                                        phone_number: '',
                                        email:'',
                                        j_password:'',
                                        plateno:'',
                                        insuranceno:'',
                                        expirydate:new Date()
                                    })}
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
