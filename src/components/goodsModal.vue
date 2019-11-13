<template>
		<view class="cu-modal bottom-modal" :class="modalName=='ChooseModal'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop="">
				<view class="dialog-main bg-white text-left">

					<view class="flex goodInfo padding-lr-sm ">
						<view class="img-box">
							<image :src="modalGood.image" mode="aspectFill"></image>
						</view>
						<view class="padding-sm">
							<view class="text-price text-lg text-orange margin-right">{{modalStocks[modalStocksIndex].Price}}</view>
							<view class="text-sm">库存： {{modalStocks[modalStocksIndex].stock}}</view>
							<view class="text-sm">已选择： {{modalStocks[modalStocksIndex].label}}</view>
						</view>
						<view class="text-xl text-gray" @tap="hideModal">
							<text class="cuIcon-close close"></text>
						</view>
					</view>

					<view class="flex padding-lr-sm padding-tb-sm">
						<text class="label">
							规格
						</text>
						<view v-for="(item, index) in modalStocks" class="padding-xs" :key="index">
							<button class="cu-btn red sm" :class="item.checked?'bg-red':'line-red'" @tap="ChooseCheckbox(index)"
							:data-value="item.label_id"> {{item.label}}
							</button>
						</view>
					</view>
					<view class="flex padding-lr-sm padding-top-sm padding-bottom-lg justify-between">
						<view class="button-box">
							<text class="label2">
								数量
							</text>
							<text class="btn-box disabled" v-if="modalCuont==1">
								<text class="lg text-gray cuIcon-move"></text>
							</text>
							<text class="btn-box" @click="decCount()" v-else>
								<text class="lg text-gray cuIcon-move" ></text>
							</text>
							<text class="margin-lr-sm">{{modalCuont}}</text>
							<text class="btn-box disabled" v-if="modalCuont>=modalStocks[modalStocksIndex].stock">
								<text class="lg text-gray cuIcon-add" ></text>
							</text>
							<text class="btn-box" @click="addCount()" v-else>
								<text class="lg text-gray cuIcon-add" ></text>
							</text>
						</view>
						<button class="cu-btn bg-red block modal-sub" @click="submitStock(modalGood, modalStocksIndex, modalCuont)" >确定</button>
					</view>

				</view>
			</view>
		</view>
</template>

<script>
import { moneyFormat } from '@/utils/index'

export default {
  data() {
    return {
      modalStocksIndex: 0,
      modalCuont: 1,
      modalGood: {},
			modalName: null,
      modalStocks: [
				{
					price: ''
				}
			],
    }
  },
  methods: {
    // 显示弹窗
    showModal(item) {
			this.modalGood = item
			this.modalStocks = item.stocks
			this.modalStocksIndex = 0
			this.modalCuont = 1

			this.modalStocks.forEach(item => {
				item.Price = moneyFormat(item.price)
				item.checked = false
			})

			this.modalStocks[0].checked = true
			this.modalName = 'ChooseModal'
		},
    // 切换规格
		ChooseCheckbox(index) {
			this.modalStocks.forEach(item => {
				item.checked = false
			})
			this.modalStocksIndex = index
			this.modalStocks[index].checked = true
    },
    decCount() {
			this.modalCuont--
		},
		addCount() {
			this.modalCuont++
    },
    hideModal(e) {
			this.modalName = null
    },
    
  }
}
</script>

<style>

/* 弹窗 */
.cu-dialog{
	background: transparent;
	padding-top: 40rpx;
}
.dialog-main{

}
.cu-dialog .label{
	padding-top: 12rpx;
	padding-right: 14rpx;
}

.cu-dialog .label2{
	padding-top: 2rpx;
	padding-right: 24rpx;
}

.cu-dialog .goodInfo .img-box{
	width: 180rpx;
	height: 160rpx;
}
.cu-dialog .goodInfo image {
	width: 100%;
	height: 100% !important;
	margin-top: -40rpx;
	object-fit: cover;
	border: 2px solid #fff;
}

.cu-dialog .close{
	position: absolute;
	right: 20rpx;
	top: 60rpx;
}
.button-box{
	display: flex;
	line-height: 40xrpx;
	justify-content: flex-start;
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
.disabled{
	opacity: .4;
}
.text-ddd{
	color: #ddd
}
</style>
