import React, {Component} from "react";
import {Animated, BackHandler, Easing, Image, Modal, StyleSheet} from 'react-native'
import {
    Body,
    Button,
    CheckBox,
    Container,
    Content,
    Footer,
    FooterTab,
    Form,
    Header,
    Icon,
    Input,
    Item,
    Label,
    Left,
    ListItem,
    Right,
    Text,
    Title,
    View
} from "native-base";
import {dial} from "../utils/CallDialer";
import LoginForm from "../components/LoginForm";
import * as Config from '../config/Config'


const redlogo = require("../assets/bkblogo.png");
const resizeMode = 'center';

class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            modalVisible:false
        }
    }

    // componentWillMount() {
    //     BackHandler.addEventListener('hardwareBackPress', this.backHandle)
    // }
    //
    // componentWillUnmount() {
    //     BackHandler.removeEventListener('hardwareBackPress', this.backHandle)
    // }



    setModalVisible=(visible)=> {
        this.setState({modalVisible: visible});
    }


    render() {
        return (
            <Container style={styles.container}>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back" />
                            <Text>Login</Text>
                        </Button>
                    </Left>
                    <Body style={{alignContent:'center'}}>
                    <Title>Login</Title>
                    </Body>
                    <Right/>
                </Header>
                    <Content>
                        <LoginForm {...this.props} />
                    </Content>
                <Footer>
                    <FooterTab>
                        <Button >
                            <Icon name="person" />
                            <Text>Forgot Password</Text>
                        </Button>
                        <Button vertical onPress={()=>dial(Config.CALLBKB)}>
                            <Icon name="call" />
                            <Text>Call BKB</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
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

export default Login;
