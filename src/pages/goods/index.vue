<template>
	<view>
		<view class="cu-bar search bg-white">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="搜索图片、文章、视频" confirm-type="search" />
			</view>
			<view class="action">
				<button class="cu-btn bg-green shadow-blur round">搜索</button>
			</view>
		</view>
		<view class="VerticalBox">
			<scroll-view class="VerticalNav nav bg-white" scroll-y scroll-with-animation :scroll-top="verticalNavTop" style="height:calc(100vh - 100rpx)">
				<view class="cu-item" :class="index==tabCur?'text-green cur':''" v-for="(item,index) in classifys" :key="index" @tap="TabSelect(index)"
				 :data-id="index">
					{{item}}
				</view>
			</scroll-view>
			
			<!-- <view class="grid col-2 padding-xs">
				<view class="cu-card case padding-xs" v-for="(item, index) in articleList" :key="index" @click="goRouter(item.id)">
					<view class="cu-item shadow">
						<view class="image">
							<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
							mode="widthFix"></image>
							<view class="cu-tag bg-blue">{{item.label}}</view>
						</view>
						<view class="flex"> 
							<text class="text-cut padding-xs">{{item.title}}</text>
						</view>
						<view class="content text-gray text-sm flex justify-end padding-sm">
							<text class="cuIcon-attentionfill margin-lr-xs"></text> {{item.clicks}}
							<text class="cuIcon-appreciatefill margin-lr-xs"></text> {{item.like_count}}
						</view>
					</view>
				</view>
			</view> -->
			<scroll-view class="VerticalMain" scroll-y scroll-with-animation style="height:calc(100vh - 100rpx)"
			 :scroll-into-view="'main-'+mainCur" @scroll="VerticalMain">
			 	<view class="" v-if="goodList==''">
					<image src="https://image.weilanwl.com/gif/loading-1.gif" mode="aspectFit" class="gif-white response" style="height:160rpx"></image>
				</view>
				<view class="padding-sm" v-else>
					<view class="cu-bar solid-bottom bg-white">
						<view class="action">
							<text class="cuIcon-title text-green"></text> {{classifys[tabCur]}}</view>
					</view>
					<view class="cu-card article no-card solid-bottom" v-for="(item, index) in goodList" :key="index">

						<view class="cu-item shadow padding-tb">
							<view class="content padding-left-sm">
								<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
								mode="aspectFill"></image>
								<view class="desc">
									<view class="titles"> 
										{{item.title}}
									</view>
									<view class="text-xs text-gray descp">{{item.desc}}</view>
									<view class="flex align-end justify-between">
										<view class="margin-top-sm">
											<view class="text-price text-xl text-orange margin-right">{{item.price}}</view>
										</view>
										<view class="button-box">
											<view class="cu-btn cu-avatar bg-green round" @click.stop="addGood(item)">
												<text class="cuIcon-cart"></text>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				classifys: [],
				goodList: [],
				tabCur: 0,
				mainCur: 0,
				verticalNavTop: 0,
				load: true
			};
		},
		onLoad() {
			this.getGoodClassify()
			// uni.showLoading({
			// 	title: '加载中...',
			// 	mask: true
			// });
			// let list = [{}];
			// for (let i = 0; i < 26; i++) {
			// 	list[i] = {};
			// 	list[i].name = String.fromCharCode(65 + i);
			// 	list[i].id = i;
			// }
			// this.list = list;
			// this.listCur = list[0];
		},
		onReady() {
			// uni.hideLoading()
		},
		methods: {
			getGoodClassify() {
				this.$fly.get('/good/classify').then(res => {
					this.classifys = res.data
					this.getGoodList(this.classifys[0])
				})
			},
			getGoodList(classify) {
				let params = {
					classify: classify
				}
				this.$fly.post('/good/list', params).then(res => {
					this.goodList = res.data
				})
			},
			TabSelect(index) {
				this.tabCur = index
				this.mainCur = index;
				this.getGoodList(this.classifys[index])
			},
			VerticalMain(e) {
				let tabHeight = 0;
				if (this.load) {
					for (let i = 0; i < this.list.length; i++) {
						let view = wx.createSelectorQuery().select("#main-" + this.list[i].id);
						view.fields({
							size: true
						}, data => {
							this.list[i].top = tabHeight;
							tabHeight = tabHeight + data.height;
							this.list[i].bottom = tabHeight;
						}).exec();
					}
					this.load = false
				}
				let scrollTop = e.mp.detail.scrollTop + 10;
				for (let i = 0; i < this.list.length; i++) {
					if (scrollTop > this.list[i].top && scrollTop < this.list[i].bottom) {
						this.verticalNavTop = (this.list[i].id - 1) * 50
						this.tabCur = this.list[i].id
						console.log(scrollTop)
						return false
					}
				}
			}
		},
	}
</script>

<style>

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

.cu-card.article>.cu-item .content>image {
	width: 180rpx;
	height: 5.6em;
}


	.fixed {
		position: fixed;
		z-index: 99;
	}

	.VerticalNav.nav {
		width: 160rpx;
		white-space: initial;
	}

	.VerticalNav.nav .cu-item {
		width: 100%;
		text-align: center;
		background-color: #fff;
		margin: 0;
		border: none;
		height: 50px;
		position: relative;
	}

	.VerticalNav.nav .cu-item.cur {
		background-color: #f1f1f1;
	}

	.VerticalNav.nav .cu-item.cur::after {
		content: "";
		width: 8rpx;
		height: 30rpx;
		border-radius: 10rpx 0 0 10rpx;
		position: absolute;
		background-color: currentColor;
		top: 0;
		right: 0rpx;
		bottom: 0;
		margin: auto;
	}

	.VerticalBox {
		display: flex;
		flex: 1;
	}

	.VerticalMain {
		background-color: #f1f1f1;
		flex: 1;
	}
</style>
