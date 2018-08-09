<template>
  <div id="app" v-if="profile">
    <div class="header">
      <img class="bg-img" :src="profile.avatar" alt="">
      <div class="header-content">
        <button @click="isShowModal=true">打开弹窗</button>
      </div>
    </div>
    <div class="tab border-1px">
      <router-link to="goods" tag="button">商品</router-link>
      <router-link to="rates" tag="button">评价</router-link>
      <router-link to="seller" tag="button">卖家</router-link>
    </div>

    <div class="view-content">
      <router-view/>
    </div>
    <div class="footer">
      <div class="footer-left">
        <div class="cart-wrap">
          <div class="cart-circle">

          </div>
        </div>
        <div class="footer-money">金额</div>
        <div class="footer-freight">配送费</div>
      </div>
      <div class="footer-right">

      </div>
    </div>

    <div class="modal" v-if="isShowModal">
      <div class="modal-content">
        <StarEl :size="24" :score="profile.score"></StarEl>
      </div>

      <div class="modal-footer">
        <button @click="isShowModal=false">关闭弹窗</button>
      </div>
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

<style lang="scss" scoped>
@import "./components/style/mixin";
@import "./components/style/border";
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
      @include border-bottom(rgba(7,17,27,0.5));
      &>button{
        flex: 1;
        height: 0.4rem;
        text-align: center;
      }
    }

    .view-content{

    }

    .footer{
      position: fixed;
      display: flex;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 0.48rem;
      padding-left:0.18rem;
      background-color: #07111B;
      .footer-left{
        flex: 1;
        display: flex;
        align-items: center;
        color: #fff;
        .cart-wrap{
          position: relative;
          width: 0.54rem;
          height: 0.48rem;
          /*height: 0.54rem;*/
          /*background-color: red;*/
          .cart-circle{
            position: absolute;
            width: 0.54rem;
            height: 0.54rem;
            border-radius: 50%;
            background-color: #2B333B;
            border: 0.06rem solid #07111B;
            top: -0.1rem;
            left: 0;
          }


        }
        .footer-money{
          height: 0.24rem;
          line-height: 0.24rem;
          border-right: 1px solid #2B333B;
          font-weight:bold;
          /*font-size: 0.16rem;*/
        }
        .footer-freight{
          height: 0.24rem;
          line-height: 0.24rem;
          /*font-size:0.1rem;*/

        }
      }
      .footer-right{
        width: 1.05rem;
        height: 0.48rem;
        background-color: #2B333B;
      }

    }


    /*公共蒙版*/
    .modal {
      width: 100%;
      /*height: 100%;*/
      min-height: 100vh;
      background-color: rgba(10, 43, 58, 0.5);
      position: fixed;
      z-index: 100;
      top: 0;
      bottom: 0;
      left: 0;
      display: flex;
      flex-direction: column;
      /*align-items: center;*/
      /*justify-content: center;*/
      /*padding-left: 0.2rem;*/
      /*padding-right: 0.2rem;*/
      overflow-y: scroll;
      color: #DCDCDC;

      .modal-content{
        flex: 1;
      }
      .modal-footer{
        height: 0.4rem;
        background-color: red;
      }
    }

  }

  .router-link-active{
    color: red;
  }
</style>
