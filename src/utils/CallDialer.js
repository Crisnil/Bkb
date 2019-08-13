import call from 'react-native-phone-call'
import _ from "lodash";

export const dial = (tel,prompt) =>{
    const args= {
        number : !_.isEmpty(tel) ? `${tel}` : '*143#',
        promt: !_.isEmpty(prompt)? prompt : false
    }
    call(args).catch(console.error)
}