import React, { PureComponent } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import * as DeviceRatio from './DeviceRatio'

export default class CustomListItem extends PureComponent {
	render() {
		const { disabled, icon, onPress, size, style, title } = this.props

		let fontSize = 17
		let height = DeviceRatio.computePixelRatio(47)

		switch (size) {
			case 'small':
				fontSize = 13
				break
			case 'large':
				fontSize = 20
				break
			default:
				fontSize = 17
		}

		switch (size) {
			case 'small':
				height = DeviceRatio.computePixelRatio(34)
				break
			case 'large':
				height = DeviceRatio.computePixelRatio(52)
				break
			default:
				height = DeviceRatio.computePixelRatio(47)
		}

		return (
			<TouchableOpacity
				activeOpacity={0.8}
				onPress={onPress}
				disabled={disabled}
				style={[
					{
						borderBottomWidth: DeviceRatio.computePixelRatio(StyleSheet.hairlineWidth),
						borderColor: '#b2bec3',
					},
					style,
				]}
			>
				<View
					style={[
						{
							height,
							backgroundColor: 'transparent',
							alignItems: 'flex-start',
						},
						style,
					]}
				>
					<View
						style={{
							flex: 1,
							flexDirection: 'row',
							marginHorizontal: DeviceRatio.computePixelRatio(8),
							alignItems: 'center',
						}}
					>
						<Image
							style={{
								marginHorizontal: DeviceRatio.computePixelRatio(16),
								width: DeviceRatio.computePixelRatio(30),
								height: DeviceRatio.computePixelRatio(35),
							}}
							source={icon}
						/>
						<Text
							style={{
								fontSize,
								fontWeight: 'bold',
								color: disabled ? '#fbfaff' : '#b2bec3',
							}}
						>
							{title}
						</Text>
					</View>
				</View>
			</TouchableOpacity>
		)
	}
}
