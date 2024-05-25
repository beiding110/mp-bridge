
const SCALE_NUM = 0.18;
	
function transformNum(num) {
	return (num ) * SCALE_NUM;
}

export default [
	{
		type: 'start',
		x: transformNum(4452),
		y: transformNum(6460),
		to: 'top',
	},
	{
		type: 'point',
		name: 'zhao-zhou-qiao',
		x: transformNum(4452),
		y: transformNum(5512),
	},
	{
		type: 'middle',
		x: transformNum(4452),
		y: transformNum(5312),
		to: 'right',
	},
	{
		type: 'middle',
		x: transformNum(4793),
		y: transformNum(5312),
		to: 'top',
	},
	{
		type: 'point',
		name: 'bai-lin-chan-si',
		x: transformNum(4793),
		y: transformNum(5112),
	},
	{
		type: 'middle',
		x: transformNum(4793),
		y: transformNum(4397),
		to: 'right',
	},
	{
		type: 'middle',
		x: transformNum(4903),
		y: transformNum(4397),
		to: 'top',
	},
	{
		type: 'point',
		name: 'fu-xing-da-jie',
		x: transformNum(4903),
		y: transformNum(4197),
	},
	{
		type: 'point',
		name: 'hu-tuo-he-te-da-qiao',
		x: transformNum(4903),
		y: transformNum(3297),
	},
	{
		type: 'middle',
		x: transformNum(4903),
		y: transformNum(2253),
		to: 'left',
	},
	{
		type: 'point',
		name: 'zheng-ding-cheng',
		x: transformNum(4103),
		y: transformNum(2253),
	},
	{
		type: 'middle',
		x: transformNum(3619),
		y: transformNum(2253),
		to: 'top',
	},
	{
		type: 'point',
		name: 'zheng-ding-ye-shi',
		x: transformNum(3619),
		y: transformNum(1622),
	},
	{
		type: 'middle',
		x: transformNum(3619),
		y: transformNum(1222),
		to: 'left',
	},
	{
		type: 'middle',
		x: transformNum(2185),
		y: transformNum(1222),
		to: 'bottom',
	},
	{
		type: 'point',
		name: 'tai-ping-he-xue-fu-qiao',
		x: transformNum(2185),
		y: transformNum(1944),
	},
	{
		type: 'middle',
		x: transformNum(2185),
		y: transformNum(2144),
		to: 'left',
	},
	{
		type: 'point',
		name: 'tai-ping-he-pian-qu',
		x: transformNum(1985),
		y: transformNum(2144),
	},
	{
		type: 'middle',
		x: transformNum(1734),
		y: transformNum(2144),
		to: 'bottom',
	},
	{
		type: 'middle',
		x: transformNum(1734),
		y: transformNum(2990),
		to: 'right',
	},
	{
		type: 'point',
		name: 'wan-li-miao',
		x: transformNum(2034),
		y: transformNum(2990),
	},
	{
		type: 'middle',
		x: transformNum(2922),
		y: transformNum(2990),
		to: 'bottom',
	},
	{
		type: 'point',
		name: 'da-shi-qiao',
		x: transformNum(2922),
		y: transformNum(3490),
	},
	{
		type: 'middle',
		x: transformNum(2922),
		y: transformNum(3858),
		to: 'left',
	},
	{
		type: 'point',
		name: 'zheng-tai-fan-dian',
		x: transformNum(2822),
		y: transformNum(3858),
	},
	{
		type: 'middle',
		x: transformNum(2478),
		y: transformNum(3858),
		to: 'bottom',
	},
	{
		type: 'middle',
		x: transformNum(2478),
		y: transformNum(4623),
		to: 'left',
	},
	{
		type: 'middle',
		x: transformNum(1597),
		y: transformNum(4623),
		to: 'bottom',
	},
	{
		type: 'point',
		name: 'gao-tie-pian-qu',
		x: transformNum(1597),
		y: transformNum(5423),
	},
	{
		type: 'point',
		name: 'cai-hong-kong-zhong-zou-lang',
		x: transformNum(1597),
		y: transformNum(5523),
	},
	{
		type: 'end',
		x: transformNum(1597),
		y: transformNum(6460),
		to: '',
	},
]