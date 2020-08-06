<template>
  <div id="app">
    <!-- <div style="height:100%">
      <router-view></router-view>
    </div> -->
    <!-- <keep-alive>
        <router-view></router-view>
    </keep-alive> -->
    
    <transition name="fade" mode="out-in">
        <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      loading: false,
    }
  },
  // computed: mapState({
  //   pageInit: state => state.pageInit
  // })
}
</script>

<style>

</style>
