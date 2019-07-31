import call from 'react-native-phone-call'
import _ from "lodash";

export const dial = (tel=null,prompt = true) =>{
    const args= {
        number : !_.isNull(tel) ? `${tel}` : '*143#',
        promt:prompt
    }
    call(args).catch(console.error)
}