import React, { PureComponent } from 'react'
import { BackHandler, Linking, Platform,Easing,Animated,PermissionsAndroid,Alert } from 'react-native'
import {
    createAppContainer,
    createBottomTabNavigator,
    createStackNavigator,
    createDrawerNavigator, createSwitchNavigator,
} from 'react-navigation'
import { Root,Toast } from "native-base";
import AsyncStorage from '@react-native-community/async-storage'
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
import TestMap from "./containers/TestMap";
import Terms from "./containers/Terms";


export async function request_location_runtime_permission() {

    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                'title': 'ReactNativeCode Location Permission',
                'message': 'ReactNativeCode App needs access to your location '
            }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {

            Toast.show({
                text: "Location Granted!",
                buttonText: "Okay",
                duration: 1000,
                type:'danger'});
        }
        else {

            Toast.show({
                text: "Needs Permission",
                buttonText: "Okay",
                duration: 3000,
                type:'danger'});

        }
    } catch (err) {
        console.warn(err)
    }
}


const Drawer = createDrawerNavigator(
    {
        SRList:{screen: SrList} ,
        Services:{screen: ServiceRequest},
        SrInformation:{screen: SrInformation},
        TestMap:{screen:TestMap},
        TermsAndPrivacy: { screen: Terms }
    },
    {
        contentOptions: {
            activeTintColor: "#e91e63"
        },
        contentComponent: props => <SideBar {...props} />
    }

);
const OnboardingNavigator = createSwitchNavigator(
    {
        Logged: createStackNavigator({
            Drawer: { screen:Drawer},
            TermsAndPrivacy: { screen: Terms }
        },{headerMode:'none'}),

        Unlogged: createStackNavigator(
            {
                Home: {screen:Home},
                Login: {screen:Login},
                Register: {screen:Registration},
            }, {
                headerMode: 'none',
                initialRouteName: 'Home' // First screen the user is redirected to
            }
        )
    }, {
        initialRouteName: 'Unlogged',
    }
);

const AppNavigator = createStackNavigator(
    {
        Drawer: { screen: Drawer },
        Detail: { screen: Detail },
        SRList:{screen: SrList} ,

        SrInformation:{screen: SrInformation},
        TestMap:{screen:TestMap}
    },
    {
        headerMode: 'none',
        initialRouteName: "Drawer",
    }
);

const RootNavigator = createSwitchNavigator(
    {
        Onboarding: {
            screen: OnboardingNavigator,
        },
        Main: {
            screen: AppNavigator,
        },
    },
    {
        headerMode: 'none'
    }
    //{} Here we can define navigation options, we'll have a look later.
);




const AppContainer = createAppContainer(RootNavigator);

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

    async componentDidMount() {

        await request_location_runtime_permission()

    }

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
