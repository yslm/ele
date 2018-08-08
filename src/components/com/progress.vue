<!--进度条组件-->

<template>
  <div class="progress">
    <div class="my-level">
      <span>XX</span><span dir="rtl" style="font-family:Cairo-SemiBold;">مستواك الحالي: </span>
      <!--<span>XX</span><span dir="rtl"><img src="" alt=""></span>-->
    </div>
    <div class="progress-box">
      <div class="line" :class="{bdr:full}" :style="{width:myProgress+'%'}"></div>
    </div>
    <div class="progress-num">
      <div class="num" :style="{width:myProgress+'%'}">{{percent}}%</div>
    </div>

  </div>
</template>
<script>
  export default {
    name:'lo-progress',
    props:['goal'],
    data(){
      return{
        myProgress:0,
        percent:0,
        full:false, //在进度条100%时添加圆角
      }
    },

    methods:{

      /*改变长度*/
      changeWidth(){
        setTimeout(()=>{
         /* var goal=60;
          if(goal==100){
            this.full=true;
            //就添加一个属性
          }*/
          this.myProgress=this.goal;
          var speed=parseInt(this.goal/20);
          var timer=setInterval(()=>{
            this.percent+=speed;
            if(this.percent>=this.goal){
              this.percent=this.goal;
              clearInterval(timer);
            }
          },100)
        },500);

      },
    },

    mounted(){
      this.changeWidth();
    }
  }


</script>
<style lang="scss" scoped>
  .progress{
    width: 100%;
    .my-level{
      text-align: right;
      margin-top:0.18rem;
    }
    .progress-box{
      width: 100%;
      height:0.17rem;
      margin-top:0.1rem;
      border-radius: 0.08rem;
      box-shadow: 0 0.03rem 0.12rem RGBA(36, 145, 161, 0.25);
      .line{
        width: 0;
        height: 100%;
        background-color: RGBA(88, 190, 255, 1);
        border-radius: 0.08rem 0 0 0.08rem;
        transition: width 2s linear;
        &.bdr{
          border-radius: 0.08rem;
        }
      }
    }
    .progress-num{
      width: 100%;
      height:0.17rem;
      margin-top:0.1rem;
      .num{
        width: 0;
        height: 100%;
        transition: width 2s linear;
        text-align: right;
      }
    }
  }


</style>
