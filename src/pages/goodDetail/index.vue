<template>
	<view class="detail">
		<swiper class="screen-swiper" :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="5000" duration="500">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
			</swiper-item>
		</swiper>
		<view class="solid-bottom  padding-sm bg-white">
			<view class="text-black text-bold text-lg padding-tb-sm">这是标题啊嗷嗷啊啊啊啊啊 啊啊</view>
			<text class="text-gray text-sm">这是标题啊嗷嗷啊啊啊啊啊 啊啊这是标题啊嗷嗷啊啊啊啊啊 啊啊这是标题啊嗷嗷啊啊啊啊啊 啊啊</text>
			<view class="flex justify-between padding-top">
				<text class="text-price text-lg text-red">{{999.33}}</text>
				<text class="text-sm text-gray">销量 33</text>
			</view>
		</view>

		
		<view class="cu-bar bg-white solid-bottom margin-top padding-lr" >
			<view class='cu-tag bg-green text-xs'>参团人员</view>
			<view class="text-cut">
				<view class="cu-avatar round sm margin-right-xs" v-for="(item,index) in avatar" :key="index" :style="[{ backgroundImage:'url(' + avatar[index] + ')' }]"></view>
			</view>
			<view>已有 <text class="text-red">200</text> 人参团</view>
		</view>

		<view class="cu-card dynamic no-card margin-bottom" v-if="false">
			<view class="cu-item shadow">
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"></view>
						<view class="content flex-sub">
							<view>凯尔</view>
							<view class="text-gray text-sm flex justify-between">
								2019年12月3日
							</view>
						</view>
					</view>
				</view>
				<view class="text-content">
					折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！
				</view>
				<view class="grid flex-sub padding-lr col-3 grid-square">
					<view class="bg-img" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"
					 v-for="(item,index) in isCard?9:1" :key="index">
					</view>
				</view>
			</view>
		</view>

		<scroll-view scroll-x class="bg-white nav margin-top solid-bottom">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-green cur':''" v-for="(item,index) in nav" :key="index" @tap="tabSelect(index)" :data-id="index">
					{{item.name}}
				</view>
			</view>
		</scroll-view>

		<view class="cu-card no-card padding bg-white" v-if="TabCur==0">
			aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
			aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
			aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
		</view>

		<view class="cu-card no-card padding bg-white" v-else>
			bbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
			bbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
			bbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
			bbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
			bbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
			bbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
		</view>



		<view class="cu-bar bg-white tabbar border shop">
			<button class="action bg-white" open-type="contact">
				<view class="cuIcon-service text-green"></view>
				客服
			</button>
			<view class="action" :class="collect ? 'text-orange' : ''" @click="like">
				<view class="cuIcon-favorfill"></view> {{collect ? '已收藏' : '收藏'}}
			</view>
			<view class="action" @click="goTab('cart')">
				<view class="cuIcon-cart">
					<view class="cu-tag badge">99</view>
				</view>
				购物车
			</view>
			<view class="bg-green submit" @click="addGood">加入购物车</view>
			<view class="bg-orange submit" @click="goRouter('orderlist')">立即购买</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				collect: false,
				swiperList: [{
					id: 0,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
				}, {
					id: 1,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
				}, {
					id: 2,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
				}, {
					id: 3,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
				}, {
					id: 4,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
				}, {
					id: 5,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
				}, {
					id: 6,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
				}],
				avatar: [
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
				],
				goodDetail: {},
				TabCur: 0,
				scrollLeft: 0,
				nav: [
					{
						id: 1,
						name: '商品详情',
					}, {
						id: 2,
						name: '规格参数',
					},
				]
			};
		},
		onLoad(options) {
			if (options.id) {
				this.getGoodDetail(options.id)
			}
		},
		methods: {
			getGoodDetail(id) {
                this.$fly.post('/good/detail', {id:id}).then(res => {
                    this.goodDetail = res.data
                })
            },
			goRouter(url) {
				wx.navigateTo({url: `/pages/${url}/main`})
			},
			goTab(url) {
				wx.switchTab({url: `/pages/${url}/main`})
			},
			tabSelect(index) {
				this.TabCur = index;
				this.desc = this.nav[index].desc
			},
			like() {
				this.collect = !this.collect
				let text = ''
				this.collect ? text='商品收藏成功！' : text='已取消收藏'
				wx.showToast({
					title: text,
					icon: 'none',
					duration:2000
				});
			}
		},
	}
</script>

<style>
.detail{
	padding-bottom: 60px;
}
.screen-swiper{
	min-height: 260px;
}
.tabbar{
	position: fixed;
	bottom: 0;
	width: 100%;
}

</style>
