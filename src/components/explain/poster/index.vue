<template>
    <div class="main">
        <div id="posterHtml">
            <div class="edit">
                <div style="position:relative;width:100%;height:100%">
                    <img src="../../../../static/images/home/my_img.png" alt="" class="my_img">
                    <img src="../../../../static/images/home/wx_code.jpg" alt="" class="code_img">
                    <div class="intru">关注作者公众号获取更多福利</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import QRCode from 'qrcodejs2';
import html2canvas from 'html2canvas';
export default {
    data(){
        return {

        }
    },
    methods: {
        createPoster() {
        // 生成海报
            const vm = this
            const domObj = document.getElementById('posterHtml')
            html2canvas(domObj, {
                useCORS: true,
                allowTaint: false,
                logging: false,
                letterRendering: true,
                onclone(doc) {
                let e = doc.querySelector('#posterHtml')
                e.style.display = 'block'
                }
            }).then(function(canvas) {
                // 在微信里,可长按保存或转发
                vm.posterImg = canvas.toDataURL('image/png')
            })
        },
    },
    mounted(){
        this.createPoster();
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
        background: url('../../../../static/images/luckDraw/bg.png') top center no-repeat;
        background-size: 100% 100%;
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
</style>