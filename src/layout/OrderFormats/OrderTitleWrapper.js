import React from 'react'
import { Text } from 'react-native'

export default class OrderTitleWrapper extends React.PureComponent {
	render() {
		const { children } = this.props

		return (
			<Text
				style={{
					fontSize: 20,
					fontWeight: 'bold',
					color: '#2c3e50',
				}}
			>
				{children}
			</Text>
		)
	}
}
