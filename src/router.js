import React, {PureComponent} from 'react'
import {Alert, Animated, BackAndroid, BackHandler, Easing, Linking, PermissionsAndroid, Platform} from 'react-native'
import {
    createAppContainer,
    createBottomTabNavigator,
    createDrawerNavigator,
    createStackNavigator,
    createSwitchNavigator,
} from 'react-navigation'
import {Root, Toast} from "native-base";
import {connect} from 'react-redux'
import Login from './containers/Login'
import Home from './containers/Home'
import Detail from './containers/Detail'
import SideBar from './containers/Sidebar'
import {CustomNavigationService} from './layout'
import ServiceRequest from "./containers/ServiceRequest";
import Registration from "./containers/Registration";
import SrInformation from "./containers/SrInformation";
import Terms from "./containers/Terms";
import Dashboard from "./containers/Dashboard";
import CreateServiceRequest from "./containers/CreateServiceRequest";
import LandingPage from "./containers/LandingPage";
import SplashScreen from 'react-native-splash-screen'
import MapContainer from "./containers/MapContainer";
import ProblemCategory from "./containers/problemCategory";


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
                text: "Device Location Granted!",
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
        Home:{screen:LandingPage},
        Dashboard:{screen:Dashboard},
        Services:{screen: ServiceRequest},
        SrInformation:{screen: SrInformation},
        TermsAndPrivacy: { screen: Terms },
        CreateSr:{screen:CreateServiceRequest},
        Login: {screen:Login},
        Register: {screen:Registration},
        MapContainer:{screen:MapContainer},
        ProblemCategory:{screen:ProblemCategory}
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
        },{headerMode:'none'}),

        Unlogged: createStackNavigator(
            {
                Home: {screen:LandingPage},
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
        // Home:{screen:LandingPage},
        // Dashboard:{screen:Dashboard},
        // Detail: { screen: Detail },
        // SrInformation:{screen: SrInformation},
        // CreateSr:{screen:CreateServiceRequest},
        // Login: {screen:Login},
        // Register: {screen:Registration},
        // MapContainer:{screen:MapContainer},
        // ProblemCategory:{screen:ProblemCategory}

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

@connect(({ auth }) => ({ auth }))
export default class Router extends PureComponent {

    async componentDidMount() {
        await request_location_runtime_permission();
        SplashScreen.hide();
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.backHandle)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backHandle)
    }forceUpdate(callBack: () => void): void {
    }

    backHandle = () => {
        CustomNavigationService.back()()
        return true
    }



    render() {
        return (
            // <Navigator
            //     ref={navigatorRef => {
            //         CustomNavigationService.setTopLevelNavigator(navigatorRef)
            //     }}
            // />
            <Root>
              <AppContainer
                  ref={navigatorRef => {
                      CustomNavigationService.setTopLevelNavigator(navigatorRef)
                  }}
              />
            </Root>
        )
    }
}
