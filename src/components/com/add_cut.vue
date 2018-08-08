<!--增减购买次数的组件-->

<template>
  <div class="add-cut">
    <button @click="decrease">-</button>
    <input type="text" v-model="count">
    <button @click="add">+</button>
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
<style></style>
