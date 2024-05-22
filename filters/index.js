import timeFrom from './time-from.js';
import nickNameEnc from './nickname-encryption.js';
import dateTime from './date-time.js';

export default {
    install: function(Vue){
        Vue.filter('timeFrom', timeFrom);
		Vue.filter('nickNameEnc', nickNameEnc);
		Vue.filter('dateTime', dateTime);
    }
}