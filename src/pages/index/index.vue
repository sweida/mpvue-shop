<template>
	<view>
		<swiper class="card-swiper square-dot" :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="5000" duration="500" @change="cardSwiper" indicator-color="#8799a3"
		 indicator-active-color="#0081ff">
			<swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
				<view class="swiper-item">
					<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
					<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
				</view>
			</swiper-item>
		</swiper>
		<view class="cu-card no-card">

				<view class="cu-list grid col-4 no-border">
					<view class="cu-item" v-for="(item,index) in cuIconList" :key="index">
						<view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]">
							<view class="cu-tag badge" v-if="item.badge!=0">
								<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
							</view>
						</view>
						<text>{{item.name}}</text>
					</view>
				</view>


		</view>

		<view class="cu-card article no-card">
			<view class="cu-item shadow padding-tb">
				<view class="content">
					<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
					 mode="aspectFill"></image>
					<view class="desc">
						<view class="text-cut" style="width: 450rpx">这是标题啊啊啊啊嗷嗷这是标题啊啊啊啊嗷嗷</view>
						<!-- <view class="title"><view class="text-cut">无意者 烈火焚身;以正义的烈火拔出黑暗。我有自己的正义，见证至高的烈火吧。</view></view> -->
						<view class="text-xs text-gray desc"> 折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！</view>
						<view class="flex align-end justify-between">
							<view class="margin-top-sm">
								<view class="cu-tag bg-yellow light sm radius">会员价: ¥77.00</view>
								<view class="text-price text-xl text-orange margin-right">80.00</view>
							</view>
							<button class="cu-btn round bg-green sm">+购物车</button>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="cu-card article no-card">
			<view class="cu-item shadow padding-tb">
				<view class="content">
					<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
					 mode="aspectFill"></image>
					<view class="desc">
						<view class="text-cut" style="width: 450rpx">这是标题啊啊啊啊嗷嗷这是标题啊啊啊啊嗷嗷</view>
						<!-- <view class="title"><view class="text-cut">无意者 烈火焚身;以正义的烈火拔出黑暗。我有自己的正义，见证至高的烈火吧。</view></view> -->
						<view class="text-xs text-gray desc"> 折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！</view>
						<view class="flex align-end justify-between">
							<view class="margin-top-sm">
								<view class="cu-tag bg-yellow light sm radius">会员价: ¥77.00</view>
								<view class="text-price text-xl text-orange margin-right">80.00</view>
							</view>
							<button class="cu-btn round bg-green sm">+购物车</button>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="cu-card article no-card">
			<view class="cu-item shadow padding-tb">
				<view class="content">
					<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
					 mode="aspectFill"></image>
					<view class="desc">
						<view class="text-cut" style="width: 450rpx">这是标题啊啊啊啊嗷嗷这是标题啊啊啊啊嗷嗷</view>
						<!-- <view class="title"><view class="text-cut">无意者 烈火焚身;以正义的烈火拔出黑暗。我有自己的正义，见证至高的烈火吧。</view></view> -->
						<view class="text-xs text-gray desc"> 折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！</view>
						<view class="flex align-end justify-between">
							<view class="margin-top-sm">
								<view class="cu-tag bg-yellow light sm radius">会员价: ¥77.00</view>
								<view class="text-price text-xl text-orange margin-right">80.00</view>
							</view>
							<button class="cu-btn round bg-green sm">+购物车</button>
						</view>
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
				dotStyle: false,
				towerStart: 0,
				direction: '',
				cuIconList: [{
					cuIcon: 'cardboardfill',
					color: 'red',
					badge: 120,
					name: '待付款'
				}, {
					cuIcon: 'recordfill',
					color: 'orange',
					badge: 1,
					name: '待配送'
				}, {
					cuIcon: 'picfill',
					color: 'yellow',
					badge: 0,
					name: '待提货'
				}, {
					cuIcon: 'noticefill',
					color: 'olive',
					badge: 22,
					name: '已配送'
				}, {
					cuIcon: 'cardboardfill',
					color: 'red',
					badge: 120,
					name: '待付款'
				}, {
					cuIcon: 'recordfill',
					color: 'orange',
					badge: 1,
					name: '待配送'
				}, {
					cuIcon: 'picfill',
					color: 'yellow',
					badge: 0,
					name: '待提货'
				}, {
					cuIcon: 'noticefill',
					color: 'olive',
					badge: 22,
					name: '已配送'
				}]
			};
		},
		
		methods: {
			TabSelect(e) {
			}
		},
	}
</script>

<style>
.desc{
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box !important;
	-webkit-line-clamp:2;
	-webkit-box-orient: vertical;
}
.bg-yellow.light{
	color: #a5673f;
	background-color: #f8e470;
}

.no-card .content>image{
	height: 6.8em !important;
}
</style>
