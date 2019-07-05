import React from 'react'
import { create } from 'dva-core'
import { Provider } from 'react-redux'

export default function(options) {
	const app = create(options)

	if (!global.registered) options.models.forEach(model => app.model(model))
	global.registered = true

	app.start()

	app.start = container => () => <Provider store={app._store}>{container}</Provider>

	return app
}
