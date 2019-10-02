<template>
	<view>
		<view class="cu-bar search bg-white">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="请输入关键字搜索" confirm-type="search" />
			</view>
			<view class="action">
				<button class="cu-btn bg-green shadow-blur round">搜索</button>
			</view>
		</view>
		<swiper class="card-swiper square-dot" :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="5000" duration="500" @change="cardSwiper" indicator-color="#8799a3"
		 indicator-active-color="#0081ff">
			<swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
				<view class="swiper-item">
					<image :src="item.url" mode="aspectFill"></image>
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

		<!-- 商品 -->
		<view class="cu-card article no-card solid-bottom" v-for="(item, index) in goodList" :key="index">
			<view class="cu-item shadow padding-tb" @click="goDetail(item.id)">
				<view class="content">
					<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
					mode="aspectFill"></image>
					<view class="desc">
						<view class="text-cut" style="width: 450rpx">{{item.title}}</view>
						<!-- <view class="title"><view class="text-cut">无意者 烈火焚身;以正义的烈火拔出黑暗。我有自己的正义，见证至高的烈火吧。</view></view> -->
						<view class="text-xs text-gray descp">{{item.desc}}</view>
						<view class="flex align-end justify-between">
							<view class="margin-top-sm">
								<view class="cu-tag bg-yellow light sm radius" v-if="item.vipprice">会员价: ¥{{item.vipprice | keepTwoNum}}</view>
								<view class="text-price text-xl text-orange margin-right">{{item.price | keepTwoNum}}</view>
							</view>
							<view class="cu-btn cu-avatar bg-green round"   @tap.stop="showModal(item)" data-target="ChooseModal">
								<text class="cuIcon-cart"></text>
								<!-- @click.stop="addGood(item, 0)" -->
							</view>
							<!-- <button class="cu-btn round bg-green sm"  @click.stop="addGood('a')">+购物车</button> -->
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 多规格 -->
		<view class="cu-modal bottom-modal" :class="modalName=='ChooseModal'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop="">
				<view class="dialog-main bg-white text-left">

					<view class="flex goodInfo padding-lr-sm ">
						<view class="img-box">
							<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
							mode="aspectFill"></image>
						</view>
						<view class="padding-sm">
							<view class="text-cut text-sm padding-bottom-xs" style="width: 450rpx">{{modalGood.title}}</view>
							<view class="text-price text-df text-orange margin-right">{{modalStocks[modalStocksIndex].price}}</view>
							<view class="text-sm">已选择： {{modalStocks[modalStocksIndex].label}}</view>
						</view>
						<view class="text-xl text-gray" @tap="hideModal">
							<text class="cuIcon-close close"></text>
						</view>
					</view>

					<view class="flex padding-lr-sm padding-tb-sm">
						<text class="label">
							规格
						</text>
						<view v-for="(item, index) in modalStocks" class="padding-xs" :key="index">
							<button class="cu-btn red sm" :class="item.checked?'bg-red':'line-red'" @tap="ChooseCheckbox(index)"
							:data-value="item.label_id"> {{item.label}}
							</button>
						</view>
					</view>
					<view class="flex padding-lr-sm padding-top-sm padding-bottom-lg justify-between">
						<view class="button-box">
							<text class="label2">
								数量
							</text>
							<text class="btn-box disabled" v-if="modalCuont==1">
								<text class="lg text-gray cuIcon-move"></text>
							</text>
							<text class="btn-box" @click="decCount()" v-else>
								<text class="lg text-gray cuIcon-move" ></text>
							</text>
							<text class="margin-lr-sm">{{modalCuont}}</text>
							<text class="btn-box disabled" v-if="modalCuont>=modalStocks[modalStocksIndex].stock">
								<text class="lg text-gray cuIcon-add" ></text>
							</text>
							<text class="btn-box" @click="addCount()" v-else>
								<text class="lg text-gray cuIcon-add" ></text>
							</text>
						</view>
						<button class="cu-btn bg-red block modal-sub" >确定</button>
					</view>



					<!-- <view class="cu-bar bg-white">
						<view class="action text-blue" @tap="hideModal">取消</view>
						<view class="action text-green" @tap="hideModal">确定</view>
					</view> -->
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
import {mapState, mapMutations } from 'vuex'

export default {
	data() {
		return {
			canIUse: wx.canIUse('button.open-type.getUserInfo'),
			cardCur: 0,
			modalStocksIndex: 0,
			modalCuont: 1,
			modalName: null,
			modalStocks: [
				{
					price: ''
				}
			],
			modalGood: {},
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
			}],
			goodList: []
		};
	},
	filters:{
		keepTwoNum:function(value){
			value = Number(value)
			return value.toFixed(3)
		}
	},
	onLoad() {
		this.getGoodList();
		this.TowerSwiper('swiperList');
		// 初始化towerSwiper 传已有的数组名即可
	},
	mounted (){
		// wx.login({
		// 	success (res) {
		// 		if (res.code){
		// 			wx.(item)({
		// 				title: '是否删除该商品？',
		// 				content: ''
		// 			})
		// 			// 这里可以把code传给后台，后台用此获取openid及session_key
		// 		}
		// 	},
		// })
	},
	computed: {
		...mapState([
			'cartList'
		]),
	},
	methods: {
		...mapMutations(["update"]),
		// 弹窗模块
		showModal(item) {
			this.modalGood = item
			this.modalStocks = item.stocks
			this.modalStocks.forEach(item => {
				item.checked = false
			})
			this.modalStocks[0].checked = true
			this.modalName = 'ChooseModal'
		},
		hideModal(e) {
			this.modalName = null
		},
		ChooseCheckbox(index) {
			this.modalStocks.forEach(item => {
				item.checked = false
			})
			this.modalStocksIndex = index
			this.modalStocks[index].checked = true
		},
		decCount() {
			this.modalCuont--
		},
		addCount() {
			this.modalCuont++
		},


		getGoodList() {
			this.$fly.post('/good/list').then(res => {
				this.goodList = res.data.data
			})
		},
		TabSelect(e) {
		},
		goDetail(id) {
			// let url = '/pages/goodDetail/main'
			wx.navigateTo({url: `/pages/goodDetail/main?id=${id}`})
		},
		addGood(good, index) {
			// 多规格的
			// if (good.stocks.length>1) {
			// 	return false
			// }
			let goodIndex = this.cartList.findIndex((item)=>{
				return item.id == good.id
			})

			// 如果购物车还没有这个商品
			if (goodIndex == -1) {
				good.count = 1
				good.check = true
				good.label_id = good.stocks[index].label_id
				good.price = good.stocks[index].price
				this.cartList.push(good)
			//foodIndex存在 ,更新数据
			} else {
				this.cartList[goodIndex].count++
			}
			this.$set( this.cartList, this.cartList)
			this.$forceUpdate()
			this.update({cartList: this.cartList})

			// wx.setTabBarBadge({
			// 	index: 3,
			// 	text: this.allCount
			// })
			wx.showToast({
				title: '已加入购物车',
				icon: 'none',
				duration:1200
			});

			console.log(this.cartList, 44);
			
		},
		DotStyle(e) {
			this.dotStyle = e.detail.value
		},
		// cardSwiper
		cardSwiper(e) {
			this.cardCur = e.mp.detail.current
		},
		// towerSwiper
		// 初始化towerSwiper
		TowerSwiper(name) {
			let list = this[name];
			for (let i = 0; i < list.length; i++) {
				list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
				list[i].mLeft = i - parseInt(list.length / 2)
			}
			this.swiperList = list
		},

		// towerSwiper触摸开始
		TowerStart(e) {
			this.towerStart = e.touches[0].pageX
		},

		// towerSwiper计算方向
		TowerMove(e) {
			this.direction = e.touches[0].pageX - this.towerStart > 0 ? 'right' : 'left'
		},

		// towerSwiper计算滚动
		TowerEnd(e) {
			let direction = this.direction;
			let list = this.swiperList;
			if (direction == 'right') {
				let mLeft = list[0].mLeft;
				let zIndex = list[0].zIndex;
				for (let i = 1; i < this.swiperList.length; i++) {
					this.swiperList[i - 1].mLeft = this.swiperList[i].mLeft
					this.swiperList[i - 1].zIndex = this.swiperList[i].zIndex
				}
				this.swiperList[list.length - 1].mLeft = mLeft;
				this.swiperList[list.length - 1].zIndex = zIndex;
			} else {
				let mLeft = list[list.length - 1].mLeft;
				let zIndex = list[list.length - 1].zIndex;
				for (let i = this.swiperList.length - 1; i > 0; i--) {
					this.swiperList[i].mLeft = this.swiperList[i - 1].mLeft
					this.swiperList[i].zIndex = this.swiperList[i - 1].zIndex
				}
				this.swiperList[0].mLeft = mLeft;
				this.swiperList[0].zIndex = zIndex;
			}
			this.direction = ""
			this.swiperList = this.swiperList
		},
	},
}
</script>

<style>
.card-swiper{
	background: #fff;
}
.descp{
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

	.tower-swiper .tower-item {
		transform: scale(calc(0.5 + var(--index) / 10));
		margin-left: calc(var(--left) * 100rpx - 150rpx);
		z-index: var(--index);
	}


/* 弹窗 */
.cu-dialog{
	background: transparent;
	padding-top: 40rpx;
}
.dialog-main{

}
.cu-dialog .label{
	padding-top: 12rpx;
	padding-right: 14rpx;
}

.cu-dialog .label2{
	padding-top: 2rpx;
	padding-right: 24rpx;
}

.cu-dialog .goodInfo .img-box{
	width: 180rpx;
	height: 160rpx;
}
.cu-dialog .goodInfo image {
	width: 100%;
	height: 100% !important;
	margin-top: -40rpx;
	object-fit: cover;
	border: 2px solid #fff;
}

.cu-dialog .close{
	position: absolute;
	right: 20rpx;
	top: 60rpx;
}
.button-box{
	display: flex;
	line-height: 40xrpx;
	justify-content: flex-start;
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
.disabled{
	opacity: .4;
}
.text-ddd{
	color: #ddd
}

</style>
