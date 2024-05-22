/**
 * 格式化日期
 * @param {Object} time 日期字符串
 */
function timeFrom (time) {
	if(!time) return '-';
	
	if (typeof time === 'string') {
		time = time.replace(/\-/g, '/');
	}
	
	var oldtime = new Date(time),
		now = new Date(),
		delta = 0,
		oldtime_s,
		now_s,
		returnVal;

	oldtime_s = oldtime.getTime();
	now_s = now.getTime();
	delta = now_s - oldtime_s;

	if(delta / (1000 * 60 * 60) < 1) {
		//小于1h；
		return Math.ceil(delta / (1000 * 60)) + '分钟前';
	} else if(delta / (1000 * 60 * 60 * 24) < 1) {
		//小于1天
		return Math.ceil(delta / (1000 * 60 * 60)) + '小时前';
	} else if(delta / (1000 * 60 * 60 * 24 * 7) < 1) {
		//小于7天
		return Math.ceil(delta / (1000 * 60 * 60 * 24)) + '天前';
	} else if(oldtime.getFullYear() === now.getFullYear()) {
		//同年
		return oldtime.Format('MM-dd');
	}
	
	return oldtime.Format('yyyy-MM-dd');
}

export default timeFrom;