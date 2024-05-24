import buildUrl from '../../../assets/js/buildUrl.js';

const SCALE_NUM = 0.5;

export default [
	{
		disabled: true,
		class: 'day1',
		detail: {
			name: '石家庄火车站乘车赴赵州桥',
			time: ['08:00'],
		}
	},
	{
		id: 'zhao-zhou-qiao',
		class: 'day1',
		point: {
			img: buildUrl('/static/web/images/points/zhao-zhou-qiao.png'),
			position: [4165 * SCALE_NUM, 5638 * SCALE_NUM]
		},
		detail: {
			name: '赵州桥',
			img: buildUrl('/static/web/images/shoots/zhao-zhou-qiao.jpg'),
			time: ['9:30', '11:00'],
			context: '赵州桥是一座位于河北省石家庄市赵县城南洨河之上的石拱桥，因赵县古称赵州而得名。当地人称之为大石桥，以区别于城西门外的永通桥（小石桥）。赵州桥始建于隋代，由匠师李春设计建造，后由宋哲宗赵煦赐名安济桥，并以之为正名。赵州桥是世界上现存年代久远、跨度最大、保存最完整的单孔坦弧敞肩石拱桥，其建造工艺独特，在世界桥梁史上首创“敞肩拱”结构形式，具有较高的科学研究价值；雕作刀法苍劲有力，艺术风格新颖豪放，显示了隋代浑厚、严整、俊逸的石雕风貌，桥体饰纹雕刻精细，具有较高的艺术价值。赵州桥在中国造桥史上占有重要地位，对全世界后代桥梁建筑有着深远的影响。',
			speech: buildUrl('/static/web/audio/speech/zhao-zhou-qiao.mp3'),
		}
	},
	{
		id: 'bai-lin-chan-si',
		class: 'day1',
		point: {
			img: buildUrl('/static/web/images/points/bai-lin-chan-si.png'),
			position: [4619 * SCALE_NUM, 4650 * SCALE_NUM]
		},
		detail: {
			name: '柏林禅寺',
			img: buildUrl('/static/web/images/shoots/bai-lin-chan-si.jpg'),
			time: ['11:20', '12:20'],
			context: '柏林禅寺最早建于汉献帝建安年间（ 196 － 220 ），古称观音院，南宋为永安院，金代名柏林禅院，自元代起即称柏林禅寺。唐朝玄奘法师在西行印度取经之前，曾来此从道深法师研习《成实论》。晚唐时，禅宗巨擘从谂禅师在此驻锡四十年，名闻遐迩，“平常心是道”、“狗子无佛性”、“吃茶去”等公案形成了影响深远的“赵州门风”，时人尊为“赵州古佛”，柏林禅寺由此成为中国禅宗的重要祖庭。',
			speech: buildUrl('/static/web/audio/speech/bai-lin-chan-si.mp3'),
		}
	},
	{
		disabled: true,
		class: 'day1',
		detail: {
			name: '午餐-特色驴肉火烧、驴油烧饼',
			time: ['12:30', '14:00'],
		}
	},
	{
		id: 'fu-xing-da-jie',
		class: 'day1',
		point: {
			img: buildUrl('/static/web/images/points/fu-xing-da-jie.png'),
			position: [4680 * SCALE_NUM, 3620 * SCALE_NUM]
		},
		detail: {
			name: '复兴大街-泊水公园特大桥',
			img: buildUrl('/static/web/images/shoots/fu-xing-da-jie.jpg'),
			time: ['14:00', '17:00'],
			context: '复兴大街主辅路采用双向12车道的城市道路规模，全线新建隧道3座（正定古城段、白佛段、学苑路段），设置互通立交11座，增设出入口匝道16处，建设桥梁13座，复兴大街将连接畅通石家庄市23条城市道路，成为新的城市中轴线，构筑成外通内畅、转换高效、区间融合的城市路网新格局。<br/>泊水公园特大桥是石家庄复兴大街市政化改造工程项目的控制性工程之一，位于泊水公园，全长1111米，主桥造型来源于凌波飞虹，折射出多彩的画面，宁静、优美、生态、自然，寄托了石家庄人民对美好生活的向往，以及勇往直前、追逐梦想的决心。',
			speech: buildUrl('/static/web/audio/speech/fu-xing-da-jie.mp3'),
		}
	},
	{
		id: 'hu-tuo-he-te-da-qiao',
		class: 'day1',
		point: {
			img: buildUrl('/static/web/images/points/hu-tuo-he-te-da-qiao.png'),
			position: [4605 * SCALE_NUM, 2500 * SCALE_NUM]
		},
		detail: {
			name: '滹沱河特大桥',
			img: buildUrl('/static/web/images/shoots/hu-tuo-he-te-da-qiao.jpg'),
			time: ['14:00', '17:00'],
			context: '滹沱河特大桥起点位于河北大道南侧，终点位于南高营立交，沿复兴大街西侧南北向铺设，上跨滹沱河，全长约2208米，为国内首创的市政化改造工程空间扭索面独塔独柱全漂浮体系斜拉桥。桥面为双向10车道，桥面宽度为国内同类型桥梁之最',
			speech: buildUrl('/static/web/audio/speech/hu-tuo-he-te-da-qiao.mp3'),
		}
	},
	{
		id: 'zheng-ding-cheng',
		class: 'day1',
		point: {
			img: buildUrl('/static/web/images/points/zheng-ding-cheng.png'),
			position: [3439 * SCALE_NUM, 1871 * SCALE_NUM]
		},
		detail: {
			name: '正定古城',
			img: buildUrl('/static/web/images/shoots/zheng-ding-cheng.jpg'),
			time: ['17:00', '19:00'],
			context: '正定城始建于北周，初为石筑。由于历史的原因和近年城镇建设的发展，正定城除现存城门外、已多为土城。东城门已埋于国防工事之下，南门存里城门和瓮城门，西存里城门、瓮城门、北存里城门及月城门。唐宝应元年(762年)因滹沱河溢水灌城，城日以圮，执政者对城墙进行拓建。明正统十四年(1449年)，扩建为周长二十四里，高三丈二只，上宽二丈的土城。隆庆五年(1571年)真定知县顾授始将土城改为砖城，后任知县周应中申动府库银六万余两，征用真定府辖各县民夫，分段兴工，于万历四年(1576年)竣工。四城门东曰迎旭，南曰长乐，西曰镇远，北曰永安，并均附有月城和瓮城。后世重修或改建也均是在此基础上进行。在预防水患和军事防卫上起了重要作用。正定城墙于1993年7月15日被河北省人民政府公布为重点文物保护单位。',
			speech: buildUrl('/static/web/audio/speech/zheng-ding-cheng.mp3'),
		}
	},
	{
		id: 'zheng-ding-ye-shi',
		class: 'day1',
		point: {
			img: buildUrl('/static/web/images/points/zheng-ding-ye-shi.png'),
			position: [2813 * SCALE_NUM, 1069 * SCALE_NUM]
		},
		detail: {
			name: '正定夜市',
			img: buildUrl('/static/web/images/shoots/zheng-ding-ye-shi.jpg'),
			time: ['19:00', '20:30'],
			context: '正定夜市，一排排小吃摊位排列整齐，整个夜市充斥着浓浓的烟火气和人潮涌动的朝气与活力。不仅可以品尝到烧卖、饸饹等正定特色传统美食，还有沈阳鸡架、长沙臭豆腐、东北锅包肉、武汉热干面等全国各地的招牌美食。摊位数约600多个，每天的客流量超过2万人次，营业额已突破3亿元。',
			speech: buildUrl('/static/web/audio/speech/zheng-ding-ye-shi.mp3'),
		}
	},
	{
		disabled: true,
		class: 'day1',
		detail: {
			name: '酒店休息',
			time: ['21:00'],
		}
	},
	{
		id: 'tai-ping-he-xue-fu-qiao',
		class: 'day2',
		point: {
			img: buildUrl('/static/web/images/points/tai-ping-he-xue-fu-qiao.png'),
			position: [1982 * SCALE_NUM, 1458 * SCALE_NUM]
		},
		detail: {
			name: '太平河学府桥',
			img: buildUrl('/static/web/images/shoots/tai-ping-he-xue-fu-qiao.jpg'),
			time: ['08:30'],
			context: '太平河学府桥，石家庄市学府路跨太平河桥长约1.39公里，主桥最大跨径为160米，为双向6车道加应急车道，主塔采用异型索塔设计，横桥向呈人字形，是河北省目前单塔跨径最大的斜拉桥。',
			speech: buildUrl('/static/web/audio/speech/tai-ping-he-xue-fu-qiao.mp3'),
		}
	},
	{
		id: 'tai-ping-he-pian-qu',
		class: 'day2',
		point: {
			img: buildUrl('/static/web/images/points/tai-ping-he-pian-qu.png'),
			position: [1498 * SCALE_NUM, 1963 * SCALE_NUM]
		},
		detail: {
			name: '太平河风景区',
			img: buildUrl('/static/web/images/shoots/tai-ping-he-pian-qu.jpg'),
			time: ['08:30', '11:00'],
			context: '太平河片区仿佛一幅宁静而优美的画卷。从无人机的高空俯瞰，平静的水面映照着蓝天，两岸的草地平整层林渐染，构成了一幅宛如诗意的山水画。在这片区域，“冀之光”灯塔高高矗立，古老的汉字和塔形相融合，与河水相得益彰。这座灯塔不仅是一处地标，更是连接历史和现代的文化象征。',
			speech: buildUrl('/static/web/audio/speech/tai-ping-he-pian-qu.mp3'),
		}
	},
	{
		disabled: true,
		class: 'day2',
		detail: {
			name: '赴石家庄湾里庙步行街',
			time: ['11:00', '11:30'],
		}
	},
	{
		id: 'wan-li-miao',
		class: 'day2',
		point: {
			img: buildUrl('/static/web/images/points/wan-li-miao.png'),
			position: [1498 * SCALE_NUM, 2703 * SCALE_NUM]
		},
		detail: {
			name: '湾里庙步行街',
			img: buildUrl('/static/web/images/shoots/wan-li-miao.jpg'),
			time: ['11:30', '13:30'],
			context: '湾里庙步行街，位于河北省石家庄市核心区域，占地面积30公顷，是石家庄城市和商业发展的原点。主街全长1080米，东起公里街，西至中华北大街，南起中山西路，北至新华路，是集休闲、娱乐、文化、购物、城市观光等功能于一体的商业步行街。湾里庙步行街是20世纪初随着正太铁路的开通而建设的古老街区，历经百年，见证了石家庄市商业的历史变迁。',
			speech: buildUrl('/static/web/audio/speech/wan-li-miao.mp3'),
		}
	},
	{
		id: 'da-shi-qiao',
		class: 'day2',
		point: {
			img: buildUrl('/static/web/images/points/da-shi-qiao.png'),
			position: [2720 * SCALE_NUM, 2934 * SCALE_NUM]
		},
		detail: {
			name: '大石桥',
			img: buildUrl('/static/web/images/shoots/da-shi-qiao.jpg'),
			time: ['13:30', '15:30'],
			context: '石家庄大石桥位于石家庄市中心，大桥路与公里街交口东北侧，石家庄解放纪念碑之北。大石桥建于1907年，全长150米，高7米，宽10米，共23孔；桥身全系石灰岩砌成，坡面平缓；桥头两侧各有石狮雕塑二尊。',
			speech: buildUrl('/static/web/audio/speech/da-shi-qiao.mp3'),
		}
	},
	{
		id: 'zheng-tai-fan-dian',
		class: 'day2',
		point: {
			img: buildUrl('/static/web/images/points/zheng-tai-fan-dian.png'),
			position: [2404 * SCALE_NUM, 3424 * SCALE_NUM]
		},
		detail: {
			name: '正太饭店',
			img: buildUrl('/static/web/images/shoots/zheng-tai-fan-dian.jpg'),
			time: ['13:30', '15:30'],
			context: '正太饭店，建成于1907年，是石家庄一处近代历史建筑，正太饭店与正太铁路同年建成，在1920至1937年间为石家庄最大，最豪华的饭店，中华民国时期曾接待过孙中山、蒋介石等军政大员 [3]。总建筑面积约4800平方米， 2008年被河北省人民政府公布为省级文物保护单位。2022年11月12日，石家庄正太饭店对外开放。',
			speech: buildUrl('/static/web/audio/speech/zheng-tai-fan-dian.mp3'),
		}
	},
	{
		id: 'gao-tie-pian-qu',
		class: 'day2',
		point: {
			img: buildUrl('/static/web/images/points/gao-tie-pian-qu.png'),
			position: [1420 * SCALE_NUM, 4903 * SCALE_NUM]
		},
		detail: {
			name: '石家庄高铁片区',
			img: buildUrl('/static/web/images/shoots/gao-tie-pian-qu.jpg'),
			time: ['15:00', '16:30'],
			context: '高铁片区是石家庄重要的交通枢纽和重点发展区域，而中央绿色体育公园及火车站周边广场绿地则是其中最为重要的绿色生态和健身活动空间，其建设品质和管护水平不仅承载着火车站区域市民对公共空间的需求，走进中央绿色体育公园，走上彩虹桥，俯瞰石家庄的城市巨变。',
			speech: buildUrl('/static/web/audio/speech/gao-tie-pian-qu.mp3'),
		}
	},
]