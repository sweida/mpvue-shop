<template>
	<view class="order-page">


		<div class="orderBox">
			<view  class="cu-list menu orderList">
				<view class="cu-item">
					<view class="content flex justify-between">
						<text class="text-sm">{{order.allCount}} 件商品</text>
						<text class="text-red">{{status[order.status].name}}</text>
					</view>
				</view>
				<view class="cu-card article no-card solid-bottom bg-white">
					<view class="cu-item shadow padding-tb" v-for="(goods, index2) in order.goodList" :key="index2">
						<view class="content padding-left-sm">
							<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
							mode="aspectFill"></image>
							<view class="desc">
								<view class="text-cut titles" style="width: 380rpx"> 
									{{goods.good_name}}啊啊是卡德罗夫哈拉开圣诞节发啊是到了房间看
								</view>
								<view>
									<view class='cu-tag radius sm'>{{goods.label}}</view>
								</view>
								<text class="text-sm">
									<text class="text-gray"> x {{goods.count}}</text>
								</text>
							</view>
							<view class="text-price text-black">
								{{goods.price}}
							</view>
						</view>
					</view>
				</view>
				<!-- <view class="cu-item ">
					<view class="content flex justify-between">
						<text class="text-sm">
							共2件商品 实付：
							<text class="text-price text-lg">{{order.totalPay}}</text>
						</text>
						<view v-if="order.status == 1">
							<button class="cu-btn lines-gray sm shadow-blur round margin-right-sm" @click="cancelOrder(order.order_id)">取消订单</button>
							<button class="cu-btn bg-red sm shadow-blur round" @click="payOrder(order.order_id)">立即支付</button>
						</view>
					</view>
				</view> -->
			</view>
			<view  class="cu-list menu orderList">
				<view class="cu-card article no-card solid-bottom bg-white padding text-black">
					<view class="line">
						商品金额 <text class="text-price">{{order.goodsPrice}}</text>
					</view>
					<view class="line" v-if="order.discount>0">
						商品优惠 <text class="text-price">{{order.discount}}</text>
					</view>
					<view class="line solid-bottom">
						运费 
						<text v-if="order.expressPrice==0">包邮</text>
						<text class="text-price" v-else>{{order.expressPrice}}</text>
					</view>
					<view class="text-right padding-top-sm ">
						合计： <text class="text-price text-lg text-red padding-left-xs">{{order.totalPay}}</text>
					</view>
				</view>
			</view>
			<view  class="cu-list menu orderList">
				<view class="cu-card article no-card solid-bottom bg-white text-sm text-gray padding-sm">
					<view class="padding-xs">
						订单编号：{{order.order_id}}
					</view>
					<view class="padding-xs">
						下单时间：{{order.created_at}}
					</view>
					<view class="padding-xs">
						收货地址：{{order.address}}
						{{order.addressName}}
						{{order.addressPhone}}
					</view>
				</view>
			</view>
			<view class="cu-bar bg-white tabbar border shop" v-if="order.status == 1">
				<view class="bg-white submit" @click="cancelOrder(order.order_id)">取消订单</view>
				<view class="bg-red submit" @click="payOrder(order.order_id)">立即付款</view>
			</view>
		</div>
	</view>
</template>

<script>
import {mapState, mapMutations } from 'vuex'

	export default {
		data() {
			return {
				scrollLeft: 0,
				TabCur: 0,
				order: {
					totalPay: 0,
					goodList: [
					],
				},
				status: [
					{
						id: 0,
						name: '全部',
					}, {
						id: 1,
						name: '待付款',
					}, {
						id: 2,
						name: '待配送',
					}, {
						id: 3,
						name: '配送中',
					}, {
						id: 4,
						name: '待确定',
					}, {
						id: 5,
						name: '已完成',
					}, {
						id: 6,
						name: '已取消',
					}
				],
			};
		},
		computed: {
			...mapState([
				'isLogin',
				'userInfo',
			]),
		},
		onLoad(options) {
			// console.log(options.order, 434);
			this.order = JSON.parse(options.order)
		},
		methods: {
			tabSelect(index) {
				this.TabCur = index
				this.getOrderList()
			},
			getOrderList() {
				let params = {
					user_id: this.userInfo.openid,
					status: this.nav[this.TabCur].id,
				}
				this.$fly.post('/order/personalList', params).then(res => {
					this.orderList = res.data.data
					console.log(res.data);
				})
			},
			cancelOrder(id) {
				wx.showModal({
					title: '取消订单',
					content: '确定要取消订单吗？',
					success: (res) => {
						if (res.confirm) {
							let params = {
								order_id: id,
							}
							this.$fly.post('/order/cancel', params).then(resp => {
								wx.showToast({
									title: resp.message,
									icon: 'success',
									duration:1500
								});
							})
							setTimeout(() => {
								wx.navigateBack()
							},1500)
						}
					}
				})
				
			},
			payOrder(id) {
				let params = {
					order_id: id,
				}
				this.$fly.post('/order/payOrder', params).then(resp => {
					wx.showToast({
						title: resp.message,
						icon: 'success',
						duration:1500
					});
				})
				setTimeout(() => {
					wx.navigateBack()
				},1500)
			}
			
		},
	}
</script>

<style>
page, .order-page{
	height: 100%;
	display: flex;
	flex-direction: column;
	padding-bottom: 100rpx;
}
.contain{
	height: 100%;
	text-align: center;
	background: #fff;
	margin-top: 16rpx;
}
.orderBox{
	padding-bottom: 30rpx;
}
.orderList{
	margin:16rpx 16rpx 0;
}
.cu-card.article>.cu-item .content>image {
	width: 140rpx;
	height: 120rpx;
}
.cu-list+.cu-list {
	margin-top: 16rpx;
}
.line{
	line-height: 56rpx;
	display: flex;
	justify-content: space-between;
}
.tabbar{
	position: fixed;
	bottom: 0;
	width: 100%;
}
</style>
