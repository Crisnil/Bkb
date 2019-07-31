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

const drawerCover = require("../assets/drawer-cover.png");
const drawerImage = require("../assets/logo-kitchen-sink.png");
const pratik = require("../assets/images/male.png");


class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4,
        datas : [
            {
                name: "Dashboard",
                route: "Dashboard",
                icon: "pie",
                bg: "#C5F442"
            },
            {
                name: "Service Request",
                route: "TestMap",
                icon: "navigate",
                bg: "#C5F442"
            },
            {
                name: "Create SR",
                route: "CreateSr",
                icon: "navigate",
                bg: "#C5F442"
            },
            {
                name: "SR List",
                route: "SRList",
                icon: "paper",
                bg: "#C5F442"
            },
            {
                name: "Settings",
                route: "Login",
                icon: "settings",
                bg: "#C5F442"
            },
            {
                name: "Logout",
                route: "Login",
                icon: "settings",
                bg: "#C5F442"
            },

        ],
        stickyHeaderIndices: []
    };
  }
    componentWillMount() {
        var arr = [];
        this.state.datas.map(obj => {
            if (obj.header) {
                arr.push(this.state.datas.indexOf(obj));
            }
        });
        arr.push(0);
        this.setState({
            stickyHeaderIndices: arr
        });
    }
  renderItem = ({item}) => {
      return(
          <ListItem
              button
              noBorder
              onPress={() => this.props.navigation.navigate(item.route)}
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
                    <Text>Kumar Pratik</Text>
                    <Text note>Doing what you like will always keep you happy . .</Text>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.props.navigation.closeDrawer()}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Right>
                </ListItem>
          <FlatList
            data={this.state.datas}
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
