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
                    <Right>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.openDrawer()}
                        >
                            <Icon name="ios-menu" />
                        </Button>
                    </Right>
                </Header>

                <Content padder>
                    <Form>
                        <H3 style={{textAlign:'center'}}>Registration Form </H3>
                        <Item regular>
                            <Label>Login Name</Label>
                            <Input />
                        </Item>
                        <Item regular >
                            <Label>Password</Label>
                            <Input secureTextEntry />
                        </Item>
                        <Item regular >
                            <Label>Confirm Password</Label>
                            <Input secureTextEntry />
                        </Item>
                        <Item regular >
                            <Label>Phone number</Label>
                            <Input  />
                        </Item>
                        <Item regular >
                            <Label>Email</Label>
                            <Input  />
                        </Item>
                        <Item regular >
                            <Label>IC Number</Label>
                            <Input  />
                        </Item>
                        <Item regular >
                            <Label>Insurance</Label>
                            <Input  />
                        </Item>
                        <Item regular last>
                            <Label>Vehicle Reg. No.</Label>
                            <Input  />
                        </Item>
                    </Form>

                </Content>

                <Footer>
                    <FooterTab>
                        <Button >
                            <Icon type="MaterialIcons" name="check" />
                            <Text>Submit</Text>
                        </Button>
                        <Button vertical>
                            <Icon name="close" />
                            <Text>Reset</Text>
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

export default Registration;
