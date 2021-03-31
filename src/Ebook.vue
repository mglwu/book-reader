<template>
  <div class="ebook">
    <TitleBar :ifTitleAndMenuShow="ifTitleAndMenuShow" />
    <div class="read-wrapper">
      <div id="read"></div>
      <div class="mask">
        <div class="left" @click="prevPage"></div>
        <div class="center" @click="toggleTitleAndMenu"></div>
        <div class="right" @click="nextPage"></div>
      </div>
    </div>
    <MenuBar
      ref="menuBar"
      :ifTitleAndMenuShow="ifTitleAndMenuShow"
      :fontSizeList="fontSizeList"
      :defaultFontSize="defaultFontSize"
      @setFontSize="setFontSize"
      :themeList="themeList"
      :defaultTheme="defaultTheme"
      @setTheme="setTheme"
      :bookAvailable="bookAvailable"
      @onProgressChange="onProgressChange"
    />
  </div>
</template>

<script>
import TitleBar from '@/components/TitleBar'
import MenuBar from '@/components/MenuBar'

import Epub from 'epubjs'
const DOWNLOAD_URL = '/book.epub'
global.ePub = Epub
export default {
  name: 'Ebook',
  components: {
    TitleBar,
    MenuBar
  },
  data() {
    return {
      ifTitleAndMenuShow: false,
      fontSizeList: [
        { fontSize: 12 },
        { fontSize: 14 },
        { fontSize: 16 },
        { fontSize: 18 },
        { fontSize: 20 },
        { fontSize: 22 },
        { fontSize: 24 }
      ],
      defaultFontSize: 16,
      themeList: [
        {
          name: 'default',
          style: {
            body: {
              color: '#000',
              background: '#fff'
            }
          }
        },
        {
          name: 'eye',
          style: {
            body: {
              color: '#000',
              background: '#ceeaba'
            }
          }
        },
        {
          name: 'night',
          style: {
            body: {
              color: '#fff',
              background: '#000'
            }
          }
        },
        {
          name: 'gold',
          style: {
            body: {
              color: '#000',
              background: 'rgb(241, 236, 226)'
            }
          }
        }
      ],
      defaultTheme: 0,
      bookAvailable: false
    }
  },
  methods: {
    onProgressChange(progress) {
      const percentage = progress / 100
      const location = percentage > 0 ? this.locations.cfiFromPercentage(percentage) : 0
      this.rendition.display(location)
    },

    setTheme(index) {
      this.defaultTheme = index
      if (this.themes) {
        this.themes.select(this.themeList[index].name)
      }
    },
    registerTheme() {
      this.themeList.forEach(theme => {
        this.themes.register(theme.name, theme.style)
      })
    },
    // 电子书的解析和渲染
    showEpub() {
      // 生成 Book
      this.book = new Epub(DOWNLOAD_URL)
      // 生成 Rendition，通过 Book.renderTo
      this.rendition = this.book.renderTo('read', {
        width: window.innerWidth,
        height: window.innerHeight
      })
      // 通过 Rendition
      this.rendition.display()


      this.themes = this.rendition.themes
      this.setFontSize(this.defaultFontSize)

      this.registerTheme()
      this.setTheme(this.defaultTheme)

      this.book.ready.then(() => {
        return this.book.locations.generate()
      }).then(result => {
        this.locations = this.book.locations
        this.bookAvailable = true
      })
    },
    prevPage() {
      if (this.rendition) {
        this.rendition.prev()
      }
    },
    nextPage() {
      if (this.rendition) {
        this.rendition.next()
      }
    },
    toggleTitleAndMenu() {
      this.ifTitleAndMenuShow = !this.ifTitleAndMenuShow
      if (!this.ifTitleAndMenuShow) {
        this.$refs.menuBar.hideSetting()
      }
    },
    setFontSize(fontSize) {
      this.defaultFontSize = fontSize
      if (this.themes) {
        this.themes.fontSize(fontSize + 'px')
      }
    }
  },
  mounted() {
    this.showEpub()
  }
}
</script>

<style lang="scss" scoped>
@import './assets/styles/global.scss';
.ebook {
  position: relative;
  .read-wrapper {
    .mask {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100;
      display: flex;
      width: 100%;
      height: 100%;
      .left {
        flex: 0 0 px2rem(100);
      }
      .center {
        flex: 1;
      }
      .right {
        flex: 0 0 px2rem(100);
      }
    }
  }
}
</style>
