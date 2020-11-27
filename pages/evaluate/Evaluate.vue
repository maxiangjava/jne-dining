<template>
	<view class="uni-padding-wrap">
		<!-- 评论区 start -->
		<view class="uni-comment-list" v-for="item in evaluateList" :key="item.id">
			<view class="uni-comment-face">
				<image :src="item.evaluateUserImg" mode="widthFix"></image>
			</view>
			<view class="uni-comment-body">
				<view class="uni-comment-top">
					<text class="uni-comment-top-name">{{item.evaluateUserName}}</text>
					<text class="yticon icon-dianzan-ash uni-comment-top-dianzan" :style="item.zanStyle" @click="dianZan(item)">
						<text style="font-size: 28upx;">{{item.zan}}</text>
					</text>
				</view>
				<view class="uni-comment-content">{{item.content}}</view>
				<view class="uni-comment-time">
					<text>{{item.evaluateTime | formatTime}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
    export default {
        data() {
            return {
				foodId:'',
                evaluateList: [],
				zan:{color: '#c1c1c1'}
            }
        },
		onLoad(options){
			this.foodId = options.foodId;
			console.log(this.foodId);
			this.loadData();
		},
		methods:{
			async dianZan(item){
				if(!item.zanFlag){
					item.zanStyle = {color: '#fa436a'};
					item.zan++;
					item.zanFlag = true;
					await this.$http('/evaluate/zan',{id:item.id});
				}
				
			},
			async loadData(){
				this.evaluateList = await this.$http('/evaluate/list',{foodId:this.foodId});
				console.log(this.evaluateList);
			},
		}
    }
</script>

<style lang="scss">
	page, .uni-padding-wrap{
		background: $page-color-base;
		height: 100%;
	}

    .uni-padding-wrap {
        padding: 10upx;
		.uni-comment-list {
			background-color: #fff;
		    flex-wrap: nowrap;
			margin-bottom: 5px;
			border-radius: 10px;
		    padding: 10rpx;
		    width: 100%;
		    display: flex;
			.uni-comment-face {
			    width: 70upx;
			    height: 70upx;
			    border-radius: 100%;
			    margin-right: 20upx;
			    flex-shrink: 0;
			    overflow: hidden;
			}
			.uni-comment-face image {
			    width: 100%;
			    border-radius: 100%;
			}
			.uni-comment-body {
			    width: 100%;
				.uni-comment-top {
				    line-height: 1.5em;
				    justify-content: space-between;
					border-bottom: 1upx solid #d4d4d4;
				}
				.uni-comment-top {
				    display: flex;
					justify-content: space-between;
					.uni-comment-top-name{
						color: #0A98D5;
						font-size: 28upx;
					}
					.uni-comment-top-dianzan{
						color: #c1c1c1;
						margin-right: 10px;
						font-size: 40upx;
					}
					
				}
				.uni-comment-content {
				    line-height: 1.6em;
				    font-size: 28upx;
				    padding: 8rpx 0;
					text-indent:2em;
				}
				.uni-comment-time{
					border-top: 1upx solid #d4d4d4;
					padding-top: 10upx;
					padding-right: 20upx;
					text-align: right;
					margin-top: 20px;
					font-size: 24upx;
				}
			}
		}
    }
    
</style>
