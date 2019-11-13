<template>
	<view class="detail">
		<swiper class="screen-swiper" :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="5000" duration="500">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image :src="'http://static.golang365.com/' + item.url" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		<view class="solid-bottom  padding-sm bg-white">
			<view class="text-black text-bold text-lg padding-tb-sm">{{goodDetail.title}}</view>
			<text class="text-gray text-sm">{{goodDetail.desc}}</text>
			<view class="flex justify-between padding-top">
				<view>
					<text class="text-price text-lg text-red">{{goodDetail.stocks[0].Price}}</text>
					<view class="cu-tag bg-yellow light sm radius margin-left-sm" v-if="goodDetail.vipprice">会员价: ¥{{goodDetail.vipprice}}</view>
				</view>

				<text class="text-sm text-gray">销量 {{goodDetail.sales}}</text>
			</view>
		</view>

		
		<view class="cu-bar bg-white solid-bottom margin-top padding-lr" >
			<view class='cu-tag bg-green text-xs'>参团人员</view>
			<view class="text-cut">
				<view class="cu-avatar round sm margin-right-xs" v-for="(item,index) in avatar" :key="index" :style="[{ backgroundImage:'url(' + avatar[index] + ')' }]"></view>
			</view>
			<view>已有 <text class="text-red">{{goodDetail.buys}}</text> 人参团</view>
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
			<div v-html="goodDetail.detail"> </div>
		</view>

		<view class="cu-card no-card padding bg-white" v-else>
			{{goodDetail.parameter}}
		</view>



		<view class="cu-bar bg-white tabbar border shop">
			<button class="action bg-white" open-type="contact">
				<view class="cuIcon-service text-green"></view>
				客服
			</button>
			<view class="action" :class="goodDetail.collect ? 'text-orange' : ''" @click="like(goodDetail.collect)">
				<view class="cuIcon-favorfill"></view> {{goodDetail.collect ? '已收藏' : '收藏'}}
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
import { moneyFormat } from '@/utils/index'
import {mapState, mapMutations } from 'vuex'

	export default {
		data() {
			return {
				swiperList: [],
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
		computed: {
			...mapState([
				'isLogin',
				'userInfo'
			]),
		},
		onLoad(options) {
			if (options.id) {
				this.getGoodDetail(options.id)
			}
		},
		methods: {
			getGoodDetail(id) {
				let url = 'http://static.golang365.com/'
				let params = {
					id: id,
					user_id: this.userInfo.openid
				}
                this.$fly.post('/goods/detail', params).then(res => {
					res.data.stocks.forEach(item => {
						item.Price = moneyFormat(item.price)
					});
					this.goodDetail = res.data
					this.swiperList = res.data.banners

					// this.swiperList.forEach(item => {
					// 	item.url = url + item.url
					// })
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
			like(active) {
				if (!this.isLogin) {
					return false
				}

				// acitve falss 没收藏
				let params = {
					goods_id: this.goodDetail.id,
					user_id: this.userInfo.openid,
					active: active
				}
				this.$fly.post('/goods/likeGoods', params).then(res => {
					this.goodDetail.collect = !this.goodDetail.collect
					let text = ''
					this.goodDetail.collect ? text='商品收藏成功！' : text='已取消收藏'
					wx.showToast({
						title: text,
						icon: 'none',
						duration:2000
					});
				})

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
.bg-yellow.light{
	color: #a5673f;
	background-color: #f8e470;
}
</style>
