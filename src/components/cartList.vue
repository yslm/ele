<template>
  <div class="cart-list">
    <!--购物车列表-->
    <div class="title border-1px">
      <span>购物车</span>
      <button @click="clearCart">清空</button>
    </div>
    <ul class="list-wrap">
      <li class="list-item" v-for="(item,index) in goodsList">
        <p>{{item.name}}</p>
        <p>{{item.price}}</p>
        <lo-add :detailCount="item" :key="index"></lo-add>

      </li>
    </ul>


  </div>


</template>
<script>
  export default {
    props:['goodsList'],

    data(){

      return{

      }
    },
    methods:{
      clearCart(){
        console.log(this.goodsList,'清空');

        this.goodsList.forEach((good)=>{
          good.count=0;
        })
//        this.$emit('clearCart')
        this.Event.$emit('clearCart');
      }
    },
    mounted(){
      console.log(this.goodsList,'cartlist');

    }
  }


</script>
<style lang="scss" scoped>
  @import "./style/mixin";
  @import "./style/border";
  .cart-list{

    .title{
      height: 0.4rem;
      background-color: #f3f5f7;
      padding:0 0.18rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      @include border-bottom(#f3f5f7);
    }
    .list-wrap{
      max-height: 2.4rem;
      overflow: scroll;
      padding:0 0.18rem;
      background-color: #f3f5f7;
      .list-item{
        height: 0.48rem;
        display: flex;
        @include border-bottom(#07111B);
      }
    }

  }


</style>
