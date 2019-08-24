import React, {Component} from "react";
import {Image, ImageBackground, StatusBar, StyleSheet,BackHandler} from "react-native";
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
import {CustomAlert, CustomNavigationService} from "../layout";
import _ from 'lodash';
import * as Config from "../config/Config";
const pratik = require("../assets/images/male.png");



@connect(({ auth,service }) => ({auth,service }))
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

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.backHandle)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backHandle)
    }forceUpdate(callBack: () => void): void {
    }

    backHandle = () => {
        console.log(this.props);
        CustomNavigationService.back()()
        return true
    }

    fetchProblemCategory =()=>{
        const {dispatch} = this.props;
        dispatch({
            type:'service/requestCategory',
            payload:{
                callback:(result,error)=>{
                    if(result == false){
                        CustomAlert.alert(error);
                    }
                }
            },

        })
    }

    fetchSrHistory =()=>{
        const {dispatch} = this.props;
        dispatch({
            type:'service/serviceRequestList',
            payload:{
                callback:(result,error)=>{
                    if(result == false){
                        CustomAlert.alert(error);
                    }
                }
            },

        })
    }
    render() {
    // console.log("dashboardpage",this.props);
        const{auth} =this.props;
        const{account}= auth;
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
                  <Tab heading={ <TabHeading><Text>SR</Text></TabHeading>}>
                      <Srlisting {...this.props}/>
                  </Tab>
                  <Tab heading={ <TabHeading><Text>Profile</Text></TabHeading>}>
                      <Content padder>
                          <View style={{paddingTop:10,paddingBottom:10}}>
                              <Thumbnail large  source={pratik} style={{backgroundColor:'#fff'}}/>
                              <Text>{!_.isEmpty(account)? account.data.customername : ""}</Text>
                          </View>
                          {/*<View>*/}
                              {/*<ListItem icon>*/}
                                  {/*<Left>*/}
                                      {/*<Button style={{ backgroundColor: "#FF9501" }}>*/}
                                      {/*</Button>*/}
                                  {/*</Left>*/}
                                  {/*<Body>*/}
                                  {/*<Text>Airplane Mode</Text>*/}
                                  {/*</Body>*/}
                                  {/*<Right>*/}
                                      {/*<Switch value={false} />*/}
                                  {/*</Right>*/}
                              {/*</ListItem>*/}
                              {/*<ListItem icon>*/}
                                  {/*<Left>*/}
                                      {/*<Button style={{ backgroundColor: "#007AFF" }}>*/}
                                          {/*<Icon active name="wifi" />*/}
                                      {/*</Button>*/}
                                  {/*</Left>*/}
                                  {/*<Body>*/}
                                  {/*<Text>Wi-Fi</Text>*/}
                                  {/*</Body>*/}
                                  {/*<Right>*/}
                                      {/*<Text>GeekyAnts</Text>*/}
                                      {/*<Icon active name="arrow-forward" />*/}
                                  {/*</Right>*/}
                              {/*</ListItem>*/}
                              {/*<ListItem icon>*/}
                                  {/*<Left>*/}
                                      {/*<Button style={{ backgroundColor: "#007AFF" }}>*/}
                                          {/*<Icon active name="bluetooth" />*/}
                                      {/*</Button>*/}
                                  {/*</Left>*/}
                                  {/*<Body>*/}
                                  {/*<Text>Bluetooth</Text>*/}
                                  {/*</Body>*/}
                                  {/*<Right>*/}
                                      {/*<Text>On</Text>*/}
                                      {/*<Icon active name="arrow-forward" />*/}
                                  {/*</Right>*/}
                              {/*</ListItem>*/}
                          {/*</View>*/}
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
                      <Button style={{ backgroundColor: "#34A34F" }} onPress={()=>dial(`${Config.CALL_BKB}`,false)}>
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
