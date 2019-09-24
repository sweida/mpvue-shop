<template>
	<view >
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">收货人</view>
				<input placeholder="请输入收货人姓名" name="input" v-model="formData.name"/>
			</view>
			<view class="cu-form-group">
				<view class="title">联系电话</view>
				<input placeholder="请输入收货人手机号码" name="input" type="number" max="11" v-model="formData.phone"/>
			</view>
			<view class="cu-form-group">
				<view class="title">地址选择</view>
				<picker mode="region" @change="RegionChange" v-model="region">
					<view class="picker">
						{{region[0]}}，{{region[1]}}，{{region[2]}}
					</view>
				</picker>
			</view>

			<view class="cu-form-group align-start">
				<view class="title">详细地址</view>
				<textarea maxlength="-1" v-model="formData.address" placeholder="请输入详细地址"></textarea>
			</view>
			<view class="cu-form-group">
				<view class="title">设为默认</view>
				<switch @change="SwitchA" :class="formData.active?'checked':''" :checked="formData.active"></switch>
			</view>
		</form>

		<view class="padding flex flex-direction margin-top-lg">
			<button class="cu-btn bg-green lg round" @click="handleAdd">保存地址</button>
		</view>



	</view>
</template>

<script>
import {mapState, mapMutations } from 'vuex'

	export default {
		data() {
			return {
				region: ['广东省', '广州市', '海珠区'],
				formData: {
					name: '',
					phone: '',
					city: ['广东省', '广州市', '海珠区'],
					address: '',
					check: true,
					active: 'active',
				}
			};
		},
		computed: {
            ...mapState([
                'userInfo'
            ]),
		},
		onLoad(){
			// 清空页面数据
			Object.assign(this.$data, this.$options.data())
		},
		methods: {
			SwitchA(e) {
				this.formData.check = !this.formData.check
				this.formData.active = this.formData.check ? 'active' : null
			},
			RegionChange(e) {
				this.region = e.mp.detail.value
			},
			handleAdd() {
				this.formData.city = this.region.join(',')
				
				let params = {
					user_id: this.userInfo.openid,
					...this.formData
				}
				this.$fly.post('/address/add', params).then(res => {
					if (res.status == 'success') {
						wx.showToast({
							title: res.message,
							icon: 'success',
							duration: 2000,
						});
						setTimeout(() => {
							wx.navigateBack()
						},1500)
					} else {
						wx.showToast({
							title: res.message,
							icon: 'none',
							duration: 2000
						});
					}
				})
			}
		},
	}
</script>

<style>

.cu-form-group .title {
	min-width: calc(4em + 15px);
}


</style>
