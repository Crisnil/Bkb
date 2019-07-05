import React, { Component } from 'react'
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import SignatureCapture from 'react-native-signature-capture'
import Device from 'react-native-device-detection'
import { SafeAreaView } from 'react-navigation'

import CustomButton from './CustomButton'
import * as DeviceRatio from './DeviceRatio'
import Icon from './SvgIcon/Icon'

export default class SignaturePad extends Component {
	constructor(props) {
		super(props)
		this.state = {
			imageModal: false,
			showSaveButton: false,
			signatureModal: false,
		}
	}

	onOpen = value => () => {
		this.setState({ signatureModal: value })
	}

	onClose = () => {
		this.setState({ signatureModal: false })
	}

	onSaveEvent = result => {
		const { onSaveEvent } = this.props
		if (typeof onSaveEvent === 'function') {
			onSaveEvent(result)
		}

		this.setState({ showSaveButton: false, signatureModal: false })
	}

	onDragEvent = () => {
		this.setState({ showSaveButton: true })
	}

	openPreview = value => () => {
		this.setState({ imageModal: value })
	}

	closePreview = () => {
		this.setState({ imageModal: false })
	}

	editSignature = () => {
		this.setState({ imageModal: false, signatureModal: true })
	}

	saveSign = () => {
		this.signatureComponentRef.saveImage()
	}

	resetSign = () => {
		this.signatureComponentRef.resetImage()
		this.setState({ showSaveButton: false })
	}

	render() {
		const {
			contentContainerStyle,
			haveSigned,
			label,
			signatory,
			signatoryName,
			signature,
		} = this.props
		const { imageModal, showSaveButton, signatureModal } = this.state

		return (
			<View>
				<View style={[contentContainerStyle]}>
					{signature ? (
						<TouchableOpacity
							activeOpacity={0.8}
							onPress={this.openPreview(true)}
							style={{
								padding: DeviceRatio.computePixelRatio(5),
								borderRadius: DeviceRatio.computePixelRatio(5),
								backgroundColor: '#fdcb6e',
							}}
						>
							<Icon
								name={'Signature'}
								width={DeviceRatio.computePixelRatio(25)}
								height={DeviceRatio.computePixelRatio(25)}
								fill={'#fbfaff'}
							/>
						</TouchableOpacity>
					) : (
						<TouchableOpacity
							activeOpacity={0.8}
							onPress={this.onOpen(true)}
							style={{
								padding: DeviceRatio.computePixelRatio(5),
								borderRadius: DeviceRatio.computePixelRatio(5),
								backgroundColor: '#0984e3',
							}}
						>
							<Icon
								name={'Signature'}
								width={DeviceRatio.computePixelRatio(25)}
								height={DeviceRatio.computePixelRatio(25)}
								fill={'#fbfaff'}
							/>
						</TouchableOpacity>
					)}
				</View>
				<Modal transparent visible={imageModal} onRequestClose={this.closePreview}>
					<View
						style={{
							flex: 1,
							alignItems: 'center',
							justifyContent: 'center',
							backgroundColor: 'rgba(0,0,0,0.8)',
						}}
					>
						<View
							style={{
								flex: 1,
								justifyContent: 'center',
							}}
						>
							<TouchableOpacity
								activeOpacity={0.5}
								onPress={this.closePreview}
								style={{
									alignItems: 'flex-end',
								}}
							>
								<Icon
									name={'Cancel'}
									width={DeviceRatio.computePixelRatio(25)}
									height={DeviceRatio.computePixelRatio(25)}
									fill={'#d63031'}
								/>
							</TouchableOpacity>
							<View
								style={{
									marginHorizontal: DeviceRatio.computePixelRatio(25),
									padding: DeviceRatio.computePixelRatio(8),
									borderRadius: DeviceRatio.computePixelRatio(5),
									backgroundColor: '#fbfaff',
								}}
							>
								<Image
									style={{
										width: DeviceRatio.computePixelRatio(250),
										height: DeviceRatio.computePixelRatio(165),
										alignSelf: 'center',
									}}
									source={{ uri: signature }}
								/>
								{haveSigned ? null : (
									<TouchableOpacity
										activeOpacity={0.8}
										onPress={this.editSignature}
										style={{
											marginTop: DeviceRatio.computePixelRatio(8),
											padding: DeviceRatio.computePixelRatio(5),
											borderRadius: DeviceRatio.computePixelRatio(5),
											backgroundColor: '#0984e3',
										}}
									>
										<View
											style={{
												flexDirection: 'row',
												alignItems: 'center',
											}}
										>
											<Icon
												name={'Signature'}
												width={DeviceRatio.computePixelRatio(25)}
												height={DeviceRatio.computePixelRatio(25)}
												fill={'#fbfaff'}
												style={{
													marginRight: DeviceRatio.computePixelRatio(5),
												}}
											/>
											<Text style={{ color: '#2c3e50' }}>
												Change Signature
											</Text>
										</View>
									</TouchableOpacity>
								)}
							</View>
						</View>
					</View>
				</Modal>
				<Modal transparent={false} visible={signatureModal}>
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
								{label}
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
					<SafeAreaView style={{ flex: 1, backgroundColor: '#fbfaff' }}>
						<View
							style={{
								flex: 0.6,
								margin: DeviceRatio.computePixelRatio(8),
								borderWidth: DeviceRatio.computePixelRatio(
									StyleSheet.hairlineWidth
								),
								borderColor: '#2c3e50',
							}}
						>
							<SignatureCapture
								ref={c => {
									this.signatureComponentRef = c
								}}
								onSaveEvent={this.onSaveEvent}
								onDragEvent={this.onDragEvent}
								saveImageFileInExtStorage={false}
								showBorder={false}
								showNativeButtons={false}
								showTitleLabel={false}
								style={{ flex: 1 }}
							/>
						</View>
						<View
							style={{
								flex: 0.4,
								marginHorizontal: DeviceRatio.computePixelRatio(8),
								marginVertical: DeviceRatio.computePixelRatio(25),
							}}
						>
							<Text
								style={{
									textAlign: 'center',
									fontWeight: 'bold',
									fontSize: 20,
									color: '#2c3e50',
								}}
							>
								{signatoryName}
							</Text>
							<View
								style={{
									height: DeviceRatio.computePixelRatio(StyleSheet.hairlineWidth),
									marginHorizontal: DeviceRatio.computePixelRatio(30),
									marginVertical: DeviceRatio.computePixelRatio(8),
									backgroundColor: '#2c3e50',
								}}
							/>
							<Text
								style={{
									textAlign: 'center',
									fontWeight: 'bold',
									fontSize: 17,
									color: '#2c3e50',
								}}
							>
								{signatory}
							</Text>
						</View>
						<View
							style={{
								flexDirection: 'row',
							}}
						>
							<CustomButton
								type={'success'}
								onPress={this.resetSign}
								title={'Reset'}
								containerStyle={{ flex: 1 }}
							/>
							{showSaveButton ? (
								<CustomButton
									type={'primary'}
									onPress={this.saveSign}
									title={'Submit'}
									containerStyle={{ flex: 1 }}
								/>
							) : null}
						</View>
					</SafeAreaView>
				</Modal>
			</View>
		)
	}
}
