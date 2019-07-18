import React, { Component } from "react";
import { BackHandler, Animated, Easing,StyleSheet } from 'react-native'
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
    Item, View
} from "native-base";
class Login extends Component {

    // componentWillMount() {
    //     BackHandler.addEventListener('hardwareBackPress', this.backHandle)
    // }
    //
    // componentWillUnmount() {
    //     BackHandler.removeEventListener('hardwareBackPress', this.backHandle)
    // }

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
                        </Form>
                        <Button block style={{ margin: 15, marginTop: 50 }}
                                onPress={() => this.props.navigation.navigate("TermsAndPrivacy")}
                        >
                            <Text>Sign In</Text>
                        </Button>
                        <Button block info style={{ margin: 15, marginTop: 10 }}
                                onPress={() => this.props.navigation.navigate("Register")}
                        >
                            <Text>Register</Text>
                        </Button>
                    </View>
                </Content>

                <Footer>
                    <FooterTab>
                        <Button >
                            <Icon name="person" />
                            <Text>Forgot Password</Text>
                        </Button>
                        <Button vertical>
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
