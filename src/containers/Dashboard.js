import React, {Component} from "react";
import {Image, ImageBackground, StatusBar, StyleSheet} from "react-native";
import {
    Body,
    Button,
    Card,
    CardItem,
    Container,
    Content,
    Fab,
    Header,
    Icon,
    IconNB,
    Left,
    ListItem,
    Right,
    Switch,
    Tab,
    TabHeading,
    Tabs,
    Text,
    Thumbnail,
    Title,
    View
} from "native-base";
import Srlisting from "../components/SrListing";
import {dial} from "../utils/CallDialer";
import { connect } from 'react-redux'

const pratik = require("../assets/images/male.png");
const camera = require("../assets/camera.png");



@connect(({ service }) => ({ service }))
class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state={
            active:false
        }
    }

    componentDidMount () {
        this.fetchProblemCategory();
        this.fetchSrHistory();
    }

    componentWillUnmount() {
        this.setState({active:false})
    }

    fetchProblemCategory =()=>{
        const {dispatch} = this.props;
        dispatch({
            type:'service/requestCategory',
            payload:{}
        })
    }

    fetchSrHistory =()=>{
        const {dispatch} = this.props;
        dispatch({
            type:'service/serviceRequest',
            payload:{}
        })
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
                            <Icon name="menu" />
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
                      style={{ backgroundColor: "#D44638" }}
                      position="bottomRight"
                      onPress={() => this.setState({ active: !this.state.active })}
                  >
                      <IconNB name="add" />
                      <Button style={{ backgroundColor: "#34A34F" }} onPress={()=>dial('09209502976',false)}>
                         <IconNB name="call" />
                      </Button>
                      <Button style={{ backgroundColor: "#3B5998" }} onPress={()=>navigation.navigate("CreateSr")}>
                          <IconNB name="build" />
                      </Button>
                  </Fab>
              </View>
          </Container>
        );
    }
}

export default Dashboard;
