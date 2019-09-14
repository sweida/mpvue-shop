<template>
	<view class="selectAddress margin-top">
        <view>
            <view class="cu-card article no-card bg-white solid-bottom" v-for="(item, index) in addressList" :key="index" @click="selectAdd(index)">
                <text class="text-xxl margin-left-sm" >
                    <text class="text-green cuIcon-roundcheckfill" v-if="item.check"></text>
                    <text class="text-gray text-ddd cuIcon-round" v-else></text>
                </text>
                <view class="cu-item">
                    <view class="padding-lr padding-top">
                        <view class="flex justify-between text-lg ">
                            <view class="">{{item.name}}</view>
                            <view class="">{{item.phone}}</view>
                        </view>
                        <view class="text-gray padding-top-sm detailAddress">
                            <text class='cuIcon-locationfill text-orange'></text>
                            {{item.address}}
                        </view> 
                    </view>
                </view>
                <view class="text-xl padding-right-sm" @click.stop="edit(item.id, index)">
                    <text class='cuIcon-edit'></text>
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
                addressList: [
                    {
                        id: 1,
                        name: '叶湘伦',
                        address: '广东省广州市天河区 珠江新城 开花国际XXXXXXXXXXXXXXXXXXXXXXX',
                        phone: '13798889888',
                        check: true,
                    }, {
                        id: 2,
                        name: '韦小宝',
                        address: '广东省广州市天河区 珠江新城 开花国际XXXXXXXXX',
                        phone: '13798889888',
                        check: false,
                    }, {
                        id: 3,
                        name: '方世玉',
                        address: '广东省广州市天河区 珠江新城 开花国际XXXXXXXXX',
                        phone: '13798889888',
                        check: false,
                    }
                ]
			};
		},
		methods: {
            selectAdd(index) {
                this.addressList.forEach(item => {
                    item.check = false
                })
                this.addressList[index].check = true
            },
            edit(id, index) {
                wx.navigateTo({url: `/pages/address/main`})
            }
		},
	}
</script>

<style>
.selectAddress .article{
    display: flex;
    align-items: center;
}
.detailAddress{
    overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box !important;
	-webkit-line-clamp:2;
	-webkit-box-orient: vertical;
}

.newAdd{
    position: fixed;
    bottom: 0;
    width: 100%;
    background: #fff;
    z-index: 100;
}
</style>
