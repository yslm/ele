<!--增减购买次数的组件-->

<template>
  <div class="add-cut">
    <button @click="decrease">
      <i class="iconfont icon-jian"></i>

    </button>
    <input  type="hidden" v-model="count">
    <span>{{count}}</span>
    <button @click="add">
      <i class="iconfont icon-jia"></i>
    </button>
    <span style="display: none">{{crease}}{</span>
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
        this.count++;
      },
      decrease(){
        //减少
        if(this.count<=0){
          this.count=0;
          return
        }
        this.count--;

      }
    },
    computed:{
      crease(){
        this.$set(this.detailCount,'count',this.count)
      }
    }

  }
</script>
<style>
  @import "../fonts/iconfont.css";


</style>
