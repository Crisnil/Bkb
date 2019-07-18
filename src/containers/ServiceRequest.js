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
                    <Title>Create Service Request</Title>
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
                                headerStyle={{ backgroundColor: "#b95dd3" }}
                                headerBackButtonTextStyle={{ color: "#fff" }}
                                headerTitleStyle={{ color: "#fff" }}
                                selectedValue={this.state.selected}
                                onValueChange={this.onValueChange.bind(this)}
                            >
                                <Picker.Item label="Towing" value="key0" />
                                <Picker.Item label="Engine Failure" value="key1" />
                                <Picker.Item label="Flat Tire" value="key2" />
                                <Picker.Item label="Empty Gas" value="key3" />
                                <Picker.Item label="Overheating" value="key4" />
                            </Picker>
                        </Item>
                    </Form>
                    {/*<Button block style={{ margin: 15, marginTop: 50 }}>*/}
                        {/*<Text>Submit Request</Text>*/}
                    {/*</Button>*/}
                    {/*<Button block danger style={{ margin: 15, marginTop: 10 }}>*/}
                        {/*<Text>Clear</Text>*/}
                    {/*</Button>*/}
                </Content>

                <Footer>
                    <FooterTab>
                        <Button>
                            <Icon name="call" style={{color:'green'}}/>
                            <Text>Submit Request</Text>
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
