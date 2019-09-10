<template>
	<view class="detail">
		<swiper class="screen-swiper" :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="5000" duration="500">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
				<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
			</swiper-item>
		</swiper>

		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="cu-item arrow">
				<view class="action ">
					<text class="cuIcon-titles text-orange "></text> 商品评论
				</view>
			</view>
		</view>
		<!-- <view  class="cu-list menu card-menu margin--top">
		  <view class="cu-item arrow">
			  <view class="action ">
					<text class="cuIcon-titles text-orange "></text> 商品评论
				</view>
			</view>
		</view> -->
		<view class="cu-card dynamic no-card margin-bottom">
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
				<!-- <view class="text-gray text-sm text-right padding">
					<text class="cuIcon-attentionfill margin-lr-xs"></text> 10
					<text class="cuIcon-appreciatefill margin-lr-xs"></text> 20
					<text class="cuIcon-messagefill margin-lr-xs"></text> 30
				</view> -->

			</view>
		</view>

		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="cu-item arrow">
				<view class="action ">
					<text class="cuIcon-titles text-orange "></text> 商品详情
				</view>
			</view>
		</view>
		<view class="cu-card dynamic no-card">
			<view class="cu-item shadow">
			aaaaaa
			aaaaaa
			aaaaaa
			aaaaaa
			aaaaaa
			aaaaaa
			aaaaaa
			aaaaaa
			aaaaaa
			aaaaaa
			aaaaaa
			aaaaaa
			aaaaaa
			aaaaaa
			aaaaaa
			aaaaaa
			aaaaaa
			aaaaaa
			aaaaaa
			aaaaaa
			</view>
		</view>









		<view class="cu-bar bg-white tabbar border shop">
			<button class="action" open-type="contact">
				<view class="cuIcon-service text-green">
					<view class="cu-tag badge"></view>
				</view>
				客服
			</button>
			<view class="action text-orange">
				<view class="cuIcon-favorfill"></view> 已收藏
			</view>
			<view class="action">
				<view class="cuIcon-cart">
					<view class="cu-tag badge">99</view>
				</view>
				购物车
			</view>
			<view class="bg-orange submit">加入购物车</view>
			<view class="bg-red submit">立即抢购</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
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
			};
		},
		methods: {
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
