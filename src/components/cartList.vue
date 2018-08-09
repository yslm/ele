<template>
  <div class="cart-list">
    <!--购物车列表-->
    <div class="title">
      <span>购物车</span>
      <button>清空</button>
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
    mounted(){
      console.log(this.goodsList,'cartlist');

    }
  }


</script>
<style></style>
