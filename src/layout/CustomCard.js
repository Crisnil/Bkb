import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import * as DeviceRatio from './DeviceRatio'

export default class CustomCard extends React.PureComponent {
	render() {
		const { children, extra, label } = this.props

		return (
			<View
				style={{
					margin: DeviceRatio.computePixelRatio(8),
				}}
			>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						padding: DeviceRatio.computePixelRatio(8),
						backgroundColor: '#576574',
						borderTopLeftRadius: DeviceRatio.computePixelRatio(5),
						borderTopRightRadius: DeviceRatio.computePixelRatio(5),
					}}
				>
					<Text
						style={{
							fontSize: 18,
							fontWeight: 'bold',
							color: '#fbfaff',
						}}
					>
						{label}
					</Text>
					{extra}
				</View>
				<View
					style={{
						borderWidth: DeviceRatio.computePixelRatio(StyleSheet.hairlineWidth),
						borderTopWidth: 0,
						borderBottomLeftRadius: DeviceRatio.computePixelRatio(5),
						borderBottomRightRadius: DeviceRatio.computePixelRatio(5),
						borderColor: '#2c3e50',
					}}
				>
					<View style={{ padding: DeviceRatio.computePixelRatio(4) }}>{children}</View>
				</View>
			</View>
		)
	}
}
