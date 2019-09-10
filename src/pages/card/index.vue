<template>
	<div class="contain">
		<!-- 596 * 328x -->
		<img src="/static/images/card.png" alt="" class="noList">
		<view class="padding">购物车是空的哦～</view>
		<button class="cu-btn bg-red">去逛逛</button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
			};
		},
		methods: {
			
		},
	}
</script>

<style>
	page{
		height: 100%;
	}
	.contain{
		height: 100%;
		background: #fff;
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
