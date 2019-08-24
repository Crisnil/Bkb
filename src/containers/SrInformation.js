import React, { Component } from "react";
import { Image, Dimensions } from "react-native";
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
import styles from "./styles";

const deviceWidth = Dimensions.get("window").width;
const logo = require("../assets/logo.png");

const rate = [
    { text: "Excellent", icon: "american-football", iconColor: "#2c8ef4" },
    { text: "Very Good", icon: "analytics", iconColor: "#f42ced" },
    { text: "Good", icon: "aperture", iconColor: "#ea943b" },
    { text: "Fair", icon: "trash", iconColor: "#fa213b" },
    { text: "Poor", icon: "close", iconColor: "#25de5b" }
]

const DESTRUCTIVE_INDEX = 3;
const CANCEL_INDEX = 4;

class SrInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false
        };
    }
    render() {
        console.log("props",this.props);
        return (
            <Container style={styles.container}>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                    <Title>SR Information</Title>
                    </Body>
                    <Right />
                </Header>

                <Content padder>
                    <Card style={styles.mb}>
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
                            {/*<Image*/}
                                {/*style={{*/}
                                    {/*alignSelf: "center",*/}
                                    {/*height: 150,*/}
                                    {/*resizeMode: "cover",*/}
                                    {/*width: deviceWidth / 1.18,*/}
                                    {/*marginVertical: 5*/}
                                {/*}}*/}
                                {/*source={cardImage}*/}
                            {/*/>*/}
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
                {/*<Fab*/}
                    {/*active={this.state.active}*/}
                    {/*direction="up"*/}
                    {/*containerStyle={{}}*/}
                    {/*style={{ backgroundColor: "#5067FF" }}*/}
                    {/*position="bottomRight"*/}
                    {/*onPress={() => this.setState({ active: !this.state.active })}*/}
                {/*>*/}
                    {/*<IconNB name="md-share" />*/}
                    {/*<Button style={{ backgroundColor: "#34A34F" }}>*/}
                        {/*<IconNB name="logo-whatsapp" />*/}
                    {/*</Button>*/}
                    {/*<Button style={{ backgroundColor: "#3B5998" }}>*/}
                        {/*<IconNB name="logo-facebook" />*/}
                    {/*</Button>*/}
                    {/*<Button disabled style={{ backgroundColor: "#DD5144" }}>*/}
                        {/*<IconNB name="ios-mail" />*/}
                    {/*</Button>*/}
                {/*</Fab>*/}
                <Footer>
                    <FooterTab>
                        <Button >
                            <Icon name="call" />
                            <Text>Call Bkb</Text>
                        </Button>
                        <Button vertical>
                            <Icon name="map" />
                            <Text>Map</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

export default SrInformation;
