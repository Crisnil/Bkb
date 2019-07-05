import AsyncStorage from '@react-native-community/async-storage'
import _ from 'lodash'
import * as RestClient from '../utils/RestClient'
import * as Config from '../config/Config'

export default {
    namespace: 'auth',
    state: {
        account: {},
        isAuthenticated: false,
        serverVersion: '0.0.0',
        loading: false,
    },
    reducers: {
        accountReceived(state, { payload }) {
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
            }
        },
        serverVersionReceived(state, { payload }) {
            return {
                ...state,
                ...payload,
            }
        },
        loadStart(state, { payload }) {
            return { ...state, ...payload, loading: true }
        },
        loadEnd(state, { payload }) {
            return { ...state, ...payload, loading: false }
        },
    },
    effects: {
        getServerVersion: [
            function*({ payload }, { put }) {
                try {
                    const serverVersion = yield RestClient.getWithoutAuth(
                        `${Config.getHost()}/api/public/version`,
                        {
                            timeout: 5000,
                        }
                    )

                    yield put({
                        type: 'serverVersionReceived',
                        payload: { serverVersion: serverVersion.data },
                    })

                    payload.callback(false)
                } catch (error) {
                    const parsedError = JSON.parse(JSON.stringify(error))

                    console.log('error getServerVersion', error)
                    console.log('error getServerVersion', parsedError)

                    if (_.get(parsedError, 'response.data')) {
                        payload.callback(true, parsedError.response.data.message)
                    } else {
                        payload.callback(true, null)
                    }
                }
            },
            { type: 'takeLatest' },
        ],
        login: [
            function*({ payload }, { put }) {
                yield put({ type: 'loadStart' })

                try {
                    yield RestClient.get(`${Config.getHost()}/api/authentication`, {
                        timeout: 5000,
                    })

                    yield put({ type: 'loginSuccess', payload })
                } catch (error) {
                    const parsedError = JSON.parse(JSON.stringify(error))

                    console.log(parsedError)

                    if (_.get(parsedError, 'response.data')) {
                        payload.callback(false, parsedError.response.data.message)
                    } else {
                        payload.callback(false, null)
                    }
                }

                yield put({ type: 'loadEnd' })
            },
            { type: 'takeLatest' },
        ],
        signature: [
            function*({ payload, origin, callback }, { put }) {
                yield put({ type: 'loadStart' })

                try {
                    yield RestClient.postWithoutAuth(
                        `${origin}/api/public/uploadsignaturedata`,
                        payload
                    )

                    callback()
                } catch (error) {
                    const parsedError = JSON.parse(JSON.stringify(error))
                    console.log(error)
                    console.log('error signature', parsedError)
                }

                yield put({ type: 'loadEnd' })
            },
            { type: 'takeLatest' },
        ],
        loginSuccess: [
            function*({ payload }, { put }) {
                try {
                    const account = yield RestClient.get(`${Config.getHost()}/api/account`)

                    yield put({
                        type: 'accountReceived',
                        payload: { account: account.data },
                    })

                    yield AsyncStorage.setItem('login', account.data.login).then(() => {
                        if (!account.data.active) {
                            payload.callback(
                                false,
                                'Account is inactive. Please login to HISD3 site with your temporary password to activate.'
                            )
                        } else {
                            payload.callback(true)
                        }
                    })
                } catch (error) {
                    const parsedError = JSON.parse(JSON.stringify(error))

                    yield AsyncStorage.removeItem('login').then(() => {
                        if (_.get(parsedError, 'response.data')) {
                            payload.callback(false, parsedError.response.data.message)
                        } else {
                            payload.callback(false, null)
                        }
                    })
                }
            },
            { type: 'takeLatest' },
        ],
        logout: [
            function*({ payload }, { put }) {
                yield put({ type: 'loadStart' })

                yield RestClient.get(`${Config.getHost()}/api/logout`)

                yield AsyncStorage.removeItem('Authorization').then(() => {
                    AsyncStorage.removeItem('login')
                })

                yield put({ type: 'loadEnd', payload: { account: payload } })
            },
            { type: 'takeLatest' },
        ],
    },
}
