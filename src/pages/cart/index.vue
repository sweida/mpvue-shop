<template>
	<view class="card-page">
		<div class="contain" v-if="!isLogin || cartList.length==0">
			<img src="/static/images/cart.png" alt="" class="noList">
			<view class="padding">购物车是空的哦～</view>
			<button class="cu-btn bg-red">去逛逛</button>
		</div>
		<div v-else>

			<view class="cu-card article no-card solid-bottom" v-for="(item, index) in cartList" :key="index">
				<text class="text-xxl margin-left-sm" @click="checkGood(index)">
					<text class="text-green cuIcon-roundcheckfill" v-if="item.check"></text>
					<text class="text-ddd cuIcon-roundcheck" v-else></text>
				</text>
				<view class="cu-item shadow padding-tb">
					<view class="content padding-left-sm">
						<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
						mode="aspectFill"></image>
						<view class="desc">
							<view class="titles"> 
								{{item.title}}
							</view>
							<view class="flex align-end justify-between">
								<view class="margin-top-sm">
									<view class="text-price text-xl text-orange margin-right">{{item.price}}</view>
								</view>
								<view class="button-box">
									<text class="btn-box" @click="decCount(index)">
										<text class="lg text-gray cuIcon-move" ></text>
									</text>
									<text class="margin-lr-sm">{{item.count}}</text>
									<text class="btn-box" @click="addCount(index)">
										<text class="lg text-gray cuIcon-add" ></text>
									</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="cu-bar bg-white tabbar border shop solid-top">
				<text class="text-xxl padding-lr-sm" @click="handleAllCheck">
					<text class="text-green cuIcon-roundcheckfill" v-if="allCheck"></text>
					<text class="text-ddd cuIcon-roundcheck" v-else></text>
				</text>
				<view class="text-df" @click="handleAllCheck">
					全选
				</view>
				<view class="action text-orange">
					共计：
					<text class="text-price text-lg text-orange margin-right">{{allPrice}}</text>
				</view>
				<view class="bg-green submit" @click="submitOrder" v-if="allPrice!=0">去结算</view>
				<view class="bg-grey light submit" v-else>去结算</view>
			</view>

		</div>
	</view>
</template>

<script>
import {mapState, mapMutations } from 'vuex'

export default {
	data() {
		return {
		};
	},
	computed: {
		...mapState([
			'isLogin',
			'cartList',
			'cartCount'
		]),
		// 所有价格
		allPrice: function() {
			let sum = 0
			this.cartList.forEach(item => {
				if (item.check) {
					sum += item.count * item.price
				}
					
			})
			return sum.toFixed(2)
		},
		// 是否全选
		allCheck: function() {
			const checkAdult = (item) => {
				return item.check
			}
			if (!this.cartList.every(checkAdult)) {
				return false
			} else {
				return true
			}
		},
		// 购物车数量
		allCount: function() {
			if (!this.isLogin) {
				wx.hideTabBarRedDot({
					index: 3
				})
				return '0'
			}
			let sum = 0
			this.cartList.forEach(item => {
				if (item.check) {
					sum += item.count
				}					
			})
			if (sum > 0) {
				wx.setTabBarBadge({
					index: 3,
					text: sum.toString()
				})
			} else {
				wx.hideTabBarRedDot({
					index: 3
				})
			}
			return sum.toString()
		}
	},
	created() {
		if (this.allCount!='0') {
			wx.setTabBarBadge({
				index: 3,
				text: this.allCount
			})
		} else {
			wx.hideTabBarRedDot({
				index: 3,
			})
		}
		console.log(this.cartCount(), 123);

	},
	onTabItemTap() {		
		// 查看是否授权
		if (!this.isLogin) {
			wx.navigateTo({url: '/pages/login/main'})
		}
	},
	methods: {
		...mapMutations(["update"]),
		checkGood(index) {
			this.cartList[index].check = !this.cartList[index].check
			this.$forceUpdate(this.cartList)
			this.update(this.cartList)
		},
		decCount(index) {
			if (this.cartList[index].count > 1) {
				this.cartList[index].count--
			} else {
				let that = this
				wx.showModal({
					title: '是否删除该商品？',
					content: '',
					success(res){
						if(res.confirm){
							that.cartList.splice(index, 1)
						}
					}
				})
			}
			this.$forceUpdate(this.cartList)
			this.update(this.cartList)
		},
		addCount(index) {
			console.log(index, this.cartList);
			
			this.cartList[index].count++
			this.$forceUpdate(this.cartList)
			this.update(this.cartList)
		},
		handleAllCheck() {
			this.allCheck = !this.allCheck
			this.allPrice = 0
			if (this.allCheck) {
				this.cartList.forEach(item => {
					item.check = false
				})
			} else {
				this.cartList.forEach(item => {
					item.check = true
					this.allPrice += item.price * item.count
				})
			}
			this.$forceUpdate(this.cartList)
			this.update(this.cartList)
		},
		submitOrder() {
			// if (this.allPrice == 0) {
			// 	wx.showToast({
			// 		title: ,
			// 		icon: 'none',
			// 		duration: 2000,
			// 	});
			// }
			wx.navigateTo({url: '/pages/createOrder/main'})
		}
		
	},
}
</script>

<style>
/* 空购物车 */
page, .card-page{
	height: 100%;
	background: #fff;
}
.contain{
	height: 100%;
	text-align: center;
}
.noList{
	width: 596rpx;
	height: 328rpx;
	margin-top: 200rpx;
}
.cu-btn{
	border-radius: 0;
	padding: 0 80rpx;
}


.card-page .article{
	display: flex;
	align-items: center;
}


.titles{
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box !important;
	-webkit-line-clamp:2;
	-webkit-box-orient: vertical;
}
.button-box{
	display: flex;
	line-height: 40xrpx;
	justify-content: space-between;
	align-items: center;
}
.btn-box{
	border: 1px solid #ddd;
	border-radius: 50%;
	width: 40rpx;
	height: 40rpx;
	text-align: center;
	line-height: 40rpx;
}

.text-ddd{
	color: #ddd
}
.cu-card.article>.cu-item .content{
	padding-left: 20rpx;
}
.cu-card>.cu-item{
	flex: 1;
}

.tabbar{
	position: fixed;
	width: 100%;
	bottom: 0;
}
.cu-bar.tabbar.shop .action{
	width: 400rpx;
	text-align: left;
	padding-left: 30rpx;
	font-size: 28rpx;
}


</style>
