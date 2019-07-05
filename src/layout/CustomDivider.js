import React from 'react'
import { StyleSheet, View } from 'react-native'

import * as DeviceRatio from './DeviceRatio'

const CustomDivider = () => (
	<View
		style={{
			margin: DeviceRatio.computePixelRatio(8),
			width: DeviceRatio.computePixelRatio(StyleSheet.hairlineWidth),
			backgroundColor: '#b2bec3',
		}}
	/>
)

export default CustomDivider
