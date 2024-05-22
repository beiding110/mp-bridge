# por-uniapp

uniapp通用模板，集成了uView（及部分组件二次封装）、统一请求、样式格式等

## 安装依赖

使用了webpack管理了部分依赖

```bash
$ npm	# 使用npm管理依赖
$ yarn	# 使用yarn管理依赖
```

## 文件结构

### 项目文件结构

```
|-assets            构建资源
	|-js            	全局方法（原有的勿改）
	|-style         	全局样式（原有的勿改）
|-components        全局组件库
	|-my            	常用组件库（勿改）
	|-sys           	项目独有全局引用组件库，后续使用频繁的，会被列入my栏目（原有的勿改）
|-config            *配置项文件（需进行调整，请求地址头）
|-filters			全局filter，提供了常用的filter（原有的勿改）
|-layout            全局布局，注意：每个页面都应引用layout中合适的layout（原有的勿改）
|-mixins            全局mixin，注意：每个页面都应引用mixins中的global（原有的勿改）
|-pages				页面，应与pages.json有对应关系
|-plugins			自定义插件（勿改）
|-static			静态资源
|-store             vuex文件（原有的勿改）
|-uni_modules		uniapp插件市场依赖，部分代码被修改，根据文档描述，这种修改是被允许的
|-App.vue           入口组件
|-main.js           入口文件、加载组件、样式、初始化配置等
|-mainfest.json		*uniapp配置文件（需进行调整，uniapp的appid、wxmp的appid、图标、名称、版本号等）
|-package.json		webpack管理文件
|-pages.json		uniapp页面配置文件
|-uni.scss			全局样式文件
...
```

### vue文件及拆分命名

粒度由粗到细，拆分如下

页面：`/pages/pangeName/pangeName.vue`，并在 `pages.json` 中注册对应路径，注册后才能被识别为一个页面。文件名与当前文件夹名相同；

子页面组件：一般在带tab或带nav切换功能的页面中用到，即通过tab或nav在一个页面中，控制切换多个子页面，`xxx/main.vue`；

section组件：`...somepath/section/xxx.vue` 和component中的区别，section中更倾向于放页面内不同的栏目，如首页的banner、nav、list等不同栏目；

component组件：`...somepath/components/xxx.vue` 或 `...somepath/components/xxx/index.vue`，后者为较复杂的组件，需要拆分子组件或方法、样式等；

### 文件内容

> 注意：每个页面都应引用layout中合适的layout。组件中无需引用
> 
```template
	<layout-empty></layout-empty>		<!--全空的layout-->
	<layout-nav-bar></layout-nav-bar>	<!--带navbar上导航的layout-->
	<layout-tab-bar></layout-tab-bar>	<!--带tabbar下导航的layout-->
```

> 注意：每个页面都应引用mixins中的global。

```js
import MIXIN_GLOBAL from '@/mixins/global.js';

export default {
	mixins: [MIXIN_GLOBAL],
}
```

推荐使用模板页面

```.vue
<template>
	<!-- <layout-empty></layout-empty> -->

	<layout-nav-bar>
		
	</layout-nav-bar>
</template>

<script>
	import MIXIN_GLOBAL from '@/mixins/global.js';
	
	export default {
		mixins: [MIXIN_GLOBAL],
		data() {
			return {
				rQuery: {}, // 页面参数变量
			};
		},
		methods: {
			
		},
		mounted() {
			
		},
		onLoad(query) {
			// 存储页面参数
			this.rQuery = query;
		},
	}
</script>

<style scoped lang="scss">
	
</style>
```

推荐使用模板组件

```.vue
<template>
	<view class="">
		
	</view>
</template>

<script>	
	export default {
		props: {},
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		mounted() {
			
		},
	}
</script>

<style scoped lang="scss">
	
</style>

```

## 坑记录

### v-for 与 slot 同时使用，并使用了插槽作用域

2023.1.30

v-for 与 slot 同时使用，并使用了插槽作用域时，如果slot中组件传参较复杂（有row.a的形式或使用了function时），在wxmp中可能会仅渲染出了列表的最后一项

```
组件
...
<view v-for="(item, index) in arr">
	<slot :row="item"></slot>
</view>
...

外层
<组件>
	<template v-slot="{row}">
		<子组件 :attr="row.xxx" :fun="fun"></子组件>
	</template>
</组件>
```

这时需要将v-for拿到外层实现，若使用了 `<my-list></my-list>` 则应设置属性 `:autoList="false"`

>感觉和wxmp的小程序影子节点有关

```
外层
<组件>
	<template v-for="(item, index) in arr">
		<子组件 :attr="row.xxx" :fun="fun"></子组件>
	</template>
</组件>
```

类似问题：[https://ask.dcloud.net.cn/question/144058](https://ask.dcloud.net.cn/question/144058)

### v-for 与 slot 同时使用，并使用了插槽作用域，key不生效

2023.2.7

```
组件
...
<view v-for="(item, index) in arr" :key="index">
	<slot :row="item"></slot>
</view>
...

外层
<组件>
	<template v-slot="{row}">
		<input :value="row"/>
	</template>
</组件>
```

当arr为[1,2,3]的时候，使用arr.splice(1, 1)进行删除时，期望视图上的结果为：[1,3]，实际为[1, 2]

解决方案同上一问题，不实用组件内的v-for循环，直接在组件外使用v-for

```
外层
<组件>
	<template v-for="(item, index) in arr">
		<input :value="row" :key="index"/>
	</template>
</组件>
```

> 官方说已经解决了这个问题，但是不知道为什么不行

参考：[https://ask.dcloud.net.cn/search/q-a2V5IOWwj+eoi+W6jw==#questions](https://ask.dcloud.net.cn/search/q-a2V5IOWwj+eoi+W6jw==#questions)

### 页面生命周期钩子的顺序

`h5` onLoad → created → mounted

`wxmp` created → onLoad → mounted

### 拆包及引用

不能将依赖拆至不同包中，如文件结构：

```
|-page
|-page-a
	|-static
```

在page中，不能存在 import xxx from '/page-a/xxx' 的引用，小程序端无法加载出来
即包之间无法互相引用，开发时应注意

参考：[https://blog.csdn.net/weixin_38673922/article/details/128454847](https://blog.csdn.net/weixin_38673922/article/details/128454847)

分包中的static文件引用路径，应为：/page-a/static/xxx