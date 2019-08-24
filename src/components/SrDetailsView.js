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
import {dial} from "../utils/CallDialer";
import * as Config from "../config/Config";
import _ from "lodash";
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
                            </Left>
                            <Body></Body>
                            <Right>
                                    <Text onPress={this.props.onClose}>Close</Text>
                            </Right>
                        </CardItem>
                         <CardItem>
                            <Body>
                                <Text>Driver : {!_.isEmpty(item.driver)? item.driver.fullname : " "}</Text>
                                <Text>Track Reg No : {!_.isEmpty(item.truck)? item.truck.truckregno : ""}</Text>
                                <Text>Phone No : {!_.isEmpty(item.driver)? item.driver.phone1 : ""}</Text>
                                <Text>Distance :</Text>
                                <Text>ETA :</Text>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text note>Pick up Location :{item.pickup_location}</Text>
                                <Text note>Pick up Remarks : {item.pickupremarks}</Text>
                                <Text note>Destination : {item.destination}</Text>
                                <Text note>Destination Remarks : {item.destinationremarks}</Text>
                                <H3 style={{marginTop:5}}>Problem</H3>
                                <Text note>
                                    Problem : {item.problem}
                                </Text>
                                <Text note>
                                    Remarks : {item.remarks}
                                </Text>
                            </Body>
                        </CardItem>
                        <CardItem style={{ paddingVertical: 0 }} bordered>
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
                        <CardItem>
                            <Left>
                                <Button transparent vertical onPress={()=>dial(`${!_.isEmpty(item.driver)? item.driver.phone1 : ""}`,false)}>
                                    <Icon name="phone" />
                                    <Text>Call Driver</Text>
                                </Button>
                            </Left>
                            <Body>
                            <Button transparent vertical onPress={()=>dial(`${Config.CALL_BKB}`,false)}>
                                <Icon name="phone" />
                                <Text>Call to Cancel</Text>
                            </Button>
                            </Body>
                            <Right>
                                <Button transparent vertical >
                                    <Icon name="map" />
                                    <Text>Map</Text>
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
