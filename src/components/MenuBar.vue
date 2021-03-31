<template>
  <div class="menu-bar">
    <transition name="slide-up">
      <div
        v-show="ifTitleAndMenuShow"
        class="menu-wrapper"
        :class="{ 'hide-box-shadow': ifSettingShow || !ifTitleAndMenuShow }"
      >
        <div class="icon-wrapper">
          <span class="icon-menu icon"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-progress icon"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-bright icon"></span>
        </div>
        <div class="icon-wrapper" @click="showSetting">
          <span class="icon-more icon"></span>
        </div>
      </div>
    </transition>
    <transition name="slide-up">
      <div v-show="ifSettingShow" class="setting-wrapper">
        <div class="setting-font-size"></div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'MenuBar',
  props: {
    ifTitleAndMenuShow: {
      type: Boolean,
      default: false
    },
    fontSizeList: Array
  },
  data() {
    return {
      ifSettingShow: false
    }
  },
  computed: {
    fontSizeSmall() {
      return {
        fontSize: this.fontSizeList[0].fontSize + 'px'
      }
    },
    fontSizeLarge() {
      const index = this.fontSizeList.length - 1
      return {
        fontSize: this.fontSizeList[index].fontSize + 'px'
      }
    }
  },
  methods: {
    showSetting() {
      this.ifSettingShow = !this.ifSettingShow
    },
    hideSetting() {
      this.ifSettingShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/global.scss';
.menu-bar {
  .menu-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 101;
    display: flex;
    width: 100%;
    height: px2rem(48);
    background-color: white;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
    &.hide-box-shadow {
      box-shadow: none;
    }
    .icon-wrapper {
      flex: 1;
      @include center;
      .icon-progress {
        font-size: px2rem(28);
      }
      Î.icon-bright {
        font-size: px2rem(24);
      }
    }
  }
  .setting-wrapper {
    position: absolute;
    bottom: px2rem(48);
    left: 0;
    width: 100%;
    height: px2rem(60);
    background: white;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
    // .setting-font-size {
    // }
  }
}
</style>
