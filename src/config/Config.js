import _ from 'lodash'

let host = null
let targetRoutePath = 'Main'
const invalidHosts = ['http://undefined', 'http://null', 'https://undefined', 'https://null']

export const DEFAULT_URL = 'http://203.76.173.58/node/bkb_node_server'
export const CALLBKB = '*143#'
export const setTargetRoute = route => {
	targetRoutePath = route
}

export const getTargetRoute = () => targetRoutePath

export const setHost = url => {
	host = url
}

export const getHost = () => {
	if (
		(host || '').startsWith('172') ||
		(host || '').startsWith('192') ||
		(host || '').startsWith('localhost')
	) {
		return `http://${host}`
	}
	return `https://${host}`
}

export function isValidURL() {
	return _.indexOf(invalidHosts, getHost()) === -1
}
