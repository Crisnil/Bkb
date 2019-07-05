import React, { Component } from 'react'
import {
	FlatList,
	Keyboard,
	Modal,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from 'react-native'
import PropTypes from 'prop-types'
import { SafeAreaView } from 'react-navigation'
import Device from 'react-native-device-detection'

import * as DeviceRatio from './DeviceRatio'
import Icon from './SvgIcon/Icon'

export default class CustomSearcher extends Component {
	static defaultProps = {
		defaultValue: '',
		label: 'Search something',
		placeholder: 'Search here...',
		refreshing: false,
		title: 'Search',
	}

	static propTypes = {
		data: PropTypes.arrayOf(PropTypes.any).isRequired,
		defaultValue: PropTypes.string,
		fieldName: PropTypes.string.isRequired,
		keyName: PropTypes.string.isRequired,
		label: PropTypes.string,
		onChangeText: PropTypes.func.isRequired,
		onSearchItemSelect: PropTypes.func.isRequired,
		placeholder: PropTypes.string,
		refreshing: PropTypes.bool,
		title: PropTypes.string,
	}

	constructor(props) {
		super(props)
		this.state = {
			modal: false,
		}
	}

	onOpen = value => () => {
		const { onOpen } = this.props
		if (typeof onOpen === 'function') {
			onOpen()
		}

		this.setState({ modal: value })
	}

	onClose = () => {
		const { onClose } = this.props
		if (typeof onClose === 'function') {
			onClose()
		}

		this.setState({ modal: false })
	}

	onItemSelect = item => () => {
		const { onSearchItemSelect } = this.props

		onSearchItemSelect(item)

		this.onClose()
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
		const { keyName, keyExtractor } = this.props

		if (typeof keyExtractor === 'function') {
			return keyExtractor(item)
		} else {
			return item[keyName]
		}
	}

	renderItem = () => ({ item }) => {
		const { fieldName } = this.props

		return (
			<TouchableOpacity onPress={this.onItemSelect(item)}>
				<View
					style={{
						minHeight: DeviceRatio.computePixelRatio(40),
						padding: DeviceRatio.computePixelRatio(8),
						borderTopWidth: DeviceRatio.computePixelRatio(StyleSheet.hairlineWidth),
						borderColor: '#b2bec3',
						justifyContent: 'center',
					}}
				>
					<Text
						style={{
							fontWeight: 'bold',
							color: '#2c3e50',
						}}
					>
						{item[fieldName]}
					</Text>
				</View>
			</TouchableOpacity>
		)
	}

	render() {
		const {
			contentContainerStyle,
			data,
			defaultValue,
			disabled,
			inputStyle,
			label,
			labelStyle,
			placeholder,
			refreshing,
			title,
		} = this.props
		const { modal } = this.state

		return (
			<View>
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={this.onOpen(true)}
					disabled={disabled}
				>
					<View
						pointerEvents={'box-only'}
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
									borderWidth: DeviceRatio.computePixelRatio(
										StyleSheet.hairlineWidth
									),
									borderRadius: DeviceRatio.computePixelRatio(5),
									borderColor: '#2c3e50',
								},
								inputStyle,
							]}
						>
							<Text
								style={{
									flex: 1,
									color: defaultValue !== '' ? '#2c3e50' : '#b2bec3',
									minHeight: DeviceRatio.computePixelRatio(35),
									padding: DeviceRatio.computePixelRatio(8),
								}}
							>
								{defaultValue !== '' ? defaultValue : placeholder}
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
				</TouchableOpacity>
				<Modal transparent={false} visible={modal}>
					<View
						style={{
							flexDirection: 'row',
							backgroundColor: '#fbfaff',
							alignItems: 'center',
							paddingTop: Device.isIos ? DeviceRatio.computePixelRatio(25) : 0,
							borderBottomWidth: DeviceRatio.computePixelRatio(
								StyleSheet.hairlineWidth
							),
							borderColor: '#b2bec3',
						}}
					>
						<View style={{ flex: 0.2, alignItems: 'flex-start' }}>
							<TouchableOpacity onPress={this.onClose}>
								<View style={{ padding: DeviceRatio.computePixelRatio(16) }}>
									<Icon
										name={'Back'}
										width={DeviceRatio.computePixelRatio(22)}
										height={DeviceRatio.computePixelRatio(22)}
									/>
								</View>
							</TouchableOpacity>
						</View>
						<View style={{ flex: 0.6, alignItems: 'center' }}>
							<Text
								style={{
									fontSize: 22,
									fontWeight: 'bold',
									color: '#2c3e50',
								}}
							>
								{title}
							</Text>
						</View>
						<View style={{ flex: 0.2, alignItems: 'flex-end' }}>
							<TouchableOpacity>
								<View style={{ padding: DeviceRatio.computePixelRatio(16) }}>
									<Icon
										name={''}
										width={DeviceRatio.computePixelRatio(22)}
										height={DeviceRatio.computePixelRatio(22)}
									/>
								</View>
							</TouchableOpacity>
						</View>
					</View>
					<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
						<SafeAreaView style={{ flex: 1, backgroundColor: '#fbfaff' }}>
							<View
								style={{
									margin: DeviceRatio.computePixelRatio(8),
									height: DeviceRatio.computePixelRatio(40),
								}}
							>
								<TextInput
									{...this.props}
									style={[
										{
											flex: 1,
											paddingTop: DeviceRatio.computePixelRatio(8),
											padding: DeviceRatio.computePixelRatio(8),
											borderWidth: DeviceRatio.computePixelRatio(
												StyleSheet.hairlineWidth
											),
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

							<FlatList
								data={data}
								keyExtractor={this.keyExtractor}
								renderItem={this.renderItem()}
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
								keyboardShouldPersistTaps={'handled'}
								onScroll={Keyboard.dismiss}
								style={{
									borderBottomWidth: DeviceRatio.computePixelRatio(
										StyleSheet.hairlineWidth
									),
									borderColor: '#b2bec3',
								}}
								ListFooterComponent={
									<View
										style={{
											marginBottom: DeviceRatio.computePixelRatio(90),
										}}
									/>
								}
							/>
						</SafeAreaView>
					</TouchableWithoutFeedback>
				</Modal>
			</View>
		)
	}
}
