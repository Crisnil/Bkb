import { Platform, StyleSheet } from 'react-native'

export default StyleSheet.create({
	accessory: {
		width: 24,
		height: 24,
		justifyContent: 'center',
		alignItems: 'center',
	},

	overlay: {
		...StyleSheet.absoluteFillObject,
	},

	picker: {
		backgroundColor: 'rgba(255, 255, 255, 1.0)',
		borderRadius: 2,

		position: 'absolute',

		...Platform.select({
			ios: {
				shadowRadius: 2,
				shadowColor: 'rgba(0, 0, 0, 1.0)',
				shadowOpacity: 0.54,
				shadowOffset: { width: 0, height: 2 },
			},

			android: {
				elevation: 2,
			},
		}),
	},

	item: {
		textAlign: 'left',
	},

	scroll: {
		flex: 1,
		borderRadius: 2,
	},

	scrollContainer: {
		paddingVertical: 8,
	},
})
