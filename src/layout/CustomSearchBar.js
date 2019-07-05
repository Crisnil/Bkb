import React, { PureComponent } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

import * as DeviceRatio from './DeviceRatio'

export default class CustomSearchBar extends PureComponent {
	render() {
		const { contentContainerStyle, inputStyle, label, labelStyle } = this.props

		return (
			<View
				style={[
					{
						margin: DeviceRatio.computePixelRatio(8),
					},
					contentContainerStyle,
				]}
			>
				<Text
					style={[
						{
							fontWeight: 'bold',
							fontSize: 15,
							color: '#2c3e50',
							paddingBottom: DeviceRatio.computePixelRatio(5),
						},
						labelStyle,
					]}
				>
					{label}
				</Text>
				<TextInput
					ref={c => {
						this.ref = c
					}}
					{...this.props}
					style={[
						{
							flex: 1,
							height: DeviceRatio.computePixelRatio(35),
							paddingTop: DeviceRatio.computePixelRatio(8),
							padding: DeviceRatio.computePixelRatio(8),
							borderWidth: DeviceRatio.computePixelRatio(StyleSheet.hairlineWidth),
							borderRadius: DeviceRatio.computePixelRatio(5),
							borderColor: '#2c3e50',
							color: '#2c3e50',
						},
						inputStyle,
					]}
					clearButtonMode={'while-editing'}
					autoComplete={'off'}
					autoCorrect={false}
				/>
			</View>
		)
	}
}
