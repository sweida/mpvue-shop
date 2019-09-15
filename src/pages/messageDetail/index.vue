<template>
	<view class="detail">
		<view class="cu-card case bg-white">
			<view class="image">
				<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
				mode="widthFix"></image>
			</view>
			<view class="solid-bottom text-xl padding text-center">
				<text class="text-black text-bold">这是标题啊嗷嗷啊啊啊啊啊 啊啊</text>
			</view>
			<view class="cu-bar bg-white solid-bottom">
				<view class="cu-item flex align-center">
					<view class="margin-left-sm">
						<text class="cuIcon-appreciatefill "></text>
						<view>{{avatarTotal}}</view>
					</view>
					<view class="text-cut">
						<view class="cu-avatar round sm margin-right-xs" v-for="(item,index) in avatar" :key="index" :style="[{ backgroundImage:'url(' + avatar[index] + ')' }]"></view>
					</view>
					<text v-if="avatarTotal>10">...</text>
				</view>
			</view>

		</view>


		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="cu-item arrow">
				<view class="action ">
					<text class="cuIcon-titles text-green "></text> 食材
				</view>
			</view>
		</view>
		<view class="text-sm padding-sm bg-white">
			<text class="text-black">这是食品名称</text>
		</view>
		<view class="cu-card article no-card">
			<view class="cu-item shadow padding-tb good" @click="goDetail('goodDetail')">
				<view class="content">
					<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
					 mode="aspectFill"></image>
					<view class="desc">
						<view class="text-cut" style="width: 450rpx">这是标题啊啊啊啊嗷嗷这是标题啊啊啊啊嗷嗷</view>
						<view class="text-xs text-gray descp"> 折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！</view>
						<view class="flex align-end justify-between">
							<view class="margin-top-sm">
								<view class="text-price text-xl text-orange margin-right">80.00</view>
							</view>
							<view class="cu-btn cu-avatar bg-green round" @click.stop="addGood('a')">
								<text class="cuIcon-cart"></text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-card dynamic no-card">
			<view class="cu-item shadow padding">
				这是正文这是正文这是正文这是正文这是正文这是正文这是正文这是正文这是正文这是正文
				这是正文这是正文这是正文这是正文这是正文这是正文这是正文这是正文这是正文这是正文
				这是正文这是正文这是正文这是正文这是正文这是正文这是正文这是正文这是正文这是正文
			</view>
		</view>
		<!-- 底部菜单 -->
		<view class="cu-bar tabbar shadow flex justify-between bg-white text-xxl text-black">
			<view class="cuIcon-appreciatefill margin-left-xl icon">
				<view class="cu-tag badge">{{avatarTotal}}</view>
			</view>
			<!-- <text class="cuIcon-appreciatefill margin-left-xl"></text> -->
			<text class="cuIcon-share"></text>
			<view class="cuIcon-cart margin-right-xl icon" @click="goTab('cart')">
				<view class="cu-tag badge">{{avatarTotal}}</view>
			</view>
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
				avatarTotal: 12,
				avatar: [
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg',
				],
			};
		},
		methods: {
			goTab(url) {
				wx.switchTab({url: `/pages/${url}/main`})
			},
			goDetail(url) {
				wx.navigateTo({url: `/pages/${url}/main`})
			},
			addGood() {
				
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
.cu-card>.good{
	background-color: #f0f0f0
}
.icon{
	position: relative;
	padding: 0 20rpx;
}
</style>
