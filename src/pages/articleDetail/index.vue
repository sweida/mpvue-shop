<template>
	<view class="detail">
		<view class="cu-card case bg-white">
			<view class="image">
				<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
				mode="widthFix"></image>
				<!-- <image :src="article.img"
				mode="widthFix"></image> -->
			</view>
			<view class="solid-bottom text-xl padding text-center">
				<text class="text-black text-bold">{{article.title}}</text>
			</view>
			<view class="cu-bar bg-white solid-bottom">
				<view class="cu-item flex align-center">
					<view class="margin-left-sm">
						<text class="cuIcon-appreciatefill "></text>
						<view>{{likeList.length}}</view>
					</view>
					<view class="text-cut">
						<view class="cu-avatar round sm margin-right-xs" v-for="(item,index) in likeList" :key="index" :style="[{ backgroundImage:'url(' + item.avatarUrl + ')' }]"></view>
					</view>
					<text v-if="likeList.length>10">...</text>
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
			<text class="text-black">{{article.desc}}</text>
		</view>
		<view class="cu-card article no-card" v-if="article.goods">
			<view class="cu-item shadow padding-tb good" @click="goGoodDetail(article.goods.id)">
				<view class="content">
					<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
					 mode="aspectFill"></image>
					<view class="desc">
						<view class="text-cut" style="width: 450rpx">{{article.goods.title}}</view>
						<view class="text-xs text-gray descp">{{article.goods.desc}}</view>
						<view class="flex align-end justify-between">
							<view class="margin-top-sm">
								<view class="text-price text-xl text-orange margin-right">{{article.goods.stocks[0].price}}</view>
							</view>
							<view class="cu-btn cu-avatar bg-green round" @click.stop="addGood(article.goods)">
								<text class="cuIcon-cart"></text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-card dynamic no-card">
			<view class="cu-item shadow padding" v-html="article.content">
			</view>
		</view>
		<!-- 底部菜单 -->
		<view class="cu-bar tabbar shadow flex justify-between bg-white text-xxl text-black">
			<view class="cuIcon-appreciatefill margin-left-xl icon" :class="article.islike ? 'text-orange' : ''" @click="handleLike(article.islike)">
				<view class="cu-tag badge">{{likeList.length}}</view>
			</view>
			<!-- <text class="cuIcon-appreciatefill margin-left-xl"></text> -->
			<text class="cuIcon-share"></text>
			<view class="cuIcon-cart margin-right-xl icon" @click="goTab('cart')">
				<view class="cu-tag badge">{{cartCount}}</view>
			</view>
		</view>
		
	</view>
</template>

<script>
import {mapState, mapMutations } from 'vuex'

	export default {
		data() {
			return {
				article: '',
				likeList: '',
				goods: '',
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
		computed: {
            ...mapState([
				'userInfo',
				'cartList'
			]),
			cartCount: function() {
				let sum = 0
				this.cartList.forEach(item => {
					if (item.check) {
						sum += item.count
					}
				});
				return sum
			}
		},
		onLoad(options) {
			console.log(options.id, '文章id');
			
			this.getArticleDetail(options.id)
			this.getLikeList(options.id)
		},
		methods: {
			getArticleDetail(id) {
				let params = {
					id: id,
					user_id: this.userInfo.openid
				}
				this.$fly.post('/article/detail', params).then(res => {
					console.log(res, 55);
					this.article = res.data
				})
			},
			goTab(url) {
				wx.switchTab({url: `/pages/${url}/main`})
			},
			gosDetail(id) {
				wx.navigateTo({url: `/pages/goodDetail/main?id=${id}`})
			},
			handleLike(active) {
				let params = {
					article_id: this.article.id,
					user_id: this.userInfo.openid,
					active: active
				}
				this.$fly.post('/article/like', params).then(res => {
					console.log(res, 55);
					this.article.islike = !this.article.islike
					let text = ''
					this.article.islike ? text='点赞成功！' : text='已取消点赞'
					wx.showToast({
						title: text,
						icon: 'none',
						duration:2000
					});
					this.getLikeList(this.article.id)
				})
			},
			// 点赞列表
			getLikeList(id) {
				let params = {
					article_id: id,
				}
				this.$fly.post('/article/likelist', params).then(res => {
					console.log(res, 55);
					this.likeList = res.data
				})
			},
			// 加入购物车
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
