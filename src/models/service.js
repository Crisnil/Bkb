
import _ from 'lodash'
import * as RestClient from '../utils/RestClient'
import * as Config from '../config/Config'

export default {
    namespace: 'service',
    state: {
        srs:[],
        srCategory:[],
        loading: false,
        selected:{}
    },
    reducers: {
        srsReceived(state, { payload }) {
            return {
                ...state,
                ...payload
            }
        },
        onSelectReceived(state, { payload }) {
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
        onLoad:[
          function*({ payload },{ put }){
              yield put({ type: 'loadStart' });
          }
        ],
        onLoadSuccess:[
            function*({ payload },{ put }){
                yield put({ type: 'loadEnd' });
            }
        ],
        onSelect:[
            function*({ payload },{ put }){

                yield put({ type: 'onSelectReceived', payload:{selected:payload.problem}});

                if (payload.callback){
                    payload.callback(true);
                }
            }
        ],
        clearSelection:[
            function*({ payload },{ put }){
                if(payload.clear) {
                    yield put({type: 'onSelectReceived', payload: {selected:{}}});
                }
                if (payload.callback){
                    payload.callback(true);
                }
            }
        ],
        requestCategory: [
            function*({payload}, { put }) {

                yield put({ type: 'loadStart' });

                try {
                    const responseproblem =  yield RestClient.get(
                        `${Config.DEFAULT_URL}/service_request_problem/`,
                        {timeout:5000}
                    );

                    yield put({ type: 'srsReceived', payload:{srCategory:responseproblem.data}});

                } catch (error) {
                    const parsedError = JSON.parse(JSON.stringify(error))

                    if (payload.callback){
                        if (!_.isEmpty(parsedError)) {
                            payload.callback(false, parsedError.message)
                        } else {
                            payload.callback(false, null)
                        }
                    }

                }

                yield put({ type: 'loadEnd' });
            },
            { type: 'takeLatest' },
        ],
        serviceRequestList: [
            function*({payload}, { put }) {

                yield put({ type: 'loadStart' });

                try {
                    const responseSr =  yield RestClient.post(
                        `${Config.DEFAULT_URL}/get_sr_list/`,
                        {filterBy:'all',
                             }
                    )

                    yield put({ type: 'srsReceived', payload:{srs:responseSr.data}});

                } catch (error) {
                    const parsedError = JSON.parse(JSON.stringify(error))



                    if (payload.callback){
                        if (!_.isEmpty(parsedError)) {
                            payload.callback(false, parsedError.message)
                        } else {
                            payload.callback(false, null)
                        }
                    }

                }
                yield put({ type: 'loadEnd' });

            },
            { type: 'takeLatest' },
        ],
        checkAccepted: [
            function*({ payload }, { put }) {
                console.log(payload)
                yield put({ type: 'loadStart' })
                try {
                    const checkTnc = yield RestClient.post(`${Config.DEFAULT_URL}/check_if_tnc_accepted`, {
                        problemid:payload.problemid
                    })
                    console.log("check", checkTnc);

                    if(checkTnc.data > 0 ){
                        payload.callback(true);
                    }else{
                        payload.callback(false);
                    }

                }catch(error){
                    console.log("checkerror", error);
                        payload.callback(false)
                }
                yield put({ type: 'loadEnd' })
            },
            { type: 'takeLatest' },
        ],
        acceptTnc: [
            function*({ payload }, { put }) {
                console.log("acceptTnc",payload)
                yield put({ type: 'loadStart' })
                try {
                    const acceptTnc = yield RestClient.post(`${Config.DEFAULT_URL}/accept_terms_condition`, {
                        problemid:payload.problemid
                    })

                        payload.callback(true);
                    console.log("acceptTnc", acceptTnc);

                }catch(error){
                    console.log("accepterror", error);
                    payload.callback(false)

                }
                yield put({ type: 'loadEnd' })
            },
            { type: 'takeLatest' },
        ],
        submitRequest: [
            function*({ payload }, { put }) {
                 console.log("service payload", payload);
                yield put({ type: 'loadStart' })

                try {
                    const serviceRequest = yield RestClient.post(`${Config.DEFAULT_URL}/sr_request`, payload)

                    console.log("after sr", serviceRequest);

                    if (payload.callback) payload.callback(true,serviceRequest.data.res);

                }catch(error){
                    const parsedError = JSON.parse(JSON.stringify(error))
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

    },
}
