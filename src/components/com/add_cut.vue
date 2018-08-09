<!--增减购买次数的组件-->

<template>
  <div class="add-cut">
    <button @click="decrease">
      <i class="iconfont icon-jian"></i>

    </button>
    <!--<input  type="hidden" v-model="count">-->
    <span v-if="this.detailCount.count">{{this.detailCount.count}}</span>
    <button @click="add">
      <i class="iconfont icon-jia"></i>
    </button>
    <!--<span style="display: none">{{crease}}{</span>-->
  </div>
</template>
<script>
  export default {
    name:'lo-add',
    props:['detailCount'],
    data(){
      return{
        count:0
      }
    },
    methods:{
      add(){
        //增加
        if(!this.detailCount.count){
          this.$set(this.detailCount,'count',1)
//          return
        }else{
          this.detailCount.count++;
        }
      },
      decrease(){
        //减少
        if(this.detailCount.count){
          this.detailCount.count--;
        }

       /* if(this.count<=0){
          this.count=0;
          return
        }
        this.count--;*/

      }
    },
  /*  computed:{
      crease(){
        if(this.detailCount.count>0){
          return
        }
        this.$set(this.detailCount,'count',this.count)
      }
    }*/

  }
</script>
<style>
  @import "../fonts/iconfont.css";


</style>
