import React, { Component } from 'react'
import { Alert, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'

import * as CustomNavigationService from './CustomNavigationService'
import * as DeviceRatio from './DeviceRatio'
import Icon from './SvgIcon/Icon'

@connect(({ auth }) => ({ auth }))
export default class LogoutButton extends Component {
	onLogout = () => {
		const { dispatch } = this.props

		Alert.alert('Confirmation', 'Please Confirm to Logout', [
			{
				text: 'Confirm',
				onPress: () => {
					dispatch({
						type: 'auth/logout',
						payload: {},
					})

					CustomNavigationService.reset('Auth')
				},
			},
			{
				text: 'Cancel',
				onPress: () => {},
				style: 'cancel',
			},
		])
	}

	render() {
		return (
			<TouchableOpacity onPress={this.onLogout}>
				<View style={{ padding: DeviceRatio.computePixelRatio(16) }}>
					<Icon
						name={'Logout'}
						width={DeviceRatio.computePixelRatio(22)}
						height={DeviceRatio.computePixelRatio(22)}
					/>
				</View>
			</TouchableOpacity>
		)
	}
}
