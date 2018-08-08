<template>
  <div class="star">
    <div class="star-item" v-for="val in starArr" :class="[sizeItem,val]"></div>
  </div>


</template>
<script>
  const LENGTH=6,
        CLS_ON ='on',
        CLS_HALF='half',
        CLS_OFF='off';

  export default {
    name:'star',
    props:{
      size:{
        type:Number
      },
      score:{
        type:Number
      }

    },
    data(){
      return{

      }
    },
    computed:{
      //这个计算属性决定是有几颗整星，几颗半星，几颗空的
      starArr(){
        let result=[];
        let score=(Math.floor(this.score*2))/2;
        let integer=Math.floor(score);
        let hasDecimal=score%1!==0;//如果等于0，就没有小数，不等于0就有小数
        for(let i=0;i<integer;i++){
          result.push(CLS_ON);
        };
        if(hasDecimal){
          //如果有小数，就添加半星
          result.push(CLS_HALF)
        };
        while (result.length<LENGTH){
          result.push(CLS_OFF);
        }
        return result;
      },

      //这个计算属性决定了是哪个尺寸的星星
      sizeItem(){
        return 'star_'+this.size;

      }


    },
    methods:{

    }
  }


</script>
<style lang="scss">

  .star{
    .star-item{
      display: inline-block;
    }
    .star_24{
      width: 24px;
      height: 24px;
      -webkit-background-size: 24px 24px;
      background-size: 24px 24px;
      background-repeat: no-repeat;
      margin-right:10px;
      &:last-child{
        margin-right:0;
      }

      &.on{
        background-image: url('./star/star24_on@2x.png');
      }
      &.half{
        background-image: url('./star/star24_half@2x.png');
      }
      &.off{
        background-image: url('./star/star24_off@2x.png');
      }
    }
    .star_36{
      width: 3636px;
      height: 36px;
      -webkit-background-size: 36px 36px;
      background-size: 36px 36px;
      background-repeat: no-repeat;
      margin-right:12px;
      &:last-child{
        margin-right:0;
      }

      &.on{
        background-image: url('./star/star36_on@2x.png');
      }
      &.half{
        background-image: url('./star/star36_half@2x.png');
      }
      &.off{
        background-image: url('./star/star36_off@2x.png');
      }
    }
    .star_48{
      width: 48px;
      height: 48px;
      -webkit-background-size: 48px 48px;
      background-size: 48px 48px;
      background-repeat: no-repeat;
      margin-right:16px;
      &:last-child{
        margin-right:0;
      }

      &.on{
        background-image: url('./star/star48_on@2x.png');
      }
      &.half{
        background-image: url('./star/star48_half@2x.png');
      }
      &.off{
        background-image: url('./star/star48_off@2x.png');
      }
    }

  }



</style>
