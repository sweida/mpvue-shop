<template>
	<view >
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">收货人</view>
				<input placeholder="请输入收货人姓名" name="input" />
			</view>
			<view class="cu-form-group">
				<view class="title">联系电话</view>
				<input placeholder="请输入收货人手机号码" name="input" type="number" max="11"/>
			</view>
			<view class="cu-form-group">
				<view class="title">地址选择</view>
				<picker mode="region" @change="RegionChange" :value="region">
					<view class="picker">
						{{region[0]}}，{{region[1]}}，{{region[2]}}
					</view>
				</picker>
			</view>
			<!-- <view class="cu-form-group">
				<view class="title">详细地址</view>
				<input placeholder="请输入详细地址" name="input" />
				<text class='cuIcon-locationfill text-orange'></text>
			</view> -->
			<view class="cu-form-group align-start">
				<view class="title">详细地址</view>
				<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaBInput" placeholder="请输入详细地址"></textarea>
			</view>
			<view class="cu-form-group">
				<view class="title">设为默认</view>
				<checkbox class='round' :class="checkbox[1].checked?'checked':''" :checked="checkbox[1].checked?true:false" value="B"></checkbox>
			</view>
		</form>

		<view class="padding flex flex-direction margin-top-lg">
			<button class="cu-btn bg-green lg round">保存地址</button>
		</view>



	</view>
</template>

<script>
	export default {
		data() {
			return {
				region: ['广东省', '广州市', '海珠区'],
			};
		},
		methods: {
			RegionChange(e) {
				this.region = e.mp.detail.value
			},
		},
	}
</script>

<style>

.cu-form-group .title {
	min-width: calc(4em + 15px);
}


</style>
