import qs from 'qs';

import { getToken, } from '@/assets/js/token';
import CONFIG from '@/config/index.js'

const REQUEST_HREF = CONFIG.requestHead;

/**
 * 请求拦截器
 * @param {Object} config 请求参数
 * @returns
 */
export default function request(config) {
    const TOKEN = getToken();

    var { url, fztype, data, success, complete, type, method } = config,
        ts = new Date().getTime(),
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        };
	
	// #ifndef H5
	headers.Cookie = TOKEN;
	// #endif

    if (method) {
        type = method;
    }

    if (REQUEST_HREF) {
        url = REQUEST_HREF + url;
    }

    url = /\?/.test(url) ? url + '&t_ignore=' + ts : url + '?t_ignore=' + ts;

    if (type === 'post') {
        if (fztype) {
            headers['Content-Type'] = 'application/json;charset=UTF-8';
            data = JSON.stringify(data);
        } else {
            data = qs.stringify(data);
        }
    }

    success = success || function () {};
    complete = complete || function () {};

    type = type || 'get';

    return {
        ...config,
        url,
        data,
        headers,
        type,
        fztype,
        success,
        complete,
    };
}
