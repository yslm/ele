<template>
  <div class="goods-wrap">
    <div class="goods" v-if="goods">
      <div class="goods-left">
        <p class="left-item" v-for="val in goods">{{val.name}}</p>
      </div>
      <div class="goods-right">
        <ul>
          <li v-for="val in goods">
            <p class="goods-title">{{val.name}}</p>
            <div v-for="item in val.foods" class="foods-list-wrap border-1px">
              <div class="food-list">
                <div class="food-left">
                  <img class="left-avatar" :src="item.icon" alt="">
                </div>
                <div class="food-right">
                  <h3 class="food-name">{{item.name}}</h3>
                  <p class="food-desc">{{item.description}}</p>
                  <p class="food-sellCount">月出售{{item.sellCount}},好评率{{item.rating}}%</p>
                  <div class="food-price">
                    <span class="price">￥{{item.price}}</span>
                    <span class="old-price" v-if="item.oldPrice">￥{{item.oldPrice}}</span>
                    <!--这里是加减按钮-->
                    <lo-add :detailCount="item" key="item.name"></lo-add>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="cart-list">
      //购物车列表
      <CartListEl :goodsList="listArr"></CartListEl>
<!--
      <div class="title">
        <span>购物车</span>
        <button>清空</button>
      </div>
      <ul class="list-wrap">
        <li class="list-item" v-for="(item,index) in listArr">
          <p>{{item.name}}</p>
          <p>{{item.price}}</p>
          <lo-add :detailCount="item" key="index.info"></lo-add>

        </li>
      </ul>-->
    </div>

    <div class="footer">
      <div class="footer-left">
        <div class="cart-wrap">
          <div class="cart-circle">

          </div>
        </div>
        <div class="footer-money">￥{{totalMoney}}</div>
        <div class="footer-freight">配送费</div>
      </div>
      <div class="footer-right">

      </div>
    </div>
  </div>


</template>
<script>

  import CartListEl from './cartList.vue'
  export default {
    name:'goods',
    data(){
      return{
        goods:"",
        listArr:[]//购物车列表

      }
    },
    components:{
      CartListEl
    },
    computed:{
      //计算总金额
      totalMoney(){
       //遍历数据
      if(this.goods){
        let total=0,
          listArr=[];

        this.goods.forEach(function (item,index) {
//          console.log(item,index);
          item.foods.forEach(function (val,index) {

            if(val.count){
              total+=val.count*val.price;
                listArr.push(val);
            }
          })

        })

        this.listArr=listArr;

        return total;
      }

      },
    },
    methods:{
      getdata(){
        this.testData('goods').then((res)=>{
          console.log(res.data);
          this.goods=res.data;
          console.log(this.goods);
        }).catch((err)=>{
          console.log(err);
        })
      }
    },
    created(){
      this.getdata()
    },
  }

</script>
<style lang="scss" scoped>
  @import "./style/mixin";
  @import "./style/border";

  .goods{
    color: #07111B;
    font-size: 0.12rem;
    display: flex;
    .goods-left{
      width: 0.8rem;
      .left-item{
        height: 0.54rem;
        background-color: #F3F5F7;
      }

    }
    .goods-right{
      flex: 1;

      .goods-title{
        height: 0.26rem;
        background-color: #F3F5F7;
        padding-left:0.14rem;

      }
      //具体商品列表
      .foods-list-wrap{
        padding: 0.18rem;
        .food-list{
          display: flex;
          /*border-bottom: 1px solid #000;*/
          @include border-bottom(#D9DDE1);
          .food-left{
            margin-right: 0.1rem;
            .left-avatar{
              width: 0.56rem;
              height: 0.56rem;
              border-radius: 0.01rem;
            }

          }

          .food-right{
            flex: 1;
            text-align: left;
            color: #93999F;
            font-size: 0.1rem;
            .food-name{
              color: #07111B;
              font-size: 0.14rem;
            }
            .food-desc{}
            .food-sellCount{}
            .food-price{
              .price{
                color: #F01414;
                font-size: 0.14rem;
                font-weight:bold;
              }
              .old-price{}
            }

          }
        }




      }
    }


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
        padding-right:0.2rem;
        /*font-size: 0.16rem;*/
      }
      .footer-freight{
        height: 0.24rem;
        line-height: 0.24rem;
        padding-left:0.2rem;
        /*font-size:0.1rem;*/

      }
    }
    .footer-right{
      width: 1.05rem;
      height: 0.48rem;
      background-color: #2B333B;
    }

  }

</style>
