import React, { Component } from "react";
import {Image,ImageBackground, StatusBar, StyleSheet} from "react-native";
import {Container,
    Header,
    Title,
    Content,
    Button,
    Left,
    Right,
    Body,
    Text,
    Thumbnail,
    Fab,
    IconNB,
    Icon,
    View,Card,CardItem,Tab, Tabs, TabHeading,ListItem,Switch
   } from "native-base";
import styles from "./styles";
import * as DeviceRatio from "../layout/DeviceRatio";
import CustomCard from "../layout/CustomCard";
import CustomDivider from "../layout/CustomDivider";
import SrList from "./SrList";
import Srlisting from "../components/SrListing";
const pratik = require("../assets/images/male.png");
const camera = require("../assets/camera.png");



class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state={
            active:false
        }
    }

    componentWillUnmount() {
        this.setState({active:false})
    }

    render() {
    const {navigation} = this.props;


        return (
          <Container>
                <Header hasTabs>
                    <Left>
                        <Button
                            transparent
                            onPress={() => navigation.openDrawer()}
                        >
                            <Icon name="ios-menu" />
                        </Button>
                    </Left>
                    <Body style={{alignContent:'center'}}>
                        <Title>Dashboard</Title>
                    </Body>
                    <Right/>
                </Header>
              <Tabs>
                  <Tab heading={ <TabHeading><Icon name="camera" /><Text>Vehicles</Text></TabHeading>}>
                     <Text>Tab1</Text>
                  </Tab>
                  <Tab heading={ <TabHeading><Text>SR</Text></TabHeading>}>
                      <Srlisting {...this.props}/>
                  </Tab>
                  <Tab heading={ <TabHeading><Text>Profile</Text></TabHeading>}>
                      <Content padder>
                          <View style={{paddingTop:10,paddingBottom:10}}>
                              <Thumbnail large  source={pratik} style={{backgroundColor:'#fff'}}/>
                              <Text>Crisnil F. Acuyado</Text>
                          </View>
                          <View>
                              <ListItem icon>
                                  <Left>
                                      <Button style={{ backgroundColor: "#FF9501" }}>
                                          <Icon active name="airplane" />
                                      </Button>
                                  </Left>
                                  <Body>
                                  <Text>Airplane Mode</Text>
                                  </Body>
                                  <Right>
                                      <Switch value={false} />
                                  </Right>
                              </ListItem>
                              <ListItem icon>
                                  <Left>
                                      <Button style={{ backgroundColor: "#007AFF" }}>
                                          <Icon active name="wifi" />
                                      </Button>
                                  </Left>
                                  <Body>
                                  <Text>Wi-Fi</Text>
                                  </Body>
                                  <Right>
                                      <Text>GeekyAnts</Text>
                                      <Icon active name="arrow-forward" />
                                  </Right>
                              </ListItem>
                              <ListItem icon>
                                  <Left>
                                      <Button style={{ backgroundColor: "#007AFF" }}>
                                          <Icon active name="bluetooth" />
                                      </Button>
                                  </Left>
                                  <Body>
                                  <Text>Bluetooth</Text>
                                  </Body>
                                  <Right>
                                      <Text>On</Text>
                                      <Icon active name="arrow-forward" />
                                  </Right>
                              </ListItem>
                          </View>
                      </Content>
                  </Tab>

              </Tabs>
              <View>
                  <Fab
                      active={this.state.active}
                      direction="up"
                      containerStyle={{}}
                      style={{ backgroundColor: "#5067FF" }}
                      position="bottomRight"
                      onPress={() => this.setState({ active: !this.state.active })}
                  >
                      <IconNB name="md-share" />
                      <Button style={{ backgroundColor: "#34A34F" }} onPress={()=>this.props.navigation.navigate("CreateSr")}>
                          <IconNB name="logo-whatsapp" />
                      </Button>
                      <Button style={{ backgroundColor: "#3B5998" }}>
                          <IconNB name="logo-facebook" />
                      </Button>
                      <Button disabled style={{ backgroundColor: "#DD5144" }}>
                          <IconNB name="ios-mail" />
                      </Button>
                  </Fab>
              </View>
          </Container>
        );
    }
}

export default Dashboard;
