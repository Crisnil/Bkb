import React from 'react'
import { Platform, View } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { connect } from 'react-redux'

import CustomStatusBar from './CustomStatusBar'
import * as DeviceRatio from './DeviceRatio'

@connect(state => ({
	orientation: state.orientation,
}))
export default class CustomLayout extends React.Component {
	render() {
		const { children, header, hideStatusBar, orientation, sideBar, sideBarTitle } = this.props

		const statusBarEnabled = Platform.OS === 'ios' ? hideStatusBar : true
		const sideBarEnabled = typeof sideBar !== 'undefined'

		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: '#fbfaff' }}>
				<View style={{ flex: 1, flexDirection: 'row' }}>
					{orientation.isLandscape && sideBarEnabled ? (
						<View
							style={{
								width: DeviceRatio.computeWidthRatio(350),
							}}
						>
							{sideBarTitle}
							{sideBar}
						</View>
					) : null}
					<View style={{ flex: 1 }}>
						{header}
						<CustomStatusBar hideStatusBar={statusBarEnabled} />
						{children}
					</View>
				</View>
			</SafeAreaView>
		)
	}
}
