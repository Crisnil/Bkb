import _ from 'lodash'

export function isInRole(role, rolesRepo) {
	return _.includes(rolesRepo || [], role)
}

export function isInAnyRole(roles, rolesRepo) {
	const data = _.isArray(roles) ? roles : []
	let found = false
	data.forEach(i => {
		if (isInRole(i, rolesRepo)) {
			found = true
		}
	})

	return found
}

export function requireAuthentication(Component, account, roles) {
	let rolesArray = []
	let authedComponent = Component
	if (typeof roles === 'string') {
		rolesArray.push(roles)
	}

	if (roles instanceof Array) {
		rolesArray = roles
	}

	const userRoles = account.roles

	if (userRoles == null || userRoles.length === 0) {
		authedComponent = null
	}

	if (rolesArray.length > 0) {
		if (rolesArray.length === 1) {
			if (!isInRole(rolesArray[0], userRoles)) {
				authedComponent = null
			}
		}
		if (!isInAnyRole(rolesArray, userRoles)) {
			authedComponent = null
		}
	}

	return authedComponent
}
