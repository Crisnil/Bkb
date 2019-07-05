import React from 'react'
import PropTypes from 'prop-types'
import { Platform, ViewPropTypes } from 'react-native'
import Svg from 'react-native-svg'
import Svgs from './Svgs'

export default class Icon extends React.PureComponent {
	render() {
		const { fill, fillRule, height, name, stroke, strokeWidth, style, width } = this.props

		if (!name) {
			return null
		}

		const svgItem = Svgs[`${name}.${Platform.OS}`] || Svgs[name]

		if (!svgItem) {
			return null
		}

		return (
			<Svg height={height} width={width} viewBox={svgItem.viewBox} style={style}>
				{React.cloneElement(svgItem.svg, {
					fill: fill,
					fillRule: fillRule,
					stroke: stroke,
					strokeWidth: strokeWidth,
				})}
			</Svg>
		)
	}
}

Icon.propTypes = {
	fill: PropTypes.string,
	fillRule: PropTypes.string,
	height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
	name: PropTypes.string.isRequired,
	stroke: PropTypes.string,
	strokeWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	style: PropTypes.oneOfType([ViewPropTypes.style, PropTypes.array, PropTypes.object]),
	width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
}

Icon.defaultProps = {
	fill: '#2c3e50',
	fillRule: 'evenodd',
	stroke: '#2c3e50',
	strokeWidth: '0',
	style: {},
}
