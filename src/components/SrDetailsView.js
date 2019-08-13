import React, { Component } from "react";
import { Image, Dimensions,Modal } from "react-native";
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Icon,
    Card,
    CardItem,
    Text,
    Thumbnail,
    Left,
    Right,
    Body, Fab, IconNB, H3, Footer, FooterTab,ActionSheet
} from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const deviceWidth = Dimensions.get("window").width;
const logo = require("../assets/logo.png");
const cardImage = require("../assets/drawer-cover.png");

const rate = [
    { text: "Excellent", icon: "american-football", iconColor: "#2c8ef4" },
    { text: "Very Good", icon: "analytics", iconColor: "#f42ced" },
    { text: "Good", icon: "aperture", iconColor: "#ea943b" },
    { text: "Fair", icon: "trash", iconColor: "#fa213b" },
    { text: "Poor", icon: "close", iconColor: "#25de5b" }
]

const DESTRUCTIVE_INDEX = 3;
const CANCEL_INDEX = 4;

class SrDetailsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,

        };
    }
    render() {
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.props.modalVisible}
                onRequestClose={ this.props.onClose}>
                <Container>
                    <Header>
                        <Right>
                            <MaterialCommunityIcons name="account-outline" style={{marginRight:10,color:'#fff',fontSize:27}}
                                                    onPress={this.props.onClose}
                            />
                        </Right>
                    </Header>
                <Content padder>
                    <Card>
                        <CardItem bordered>
                            <Left>
                                <Thumbnail source={logo} />
                                <Body>
                                <Text>Driver Name : Mad Max</Text>
                                <Text note>Truck Reg. # : 123456789</Text>
                                <Text note>Phone no. +47474758</Text>
                                <Text note>Distance : 3 Km</Text>
                                <Text note>ETA : 1 Hr</Text>
                                </Body>
                            </Left>
                        </CardItem>

                        <CardItem>
                            <Body>
                            <Text note>Pick up Location : Center City</Text>
                            <Text note>Remarks : Pending</Text>
                            <Text note>Distination : Home</Text>
                            <Text note>Remarks : Pending</Text>
                            <H3 style={{marginTop:5}}>Problem</H3>
                            <Text note>
                                NativeBase is a free and source framework that enable
                                developers to build high-quality mobile apps using React
                                Native iOS and Android apps with a fusion of ES6. NativeBase
                                builds a layer on top of React Native that provides you with
                                basic set of components for mobile application development.
                            </Text>
                            </Body>
                        </CardItem>
                        <CardItem style={{ paddingVertical: 0 }}>
                            <Left>
                                <Button transparent>
                                    <Icon name="logo-github" />
                                    <Text>4,923 stars</Text>
                                </Button>
                            </Left>
                            <Right>
                                <Button
                                    onPress={() =>
                                        ActionSheet.show(
                                            {
                                                options: rate,
                                                cancelButtonIndex: CANCEL_INDEX,
                                                destructiveButtonIndex: DESTRUCTIVE_INDEX,
                                                title: "Rate Service"
                                            },
                                            buttonIndex => {
                                                this.setState({ clicked: rate[buttonIndex] });
                                            }
                                        )}
                                >
                                    <Text>Rate</Text>
                                </Button>
                            </Right>
                        </CardItem>
                    </Card>
                </Content>
                </Container>
            </Modal>
        );
    }
}

export default SrDetailsView;
