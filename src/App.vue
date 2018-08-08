<template>
  <div id="app" v-if="profile">
    <div class="header">
      <img class="bg-img" :src="profile.avatar" alt="">
      <div class="header-content">

        <button @click="isShowModal=true">打开弹窗</button>


      </div>
    </div>
    <div class="tab">
      <router-link to="goods" tag="button">商品</router-link>
      <router-link to="rates" tag="button">评价</router-link>
      <router-link to="seller" tag="button">卖家</router-link>
    </div>

    <div class="test">

    </div>

    <div class="test2 border-1px"></div>

     <router-view/>

    <div class="modal" v-if="isShowModal">
      <button @click="isShowModal=false">关闭弹窗</button>
      //这里面需要搞星星，需要写个星星组件

      <StarEl :size="24" :score="profile.score"></StarEl>

    </div>
  </div>
</template>

<script>

  import StarEl from './components/star.vue'
  export default {
    name: 'App',
    data() {
      return {
        profile:"",
        isShowModal:false
      }
    },
    components:{
      StarEl
    },
    methods:{
      getdata(){
        this.testData('seller').then((res)=>{
          console.log(res.data);
          this.profile=res.data;
        }).catch((err)=>{
          console.log(err);
        })
      }
    },
    created(){
      this.getdata()
    }

  }

</script>

<style lang="scss">
@import "./components/style/mixin";
  #app {
    text-align: center;


    .header{
      height: 1.34rem;
      position: relative;
      /*border-bottom:1px solid #000;*/

      .bg-img{
        position: absolute;
        z-index: 1;
        width: 100%;
        height: 1.34rem;
        left: 0;
        top: 0;
        filter: blur(10px);
      }
      .header-content{
        position: absolute;
        width: 100%;
        height: 1.34rem;
        left: 0;
        top: 0;
        z-index: 2;
        background-color: rgba(7,17,27,0.5);
      }


    }


    .tab{
      display: flex;
      height: 0.4rem;
      align-items: center;
      @include border-1px(rgba(7,17,27,0.5));
      &>button{
        flex: 1;
        height: 0.4rem;
        text-align: center;
      }
    }
    /*公共蒙版*/
    .modal {
      width: 100%;
      height: 100%;
      background-color: rgba(10, 43, 58, 0.5);
      position: fixed;
      z-index: 100;
      top: 0;
      left: 0;
      /*display: flex;*/
      /*align-items: center;*/
      /*justify-content: center;*/
      padding-left: 0.2rem;
      padding-right: 0.2rem;
      overflow: auto;
      color: #DCDCDC;
    }

  }
</style>
