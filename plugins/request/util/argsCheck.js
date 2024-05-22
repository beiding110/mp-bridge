/**
 * 格式化请求参数
 * @param {String} a 请求地址
 * @param {Object|Function} b 参数或回调
 * @param {Function|Boolean} c 回调或复杂提交
 * @param {Boolean} d 复杂提交
 * @returns 
 */
export default function argsCheck(a, b, c, d) {
    var obj = {
            url: a,
            data: {},
            success: function () {},
            fztype: false,
        },
        args = [];

    args.push.apply(args, arguments);
    args = args.filter((item) => item);

    if (args.length === 2 && typeof b === 'function') {
        obj.success = b;
    } else if (args.length === 2 && typeof b !== 'function') {
        obj.data = b;
    } else if (args.length === 3) {
        if (typeof args[args.length - 1] === 'boolean') {
            obj.data = b;
            obj.fztype = c;
        } else {
            obj.data = b;
            obj.success = c;
        }
    } else if (args.length === 4) {
        obj.data = b;
        obj.success = c;
        obj.fztype = d;
    }

    return obj;
}