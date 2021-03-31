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
        <div class="setting-font-size">
          <div class="preview" :style="fontSizeSmall">A</div>
          <div class="select">
            <div class="select-wrapper" v-for="(item, index) in fontSizeList" :key="index" @click="setFontSize(item.fontSize)">
              <div class="line"></div>
              <div class="point-wrapper">
                <div class="point" v-show="defaultFontSize === item.fontSize">
                  <div class="small-point"></div>
                </div>
              </div>
              <div class="line"></div>
            </div>
          </div>
          <div class="preview" :style="fontSizeLarge">A</div>
        </div>
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
    fontSizeList: Array,
    defaultFontSize: Number
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
    setFontSize(fontSize) {
      this.$emit('setFontSize', fontSize)
    },
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
    z-index: 101;
    background: white;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
    .setting-font-size {
      display: flex;
      height: 100%;
      .preview {
        flex: 0 0 px2rem(40);
        @include center;
      }
      .select {
        display: flex;
        flex: 1;
        .select-wrapper {
          flex: 1;
          display: flex;
          align-items: center;
          &:first-child {
            .line {
              &:first-child {
                border-top: none;
              }
            }
          }
          &:last-child {
            .line {
              &:last-child {
                border-top: none;
              }
            }
          }
          .line {
            flex: 1;
            height: 0;
            border-top: px2rem(1) solid #ccc;
          }
          .point-wrapper {
            position: relative;
            flex: 0 0 0;
            height: px2rem(7);
            border-left: px2rem(1) solid #ccc;
            .point {
              position: absolute;
              top: px2rem(-8);
              left: px2rem(-8);
              width: px2rem(20);
              height: px2rem(20);
              border-radius: 50%;
              background-color: white;
              border: px2rem(1) solid #ccc;
              box-shadow: 0 px2rem(4) px2rem(4) rgba(0, 0, 0, 0.15);
              @include center;
              .small-point {
                width: px2rem(5);
                height: px2rem(5);
                background-color: black;
                border-radius: 50%;
              }
            }
          }
        }
      }
    }
  }
}
</style>
