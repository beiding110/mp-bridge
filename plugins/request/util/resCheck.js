import { removeToken } from '@/assets/js/token';
import store from '@/store/index.js';

import util from './util';
import {showMsgBox} from '@/assets/js/message.js';

const LOGIN_URL = '/pages/login/login';

export default function(obj, settings, callback){
    var innerCallback = callback,
        switchObj;

    if (arguments.length === 2) {
        innerCallback = settings;
    }

    switchObj = {
        'v': function() {
            innerCallback && innerCallback(obj.tdata, obj);
            return [obj.tdata, obj];
        },
        'pglist': function() {
            innerCallback && innerCallback(obj);

            return [obj];
        },
        'valerror': function() {
            if (obj.msg) {
                showMsgBox(obj.msg, function(){});
            }

            util.throwError({settings, obj});
            return false;
        },
        'login-index': function() {
            showMsgBox(obj.msg, function(){
                removeToken();
				store.commit('clearUserInfoData');

                uni.navigateTo(LOGIN_URL);
            });

            return false;
        },
        'jump-url': function () {
            showMsgBox(obj.msg, function () {
                uni.navigateTo(obj.url);
            });
            return false;
        },
        'wechat': function() {
            var url = obj.url;

            if (obj.url) {
                uni.navigateTo(url);
            }

            return false;
        },
        'error': function() {
            showMsgBox(obj.msg, function(){});

            util.throwError({settings, obj});
            return false;
        }
    };

    return switchObj[obj.code]
        ? switchObj[obj.code]()
        : (/^(throw-)/.test(obj.code)
            ? (function(){
                obj.code = obj.code.split('throw-')[1];
                innerCallback && innerCallback(obj);
            }())
            : (function() {
                showMsgBox.call(this, obj.msg, function () {});
                util.throwError({
                    settings,
                    obj,
                    msg: 'unexpeted ajaxResCheck code'
                });
            }())
        );
}
