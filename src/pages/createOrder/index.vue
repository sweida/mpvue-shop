<template>
	<view class="order-page">

		<!-- 地址 -->
		<view class="case cu-card no-card addressBox bg-white flex justify-between align-center padding-lr margin-tb"
			style="background-image:url(/static/images/address-bg.png)"
			v-if="!userInfo.defaultAddress"
			@click="selectAddress"
		>
			<text class='cuIcon-locationfill text-orange'></text>
			<view class="newAddress">
				请选择一个收获地址
			</view> 
			<text class='cuIcon-right text-gray'></text>
		</view>

		<view class="case cu-card no-card addressBox bg-white flex justify-between align-center padding-lr margin-tb"
			style="background-image:url(/static/images/address-bg.png)"
			@click="selectAddress"
			v-else
		>
			<text class='cuIcon-locationfill text-orange'></text>
			<view class="cu-item flex-sub">
				<view class="padding">
					<view class="flex justify-between text-lg ">
						<view class="">收货人：{{address.name}}</view>
						<view class="">{{address.phone}}</view>
					</view>
					<view class=" text-grey padding-top-sm address">
						收货地址：{{address.city + ' ' + address.address}}
					</view> 
				</view>
			</view>
			<text class='cuIcon-right text-gray'></text>
        </view>

		<!-- 商品 -->
		<view  class="cu-list menu margin--top">
			<view class="cu-item ">
				<view class="content flex justify-between">
					<text class="text-grey">
						<text class='cuIcon-shop text-orange'></text>
						生鲜</text>
					<text class="text-grey">{{allCount}}件商品</text>
				</view>
			</view>

			<view class="cu-card article no-card solid-bottom" v-for="(item, index) in checkList" :key="index">
				<view class="cu-item shadow padding-tb">
					<view class="content padding-left-sm">
						<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
						mode="aspectFill"></image>
						<view class="desc">
							<view class="titles"> 
								{{item.title}}
							</view>
							<view>
								<view class='cu-tag radius sm'>{{item.label}}</view>
							</view>
							<view class="flex align-end justify-between">
								<view class="margin-top-sm">
									<view class="text-price text-lg margin-right">{{item.price}}</view>
								</view>
								<view class="button-box text-gray">
									<text class="margin-lr-sm">x {{item.count}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>

		</view>

		<!-- 优惠券和备注 -->
		<!-- <view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 菜单列表
			</view>
		</view> -->
		<view class="cu-list menu">
			<view class="cu-item arrow" @click="selectVouchers">
				<view class="content flex justify-between">
					<text class="">优惠券</text>
					<text class="text-grey">无</text>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">备注</view>
				<input placeholder="口味、偏好等要求" name="input" class="text-right" />
			</view>
		</view>

		
		<!-- 结算列表 -->
		<view class="cu-card padding bg-white margin-top text-lg">
			<view class="content text-content flex justify-between">
				<text class="text-black">商品总价</text>
				<text class="text-price">{{goodPrice}}</text>
			</view>
			<view class="content text-content flex justify-between">
				<text class="text-black">运费</text>
				<text class="text-price">{{expressPrice}}</text>
			</view>
			<view class="content text-content flex justify-between">
				<text class="text-black">优惠金额</text>
				<text class="text-red">
					-
					<text class=" text-price">{{discountAmount}}</text>
				</text>
			</view>
		</view>

		<!-- 结算按钮 -->
		<view class="cu-bar bg-white tabbar border shop solid-top">
			<view class="action text-xl">
				应付金额：
				<text class="text-price text-xxl text-red">{{allPrice}}</text>
			</view>
			<view class="bg-red submit" @click="createOrder">创建订单</view>
		</view>



	</view>
</template>

<script>
import {mapState, mapMutations } from 'vuex'

	export default {
		data() {
			return {
				hasAddress: true,
				list: [],
				address: '',
				expressPrice: 2000,
				discountAmount: 0
			};
		},
		computed: {
			...mapState([
				'userInfo',
				'cartList'
			]),
			checkList: function() {
				const filterByName = (arr) => {
					return arr.filter(item => item.check == true)
				}
				return filterByName(this.cartList)
			},
			// 商品总数
			allCount: function() {
				let sum = 0
				this.checkList.forEach(item => {
					sum += item.count	
				})
				return sum
			},
			// 商品价格
			goodPrice: function() {
				let sum = 0
				this.checkList.forEach(item => {
					sum += item.price * item.count	
				})
				return sum
			},
			// 付款金额
			allPrice: function() {
				return this.goodPrice + this.expressPrice - this.discountAmount
			}
		},
		onShow() {
			this.address = this.userInfo.defaultAddress
			this.address.city = this.userInfo.defaultAddress.city.split(',').join('')
		},
		methods: {
			selectAddress() {
				wx.navigateTo({url: `/pages/selectAddress/main`})
			},
			selectVouchers() {
				wx.navigateTo({url: `/pages/vouchers/main`})
			},
			createOrder() {
				let params = {
					user_id: this.userInfo.openid,
					expressType: '快递',
					expressName: '顺丰',
					expressPrice: this.expressPrice,
					addressName: this.address.name,
					addressPhone: this.address.phone,
					address: this.address.city + this.address.address,
					discount: 0,
					discount_id: '',
					goodList: this.checkList
				}
				console.log(this.checkList, 56);
				
				this.$fly.post('/order/create', params).then(res => {

				})
			}
			
		},
	}
</script>

<style>
.addressBox{
	padding-bottom: 8rpx;
	background-repeat: repeat-x;
	background-position: bottom;
	background-size: 80rpx;
}
.newAddress{
	padding: 50rpx 0;
}
.order-page{
	padding-bottom: 130rpx;
}
.text-content{
	line-height: 2;
}
.address{
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box !important;
	-webkit-line-clamp:2;
	-webkit-box-orient: vertical;
}


.cu-card.article>.cu-item .content>image {
	width: 140rpx;
	height: 120rpx;
}


.tabbar{
	position: fixed;
	width: 100%;
	bottom: 0;
	z-index: 100;
}
.cu-bar.tabbar.shop .action{
	width: 500rpx;
	font-size: 32rpx;
	text-align: left;
	padding-left: 30rpx;
}

</style>
