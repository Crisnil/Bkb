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
    Item, Separator, H3
} from "native-base";
import RegisterComponenets from "../components/RegisterComponents";
class Registration extends Component {

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

                        </Button>
                    </Left>
                    <Body>
                        <Title>Register</Title>
                    </Body>
                    <Right/>
                </Header>

                <Content padder>
                    <Form>
                        <RegisterComponenets {...this.props}/>
                    </Form>

                </Content>

                {/*<Footer>*/}

                {/*</Footer>*/}
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

export default Registration;
