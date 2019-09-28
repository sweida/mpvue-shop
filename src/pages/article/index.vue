<template>
	<view>
		<view class="cu-card case">
			<view class="image">
				<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
				mode="widthFix"></image>
			</view>
		</view>

		<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item" :class="index==TabCur?'text-green cur':''" v-for="(item,index) in classifys" :key="index" @tap="tabSelect" :data-id="index">
				{{item}}
			</view>
		</scroll-view>

		<view class="grid col-2 padding-xs">
			<view class="cu-card case padding-xs" v-for="(item, index) in articleList" :key="index" @click="goRouter(item.id)">
				<view class="cu-item shadow">
					<view class="image">
						<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
						mode="widthFix"></image>
						<view class="cu-tag bg-blue">{{item.label}}</view>
					</view>
					<view class="flex"> 
						<text class="text-cut padding-xs">{{item.title}}</text>
					</view>
					<view class="content text-gray text-sm flex justify-end padding-sm">
						<text class="cuIcon-attentionfill margin-lr-xs"></text> {{item.clicks}}
						<text class="cuIcon-appreciatefill margin-lr-xs"></text> {{item.like_count}}
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cardCur: 0,
				classifys: [],
				articleList: [],
				TabCur: 0,
				scrollLeft: 0,
				index: 0,
				desc: '暂无可用优惠券~',
				nav: [
					{
						id: 1,
						name: '可用',
						desc: '暂无可用优惠券~'
					}, {
						id: 2,
						name: '已使用',
						desc: '暂无使用优惠券~'
					}, {
						id: 3,
						name: '已过期',
						desc: '暂无过期优惠券~'
					}
				],
				voucherlist: [
					{},
					{},
					{}
				],
			};
		},
		onLoad() {
			this.getArticleList()
			this.getArticleClassify()
		},
		methods: {
			goRouter(id) {
				wx.navigateTo({url: `/pages/articleDetail/main?id=${id}`})
			},
			getArticleList() {
				this.$fly.post('/article/list').then(res => {
					this.articleList = res.data.data
				})
			},
			getArticleClassify() {
				this.$fly.get('/article/classify').then(res => {
					this.classifys = res.data
				})
			},
			tabSelect(index) {
				this.index = index
				this.TabCur = index;
				// this.desc = this.nav[index].desc
			}
		},
	}
</script>

<style>
.cu-card>.cu-item{
	margin: 0;
}
</style>
