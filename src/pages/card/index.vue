<template>
	<view class="card-page">
		<div class="contain" v-if="goodlist.length==0">
			<img src="/static/images/card.png" alt="" class="noList">
			<view class="padding">购物车是空的哦～</view>
			<button class="cu-btn bg-red">去逛逛</button>
		</div>
		<div v-else>

			<view class="cu-card article no-card solid-bottom" v-for="(item, index) in goodlist" :key="index">
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
								{{item.goodname}}
							</view>
							<view class="flex align-end justify-between">
								<view class="margin-top-sm">
									<view class="text-price text-xl text-orange margin-right">{{item.amount}}</view>
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
				<view class="text-df">
					全选
				</view>
				<view class="action text-orange">
					共计：
					<text class="text-price text-lg text-orange margin-right">{{allPrice}}</text>
				</view>
				<view class="bg-red submit" @click="submitOrder" v-if="allPrice!=0">确认订单</view>
				<view class="bg-grey light submit" v-else>确认订单</view>
			</view>

		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
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
			},
			submitOrder() {
				// if (this.allPrice == 0) {
				// 	wx.showToast({
				// 		title: ,
				// 		icon: 'none',
				// 		duration: 2000,
				// 	});
				// }
				wx.navigateTo({url: '/pages/orderlist/main'})
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
