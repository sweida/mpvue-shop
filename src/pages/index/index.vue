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

		<!-- banner -->
		<Banners></Banners>

		<!-- 分类 -->
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
		<view class="cu-card article no-card solid-bottom" v-for="(item, index) in goodsList" :key="index">
			<view class="cu-item shadow padding-tb" @click="goDetail(item.id)">
				<view class="content">
					<image :src="item.image"
					mode="aspectFill"></image>
					<view class="desc">
						<view class="text-cut" style="width: 450rpx">{{item.title}}</view>
						<view class="text-xs text-gray descp">{{item.desc}}</view>
						<view class="flex align-end justify-between">
							<view class="margin-top-sm">
								<view class="cu-tag bg-yellow light sm radius" v-if="item.stocks[0].vip_price">会员价: ¥{{item.stocks[0].vip_price}}</view>
								<view class="text-price text-xl text-orange margin-right">{{item.price}}</view>
							</view>
							<view class="cu-btn cu-avatar bg-green round" @tap.stop="addGoods(item, 0, 1)" data-target="ChooseModal">
								<text class="cuIcon-cart"></text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 多规格弹窗 -->
		<GoodsModal ref="goodsModal" @submitStock=submitStock></GoodsModal>

	</view>
</template>

<script>
import { moneyFormat } from '@/utils/index'
import GoodsModal from '@/components/goodsModal'
import Banners from '@/components/banners'
import {mapState, mapMutations } from 'vuex'

export default {
	components: {
		GoodsModal,
		Banners
	},
	data() {
		return {
			modalStocksIndex: 0,
			modalCuont: 1,
			modalName: null,
			modalStocks: [
				{
					price: ''
				}
			],
			modalGood: {},
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
			goodsList: []
		};
	},
	onLoad() {
		this.getGoodsList();
	},
	mounted (){

	},
	computed: {
		...mapState([
			'cartList',
			'userInfo'
		]),
	},
	methods: {
		...mapMutations(["update"]),
		getGoodsList() {
			this.$fly.post('/goods/list').then(res => {
				res.data.data.forEach(item => {
					item.price = moneyFormat(item.stocks[0].price)
					item.image = this.$staticUrl + item.defaultBanner
				})
				this.goodsList = res.data.data
			})
		},
		goDetail(id) {
			wx.navigateTo({url: `/pages/goodsDetail/main?id=${id}`})
		},

		addGoods(goods, index) {
			// 多规格的情况弹窗
			if (goods.stocks.length>1) {
				this.$refs.goodsModal.showModal(goods)
			} else {
				this.submitStock(goods, 0, 1)
			}
		},
		
		// 商品，第几个label，数量
		submitStock(goods, index=0, count=1) {
			let params = {
				...goods,
				goods_id: goods.id,
				label_id: goods.stocks[index].label_id,
				user_id: this.userInfo.openid,
				count: count
			}
			this.$fly.post('/cart/add', params).then(res => {
				wx.showToast({
					title: '已加入购物车',
					icon: 'none',
					duration:1200
				});
			})

			setTimeout(() => {
				this.$refs.goodsModal.hideModal()
			}, 300)
		},
	},
}
</script>

<style>

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



</style>
