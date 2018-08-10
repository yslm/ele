<template>
  <div class="goods">

    <div class="menu-wrap">
      <div class="goods-left" >
        <p class="left-item" v-for="(val,index) in goods"
           @click=selectMenu(index,$event)
           :class="{current:currentIndex === index}"
        >{{val.name}}</p>
      </div>
    </div>
    <div class="goods-wrap">
        <ul class="goods-right">
          <li v-for="val in goods" class="good-list-hook">
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


        <transition name="fade">
          <div class="cart-list-wrap" v-show="showCart">
            <div class="cart">
              <CartListEl :goodsList="listArr"></CartListEl>
            </div>
          </div>
        </transition>


    <div class="footer" @click="showCartList">
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
  import BScroll from 'better-scroll'
  import CartListEl from './cartList.vue'
  export default {
    name:'goods',
    data(){
      return{
        goods:"",
        listArr:[],//购物车列表
        showCart:false,//是否显示购物车列表
        listHeight:[],//存放右侧列表的每一档的高度
        scrollY:0
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


      currentIndex() {
        for(let i=0;i< this.listHeight.length;i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i+1];



          if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)){
            return i;
          }
        }
        return 0;
      }
    },
    methods:{
      getdata(){
        this.testData('goods').then((res)=>{
          console.log(res.data);
          this.goods=res.data;
          console.log(this.goods);
          this.$nextTick(()=>{
            this.init();
            this.calculateHeight();
          })
        }).catch((err)=>{
          console.log(err);
        })
      },
     init(){
//        let result= await this.testData('goods');
        let menuWrap = document.querySelector('.menu-wrap'),
            goodWrap =document.querySelector('.goods-wrap');

        console.log(menuWrap,goodWrap,'hahaha');
        this.menuScroll = new BScroll(menuWrap,{click:true});
        this.goodScroll =new BScroll(goodWrap,{
           probeType:3
          });

        this.goodScroll.on('scroll',(pos)=>{
          //监控右侧列表的滚动事件
          this.scrollY=Math.abs(Math.round(pos.y));
          console.log(this.scrollY);
        })
      },

      //计算右侧每一档的高度
      calculateHeight() {
//        let foodList = document.querySelector('.goods-wrap').getElementsByClassName("good-list-hook");
        let foodList = document.querySelectorAll(".good-list-hook");
        let height = 0;
        this.listHeight.push(height);
        for(let i=0;i<foodList.length;i++) {
          let item = foodList[i];
          height += item.clientHeight;//因为这个clientHeight只是每个元素
          console.log(height,'高度');
          this.listHeight.push(height);
        }
      },

      showCartList(){
       //判断

        if(!this.totalMoney) return
        console.log(this.totalMoney,'点击');
        this.showCart=!this.showCart;

      },

      //左侧菜单栏的点击联动

      selectMenu(index){
        //记录点击的是第几个
        if(!event._constructed) {
          return ;
        }
        let foodList = document.querySelector('.goods-wrap').getElementsByClassName("good-list-hook");
        let el = foodList[index];
        this.goodScroll.scrollToElement(el,300);
      }
    },
    created(){
      this.getdata()
    },

    mounted(){
      this.Event.$on('clearCart',()=>{
        this.showCart=false;
      })
    }
  }

</script>
<style lang="scss" scoped>
  @import "./style/mixin";
  @import "./style/border";

  .goods{
    height: 100%;
    display:flex;
    color: #07111B;
    font-size: 0.12rem;
    overflow: hidden;
    .menu-wrap{
      width: 0.8rem;
      height: 100%;
      .left-item{
        height: 0.54rem;
        background-color: #F3F5F7;
        &.current{
          background-color: red;
        }
      }
    }
    .goods-wrap{
      flex: 1;
      height: 100%;

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
    position: absolute;
    z-index: 100;
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

  .cart-list-wrap{
    width: 100%;
    //购物车列表
    position: fixed;
    z-index: 20;
    height: 100%;
    left: 0;
    top: 0;
    background-color: rgba(10, 43, 58, 0.5);
  }


  .cart{
    position: absolute;
    z-index: 21;
    /*background: #d20a0a;*/
    width: 100%;
    /*max-height: 2rem;*/
    /*overflow: scroll;*/
    text-align: center;
    /*padding-bottom: 0.48rem;*/
    bottom: 0;
    transform: translate3d(0, 0%, 0);
  }
  .fade-enter-active, .fade-leave-active {
    transition: all .5s;
    .cart{
      transition: all .5s;
    }
  }

  .fade-enter, .fade-leave-to {
    background-color: rgba(10, 43, 58, 0.1);
  }
  .fade-enter, .fade-leave-to {
    .cart{
      transform:translate3d(0, 100%, 0);
    }
  }

</style>
