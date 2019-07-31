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
import AddVehicle from "../components/addVehilce";
import AddUser from "../components/addUser";

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

class AddUserDriver extends Component {
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
                    <Title>Add Vehicles</Title>
                    </Body>
                    <Right />
                </Header>

                <Content padder>
                    <AddUser />
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

export default AddUserDriver;
