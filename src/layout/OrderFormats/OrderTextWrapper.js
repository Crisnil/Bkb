import React from 'react'
import { Text } from 'react-native'

export default class OrderTextWrapper extends React.PureComponent {
	render() {
		const { children } = this.props

		return (
			<Text
				style={{
					fontSize: 16,
					color: '#2c3e50',
				}}
			>
				{children}
			</Text>
		)
	}
}
