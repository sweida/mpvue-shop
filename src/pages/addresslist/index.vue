<template>
	<view class="addresslist ">
        <div class="contain" v-if="addressList.length==0">
			<img src="/static/images/address.png" alt="" class="noList">
			<view class="padding">还没有收货地址</view>
		</div>
        <view class="margin-top address-page" v-else>
            <view class=" bg-white solid-bottom" v-for="(item, index) in addressList" :key="index">
                <view class="cu-item">
                    <view class="padding-lr padding-top">
                        <view class="flex justify-between text-lg ">
                            <view class="">{{item.name}}</view>
                            <view class="">{{item.phone}}</view>
                        </view>
                        <view class="text-cut text-grey padding-top-sm">
                            <text class='cuIcon-locationfill text-orange'></text>
                            {{item.city}} {{item.address}}
                        </view> 
                        <view class="flex">
                            <view class="flex-sub cu-form-group" style="padding-left: 0">
                                <radio :class="item.active ? 'checked':''" :checked="item.active" @click="checkAddress(item.id, index, item.active)">
                                    <view class="title padding-left-xs">设为默认</view>
                                </radio>
                            </view>
                            <view class="flex-twice flex justify-end align-center" style="font-size: 20px">
                                <text class='cuIcon-edit margin-left' @click="goRouter('address')"></text>
                                <text class='cuIcon-delete margin-left' @click="handleDelele(item.id, index)"></text>
                            </view>
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
import {mapState, mapMutations } from 'vuex'
 
	export default {
		data() {
			return {
                addressList: [],
				region: ['广东省', '广州市', '海珠区'],
			};
        },
        computed: {
            ...mapState([
                'userInfo'
            ]),
        },
        onShow() {
            this.getAddressList()
        },
		methods: {
            getAddressList() {
                this.$fly.post('/address/list', {user_id: this.userInfo.openid}).then(res => {
                    res.data.forEach(item => {
                        item.city = item.city.split(',').join('')
                    })
                    this.addressList = res.data
                })
            },
			RegionChange(e) {
				this.region = e.mp.detail.value
            },
            checkAddress(id, index, active) {
                if (active) {
                    return false
                }

                let params = {
                    id,
                    user_id: this.userInfo.openid
                }
                this.$fly.post('/address/setactive', params).then(res => {
                    if (res.status == 'success') {
                        this.addressList.forEach(item => {
                            item.active = null
                        })
                        this.addressList[index].active = 'active'
                    }
                })
            },
            goRouter(url) {			
                wx.navigateTo({url: `/pages/${url}/main`})
            },
            handleDelele(id, index) {
                wx.showModal({
                    title: '是否删除该地址？',
                    content: '',
                    success: resp => {
                        if(resp.confirm){
                            this.$fly.post('/address/delete', {id}).then(res => {
                                this.addressList.splice(index, 1)
                            })
                        }
                    }
                })
            }
		},
	}
</script>

<style>
page, .addresslist{
	height: 100%;
}
.contain{
	height: 100%;
    background: #fff;
	text-align: center;
}
.noList{
	width: 614rpx;
	height: 352rpx;
	margin-top: 200rpx;
}

.address-page{
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
