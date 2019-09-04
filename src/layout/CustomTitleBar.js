import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Device from 'react-native-device-detection'
import { connect } from 'react-redux'

import CustomLogoutButton from './CustomLogoutButton'
import * as CustomNavigationService from './CustomNavigationService'
import * as DeviceRatio from './DeviceRatio'
import SvgIcon from './SvgIcon/SvgIcon'

@connect(state => ({
	auth: state.auth,
	orientation: state.orientation,
}))
export default class CustomTitleBar extends Component {
	static defaultProps = {
		title: '',
		showBackButton: true,
	}

	render() {
		const { showBackButton, title } = this.props

		return (
			<View
				style={{
					flexDirection: 'row',
					backgroundColor: '#fbfaff',
					alignItems: 'center',
					paddingTop: Device.isIos ? DeviceRatio.computePixelRatio(25) : 0,
					borderBottomWidth: DeviceRatio.computePixelRatio(StyleSheet.hairlineWidth),
					borderColor: '#b2bec3',
				}}
			>
				<View style={{ flex: 0.2, alignItems: 'flex-start' }}>
					{showBackButton ? (
						<TouchableOpacity onPress={CustomNavigationService.back()}>
							<View style={{ padding: DeviceRatio.computePixelRatio(16) }}>
								<SvgIcon
									name={'Back'}
									width={DeviceRatio.computePixelRatio(22)}
									height={DeviceRatio.computePixelRatio(22)}
								/>
							</View>
						</TouchableOpacity>
					) : (
						<TouchableOpacity>
							<View style={{ padding: DeviceRatio.computePixelRatio(16) }}>
								<SvgIcon
									name={''}
									width={DeviceRatio.computePixelRatio(22)}
									height={DeviceRatio.computePixelRatio(22)}
								/>
							</View>
						</TouchableOpacity>
					)}
				</View>

				<View style={{ flex: 0.6, alignItems: 'center' }}>
					<Text
						style={{
							fontSize: 22,
							fontWeight: 'bold',
							color: '#2c3e50',
						}}
					>
						{title}
					</Text>
				</View>

				<View style={{ flex: 0.2, alignItems: 'flex-end' }}>
					<CustomLogoutButton />
				</View>
			</View>
		)
	}
}
