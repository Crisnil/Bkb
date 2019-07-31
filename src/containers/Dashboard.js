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
    View,Card,CardItem,Segment
   } from "native-base";
import styles from "./styles";
import * as DeviceRatio from "../layout/DeviceRatio";
import CustomCard from "../layout/CustomCard";
import CustomDivider from "../layout/CustomDivider";
const pratik = require("../assets/images/male.png");
const camera = require("../assets/camera.png");



class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state={
            active:false
        }
    }


    render() {
    const {navigation} = this.props;


        return (
          <Container>
                <Header hasSegment>
                    <Left>
                        <Button
                            transparent
                            onPress={() => navigation.openDrawer()}
                        >
                            <Icon name="ios-menu" />
                        </Button>
                    </Left>
                    <Body style={{alignItems:'center'}}>
                         <Title>Dashboard</Title>
                    </Body>
                    <Right>
                        <Button
                            transparent
                            onPress={() => navigation.openDrawer()}
                        >
                            <Icon name="settings" />
                        </Button>
                    </Right>
                </Header>
              <View style={{paddingTop:10,paddingBottom:10,alignItems:'center',backgroundColor:'#D44638'}}>
                  <Thumbnail large  source={pratik} style={{backgroundColor:'#fff'}}/>
                  <Text style={{color:'#fff'}}>Crisnil F. Acuyado</Text>
              </View>
              <View>
                  <Segment>
                      <Button first>
                          <Text>Dashboard</Text>
                      </Button>
                      <Button>
                          <Text>Vehicles</Text>
                      </Button>
                      <Button last active>
                          <Text>Users</Text>
                      </Button>
                  </Segment>
              </View>
                <Content padder>

                    <Card>
                        <CardItem>
                            <Left>
                                <Thumbnail source={camera} />
                                <Body>
                                <Text>NativeBase</Text>
                                <Text note>GeekyAnts</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem cardBody>
                            <Icon active name="logo-googleplus" />
                            <Text>Google Plus</Text>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Button transparent>
                                    <Icon active name="thumbs-up" />
                                    <Text>12 Likes</Text>
                                </Button>
                            </Left>
                            <Body>
                            <Button transparent>
                                <Icon active name="chatbubbles" />
                                <Text>4 Comments</Text>
                            </Button>
                            </Body>
                            <Right>
                                <Text>11h ago</Text>
                            </Right>
                        </CardItem>
                    </Card>
                    {/*<CustomCard label={'My Vehicles'}>*/}
                        {/*<Text*/}
                            {/*style={{*/}
                                {/*fontWeight: 'bold',*/}
                                {/*color: '#2c3e50',*/}
                            {/*}}*/}
                        {/*>*/}
                            {/*My Vehicles*/}
                        {/*</Text>*/}
                    {/*</CustomCard>*/}
                    {/*<CustomCard label={'Users'}>*/}
                        {/*<Text*/}
                            {/*style={{*/}
                                {/*fontWeight: 'bold',*/}
                                {/*color: '#2c3e50',*/}
                            {/*}}*/}
                        {/*>*/}
                            {/*List of Users*/}
                        {/*</Text>*/}
                        {/*<Button>*/}
                            {/*<Text>Add User</Text>*/}
                        {/*</Button>*/}
                    {/*</CustomCard>*/}
                </Content>
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
              </View>
          </Container>
        );
    }
}

export default Dashboard;
