import AsyncStorage from '@react-native-community/async-storage'
import _ from 'lodash'
import * as RestClient from '../utils/RestClient'
import * as Config from '../config/Config'

export default {
    namespace: 'service',
    state: {
        srs:[],
        srCategory:[],
        loading: false,
    },
    reducers: {
        srsReceived(state, { payload }) {
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
        requestCategory: [
            function*({ payload }, { put }) {
                console.log("called");
                yield put({ type: 'loadStart' });

                try {
                    const responseproblem =  yield RestClient.get(
                        `${Config.DEFAULT_URL}/service_request_problem/`,
                        {timeout:5000}
                    )
                   // console.log("responseproblem",responseproblem);

                    yield put({ type: 'srsReceived', payload:{srCategory:responseproblem.data}});

                } catch (error) {
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
        serviceRequestList: [
            function*({ payload }, { put }) {

                yield put({ type: 'loadStart' });

                try {
                    const responseSr =  yield RestClient.post(
                        `${Config.DEFAULT_URL}/get_sr_list/`,
                        {filterBy:'all',
                             }
                    )
                   // console.log("responseSr",responseSr);


                    yield put({ type: 'srsReceived', payload:{srs:responseSr.data}});

                } catch (error) {
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

        *serviceRequestSuccess({ payload }, { put }) {
            console.log("on sr",payload);
            try {

                const serviceRequest = yield RestClient.get(`${Config.DEFAULT_URL}/sr_request/`)

                console.log("after sr",serviceRequest);

                // yield put({
                //     type: 'accountReceived',
                //     payload: { account: account.data,isAuthenticated:true },
                // })

                if ( payload.callback)  payload.callback(true)

            } catch (error) {
                const parsedError = JSON.parse(JSON.stringify(error))

            }
            yield put({ type: 'loadEnd' });
        },

        submitRequest: [
            function*({ payload }, { put }) {
                console.log("on sr",payload);

                yield put({ type: 'loadStart' })

                //const serviceRequest =  yield RestClient.post(`${Config.DEFAULT_URL}/sr_request`,payload)

                //console.log("after sr",serviceRequest);
                yield put({ type: 'loadEnd'})

                if ( payload.callback)  payload.callback(true);
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
                        dataResult.account = res.data;
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
