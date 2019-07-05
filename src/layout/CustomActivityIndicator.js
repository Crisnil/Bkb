import React, { PureComponent } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'

import * as DeviceRatio from './DeviceRatio'

export default class CustomActivityIndicator extends PureComponent {
	render() {
		const { animating, color, text } = this.props

		if (!animating) return null

		return (
			<View
				style={{
					flex: 1,
					position: 'absolute',
					top: 0,
					right: 0,
					bottom: 0,
					left: 0,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<View
					style={{
						padding: DeviceRatio.computePixelRatio(8),
						backgroundColor: '#2c3e50',
						borderRadius: DeviceRatio.computePixelRatio(5),
					}}
				>
					<View
						style={{
							padding: DeviceRatio.computePixelRatio(8),
						}}
					>
						<ActivityIndicator {...this.props} />
					</View>
					<Text style={{ fontWeight: 'bold', color }}>{text}</Text>
				</View>
			</View>
		)
	}
}
