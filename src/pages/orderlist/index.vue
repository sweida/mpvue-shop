<template>
	<view class="order-page">

		<!-- 地址 -->
		<view class="case cu-card no-card addressBox bg-white flex justify-between align-center padding-lr margin-tb"
			style="background-image:url(/static/images/address-bg.png)"
			v-if="!hasAddress"
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
			<view class="cu-item">
				<view class="padding">
					<view class="flex justify-between text-lg ">
						<view class="">收货人：凯尔</view>
						<view class="">13798661111</view>
					</view>
					<view class="text-cut text-grey padding-top-sm address">
						收货地址：广东省广州市天河区 珠江新城 开花国际XXXXXXXXXX 开花国际XXXXXXXXXX
					</view> 
				</view>
			</view>
			<text class='cuIcon-right text-gray'></text>
        </view>
		<!-- <view class="address-border">
		</view> -->

		<!-- 商品 -->
		<view  class="cu-list menu margin--top">
			<view class="cu-item ">
				<view class="content flex justify-between">
					<text class="text-grey">
						<text class='cuIcon-shop text-orange'></text>
						生鲜</text>
					<text class="text-grey">3件商品</text>
				</view>
			</view>

			<view class="cu-card article no-card solid-bottom" v-for="(item, index) in goodlist" :key="index">
				<view class="cu-item shadow padding-tb">
					<view class="content padding-left-sm">
						<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
						mode="aspectFill"></image>
						<view class="desc">
							<view class="titles"> 
								{{item.goodname}}
							</view>
							<view class="flex align-end justify-between">
								<view class="margin-top-sm">
									<view class="text-price text-xl margin-right">{{item.amount}}</view>
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
				<text class="text-price">4453.2</text>
			</view>
			<view class="content text-content flex justify-between">
				<text class="text-black">运费</text>
				<text class="text-price">40.00</text>
			</view>
			<view class="content text-content flex justify-between">
				<text class="text-black">优惠金额</text>
				<text class="text-red">
					-
					<text class=" text-price">20</text>
				</text>
			</view>
		</view>

		<!-- 结算按钮 -->
		<view class="cu-bar bg-white tabbar border shop solid-top">
			<view class="action text-xl">
				应付金额：
				<text class="text-price text-xxl text-red">{{allPrice}}</text>
			</view>
			<view class="bg-red submit">立即支付</view>
		</view>



	</view>
</template>

<script>
	export default {
		data() {
			return {
				hasAddress: true,
				list: [],
				allPrice: 9999.99,
				goodlist: [
					{
						goodname: '这是标题啊啊啊啊啊啊1',
						check: false,
						count: 1,
						amount: 88.90,
						img: 'ss'
					}, {
						goodname: '这是标题啊啊啊啊啊啊2',
						check: true,
						count: 3,
						amount: 88.70,
						img: 'ss'
					}, {
						goodname: '这是标题啊啊啊啊啊啊3',
						check: true,
						count: 2,
						amount: 88.00,
						img: 'ss'
					}, 
				],
			};
		},
		computed: {
			// 所有价格
			allPrice: function() {
				let sum = 0
				this.goodlist.forEach(item => {
					if (item.check) {
						sum += item.amount * item.count
					}
						
				})
				return sum.toFixed(2)
			},
			// 是否全选
			allCheck: function() {
				const checkAdult = (item) => {
					return item.check
				}
				if (!this.goodlist.every(checkAdult)) {
					return false
				} else {
					return true
				}
			} 
		},
		methods: {
			selectAddress() {
				wx.navigateTo({url: `/pages/selectAddress/main`})
			},
			selectVouchers() {
				wx.navigateTo({url: `/pages/vouchers/main`})
			},
			checkGood(index) {
				this.goodlist[index].check = !this.goodlist[index].check
			},
			decCount(index) {
				if (this.goodlist[index].count > 1) {
					this.goodlist[index].count--
				} else {
					let that = this
					wx.showModal({
                    title: '是否删除该商品？',
                    content: '',
                    success(res){
                        if(res.confirm){
							that.goodlist.splice(index, 1)
                        }
                    }
                })
				}
			},
			addCount(index) {
				this.goodlist[index].count++
			},
			handleAllCheck() {
				if (this.allCheck) {
					this.allPrice = 0
					this.goodlist.forEach(item => {
						item.check = false
						this.allCheck = false
						this.allPrice += 0
					})
				} else {
					this.allPrice = 0
					this.goodlist.forEach(item => {
						item.check = true
						this.allCheck = true
						this.allPrice += item.amount * item.count
					})
				}
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
}
.cu-bar.tabbar.shop .action{
	width: 500rpx;
	font-size: 32rpx;
	text-align: left;
	padding-left: 30rpx;
}

</style>
