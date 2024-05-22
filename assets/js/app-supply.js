import Vue from 'vue'

import {showMsgBox, showMsg, showConfirm,} from './message.js';
import CONFIG from '../../config/index.js';

(function (owner) {
	/**
	 * @param {String} content 提示内容
	 * @param {Funciton} confirm 点击确认后的回调
	 */
	owner.showMsgBox = showMsgBox;
	
	/**
	 * @param {String} content 提示内容
	 * @param {String} type 提示倾向
	 */
	owner.showMsg = showMsg;
	
	/**
	 * @param {String} content 提示内容
	 * @param {Function} confirm 点击确认后的回调
	 * @param {Function} cancel 点击取消后的回调
	 */
	owner.showConfirm = showConfirm;
	
	/**
	     * 获取路由中参数
	     * @param  {String} key 参数关键字
	     * @return {String}     获取到的参数
	     */
	    owner.getQuery = function (key) {
			if (this.$route) {
				if (key) {
				    return this.$route.query[key];
				} else {
				    return this.$route.query;
				};
			}
			
			// 非h5端，使用$root中存储的变量
			
			// if (key) {
			// 	return this.$root.rQuery[key];
			// } else {
			// 	return this.$root.rQuery;
			// }
			
			var fullPath = this.$root.$scope.$page.fullPath;
			
			var strQuery = fullPath.split('?')[1];
			
			if (!strQuery) {
				return key ? '' : {};
			}
			
			var kvs = strQuery.split('&'),
				queryMap = kvs.reduce((obj, item) => {
					let kv = item.split('='),
						key = kv[0],
						value = kv[1];
						
					obj[key] = decodeURIComponent(value);
					
					return obj
				}, {});
				
			if (key) {
				return queryMap[key];
			} else {
				return queryMap;
			}
	    };
	
    /**
     * 获取$store.getters中的变量
     * @param  {key} key 变量关键字
     * @return {all}     获取到的变量
     */
    owner.getGetters = function (key) {
        return this.$store.getters[key] || false;
    };

    /**
     * 跳转（有历史记录）
     * @return {null} 无返回值
     */
    owner.goto = function () {
        var args = [...arguments];
		
		if (typeof args[0] === 'string') {
			// fn(url)
			
			uni.navigateTo({
				url: args[0],
			});
		}
		
		if (typeof args[0] === 'object') {
			// fn({path: '', query: {}})
			
			var path = args[0].path,
				query = args[0].query,
				queryStr = '',
				url = '';
			
			if (typeof query === 'object') {
				Object.keys(query).forEach((key, index) => {
					if (index === 0) {
						queryStr += `${key}=${query[key]}`;
					} else {
						queryStr += `&${key}=${query[key]}`;
					}
				});
				
				url = `${path}?${queryStr}`;
			} else {
				url = path;
			}
			
			uni.navigateTo({
				url,
			});
		}
    };

    /**
    * 生成表单校验规则
    * @return {Object} 生成的校验规则
    */
    owner.newRule = function () {
        let arg = [], rules = [];
        arg = Array.prototype.slice.apply(arguments);
        let label = arg.splice(0, 1),
            changeState = false;

        const typeMap = {
            string: '字符串',
            number: '数字',
            boolean: '布尔',
            method: '方法',
            regexp: '正则',
            integer: 'integer',
            float: '浮点数',
            array: '数组',
            object: '对象',
            enum: 'enum',
            date: '日期',
            url: 'url地址',
            hex: '哈希',
            email: '电子邮件',
            // ucc: '社会统一信用代码',
        }

        arg.forEach(function (item) {
            if (item === 'change') {
                changeState = true;
            }

            if (item === 'required') {
                rules.push.apply(rules, [{
                    required: true,
                    message: '请输入' + label,
                    trigger: ['blur']
                }, {
                    validator(rules, value, callback) {
                        if (typeof value === 'string') {
                            if (!value.replace(/^\s+|\s+$/g, "")) {
                                return callback(new Error('内容不能为空格'))
                            }
                        }
                        callback();
                    },
                    trigger: ['blur']
                }])
            };

            if (/min/.test(item)) {
                let length = item.split('min')[1];
                rules.push({
                    min: parseInt(length),
                    message: '至少输入' + length + '个字符',
                    trigger: 'blur'
                });
            };

            if (/max/.test(item)) {
                let length = item.split('max')[1];
                rules.push({
                    max: parseInt(length),
                    message: '至多输入' + length + '个字符',
                    trigger: ['blur']
                });
            };

            if (item === 'mobile') {
                rules.push({
                    validator(rules, value, callback) {
                        if (!/^[1][0-9]{10}$/.test(value)) {
                            return callback(new Error('手机号格式错误'));
                        }
                        callback();
                    },
                    trigger: ['blur']
                })
            };

            if (item === 'ucc') {
                rules.push({
                    validator(rules, value, callback) {
                        var patrn = /^[0-9A-Z]+$/;

                        if ((value.length != 18) || !patrn.test(value)) {
                            return callback(new Error('不是有效的统一社会信用代码'));
                        } else {
                            var Ancode;//统一社会信用代码的每一个值
                            var Ancodevalue;//统一社会信用代码每一个值的权重 
                            var total = 0;
                            var weightedfactors = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28];//加权因子 
                            var str = '0123456789ABCDEFGHJKLMNPQRTUWXY';

                            //不用I、O、S、V、Z 
                            for (var i = 0; i < value.length - 1; i++) {
                                Ancode = value.substring(i, i + 1);
                                Ancodevalue = str.indexOf(Ancode);
                                total = total + Ancodevalue * weightedfactors[i];
                                //权重与加权因子相乘之和 
                            }
                            var logiccheckcode = 31 - total % 31;
                            if (logiccheckcode == 31) {
                                logiccheckcode = 0;
                            }
                            var Str = "0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,J,K,L,M,N,P,Q,R,T,U,W,X,Y";
                            var Array_Str = Str.split(',');
                            logiccheckcode = Array_Str[logiccheckcode];


                            var checkcode = value.substring(17, 18);
                            if (logiccheckcode != checkcode) {
                                return callback(new Error('不是有效的统一社会信用代码'));
                            };
                        };

                        callback();
                    },
                    trigger: ['blur', 'change']
                })
            };

            if (item === 'idcard') {
                rules.push({
                    validator(rules, value, callback) {
                        if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)) {
                            return callback(new Error('身份证号格式错误'));
                        }
                        callback();
                    },
                    trigger: ['blur']
                });
            }

            Object.keys(typeMap).forEach(function (key, index) {
                if (item === key) {
                    rules.push({
                        type: key,
                        message: '请输入正确的' + typeMap[key] + '格式',
                        trigger: ['blur']
                    })
                }
            });
        });

        if (changeState) {
            rules.forEach((item) => {
                item.trigger.push('change');
            })
        }

        return rules
    }

	/**
	 * 将信息存储至storage
	 */
	owner.setStorage = function() {
		var args = [...arguments],
			arg1 = args[0];
			
		if (typeof arg1 === 'object') {
			// fn({key: value})
			
			Object.keys(arg1).forEach(key => {
				uni.setStorageSync(key, arg1[key]);
			});
		}
		
		if (typeof arg1 === 'string') {
			// fn(key, value)
			uni.setStorageSync(arg1, args[0]);
		}
	};
	
	/**
	 * @param {Object} key Storage中存储的键名
	 * 获取storage中存储的数据
	 */
	owner.getStorage = function (key) {
		return uni.getStorageSync(key);
	}
	
	owner.toSearch = function (obj, flag) {
		var res = '?';
		
		if (typeof obj == 'object' && Array.isArray(obj)) {
			obj.forEach(function (item, index) {
				res += ('[' + index + ']=' + owner.toSearch(item, true) + '&');
			});
		} else if (typeof obj == 'object') {
			Object.keys(obj).forEach(function (key) {
				if (typeof obj[key] == 'object' && Array.isArray(obj[key])) {
					obj[key].forEach(function (item, index) {
						res += (key + '[' + index + ']=' + owner.toSearch(item, true) + '&')
					});
				} else if (typeof obj[key] == 'object' && obj[key] != null) {
					res += (owner.toSearch(obj[key], true) + '&');
				} else {
					var item = /[\u3220-\uFA29]/.test(obj[key]) ? escape(obj[key]) : obj[key];
					res += (key + '=' + (item || '') + '&');
				}

			});
		} else {
			return obj;
		}
		return !!flag ? res.slice(1, -1) : res.slice(0, -1);
	}
	
	/**
	 * 获取扫码进入的页面的地址参数；
	 * @param {String} key 地址栏中的key
	 */
	owner.getQueryFromQrcode = function(key) {
		// #ifdef H5		
		return owner.getQuery.call(this, key);
		// #endif
		
		// #ifdef MP-WEIXIN
		var q = owner.getQuery.call(this, 'q');
		
		if (!q) {
			return false;
		}
		
		q = decodeURIComponent(q);
		
		if (!key) {
			return q;
		}
		
		var reg = new RegExp(`(\\?|^|&)${key}=([^&]*)(&|$)`),
			matched = q.match(reg);
			
		if (!matched) {
			return false;
		}
		
		return matched[2];
		// #endif
	}

	/**
	 * 根据环境自动构建资源路径
	 * 当资源存放于服务器时使用该方法
	 * @param {String} url 静态资源路径，即static/xxx
	 * @returns String 构建后的资源路径
	 */
	owner.bulidUrl = function(url) {
		// #ifdef H5		
		return url;
		// #endif

		// #ifndef H5		
		return `${CONFIG.assetsUrl}${url}`;
		// #endif
	}
})(Vue.prototype)
