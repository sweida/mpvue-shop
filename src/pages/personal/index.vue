<template>
  	<div >
		<view class="grid col-1">
			<view class="text-center shadow-blur person-bg">
				<img src="/static/images/person-bg.png" alt="" width="100%" class="img-bg">
				<view class="cu-list menu-avatar" v-if="isLogin">
					<view class="cu-item bg-no">
						<view class="cu-avatar round lg" >
							<open-data type="userAvatarUrl"></open-data>
						</view>
						<view class="content flex-sub text-left">
							<view>
								<open-data type="userNickName"></open-data>
							</view>
							<view class='cu-tag round bg-black'>
								<text class="cuIcon-crown text-orange"></text>
								普通会员
							</view>
						</view>
					</view>
				</view>
				<view class="cu-list menu-avatar" v-else>
					<view class="cu-item bg-no">
						<view class="cu-avatar round lg bg-white" @click="goRouter('login')"></view>
						<view class="content flex-sub text-left" @click="goRouter('login')">
							<view>立即登录</view>
						</view>
					</view>
				</view>
			</view>
		</view>

	  	<view  class="cu-list menu card-menu margin--top">
			<view class="cu-item arrow" @click="goRouter('orderlist')">
				<view class="content">
					<text class="text-grey">我的订单</text>
				</view>
				<view class="text-gray text-sm">查看全部订单</view>
			</view>
			<view class="cu-list grid col-4 no-border">
				<view class="cu-item" v-for="(item,index) in cuIconList" :key="index">
					<view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]">
						<view class="cu-tag badge" v-if="item.badge!=0">
							<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
						</view>
					</view>
					<text>{{item.name}}</text>
				</view>
			</view>
		</view>
		<view class="cu-list menu card-menu">
			<view class="cu-item arrow" @click="goRouter('addresslist')">
				<view class="content">
					<text class="cuIcon-circlefill text-grey"></text>
					<text class="text-grey">地址管理</text>
				</view>
			</view>
			<view class="cu-item arrow" @click="goRouter('addresslist')">
				<view class="content">
					<text class="cuIcon-circlefill text-grey"></text>
					<text class="text-grey">收藏商品（{{userInfo.likeCount}}）</text>
				</view>
			</view>
			<view class="cu-item arrow">
				<button class="cu-btn content" open-type="contact">
					<text class="cuIcon-service text-olive"></text>
					<text class="text-grey">联系客服</text>
				</button>
			</view>
			<view class="cu-item arrow">
				<navigator class="content" hover-class="none" url="../list/list" open-type="redirect">
					<text class="cuIcon-discoverfill text-orange"></text>
					<text class="text-grey">常见问题</text>
				</navigator>
			</view>
			<view class="cu-item arrow">
				<view class="content">
					<text class="cuIcon-emojiflashfill text-pink"></text>
					<text class="text-grey">联系客服</text>
				</view>
			</view>
		</view>
	</div>
</template>

<script>
import card from '@/components/card'
import {mapState, mapMutations } from 'vuex'

export default {
	computed: {
		...mapState([
			'userInfo',
			'isLogin'
		]),
	},
	data () {
		return {
			motto: 'Hello miniprograme',
			cuIconList: [
				{
					cuIcon: 'cardboardfill',
					color: 'red',
					badge: 120,
					name: '待付款'
				}, {
					cuIcon: 'recordfill',
					color: 'orange',
					badge: 1,
					name: '待配送'
				}, {
					cuIcon: 'picfill',
					color: 'yellow',
					badge: 0,
					name: '待提货'
				}, {
					cuIcon: 'noticefill',
					color: 'olive',
					badge: 22,
					name: '已配送'
				}
			],

		}
	},

	components: {
		card
	},

	methods: {
		goRouter(url) {			
			wx.navigateTo({url: `/pages/${url}/main`})
		}

	},

	created () {
		// let app = getApp()
	}
}
</script>

<style scoped>
.menu-avatar .cu-avatar{
	border: 2px solid #fff;
	overflow: hidden;
}

.menu-avatar .cu-avatar > ._open-data{
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
}
.menu-avatar .cu-tag{
	height: 19px;
	font-size: 10px;
}

.person-bg{
	padding: 30px 0 50px;
	overflow: hidden;
}
.person-bg .bg-no{
	padding-right: 0 !important;
}
.img-bg{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;

}
.margin--top{
	margin-top: -40px;
}

</style>
