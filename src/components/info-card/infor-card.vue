<template>
  <Card :shadow="shadow" class="info-card-wrapper" :padding="15">
    <div class="content-con">
      <div class="left-area" :style="{background: color, width: leftWidth}">
        <i :class="`iconfont ${icon}`" class="iconStyle"></i>
        <!-- <common-icon class="icon" :type="icon" :size="iconSize" color="#fff"/> -->
      </div>
      <div class="right-area">
        <div>
          <slot></slot>
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
import CommonIcon from '_c/common-icon'
export default {
	name: 'InforCard',
	components: {
		CommonIcon
	},
	props: {
		left: {
      type: String,
      default: '75'
		},
		color: {
      type: String,
      default: '#2d8cf0'
		},
		icon: {
      type: String,
      default: ''
		},
		iconSize: {
      type: Number,
      default: 20
		},
		shadow: {
      type: Boolean,
      default: false
		}
	},
	computed: {
		leftWidth () {
			return `${this.left}px`
		}
		// rightWidth () {
		// 	return `${100 - this.leftWidth}%`
		// }
	}
	}
</script>

<style lang="less">
.common{
  float: left;
  height: 100%;
  display: table;
  // text-align: center;
}
.size{
  width: 100%;
  height: 100%;
}
.iconStyle{
  font-size: 55px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.middle-center{
  display: table-cell;
  vertical-align: middle;
}
.info-card-wrapper{
  .size;
  overflow: hidden;
  .ivu-card-body{
    .size;
  }
  .content-con{
    .size;
    display: flex;
    position: relative;
    .left-area{
      border-radius: 5%;
      .common;
      & > .icon{
        .middle-center;
      }
    }
    .right-area{
      padding-left:10px;
      .common;
      & > div{
        .middle-center;
      }
    }
  }
}
</style>
