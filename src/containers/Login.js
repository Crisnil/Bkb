import React, { Component } from "react";
import { BackHandler, Animated, Easing,StyleSheet,Modal} from 'react-native'
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
import TermsOfService from "../components/Terms";


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
                    <View>
                        <Form>
                            <Item floatingLabel>
                                <Label>Username</Label>
                                <Input />
                            </Item>
                            <Item floatingLabel last>
                                <Label>Password</Label>
                                <Input secureTextEntry />
                            </Item>
                            <ListItem style={{marginTop:10}}>
                                <CheckBox />
                                    <Body>
                                        <Text>I agree to the
                                                 <Text
                                                onPress={() =>{this.setModalVisible(true)}}>
                                                    Terms of Service
                                                </Text>
                                        </Text>
                                    </Body>
                            </ListItem>
                        </Form>
                        <Button block style={{ margin: 15, marginTop: 50 }}
                                onPress={() => this.props.navigation.navigate("Dashboard")}
                        >
                            <Text>Sign In</Text>
                        </Button>
                        <Button block info style={{ margin: 15, marginTop: 10 }}
                                onPress={() => this.props.navigation.navigate("Register")}
                        >
                            <Text>Register</Text>
                        </Button>
                    </View>
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
                </Content>

                <Footer>
                    <FooterTab>
                        <Button >
                            <Icon name="person" />
                            <Text>Forgot Password</Text>
                        </Button>
                        <Button vertical onPress={()=>dial('09209502976')}>
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
