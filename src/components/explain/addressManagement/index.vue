<template>
    <div class="main">
        <div class="top">
            <i class="top_close" @click="forbidBack()"></i>
            收货地址
        </div>
        <div class="header">
            <div class="go_back" @click="forbidBack()"></div>
        </div>
        <div class="address_box">
            <div class="address_list">
                <div class="address_xl">
                    <div class="name">微分先生</div>
                    <div class="tel">18064026245</div>
                </div>
                <div class="address">广东省 深圳市 南山区 深圳湾1号8栋101室</div>
                <div class="btns">
                    <div class="set_default"><i></i>默认地址</div>
                    <div class="operation">
                        <div class="edit" @click="handleEdit()"></div><div class="delet"></div>
                    </div>
                </div>
            </div>
            <div class="address_list">
                <div class="address_xl">
                    <div class="name">微分先生</div>
                    <div class="tel">18064026245</div>
                </div>
                <div class="address">广东省 深圳市 南山区 深圳湾1号8栋101室</div>
                <div class="btns">
                    <div class="set_default set_default_default"><i class="default"></i>默认地址</div>
                    <div class="operation">
                        <div class="edit" @click="handleEdit()"></div><div class="delet"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    methods: {
      handleEdit(){
          this.$router.replace({path:'/addressManagement/edit'});
      },
      forbidBack(){
          this.$router.replace({path:'/buyGood'});
      }
    },
    destroyed(){
        window.removeEventListener('popstate', this.forbidBack, false);
    },
    mounted(){
        var _this = this;
        config.isGoBack(_this.forbidBack);
        _this.$nextTick(() =>{
            
        })
    }
}
</script>

<style scoped>
@import './index.css';
</style>