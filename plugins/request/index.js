import Vue from 'vue';

import { setToken } from '@/assets/js/token';

import argsCheck from './util/argsCheck.js';
import interceptorsReq from './util/interceptors-req.js';
import resCheck from './util/resCheck.js';
import resError from './util/resError.js';

function ajax(obj) {
	var settings = interceptorsReq(obj)
	
	uni.request({
		url: settings.url,
		data: settings.data,
		method: settings.type,
		header: settings.headers,
		success(res) {
			var {data, statusCode, header,} = res;
			
			if (statusCode !== 200) {
				resError(res, settings);
				
				return;
			}
			
			var reHeader = Object.keys(header).reduce((obj, key) => {
				obj[key.toLowerCase(key)] = header[key];
				
				return obj;
			}, {});
			
			if (reHeader['set-cookie']) {
				setToken(reHeader['set-cookie']);
			}
			
			resCheck(data, settings, settings.success);
		},
		complete: obj.complete,
		fail(XHR, textStatus) {
			resError(XHR, settings);
		},
	});
}

function get(a, b, c, d) {
	var settings = argsCheck(a, b, c, d);
	
	ajax({
		type: 'get',
		url: settings.url,
		data: settings.data,
		success: settings.success,
	});
}

function post(a, b, c, d) {
	var settings = argsCheck(a, b, c, d);
	
	ajax({
		type: 'post',
		url: settings.url,
		data: settings.data,
		success: settings.success,
		fztype: settings.fztype,
	});
}

Vue.prototype.$ajax = ajax;
Vue.prototype.$get = get;
Vue.prototype.$post = post;