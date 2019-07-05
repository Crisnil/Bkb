import { Dimensions } from 'react-native'

export function isPortrait() {
	const dim = Dimensions.get('screen')
	return dim.height >= dim.width
}

export function isLandscape() {
	const dim = Dimensions.get('screen')
	return dim.width >= dim.height
}
