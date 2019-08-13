import { DrawerActions, NavigationActions, StackActions } from 'react-navigation'
import * as CustomAlert from './CustomAlert'
import React, {
	BackHandler,
} from 'react-native';

let navigator

function setTopLevelNavigator(navigatorRef) {
	navigator = navigatorRef
}

function getCurrentScreen(navigationState) {
	if (!navigationState) {
		return null
	}
	const route = navigationState.routes[navigationState.index]
	if (route.routes) {
		return getCurrentScreen(route)
	}
	return route.routeName
}

const navigate = (routeName, params = {}) => {
	navigator.dispatch(
		NavigationActions.navigate({
			routeName,
			params,
		})
	)
}

const back = () => () => {

	const currentScreen = getCurrentScreen(navigator.state.nav)

	switch (currentScreen) {
		case 'Register':
			break
		case 'Dashboard':
			break
		case 'Home' || 'LandingPages':
			CustomAlert.alert(
				`Warning!`,
				`Are you sure you want to leave?`,
				[
					{
						text: 'Leave',
						onPress: () => {
							BackHandler.exitApp()
						},
					},
					{
						text: 'Cancel',
						onPress: () => {},
					},
				]
			)
			break

		default:
			navigator.dispatch(NavigationActions.back())
	}
}

const backAfterSave = () => () => {
	navigator.dispatch(NavigationActions.back())
}

const reset = routeName => {
	navigator.dispatch(
		StackActions.reset({
			index: 0,
			actions: [
				NavigationActions.navigate({
					routeName,
				}),
			],
			key: null,
		})
	)
}

const resetNavigate = routeName => {
	navigator.dispatch(
		StackActions.reset({
			index: 0,
			actions: [NavigationActions.navigate({ routeName: 'Main' })],
			key: null,
		})
	)

	navigate(routeName)
}

const replace = routeName => {
	navigator.dispatch(
		StackActions.replace({
			key: navigator.state.key,
			routeName: 'Main',
			action: NavigationActions.navigate({ routeName }),
		})
	)
}

const openDrawer = () => () => {
	navigator.dispatch(DrawerActions.openDrawer())
}

const closeDrawer = () => () => {
	navigator.dispatch(DrawerActions.closeDrawer())
}

const toggleDrawer = () => () => {
	navigator.dispatch(DrawerActions.toggleDrawer())
}

export {
	navigate,
	back,
	backAfterSave,
	reset,
	resetNavigate,
	replace,
	openDrawer,
	closeDrawer,
	toggleDrawer,
	setTopLevelNavigator,
}
