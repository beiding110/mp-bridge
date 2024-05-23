import CONFIG from '../../config/index.js';

/**
 * 根据环境自动构建资源路径
 * 当资源存放于服务器时使用该方法
 * @param {String} url 静态资源路径，即static/xxx
 * @returns String 构建后的资源路径
 */
export default function(url) {
	// #ifdef H5		
	return url;
	// #endif

	// #ifndef H5		
	return `${CONFIG.assetsUrl}${url}`;
	// #endif
}