import React from 'react'

import dva from './utils/dva'
import Router from './router'

import authModel from './models/auth'
import serviceModel from './models/service'


const app = dva({
    initialState: {},
    models: [
        authModel,
        serviceModel
    ],
})

const App = app.start(<Router />)

export default App
