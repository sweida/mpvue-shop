<template>
	<view class="card-page">
		<!-- <div class="contain">
			<img src="/static/images/card.png" alt="" class="noList">
			<view class="padding">购物车是空的哦～</view>
			<button class="cu-btn bg-red">去逛逛</button>
		</div> -->
		<div>
			<view class="cu-card article no-card solid-bottom">
			<view class="cu-item shadow padding-tb" @click="goDetail('a')">
				<view class="content">
					<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
					 mode="aspectFill"></image>
					<view class="desc">
						<view class="desc"> 
							这是标题啊啊啊啊嗷嗷这是标题啊啊啊啊嗷嗷
						</view>
						<!-- <view class="text-cut" style="width: 450rpx">这是标题啊啊啊啊嗷嗷这是标题啊啊啊啊嗷嗷</view> -->
						<!-- <view class="title"><view class="text-cut">无意者 烈火焚身;以正义的烈火拔出黑暗。我有自己的正义，见证至高的烈火吧。</view></view> -->
						<view class="flex align-end justify-between">
							<view class="margin-top-sm">
								<view class="text-price text-xl text-orange margin-right">80.00</view>
							</view>
							<button class="cu-btn round bg-green sm"  @click.stop="addGood('a')">+购物车</button>
						</view>
					</view>
				</view>
			</view>
		</view>
		</div>
	</view>
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

.desc{
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box !important;
	-webkit-line-clamp:2;
	-webkit-box-orient: vertical;
}

</style>
