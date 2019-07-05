import { Dimensions, PixelRatio } from 'react-native'

const ratio = 10 // The ratio to compute across all devices

export const getScreenWidth = Dimensions.get('window').width
export const getScreenHeight = Dimensions.get('window').height

export function computeWidthRatio(size, orientation = {}) {
	if (orientation.isPortrait) {
		const deviceWidthPercent = Dimensions.get('window').width / 100
		const dividedSize = deviceWidthPercent * (size / ratio)

		return PixelRatio.roundToNearestPixel(dividedSize)
	}

	if (orientation.isLandscape) {
		const deviceWidthPercent = Dimensions.get('window').width / 100
		const dividedSize = deviceWidthPercent * (size / ratio)

		return PixelRatio.roundToNearestPixel(dividedSize)
	}

	const deviceWidthPercent = Dimensions.get('window').width / 100
	const dividedSize = deviceWidthPercent * (size / ratio)

	return PixelRatio.roundToNearestPixel(dividedSize)
}

export function computeHeightRatio(size, orientation = {}) {
	if (orientation.isPortrait) {
		const deviceHeightPercent = Dimensions.get('window').height / 100
		const dividedSize = deviceHeightPercent * (size / ratio)

		return PixelRatio.roundToNearestPixel(dividedSize)
	}

	if (orientation.isLandscape) {
		const deviceHeightPercent = Dimensions.get('window').height / 100
		const dividedSize = deviceHeightPercent * (size / ratio)

		return PixelRatio.roundToNearestPixel(dividedSize)
	}

	const deviceHeightPercent = Dimensions.get('window').height / 100
	const dividedSize = deviceHeightPercent * (size / ratio)

	return PixelRatio.roundToNearestPixel(dividedSize)
}

export function computePixelRatio(size) {
	return PixelRatio.roundToNearestPixel(size)
}
