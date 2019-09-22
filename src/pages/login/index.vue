<template>
  <view class="bg-white login text-center">
    <view class="padding">
		<view class="bg-gradual-orange padding radius text-center shadow-blur">
			<view class="text-lg">鲜生</view>
			<view class="margin-top-sm text-Abc">#ff9700 - #ed1c24</view>
		</view>
	</view>
    <view class="padding-xs">我们的小程序将获取您的以下权限：</view>
    <view class="text-sm text-gray">获取您的公开信息（昵称、头像、地区及性别）</view>

    <view class="flex padding-sm">
		<button class="cu-btn lg flex-sub bg-gray round margin-sm" @click="goBack">暂不登录</button>
		<button class="cu-btn lg flex-sub bg-green round margin-sm" open-type="getUserInfo" @getuserinfo="bindGetUserInfo" :loading="loading" :disabled="loading">
		<!-- <text class="cuIcon-loading2 cuIconfont-spin" v-if="loading"></text> -->
		立即登录
		</button>
    </view>
		<!-- <button open-type="getUserInfo" @getuserinfo="bindGetUserInfo" @click="getUserInfoClick">获取权限</button> -->


  </view>
</template>

<script>
import {mapState, mapMutations } from 'vuex'

export default {
	data () {
		return {
			loading: false
		}
	},
	computed: {
		...mapState([
			'cartList'
		]),
	},
	created () {
	},
	methods: {
		...mapMutations(["update"]),
		goBack() {
			wx.navigateBack()
		},
		bindGetUserInfo(e) {
			let { encryptedData,userInfo,iv } = e.mp.detail; 
			if (userInfo){
				this.loading = true
				wx.login({
					success:res2 => {
						if (res2.code) {
							let params = {
								code: res2.code,
								encryptedData,
								iv
							}
							this.$fly.post('/onlogin', params).then(res3 => {
								this.loading = false
								if (res3.status=='success') {
									this.update({isLogin: true})
									console.log(res2.userInfo, 678);
									
									// this.update({loginData: res3.data})
									wx.navigateBack()
									// 购物车数量
									this.cartCount()
									console.log(res3.data, '登录成功');
								} else {
									this.update({isLogin: false})
									// this.update({loginData: null})
									wx.showToast({
										title: res3.message,
										icon: 'none',
										duration:2000
									});
								}
							})
						} else {
							console.log('获取openId失败！', res.errMsg)
						}
					}
				})
			} else {
				wx.showToast({
					title: '授权失败，为了完整体验，获取更多的优惠活动，需要您的授权',
					icon: 'none',
					duration:2000
				});
			}
		},
		// 购物车数量
		cartCount() {
			let sum = 0
			this.cartList.forEach(item => {
				if (item.check) {
					sum += item.amount
				}					
			})
			if (sum > 0) {
				wx.setTabBarBadge({
					index: 3,
					text: sum.toString()
				})
			}
		}

	}
}
</script>

<style>
page, .login{
  height: 100%;
}
.bg-green[disabled]{
  background-color: #87d5a1 !important;
  color: #fff !important;
}

</style>
