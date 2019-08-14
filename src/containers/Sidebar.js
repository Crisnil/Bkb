import React, { Component } from "react";
import {FlatList, Image} from "react-native";
import {
    Content,
    Text,
    List,
    ListItem,
    Icon,
    Container,
    Left,
    Right,
    Badge,
    Header,
    Button, Thumbnail, Body,
} from "native-base";
import styles from "./sidebar_style";
import { connect } from 'react-redux';
import _ from 'lodash';

const drawerCover = require("../assets/drawer-cover.png");
const drawerImage = require("../assets/logo-kitchen-sink.png");
const pratik = require("../assets/person.png");



@connect(({ auth }) => ({ auth }))
class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4,
      stickyHeaderIndices: [],
      isLogged:false
    };
  }

    componentDidMount() {
        // const { dispatch } = this.props;
        // dispatch({
        //     type: 'auth/checkAuth',
        //     payload:{}
        // })
    }

    componentWillMount() {
    //     var arr = [];
    //     this.state.datas.map(obj => {
    //         if (obj.header) {
    //             arr.push(this.state.datas.indexOf(obj));
    //         }
    //     });
    //     arr.push(0);
    //     this.setState({
    //         stickyHeaderIndices: arr
    //     });
    }

    onClickRoute =(item)=>{
      return()=>{
          const { dispatch, navigation } = this.props;
          switch (item.name) {
             case 'Logout' :
                 dispatch({
                     type: 'auth/logout',
                     payload:{
                         callback:(result,error)=>{
                                 if(result){
                                     navigation.navigate("Login");
                                 }
                            }
                     }
                 })
             break;
              default:
                  navigation.navigate(item.route);
          }
      }

    }

  renderItem = ({item}) => {
      return(
          <ListItem
              button
              noBorder
              onPress={this.onClickRoute(item)}
          >
            <Left>
                 <Icon active name={item.icon}
                    style={{ color: "#777", fontSize: 26, width: 30 }}
                 />
                      <Text style={styles.text}>
                      {item.name}
                      </Text>
            </Left>
              {item.types &&
            <Right style={{ flex: 1 }}>
                  <Badge style={{ borderRadius: 3, height: 25, width: 72, backgroundColor: item.bg }}>
                        <Text
                           style={styles.badgeText}
                          >{`${item.types} Types`}</Text>
                  </Badge>
             </Right>}
           </ListItem>
          )
  }


  render() {
      console.log(this.props.auth.account);
      const{auth} =this.props;
      const{account}= auth;
      const notAuthenticatedMenu =[

          {
              name: "Login",
              route: "Login",
              icon: "input",
              bg: "#C5F442"
          },

      ];

      const  authenticatedMenu = [
          {
              name: "Dashboard",
              route: "Dashboard",
              icon: "dashboard",
              bg: "#C5F442"
          },
          {
              name: "Create SR",
              route: "CreateSr",
              icon: "build",
              bg: "#C5F442"
          },
          {
              name: "Logout",
              route: "Login",
              icon: "eject",
              bg: "#C5F442"
          },

      ];

    return (
      <Container>
          {/*<Header>*/}
              {/*/!*<Right>*!/*/}
                  {/*/!*<Button transparent onPress={() => this.props.navigation.closeDrawer()}>*!/*/}
                      {/*/!*<Icon name="arrow-back" />*!/*/}
                  {/*/!*</Button>*!/*/}
              {/*/!*</Right>*!/*/}

          {/*</Header>*/}
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: "#fff", top: -1 }}
        >
          {/*<Image source={drawerCover} style={styles.drawerCover} />*/}
          {/*<Image square style={styles.drawerImage} source={drawerImage} />*/}
                <ListItem avatar>
                    <Left>
                        <Thumbnail source={pratik} />
                    </Left>
                    <Body style={{color:"#fff"}}>
                    <Text>{!_.isEmpty(account)? account.data.customername :''}</Text>
                    <Text note>{!_.isEmpty(account)? account.data.email : ""}</Text>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.props.navigation.closeDrawer()}>
                            <Icon name="clear-all" />
                        </Button>
                    </Right>
                </ListItem>
          <FlatList
            data={auth.isAuthenticated? authenticatedMenu : notAuthenticatedMenu}
            keyExtractor={item => item.name}
            renderItem={this.renderItem}
            stickyHeaderIndices={this.state.stickyHeaderIndices}

          />
        </Content>
      </Container>
    );
  }
}

export default SideBar;
