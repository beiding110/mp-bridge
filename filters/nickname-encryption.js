/**
 * 格式化日期
 * @param {Object} time 日期字符串
 */
function nickNameEnc (name) {
	if (!name) {
		return '-';
	}
	
	var front = name.slice(0, 3),
		behind = name.slice(7, 11);
		
	return `${front}****${behind}`;
}

export default nickNameEnc;