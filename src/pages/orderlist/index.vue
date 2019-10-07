<template>
	<view class="order-page">
		<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item" :class="index==TabCur?'text-green cur':''" v-for="(item, index) in nav" :key="index" @tap="tabSelect(index)" :data-id="index">
				{{item.name}}
			</view>
		</scroll-view>
		<view class="contain" v-if="orderList.length==0">
			<img src="/static/images/order.png" alt="" class="noList">
			<view class="padding">暂无订单</view>
		</view>

		<div v-else class="orderBox">
			<view  class="cu-list menu orderList" v-for="(item, index) in orderList" :key="index" >
				<view class="cu-item">
					<view class="content flex justify-between">
						<text class="text-sm">订单编号：{{item.order_id}}</text>
						<text class="text-sm text-gray" v-if="item.status == 6">交易已取消</text>
						<text class="text-sm text-red" v-else>{{nav[item.status].name}}</text>
					</view>
				</view>
				<view class="cu-card article no-card solid-bottom bg-white">
					<view class="cu-item shadow padding-tb" v-for="(goods, index2) in item.goodList" :key="index2">
						<view class="content padding-left-sm">
							<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
							mode="aspectFill"></image>
							<view class="desc">
								<view class="titles"> 
									{{goods.good_name}}
								</view>
								<view>
									<view class='cu-tag radius sm'>{{goods.label}}</view>
								</view>
								<text class="text-sm">
									<text class="text-price text-sm text-gray">{{goods.price}}</text>
									<text class="text-gray"> x {{goods.count}}</text>
								</text>
							</view>
						</view>
					</view>
				</view>
				<view class="cu-item ">
					<view class="content flex justify-between">
						<text class="text-sm">
							共2件商品 实付：
							<text class="text-price text-lg">{{item.totalPay}}</text>
						</text>
						<view v-if="item.status == 1">
							<button class="cu-btn lines-gray sm shadow-blur round margin-right-sm" @click="cancelOrder(item.order_id)">取消订单</button>
							<button class="cu-btn bg-red sm shadow-blur round" @click="payOrder(item.order_id)">立即支付</button>
						</view>
					</view>
				</view>
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
				nav: [
					{
						id: 0,
						name: '全部',
						desc: '暂无可用优惠券~'
					}, {
						id: 1,
						name: '待付款',
						desc: '暂无使用优惠券~'
					}, {
						id: 2,
						name: '待配送',
						desc: '暂无过期优惠券~'
					}, {
						id: 3,
						name: '配送中',
						desc: '暂无过期优惠券~'
					}, {
						id: 4,
						name: '待确定',
						desc: '暂无过期优惠券~'
					}, {
						id: 5,
						name: '已完成',
						desc: '暂无过期优惠券~'
					}, {
						id: 6,
						name: '已取消',
						desc: '暂无过期优惠券~'
					}
				],
				orderList: []
			};
		},
		computed: {
			...mapState([
				'isLogin',
				'userInfo',
			]),
		},
		onLoad() {
			this.getOrderList()
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
					title: '是否要取消订单？',
					content: '',
					success: (res) => {
						if (!res.cancel) {
							let params = {
								order_id: id,
							}
							this.$fly.post('/order/cancel', params).then(resp => {
								wx.showToast({
									title: resp.message,
									icon: 'none',
									duration:1200
								});
							})
							this.getOrderList()
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
						duration:1200
					});
				})
				this.TabCur = 2
				this.getOrderList()
			}
			
		},
	}
</script>

<style>
page, .order-page{
	height: 100%;
	display: flex;
	flex-direction: column;
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
.noList{
	width: 596rpx;
	height: 328rpx;
	margin-top: 200rpx;
}

</style>
