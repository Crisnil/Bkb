import React, { PureComponent } from 'react'
import { BackHandler, Linking, Platform,Easing,Animated } from 'react-native'
import {
    createAppContainer,
    createBottomTabNavigator,
    createStackNavigator,
    createDrawerNavigator,
} from 'react-navigation'
import { Root } from "native-base";
import AsyncStorage from '@react-native-community/async-storage'
import ExitApp from 'react-native-exit-app'
import { connect } from 'react-redux'
import * as Config from './config/Config'


import Loading from './containers/Loading'
import Login from './containers/Login'
import Home from './containers/Home'
import Account from './containers/Account'
import Detail from './containers/Detail'
import SideBar from './containers/Sidebar'
import { CustomAlert, CustomNavigationService, CustomTitleBar } from './layout'
import ServiceRequest from "./containers/ServiceRequest";
import SrList from "./containers/SrList";
import Registration from "./containers/Registration";
import SrInformation from "./containers/SrInformation";




// const HomeNavigator = createBottomTabNavigator({
//
//     Home: { screen: Home },
//     Account: { screen: Account },
// })
//
// HomeNavigator.navigationOptions = ({ navigation }) => {
//     const { routeName } = navigation.state.routes[navigation.state.index]
//
//     return {
//         headerTitle: routeName,
//     }
// }
//
//
// const MainNavigator = createStackNavigator(
//     {
//         HomeNavigator: {
//             screen: HomeNavigator,
//             navigationOptions: {
//                 header: <CustomTitleBar title={'Dashboard'} showBackButton={false}/>,
//                 gesturesEnabled: false,
//             },
//         },
//         Detail: { screen: Detail },
//     }
//
// )
//
// const ModalNavigator = createStackNavigator(
//     {
//
//         Main: { screen: MainNavigator },
//         Login: { screen: Login },
//
//     },
//     {
//         headerMode: 'none',
//         mode: 'modal',
//         navigationOptions: {
//             gesturesEnabled: false,
//         },
//         transitionConfig: () => ({
//             transitionSpec: {
//                 duration: 300,
//                 easing: Easing.out(Easing.poly(4)),
//                 timing: Animated.timing,
//             },
//             screenInterpolator: sceneProps => {
//                 const { layout, position, scene } = sceneProps
//                 const { index } = scene
//
//                 const height = layout.initHeight
//                 const translateY = position.interpolate({
//                     inputRange: [index - 1, index, index + 1],
//                     outputRange: [height, 0, 0],
//                 })
//
//                 const opacity = position.interpolate({
//                     inputRange: [index - 1, index - 0.99, index],
//                     outputRange: [0, 1, 1],
//                 })
//
//                 return { opacity, transform: [{ translateY }] }
//             },
//         }),
//     }
// )
//
// const Navigator = createAppContainer(ModalNavigator)

const Drawer = createDrawerNavigator(
  {
    Home: { screen: Home },
    Login:{screen: Login},
    SRList:{screen: SrList} ,
    Services:{screen: ServiceRequest},
    Registration:{screen: Registration},
    SrInformation:{screen: SrInformation}
  },
  {
    initialRouteName: "Home",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />
  }
);

const AppNavigator = createStackNavigator(
  {
    Drawer: { screen: Drawer },
    Home: { screen: Home},
    Detail: { screen: Detail },
    SRList:{screen: SrList} ,
    Login: { screen: Login },
    Register:{screen: Registration},
    SrInformation:{screen: SrInformation}
  },
  {
    initialRouteName: "Drawer",
    headerMode: "none"
  }
);

const AppContainer = createAppContainer(AppNavigator);

function getActiveRouteName(navigationState) {
    if (!navigationState) {
        return null
    }
    const route = navigationState.routes[navigationState.index]
    if (route.routes) {
        return getActiveRouteName(route)
    }
    return route.routeName
}
// @connect(({ app }) => ({ app }))
export default class Router extends PureComponent {


    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.backHandle)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backHandle)
    }

    backHandle = () => {
        const currentScreen = getActiveRouteName(this.props.router)
        if (currentScreen === 'Login') {
            return true
        }
        if (currentScreen !== 'Home') {
            this.props.dispatch(NavigationActions.back())
            return true
        }
        return false
    }

    render() {
        return (
            // <Navigator
            //     ref={navigatorRef => {
            //         CustomNavigationService.setTopLevelNavigator(navigatorRef)
            //     }}
            // />
            <Root>
              <AppContainer />
            </Root>
        )
    }
}
