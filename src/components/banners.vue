<template>
	<!-- banner -->
	<swiper class="card-swiper square-dot" :indicator-dots="true" :circular="true"
		:autoplay="true" interval="5000" duration="500" @change="cardSwiper" indicator-color="#8799a3"
		indicator-active-color="#0081ff">
		<swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
			<view class="swiper-item">
				<image :src="item.url" mode="aspectFill"></image>
			</view>
		</swiper-item>
	</swiper>
</template>

<script>
export default {
	data() {
		return {
			cardCur: 0,
			swiperList: [],
		}
	},
	onLoad() {
		this.getBanners();
		this.TowerSwiper('swiperList');
	},
  	methods: {
		getBanners() {
			let params = {
				type: 'banners'
			}
			this.$fly.post('/ad/list', params).then(res => {
				this.swiperList = res.data.data
				this.swiperList.forEach(item => {
					item.url = this.$staticUrl + item.url
				})
			})
		},
		// banner特效
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
  }
}
</script>

<style>
.card-swiper{
	background: #fff;
}
</style>
