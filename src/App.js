import React from 'react'

import dva from './utils/dva'
import Router from './router'

 import authModel from './models/auth'


const app = dva({
    initialState: {},
    models: [
        authModel
    ],
})

const App = app.start(<Router />)

export default App
