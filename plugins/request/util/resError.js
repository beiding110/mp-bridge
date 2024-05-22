import util from './util';
import {showMsgBox} from '@/assets/js/message.js';

var switchObj = {
    0: {message: '请求发生错误，请检查网络及登录状态',},

    301: {message: '永久移动。新地址输入到 Location 头中',},
    304: {message: '未修改',},

    401: {message: '访问被拒绝',},
    403: {message: '禁止访问',},
    404: {message: '未找到',},
    405: {message: '方法不被允许',},
    406: {message: '客户端浏览器不接受所请求页面的MIME类型',},
    407: {message: '要求进行代理身份验证',},
    408: {message: '请求超时',},
    410: {message: '接口已过期',},
    412: {message: '前提条件失败',},
    413: {message: '请求实体太大',},
    414: {message: '请求URI太长',},
    415: {message: '不支持的媒体类型',},
    416: {message: '所请求的范围无法满足',},
    417: {message: '执行失败',},
    423: {message: '锁定的错误',},

    500: {message: '服务器错误',},
    502: {message: 'Web服务器用作网关或代理服务器时收到了无效响应',},
    503: {message: '服务不可用',},
    504: {message: '请求超时，请检查网络',},
};

export default function (XHR, settings) {
    var { data, statusCode, responseJSON } = XHR,
        res = {},
        mapped = switchObj[statusCode] || {};

    if (responseJSON) {
        res = responseJSON;
    } else if (data) {
        res = data;
    }

    if (mapped.handler) {
        mapped.handler(res);
    } else {
        let msg = mapped.message ? `${statusCode}: ${mapped.message}` : '请求失败，请重试',
            resMsg = res.msg;

        showMsgBox(resMsg || msg);

        settings.error && settings.error();
    }

    util.throwError({
        settings,
        obj: XHR,
        msg: 'ajax-error',
    });
}
