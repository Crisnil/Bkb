import React, { Component } from 'react'
import AsyncStorage from '@react-native-community/async-storage'

import { Text, View } from 'react-native'
import VersionNumber from 'react-native-version-number'
import { connect } from 'react-redux'
import * as Config from '../config/Config'
import {
	CustomAlert,
	CustomButton,
	CustomFormScrollView,
	CustomInput,
	CustomLayout,
	CustomNavigationService,
	DeviceRatio,
	SvgIcon,
} from '../layout'
import CustomActivityIndicator from '../layout/CustomActivityIndicator'

async function getSettings() {
	const value = await AsyncStorage.getItem('Settings')
	let response
	if (value !== null) {
		response = JSON.parse(value)
	}

	return response
}

@connect(({ auth }) => ({ auth }))
export default class Settings extends Component {
	constructor(props) {
		super(props)
		this.state = {
			host: Config.DEFAULT_URL,
		}
	}

	componentDidMount() {
		getSettings()
			.then(SettingsData => {
				this.setState({ host: SettingsData.host })
			})
			.catch(() => {
				this.setState({ host: Config.DEFAULT_URL })
			})
	}

	onSave = () => {
		const { host } = this.state
		if (!host || host.trim().length === 0) {
			CustomAlert.fail('Please specify Host')
			return
		}

		Config.setHost(host)

		AsyncStorage.setItem(
			'Settings',
			JSON.stringify({
				host: host,
			})
		)

		CustomNavigationService.back()()
	}

	changeHost = newText => {
		this.setState({
			host: newText.toLowerCase(),
		})
	}

	render() {
		const { auth } = this.props
		const { host } = this.state
		const { appVersion, buildVersion } = VersionNumber

		return (
			<CustomLayout hideStatusBar={false}>
				<CustomFormScrollView style={{ flex: 1 }}>
					<View style={{ justifyContent: 'center', alignItems: 'center' }}>
						<SvgIcon
							name={'Logo'}
							width={DeviceRatio.computePixelRatio(350)}
							height={DeviceRatio.computePixelRatio(350)}
						/>
					</View>

					<View style={{ marginHorizontal: DeviceRatio.computePixelRatio(32) }}>
						<CustomInput
							label={'HOST'}
							placeholder={'Enter Host/IP'}
							autoCapitalize={'none'}
							value={host}
							onChangeText={this.changeHost}
							onSubmitEditing={this.onSave}
							blurOnSubmit={false}
							returnKeyType={'go'}
							inputStyle={{
								borderColor: '#0984e3',
							}}
						/>

						<CustomButton
							type={'primary'}
							onPress={this.onSave}
							title={'Save Settings'}
						/>
					</View>
					<View style={{ justifyContent: 'center', alignItems: 'center' }}>
						<Text
							style={[
								{
									fontWeight: 'bold',
									color: '#b2bec3',
									paddingBottom: DeviceRatio.computePixelRatio(5),
								},
							]}
						>
							{`HISD3 Server v${auth.serverVersion}`}
						</Text>
						<Text
							style={[
								{
									fontWeight: 'bold',
									color: '#b2bec3',
									paddingBottom: DeviceRatio.computePixelRatio(5),
								},
							]}
						>
							{`HISD3 Mobile v${appVersion}`}
						</Text>
						<Text
							style={[
								{
									fontWeight: 'bold',
									color: '#b2bec3',
									paddingBottom: DeviceRatio.computePixelRatio(5),
								},
							]}
						>
							{`Build v${buildVersion}`}
						</Text>
					</View>
				</CustomFormScrollView>

				<View style={{ justifyContent: 'center', alignItems: 'center' }}>
					<Text
						style={[
							{
								fontWeight: 'bold',
								color: '#b2bec3',
								paddingBottom: DeviceRatio.computePixelRatio(5),
							},
						]}
					>
						{`\u00A9 2019 HISD3 | HISD3, Inc. `}
					</Text>
				</View>

				<CustomActivityIndicator
					animating={auth.loading}
					size={'large'}
					text={'Please wait'}
					color={'#fbfaff'}
				/>
			</CustomLayout>
		)
	}
}
