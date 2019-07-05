import { Alert } from 'react-native'

function success(message) {
	Alert.alert('Success!', message)
}

function alert(title, message, buttons, options, type) {
	Alert.alert(title, message, buttons, options, type)
}

function fail(message) {
	Alert.alert('Error!', message)
}

export { success, alert, fail }
