<template>
	<view class="card-page">
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in nav" :key="index" @tap="tabSelect(index)" :data-id="index">
					{{item.name}}({{voucherlist[index].length || 0}})
				</view>
			</view>
		</scroll-view>



		<view class="text-center">
			<img src="/static/images/card.png" alt="" class="noList">
			<view class="padding">{{desc}}</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,
				desc: '暂无可用优惠券~',
				nav: [
					{
						id: 1,
						name: '可用',
						desc: '暂无可用优惠券~'
					}, {
						id: 2,
						name: '已使用',
						desc: '暂无使用优惠券~'
					}, {
						id: 3,
						name: '已过期',
						desc: '暂无过期优惠券~'
					}
				],
				voucherlist: [
					{},
					{},
					{}
				],
			};
		},
		methods: {
			tabSelect(index) {
				this.TabCur = index;
				this.desc = this.nav[index].desc
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


</style>
