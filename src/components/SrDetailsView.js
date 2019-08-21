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
const cardImage = require("../assets/icons/ic_launcher.png");

const rate = [
    { text: "Excellent", icon: "star", iconColor: "#2c8ef4" },
    { text: "Very Good", icon: "star", iconColor: "#f42ced" },
    { text: "Good", icon: "star", iconColor: "#ea943b" },
    { text: "Fair", icon: "star", iconColor: "#fa213b" },
    { text: "Poor", icon: "star", iconColor: "#25de5b" }
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
        console.log("details",this.props)
        const {item} = this.props.itemDetails
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.props.modalVisible}
                onRequestClose={ this.props.onClose}>
                <Container>
                    <Header>
                        <Left/>
                        <Body>
                            <Title>Service Request Details</Title>
                        </Body>
                        {/*<Right>*/}
                            {/*<MaterialCommunityIcons name="account-outline" style={{marginRight:10,color:'#fff',fontSize:27}}*/}
                                                    {/*onPress={this.props.onClose}*/}
                            {/*/>*/}
                        {/*</Right>*/}
                    </Header>
                <Content padder>
                    <Card>
                        <CardItem bordered>
                            <Left>
                                <Thumbnail source={cardImage} />
                                <Text>
                                    Driver : {item.driver}
                                </Text>
                                <Body></Body>
                            </Left>
                            <Right>
                                    <Text onPress={this.props.onClose}>Close</Text>
                            </Right>
                        </CardItem>
                        <CardItem>
                            <Body>
                            <Text note>Pick up Location : Center City</Text>
                            <Text note>Remarks : Pending</Text>
                            <Text note>Distination : Home</Text>
                            <Text note>Remarks : Pending</Text>
                            <H3 style={{marginTop:5}}>Problem</H3>
                            <Text note>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            </Text>
                            </Body>
                        </CardItem>
                        <CardItem style={{ paddingVertical: 0 }}>
                            <Left>
                                <Button transparent>
                                    {/*<Icon name="logo-github" />*/}
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
