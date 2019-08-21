
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
        requestCategory: [
            function*({payload}, { put }) {

                yield put({ type: 'loadStart' });

                try {
                    const responseproblem =  yield RestClient.get(
                        `${Config.DEFAULT_URL}/service_request_problem/`,
                        {timeout:5000}
                    );
                    console.log("responseproblem",responseproblem);

                    yield put({ type: 'srsReceived', payload:{srCategory:responseproblem.data}});

                } catch (error) {
                    const parsedError = JSON.parse(JSON.stringify(error))

                    console.log("error",parsedError)

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
                    console.log("responseSrlist",responseSr);
                    yield put({ type: 'srsReceived', payload:{srs:responseSr.data}});

                } catch (error) {
                    const parsedError = JSON.parse(JSON.stringify(error))

                    console.log("error", parsedError)

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
        submitRequest: [
            function*({ payload }, { put }) {

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
