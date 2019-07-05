import React, { PureComponent } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import * as DeviceRatio from './DeviceRatio'

export default class CustomButton extends PureComponent {
	render() {
		const {
			containerStyle,
			contentContainerStyle,
			disabled,
			onPress,
			size,
			title,
			type,
		} = this.props

		let color = '#0984e3'
		let fontSize = 15
		let height = DeviceRatio.computePixelRatio(37)

		switch (type) {
			case 'primary':
				color = '#0984e3'
				break
			case 'success':
				color = '#00b894'
				break
			case 'danger':
				color = '#d63031'
				break
			case 'warning':
				color = '#fdcb6e'
				break
			default:
				color = '#0984e3'
		}

		if (disabled) {
			color = '#b2bec3'
		}

		switch (size) {
			case 'small':
				fontSize = 12
				height = DeviceRatio.computePixelRatio(27)
				break
			case 'large':
				fontSize = 18
				height = DeviceRatio.computePixelRatio(47)
				break
			default:
				fontSize = 15
				height = DeviceRatio.computePixelRatio(37)
		}

		return (
			<TouchableOpacity
				activeOpacity={0.8}
				onPress={onPress}
				disabled={disabled}
				style={[
					{
						margin: DeviceRatio.computePixelRatio(8),
					},
					containerStyle,
				]}
			>
				<View
					style={[
						{
							height,
							backgroundColor: color,
							alignItems: 'center',
							justifyContent: 'center',
							paddingHorizontal: DeviceRatio.computePixelRatio(8),
							borderRadius: DeviceRatio.computePixelRatio(5),
						},
						contentContainerStyle,
					]}
				>
					<Text style={{ fontSize, fontWeight: 'bold', color: '#fbfaff' }}>{title}</Text>
				</View>
			</TouchableOpacity>
		)
	}
}
