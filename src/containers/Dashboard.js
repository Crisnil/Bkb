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
    View,
    List,
    Separator
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
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.goBack()}
                        >
                            <Icon name="chevron-left" />
                        </Button>
                    </Left>
                    <Body style={{textAlign:'center',alignItems:'center'}}>
                        <Title>Dashboard</Title>
                    </Body>
                    <Right/>
                </Header>
                <View>
                    <List >
                        <Separator bordered>
                            <Text>Profile</Text>
                        </Separator>
                        <ListItem avatar style={{paddingTop:10,paddingBottom:10}}>
                            <Left>
                                <Thumbnail large  source={pratik} style={{backgroundColor:'#fff'}}/>
                            </Left>
                            <Body>
                            <Text>{!_.isEmpty(auth.account.data)?auth.account.data.customername : ""}</Text>
                            <Text note>{!_.isEmpty(auth.account.data)? auth.account.data.email : ""}</Text>
                            <Text note>{!_.isEmpty(auth.account.data)? auth.account.data.address : ""}</Text>
                            </Body>
                            <Right>
                                <Text note>{!_.isEmpty(auth.account.data)? auth.account.data.customerid:""}</Text>
                            </Right>
                        </ListItem>
                        <Separator bordered>
                            <Text>Service Requests</Text>
                        </Separator>
                    </List>
                </View>
                      <Srlisting {...this.props}
                                 fetchSrHistory={this.fetchSrHistory}
                      />

                  {/*<Fab*/}
                      {/*active={this.state.active}*/}
                      {/*direction="up"*/}
                      {/*containerStyle={{}}*/}
                      {/*style={{ backgroundColor: "#D44638" }}*/}
                      {/*position="bottomRight"*/}
                      {/*onPress={() => this.setState({ active: !this.state.active })}*/}
                  {/*>*/}
                      {/*<IconNB name="add" />*/}
                      {/*<Button style={{ backgroundColor: "#34A34F" }} onPress={()=>dial(`${Config.CALL_BKB}`,false)}>*/}
                         {/*<IconNB name="call" />*/}
                      {/*</Button>*/}
                      {/*<Button style={{ backgroundColor: "#3B5998" }} onPress={()=>navigation.navigate("ProblemCategory")}>*/}
                          {/*<IconNB name="build" />*/}
                      {/*</Button>*/}
                  {/*</Fab>*/}

          </Container>
        );
    }
}

export default Dashboard;
