<script>
import {mapState, mapMutations } from 'vuex'

export default {
	computed: {
		...mapState([
			'userInfo'
		]),
	},
	created () {
		/*
			每次打开页面先查询是否登录
			1.如果已经登录就获取code，再获取用户信息
			2. 如果没有登录就不操作
		*/
		wx.getSetting({
			success: (res) => {
				let loginMsg = {}

				if (res.authSetting['scope.userInfo']) {
					console.log('已经登录');
					// 已经授权，可以直接调用 getUserInfo 获取头像昵称
					wx.getUserInfo({
						success: (res1) => {
							this.update({userInfo: res1.userInfo})
							loginMsg = res1
							console.log('获取当前设置', res1, res1.userInfo)

							wx.login({
								success:res2 => {
									if (res2.code) {
										let params = {
											code: res2.code,
											encryptedData: loginMsg.encryptedData,
											iv: loginMsg.iv
										}
										this.$fly.post('/onlogin', params).then(res3 => {
											if (res3.status=='success') {
												this.update({isLogin: true})
												console.log(res1.userInfo, 6789);
												// this.update({userInfo: res3.userInfo})
												this.update({userInfo: res3.data})
											} else {
												this.update({isLogin: false})
												this.update({userInfo: null})
											}
										})
									} else {
										console.log('获取openId失败！', res.errMsg)
									}
								}
							})
						}
					})


				}
			}
		})
    // 调用API从本地缓存中获取数据
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */
    
    // let logs
    // if (mpvuePlatform === 'my') {
    //   logs = mpvue.getStorageSync({key: 'logs'}).data || []
    //   logs.unshift(Date.now())
    //   mpvue.setStorageSync({
    //     key: 'logs',
    //     data: logs
    //   })
    // } else {
    //   logs = mpvue.getStorageSync('logs') || []
    //   logs.unshift(Date.now())
    //   mpvue.setStorageSync('logs', logs)
    // }
    console.log(this.userInfo, 5555);
    
    
  },
  log () {
    console.log(`log at:${Date.now()}`)
  },
  methods: {
    ...mapMutations(["update"]),

		// updates(){
		// 	this.update({ 
		// 		userInfo: {cc: 'ddd'}
		// 	});
		// }
  }
}
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
