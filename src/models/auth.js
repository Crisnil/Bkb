import AsyncStorage from '@react-native-community/async-storage'
import _ from 'lodash'
import * as RestClient from '../utils/RestClient'
import * as Config from '../config/Config'

export default {
    namespace: 'auth',
    state: {
        account: {},
        isAuthenticated: false,
        loading: false,
    },
    reducers: {
        accountReceived(state, { payload }) {
            return {
                ...state,
                ...payload
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
        verify: [
            function*({ payload }, { put }) {

                yield put({ type: 'loadStart' });

                try {
                    const responseVerify =  yield RestClient.postWithoutAuth(
                        `${Config.DEFAULT_URL}/api/auth/verify_user/`,
                        payload
                    )
                    //console.log(responseVerify.data);

                    payload.customerid = responseVerify.data.data[0].customerid

                     yield put({ type: 'verifySuccess', payload});

                } catch (error) {

                    yield put({ type: 'loadEnd' });

                    const parsedError = JSON.parse(JSON.stringify(error))

                    console.log(parsedError)

                    if (_.get(parsedError, 'response.data')) {
                        payload.callback(false, parsedError.response.data.message)
                    } else {
                        payload.callback(false, null)
                    }
                }


            },
            { type: 'takeLatest' },
        ],
        verifySuccess: [
            function*({ payload }, { put }) {

                yield put({ type: 'loadStart' });

                try {
                    const responseSuccess =  yield RestClient.postWithoutAuth(
                        `${Config.DEFAULT_URL}/api/auth/register`,
                        payload
                    )
                    //console.log("reg",responseSuccess.data);

                    yield put({ type: 'loadEnd' });

                    payload.callback(true, null)

                } catch (error) {

                    yield put({ type: 'loadEnd' });

                    const parsedError = JSON.parse(JSON.stringify(error))

                    console.log(parsedError)

                    if (_.get(parsedError, 'response.data')) {
                        payload.callback(false, parsedError.response.data.message)
                    } else {
                        payload.callback(false, null)
                    }
                }


            },
            { type: 'takeLatest' },
        ],

        registerSuccess: [
            function*({ payload }, { put }) {

                yield put({ type: 'loadStart' });

                try {
                    const responseVerify =  yield RestClient.postWithoutAuth(
                        `${Config.DEFAULT_URL}/api/auth/auth/verify_user/`,
                        {payload }
                    )
                    //console.log(responseVerify.data);

                    const responseRegister =  yield RestClient.postWithoutAuth(
                        `${Config.DEFAULT_URL}/api/auth/auth/register/`,
                        {payload }
                    )

                    // yield put({ type: 'loginSuccess', payload});

                } catch (error) {
                    yield put({ type: 'loadEnd' });

                    const parsedError = JSON.parse(JSON.stringify(error))

                    console.log(parsedError)

                    if (_.get(parsedError, 'response.data')) {
                        payload.callback(false, parsedError.response.data.message)
                    } else {
                        payload.callback(false, null)
                    }
                }

                yield put({ type: 'loadEnd' });

            },
            { type: 'takeLatest' },
        ],

        login: [
            function*({ payload }, { put }) {

                yield put({ type: 'loadStart' });

                try {
                   const responseLongin =  yield RestClient.postWithoutAuth(
                            `${Config.DEFAULT_URL}/api/auth/login/`,
                       {username:payload.username,
                               password:payload.password }
                        )
                    console.log(responseLongin.data);

                    let token = _.clone(responseLongin.data.token);

                    yield AsyncStorage.setItem('token', token);

                    yield put({ type: 'loginSuccess', payload});

                } catch (error) {
                    yield put({ type: 'loadEnd' });
                    const parsedError = JSON.parse(JSON.stringify(error))

                    console.log(parsedError)

                    if (_.get(parsedError, 'response.data')) {
                        payload.callback(false, parsedError.response.data.message)
                    } else {
                        payload.callback(false, null)
                    }
                }

            },
            { type: 'takeLatest' },
        ],
        loginSuccess:[
            function*({ payload }, { put }) {
                try {

                    const account = yield RestClient.get(`${Config.DEFAULT_URL}/api/auth/checkauth/`)

                    yield put({
                        type: 'accountReceived',
                        payload: { account: account.data,isAuthenticated:true },
                    })

                    if ( payload.callback)  payload.callback(true)

                } catch (error) {
                    const parsedError = JSON.parse(JSON.stringify(error))

                    yield AsyncStorage.removeItem('token').then(() => {
                        if (_.get(parsedError, 'response.data')) {
                            payload.callback(false, parsedError.response.data.message)
                        } else {
                            payload.callback(false, null)
                        }
                    })
                }
                 yield put({ type: 'loadEnd' });
            },
            { type: 'takeLatest' },
        ],

        logout: [
            function*({ payload }, { put }) {
               //console.log("loging out");

                yield put({ type: 'loadStart' })

                yield RestClient.post(`${Config.DEFAULT_URL}/api/auth/logout`)

                yield AsyncStorage.removeItem('token');

                yield put({ type: 'loadEnd', payload: { account: {} ,isAuthenticated:false}})
            },
            { type: 'takeLatest' },
        ],

        checkAuth:[
        function*({ payload }, { put }) {

            yield put({type: 'loadStart'});

            try {
                let dataResult = {}
                const res = yield RestClient.get(`${Config.DEFAULT_URL}/api/auth/checkauth/`)
                //console.log("aftercheck",res);
                    if(res.data.err){
                        dataResult.account = {};
                        dataResult.isAuthenticated =false;
                    }else{
                        dataResult.account = res.data;
                        dataResult.isAuthenticated =true;
                    }

                yield put({
                    type: 'accountReceived',
                    payload: dataResult,
                })

                if (payload.callback) payload.callback(true)

            } catch (error) {
                const parsedError = JSON.parse(JSON.stringify(error));

                yield put({type: 'loadEnd', payload: {account: {}, isAuthenticated: false}})
            }
            yield put({type: 'loadEnd'});
        },
            { type: 'takeLatest' },
        ]
    },
}
