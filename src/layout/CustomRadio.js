import React, { PureComponent } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import _ from 'lodash'

import * as DeviceRatio from './DeviceRatio'
import SvgIcon from './SvgIcon/SvgIcon'

export default class CustomRadio extends PureComponent {
	render() {
		const { label, labelStyle, inputStyle, hue, data, value, onChange } = this.props

		const items = _.map(data, (item, i) => (
			<TouchableOpacity
				key={i}
				activeOpacity={0.8}
				onPress={() => onChange(item.value)}
				style={[
					{
						borderBottomWidth:
							i === data.length - 1
								? 0
								: DeviceRatio.computePixelRatio(StyleSheet.hairlineWidth),
						borderColor: '#b2bec3',
					},
					inputStyle,
				]}
			>
				<View
					style={{
						flex: 1,
						flexDirection: 'row',
						alignItems: 'center',
					}}
				>
					<View
						style={{
							flex: 1,
							height: DeviceRatio.computePixelRatio(40),
							padding: DeviceRatio.computePixelRatio(8),
							justifyContent: 'center',
						}}
					>
						<Text style={{ color: '#2c3e50' }}>{item.label}</Text>
					</View>
					<View
						style={{
							padding: DeviceRatio.computePixelRatio(10),
							justifyContent: 'center',
						}}
					>
						{value === item.value ? (
							<SvgIcon
								name={'CheckCircle'}
								width={DeviceRatio.computePixelRatio(20)}
								height={DeviceRatio.computePixelRatio(20)}
								fill={hue || '#0984e3'}
							/>
						) : null}
					</View>
				</View>
			</TouchableOpacity>
		))

		return (
			<View
				style={{
					margin: DeviceRatio.computePixelRatio(8),
				}}
			>
				<Text
					style={[
						{
							fontWeight: 'bold',
							color: '#2c3e50',
							paddingBottom: DeviceRatio.computePixelRatio(5),
						},
						labelStyle,
					]}
				>
					{label}
				</Text>
				<View
					style={[
						{
							flex: 1,
							borderWidth: DeviceRatio.computePixelRatio(StyleSheet.hairlineWidth),
							borderRadius: DeviceRatio.computePixelRatio(5),
							borderColor: '#2c3e50',
						},
						inputStyle,
					]}
				>
					{items}
				</View>
			</View>
		)
	}
}
