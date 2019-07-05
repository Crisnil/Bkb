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
    Item, Textarea, Picker
} from "native-base";
class ServiceRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected1: "key1"
        };
    }
    onValueChange(value: string) {
        this.setState({
            selected1: value
        });
    }
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
                    <Title>Login</Title>
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
                        <Item stackedLabel>
                            <Label>Pick up Location</Label>
                            <Input />
                        </Item>
                        <Item stackedLabel last>
                            <Label>Pick up Remarks</Label>
                            <Textarea style={{width:'100%'}}rowSpan={5} bordered placeholder="Textarea" />
                        </Item>
                        <Item stackedLabel>
                            <Label>Destination Location</Label>
                            <Input />
                        </Item>
                        <Item stackedLabel>
                            <Label>Destination Remarks</Label>
                            <Input />
                        </Item>
                        <Item picker>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined,padding:10,marginTop:5 }}
                                placeholder="Select your SIM"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.selected1}
                                onValueChange={this.onValueChange.bind(this)}
                            >
                                <Picker.Item label="Wallet" value="key0" />
                                <Picker.Item label="ATM Card" value="key1" />
                                <Picker.Item label="Debit Card" value="key2" />
                                <Picker.Item label="Credit Card" value="key3" />
                                <Picker.Item label="Net Banking" value="key4" />
                            </Picker>
                        </Item>
                    </Form>
                    <Button block style={{ margin: 15, marginTop: 50 }}>
                        <Text>Submit Request</Text>
                    </Button>
                    <Button block danger style={{ margin: 15, marginTop: 10 }}>
                        <Text>Clear</Text>
                    </Button>
                </Content>

                <Footer>
                    <FooterTab>
                        <Button>
                            <Icon name="call" style={{color:'green'}}/>
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

export default ServiceRequest;
