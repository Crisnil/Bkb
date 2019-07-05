import React from 'react'
import { FlatList, Text, View } from 'react-native'
import PropTypes from 'prop-types'

import * as DeviceRatio from './DeviceRatio'

export default class LazyLoadList extends React.PureComponent {
	static defaultProps = {
		refreshing: false,
	}

	static propTypes = {
		data: PropTypes.arrayOf(PropTypes.any).isRequired,
		refreshing: PropTypes.bool,
		renderItem: PropTypes.func.isRequired,
	}

	onEndReached = () => {
		const { onEndReached } = this.props

		if (typeof onEndReached === 'function') {
			onEndReached()
		}
	}

	onRefresh = () => {
		const { onRefresh } = this.props

		if (typeof onRefresh === 'function') {
			onRefresh()
		}
	}

	keyExtractor = item => {
		const { keyExtractor } = this.props

		if (typeof keyExtractor === 'function') {
			return keyExtractor(item)
		} else {
			return item.id
		}
	}

	render() {
		const { data, refreshing, renderItem } = this.props

		return (
			<FlatList
				{...this.props}
				data={data}
				keyExtractor={this.keyExtractor}
				renderItem={renderItem}
				onEndReached={this.onEndReached}
				onEndReachedThreshold={0.1}
				onRefresh={this.onRefresh}
				refreshing={refreshing}
				ListEmptyComponent={
					<View
						style={{
							height: DeviceRatio.computeHeightRatio(400),
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Text
							style={{
								fontSize: 20,
								color: '#2c3e50',
							}}
						>
							No Records
						</Text>
					</View>
				}
			/>
		)
	}
}
