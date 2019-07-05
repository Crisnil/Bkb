import React, { PureComponent } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import * as DeviceRatio from './DeviceRatio'

export default class Switch extends PureComponent {
	render() {
		const {
			checked,
			contentContainerStyle,
			disabled,
			hue,
			inputStyle,
			label,
			labelStyle,
			onChange,
		} = this.props

		return (
			<View
				style={[
					{
						margin: DeviceRatio.computePixelRatio(8),
					},
					contentContainerStyle,
				]}
			>
				<View style={{ flex: 0.5, justifyContent: 'center' }}>
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
				</View>

				<View style={{ flex: 0.5, justifyContent: 'flex-end' }}>
					<TouchableOpacity activeOpacity={0.8} onPress={onChange} disabled={disabled}>
						<View
							style={{
								flex: 1,
								flexDirection: 'row',
								alignItems: 'center',
							}}
						>
							<View
								style={[
									{
										padding: DeviceRatio.computePixelRatio(2),
										flexDirection: 'row',
										alignItems: 'center',
										justifyContent: 'center',
										borderWidth: DeviceRatio.computePixelRatio(
											StyleSheet.hairlineWidth
										),
										borderRadius: DeviceRatio.computePixelRatio(15),
										borderColor: '#2c3e50',
										opacity: disabled ? 0.5 : 1,
									},
									inputStyle,
								]}
							>
								{checked ? (
									<View
										style={[
											{
												padding: DeviceRatio.computePixelRatio(13),
												marginLeft: DeviceRatio.computePixelRatio(25),
												alignItems: 'flex-end',
												justifyContent: 'center',
												borderWidth: DeviceRatio.computePixelRatio(
													StyleSheet.hairlineWidth
												),
												borderRadius: DeviceRatio.computePixelRatio(13),
												borderColor: '#2c3e50',
												backgroundColor: checked ? hue : '#b2bec3',
												opacity: disabled ? 0.5 : 1,
											},
											inputStyle,
										]}
									/>
								) : (
									<View
										style={[
											{
												padding: DeviceRatio.computePixelRatio(13),
												marginRight: DeviceRatio.computePixelRatio(25),
												alignItems: 'flex-end',
												justifyContent: 'center',
												borderWidth: DeviceRatio.computePixelRatio(
													StyleSheet.hairlineWidth
												),
												borderRadius: DeviceRatio.computePixelRatio(13),
												borderColor: '#2c3e50',
												backgroundColor: checked ? hue : '#b2bec3',
												opacity: disabled ? 0.5 : 1,
											},
											inputStyle,
										]}
									/>
								)}
							</View>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}
