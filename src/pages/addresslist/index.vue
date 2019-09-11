<template>
	<view class="addresslist margin-top">
        <view class=" bg-white solid-bottom">
            <view class="cu-item">
                <view class="padding-lr padding-top">
                    <view class="flex justify-between text-lg ">
                        <view class="">凯尔</view>
                        <view class="">13798661111</view>
                    </view>
                     <view class="text-cut text-grey padding-top-sm">
                        <text class='cuIcon-locationfill text-orange'></text>
                        广东省广州市天河区 珠江新城 开花国际
                    </view> 
                    <view class="flex">
                        <view class="flex-sub cu-form-group" style="padding-left: 0">
                            <checkbox class='round' :checked="false" value="B">
                                <view class="title padding-left-xs">设为默认</view>
                            </checkbox>
                        </view>
                        <view class="flex-twice flex justify-end align-center" style="font-size: 20px">
                            <text class='cuIcon-edit margin-left' @click="goRouter('address')"></text>
                            <text class='cuIcon-delete margin-left' @click="deleleAdd"></text>
                        </view>
                    </view>
                </view>
            </view>
            
        </view>
        <view class=" bg-white solid-bottom">
            <view class="cu-item">
                <view class="padding-lr padding-top">
                    <view class="flex justify-between text-lg ">
                        <view class="">凯尔</view>
                        <view class="">13798661111</view>
                    </view>
                     <view class="text-cut text-grey padding-top-sm">
                        <text class='cuIcon-locationfill text-orange'></text>
                        广东省广州市天河区 珠江新城 开花国际
                    </view> 
                    <view class="flex">
                        <view class="flex-sub cu-form-group" style="padding-left: 0">
                            <checkbox class='round' :checked="false" value="B">
                                <view class="title padding-left-xs">设为默认</view>
                            </checkbox>
                        </view>
                        <view class="flex-twice flex justify-end align-center" style="font-size: 20px">
                            <text class='cuIcon-edit margin-left' @click="goRouter('address')"></text>
                            <text class='cuIcon-delete margin-left'></text>
                        </view>
                    </view>
                </view>
            </view>
            
        </view>
        <view class=" bg-white solid-bottom">
            <view class="cu-item">
                <view class="padding-lr padding-top">
                    <view class="flex justify-between text-lg ">
                        <view class="">凯尔</view>
                        <view class="">13798661111</view>
                    </view>
                     <view class="text-grey padding-top-sm">
                        <text class='cuIcon-locationfill text-orange'></text>
                        广东省广州市天河区 珠江新城 开花国际
                        广东省广州市天河区 珠江新城 开花国际
                    </view> 
                    <view class="flex">
                        <view class="flex-sub cu-form-group" style="padding-left: 0">
                            <checkbox class='round' :checked="false" value="B">
                                <view class="title padding-left-xs">设为默认</view>
                            </checkbox>
                        </view>
                        <view class="flex-twice flex justify-end align-center" style="font-size: 20px">
                            <text class='cuIcon-edit margin-left' @click="goRouter('address')"></text>
                            <text class='cuIcon-delete margin-left'></text>
                        </view>
                    </view>
                </view>
            </view>
            
        </view>
        

		<view class="padding flex flex-direction newAdd" >
			<button class="cu-btn bg-green lg round" @click="goRouter('address')">新增地址</button>
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
            goRouter(url) {			
                wx.navigateTo({url: `/pages/${url}/main`})
            },
            deleleAdd() {
                wx.showModal({
                    title: '是否删除该地址？',
                    content: '',
                    success(res){
                        if(res.confirm){
                            console.log('删除');
                            
                        }
                    }
                })
            }
		},
	}
</script>

<style>
.addresslist{
    padding-bottom: 160rpx;
}
.cu-form-group .title {
	min-width: calc(4em + 15px);
}

radio::before, checkbox::before{
    left: 10rpx;
    right: 0;
}
.newAdd{
    position: fixed;
    bottom: 0;
    width: 100%;
    background: #fff;
    z-index: 100;
}
</style>
