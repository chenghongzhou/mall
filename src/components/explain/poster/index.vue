<template>
    <div class="main" ref="main">
        <!-- 要生成海报的-->
      <div id="posterHtml"  ref="creatGivePoster">
          <img src="../../../../static/images/luckDraw/bg.png" alt="" srcset="" class="pic" ref="pic">
         <div class="edit" ref="edit">
            <div style="position:relative;width:100%;height:100%">
                <img src="../../../../static/images/home/my_img.png" alt="" class="my_img" ref="myimg">
                <div class="code_img">
                    <vue-qr :logo-src="config.logo" :logoScale="0.25" :text="config.value" :margin="0" style="width:85%;height:85%;display:block"  class="player-bottom-panel-qrcode center" />
                </div>
                
                <div class="intru">关注作者公众号获取更多福利</div>
            </div>
        </div>
      </div>
        <!-- 生成海报的-->
      <div class="share-give-poster">
        <img class="poster-img"  :src="imgUrl" v-if="isImg">
      </div>
    </div>
</template>

<script>
import vueQr from 'vue-qr';
import html2canvas from 'html2canvas';
export default {
    components: {
        vueQr
    },
    data(){
        return {
            config: {
                value: window.location.href, //显示的值、跳转的地址
                logo: require('../../../../static/images/home/logo.png') //中间logo的地址
            },
             imgUrl: '', //最后转化出来的图片base64地址
             isImg: false
        }
    },
      methods: {
          setHeight(){
              var {main, edit, pic, myimg} = this.$refs;
              var mainHight = main.clientHeight;
              var editHeight = edit.clientHeight;
              var myimgHeight = myimg.clientHeight;
              pic.style.height = mainHight-editHeight+myimgHeight+'px';
          },
    // 生成海报
        getPoster() {
            var _this = this;
            let shareContent = this.$refs.creatGivePoster //需要截图的包裹的（原生的）DOM 对象
            let width = shareContent.offsetWidth //获取dom 宽度
            let height = shareContent.offsetHeight //获取dom 高度
            let canvas = document.createElement('canvas') //创建一个canvas节点
            let scale = 2 //定义任意放大倍数 支持小数
            canvas.width = width * scale //定义canvas 宽度 * 缩放
            canvas.height = height * scale //定义canvas高度 *缩放
            canvas.getContext('2d').scale(scale, scale) //获取context,设置scale
            let opts = {
                scale: 1, // 添加的scale 参数
                canvas: canvas, //自定义 canvas
                // logging: true, //日志开关，便于查看html2canvas的内部执行流程
                width: width, //dom 原始宽度
                height: height,
                useCORS: true, // 【重要】开启跨域配置
                backgroundColor: null,
                dpi:96
            }

            html2canvas(shareContent, opts).then(canvas => {
                var context = canvas.getContext('2d')
                let shareContent = _this.$refs.creatGivePoster //需要截图的包裹的（原生的）DOM 对象
                let width = shareContent.offsetWidth //获取dom 宽度
                let height = shareContent.offsetHeight //获取dom 高度
                // 【重要】关闭抗锯齿
                context.mozImageSmoothingEnabled = false
                context.webkitImageSmoothingEnabled = false
                context.msImageSmoothingEnabled = false
                context.imageSmoothingEnabled = false
                // 【重要】默认转化的格式为png,也可设置为其他格式
                let imgUrl = canvas.toDataURL('image/png')
                this.imgUrl = imgUrl
                this.isImg = true
                console.log('生成海报')
            })
        }
    },
    mounted(){
        this.setHeight();
        setTimeout(_ => { this.getPoster() }, 500)
    }
}
</script>

<style scoped>
    .main{
        width: 100%;
        height:100%;
        position: absolute;
        top: 0;
        left: 0;
    }
    #posterHtml{
        width: 100%;
        height: 100%;
        /* background: url('../../../../static/images/luckDraw/bg.png') top center no-repeat;
        background-size: 100% 100%; */
    }
    .pic{
        width: 100%;
        height: auto;
    }
    .edit{
        width: 100%;
        height: 3.29rem;
        position: absolute;
        bottom: 0;
        left: 0;
        background: url('../../../../static/images/home/poster_ft.png') top center no-repeat;
        background-size: 100% 100%;
    }
    .my_img{
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        overflow: hidden;
        position: absolute;
        left: 50%;
        top: 0.1rem;
        display: block;
        margin-left: -0.4rem;
    }
    .code_img{
        width: 1.7rem;
        height: 1.7rem;
        border-radius: 0.1rem;
        position: absolute;
        bottom: 0.2rem;
        left: 0.62rem;
        display: block;
    }
    .intru{
        font-size: 0.28rem;
        color: #2b2b2b;
        font-weight: bold;
        position: absolute;
        bottom: 0.87rem;
        left: 3rem;
    }
    .share-give-poster{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .share-give-poster img{
        width: 100%;
        height: 100%;
    }
    .code_img img{
        margin: 7.5% auto;
    }
</style>