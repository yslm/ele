<template>
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
                  <lo-add :detailCount="item"></lo-add>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    name:'goods',
    data(){
      return{
        goods:""

      }
    },
    methods:{
      getdata(){
        this.testData('goods').then((res)=>{
          console.log(res.data);
          this.goods=res.data;
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

</style>
