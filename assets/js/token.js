const TOKEN_NAME = 'Cookie';

const REG_COOKIE_STR = /([^;]+);?/,
	REG_COOKIE_EXPIRES = /Expires=([\s\S]+)( GMT)(;?)/,
	REG_COOKIE_NAME = /([\S]+)=/;

/**
 * 获取存储的列表，仅内部使用
 */
function _getToken() {
	var list = uni.getStorageSync(TOKEN_NAME);
	
	return list || [];
}

/**
 * 获取复核条件的token数据
 */
export function getToken() {
	var currentTime = new Date().getTime();
	
	var list = _getToken(),
		tokenList = list.reduce((arr, item) => {
			var itemTime = new Date(item.expires).getTime();
			
			if (itemTime < currentTime) {
				// 已过期
				return arr;
			}
			
			arr.push(item.value);
			
			return arr;
		}, []);
		
	return tokenList.join('; ');
}

/**
 * @param {String} token 需要存储的token数据
 */
export function setToken(token) {
	var value = REG_COOKIE_STR.exec(token);
	
	if (!value) {
		return;
	}
	
	var valStr = value[1], // cookie 键值对
		name = REG_COOKIE_NAME.exec(valStr)?.[1], // cookie 键名
		expires = REG_COOKIE_EXPIRES.exec(token)?.[1], // cookie expires
		currentToken = _getToken(),
		existedIndex = currentToken.findIndex(item => item.name === name),
		item = {
			name,
			value: valStr,
			expires,
		};
		
	if (~existedIndex) {
		// 存在,更换当前值
		currentToken.splice(existedIndex, 1, item);
	} else {
		// 不存在,插入值
		currentToken.push(item);
	}
	
	console.log(currentToken);
	
	return uni.setStorageSync(TOKEN_NAME, currentToken);
}

/**
 * 清空token数据
 */
export function removeToken() {
    uni.removeStorageSync(TOKEN_NAME);

    return true;
}

export var tokenName = TOKEN_NAME;