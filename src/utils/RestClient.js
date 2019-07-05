import axios from 'axios'
import Promise from 'bluebird'
import AsyncStorage from '@react-native-community/async-storage'
import base64 from 'base-64'

async function getAuthorization() {
	const value = await AsyncStorage.getItem('Authorization')
	let response
	if (value !== null) {
		response = JSON.parse(value)
	}

	return response
}

export const get = (path, config = {}) =>
	new Promise((resolve, reject) => {
		getAuthorization()
			.then(Authorization => {
				const payload = Object.assign(config, {
					headers: {
						'Content-Type': 'application/json;charset=UTF-8',
						Authorization: `Basic ${base64.encode(
							`${Authorization.username}:${Authorization.password}`
						)}`,
					},
				})

				axios
					.get(path, payload)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
			.catch(error => {
				reject(error)
			})
	})

export const getWithoutAuth = (path, config = {}) =>
	new Promise((resolve, reject) => {
		const payload = Object.assign(config, {
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
			},
		})

		axios
			.get(path, payload)
			.then(response => {
				resolve(response)
			})
			.catch(error => {
				reject(error)
			})
	})

export const postWithoutAuth = (path, body, config = {}) =>
	new Promise((resolve, reject) => {
		const payload = Object.assign(config, {
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
			},
		})

		axios
			.post(path, body || {}, payload)
			.then(response => {
				resolve(response)
			})
			.catch(error => {
				reject(error)
			})
	})

export const post = (path, body, config = {}) =>
	new Promise((resolve, reject) => {
		getAuthorization()
			.then(Authorization => {
				const payload = Object.assign(config, {
					headers: {
						'Content-Type': 'application/json;charset=UTF-8',
						Authorization: `Basic ${base64.encode(
							`${Authorization.username}:${Authorization.password}`
						)}`,
					},
				})

				axios
					.post(path, body || {}, payload)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
			.catch(error => {
				reject(error)
			})
	})

export const put = (path, body, config = {}) =>
	new Promise((resolve, reject) => {
		getAuthorization()
			.then(Authorization => {
				const payload = Object.assign(config, {
					headers: {
						'Content-Type': 'application/json;charset=UTF-8',
						Authorization: `Basic ${base64.encode(
							`${Authorization.username}:${Authorization.password}`
						)}`,
					},
				})

				axios
					.put(path, body || {}, payload)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
			.catch(error => {
				reject(error)
			})
	})

export const patch = (path, body, config = {}) =>
	new Promise((resolve, reject) => {
		getAuthorization()
			.then(Authorization => {
				const payload = Object.assign(config, {
					headers: {
						'Content-Type': 'application/json;charset=UTF-8',
						Authorization: `Basic ${base64.encode(
							`${Authorization.username}:${Authorization.password}`
						)}`,
					},
				})

				axios
					.patch(path, body || {}, payload)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
			.catch(error => {
				reject(error)
			})
	})

export const _delete = (path, config = {}) =>
	new Promise((resolve, reject) => {
		getAuthorization()
			.then(Authorization => {
				const payload = Object.assign(config, {
					headers: {
						'Content-Type': 'application/json;charset=UTF-8',
						Authorization: `Basic ${base64.encode(
							`${Authorization.username}:${Authorization.password}`
						)}`,
					},
				})

				axios
					.delete(path, payload)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
			.catch(error => {
				reject(error)
			})
	})
