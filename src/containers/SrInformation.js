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
    Body, Fab, IconNB
} from "native-base";
import styles from "./styles";

const deviceWidth = Dimensions.get("window").width;
const logo = require("../assets/logo.png");
const cardImage = require("../assets/drawer-cover.png");

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
                    <Title>Card Showcase</Title>
                    </Body>
                    <Right />
                </Header>

                <Content padder>
                    <Card style={styles.mb}>
                        <CardItem bordered>
                            <Left>
                                <Thumbnail source={logo} />
                                <Body>
                                <Text>NativeBase</Text>
                                <Text note>April 15, 2016</Text>
                                </Body>
                            </Left>
                        </CardItem>

                        <CardItem>
                            <Body>
                            <Image
                                style={{
                                    alignSelf: "center",
                                    height: 150,
                                    resizeMode: "cover",
                                    width: deviceWidth / 1.18,
                                    marginVertical: 5
                                }}
                                source={cardImage}
                            />
                            <Text>
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
                        </CardItem>
                    </Card>
                </Content>
                <Fab
                    active={this.state.active}
                    direction="up"
                    containerStyle={{}}
                    style={{ backgroundColor: "#5067FF" }}
                    position="bottomRight"
                    onPress={() => this.setState({ active: !this.state.active })}
                >
                    <IconNB name="md-share" />
                    <Button style={{ backgroundColor: "#34A34F" }}>
                        <IconNB name="logo-whatsapp" />
                    </Button>
                    <Button style={{ backgroundColor: "#3B5998" }}>
                        <IconNB name="logo-facebook" />
                    </Button>
                    <Button disabled style={{ backgroundColor: "#DD5144" }}>
                        <IconNB name="ios-mail" />
                    </Button>
                </Fab>
            </Container>
        );
    }
}

export default SrInformation;
