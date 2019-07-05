import React, { PureComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import DatePicker from 'react-native-datepicker'

import * as DeviceRatio from './DeviceRatio'
import Icon from './SvgIcon/Icon'

export default class CustomDatePicker extends PureComponent {
	state = {
		timeZoneOffsetInHours: (-1 * new Date().getTimezoneOffset()) / 60,
	}

	render() {
		const { label, hue, labelStyle, inputStyle } = this.props
		const { timeZoneOffsetInHours } = this.state

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
							flexDirection: 'row',
							borderWidth: DeviceRatio.computePixelRatio(StyleSheet.hairlineWidth),
							borderRadius: DeviceRatio.computePixelRatio(5),
							borderColor: '#2c3e50',
						},
						inputStyle,
					]}
				>
					<DatePicker
						{...this.props}
						customStyles={{
							dateIcon: {
								display: 'none',
								borderWidth: 0,
							},
							datePicker: {
								borderWidth: 0,
							},
							dateInput: {
								paddingTop: DeviceRatio.computePixelRatio(8),
								padding: DeviceRatio.computePixelRatio(8),
								borderWidth: 0,
								alignItems: 'flex-start',
							},
							dateText: {
								color: '#2c3e50',
							},
						}}
						style={{
							flex: 1,
						}}
						timeZoneOffsetInMinutes={timeZoneOffsetInHours * 60}
						confirmBtnText={'Confirm'}
						cancelBtnText={'Cancel'}
					/>
					<View
						style={{
							padding: DeviceRatio.computePixelRatio(8),
							alignItems: 'flex-end',
							justifyContent: 'center',
						}}
					>
						<Icon
							name={'CaretDown'}
							width={DeviceRatio.computePixelRatio(16)}
							height={DeviceRatio.computePixelRatio(16)}
							fill={hue}
						/>
					</View>
				</View>
			</View>
		)
	}
}
