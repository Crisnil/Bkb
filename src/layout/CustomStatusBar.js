import React from 'react'
import { StatusBar } from 'react-native'

export default class CustomStatusBar extends React.PureComponent {
	render() {
		const { hideStatusBar } = this.props
		return (
			<StatusBar
				barStyle={'dark-content'}
				backgroundColor={'#fbfaff'}
				hidden={hideStatusBar}
			/>
		)
	}
}
