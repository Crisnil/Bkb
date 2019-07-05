import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import {
	Dimensions,
	FlatList,
	Modal,
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from 'react-native'
import * as DeviceRatio from '../DeviceRatio'
import styles from './styles'
import Icon from '../SvgIcon/Icon'

export default class Dropdown extends PureComponent {
	static defaultProps = {
		data: [],

		dropdownOffset: {
			top: DeviceRatio.computePixelRatio(32),
			left: 0,
		},

		dropdownMargins: {
			min: DeviceRatio.computePixelRatio(8),
			max: DeviceRatio.computePixelRatio(16),
		},

		dropdownPosition: null,

		fontSize: 17,

		itemCount: 4,
		itemPadding: DeviceRatio.computePixelRatio(8),
	}

	static propTypes = {
		data: PropTypes.arrayOf(PropTypes.object),

		dropdownOffset: PropTypes.shape({
			top: PropTypes.number.isRequired,
			left: PropTypes.number.isRequired,
		}),

		dropdownMargins: PropTypes.shape({
			min: PropTypes.number.isRequired,
			max: PropTypes.number.isRequired,
		}),

		dropdownPosition: PropTypes.number,

		fontSize: PropTypes.number,

		itemCount: PropTypes.number,
		itemPadding: PropTypes.number,
	}

	constructor(props) {
		super(props)

		this.state = {
			modal: false,
		}
	}

	onDropdownClick = () => {
		const {
			data,
			itemPadding,
			dropdownOffset,
			dropdownMargins: { min: minMargin, max: maxMargin },
		} = this.props

		const itemCount = data.length

		if (!itemCount) {
			return
		}

		const dimensions = Dimensions.get('window')

		this.container.measureInWindow((x, y, containerWidth) => {
			let left = x + dropdownOffset.left - maxMargin

			if (left <= minMargin) {
				left = minMargin
			}

			let right = x + containerWidth + maxMargin

			if (dimensions.width - right <= minMargin) {
				right = dimensions.width - minMargin
			}

			const top = y + dropdownOffset.top - itemPadding

			this.setState({
				modal: true,
				width: right - left,
				top,
				left,
			})
		})
	}

	onClose = () => {
		this.setState({ modal: false })
	}

	onItemSelect = item => () => {
		const { onChangeText } = this.props

		onChangeText(item)

		this.onClose()
	}

	itemSize = () => {
		const { fontSize, itemPadding } = this.props

		return Math.ceil(fontSize * 1.5 + itemPadding * 2)
	}

	visibleItemCount = () => {
		const { data, itemCount } = this.props

		return Math.min(data.length, itemCount)
	}

	keyExtractor = (item, index) => `${index}-${item.value}`

	renderBase = () => {
		const {
			placeholder,
			label,
			value,
			labelStyle,
			inputStyle,
			contentContainerStyle,
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
					<Text
						style={{
							flex: 1,
							color: value !== '' && value !== null ? '#2c3e50' : '#b2bec3',
							minHeight: DeviceRatio.computePixelRatio(35),
							padding: DeviceRatio.computePixelRatio(8),
						}}
					>
						{value !== '' && value !== null ? value : placeholder}
					</Text>
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
							fill={'#2c3e50'}
						/>
					</View>
				</View>
			</View>
		)
	}

	renderItem = ({ item }) => {
		const { fieldName } = this.props

		return (
			<TouchableOpacity
				activeOpacity={0.5}
				onPress={this.onItemSelect(item)}
				style={{
					padding: DeviceRatio.computePixelRatio(8),
					justifyContent: 'center',
					borderBottomWidth: DeviceRatio.computePixelRatio(StyleSheet.hairlineWidth),
					borderColor: '#b2bec3',
				}}
			>
				<Text
					style={{
						fontWeight: 'normal',
						color: '#2c3e50',
						fontSize: 20,
					}}
				>
					{item[fieldName]}
				</Text>
			</TouchableOpacity>
		)
	}

	render() {
		const { data, itemPadding, dropdownPosition } = this.props

		const { left, top, width, modal } = this.state

		const itemCount = data.length
		const visibleItemCount = this.visibleItemCount()
		const itemSize = this.itemSize()

		const height = 2 * itemPadding + itemSize * visibleItemCount
		let translateY = -itemPadding

		if (dropdownPosition === null || typeof dropdownPosition === 'undefined') {
			translateY -= itemCount === 1 ? 0 : itemSize
		} else if (dropdownPosition < 0) {
			translateY -= itemSize * (visibleItemCount + dropdownPosition)
		} else {
			translateY -= itemSize * dropdownPosition
		}

		const pickerStyle = {
			width,
			height,
			top,
			left,
			transform: [{ translateY }],
		}

		return (
			<View
				collapsable={false}
				ref={c => {
					this.container = c
				}}
			>
				<TouchableOpacity activeOpacity={0.8} onPress={this.onDropdownClick}>
					<View pointerEvents={'box-only'}>{this.renderBase()}</View>
				</TouchableOpacity>

				<Modal transparent visible={modal} onRequestClose={this.onClose}>
					<TouchableOpacity
						activeOpacity={1}
						onPressOut={this.onClose}
						style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.2)' }}
					>
						<TouchableWithoutFeedback>
							<View style={[styles.picker, pickerStyle]}>
								<FlatList
									data={data}
									keyExtractor={this.keyExtractor}
									renderItem={this.renderItem}
								/>
							</View>
						</TouchableWithoutFeedback>
					</TouchableOpacity>
				</Modal>
			</View>
		)
	}
}
